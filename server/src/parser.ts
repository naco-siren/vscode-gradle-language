/**
 * This parser provides methods to parse the context of a script block.
 * 
 * The whole line containing method before the left curly bracket
 * is referred to as a string called "methodStr", here as an intermediate output
 * awaiting for next step's parsing into interface "Method".
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

interface Closure {
    newLine: boolean,
    content: string;
    methodStr: string;
    methodStartPos: number
}

export interface Method {
    method : string;
    [param: string]: string;
}

/**
 * Get current script block's heading and content
 * 
 * @param doc the TextDocument that is being edited
 * @param offset the zero-based index of the cursor's position
 */
export function getCurrentClosure(doc: string, offset: number) : Closure {
    /* Find the opening curly bracket of current script block */
    let stack = [];
    let i = offset - 1;
    let newLine = true, inline = true;
    for (; i >= 0; i--) {
        let ch = doc.charAt(i);
        if (ch == '}') {
            stack.push(i);
        } else if (ch == '{') {
            if (stack.length == 0) {
                break;
            } else {
                stack.pop();
            }
        } else if (ch == ' ' || ch == '\t') {
            continue;
        } else if (ch == '\r' || ch == '\n') {
            inline = false;
            continue;
        } else {
            if (i < offset - 1 && inline && newLine) {
                newLine = false;
            }
        }
    }

    /* Find the heading of this script block */
    let heading = "", methodStartPos = 0;
    let start = i - 1, end = i - 1;
    let inWords = false;
    for (; start >= 0; start--) {
        let ch = doc.charAt(start);
        
        // Find the end of the words
        if (!inWords) {
            if (ch == '\n' || ch == '\r') {
                break;
            } else if (ch == ' ' || ch == '\t') {
                continue;
            } else {
                inWords = true;
                end = start;
            }
        // Find the start of the words
        } else {
            if (ch == '\n' || ch == '\r') {
                start++;
                break;
            }
        }
    }
    heading = doc.substring(start, end + 1).trim();
    methodStartPos = start - 1;

    /* Find the closing curly bracket of current script block */
    stack = [];
    let j = offset;
    for (; j < doc.length; j++) {
        let ch = doc.charAt(j);
        if (ch == '{') {
            stack.push(j);
        } else if (ch == '}') {
            if (stack.length == 0) {
                break;
            } else {
                stack.pop();
            }
        }
    }
    let content = doc.substring(i + 1, offset - 1) + doc.substring(offset, j).trim();

    return {
        newLine: newLine,
        content: content,
        methodStr: heading, 
        methodStartPos: methodStartPos
    };
}


/**
 * Parse the method info from the line before script block's closure.
 * 
 * @param methodStr the intermediate output of script block's parsing
 */
export function parseClosureMethod(methodStr: string) : Method {
    // Initiate methodName as undefined for later condition checks
    let method : Method = undefined;
    let methodName = undefined;

    /* 
     * Situation 1: 
     * Gradle's own impletation of AST transformation for Task type.
     */
    let firstBlankIdx = methodStr.indexOf(" ");
    if (methodStr.substring(0, firstBlankIdx) == "task") {
        methodName = "task";
        
        // Extract task name after "task", crop the paramters if exist
        let paramStr = methodStr.substring(firstBlankIdx + 1).trim();
        let leftBracketIdx = paramStr.indexOf("("), rightBracketIdx = paramStr.indexOf(")"); 
        let firstCurlyBracketIdx = paramStr.indexOf("{");
        let taskName = leftBracketIdx == -1 ? (firstCurlyBracketIdx == -1 ? paramStr.trim() : paramStr.substr(0, firstCurlyBracketIdx).trim()) : paramStr.substr(0, leftBracketIdx).trim();

        // Handle legacies
        if (taskName.endsWith("<<")) {
            taskName = taskName.substr(0, taskName.length - 2).trim();
        }
        
        // Remove single / double quotes if exist
        let [l, r] = [taskName.charAt(0), taskName.charAt(taskName.length-1)];
        if ( (l == '\"' && r == '\"') || (l == '\'' && r == '\'') ) 
            taskName = taskName.substring(1, taskName.length - 1);
        
        // Create Method object
        method = {
            method: "task"
        };
        method["name"] = taskName;
        
        // Parse Task constructor's parameters
        if (leftBracketIdx > 0 && rightBracketIdx > leftBracketIdx) {
            let paramsStr = paramStr.substring(leftBracketIdx + 1, rightBracketIdx).trim();
            parseConstructorParams(paramsStr, method);
        }
    }

    /* 
     * Situation 2: 
     * Call a method (of an object) w/ or w/o bracket(s) for parameters,
     * then assign its return value to a variable.
     */
    if (methodName == undefined) {
        // Exclude the assignment part
        let firstEqualIdx = methodStr.indexOf("=");
        if (firstEqualIdx != -1) 
            methodStr = methodStr.substring(firstEqualIdx + 1).trim();
        
        // Extract the method name before brackets
        let leftBracketIdx = methodStr.indexOf("(");
        if (leftBracketIdx > 0)
            methodName = methodStr.substring(0, leftBracketIdx).trim();
        else {
            methodName = methodStr.trim();
            
            // Handle blank spaces
            let lastBlankIdx = methodName.lastIndexOf(" ");
            if (lastBlankIdx > 0)
            methodName = methodName.substring(lastBlankIdx);
        }
            
        // Extract the method name after dots
        let dotIdx = methodName.lastIndexOf(".");
        if (dotIdx > 0)
            methodName = methodName.substring(dotIdx + 1);

        // Create Method object
        method = {
            method: methodName.trim()
        };

        // Handle corner case: Task constructor with only a name parameter
        if (methodName == "task" && leftBracketIdx > 0) {
            let rightBracketIdx = methodStr.indexOf(")");
            if (rightBracketIdx > leftBracketIdx + 1) {
                let taskName = methodStr.substring(leftBracketIdx + 1, rightBracketIdx).trim();
                let [l, r] = [taskName.charAt(0), taskName.charAt(taskName.length-1)];
                if ( (l == '\"' && r == '\"') || (l == '\'' && r == '\'') ) 
                    taskName = taskName.substring(1, taskName.length - 1);
                method["name"] = taskName;
            }
        }
    }
    
    return method;
}

/**
 * Parse a constructor's parameters
 * 
 * @param paramStr 
 * @param method 
 */
export function parseConstructorParams(paramStr: string, method: Method) {
    let i = 0, j = 0, len = paramStr.length;
    while (i < len) {
        // Tokenize key
        for (j = i; j < len && paramStr.charAt(j) != ':'; j++);
        let key = paramStr.substring(i, j).trim();
        
        // Tokenize value
        for (i = j + 1; i < len && paramStr.charAt(i) == ' ' || paramStr.charAt(i) == '\t'; i++);
        let inQuote = false; j = i;
        while (j < len) {
            let ch = paramStr.charAt(j);
            if (inQuote) {
                if (ch == '\'' || ch == '\"') {
                    j++;
                    break;
                } else {
                    j++;
                }
            } else {
                if (ch == '\'' || ch == '\"') {
                    inQuote = true;
                    j++;
                } else if (ch == ',') {
                    break;
                } else {
                    j++;
                }
            }
        }
        let value = inQuote ? paramStr.substring(i + 1, j - 1) : paramStr.substring(i, j);
        value = value.trim();

        // Put to dict if legal
        if (key.length > 0 && value.length > 0)
            method[key] = value;

        // Loop
        i = j + 1;
    }
}


/**
 * Check if a constructor's cursor is at the beginning of a parameter.
 * @param line 
 * @param charIdx 
 */
export function shouldHintParam(line: string, charIdx: number) : boolean {
    let i = charIdx;
    for (; i >= 0; i--) {
        switch(line.charAt(i)) {
            case ' ':
                continue;
            case '(':
            case ',':
                return true;
            default:
                return false;
        }
    }
    return false;
}
