//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it

//import * as vscode from 'vscode';
//import * as myExtension from '../src/extension';

import * as parser from '../../server/src/parser';

// Defines a Mocha test suite for server/parser
suite("Parser Tests", () => {
    
    // Defines a Mocha unit test for parseClosureMethod(methodStr: string)
    test("Testing parseClosureMethod(methodStr: string)", () => {
        // A simple Task definition
        let taskMethod1 = parser.parseClosureMethod("task taskA {");
        assert.equal(taskMethod1.method, "task");
        assert.equal(taskMethod1["name"], "taskA");

        // A complex Task definition
        let taskMethod2 = parser.parseClosureMethod("task \"task2\" (type: Zip, dependsOn: 'task1') {");
        assert.equal(taskMethod2.method, "task");
        assert.equal(taskMethod2["name"], "task2");
        assert.equal(taskMethod2["type"], "Zip");
        assert.equal(taskMethod2["dependsOn"], "task1");

        // An incomplete complex Task definition
        let taskMethod3 = parser.parseClosureMethod("task \"task2\" (type: Zip, depe) {");
        assert.equal(taskMethod3.method, "task");
        assert.equal(taskMethod3["name"], "task2");
        assert.equal(taskMethod3["type"], "Zip");
        assert.equal(taskMethod3["dependsOn"], undefined);

        // A legacy Task definition
        let taskMethod4 = parser.parseClosureMethod("task cleanAntlr << {");
        assert.equal(taskMethod4.method, "task");
        assert.equal(taskMethod4["name"], "cleanAntlr");
        
        // An ordinary method
        let unfinishedMethod = parser.parseClosureMethod("      minSdkVersion ");
        assert.equal(unfinishedMethod.method, "minSdkVersion");
    });

    // Defines a Mocha unit test for parseConstructorParams(paramStr: string, method: Method)
    test("Testing parseConstructorParams(paramStr: string, method: Method)", () => {
        // Empty parameters for a TaskContainer constructor
        let method1: parser.Method = {method: "task"};
        parser.parseConstructorParams("  ", method1);
        let keysCount = 0;
        for(let key in method1) {
            if (key != "method")
                keysCount++;
        } 
        assert.equal(keysCount, 0);

        // Parameters without and with single quotes, double quotes for a TaskContainer constructor
        let method2: parser.Method = {method: "task"};
        parser.parseConstructorParams("type: Zip, dependsOn: 'task1', description: \"Some test.\"", method2);
        assert.equal(method2['dependsOn'], "task1");
        assert.equal(method2['type'], "Zip");
        assert.equal(method2['description'], "Some test.");

        // Incomplete parameters for a TaskContainer constructor
        let method3: parser.Method = {method: "task"};
        parser.parseConstructorParams("type: Zip, depen", method3);
        assert.equal(method3['type'], "Zip");
        assert.equal(method3['depen'], undefined);
    });

    // Defines a Mocha unit test for shouldHintParam(line: string, charIdx: number)
    test("Testing shouldHintParam(line: string, charIdx: number)", () => {
        let line1 = "task \"task2\" (type: Zip, dependsOn: 'task1') ";

        // True at left bracket
        assert.equal(parser.shouldHintParam(line1, 13), true);
        assert.equal(parser.shouldHintParam(line1, 14), false);
        
        // False at colon or word after colon
        assert.equal(parser.shouldHintParam(line1, 18), false);
        assert.equal(parser.shouldHintParam(line1, 19), false);
        assert.equal(parser.shouldHintParam(line1, 20), false);

        // True at comma or word after comma
        assert.equal(parser.shouldHintParam(line1, 23), true);
        assert.equal(parser.shouldHintParam(line1, 24), true);
    });
});

