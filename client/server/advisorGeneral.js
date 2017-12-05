"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
/**
 * Return the keywords of current method name
 * @param method method's name
 * @param pluginConf configuration info for plugins
 */
function getKeywords(method, pluginConf) {
    // Initialize the default keywords as Script's keywords
    let keywords = [];
    let defaultKeywords = getDefaultKeywords(method);
    if (defaultKeywords != undefined)
        keywords = defaultKeywords;
    // Add Java plugin's keywords
    let javaKeywords = undefined;
    if (pluginConf['java']) {
        // console.log("> Plugin 'java' detected!")
        javaKeywords = getJavaKeywords(method);
        if (javaKeywords != undefined)
            keywords = keywords.concat(javaKeywords);
    }
    // Add Android plugin's keywords
    let androidKeywords = undefined;
    if (pluginConf['com.android.application']) {
        // console.log("> Plugin 'com.android.application' detected!")
        androidKeywords = getAndroidKeywords(method);
        if (androidKeywords != undefined)
            keywords = keywords.concat(androidKeywords);
    }
    if (keywords.length == 0 && javaKeywords == undefined && androidKeywords == undefined)
        return undefined;
    else
        return keywords;
}
exports.getKeywords = getKeywords;
/**
 * Default keywords
 * @param method
 */
function getDefaultKeywords(method) {
    let map = {
        /* [DEFAULT] keywords: "if", "all", "each", etc. */
        "if": [],
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
                label: 'doFirst',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given Action to the beginning of this task\'s action list.'
            },
            {
                label: 'doLast',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given Action to the end of this task\'s action list.'
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
                label: 'setProperty',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets a property of this task. This method searches for a property with the given name in the following locations, and sets the property on the first location where it finds the property.'
            }
        ],
        /* [DEFAULT] task => properties and closures */
        "apply": [
            {
                label: 'from',
                insertText: 'from: ',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a script to use to configure the target objects.'
            },
            {
                label: 'plugin',
                insertText: 'plugin: ',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a Plugin to use to configure the target objects.',
            },
            {
                label: 'to',
                insertText: 'to: ',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies some target objects to be configured.'
            },
            {
                label: 'type',
                insertText: 'type: ',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the plugin implemented by the given class to the target.'
            }
        ],
        // Declares plugins to use in a script.
        'plugins': [
            {
                label: 'id',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Add a dependency on the plugin with the given id.'
            }
        ]
    };
    let retval = map[method];
    if (retval == undefined)
        return [];
    else
        return retval;
}
exports.getDefaultKeywords = getDefaultKeywords;
/**
 * Java plugin's keywords
 * @param method
 */
function getJavaKeywords(method) {
    /* Preprocess method name */
    if (method.startsWith("compile") || method.endsWith("Compile") || method.endsWith("CompileOnly") || method.endsWith("CompileClasspath")) {
        method = "JavaCompile";
    }
    else if (method.endsWith("Runtime")) {
        method = "runtime";
    }
    else if (method == "processResources" || method == "processTestResources" || (method.startsWith("process") && method.endsWith("Resources"))) {
        method = "Copy";
    }
    else if (method.startsWith("clean")) {
        method = "Delete";
    }
    else if (method == "maven" || method == "ivy") {
        method = "Repository";
    }
    let map = {
        // Compiles Java source files 
        'Copy': [
            {
                label: 'dir',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
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
                documentation: 'The Unix permissions to use for the target directories. null means that existing permissions are preserved.'
            },
            {
                label: 'duplicatesStrategy',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'excludes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of exclude patterns.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files. null means that existing permissions are preserved.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'includes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of include patterns.'
            },
            {
                label: 'source',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The source files for this task.'
            },
            {
                label: 'eachFile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'exclude',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an exclude spec or an ANT style exclude pattern.'
            },
            {
                label: 'expand',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied. More specifically, each file is transformed using Groovy\'s SimpleTemplateEngine.'
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
                documentation: 'Adds an include spec or an ANT style include pattern.'
            },
            {
                label: 'into',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Specifies the destination directory for a copy.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file. The closure will be called with a single parameter, the name of the file. The closure should return a String object with a new target name. The closure may return null, in which case the original name will be used.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Simply removes the directory denoted by its dir property
        'Delete': [
            {
                label: 'dir',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
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
            }
        ],
        // Assembles a JAR archive
        'jar': [
            {
                label: 'appendix',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The archive name. If the name has not been explicitly set, the pattern for the name is:[baseName]-[appendix]-[version]-[classifier].[extension]'
            },
            {
                label: 'archivePath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
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
                documentation: 'The Unix permissions to use for the target directories. null means that existing permissions are preserved.'
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
                label: 'excludes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of exclude patterns.'
            },
            {
                label: 'extension',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files. null means that existing permissions are preserved.'
            },
            {
                label: 'includeEmptyDirs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'includes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of include patterns.'
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
                label: 'source',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The source files for this task.'
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
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination. The given closure is called with a FileCopyDetails as its parameter. Actions are executed in the order added, and are inherited from the parent spec.'
            },
            {
                label: 'exclude',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an exclude spec or an ANT style exclude pattern.'
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
                documentation: 'Adds an include spec or an ANT style include pattern'
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
                label: 'metaInf',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds content to this JAR archive\'s META-INF directory.'
            },
            {
                label: 'rename',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Renames a source file. The closure will be called with a single parameter, the name of the file. The closure should return a String object with a new target name. The closure may return null, in which case the original name will be used.'
            },
            {
                label: 'with',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],
        // Compiles Java source files
        'JavaCompile': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The classpath to use to compile the source files.'
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The directory to generate the .class files into.'
            },
            {
                label: 'excludes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The set of exclude patterns.'
            },
            {
                label: 'includes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The compilation options.'
            },
            {
                label: 'source',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The source for this task, after the include and exclude patterns have been applied. Ignores source files which do not exist.'
            },
            {
                label: 'sourceCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The Java language level to use to compile the source files.'
            },
            {
                label: 'targetCompatibility',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The target JVM to generate the .class files for.'
            },
            {
                label: 'toolChain',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The tool chain that will be used to compile the Java source.'
            },
            {
                label: 'exclude',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an exclude spec or an ANT style exclude pattern.'
            },
            {
                label: 'include',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds an include spec or an ANT style include pattern.'
            },
            {
                label: 'source',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds some source to this task. The given source objects will be evaluated as per Project.files(java.lang.Object[]).'
            }
        ],
        // Configures the dependencies for this project
        'dependencies': [
            {
                label: 'compile',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Compile time dependencies.'
            },
            {
                label: 'compileOnly',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Compile time only dependencies, not used at runtime.'
            },
            {
                label: 'compileClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Compile classpath, used when compiling source.'
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
                label: 'testCompileOnly',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Additional dependencies only for compiling tests, not used at runtime.'
            },
            {
                label: 'testCompileClasspath',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Test compile classpath, used when compiling test sources.'
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
                documentation: 'Artifacts (e.g. jars) produced by this project.'
            },
            {
                label: 'modules',
                kind: vscode_languageserver_1.CompletionItemKind.Method
            }
        ],
        // A SourceSetContainer manages a set of SourceSet objects
        'sourceSets': [],
        // Assembles the production classes and resources directories.
        'classes': [],
        // Assembles the test classes and resources directories.
        'testClasses': [],
        // Core Javadoc options and standard doclet's options
        'javadoc': [
            {
                label: 'classpath',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'source',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'destinationDir',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'title',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            }
        ],
        // Gradle repository management
        'repositories': [
            {
                label: 'mavenCentral',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven central repository.'
            },
            {
                label: 'jcenter',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven JCenter repository.'
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
            },
            {
                label: 'localRepository',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Local repository'
            }
        ],
        // Add a custom repository
        'Repository': [
            {
                label: 'credentials',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'authentication',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'url',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'artifactUrls',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'layout',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'ivyPattern',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'artifactPattern',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            }
        ],
        'credentials': [
            {
                label: 'username',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'password',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'accessKey',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'secretKey',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'sessionToken',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            }
        ],
        'authentication': [
            {
                label: 'digest',
                kind: vscode_languageserver_1.CompletionItemKind.Method
            },
            {
                label: 'basic',
                kind: vscode_languageserver_1.CompletionItemKind.Method
            }
        ],
        // Execute JUnit (3.8.x or 4.x) or TestNG tests
        'test': [
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
                documentation: 'The bootstrap classpath to use for the process. The default bootstrap classpath for the JVM is used when this classpath is empty.'
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
                label: '',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: ''
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
                label: 'excludes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The exclude patterns for test execution.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The name of the executable to use.'
            },
            {
                label: 'forkEvery',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of test classes to execute in a forked test process. The forked test process will be restarted when this limit is reached. The default value is 0 (no maximum).'
            },
            {
                label: 'ignoreFailures',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether the build should break when the verifications performed by this task fail.'
            },
            {
                label: 'includes',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The include patterns for test execution.'
            },
            {
                label: 'jvmArgs',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The extra arguments to use to launch the JVM for the process. Does not include system properties and the minimum/maximum heap size.'
            },
            {
                label: 'maxHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum heap size for the process, if any.'
            },
            {
                label: 'maxParallelForks',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The maximum number of forked test processes to execute in parallel. The default value is 1 (no parallel test execution). It cannot exceed the value of max-workers for the current build.'
            },
            {
                label: 'minHeapSize',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The minimum heap size for the process, if any.'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Returns test framework specific options. Make sure to call Test.useJUnit() or Test.useTestNG() before using this method.'
            },
            {
                label: 'reports',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'The reports that this task potentially produces.'
            },
            {
                label: 'scanForTestClasses',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                documentation: 'Specifies whether test classes should be detected. When true the classes which match the include and exclude patterns are scanned for test classes, and any found are executed. When false the classes which match the include and exclude patterns are executed.'
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
                documentation: 'Copies these options to the given target options.'
            },
            {
                label: 'environment',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds one or more environment variables to the environment for this process.'
            },
            {
                label: 'exclude',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a exclude spec or some exclude patterns.'
            },
            {
                label: 'executable',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the name of the executable to use.'
            },
            {
                label: 'include',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a include spec or some include patterns.'
            },
            {
                label: 'jvmArgs',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds some arguments to use to launch the JVM for the process.'
            },
            {
                label: 'onOutput',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified when output from the test received. A TestDescriptorand TestOutputEvent instance are passed to the closure as a parameter.'
            },
            {
                label: 'options',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures test framework specific options.'
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
                label: 'reports',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Configures the reports that this task potentially produces.'
            },
            {
                label: 'setTestNameIncludePatterns',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Sets the test name patterns to be included in execution. Classes or method names are supported, wildcard \'*\' is supported.'
            },
            {
                label: 'systemProperties',
                kind: vscode_languageserver_1.CompletionItemKind.Method,
                documentation: 'Adds some system properties to use for the process.'
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
            }
        ],
        // Uploads artifacts in the archives configuration, including the JAR file.
        'uploadArchives': [
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
        ]
    };
    return map[method];
}
/**
 * Android plugin's keywords
 * @param method
 */
function getAndroidKeywords(method) {
    /* Preprocess method name */
    if (method.endsWith("Compile") || method.endsWith("CompileOnly") || method.endsWith("CompileClasspath")) {
        method = "compile";
    }
    else if (method.endsWith("Runtime")) {
        method = "runtime";
    }
    let map = {
        // android => properties and closures
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
            }
        ],
        // Gradle repository management
        'repositories': [
            {
                label: 'mavenCentral',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven central repository.'
            },
            {
                label: 'jcenter',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Maven JCenter repository.'
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
            },
            {
                label: 'localRepository',
                kind: vscode_languageserver_1.CompletionItemKind.Module,
                documentation: 'Local repository'
            }
        ],
        // Add a custom repository
        'repository': [
            {
                label: 'credentials',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'authentication',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'url',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'artifactUrls',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'layout',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'ivyPattern',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'artifactPattern',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            }
        ],
        'credentials': [
            {
                label: 'username',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'password',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'accessKey',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'secretKey',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            },
            {
                label: 'sessionToken',
                kind: vscode_languageserver_1.CompletionItemKind.Property
            }
        ],
        'authentication': [
            {
                label: 'digest',
                kind: vscode_languageserver_1.CompletionItemKind.Method
            },
            {
                label: 'basic',
                kind: vscode_languageserver_1.CompletionItemKind.Method
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
        // Encapsulates signing configurations that you can apply to BuildType and ProductFlavor configurations.
        'signingConfigs': [],
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
        // SourceSetContainer manages a set of SourceSet objects.
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
//# sourceMappingURL=advisorGeneral.js.map