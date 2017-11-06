"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
// additionalTextEdits: [{
//     range: {start: {line: pos.line, character: pos.character + 10}, end: {line: pos.line, character: pos.character + 10}},
//     newText: "{}",
// }]
/**
 * Keywords for build script's Delegate
 * @param fileName name of the file currently under editing
 */
function getDelegateKeywords(fileName) {
    // Initialize the default keywords as core type and Script's keywords
    let keywords = [];
    keywords = keywords.concat(getScriptKeywords());
    keywords = keywords.concat(getCoreTypeKeywords());
    // Add delegate's keywords
    if (fileName == "build.gradle") {
        console.log("Delegate: Project");
        keywords = keywords.concat(getDelegateProjectKeywords());
    }
    else if (fileName == "init.gradle") {
        console.log("Delegate: Gradle");
        keywords = keywords.concat(getDelegateGradleKeywords());
    }
    else if (fileName == "settings.gradle") {
        console.log("Delegate: Settings");
        keywords = keywords.concat(getDelegateSettingsKeywords());
    }
    return keywords;
}
exports.getDelegateKeywords = getDelegateKeywords;
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
function getScriptKeywords() {
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
function getDelegateProjectKeywords() {
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
function getDelegateGradleKeywords() {
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
function getDelegateSettingsKeywords() {
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
//# sourceMappingURL=advisorBase.js.map