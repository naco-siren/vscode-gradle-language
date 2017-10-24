"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
function getKeywordsRoot(pluginConf) {
    let keywords = getDefaultKeywordsRoot();
    ;
    if (pluginConf['java']) {
        console.log(">>> Plugin 'java' detected!");
        keywords = keywords.concat(getJavaBaseKeywordsRoot());
    }
    if (pluginConf['java-library']) {
        console.log(">>> Plugin 'java-library' detected!");
    }
    if (pluginConf['com.android.application']) {
        console.log(">>> Plugin 'com.android.application' detected!");
        keywords = keywords.concat(getAndroidKeywordsRoot());
    }
    return keywords;
}
exports.getKeywordsRoot = getKeywordsRoot;
function getDefaultKeywordsRoot() {
    /* Root => Build script structure */
    return [
        {
            label: 'allprojects',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures this project and each of its sub-projects.',
        },
        {
            label: 'artifacts',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the published artifacts for this project.'
        },
        {
            label: 'buildscript',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the build script classpath for this project.'
        },
        {
            label: 'configurations',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the dependency configurations for this project.'
        },
        {
            label: 'dependencies',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the dependencies for this project.'
        },
        {
            label: 'repositories',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the repositories for this project.'
        },
        {
            label: 'sourceSets',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the source sets of this project.'
        },
        {
            label: 'subprojects',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the sub-projects of this project.'
        },
        {
            label: 'publishing',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Configures the PublishingExtension added by the publishing plugin.'
        }
    ];
}
exports.getDefaultKeywordsRoot = getDefaultKeywordsRoot;
function getJavaBaseKeywordsRoot() {
    /* Root => Build script structure */
    return [
        {
            label: 'compileJava',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Compiles production Java source files using javac.'
        },
        {
            label: 'processResources',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Copies production resources into the production resources directory.'
        },
        {
            label: 'classes',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Assembles the production classes and resources directories.'
        },
        {
            label: 'compileTestJava',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Compiles test Java source files using javac.'
        },
        {
            label: 'processTestResources',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Copies test resources into the test resources directory.'
        },
        {
            label: 'testClasses',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Assembles the test classes and resources directories.'
        },
        {
            label: 'jar',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Assembles the JAR file.'
        },
        {
            label: 'javadoc',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Generates API documentation for the production Java source, using Javadoc.'
        },
        {
            label: 'test',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Runs the unit tests using JUnit or TestNG.'
        },
        {
            label: 'uploadArchives',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Uploads artifacts in the archives configuration, including the JAR file.'
        },
        {
            label: 'clean',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Deletes the project build directory.'
        },
        {
            label: 'assemble',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Assembles all the archives in the project.'
        },
        {
            label: 'check',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Performs all verification tasks in the project.'
        },
        {
            label: 'build',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Performs a full build of the project.'
        },
        {
            label: 'buildNeeded',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Performs a full build of the project and all projects it depends on.'
        },
        {
            label: 'buildDependents',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Performs a full build of the project and all projects which depend on it.'
        },
        {
            label: 'compile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Compile time dependencies.'
        },
        {
            label: 'runtime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Runtime dependencies.'
        },
        {
            label: 'testCompile',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Additional dependencies for compiling tests.'
        },
        {
            label: 'testRuntime',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Additional dependencies for running tests only.'
        },
        {
            label: 'archives',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'Artifacts (e.g. jars) produced by this project.'
        },
        {
            label: 'default',
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            documentation: 'The default configuration used by a project dependency on this project. Contains the artifacts and dependencies required by this project at runtime.'
        }
        // {
        //     label: '',
        //     kind: CompletionItemKind.Function,
        //     documentation: ''
        // },
    ];
}
exports.getJavaBaseKeywordsRoot = getJavaBaseKeywordsRoot;
function getAndroidKeywordsRoot() {
    /* Root => android closure */
    return [
        {
            label: 'android',
            kind: vscode_languageserver_1.CompletionItemKind.Module
        },
    ];
}
exports.getAndroidKeywordsRoot = getAndroidKeywordsRoot;
function getKeywords(method) {
    if (method == 'android') {
        return getAndroidKeywords();
    }
    else {
        return [];
    }
}
exports.getKeywords = getKeywords;
function getAndroidKeywords() {
    /* Android => properties and closures */
    return [
        {
            label: 'aaptOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Options for aapt, tool for packaging resources.'
        },
        {
            label: 'adbExecutable',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The adb executable from the compile SDK.'
        },
        {
            label: 'adbOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Adb options.'
        },
        {
            label: 'buildToolsVersion',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Required. Version of the build tools to use.'
        },
        {
            label: 'buildTypes',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Build types used by this project.'
        },
        {
            label: 'compileOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Compile options.'
        },
        {
            label: 'compileSdkVersion',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Required. Compile SDK version.'
        },
        {
            label: 'dataBinding',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Data Binding options.'
        },
        {
            label: 'defaultConfig',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Default config, shared by all flavors.'
        },
        {
            label: 'defaultPublishConfig',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Name of the configuration used to build the default artifact of this project.'
        },
        {
            label: 'dexOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Dex options.'
        },
        {
            label: 'externalNativeBuild',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'External native build options.'
        },
        {
            label: 'flavorDimensionList',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The names of flavor dimensions.'
        },
        {
            label: 'generatePureSplits',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Whether to generate pure splits or multi apk.'
        },
        {
            label: 'jacoco',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'JaCoCo options.'
        },
        {
            label: 'lintOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Lint options.'
        },
        {
            label: 'ndkDirectory',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The NDK directory used.'
        },
        {
            label: 'packagingOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Packaging options.'
        },
        {
            label: 'productFlavors',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'All product flavors used by this project.'
        },
        {
            label: 'publishNonDefault',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Whether to publish artifacts for all configurations, not just the default one.'
        },
        {
            label: 'resourcePrefix',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'A prefix to be used when creating new resources. Used by Android Studio.'
        },
        {
            label: 'sdkDirectory',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The SDK directory used.'
        },
        {
            label: 'signingConfigs',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Signing configs used by this project.'
        },
        {
            label: 'sourceSets',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'All source sets. Note that the Android plugin uses its own implementation of source sets, AndroidSourceSet.'
        },
        {
            label: 'splits',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'APK splits options.'
        },
        {
            label: 'testOptions',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Options for running tests.'
        },
        {
            label: 'variantFilter',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Callback to control which variants should be excluded.'
        },
    ];
}
exports.getAndroidKeywords = getAndroidKeywords;
//# sourceMappingURL=advisor.js.map