"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 * Method names that specify ordering between tasks.
 */
function getTaskDependencies() {
    let retval = new Set();
    retval.add("dependsOn");
    retval.add("finalizedBy");
    retval.add("mustRunAfter");
    retval.add("shouldRunAfter");
    return retval;
}
exports.getTaskDependencies = getTaskDependencies;
/**
 * Existing Tasks' names.
 */
function getTaskNames(tasks, exclude) {
    let retval = [];
    for (let taskName in tasks) {
        if (exclude != undefined && taskName != exclude) {
            retval.push({
                label: taskName,
                kind: vscode_languageserver_1.CompletionItemKind.Reference
            });
        }
    }
    return retval;
}
exports.getTaskNames = getTaskNames;
/**
 * TaskContainer.create()'s parameters.
 */
function getTaskCreationOptions() {
    return [
        {
            label: 'name',
            insertText: 'name: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The name of the task to create.'
        },
        {
            label: 'type',
            insertText: 'type: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The class of the task to create.'
        },
        {
            label: 'action',
            insertText: 'action: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The closure or Action to execute when the task executes.'
        },
        {
            label: 'overwrite',
            insertText: 'overwrite: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'Replace an existing task?'
        },
        {
            label: 'dependsOn',
            insertText: 'dependsOn: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The dependencies of the task.'
        },
        {
            label: 'group',
            insertText: 'group: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The group of the task.'
        },
        {
            label: 'description',
            insertText: 'description: ',
            kind: vscode_languageserver_1.CompletionItemKind.Constructor,
            documentation: 'The description of the task.'
        }
    ];
}
exports.getTaskCreationOptions = getTaskCreationOptions;
/**
 * Core type Task's types.
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
/**
 * Task's Default keywords
 */
function getTaskDefaultKeywords() {
    return [
        {
            label: 'excludes',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The set of exclude patterns.'
        },
        {
            label: 'includes',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The set of include patterns.'
        },
        {
            label: 'reports',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The reports to be generated by this task.'
        },
        {
            label: 'source',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'The source for this task, after the include and exclude patterns have been applied. Ignores source files which do not exist.'
        },
        {
            label: 'dependsOn',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Adds the given dependencies to this task. '
        },
        {
            label: 'finalizedBy',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Adds the given finalizer tasks for this task.'
        },
        {
            label: 'mustRunAfter',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Specifies that this task must run after all of the supplied tasks.'
        },
        {
            label: 'shouldRunAfter',
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            documentation: 'Specifies that this task should run after all of the supplied tasks.'
        }
    ];
}
exports.getTaskDefaultKeywords = getTaskDefaultKeywords;
/**
 * Keywords for different types of Tasks.
 * @param type
 */
function getTaskKeywords(type) {
    let map = {
        /* Generates parsers from Antlr grammars. */
        "AntlrTask": [
            {
                label: 'antlrClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath containing the Ant ANTLR task implementation.'
            },
            {
                label: 'arguments',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'List of command-line arguments passed to the antlr process'
            },
            {
                label: 'maxHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum heap size for the forked antlr process.'
            },
            {
                label: 'outputDirectory',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the parser source files into.'
            },
            {
                label: 'trace',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies that all rules call traceIn/traceOut.'
            },
            {
                label: 'traceLexer',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies that all lexer rules call traceIn/traceOut.'
            },
            {
                label: 'traceParser',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies that all parser rules call traceIn/traceOut.'
            },
            {
                label: 'traceTreeWalker',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies that all tree walker rules call traceIn/traceOut.'
            }
        ],
        // Provides information about the build environment for the project that the task is associated with.
        "BuildEnvironmentReportTask": [],
        // Runs Checkstyle against some source files.
        "Checkstyle": [
            {
                label: 'checkstyleClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path containing the Checkstyle library to be used.'
            },
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path containing the compiled classes for the source files to be analyzed.'
            },
            {
                label: 'config',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Checkstyle configuration to use. Replaces the configFile property.'
            },
            {
                label: 'configDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Path to other Checkstyle configuration files.'
            },
            {
                label: 'configFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Checkstyle configuration file to use.'
            },
            {
                label: 'configProperties',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The properties available for use in the configuration file. These are substituted into the configuration file.'
            },
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether this task will ignore failures and continue running the build.'
            },
            {
                label: 'maxErrors',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of errors that are tolerated before breaking the build or setting the failure property.'
            },
            {
                label: 'maxWarnings',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of warnings that are tolerated before breaking the build or setting the failure property.'
            },
            {
                label: 'showViolations',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether rule violations are to be displayed on the console.'
            }
        ],
        // Runs CodeNarc against some source files.
        "CodeNarc": [
            {
                label: 'codenarcClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path containing the CodeNarc library to be used.'
            },
            {
                label: 'compilationClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path to be used by CodeNarc when compiling classes during analysis.'
            },
            {
                label: 'config',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The CodeNarc configuration to use. Replaces the configFile property.'
            },
            {
                label: 'configFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The CodeNarc configuration file to use.'
            },
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether the build should break when the verifications performed by this task fail.'
            },
            {
                label: 'maxPriority1Violations',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of priority 1 violations allowed before failing the build.'
            },
            {
                label: 'maxPriority2Violations',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of priority 2 violations allowed before failing the build.'
            },
            {
                label: 'maxPriority3Violations',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of priority 3 violations allowed before failing the build.'
            }
        ],
        // Executes two Gradle builds (that can be the same build) with specified versions and compares the outcomes.
        "CompareGradleBuilds": [
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether a comparison between non identical builds will fail the task execution.'
            },
            {
                label: 'reportDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory that will contain the HTML comparison report and any other report files.'
            },
            {
                label: 'sourceBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The specification of how to invoke the source build.'
            },
            {
                label: 'targetBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The specification of how to invoke the target build.'
            },
            {
                label: 'sourceBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the source build. A Groovy closure can be used as the action.'
            },
            {
                label: 'targetBuild',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the target build. A Groovy closure can be used as the action.'
            }
        ],
        // Copies files into a destination directory. This task can also rename and filter files as it copies.
        "Copy": [
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to copy files into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filesNotMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path does not match any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'include',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an ANT style include pattern.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory for a copy.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file using a closure or based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Creates start scripts for launching JVM applications.
        "CreateStartScripts": [
            {
                label: 'applicationName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The application\'s name.'
            },
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path for the application.'
            },
            {
                label: 'defaultJvmOpts',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The application\'s default JVM options. Defaults to an empty list.'
            },
            {
                label: 'mainClassName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The main classname used to start the Java application.'
            },
            {
                label: 'optsEnvironmentVar',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The environment variable to use to provide additional options to the JVM.'
            },
            {
                label: 'outputDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to write the scripts into.'
            },
            {
                label: 'unixStartScriptGenerator',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The UNIX-like start script generator.'
            },
            {
                label: 'windowsStartScriptGenerator',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Windows start script generator.'
            }
        ],
        // Deletes files or directories.
        "Delete": [
            {
                label: 'delete',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of files which will be deleted by this task.'
            },
            {
                label: 'followSymlinks',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns if symlinks should be followed when doing a delete.'
            },
            {
                label: 'targetFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The resolved set of files which will be deleted by this task.'
            },
            {
                label: 'delete',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds some files to be deleted by this task. '
            }
        ],
        // Assembles an EAR archive.
        "Ear": [
            {
                label: 'appendix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive name. If the name has not been explicitly set, the pattern for the name is: [baseName]-[appendix]-[version]-[classifier].[extension]'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
            },
            {
                label: 'baseName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The base name of the archive.'
            },
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'classifier',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classifier part of the archive name, if any.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory where the archive is generated into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'entryCompression',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compression level of the entries of the archive.'
            },
            {
                label: 'extension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'libDirName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of the library directory in the EAR file. Default is "lib".'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The manifest for this JAR archive.'
            },
            {
                label: 'metadataCharset',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The character set used to encode JAR metadata like file names. Defaults to UTF-8.'
            },
            {
                label: 'preserveFileTimestamps',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether file timestamps should be preserved in the archive.'
            },
            {
                label: 'reproducibleFileOrder',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to enforce a reproducible file order when reading files from directories.'
            },
            {
                label: 'version',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The version part of the archive name, if any.'
            },
            {
                label: 'zip64',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether the zip can contain more than 65535 files and/or support files greater than 4GB in size.'
            },
            {
                label: 'deploymentDescriptor',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the deployment descriptor for this EAR archive.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory *inside* the archive for the files.'
            },
            {
                label: 'lib',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds dependency libraries to include in the \'lib\' directory of the EAR archive.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the manifest for this JAR archive.'
            },
            {
                label: 'metaInf',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds content to this JAR archive\'s META-INF directory.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file or files based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Executes a command line process.
        "Exec": [
            {
                label: 'args',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The arguments for the command to be executed. Defaults to an empty list.'
            },
            {
                label: 'commandLine',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The full command line, including the executable plus its arguments.'
            },
            {
                label: 'environment',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The environment variables to use for the process. Defaults to the environment of this process.'
            },
            {
                label: 'errorOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The output stream to consume standard error from the process executing the command. Default to System.err.'
            },
            {
                label: 'execResult',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The result for the command run by this task. Returns null if this task has not been executed yet.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of the executable to use.'
            },
            {
                label: 'ignoreExitValue',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells whether a non-zero exit value is ignored, or an exception thrown. Defaults to false.'
            },
            {
                label: 'standardInput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The standard input stream for the process executing the command. The stream is closed after the process completes. Defaults to an empty stream.'
            },
            {
                label: 'standardOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The output stream to consume standard output from the process executing the command. Defaults to System.out.'
            },
            {
                label: 'workingDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The working directory for the process. Defaults to the project directory.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the name of the executable to use.'
            },
            {
                label: 'workingDir',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the working directory for the process. '
            }
        ],
        // Analyzes code with FindBugs. See the FindBugs Manual for additional information on configuration options.
        'FindBugs': [
            {
                label: 'classes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class directories to be analyzed.'
            },
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Compile class path for the classes to be analyzed.'
            },
            {
                label: 'effort',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The analysis effort level. The value specified should be one of min, default, or max.'
            },
            {
                label: 'excludeFilter',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The filename of a filter specifying bugs to exclude from being reported.'
            },
            {
                label: 'excludeFilterConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'A filter specifying bugs to exclude from being reported. Replaces the excludeFilter property.'
            },
            {
                label: 'findbugsClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Class path holding the FindBugs library.'
            },
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to allow the build to continue if there are warnings.'
            },
            {
                label: 'includeFilter',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The filename of a filter specifying which bugs are reported.'
            },
            {
                label: 'includeFilterConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'A filter specifying which bugs are reported. Replaces the includeFilter property.'
            },
            {
                label: 'maxHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum heap size for the forked findbugs process.'
            },
            {
                label: 'omitVisitors',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Similar to visitors except that it specifies bug detectors which should not be run. By default, no visitors are omitted.'
            },
            {
                label: 'pluginClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Class path holding any additional FindBugs plugins.'
            },
            {
                label: 'reportLevel',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The priority threshold for reporting bugs.'
            },
            {
                label: 'reports',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The reports to be generated by this task.'
            },
            {
                label: 'showProgress',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Indicates whether analysis progress should be rendered on standard output. Defaults to false.'
            },
            {
                label: 'visitors',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The bug detectors which should be run.'
            }
        ],
        // Generates an Ivy XML Module Descriptor file.
        'GenerateIvyDescriptor': [
            {
                label: 'descriptor',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The module descriptor metadata.'
            },
            {
                label: 'destination',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The file the descriptor will be written to.'
            }
        ],
        // Generates a Maven module descriptor (POM) file.
        'GenerateMavenPom': [
            {
                label: 'destination',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The file the POM will be written to.'
            },
            {
                label: 'pom',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Maven POM.'
            }
        ],
        // Generates build dashboard report.
        'GenerateBuildDashboard': [
            {
                label: 'aggregate',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures which reports are to be aggregated in the build dashboard report generated by this task.'
            }
        ],
        // Executes a Gradle build.
        'GradleBuild': [
            {
                label: 'buildFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The build file that should be used for this build. Defaults to build.gradle in the project directory.'
            },
            {
                label: 'dir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The project directory for the build. Defaults to the project directory.'
            },
            {
                label: 'startParameter',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The full set of parameters that will be used to execute the build.'
            },
            {
                label: 'tasks',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The tasks that should be executed for this build.'
            }
        ],
        // Compiles Groovy source files, and optionally, Java source files.
        'GroovyCompile': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to compile the source files.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the .class files into.'
            },
            {
                label: 'groovyClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath containing the version of Groovy to use for compilation.'
            },
            {
                label: 'groovyOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Gets the options for the Groovy compilation. To set specific options for the nested Java compilation, use GroovyCompile.getOptions().'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The options for Java compilation.'
            },
            {
                label: 'sourceCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java language level to use to compile the source files.'
            },
            {
                label: 'targetCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The target JVM to generate the .class files for.'
            }
        ],
        // Generates HTML API documentation for Groovy source, and optionally, Java source.
        'Groovydoc': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath used to locate classes referenced by the documented sources.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the documentation into.'
            },
            {
                label: 'docTitle',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The title for the package index(first) page. Set to null when there is no document title.'
            },
            {
                label: 'footer',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The HTML footer for each page. Set to null when there is no footer.'
            },
            {
                label: 'groovyClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath containing the Groovy library to be used.'
            },
            {
                label: 'header',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The HTML header for each page. Set to null when there is no header.'
            },
            {
                label: 'includePrivate',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to include all classes and members (i.e. including private ones).'
            },
            {
                label: 'links',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The links to groovydoc/javadoc output at the given URL.'
            },
            {
                label: 'noTimestamp',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to include timestamp within hidden comment in generated HTML (Groovy >= 2.4.6).'
            },
            {
                label: 'noVersionStamp',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to include version stamp within hidden comment in generated HTML (Groovy >= 2.4.6).'
            },
            {
                label: 'overviewText',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns a HTML text to be used for overview documentation. Set to null when there is no overview text.'
            },
            {
                label: 'use',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether to create class and package usage pages.'
            },
            {
                label: 'windowTitle',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The browser window title for the documentation. Set to null when there is no window title.'
            },
        ],
        // Generates an HTML dependency report.
        'HtmlDependencyReportTask': [
            {
                label: 'projects',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of projects to generate a report for. By default, the report is generated for the task\'s containing project.'
            }
        ],
        // Task to generate HTML, Xml and CSV reports of Jacoco coverage data.
        'JacocoReport': [
            {
                label: 'additionalClassDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Additional class dirs that coverage data should be reported for.'
            },
            {
                label: 'additionalSourceDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Additional source dirs for the classes coverage data is being reported for.'
            },
            {
                label: 'classDirectories',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Source sets that coverage should be reported for.'
            },
            {
                label: 'executionData',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Collection of execution data files to analyze.'
            },
            {
                label: 'jacocoClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Classpath containing Jacoco classes for use by the task.'
            },
            {
                label: 'sourceDirectories',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Source sets that coverage should be reported for.'
            }
        ],
        // Task to merge multiple execution data files into one.
        'JacocoMerge': [
            {
                label: 'destinationFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'File to write merged execution data to.'
            },
            {
                label: 'executionData',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Collection of execution data files to merge.'
            },
            {
                label: 'jacocoClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Classpath containing Jacoco classes for use by the task.'
            }
        ],
        // Task for verifying code coverage metrics. Fails the task if violations are detected based on specified rules.
        'JacocoCoverageVerification': [
            {
                label: 'additionalClassDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Additional class dirs that coverage data should be reported for.'
            },
            {
                label: 'additionalSourceDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Additional source dirs for the classes coverage data is being reported for.'
            },
            {
                label: 'classDirectories',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Source sets that coverage should be reported for.'
            },
            {
                label: 'executionData',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Collection of execution data files to analyze.'
            },
            {
                label: 'jacocoClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Classpath containing Jacoco classes for use by the task.'
            },
            {
                label: 'sourceDirectories',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Source sets that coverage should be reported for.'
            },
            {
                label: 'violationRules',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The violation rules set for this task.'
            }
        ],
        // Assembles a JAR archive.
        'Jar': [
            {
                label: 'appendix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive name.'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
            },
            {
                label: 'baseName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The base name of the archive.'
            },
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'classifier',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classifier part of the archive name, if any.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory where the archive is generated into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'entryCompression',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compression level of the entries of the archive.'
            },
            {
                label: 'extension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The manifest for this JAR archive.'
            },
            {
                label: 'metadataCharset',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The character set used to encode JAR metadata like file names. Defaults to UTF-8.'
            },
            {
                label: 'preserveFileTimestamps',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether file timestamps should be preserved in the archive.'
            },
            {
                label: 'reproducibleFileOrder',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to enforce a reproducible file order when reading files from directories.'
            },
            {
                label: 'version',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The version part of the archive name, if any.'
            },
            {
                label: 'zip64',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether the zip can contain more than 65535 files and/or support files greater than 4GB in size.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory *inside* the archive for the files.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the manifest for this JAR archive.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file or files based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Compiles Java source files.
        'JavaCompile': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to compile the source files.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the .class files into.'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compilation options.'
            },
            {
                label: 'sourceCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java language level to use to compile the source files.'
            },
            {
                label: 'targetCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The target JVM to generate the .class files for.'
            },
            {
                label: 'toolChain',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The tool chain that will be used to compile the Java source.'
            }
        ],
        // Generates HTML API documentation for Java classes.
        'Javadoc': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to resolve type references in the source code.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the documentation into.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Javadoc executable to use to generate the Javadoc. When null, the Javadoc executable for the current JVM is used.'
            },
            {
                label: 'failOnError',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether this task should fail when errors are encountered during Javadoc generation.'
            },
            {
                label: 'maxMemory',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The amount of memory allocated to this task.'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Javadoc generation options.'
            },
            {
                label: 'title',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The title for the generated documentation.'
            },
            {
                label: 'toolChain',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The tool chain that will be used to generate the Javadoc.'
            }
        ],
        // Executes a Java application in a child process.
        'JavaExec': [
            {
                label: 'allJvmArgs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The full set of arguments to use to launch the JVM for the process.'
            },
            {
                label: 'args',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The arguments passed to the main class to be executed.'
            },
            {
                label: 'bootstrapClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The bootstrap classpath to use for the process.'
            },
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath for executing the main class.'
            },
            {
                label: 'commandLine',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The full command line, including the executable plus its arguments.'
            },
            {
                label: 'debug',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns true if debugging is enabled for the process. When enabled, the process is started suspended and listening on port 5005.'
            },
            {
                label: 'enableAssertions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns true if assertions are enabled for the process.'
            },
            {
                label: 'environment',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The environment variables to use for the process.'
            },
            {
                label: 'errorOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The output stream to consume standard error from the process executing the command. Default to System.err.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of the executable to use.'
            },
            {
                label: 'ignoreExitValue',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells whether a non-zero exit value is ignored, or an exception thrown. Defaults to false.'
            },
            {
                label: 'jvmArgs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extra arguments to use to launch the JVM for the process. Does not include system properties and the minimum/maximum heap size.'
            },
            {
                label: 'main',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The fully qualified name of the Main class to be executed.'
            },
            {
                label: 'maxHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum heap size for the process, if any.'
            },
            {
                label: 'standardInput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The standard input stream for the process executing the command. The stream is closed after the process completes.'
            },
            {
                label: 'standardOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The output stream to consume standard output from the process executing the command.'
            },
            {
                label: 'systemProperties',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The system properties which will be used for the process.'
            },
            {
                label: 'workingDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The working directory for the process. Defaults to the project directory.'
            },
            {
                label: 'copyTo',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Copies these options to the given options.'
            }
        ],
        // Analyzes code with JDepend.
        'JDepend': [
            {
                label: 'classesDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory containing the classes to be analyzed.'
            },
            {
                label: 'classesDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directories containing the classes to be analyzed.'
            },
            {
                label: 'jdependClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path containing the JDepend library to be used.'
            }
        ],
        // Runs a set of static code analysis rules on Java source code files and generates a report of problems found.
        'Pmd': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Compile class path for the classes to be analyzed.'
            },
            {
                label: 'consoleOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether or not to write PMD results to System.out.'
            },
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether or not to allow the build to continue if there are warnings. Example: ignoreFailures = true'
            },
            {
                label: 'pmdClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The class path containing the PMD library to be used.'
            },
            {
                label: 'rulePriority',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies the rule priority threshold.'
            },
            {
                label: 'ruleSetConfig',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The custom rule set to be used (if any).'
            },
            {
                label: 'ruleSetFiles',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The custom rule set files to be used.'
            },
            {
                label: 'ruleSets',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The built-in rule sets to be used.'
            },
            {
                label: 'targetJdk',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The target JDK to use with PMD.'
            }
        ],
        // Publishes an IvyPublication to an IvyArtifactRepository.
        'PublishToIvyRepository': [
            {
                label: 'publication',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The publication to be published.'
            },
            {
                label: 'repository',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The repository to publish to.'
            }
        ],
        // Publishes a MavenPublication to a MavenArtifactRepository.
        'PublishToMavenRepository': [
            {
                label: 'publication',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The publication to be published.'
            },
            {
                label: 'repository',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The repository to publish to.'
            }
        ],
        // Compiles Scala source files, and optionally, Java source files. 
        'ScalaCompile': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to compile the source files.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the .class files into.'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java compilation options.'
            },
            {
                label: 'scalaClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to load the Scala compiler.'
            },
            {
                label: 'scalaCompileOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Scala compilation options.'
            },
            {
                label: 'sourceCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java language level to use to compile the source files.'
            },
            {
                label: 'targetCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The target JVM to generate the .class files for.'
            }
        ],
        // Generates HTML API documentation for Scala source files.
        'ScalaDoc': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to locate classes referenced by the documented source.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the API documentation into.'
            },
            {
                label: 'scalaClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to load the ScalaDoc tool.'
            },
            {
                label: 'scalaDocOptions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The ScalaDoc generation options.'
            },
            {
                label: 'title',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The documentation title.'
            }
        ],
        // Generates a Gradle project structure.
        'InitBuild': [
            {
                label: 'testFramework',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Alternative test framework to be used in the generated project.'
            },
            {
                label: 'type',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The desired type of build to create.'
            }
        ],
        // A task for creating digital signature files for one or more; tasks, files, publishable artifacts or configurations.
        'Sign': [
            {
                label: 'signatory',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The signatory for this signing task.'
            },
            {
                label: 'sign',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the task to sign each of the given files'
            }
        ],
        // Synchronizes the contents of a destination directory with some source directories and files.
        'Sync': [
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to copy files into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'preserve',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The filter that defines which files to preserve in the destination directory.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filesNotMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path does not match any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'include',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an ANT style include pattern.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory for a copy.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file using a closure or based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Assembles a TAR archive.
        'Tar': [
            {
                label: 'appendix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive name.'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
            },
            {
                label: 'baseName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The base name of the archive.'
            },
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'classifier',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classifier part of the archive name, if any.'
            },
            {
                label: 'compression',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compression that is used for this archive.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory where the archive is generated into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'entryCompression',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compression level of the entries of the archive.'
            },
            {
                label: 'extension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'preserveFileTimestamps',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether file timestamps should be preserved in the archive.'
            },
            {
                label: 'reproducibleFileOrder',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to enforce a reproducible file order when reading files from directories.'
            },
            {
                label: 'version',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The version part of the archive name, if any.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory *inside* the archive for the files.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the manifest for this JAR archive.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file or files based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Executes JUnit (3.8.x or 4.x) or TestNG tests. Test are always run in (one or more) separate JVMs. The sample below shows various configuration options.
        'Test': [
            {
                label: 'allJvmArgs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The full set of arguments to use to launch the JVM for the process.'
            },
            {
                label: 'binResultsDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The root folder for the test results in internal binary format.'
            },
            {
                label: 'bootstrapClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The bootstrap classpath to use for the process.'
            },
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to execute the tests.'
            },
            {
                label: 'debug',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns true if debugging is enabled for the process. When enabled, the process is started suspended and listening on port 5005.'
            },
            {
                label: 'enableAssertions',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns true if assertions are enabled for the process.'
            },
            {
                label: 'environment',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The environment variables to use for the process. Defaults to the environment of this process.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of the executable to use.'
            },
            {
                label: 'forkEvery',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of test classes to execute in a forked test process.'
            },
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether the build should break when the verifications performed by this task fail.'
            },
            {
                label: 'jvmArgs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extra arguments to use to launch the JVM for the process.'
            },
            {
                label: 'maxHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum heap size for the process, if any.'
            },
            {
                label: 'maxParallelForks',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of forked test processes to execute in parallel.'
            },
            {
                label: 'minHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The minimum heap size for the process, if any.'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns test framework specific options.'
            },
            {
                label: 'scanForTestClasses',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether test classes should be detected.'
            },
            {
                label: 'systemProperties',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The system properties which will be used for the process.'
            },
            {
                label: 'testClassesDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The root folder for the compiled test sources.'
            },
            {
                label: 'testClassesDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directories for the compiled test sources.'
            },
            {
                label: 'testLogging',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Allows to set options related to which test events are logged to the console, and on which detail level.'
            },
            {
                label: 'workingDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The working directory for the process. Defaults to the project directory.'
            },
            {
                label: 'jacoco',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The JacocoTaskExtension added by the jacoco plugin.'
            },
            {
                label: 'addTestListener',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Registers a test listener with this task.'
            },
            {
                label: 'addTestOutputListener',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Registers a output listener with this task.'
            },
            {
                label: 'afterSuite',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified after a test suite has executed. A TestDescriptor and TestResult instance are passed to the closure as a parameter.'
            },
            {
                label: 'afterTest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified after a test has executed. A TestDescriptor and TestResult instance are passed to the closure as a parameter.'
            },
            {
                label: 'beforeSuite',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified before a test suite is executed. A TestDescriptor instance is passed to the closure as a parameter.'
            },
            {
                label: 'beforeTest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified before a test is executed. A TestDescriptor instance is passed to the closure as a parameter.'
            },
            {
                label: 'bootstrapClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given values to the end of the bootstrap classpath for the process.'
            },
            {
                label: 'copyTo',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Copies these options to the given options.'
            },
            {
                label: 'environment',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an environment variable to the environment for this process.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the name of the executable to use.'
            },
            {
                label: 'onOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified when output from the test received. A TestDescriptorand TestOutputEvent instance are passed to the closure as a parameter.'
            },
            {
                label: 'removeTestListener',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Unregisters a test listener with this task.'
            },
            {
                label: 'removeTestOutputListener',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Unregisters a test output listener with this task.'
            },
            {
                label: 'setTestNameIncludePatterns',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the test name patterns to be included in execution. Classes or method names are supported, wildcard \'*\' is supported.'
            },
            {
                label: 'testLogging',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Allows configuring the logging of the test execution, for example log eagerly the standard output, etc.'
            },
            {
                label: 'useJUnit',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies that JUnit should be used to execute the tests.'
            },
            {
                label: 'useTestNG',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies that TestNG should be used to execute the tests.'
            },
            {
                label: 'workingDir',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the working directory for the process.'
            },
            {
                label: 'jacoco',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Configures the JacocoTaskExtension added by the jacoco plugin.'
            }
        ],
        // Generates an HTML test report from the results of one or more Test tasks.
        'TestReport': [
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to write the HTML report to.'
            },
            {
                label: 'testResultDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of binary test results to include in the report.'
            },
            {
                label: 'reportOn',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds some results to include in the report.'
            }
        ],
        // Uploads the artifacts of a Configuration to a set of repositories.
        'Upload': [
            {
                label: 'artifacts',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The artifacts which will be uploaded.'
            },
            {
                label: 'configuration',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The configuration to upload.'
            },
            {
                label: 'repositories',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The repositories to upload to.'
            },
            {
                label: 'uploadDescriptor',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether the dependency descriptor should be uploaded.'
            }
        ],
        // Assembles a WAR archive.
        'War': [
            {
                label: 'appendix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive name.'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
            },
            {
                label: 'baseName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The base name of the archive.'
            },
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'classifier',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classifier part of the archive name, if any.'
            },
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to include in the WAR archive.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory where the archive is generated into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'entryCompression',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compression level of the entries of the archive.'
            },
            {
                label: 'extension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The manifest for this JAR archive.'
            },
            {
                label: 'metadataCharset',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The character set used to encode JAR metadata like file names. Defaults to UTF-8.'
            },
            {
                label: 'preserveFileTimestamps',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether file timestamps should be preserved in the archive.'
            },
            {
                label: 'reproducibleFileOrder',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to enforce a reproducible file order when reading files from directories.'
            },
            {
                label: 'version',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The version part of the archive name, if any.'
            },
            {
                label: 'webXml',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The web.xml file to include in the WAR archive. When null, no web.xml file is included in the WAR.'
            },
            {
                label: 'zip64',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether the zip can contain more than 65535 files and/or support files greater than 4GB in size.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory *inside* the archive for the files.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the manifest for this JAR archive.'
            },
            {
                label: 'webInf',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds some content to the WEB-INF directory for this WAR archive.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file or files based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Generates scripts (for *nix and windows) which allow you to build your project with Gradle, without having to install Gradle.
        'Wrapper': [
            {
                label: 'archiveBase',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive base specifies whether the unpacked wrapper distribution should be stored in the project or in the gradle user home dir.'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the gradle distributions archive should be saved (i.e. the parent dir). The path is relative to the archive base directory.'
            },
            {
                label: 'distributionBase',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The distribution base specifies whether the unpacked wrapper distribution should be stored in the project or in the gradle user home dir.'
            },
            {
                label: 'distributionPath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the gradle distributions needed by the wrapper are unzipped. The path is relative to the distribution base directory'
            },
            {
                label: 'distributionType',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The type of the Gradle distribution to be used by the wrapper.'
            },
            {
                label: 'distributionUrl',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The URL to download the gradle distribution from.'
            },
            {
                label: 'gradleVersion',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The gradle version for the wrapper.'
            },
            {
                label: 'jarFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The file to write the wrapper jar file to.'
            },
            {
                label: 'propertiesFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The file to write the wrapper properties to.'
            },
            {
                label: 'scriptFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The file to write the wrapper script to.'
            }
        ],
        // Writes a Properties in a way that the results can be expected to be reproducible.
        'WriteProperties': [
            {
                label: 'comment',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The optional comment to add at the beginning of the properties file.'
            },
            {
                label: 'encoding',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The encoding used to write the properties file. Defaults to ISO_8859_1. If set to anything different, unicode escaping is turned off.'
            },
            {
                label: 'lineSeparator',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The line separator to be used when creating the properties file. '
            },
            {
                label: 'outputFile',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The output file to write the properties to.'
            },
            {
                label: 'properties',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns an immutable view of properties to be written to the properties file.'
            },
            {
                label: 'properties',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds multiple properties to be written to the properties file.'
            },
            {
                label: 'property',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a property to be written to the properties file.'
            }
        ],
        // Assembles a ZIP archive. The default is to compress the contents of the zip.
        'Zip': [
            {
                label: 'appendix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive name.'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
            },
            {
                label: 'baseName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The base name of the archive.'
            },
            {
                label: 'caseSensitive',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'classifier',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classifier part of the archive name, if any.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory where the archive is generated into.'
            },
            {
                label: 'dirMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'entryCompression',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compression level of the entries of the archive.'
            },
            {
                label: 'extension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'metadataCharset',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The character set used to encode JAR metadata like file names. Defaults to UTF-8.'
            },
            {
                label: 'preserveFileTimestamps',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether file timestamps should be preserved in the archive.'
            },
            {
                label: 'reproducibleFileOrder',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether to enforce a reproducible file order when reading files from directories.'
            },
            {
                label: 'version',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The version part of the archive name, if any.'
            },
            {
                label: 'zip64',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Whether the zip can contain more than 65535 files and/or support files greater than 4GB in size.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory *inside* the archive for the files.'
            },
            {
                label: 'manifest',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the manifest for this JAR archive.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file or files based on a regular expression.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ]
    };
    let retval = getTaskDefaultKeywords();
    let keywords = map[type];
    if (keywords != undefined)
        retval = retval.concat(keywords);
    return retval;
}
exports.getTaskKeywords = getTaskKeywords;
//# sourceMappingURL=advisorTask.js.map