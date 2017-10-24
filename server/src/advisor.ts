import {CompletionItem, CompletionItemKind} from 'vscode-languageserver';
// import {Position} from '../node_modules/vscode-languageserver-types/lib/main';

export interface PluginConf {
    [param: string]: boolean;
}

export function getKeywordsRoot(pluginConf: PluginConf) : CompletionItem[] {
    let keywords: CompletionItem[] = getDefaultKeywordsRoot();;
    
    if (pluginConf['java']) {
        console.log(">>> Plugin 'java' detected!")
        keywords = keywords.concat(getJavaBaseKeywordsRoot());
    } 
    
    if (pluginConf['java-library']) {
        console.log(">>> Plugin 'java-library' detected!")
    }
    
    if (pluginConf['com.android.application']) {
        console.log(">>> Plugin 'com.android.application' detected!")
        keywords = keywords.concat(getAndroidKeywordsRoot());
    }

    return keywords;
}

export function getDefaultKeywordsRoot() : CompletionItem[] {
    /* Root => Build script structure */
    return [
        {
            label: 'allprojects',
            kind: CompletionItemKind.Function,
            documentation: 'Configures this project and each of its sub-projects.',
            // additionalTextEdits: [{
            //     range: {start: {line: pos.line, character: pos.character + 10}, end: {line: pos.line, character: pos.character + 10}},
            //     newText: "{}",
            // }]
        },
        {
            label: 'artifacts',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the published artifacts for this project.'
        },
        {
            label: 'buildscript',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the build script classpath for this project.'
        },
        {
            label: 'configurations',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the dependency configurations for this project.'
        },
        {
            label: 'dependencies',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the dependencies for this project.'
        },
        {
            label: 'repositories',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the repositories for this project.'
        },
        {
            label: 'sourceSets',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the source sets of this project.'
        },
        {
            label: 'subprojects',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the sub-projects of this project.'
        },
        {
            label: 'publishing',
            kind: CompletionItemKind.Function,
            documentation: 'Configures the PublishingExtension added by the publishing plugin.'
        }
    ]
}

export function getJavaBaseKeywordsRoot() : CompletionItem[] {
    /* Root => Build script structure */
    return [
        {
            label: 'compileJava',
            kind: CompletionItemKind.Function,
            documentation: 'Compiles production Java source files using javac.'
        },
        {
            label: 'processResources',
            kind: CompletionItemKind.Function,
            documentation: 'Copies production resources into the production resources directory.'
        },
        {
            label: 'classes',
            kind: CompletionItemKind.Function,
            documentation: 'Assembles the production classes and resources directories.'
        },
        {
            label: 'compileTestJava',
            kind: CompletionItemKind.Function,
            documentation: 'Compiles test Java source files using javac.'
        },
        {
            label: 'processTestResources',
            kind: CompletionItemKind.Function,
            documentation: 'Copies test resources into the test resources directory.'
        },
        {
            label: 'testClasses',
            kind: CompletionItemKind.Function,
            documentation: 'Assembles the test classes and resources directories.'
        },
        {
            label: 'jar',
            kind: CompletionItemKind.Function,
            documentation: 'Assembles the JAR file.'
        },
        {
            label: 'javadoc',
            kind: CompletionItemKind.Function,
            documentation: 'Generates API documentation for the production Java source, using Javadoc.'
        },
        {
            label: 'test',
            kind: CompletionItemKind.Function,
            documentation: 'Runs the unit tests using JUnit or TestNG.'
        },
        {
            label: 'uploadArchives',
            kind: CompletionItemKind.Function,
            documentation: 'Uploads artifacts in the archives configuration, including the JAR file.'
        },
        {
            label: 'clean',
            kind: CompletionItemKind.Function,
            documentation: 'Deletes the project build directory.'
        },
        {
            label: 'assemble',
            kind: CompletionItemKind.Function,
            documentation: 'Assembles all the archives in the project.'
        },
        {
            label: 'check',
            kind: CompletionItemKind.Function,
            documentation: 'Performs all verification tasks in the project.'
        },
        {
            label: 'build',
            kind: CompletionItemKind.Function,
            documentation: 'Performs a full build of the project.'
        },
        {
            label: 'buildNeeded',
            kind: CompletionItemKind.Function,
            documentation: 'Performs a full build of the project and all projects it depends on.'
        },
        {
            label: 'buildDependents',
            kind: CompletionItemKind.Function,
            documentation: 'Performs a full build of the project and all projects which depend on it.'
        },
        {
            label: 'compile',
            kind: CompletionItemKind.Function,
            documentation: 'Compile time dependencies.'
        },
        {
            label: 'runtime',
            kind: CompletionItemKind.Function,
            documentation: 'Runtime dependencies.'
        },
        {
            label: 'testCompile',
            kind: CompletionItemKind.Function,
            documentation: 'Additional dependencies for compiling tests.'
        },
        {
            label: 'testRuntime',
            kind: CompletionItemKind.Function,
            documentation: 'Additional dependencies for running tests only.'
        },
        {
            label: 'archives',
            kind: CompletionItemKind.Function,
            documentation: 'Artifacts (e.g. jars) produced by this project.'
        },
        {
            label: 'default',
            kind: CompletionItemKind.Function,
            documentation: 'The default configuration used by a project dependency on this project. Contains the artifacts and dependencies required by this project at runtime.'
        }
        // {
        //     label: '',
        //     kind: CompletionItemKind.Function,
        //     documentation: ''
        // },
    ]
}

export function getAndroidKeywordsRoot() : CompletionItem[] {
    /* Root => android closure */
    return [
        {
            label: 'android',
            kind: CompletionItemKind.Module
        },
    ]
}


export function getKeywords(method: string) : CompletionItem[] {
    
    if (method == 'android') {
        return getAndroidKeywords();
    } else {
        return [];
    }
}

export function getAndroidKeywords() : CompletionItem[] {
    /* Android => properties and closures */
    return [
        {
            label: 'aaptOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Options for aapt, tool for packaging resources.'
        },
        {   
            label: 'adbExecutable',
            kind: CompletionItemKind.Property,
            documentation: 'The adb executable from the compile SDK.'
        },
        {
            label: 'adbOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Adb options.'
        },
        {
            label: 'buildToolsVersion',
            kind: CompletionItemKind.Property,
            documentation: 'Required. Version of the build tools to use.'
        },
        {
            label: 'buildTypes',
            kind: CompletionItemKind.Property,
            documentation: 'Build types used by this project.'
        },
        {
            label: 'compileOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Compile options.'
        },
        {
            label: 'compileSdkVersion',
            kind: CompletionItemKind.Property,
            documentation: 'Required. Compile SDK version.'
        },
        {
            label: 'dataBinding',
            kind: CompletionItemKind.Property,
            documentation: 'Data Binding options.'
        },
        {
            label: 'defaultConfig',
            kind: CompletionItemKind.Property,
            documentation: 'Default config, shared by all flavors.'
        },
        {
            label: 'defaultPublishConfig',
            kind: CompletionItemKind.Property,
            documentation: 'Name of the configuration used to build the default artifact of this project.'
        },
        {
            label: 'dexOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Dex options.'
        },
        {
            label: 'externalNativeBuild',
            kind: CompletionItemKind.Property,
            documentation: 'External native build options.'
        },
        {
            label: 'flavorDimensionList',
            kind: CompletionItemKind.Property,
            documentation: 'The names of flavor dimensions.'
        },
        {
            label: 'generatePureSplits',
            kind: CompletionItemKind.Property,
            documentation: 'Whether to generate pure splits or multi apk.'
        },
        {
            label: 'jacoco',
            kind: CompletionItemKind.Property,
            documentation: 'JaCoCo options.'
        },
        {
            label: 'lintOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Lint options.'
        },
        {
            label: 'ndkDirectory',
            kind: CompletionItemKind.Property,
            documentation: 'The NDK directory used.'
        },
        {
            label: 'packagingOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Packaging options.'
        },
        {
            label: 'productFlavors',
            kind: CompletionItemKind.Property,
            documentation: 'All product flavors used by this project.'
        },
        {
            label: 'publishNonDefault',
            kind: CompletionItemKind.Property,
            documentation: 'Whether to publish artifacts for all configurations, not just the default one.'
        },
        {
            label: 'resourcePrefix',
            kind: CompletionItemKind.Property,
            documentation: 'A prefix to be used when creating new resources. Used by Android Studio.'
        },
        {
            label: 'sdkDirectory',
            kind: CompletionItemKind.Property,
            documentation: 'The SDK directory used.'
        },
        {
            label: 'signingConfigs',
            kind: CompletionItemKind.Property,
            documentation: 'Signing configs used by this project.'
        },
        {
            label: 'sourceSets',
            kind: CompletionItemKind.Property,
            documentation: 'All source sets. Note that the Android plugin uses its own implementation of source sets, AndroidSourceSet.'
        },
        {
            label: 'splits',
            kind: CompletionItemKind.Property,
            documentation: 'APK splits options.'
        },
        {
            label: 'testOptions',
            kind: CompletionItemKind.Property,
            documentation: 'Options for running tests.'
        },
        {
            label: 'variantFilter',
            kind: CompletionItemKind.Property,
            documentation: 'Callback to control which variants should be excluded.'
        },
        
    ]
}

