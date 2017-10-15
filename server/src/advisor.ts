import {CompletionItem, CompletionItemKind} from 'vscode-languageserver';

export function getChildren(key: string) : CompletionItem[] {
    
    if (key == "") {
        /* Root => Build script structure */
        return [
            {
                label: 'allprojects',
                kind: CompletionItemKind.Text,
                data: 1
            },
            {
                label: 'artifacts',
                kind: CompletionItemKind.Text,
                data: 2
            },
            {
                label: 'buildscript',
                kind: CompletionItemKind.Text,
                data: 3
            },
            {
                label: 'configurations',
                kind: CompletionItemKind.Text,
                data: 4
            },
            {
                label: 'dependencies',
                kind: CompletionItemKind.Text,
                data: 5
            },
            {
                label: 'repositories',
                kind: CompletionItemKind.Text,
                data: 6
            },
            {
                label: 'sourceSets',
                kind: CompletionItemKind.Text,
                data: 7
            },
            {
                label: 'subprojects',
                kind: CompletionItemKind.Text,
                data: 8
            },
            {
                label: 'publishing',
                kind: CompletionItemKind.Text,
                data: 9
            }
        ]
    
    // } else if (key == "android") {
    //     /* Android */

    // } else if (key == "") {

    // } 
    } else {
        return [];
    }

}