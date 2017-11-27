/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_languageserver_1 = require("vscode-languageserver");
const parser = require("./parser");
const advisorBase_1 = require("./advisorBase");
const advisorRoot_1 = require("./advisorRoot");
const advisorGeneral_1 = require("./advisorGeneral");
const advisorTask_1 = require("./advisorTask");
// Create a connection for the server. The connection uses Node's IPC as a transport
let connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
// Create a simple text document manager. The text document manager
// supports full document sync only
let documents = new vscode_languageserver_1.TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites. 
let workspaceRoot;
connection.onInitialize((params) => {
    workspaceRoot = params.rootPath;
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
    };
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});
// hold the maxNumberOfProblems setting
let maxNumberOfProblems;
// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration((change) => {
    let settings = change.settings;
    maxNumberOfProblems = settings.settings.maxNumberOfProblems || 100;
    // Revalidate any open text documents
    documents.all().forEach(validateTextDocument);
});
let pluginConfs = {};
function validateTextDocument(textDocument) {
    // Validation results
    let scriptBlocks = {};
    let pluginConf = {};
    // Process the lines one by one
    let lines = textDocument.getText().split(/\r?\n/g);
    for (var i = 0; i < lines.length; i++) {
        let line = lines[i];
        // First, check if the line is the method name of a 1-level script block
        let isBuildScript = false;
        if (isBuildScript == false) {
            if (line.charAt(0) != ' ' && line.charAt(line.length - 1) == '{') {
                // Right trim and check if the line contains characters only
                let line3 = line.substring(0, line.length - 1).replace(/\s+$/, "");
                ;
                if (/^[a-zA-Z]+$/.test(line3) == true) {
                    isBuildScript = true;
                    // Check if already used in the document
                    if (scriptBlocks[line3] == undefined) {
                        scriptBlocks[line3] = [i];
                    }
                    else {
                        scriptBlocks[line3].push(i);
                    }
                }
            }
        }
        // On failure, collect plugins
        if (isBuildScript == false) {
            let line2 = line.trim();
            // Prune 'apply\s*plugin\s*:\s*'
            let applyIdx = line2.indexOf('apply');
            if (applyIdx < 0)
                continue;
            line2 = line2.substring(applyIdx + 6);
            let pluginIdx = line2.indexOf('plugin');
            if (pluginIdx < 0)
                continue;
            line2 = line2.substring(pluginIdx + 6);
            let colonIdx = line2.indexOf(':');
            if (colonIdx < 0)
                continue;
            // Check plugin type
            if (line2.indexOf('java') >= 0) {
                pluginConf['java'] = true;
            }
            else if (line2.indexOf('com.android.application') >= 0) {
                pluginConf['com.android.application'] = true;
            }
        }
    }
    // Update current document's plugin configurations
    pluginConfs[textDocument.uri] = pluginConf;
    // Send the computed diagnostics to VSCode.
    let diagnostics = [];
    let problems = 0;
    for (let scriptBlock in scriptBlocks) {
        if (problems >= maxNumberOfProblems)
            break;
        // Fetch the line indices of each script block method
        let lineIdxs = scriptBlocks[scriptBlock];
        if (lineIdxs.length < 2)
            continue;
        // Push them into the Diagnostics 
        for (var i = 0; i < lineIdxs.length && problems < maxNumberOfProblems; i++) {
            problems++;
            diagnostics.push({
                severity: vscode_languageserver_1.DiagnosticSeverity.Warning,
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
connection.onCompletion((_textDocumentPosition) => {
    console.log();
    // Basic infomation
    let textDocument = documents.get(_textDocumentPosition.textDocument.uri);
    var fileName = path.basename(_textDocumentPosition.textDocument.uri);
    let pos = _textDocumentPosition.position;
    let offset = textDocument.offsetAt(pos);
    let doc = textDocument.getText();
    let lines = doc.split(/\r?\n/g);
    let line = lines[_textDocumentPosition.position.line];
    // First, collect plugins used for root closure
    let pluginConf = pluginConfs[_textDocumentPosition.textDocument.uri];
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
        if (doc.charAt(offset - 1) == '.') {
            console.log("[[" + curMethod.method + "]] dot");
            if (curMethod.method == "project") {
                return advisorBase_1.getDelegateKeywords(fileName);
            }
            else {
                return advisorGeneral_1.getKeywords(curMethod.method, pluginConf);
            }
        }
        // On ROOT, handle several popular cases
        if (method.method == "") {
            ;
            console.log("[[" + curMethod.method + "]]");
            // TaskContainer creation
            if (curMethod.method == "task") {
                console.log("=== Keywords for Task constructor ===");
                // Return Task types if after "type: "
                if (line.substring(0, _textDocumentPosition.position.character - 1).trim().endsWith("type:"))
                    return advisorTask_1.getTaskTypes();
                // Return Task creation option keywords after '(' or ','
                if (parser.shouldHintParam(line, _textDocumentPosition.position.character))
                    return advisorTask_1.getTaskCreationOptions();
                // Return nothing by default
                return [];
            }
            else if (curMethod.method == "apply") {
                console.log("=== Keywords for apply ===");
                // Return parameters for apply
                return advisorGeneral_1.getDefaultKeywords(curMethod.method);
            }
        }
        // hint delegate or delegate's properties & methods
        console.log("=== Keywords for current delegate ===");
        return advisorBase_1.getDelegateKeywords(fileName);
    }
    // Situation 2: if method name hit in map, return completion items
    if (method.method == undefined)
        return [];
    let retval = [];
    if (method.method == "") {
        console.log("=== Root keywords for current closure ===");
        retval = advisorRoot_1.getRootKeywords(fileName, pluginConf);
    }
    else {
        console.log("=== Keywords for current closure ===");
        retval = advisorGeneral_1.getKeywords(method.method, pluginConf);
        // Handle Task keywords based on its type
        let taskType = method['type'];
        if (method.method == 'task' && taskType != undefined) {
            console.log("=== Keywords for type: " + taskType + " ===");
            retval = retval.concat(advisorTask_1.getTaskKeywords(taskType));
        }
    }
    if (retval.length == 0 || retval.length != 1 || retval[0] != undefined) {
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
    if (parentMethod.method != "") {
        retval = advisorGeneral_1.getNestedKeywords(parentMethod.method, pluginConf);
    }
    if (retval.length > 0)
        return retval;
    else
        return [];
});
// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
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
//# sourceMappingURL=server.js.map