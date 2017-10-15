"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
function getChildren(key) {
    if (key == "") {
        /* Root => Build script structure */
        return [
            {
                label: 'allprojects',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 1
            },
            {
                label: 'artifacts',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 2
            },
            {
                label: 'buildscript',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 3
            },
            {
                label: 'configurations',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 4
            },
            {
                label: 'dependencies',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 5
            },
            {
                label: 'repositories',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 6
            },
            {
                label: 'sourceSets',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 7
            },
            {
                label: 'subprojects',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 8
            },
            {
                label: 'publishing',
                kind: vscode_languageserver_1.CompletionItemKind.Text,
                data: 9
            }
        ];
        // } else if (key == "android") {
        //     /* Android */
        // } else if (key == "") {
        // } 
    }
    else {
        return [];
    }
}
exports.getChildren = getChildren;
//# sourceMappingURL=advisor.js.map