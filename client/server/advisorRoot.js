"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const advisorBase_1 = require("./advisorBase");
function getRootKeywords(fileName, pluginConf) {
    let keywords = advisorBase_1.getDelegateKeywords(fileName);
    // Add Java plugin's keywords
    if (pluginConf['java']) {
        // console.log("> Plugin 'java' detected!")
        keywords = keywords.concat(getJavaRootKeywords());
    }
    // Add Android plugin's keywords
    if (pluginConf['com.android.application']) {
        // console.log("> Plugin 'com.android.application' detected!")
        keywords = keywords.concat(getAndroidRootKeywords());
    }
    return keywords;
}
exports.getRootKeywords = getRootKeywords;
/**
 * Plugin Java's root keywords
 */
function getJavaRootKeywords() {
    /* [JAVA] ROOT => properties and methods */
    return [
        {
            label: 'reportsDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to generate reports into, relative to the build directory.'
        },
        {
            label: 'reportsDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory to generate reports into.'
        },
        {
            label: 'testResultsDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to generate test result .xml files into, relative to the build directory.'
        },
        {
            label: 'testResultsDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory to generate test result .xml files into.'
        },
        {
            label: 'testReportDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to generate the test report into, relative to the reports directory.'
        },
        {
            label: 'testReportDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory to generate the test report into.'
        },
        {
            label: 'libsDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to generate libraries into, relative to the build directory.'
        },
        {
            label: 'libsDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory to generate libraries into.'
        },
        {
            label: 'distsDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to generate distributions into, relative to the build directory.'
        },
        {
            label: 'distsDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory to generate distributions into.'
        },
        {
            label: 'docsDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to generate documentation into, relative to the build directory.'
        },
        {
            label: 'docsDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory to generate documentation into.'
        },
        {
            label: 'dependencyCacheDirName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the directory to use to cache source dependency information, relative to the build directory.'
        },
        {
            label: 'sourceCompatibility',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Java version compatibility to use when compiling Java source.'
        },
        {
            label: 'targetCompatibility',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Java version to generate classes for.'
        },
        {
            label: 'archivesBaseName',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The basename to use for archives, such as JAR or ZIP files.'
        },
        {
            label: 'manifest',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The manifest to include in all JAR files.'
        },
        {
            label: 'compileJava',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Compiles production Java source files using javac.'
        },
        {
            label: 'processResources',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Copies production resources into the production resources directory.'
        },
        {
            label: 'classes',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Assembles the production classes and resources directories.'
        },
        {
            label: 'compileTestJava',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Compiles test Java source files using javac.'
        },
        {
            label: 'processTestResources',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Copies test resources into the test resources directory.'
        },
        {
            label: 'testClasses',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Assembles the test classes and resources directories.'
        },
        {
            label: 'jar',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Assembles the JAR file.'
        },
        {
            label: 'javadoc',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Generates API documentation for the production Java source, using Javadoc.'
        },
        {
            label: 'test',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Runs the unit tests using JUnit or TestNG.'
        },
        {
            label: 'uploadArchives',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Uploads artifacts in the archives configuration, including the JAR file.'
        },
        {
            label: 'clean',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Deletes the project build directory.'
        },
        {
            label: 'assemble',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Assembles all the archives in the project.'
        },
        {
            label: 'check',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Performs all verification tasks in the project.'
        },
        {
            label: 'build',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Performs a full build of the project.'
        },
        {
            label: 'buildNeeded',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Performs a full build of the project and all projects it depends on.'
        },
        {
            label: 'buildDependents',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Performs a full build of the project and all projects which depend on it.'
        },
        {
            label: 'compile',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Compile time dependencies.'
        },
        {
            label: 'runtime',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Runtime dependencies.'
        },
        {
            label: 'testCompile',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Additional dependencies for compiling tests.'
        },
        {
            label: 'testRuntime',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Additional dependencies for running tests only.'
        },
        {
            label: 'archives',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Artifacts (e.g. jars) produced by this project.'
        },
        {
            label: 'default',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'The default configuration used by a project dependency on this project. Contains the artifacts and dependencies required by this project at runtime.'
        }
    ];
}
/**
 * Plugin Android's root keywords
 */
function getAndroidRootKeywords() {
    /* Root => android closure */
    return [
        {
            label: 'android',
            kind: vscode_languageserver_1.CompletionItemKind.Module
        },
    ];
}
//# sourceMappingURL=advisorRoot.js.map