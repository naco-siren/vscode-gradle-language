/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
import * as path from 'path';
import {
	IPCMessageReader, IPCMessageWriter, createConnection, IConnection, TextDocuments, TextDocument, 
	Diagnostic, DiagnosticSeverity, InitializeResult, TextDocumentPositionParams, CompletionItem
} from 'vscode-languageserver';

import * as parser from './parser'
import {Method} from './parser'

import {PluginConf, getDelegateKeywords} from './advisorBase'
import {getRootKeywords} from './advisorRoot'
import {getKeywords, getDefaultKeywords, getNestedKeywords} from './advisorGeneral'
import {getTaskDependencies, getTaskCreationOptions, getTaskTypes, getTaskKeywords, getTaskNames} from './advisorTask'

// Create a connection for the server. The connection uses Node's IPC as a transport
let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

// Create a simple text document manager. 
// The text document manager supports full document sync only.
let documents: TextDocuments = new TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events.
documents.listen(connection);

// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites. 
let workspaceRoot: string;
connection.onInitialize((params): InitializeResult => {
	workspaceRoot = params.rootPath;
	console.log(workspaceRoot);
	return {
		capabilities: {
			// Tell the client that the server works in FULL text document sync mode
			textDocumentSync: documents.syncKind,
			// Tell the client that the server support code complete
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ['', '.']
			}
			// ,hoverProvider : true
		}
	}
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
	validateTextDocument(change.document);
});

// The settings interface describe the server relevant settings part
interface Settings {
	settings: GradleServerSettings;
}

// These are the example settings we defined in the client's package.json file
interface GradleServerSettings {
	maxNumberOfProblems: number;
}

// hold the maxNumberOfProblems setting
let maxNumberOfProblems: number;
// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration((change) => {
	let settings = <Settings>change.settings;
	maxNumberOfProblems = settings.settings.maxNumberOfProblems || 100;
	// Revalidate any open text documents
	documents.all().forEach(validateTextDocument);
});


let pluginConfs : {[uri: string]: PluginConf} = {};
let tasks : {[uri: string]: {[name: string]: Method}} = {};
function validateTextDocument(textDocument: TextDocument): void {
	// Validation results
	let scriptBlocks : {[method : string] : number[]} = {}
	let pluginConf: PluginConf = {};
	tasks[textDocument.uri] = {};

	// Process the lines one by one
	let lines = textDocument.getText().split(/\r?\n/g);
	for (var i = 0; i < lines.length; i++) {
		let line = lines[i];

		// First, check if the line is the method name of a 1-level script block
		let parseComplete = false;
		if (parseComplete == false) {	
			if (line.charAt(0) != ' ' && line.charAt(line.length - 1) == '{') {
				// Right trim and check if the line contains characters only
				let line3 = line.substring(0, line.length - 1).replace(/\s+$/,"");;
				if (/^[a-zA-Z]+$/.test(line3) == true) {
					parseComplete = true;

					// Check for keywords
					if(line3 != "else" && line3 != "static") {
						// Check if already used in the document
						if (scriptBlocks[line3] == undefined) {
							scriptBlocks[line3] = [i];
						} else {
							scriptBlocks[line3].push(i);
						}
					}
				}
			}
		}

		// On failure, check if the line is the first line of a task definition
		if (parseComplete == false) {
			if (line.charAt(line.length - 1) == '{') {
				let method = parser.parseClosureMethod(line.substring(0, line.length - 1));
				if (method.method == 'task') {
					let taskName = method['name'];
					tasks[textDocument.uri][taskName] = method;
					parseComplete = true;
				}
			}
		}

		// On failure, collect plugins
		if (parseComplete == false) {	
			let line2 = line.trim();

			// Prune 'apply\s*plugin\s*:\s*'
			let applyIdx = line2.indexOf('apply');
			if (applyIdx < 0) continue;
			line2 = line2.substring(applyIdx + 6);

			let pluginIdx = line2.indexOf('plugin');
			if (pluginIdx < 0) continue;
			line2 = line2.substring(pluginIdx + 6);

			let colonIdx = line2.indexOf(':');
			if (colonIdx < 0) continue;

			// Check plugin type
			if (line2.indexOf('java') >= 0) {
				pluginConf['java'] = true;
			} else if (line2.indexOf('com.android.application') >= 0) {
				pluginConf['com.android.application'] = true;
			}
		}
	}
	//console.log(tasks[textDocument.uri]);
	
	// Update current document's plugin configurations
	pluginConfs[textDocument.uri] = pluginConf;

	// Send the computed diagnostics to VSCode.
	let diagnostics: Diagnostic[] = [];
	let problems = 0;
	for (let scriptBlock in scriptBlocks) {
		if (problems >= maxNumberOfProblems) break;
	
		// Fetch the line indices of each script block method
		let lineIdxs = scriptBlocks[scriptBlock];
		if (lineIdxs.length < 2)
			continue;

		// Push them into the Diagnostics 
		for (var i = 0; i < lineIdxs.length && problems < maxNumberOfProblems; i++) {
			problems++;
			diagnostics.push({
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line: lineIdxs[i], character: 0 },
					end: { line: lineIdxs[i], character: 0 + scriptBlock.length }
				},
				message: `\"${scriptBlock}\" has already been used in this build script.`,
				source: 'Gradle'
			});
		}
	}
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles((_change) => {
	// Monitored files have change in VSCode
	connection.console.log('We recevied an file change event');
});


// This handler provides the initial list of the completion items.
let TASK_DEPENDENCY_NAMES = getTaskDependencies();
connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
	console.log();

	// Basic infomation of the document and cursor's position
	let uri = _textDocumentPosition.textDocument.uri;
	let textDocument : TextDocument = documents.get(uri);
	var fileName = path.basename(uri);

	let pos = _textDocumentPosition.position;
	let offset = textDocument.offsetAt(pos);

	let doc = textDocument.getText();
	let lines = doc.split(/\r?\n/g);
	let line = lines[_textDocumentPosition.position.line];

	// First, collect plugins used for root closure
	let pluginConf: PluginConf = pluginConfs[uri];
	console.log(pluginConf);

	// Second, get current closure and parse its method
	let closure = parser.getCurrentClosure(doc, offset);
	let method = parser.parseClosureMethod(closure.methodStr);
	console.log("[" + method.method + "], new line: " + (closure.newLine ? "yes" : "no"));


	// Situation 1: Found existing code in current line
	if (closure.newLine == false) {
		let prefix = line.substring(0, _textDocumentPosition.position.character - 1);
		let curMethod = parser.parseClosureMethod(prefix);

		// On entity with dot, hint the entity's properties and methods
		if (doc.charAt(offset-1) == '.') {
			console.log("[[" + curMethod.method + "]] dot...");
			if (curMethod.method == "project") {
				return getDelegateKeywords(fileName);
			} else {
				return getKeywords(curMethod.method, pluginConf);
			}
		}

		// On ROOT, handle several popular cases
		if (method.method == "") {;
			console.log("[[" + curMethod.method + "]]");
			
			// TaskContainer creation
			if (curMethod.method == "task") {
				
				// Return TaskContainer parameter names after '(' or ','
				if (parser.shouldHintParam(line, _textDocumentPosition.position.character - 2)) {
					console.log("=== Task constructor parameter ===");
					return getTaskCreationOptions();
				} 
					
				// Propose values for several popular TaskContainer parameters
				let line2 = line.substring(0, _textDocumentPosition.position.character - 1).trim();
				if (line2.charAt(line2.length - 1) == ':') {
				
					// Parse paramter's name
					let paramName = line2.substring(Math.max(line2.lastIndexOf("("), line2.lastIndexOf(",")) + 1, line2.length - 1).trim();
					console.log("!!! " + paramName);
					
					// Return Task types if after "type: "
					if (paramName == "type")
						return getTaskTypes();

					// Return other tasks' names after "dependsOn" 
					if (paramName == "dependsOn") {
						let curTaskName = curMethod["name"];
						console.log("=== Task names besides " + curTaskName + " ===");
						return getTaskNames(tasks[uri], curTaskName);
					}
				}

				// Return nothing by default
				return [];

			} else if (curMethod.method == "apply") {
				console.log("=== Keywords for apply ===");
				
				// Return parameters for apply
				return getDefaultKeywords(curMethod.method);

			}
		}

		// In Task, handle several popular cases
		if (method.method == 'task') {
			if (TASK_DEPENDENCY_NAMES.has(curMethod.method)) {
				let curTaskName = method["name"];
				console.log("=== Task names besides " + curTaskName + " ===");
				return getTaskNames(tasks[uri], curTaskName);
			}
		}

		// Propose delegate or delegate's properties & methods
		console.log("=== Keywords for current delegate ===");
		return getDelegateKeywords(fileName);	
	}

	
	// Situation 2: if method name hit in map, return completion items
	if (method.method == undefined)
		return [];
	let retval = [];
	if (method.method == "") {
		console.log("=== Root keywords ===");
		retval = getRootKeywords(fileName, pluginConf);

	} else {
		console.log("=== Keywords for current closure ===");
		retval = getKeywords(method.method, pluginConf);
		
		// Handle Task keywords based on its type
		let taskType = method['type'];
		if (method.method == 'task') {
			console.log("=== Plus keywords for type: " + taskType + " ===");
			retval = retval.concat(getTaskKeywords(taskType));
		} 
	}
	if (retval != undefined) {
		return retval;
	} 

	// Situation 3: If method not in mapping, try parent closure's method 
	console.log("=== Try parent closure ===");
	let parentClosure = parser.getCurrentClosure(doc, closure.methodStartPos);
	let parentMethod = parser.parseClosureMethod(parentClosure.methodStr);
	console.log("[" + parentMethod.method + "], new line: " + (parentClosure.newLine ? "yes" : "no"));
	console.log();
	if (parentMethod.method == undefined)
		return [];
	if (parentMethod.method != "") 
		retval = getNestedKeywords(parentMethod.method, pluginConf);
	
	if (retval != undefined && retval.length > 0) {
		return retval;
	} else {
		return [];
	}	
});

// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
	return item;
});

/*
connection.onDidOpenTextDocument((params) => {
	// A text document got opened in VSCode.
	// params.uri uniquely identifies the document. For documents store on disk this is a file URI.
	// params.text the initial full content of the document.
	connection.console.log(`${params.textDocument.uri} opened.`);
});
connection.onDidChangeTextDocument((params) => {
	// The content of a text document did change in VSCode.
	// params.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.
	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});
connection.onDidCloseTextDocument((params) => {
	// A text document got closed in VSCode.
	// params.uri uniquely identifies the document.
	connection.console.log(`${params.textDocument.uri} closed.`);
});
*/

// Listen on the connection
connection.listen();
