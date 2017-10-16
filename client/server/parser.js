"use strict";
/**
 * This parser provides methods to parse the context of a closure,
 * where it serves either as 1) configuration of a "subject"
 * or 2) the last parameter in a method of a "subject".
 *
 * The whole line containing "subject" before the left curly bracket
 * is termed as "heading" here.
 *
 * Examples:
 * 1. Configuration / Definition:
 *      task "taskB" {}
 *      task taskC {}
 *      task taskA(dependsOn: 'taskB', type: Zip) {}
 *
 *      android {}
 *      sourceSets {}
 *
 *      File[] fileList(String dir) {}
 *      if (file.isFile()) {}
 *
 * 2. Serve as the last parameter in a method
 *      taskA.doFirst {}
 *      taskA.leftShift {}
 *      taskA << {}
 *
 *      4.times {}
 *      sourceSets.all {}
 *      configurations.runtime.each {}
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get current closure's heading and content
 *
 * @param doc the TextDocument that is being edited
 * @param pos the zero-based index of the cursor's position
 */
function getCurrentClosure(doc, pos) {
    /* Find the opening curly bracket of current closure */
    let stack = [];
    let i = pos - 1;
    for (; i >= 0; i--) {
        let ch = doc.charAt(i);
        if (ch == '}') {
            stack.push(i);
        }
        else if (ch == '{') {
            if (stack.length == 0) {
                break;
            }
            else {
                stack.pop();
            }
        }
    }
    /* Find the heading of this closure */
    let heading = "";
    let start = i - 1, end = i - 1;
    let inWords = false;
    for (; start >= 0; start--) {
        let ch = doc.charAt(start);
        // Find the end of the words
        if (!inWords) {
            if (ch == '\n' || ch == '\r') {
                break;
            }
            else if (ch == ' ' || ch == '\t') {
                continue;
            }
            else {
                inWords = true;
                end = start;
            }
            // Find the start of the words
        }
        else {
            if (ch == '\n' || ch == '\r') {
                start++;
                heading = doc.substring(start, end + 1).trim();
                break;
            }
        }
    }
    /* Find the closing curly bracket of current closure */
    stack = [];
    let j = pos;
    for (; j < doc.length; j++) {
        let ch = doc.charAt(j);
        if (ch == '{') {
            stack.push(j);
        }
        else if (ch == '}') {
            if (stack.length == 0) {
                break;
            }
            else {
                stack.pop();
            }
        }
    }
    let content = doc.substring(i + 1, pos - 1) + doc.substring(pos, j).trim();
    return {
        heading: heading,
        content: content
    };
}
exports.getCurrentClosure = getCurrentClosure;
function parseClosureHeading(heading) {
}
exports.parseClosureHeading = parseClosureHeading;
//# sourceMappingURL=parser.js.map