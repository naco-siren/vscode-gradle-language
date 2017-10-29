"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
// additionalTextEdits: [{
//     range: {start: {line: pos.line, character: pos.character + 10}, end: {line: pos.line, character: pos.character + 10}},
//     newText: "{}",
// }]
function getRootKeywords(fileName, pluginConf) {
    // Initialize the default keywords as core type and Script's keywords
    let keywords = [];
    keywords = keywords.concat(getScriptRootKeywords());
    keywords = keywords.concat(getCoreTypeKeywords());
    // Add delegate's keywords
    if (fileName == "build.gradle") {
        console.log("Delegate: Project");
        keywords = keywords.concat(getProjectRootKeywords());
    }
    else if (fileName == "init.gradle") {
        console.log("Delegate: Gradle");
        keywords = keywords.concat(getGradleRootKeywords());
    }
    else if (fileName == "settings.gradle") {
        console.log("Delegate: Settings");
        keywords = keywords.concat(getSettingsRootKeywords());
    }
    // Add Java plugin's keywords
    if (pluginConf['java']) {
        console.log("> Plugin 'java' detected!");
        keywords = keywords.concat(getJavaRootKeywords());
    }
    // Add Java-Library plugin's keywords
    if (pluginConf['java-library']) {
        console.log("> Plugin 'java-library' detected!");
    }
    // Add Android plugin's keywords
    if (pluginConf['com.android.application']) {
        console.log("> Plugin 'com.android.application' detected!");
        keywords = keywords.concat(getAndroidRootKeywords());
    }
    return keywords;
}
exports.getRootKeywords = getRootKeywords;
/**
 * Core type keywords
 */
function getCoreTypeKeywords() {
    return [
        {
            label: 'task',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'A Task represents a single atomic piece of work for a build, such as compiling classes or generating javadoc.'
        }
    ];
}
exports.getCoreTypeKeywords = getCoreTypeKeywords;
/**
 * Script keywords
 */
function getScriptRootKeywords() {
    return [
        {
            label: 'buildscript',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The script handler for this script. You can use this handler to manage the classpath used to compile and execute this script.'
        },
        {
            label: 'logger',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The logger for this script. You can use this in your script to write log messages.'
        },
        {
            label: 'logging',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The LoggingManager which can be used to receive logging and to control the standard output/error capture for this script. By default, System.out is redirected to the Gradle logging system at the QUIET log level, and System.err is redirected at the ERROR log level.'
        },
        {
            label: 'resources',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Provides access to resource-specific utility methods, for example factory methods that create various resources.'
        },
        {
            label: 'apply',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the delegate object for this script using plugins or scripts.'
        },
        {
            label: 'copy',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Copy the specified files. The given closure is used to configure a CopySpec, which is then used to copy the files.'
        },
        {
            label: 'copySpec',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Creates a CopySpec which can later be used to copy files or create an archive. The given closure is used to configure the CopySpec before it is returned by this method.'
        },
        {
            label: 'delete',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Deletes files and directories.'
        },
        {
            label: 'exec',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Executes an external command. The closure configures a ExecSpec.'
        },
        {
            label: 'file',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Resolves a file path relative to the directory containing this script. This works as described for Project.file(java.lang.Object)'
        },
        {
            label: 'fileTree',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Creates a new ConfigurableFileTree using the given base directory. The given baseDir path is evaluated as per Script.file(java.lang.Object).'
        },
        {
            label: 'files',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Creates a new ConfigurableFileCollection using the given paths. The file collection is configured using the given closure. This method works as described for Project.files(java.lang.Object, groovy.lang.Closure). Relative paths are resolved relative to the directory containing this script.'
        },
        {
            label: 'javaexec',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Executes a Java main class. The closure configures a JavaExecSpec.'
        },
        {
            label: 'mkdir',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Creates a directory and returns a file pointing to it.'
        },
        {
            label: 'relativePath',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Returns the relative path from the directory containing this script to the given path. The given path object is (logically) resolved as described for Script.file(java.lang.Object), from which a relative path is calculated.'
        },
        {
            label: 'tarTree',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Creates a new FileTree which contains the contents of the given TAR file.'
        },
        {
            label: 'uri',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Resolves a file path to a URI, relative to the directory containing this script. Evaluates the provided path object as described for Script.file(java.lang.Object), with the exception that any URI scheme is supported, not just \'file:\' URIs.'
        },
        {
            label: 'zipTree',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Creates a new FileTree which contains the contents of the given ZIP file. The given zipPath path is evaluated as per Script.file(java.lang.Object). You can combine this method with the Script.copy(groovy.lang.Closure) method to unzip a ZIP file.'
        }
    ];
}
/**
 * Delegate Project's root keywords
 */
function getProjectRootKeywords() {
    /* [PROJECT] ROOT => Build script structure */
    return [
        {
            label: 'project',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The Project instance'
        },
        {
            label: 'name',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The name of the project directory.'
        },
        {
            label: 'path',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The absolute path of the project.'
        },
        {
            label: 'description',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'A description for the project.'
        },
        {
            label: 'projectDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The directory containing the build script.'
        },
        {
            label: 'buildDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'projectDir/build'
        },
        {
            label: 'group',
            kind: vscode_languageserver_1.CompletionItemKind.Property
        },
        {
            label: 'version',
            kind: vscode_languageserver_1.CompletionItemKind.Property
        },
        {
            label: 'ant',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'An AntBuilder instance'
        },
        {
            label: 'allprojects',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures this project and each of its sub-projects.'
        },
        {
            label: 'artifacts',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the published artifacts for this project.'
        },
        {
            label: 'buildscript',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the build script classpath for this project.'
        },
        {
            label: 'configurations',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the dependency configurations for this project.'
        },
        {
            label: 'dependencies',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the dependencies for this project.'
        },
        {
            label: 'repositories',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the repositories for this project.'
        },
        {
            label: 'sourceSets',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the source sets of this project.'
        },
        {
            label: 'subprojects',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the sub-projects of this project.'
        },
        {
            label: 'publishing',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures the PublishingExtension added by the publishing plugin.'
        }
    ];
}
/**
 * Delegate Gradle's root keywords
 */
function getGradleRootKeywords() {
    /* [GRADLE] ROOT => properties and methods */
    return [
        {
            label: 'gradle',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Returns this Gradle instance. This method is useful in init scripts to explicitly access Gradle properties and methods. For example, using gradle.parent can express your intent better than using parent. This property also allows you to access Gradle properties from a scope where the property may be hidden, such as, for example, from a method or closure.'
        },
        {
            label: 'gradleHomeDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The Gradle home directory, if any. This directory is the directory containing the Gradle distribution executing this build.'
        },
        {
            label: 'gradleUserHomeDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The Gradle user home directory. This directory is used to cache downloaded resources, compiled build scripts and so on.'
        },
        {
            label: 'gradleVersion',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The current Gradle version.'
        },
        {
            label: 'includedBuilds',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The included builds for this build.'
        },
        {
            label: 'parent',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The parent build of this build, if any.'
        },
        {
            label: 'pluginManager',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The plugin manager for this plugin aware object.'
        },
        {
            label: 'plugins',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The container of plugins that have been applied to this object.'
        },
        {
            label: 'rootProject',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The root project of this build.'
        },
        {
            label: 'startParameter',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The StartParameter used to start this build.'
        },
        {
            label: 'taskGraph',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The TaskExecutionGraph for this build.'
        },
        {
            label: 'addBuildListener',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a BuildListener to this Build instance. The listener is notified of events which occur during the execution of the build.'
        },
        {
            label: 'addListener',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds the given listener to this build. The listener may implement any of the given listener interfaces:'
        },
        {
            label: 'addProjectEvaluationListener',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a listener to this build, to receive notifications as projects are evaluated.'
        },
        {
            label: 'afterProject',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a closure to be called immediately after a project is evaluated. The project is passed to the closure as the first parameter. The project evaluation failure, if any, is passed as the second parameter. Both parameters are optional.'
        },
        {
            label: 'afterProject',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds an action to be called immediately after a project is evaluated.'
        },
        {
            label: 'allprojects',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds an action to execute against all projects of this build. The action is executed immediately against all projects which are already available. It is also executed as subsequent projects are added to this build.'
        },
        {
            label: 'apply',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Applies zero or more plugins or scripts.'
        },
        {
            label: 'beforeProject',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a closure to be called immediately before a project is evaluated. The project is passed to the closure as a parameter.'
        },
        {
            label: 'buildFinished',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a closure to be called when the build is completed. All selected tasks have been executed. A BuildResult instance is passed to the closure as a parameter.'
        },
        {
            label: 'includedBuild',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Returns the included build with the specified name for this build.'
        },
        {
            label: 'projectsEvaluated',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a closure to be called when all projects for the build have been evaluated. The project objects are fully configured and are ready to use to populate the task graph. This Gradle instance is passed to the closure as a parameter.'
        },
        {
            label: 'projectsLoaded',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a closure to be called when the projects for the build have been created from the settings. None of the projects have been evaluated. This Gradle instance is passed to the closure as a parameter.'
        },
        {
            label: 'removeListener',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Removes the given listener from this build.'
        },
        {
            label: 'removeProjectEvaluationListener',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Removes the given listener from this build.'
        },
        {
            label: 'rootProject',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds an action to execute against the root project of this build. If the root project is already available, the action is executed immediately. Otherwise, the action is executed when the root project becomes available.'
        },
        {
            label: 'settingsEvaluated',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds a closure to be called when the build settings have been loaded and evaluated. The settings object is fully configured and is ready to use to load the build projects. The Settings object is passed to the closure as a parameter.'
        },
        {
            label: 'useLogger',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Uses the given object as a logger. The logger object may implement any of the listener interfaces supported by Gradle.addListener(java.lang.Object).'
        }
    ];
}
/**
 * Delegate Settings' root keywords
 */
function getSettingsRootKeywords() {
    /* [SETTINGS] ROOT => properties and methods */
    return [
        {
            label: 'buildCache',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The build cache configuration.'
        },
        {
            label: 'gradle',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The Gradle instance for the current build.'
        },
        {
            label: 'pluginManager',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The plugin manager for this plugin aware object.'
        },
        {
            label: 'plugins',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The container of plugins that have been applied to this object.'
        },
        {
            label: 'rootDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The root directory of the build. The root directory is the project directory of the root project.'
        },
        {
            label: 'rootProject',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The root project of the build.'
        },
        {
            label: 'settings',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Returns this settings object.'
        },
        {
            label: 'settingsDir',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The settings directory of the build. The settings directory is the directory containing the settings file.'
        },
        {
            label: 'startParameter',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The set of parameters used to invoke this instance of Gradle.'
        },
        {
            label: 'apply',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Applies zero or more plugins or scripts.'
        },
        {
            label: 'buildCache',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Configures build cache.'
        },
        {
            label: 'findProject',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Returns the project with the given path or project directory.'
        },
        {
            label: 'include',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds the given projects to the build. Each path in the supplied list is treated as the path of a project to add to the build. Note that these path are not file paths, but instead specify the location of the new project in the project hierarchy. As such, the supplied paths must use the \':\' character as separator (and NOT \'/\').'
        },
        {
            label: 'includeBuild',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Includes a build at the specified path to the composite build.'
        },
        {
            label: 'includeFlat',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Adds the given projects to the build. Each name in the supplied list is treated as the name of a project to add to the build.'
        },
        {
            label: 'project',
            kind: vscode_languageserver_1.CompletionItemKind.Method,
            documentation: 'Returns the project with the given path or project directory.'
        }
    ];
}
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
/**
 * Return the keywords of current method name
 * @param method
 * @param pluginConf
 */
function getKeywords(method, pluginConf) {
    // Initialize the default keywords as Script's keywords
    let keywords = [];
    keywords = keywords.concat(getDefaultKeywords(method));
    // Add Java plugin's keywords
    if (pluginConf['java']) {
        console.log("> Plugin 'java' detected!");
        keywords = keywords.concat(getJavaKeywords(method));
    }
    // Add Java-Library plugin's keywords
    if (pluginConf['java-library']) {
        console.log("> Plugin 'java-library' detected!");
    }
    // Add Android plugin's keywords
    if (pluginConf['com.android.application']) {
        console.log("> Plugin 'com.android.application' detected!");
        keywords = keywords.concat(getAndroidKeywords(method));
    }
    return keywords;
}
exports.getKeywords = getKeywords;
/**
 * Default keywords
 * @param method
 */
function getDefaultKeywords(method) {
    let map = {
        /* [DEFAULT] keywords: "all", "each", etc. */
        "all": [],
        "each": [],
        /* [DEFAULT] task => properties and closures */
        "task": [
            {
                label: 'actions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The sequence of Action objects which will be executed by this task, in the order of execution.'
            },
            {
                label: 'ant',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The AntBuilder for this task. You can use this in your build file to execute ant tasks.'
            },
            {
                label: 'convention',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Convention object for this task. A Plugin can use the convention object to contribute properties and methods to this task.'
            },
            {
                label: 'dependsOn',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The dependencies of this task.'
            },
            {
                label: 'description',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The description of this task.'
            },
            {
                label: 'destroyables',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The destroyables of this task.'
            },
            {
                label: 'didWork',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Checks if the task actually did any work. Even if a Task executes, it may determine that it has nothing to do. For example, a compilation task may determine that source files have not changed since the last time a the task was run.'
            },
            {
                label: 'enabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns if this task is enabled or not.'
            },
            {
                label: 'extensions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The container of extensions.'
            },
            {
                label: 'finalizedBy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns tasks that finalize this task.'
            },
            {
                label: 'group',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The task group which this task belongs to. The task group is used in reports and user interfaces to group related tasks together when presenting a list of tasks to the user.'
            },
            {
                label: 'inputs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The inputs of this task.'
            },
            {
                label: 'logger',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The logger for this task. You can use this in your build file to write log messages.'
            },
            {
                label: 'logging',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The LoggingManager which can be used to receive logging and to control the standard output/error capture for this task. By default, System.out is redirected to the Gradle logging system at the QUIET log level, and System.err is redirected at the ERROR log level.'
            },
            {
                label: 'mustRunAfter',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns tasks that this task must run after.'
            },
            {
                label: 'name',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of this task. The name uniquely identifies the task within its Project.'
            },
            {
                label: 'outputs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The outputs of this task.'
            },
            {
                label: 'path',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path of the task, which is a fully qualified name for the task. The path of a task is the path of its Project plus the name of the task, separated by :.'
            },
            {
                label: 'project',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Project which this task belongs to.'
            },
            {
                label: 'state',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The execution state of this task. This provides information about the execution of this task, such as whether it has executed, been skipped, has failed, etc.'
            },
            {
                label: 'taskDependencies',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns a TaskDependency which contains all the tasks that this task depends on.'
            },
            {
                label: 'temporaryDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns a directory which this task can use to write temporary files to. Each task instance is provided with a separate temporary directory. There are no guarantees that the contents of this directory will be kept beyond the execution of the task.'
            },
            {
                label: 'deleteAllActions',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Removes all the actions of this task.'
            },
            {
                label: 'hasProperty',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Determines if this task has the given property. See here for details of the properties which are available for a task.'
            },
            {
                label: 'onlyIf',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Execute the task only if the given closure returns true. The closure will be evaluated at task execution time, not during configuration. The closure will be passed a single parameter, this task. If the closure returns false, the task will be skipped.'
            },
            {
                label: 'property',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Returns the value of the given property of this task. This method locates a property as follows:'
            },
            {
                label: 'setProperty(name, value)',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets a property of this task. This method searches for a property with the given name in the following locations, and sets the property on the first location where it finds the property.'
            }
        ]
    };
    let retval = map[method];
    if (retval == undefined)
        return [];
    else
        return retval;
}
/**
 * Java plugin's keywords
 * @param method
 */
function getJavaKeywords(method) {
    let map = {
        /*  */
        "": [
            {
                label: '',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: ''
            },
        ],
    };
    let retval = map[method];
    if (retval == undefined)
        return [];
    else
        return retval;
}
/**
 * Android plugin's keywords
 * @param method
 */
function getAndroidKeywords(method) {
    // Preprocess method name
    if (method.endsWith("Compile")) {
        method = "compile";
    }
    let map = {
        /* android => properties and closures */
        "android": [
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
                label: 'applicationVariants',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns a collection of build variants that the app project includes.'
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
                label: 'testBuildType',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the build type that the plugin should use to test the module.'
            },
            {
                label: 'testOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Options for running tests.'
            },
            {
                label: 'testVariants',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns a collection of Android test build variants.'
            },
            {
                label: 'unitTestVariants',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns a collection of Android unit test build variants.'
            },
            {
                label: 'variantFilter',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Callback to control which variants should be excluded.'
            },
            {
                label: 'flavorDimensions',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the names of product flavor dimensions for this project.'
            },
            {
                label: 'useLibrary',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Includes the specified library to the classpath.'
            }
        ],
        // DSL object for configuring aapt options.
        'aaptOptions': [
            {
                label: 'additionalParameters',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of additional parameters to pass to appt.'
            },
            {
                label: 'cruncherProcesses',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Obtains the number of cruncher processes to use. More cruncher processes will crunch files faster, but will require more memory and CPU.'
            },
            {
                label: 'failOnMissingConfigEntry',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Forces aapt to return an error if it fails to find an entry for a configuration.'
            },
            {
                label: 'ignoreAssets',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Pattern describing assets to be ignore.'
            },
            {
                label: 'ignoreAssetsPattern',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Pattern describing assets to be ignore.'
            },
            {
                label: 'noCompress',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Extensions of files that will not be stored compressed in the APK. Adding an empty extension, i.e., setting noCompress \'\' will trivially disable compression for all files.'
            },
            {
                label: 'additionalParameters',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds additional parameters to be passed to aapt.'
            },
            {
                label: 'noCompress',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets extensions of files that will not be stored compressed in the APK.'
            }
        ],
        // Options for the adb tool. 
        'adbOptions': [
            {
                label: 'installOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of FULL_APK installation options.'
            },
            {
                label: 'timeOutInMs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The time out used for all adb operations.'
            }
        ],
        // DSL object to configure build types.
        "buildTypes": [],
        // A Dependency on a module outside the current project.
        'compile': [
            {
                label: 'addArtifact',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an artifact to this dependency.'
            },
            {
                label: 'artifact',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an artifact to this dependency.'
            },
            {
                label: 'copy',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Creates and returns a new dependency with the property values of this one.'
            },
            {
                label: 'exclude',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an exclude rule to exclude transitive dependencies of this dependency.'
            },
            {
                label: 'getArtifacts',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Returns the artifacts belonging to this dependency.'
            },
            {
                label: 'getExcludeRules',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Returns the exclude rules for this dependency.'
            },
            {
                label: 'getTargetConfiguration',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Returns the requested target configuration of this dependency.'
            },
            {
                label: 'isTransitive',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Returns whether this dependency should be resolved including or excluding its transitive dependencies.'
            },
            {
                label: 'setTargetConfiguration',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the requested target configuration of this dependency.'
            },
            {
                label: 'setTransitive',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets whether this dependency should be resolved including or excluding its transitive dependencies.'
            }
        ],
        // Java compilation options.
        'compileOptions': [
            {
                label: 'encoding',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Java source files encoding.'
            },
            {
                label: 'incremental',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether java compilation should use Gradle\'s new incremental model.'
            },
            {
                label: 'sourceCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Language level of the java source code.'
            },
            {
                label: 'targetCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version of the generated Java bytecode.'
            }
        ],
        // DSL object for configuring databinding options.
        'dataBinding': [
            {
                label: 'addDefaultAdapters',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to add the default data binding adapters.'
            },
            {
                label: 'enabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to enable data binding.'
            },
            {
                label: 'enabledForTests',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to run data binding code generation for test projects'
            },
            {
                label: 'version',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The version of data binding to use.'
            }
        ],
        // DSL object for the defaultConfig object.
        'defaultConfig': [
            {
                label: 'applicationId',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The application ID.'
            },
            {
                label: 'applicationIdSuffix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Application id suffix. It is appended to the "base" application id when calculating the final application id for a variant.'
            },
            {
                label: 'consumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'ProGuard rule files to be included in the published AAR.'
            },
            {
                label: 'dimension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the flavor dimension that this product flavor belongs to.'
            },
            {
                label: 'externalNativeBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant CMake and ndk-build configurations for your external native build.'
            },
            {
                label: 'javaCompileOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Options for configuration Java compilation.'
            },
            {
                label: 'manifestPlaceholders',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The manifest placeholders.'
            },
            {
                label: 'multiDexEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether Multi-Dex is enabled for this variant.'
            },
            {
                label: 'multiDexKeepFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Text file that specifies additional classes that will be compiled into the main dex file.'
            },
            {
                label: 'multiDexKeepProguard',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Text file with additional ProGuard rules to be used to determine which classes are compiled into the main dex file.'
            },
            {
                label: 'ndk',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant configurations for the NDK, such as ABI filters.'
            },
            {
                label: 'proguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'signingConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Signing config used by this product flavor.'
            },
            {
                label: 'testApplicationId',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Test application ID.'
            },
            {
                label: 'testFunctionalTest',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'testHandleProfiling',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'testInstrumentationRunner',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Test instrumentation runner class name.'
            },
            {
                label: 'testInstrumentationRunnerArguments',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Test instrumentation runner custom arguments.'
            },
            {
                label: 'vectorDrawables',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Options to configure the build-time support for vector drawables.'
            },
            {
                label: 'versionCode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version code.'
            },
            {
                label: 'versionName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version name.'
            },
            {
                label: 'versionNameSuffix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version name suffix. It is appended to the "base" version name when calculating the final version name for a variant.'
            },
            {
                label: 'wearAppUnbundled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether to enable unbundling mode for embedded wear app. If true, this enables the app to transition from an embedded wear app to one distributed by the play store directly.'
            },
            {
                label: 'buildConfigField',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new field to the generated BuildConfig class.'
            },
            {
                label: 'maxSdkVersion',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the maximum SDK version to the given value.'
            },
            {
                label: 'minSdkVersion',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets minimum SDK version.'
            },
            {
                label: 'missingDimensionStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies a flavor that the plugin should try to use from a given dimension in a dependency.'
            },
            {
                label: 'proguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies a ProGuard configuration file that the plugin should use.'
            },
            {
                label: 'proguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'resConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a resource configuration filter.'
            },
            {
                label: 'resConfigs',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds several resource configuration filters.'
            },
            {
                label: 'resValue',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new generated resource.'
            },
            {
                label: 'setConsumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies a proguard rule file to be included in the published AAR.'
            },
            {
                label: 'setProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the ProGuard configuration files.'
            },
            {
                label: 'setTestProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies proguard rule files to be used when processing test code.'
            },
            {
                label: 'targetSdkVersion',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the target SDK version to the given value.'
            },
            {
                label: 'testInstrumentationRunnerArgument',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a custom argument to the test instrumentation runner.'
            },
            {
                label: 'testInstrumentationRunnerArguments',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds custom arguments to the test instrumentation runner.'
            },
            {
                label: 'testProguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be used when processing test code.'
            },
            {
                label: 'testProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be used when processing test code.'
            }
        ],
        // Configures the dependencies for this project.
        'dependencies': [
            {
                label: 'compile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
            },
            {
                label: 'testCompile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
            },
            {
                label: 'runtime',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
            },
            {
                label: 'module',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Creates a dependency on a client module.'
            },
            {
                label: 'project',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Creates a dependency on a project.'
            },
            {
                label: 'mavenCentral',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven central repository.'
            },
            {
                label: 'google',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven Google repository.'
            },
            {
                label: 'maven',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven repositories.'
            },
            {
                label: 'flatDir',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Flat directory repository.'
            },
            {
                label: 'ivy',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Ivy repositories'
            }
        ],
        // DSL object for configuring dx options.
        'dexOptions': [
            {
                label: 'additionalParameters',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'List of additional parameters to be passed to dx.'
            },
            {
                label: 'javaMaxHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the -Xmx value when calling dx. Example value is "2048m".'
            },
            {
                label: 'jumboMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Enable jumbo mode in dx (--force-jumbo).'
            },
            {
                label: 'keepRuntimeAnnotatedClasses',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Keep all classes with runtime annotations in the main dex in legacy multidex.'
            },
            {
                label: 'maxProcessCount',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of concurrent processes that can be used to dex. Defaults to 4.'
            },
            {
                label: 'preDexLibraries',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to pre-dex libraries. This can improve incremental builds, but clean builds may be slower.'
            },
            {
                label: 'threadCount',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Number of threads to use when running dx. Defaults to 4.'
            }
        ],
        // DSL object to configure external native builds using CMake or ndk-build.
        'externalNativeBuild': [
            {
                label: 'cmake',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Encapsulates CMake build options.'
            },
            {
                label: 'ndkBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Encapsulates ndk-build options.'
            }
        ],
        // DSL object for configuring lint options.
        'lintOptions': [
            {
                label: 'abortOnError',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether lint should set the exit code of the process if errors are found.'
            },
            {
                label: 'absolutePaths',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether lint should display full paths in the error output. By default the paths are relative to the path lint was invoked from.'
            },
            {
                label: 'check',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The exact set of issues to check, or null to run the issues that are enabled by default plus any issues enabled via LintOptions.getEnable() and without issues disabled via LintOptions.getDisable(). If non-null, callers are allowed to modify this collection.'
            },
            {
                label: 'checkAllWarnings',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint should check all warnings, including those off by default.'
            },
            {
                label: 'checkReleaseBuilds',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint should check for fatal errors during release builds. Default is true. If issues with severity "fatal" are found, the release build is aborted.'
            },
            {
                label: 'disable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of issue id\'s to suppress. Callers are allowed to modify this collection.'
            },
            {
                label: 'enable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of issue id\'s to enable. Callers are allowed to modify this collection. To enable a given issue, add the issue ID to the returned set.'
            },
            {
                label: 'explainIssues',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint should include explanations for issue errors. (Note that HTML and XML reports intentionally do this unconditionally, ignoring this setting.)'
            },
            {
                label: 'htmlOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The optional path to where an HTML report should be written'
            },
            {
                label: 'htmlReport',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether we should write an HTML report. Default true. The location can be controlled by LintOptions.getHtmlOutput().'
            },
            {
                label: 'ignoreWarnings',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint will only check for errors (ignoring warnings)'
            },
            {
                label: 'lintConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The default configuration file to use as a fallback'
            },
            {
                label: 'noLines',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether lint should include the source lines in the output where errors occurred (true by default)'
            },
            {
                label: 'quiet',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint should be quiet (for example, not write informational messages such as paths to report files written)'
            },
            {
                label: 'severityOverrides',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'An optional map of severity overrides. The map maps from issue id\'s to the corresponding severity to use, which must be "fatal", "error", "warning", or "ignore".'
            },
            {
                label: 'showAll',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint should include all output (e.g. include all alternate locations, not truncating long messages, etc.)'
            },
            {
                label: 'textOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The optional path to where a text report should be written. The special value "stdout" can be used to point to standard output.'
            },
            {
                label: 'textReport',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether we should write an text report. Default false. The location can be controlled by LintOptions.getTextOutput().'
            },
            {
                label: 'warningsAsErrors',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether lint should treat all warnings as errors'
            },
            {
                label: 'xmlOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The optional path to where an XML report should be written'
            },
            {
                label: 'xmlReport',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether we should write an XML report. Default true. The location can be controlled by LintOptions.getXmlOutput().'
            },
            {
                label: 'check',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the ids to the set of issues to check.'
            },
            {
                label: 'disable',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the ids to the set of issues to disable.'
            },
            {
                label: 'enable',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the ids to the set of issues to enable.'
            },
            {
                label: 'error',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            },
            {
                label: 'fatal',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            },
            {
                label: 'ignore',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            },
            {
                label: 'warning',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            }
        ],
        // DSL object for configuring APK packaging options.
        'packagingOptions': [
            {
                label: 'doNotStrip',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of patterns for native library that should not be stripped of debug symbols.'
            },
            {
                label: 'excludes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of excluded paths.'
            },
            {
                label: 'merges',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of patterns where all occurrences are concatenated and packaged in the APK.'
            },
            {
                label: 'pickFirsts',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of patterns where the first occurrence is packaged in the APK. First pick patterns do get packaged in the APK, but only the first occurrence found gets packaged.'
            },
            {
                label: 'exclude',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an excluded pattern.'
            },
            {
                label: 'merge',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a merge pattern.'
            },
            {
                label: 'pickFirst',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a first-pick pattern.'
            }
        ],
        // Encapsulates all product flavors properties for this project.
        'productFlavors': [],
        // DSL object for configuring APK Splits options.
        'splits': [
            {
                label: 'abi',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'ABI settings.'
            },
            {
                label: 'abiFilters',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of ABI filters used for multi-apk.'
            },
            {
                label: 'density',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Density settings.'
            },
            {
                label: 'densityFilters',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of Density filters used for multi-apk.'
            },
            {
                label: 'language',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Language settings.'
            },
            {
                label: 'languageFilters',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The list of language filters used for multi-apk.'
            }
        ],
        // Options for running tests.
        'testOptions': [
            {
                label: 'animationsDisabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Disables animations during instrumented tests.'
            },
            {
                label: 'execution',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to use on-device test orchestration.'
            },
            {
                label: 'reportDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Name of the reports directory.'
            },
            {
                label: 'resultsDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Name of the results directory.'
            },
            {
                label: 'unitTests',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Configures unit test options.'
            }
        ]
    };
    return map[method];
}
/**
 * Return the keywords of parent closure's method name
 * @param method
 * @param pluginConf
 */
function getNestedKeywords(method, pluginConf) {
    // Initialize the default keywords as Script's keywords
    let keywords = [];
    // Add Java plugin's nested keywords
    if (pluginConf['java']) {
        console.log("> Plugin 'java' detected!");
        keywords = keywords.concat(getJavaNestedKeywords(method));
    }
    // Add Java-Library plugin's keywords
    if (pluginConf['java-library']) {
        console.log("> Plugin 'java-library' detected!");
    }
    // Add Android plugin's keywords
    if (pluginConf['com.android.application']) {
        console.log("> Plugin 'com.android.application' detected!");
        keywords = keywords.concat(getAndroidNestedKeywords(method));
    }
    return keywords;
}
exports.getNestedKeywords = getNestedKeywords;
/**
 * Java plugin's nested keywords
 * @param method
 */
function getJavaNestedKeywords(method) {
    let map = {
        /* sourceSets => properties */
        "sourceSets": [
            {
                label: 'name',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of the source set, used to identify it.'
            },
            {
                label: 'output',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The output files of the source set, containing its compiled classes and resources.'
            },
            {
                label: 'output.classesDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directories to generate the classes of this source set into.'
            },
            {
                label: 'output.resourcesDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the resources of this source set into.'
            },
            {
                label: 'compileClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use when compiling the source files of this source set.'
            },
            {
                label: 'runtimeClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use when executing the classes of this source set.'
            },
            {
                label: 'java',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java source files of this source set. Contains only .java files found in the Java source directories, and excludes all other files.'
            },
            {
                label: 'java.srcDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The source directories containing the Java source files of this source set.'
            },
            {
                label: 'java.outputDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate compiled Java sources into.'
            },
            {
                label: 'resources',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The resources of this source set. Contains only resources, and excludes any .java files found in the resource source directories. Other plugins, such as the Groovy plugin, exclude additional types of files from this collection.'
            },
            {
                label: 'resources.srcDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The source directories containing the resources of this source set.'
            },
            {
                label: 'allJava',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'All .java files of this source set. Some plugins, such as the Groovy plugin, add additional Java source files to this collection.'
            },
            {
                label: 'allSource',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'All source files of this source set. This include all resource files and all Java source files. Some plugins, such as the Groovy plugin, add additional source files to this collection.'
            }
        ],
    };
    let retval = map[method];
    if (retval == undefined)
        return [];
    else
        return retval;
}
/**
 * Android plugin's nested keywords
 * @param method
 */
function getAndroidNestedKeywords(method) {
    let map = {
        // DSL object to configure build types.
        'buildTypes': [
            {
                label: 'applicationIdSuffix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Application id suffix. It is appended to the "base" application id when calculating the final application id for a variant.'
            },
            {
                label: 'consumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'ProGuard rule files to be included in the published AAR.'
            },
            {
                label: 'crunchPngs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to crunch PNGs.'
            },
            {
                label: 'debuggable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether this build type should generate a debuggable apk.'
            },
            {
                label: 'embedMicroApp',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether a linked Android Wear app should be embedded in variant using this build type.'
            },
            {
                label: 'javaCompileOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Options for configuration Java compilation.'
            },
            {
                label: 'jniDebuggable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether this build type is configured to generate an APK with debuggable native code.'
            },
            {
                label: 'manifestPlaceholders',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The manifest placeholders.'
            },
            {
                label: 'matchingFallbacks',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies a sorted list of build types that the plugin should try to use when a direct variant match with a local module dependency is not possible.'
            },
            {
                label: 'minifyEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether removal of unused java code is enabled.'
            },
            {
                label: 'multiDexEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether Multi-Dex is enabled for this variant.'
            },
            {
                label: 'multiDexKeepFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Text file that specifies additional classes that will be compiled into the main dex file.'
            },
            {
                label: 'multiDexKeepProguard',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Text file with additional ProGuard rules to be used to determine which classes are compiled into the main dex file.'
            },
            {
                label: 'name',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Name of this build type.'
            },
            {
                label: 'proguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'pseudoLocalesEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to generate pseudo locale in the APK.'
            },
            {
                label: 'renderscriptDebuggable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether the build type is configured to generate an apk with debuggable RenderScript code.'
            },
            {
                label: 'renderscriptOptimLevel',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Optimization level to use by the renderscript compiler.'
            },
            {
                label: 'shrinkResources',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether shrinking of unused resources is enabled. Default is false;'
            },
            {
                label: 'signingConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The signing configuration.'
            },
            {
                label: 'testCoverageEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether test coverage is enabled for this build type.'
            },
            {
                label: 'useJack',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Jack toolchain is deprecated.'
            },
            {
                label: 'useProguard',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to always use ProGuard for code and resource shrinking.'
            },
            {
                label: 'versionNameSuffix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version name suffix. It is appended to the "base" version name when calculating the final version name for a variant.'
            },
            {
                label: 'zipAlignEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether zipalign is enabled for this build type.'
            },
            {
                label: 'buildConfigField',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new field to the generated BuildConfig class.'
            },
            {
                label: 'consumerProguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be included in the published AAR.'
            },
            {
                label: 'consumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be included in the published AAR.'
            },
            {
                label: 'externalNativeBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure native build options.'
            },
            {
                label: 'initWith',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Copies all properties from the given build type.'
            },
            {
                label: 'proguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new ProGuard configuration file.'
            },
            {
                label: 'proguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds new ProGuard configuration files.'
            },
            {
                label: 'resValue',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new generated resource.'
            },
            {
                label: 'setProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the ProGuard configuration files.'
            }
        ],
        // Encapsulates all product flavors properties for this project.
        'productFlavors': [
            {
                label: 'applicationId',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The application ID.'
            },
            {
                label: 'applicationIdSuffix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Application id suffix. It is appended to the "base" application id when calculating the final application id for a variant.'
            },
            {
                label: 'consumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'ProGuard rule files to be included in the published AAR.'
            },
            {
                label: 'dimension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the flavor dimension that this product flavor belongs to.'
            },
            {
                label: 'externalNativeBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant CMake and ndk-build configurations for your external native build.'
            },
            {
                label: 'javaCompileOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Options for configuration Java compilation.'
            },
            {
                label: 'manifestPlaceholders',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The manifest placeholders.'
            },
            {
                label: 'matchingFallbacks',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies a sorted list of product flavors that the plugin should try to use when a direct variant match with a local module dependency is not possible.'
            },
            {
                label: 'multiDexEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether Multi-Dex is enabled for this variant.'
            },
            {
                label: 'multiDexKeepFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Text file that specifies additional classes that will be compiled into the main dex file.'
            },
            {
                label: 'multiDexKeepProguard',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Text file with additional ProGuard rules to be used to determine which classes are compiled into the main dex file.'
            },
            {
                label: 'ndk',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant configurations for the NDK, such as ABI filters.'
            },
            {
                label: 'proguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'signingConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Signing config used by this product flavor.'
            },
            {
                label: 'testApplicationId',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Test application ID.'
            },
            {
                label: 'testFunctionalTest',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'testHandleProfiling',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'testInstrumentationRunner',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Test instrumentation runner class name.'
            },
            {
                label: 'testInstrumentationRunnerArguments',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Test instrumentation runner custom arguments.'
            },
            {
                label: 'vectorDrawables',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Options to configure the build-time support for vector drawables.'
            },
            {
                label: 'versionCode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version code.'
            },
            {
                label: 'versionName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version name.'
            },
            {
                label: 'versionNameSuffix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Version name suffix. It is appended to the "base" version name when calculating the final version name for a variant.'
            },
            {
                label: 'wearAppUnbundled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns whether to enable unbundling mode for embedded wear app. If true, this enables the app to transition from an embedded wear app to one distributed by the play store directly.'
            },
            {
                label: 'buildConfigField',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new field to the generated BuildConfig class.'
            },
            {
                label: 'consumerProguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be included in the published AAR.'
            },
            {
                label: 'consumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be included in the published AAR.'
            },
            {
                label: 'maxSdkVersion',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the maximum SDK version to the given value.'
            },
            {
                label: 'missingDimensionStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies a flavor that the plugin should try to use from a given dimension in a dependency.'
            },
            {
                label: 'proguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies a ProGuard configuration file that the plugin should use.'
            },
            {
                label: 'proguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'resConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a resource configuration filter.'
            },
            {
                label: 'resConfigs',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds several resource configuration filters.'
            },
            {
                label: 'resValue',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a new generated resource.'
            },
            {
                label: 'setConsumerProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies a proguard rule file to be included in the published AAR.'
            },
            {
                label: 'setProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the ProGuard configuration files.'
            },
            {
                label: 'setTestProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies proguard rule files to be used when processing test code.'
            },
            {
                label: 'targetSdkVersion',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the target SDK version to the given value.'
            },
            {
                label: 'testInstrumentationRunnerArgument',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a custom argument to the test instrumentation runner'
            },
            {
                label: 'testInstrumentationRunnerArguments',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds custom arguments to the test instrumentation runner'
            },
            {
                label: 'testProguardFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be used when processing test code.'
            },
            {
                label: 'testProguardFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be used when processing test code.'
            }
        ],
        // DSL object for configuring signing configs.
        'signingConfigs': [
            {
                label: 'keyAlias',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Key alias used when signing.'
            },
            {
                label: 'keyPassword',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Key password used when signing.'
            },
            {
                label: 'storeFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Store file used when signing.'
            },
            {
                label: 'storePassword',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Store password used when signing.'
            },
            {
                label: 'storeType',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Store type used when signing.'
            },
            {
                label: 'v1SigningEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether signing using JAR Signature Scheme (aka v1 signing) is enabled.'
            },
            {
                label: 'v2SigningEnabled',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether signing using APK Signature Scheme v2 (aka v2 signing) is enabled.'
            }
        ],
        // An AndroidSourceSet represents a logical group of Java, aidl and RenderScript sources as well as Android and non-Android (Java-style) resources.
        'sourceSets': [
            {
                label: 'aidl',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android AIDL source directory for this source set.'
            },
            {
                label: 'assets',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android Assets directory for this source set.'
            },
            {
                label: 'java',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java source which is to be compiled by the Java compiler into the class output directory.'
            },
            {
                label: 'jni',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android JNI source directory for this source set.'
            },
            {
                label: 'jniLibs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android JNI libs directory for this source set.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android Manifest file for this source set.'
            },
            {
                label: 'name',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of this source set.'
            },
            {
                label: 'renderscript',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android RenderScript source directory for this source set.'
            },
            {
                label: 'res',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Android Resources directory for this source set.'
            },
            {
                label: 'resources',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java resources which are to be copied into the javaResources output directory.'
            },
            {
                label: 'setRoot',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the root of the source sets to a given path. All entries of the source set are located under this root directory.'
            }
        ],
    };
    let retval = map[method];
    if (retval == undefined)
        return [];
    else
        return retval;
}
/**
 * TaskContainer.create()'s parameters
 */
function getTaskCreationOptions() {
    return [
        {
            label: 'name',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The name of the task to create.'
        },
        {
            label: 'type',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The class of the task to create.'
        },
        {
            label: 'action',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The closure or Action to execute when the task executes.'
        },
        {
            label: 'overwrite',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'Replace an existing task?'
        },
        {
            label: 'dependsOn',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The dependencies of the task.'
        },
        {
            label: 'group',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The group of the task.'
        },
        {
            label: 'description',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The description of the task.'
        }
    ];
}
exports.getTaskCreationOptions = getTaskCreationOptions;
/**
* Core type Task's types
*/
function getTaskTypes() {
    return [
        {
            label: 'AntlrTask',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates parsers from Antlr grammars.'
        },
        {
            label: 'BuildEnvironmentReportTask',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Provides information about the build environment for the project that the task is associated with.'
        },
        {
            label: 'Checkstyle',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Runs Checkstyle against some source files.'
        },
        {
            label: 'CodeNarc',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Runs CodeNarc against some source files.'
        },
        {
            label: 'CompareGradleBuilds',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Executes two Gradle builds (that can be the same build) with specified versions and compares the outcomes. Please see the “Comparing Builds” chapter of the Gradle User Guide for more information.'
        },
        {
            label: 'Copy',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Copies files into a destination directory. This task can also rename and filter files as it copies. The task implements CopySpec for specifying what to copy.'
        },
        {
            label: 'CreateStartScripts',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Creates start scripts for launching JVM applications.'
        },
        {
            label: 'Delete',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Deletes files or directories.'
        },
        {
            label: 'Ear',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Assembles an EAR archive.'
        },
        {
            label: 'Exec',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Executes a command line process. Example:'
        },
        {
            label: 'FindBugs',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Analyzes code with FindBugs. See the FindBugs Manual for additional information on configuration options.'
        },
        {
            label: 'GenerateIvyDescriptor',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates an Ivy XML Module Descriptor file.'
        },
        {
            label: 'GenerateMavenPom',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates a Maven module descriptor (POM) file.'
        },
        {
            label: 'GenerateBuildDashboard',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates build dashboard report.'
        },
        {
            label: 'GradleBuild',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Executes a Gradle build.'
        },
        {
            label: 'GroovyCompile',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Compiles Groovy source files, and optionally, Java source files.'
        },
        {
            label: 'Groovydoc',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates HTML API documentation for Groovy source, and optionally, Java source.'
        },
        {
            label: 'HtmlDependencyReportTask',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates an HTML dependency report. This report combines the features of the ASCII dependency report and those of the ASCII dependency insight report. For a given project, it generates a tree of the dependencies of every configuration, and each dependency can be clicked to show the insight of this dependency.'
        },
        {
            label: 'JacocoReport',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Task to generate HTML, Xml and CSV reports of Jacoco coverage data.'
        },
        {
            label: 'JacocoMerge',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Task to merge multiple execution data files into one.'
        },
        {
            label: 'JacocoCoverageVerification',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Task for verifying code coverage metrics. Fails the task if violations are detected based on specified rules.'
        },
        {
            label: 'Jar',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Assembles a JAR archive.'
        },
        {
            label: 'JavaCompile',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Compiles Java source files.'
        },
        {
            label: 'Javadoc',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates HTML API documentation for Java classes.'
        },
        {
            label: 'JavaExec',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Executes a Java application in a child process.'
        },
        {
            label: 'JDepend',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Analyzes code with JDepend.'
        },
        {
            label: 'Pmd',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Runs a set of static code analysis rules on Java source code files and generates a report of problems found.'
        },
        {
            label: 'PublishToIvyRepository',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Publishes an IvyPublication to an IvyArtifactRepository.'
        },
        {
            label: 'PublishToMavenRepository',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Publishes a MavenPublication to a MavenArtifactRepository.'
        },
        {
            label: 'ScalaCompile',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Compiles Scala source files, and optionally, Java source files.'
        },
        {
            label: 'ScalaDoc',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates HTML API documentation for Scala source files.'
        },
        {
            label: 'InitBuild',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates a Gradle project structure.'
        },
        {
            label: 'Sign',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'A task for creating digital signature files for one or more; tasks, files, publishable artifacts or configurations.'
        },
        {
            label: 'Sync',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Synchronizes the contents of a destination directory with some source directories and files.'
        },
        {
            label: 'Tar',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Assembles a TAR archive.'
        },
        {
            label: 'Test',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Executes JUnit (3.8.x or 4.x) or TestNG tests. Test are always run in (one or more) separate JVMs. The sample below shows various configuration options.'
        },
        {
            label: 'TestReport',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates an HTML test report from the results of one or more Test tasks.'
        },
        {
            label: 'Upload',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Uploads the artifacts of a Configuration to a set of repositories.'
        },
        {
            label: 'War',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Assembles a WAR archive.'
        },
        {
            label: 'Wrapper',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Generates scripts (for *nix and windows) which allow you to build your project with Gradle, without having to install Gradle.'
        },
        {
            label: 'WriteProperties',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Writes a Properties in a way that the results can be expected to be reproducible.'
        },
        {
            label: 'Zip',
            kind: vscode_languageserver_1.CompletionItemKind.Value,
            documentation: 'Assembles a ZIP archive. The default is to compress the contents of the zip.'
        }
    ];
}
exports.getTaskTypes = getTaskTypes;
//# sourceMappingURL=advisor.js.map