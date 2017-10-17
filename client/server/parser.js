"use strict";
/**
 * This parser provides methods to parse the context of a closure,
 * where it serves as the last parameter in a method.
 *
 * The whole line containing method before the left curly bracket
 * is recorded as a string called "methodStr" here as an intermediate output,
 * awaits for next step's parsing into interface "Method".
 *
 * ================================================================
 * Situations that are handled:
 *
 * 1. Gradle's own impletation of AST transformation for Task type:
 *    (See: https://github.com/gradle/gradle/blob/master/subprojects/core/src/main/java/org/gradle/groovy/scripts/internal/TaskDefinitionScriptTransformer.java)
 *
 *      task taskA {}
 *      task "taskB" {}
 *
 *      task task1(type: Zip) {}
 *      task "task2"(type: Zip, dependsOn: 'task1') {}
 *
 * 2.a Call a method (of an object) with bracket(s) for parameters,
 *    then assign its return value to a variable:
 *
 *      repositories({})
 *
 *      repositories() {}
 *      task("task1") {}
 *      into('libs') { from configurations.runtime }
 *
 *      Task ref1 = task("task2") {}
 *
 * 2.b Call a method (of an object) without brackets for parameters,
 *    then assign its return value to a variable:
 *
 *      repositories {}
 *
 *      taskA.doFirst {}
 *      taskA.leftShift {}
 *
 *
 *      4.times {}
 *      configurations.runtime.each {}
 *      collection.collect { relativePath(it) }.sort().each { println it }
 *
 *      collection = files { srcDir.listFiles() }
 *      FileTree filtered = tree.matching { include 'org/gradle/api/**' }
 *
 * ================================================================
 * Situations that are not handled:
 *
 * 1. Deprecated Gradle grammar:
 *      taskA << {}
 *
 * 2. Groovy basics like control structures or declarations:
 *      File[] fileList(String dir) {}
 *      if (file.isFile()) {}
 *
 * 3. Define a method using a closure as the method body:
 *      ext.srcDir = { file(srcDirName) }
 *
 * 4. Inject special case configuration into a particular project:
 *      project(':child2') { ext.srcDirName = "$srcDirName/legacy" }
 *
 * ================================================================
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
        methodStr: heading,
        content: content
    };
}
exports.getCurrentClosure = getCurrentClosure;
/**
 * Parse the method info from the line before closure.
 *
 * @param methodStr the intermediate output of closure's parsing
 */
function parseClosureMethod(methodStr) {
    let method = {
        method: "task"
    };
    // Initiate methodName as undefined for later condition checks
    let methodName = undefined;
    /*
     * Situation 1:
     * Gradle's own impletation of AST transformation for Task type.
     */
    let firstBlankIdx = methodStr.indexOf(" ");
    if (methodStr.substring(0, firstBlankIdx) == "task") {
        methodName = "task";
        // Check if parameters are specified in the brackets
        let paramStr = methodStr.substring(firstBlankIdx + 1).trim();
        let leftBracketIdx = paramStr.indexOf("(");
        // let rightBracketIdx = paramStr.indexOf(")"); 
        // let params = paramStr.substring(leftBracketIdx + 1, rightBracketIdx);
        // Parse task's name
        let taskName = leftBracketIdx == -1 ? paramStr.trim() : paramStr.substr(0, leftBracketIdx).trim();
        let [l, r] = [taskName.charAt(0), taskName.charAt(taskName.length - 1)];
        if ((l == '\"' && r == '\"') || (l == '\'' && r == '\''))
            taskName = taskName.substring(1, taskName.length - 1);
        console.log("Situation 1: task name: " + taskName);
    }
    /*
     * Situation 2:
     * Call a method (of an object) w/ or w/o bracket(s) for parameters,
     * then assign its return value to a variable.
     */
    if (methodName == undefined) {
    }
    method["name"] = "myTask1";
    method["type"] = "Zip";
    // console.log(method);
    // console.log(method["type"]);
}
exports.parseClosureMethod = parseClosureMethod;
//# sourceMappingURL=parser.js.map