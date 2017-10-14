"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return the scope's subject of the closure containing the cursor
 *
 * @param doc the TextDocument that is being edited
 * @param pos the zero-based index of the cursor's position
 */
function getClosureSubject(doc, pos) {
    /* Find the opening curly bracket of current scope */
    var stack = [];
    var i = pos - 1;
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
    /* Find the name of this scope */
    var start = i - 1, end = i - 1;
    var inWords = false;
    for (; start >= 0; start--) {
        let ch = doc.charAt(start);
        // Find the end of the words
        if (!inWords) {
            if (ch == '\n' || ch == '\r') {
                return "";
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
                break;
            }
        }
    }
    /* Process and return the token */
    let subject = doc.substring(start, end + 1).trim();
    return subject;
}
exports.getClosureSubject = getClosureSubject;
//# sourceMappingURL=parser.js.map