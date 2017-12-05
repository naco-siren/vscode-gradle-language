import {CompletionItem, CompletionItemKind} from 'vscode-languageserver';
import {PluginConf} from './advisorBase'

/**
 * Return the keywords of current method name
 * @param method method's name
 * @param pluginConf configuration info for plugins
 */
export function getKeywords(method: string, pluginConf: PluginConf) : CompletionItem[] {
    // Initialize the default keywords as Script's keywords
    let keywords: CompletionItem[] = [];
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

/**
 * Default keywords
 * @param method 
 */
export function getDefaultKeywords(method: string) : CompletionItem[] {
    let map : {[key: string]: CompletionItem[]} = {
        /* [DEFAULT] keywords: "if", "all", "each", etc. */
        "if" : [
            
        ],
        "all" : [

        ],
        "each" : [

        ],


        /* [DEFAULT] task => properties and closures */
        "task" : [
            {
                label: 'actions',
                kind: CompletionItemKind.Property,
                documentation: 'The sequence of Action objects which will be executed by this task, in the order of execution.'
            },
            {
                label: 'ant',
                kind: CompletionItemKind.Property,
                documentation: 'The AntBuilder for this task. You can use this in your build file to execute ant tasks.'
            },
            {
                label: 'convention',
                kind: CompletionItemKind.Property,
                documentation: 'The Convention object for this task. A Plugin can use the convention object to contribute properties and methods to this task.'
            },
            {
                label: 'description',
                kind: CompletionItemKind.Property,
                documentation: 'The description of this task.'
            },
            {   
                label: 'destroyables',
                kind: CompletionItemKind.Property,
                documentation: 'The destroyables of this task.'
            },
            {
                label: 'didWork',
                kind: CompletionItemKind.Property,
                documentation: 'Checks if the task actually did any work. Even if a Task executes, it may determine that it has nothing to do. For example, a compilation task may determine that source files have not changed since the last time a the task was run.'
            },
            {
                label: 'enabled',
                kind: CompletionItemKind.Property,
                documentation: 'Returns if this task is enabled or not.'
            },
            {
                label: 'extensions',
                kind: CompletionItemKind.Property,
                documentation: 'The container of extensions.'
            },
            {
                label: 'group',
                kind: CompletionItemKind.Property,
                documentation: 'The task group which this task belongs to. The task group is used in reports and user interfaces to group related tasks together when presenting a list of tasks to the user.'
            },
            {
                label: 'inputs',
                kind: CompletionItemKind.Property,
                documentation: 'The inputs of this task.'
            },
            {
                label: 'logger',
                kind: CompletionItemKind.Property,
                documentation: 'The logger for this task. You can use this in your build file to write log messages.'
            },
            {
                label: 'logging',
                kind: CompletionItemKind.Property,
                documentation: 'The LoggingManager which can be used to receive logging and to control the standard output/error capture for this task. By default, System.out is redirected to the Gradle logging system at the QUIET log level, and System.err is redirected at the ERROR log level.'
            },
            {   
                label: 'name',
                kind: CompletionItemKind.Property,
                documentation: 'The name of this task. The name uniquely identifies the task within its Project.'
            },
            {   
                label: 'outputs',
                kind: CompletionItemKind.Property,
                documentation: 'The outputs of this task.'
            },
            {   
                label: 'path',
                kind: CompletionItemKind.Property,
                documentation: 'The path of the task, which is a fully qualified name for the task. The path of a task is the path of its Project plus the name of the task, separated by :.'
            },
            {   
                label: 'project',
                kind: CompletionItemKind.Property,
                documentation: 'The Project which this task belongs to.'
            },
            {   
                label: 'state',
                kind: CompletionItemKind.Property,
                documentation: 'The execution state of this task. This provides information about the execution of this task, such as whether it has executed, been skipped, has failed, etc.'
            },
            {   
                label: 'taskDependencies',
                kind: CompletionItemKind.Property,
                documentation: 'Returns a TaskDependency which contains all the tasks that this task depends on.'
            },
            {   
                label: 'temporaryDir',
                kind: CompletionItemKind.Property,
                documentation: 'Returns a directory which this task can use to write temporary files to. Each task instance is provided with a separate temporary directory. There are no guarantees that the contents of this directory will be kept beyond the execution of the task.'
            },
            {   
                label: 'deleteAllActions',
                kind: CompletionItemKind.Method,
                documentation: 'Removes all the actions of this task.'
            },
            {   
                label: 'doFirst',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the given Action to the beginning of this task\'s action list.'
            },
            {   
                label: 'doLast',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the given Action to the end of this task\'s action list.'
            },
            {   
                label: 'hasProperty',
                kind: CompletionItemKind.Method,
                documentation: 'Determines if this task has the given property. See here for details of the properties which are available for a task.'
            },
            {   
                label: 'onlyIf',
                kind: CompletionItemKind.Method,
                documentation: 'Execute the task only if the given closure returns true. The closure will be evaluated at task execution time, not during configuration. The closure will be passed a single parameter, this task. If the closure returns false, the task will be skipped.'
            },
            {   
                label: 'property',
                kind: CompletionItemKind.Method,
                documentation: 'Returns the value of the given property of this task. This method locates a property as follows:'
            },
            {   
                label: 'setProperty',
                kind: CompletionItemKind.Method,
                documentation: 'Sets a property of this task. This method searches for a property with the given name in the following locations, and sets the property on the first location where it finds the property.'
            }            
        ],

         /* [DEFAULT] task => properties and closures */
         "apply" : [
            {
                label: 'from',
                insertText: 'from: ',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a script to use to configure the target objects.'
            },
            {
                label: 'plugin',
                insertText: 'plugin: ',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a Plugin to use to configure the target objects.',
            },
            {
                label: 'to',
                insertText: 'to: ',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies some target objects to be configured.'
            },
            {
                label: 'type',
                insertText: 'type: ',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the plugin implemented by the given class to the target.'
            }
        ],

        // Declares plugins to use in a script.
        'plugins' : [
            {
                label: 'id',
                kind: CompletionItemKind.Method,
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

/**
 * Java plugin's keywords
 * @param method 
 */
function getJavaKeywords(method: string) : CompletionItem[] {
    /* Preprocess method name */
    if (method.startsWith("compile") || method.endsWith("Compile") || method.endsWith("CompileOnly") || method.endsWith("CompileClasspath")) {
        method = "JavaCompile";
    } else if (method.endsWith("Runtime")) {
        method = "runtime";
    } else if (method == "processResources" || method == "processTestResources" || (method.startsWith("process") && method.endsWith("Resources")) ) {
        method = "Copy";
    } else if (method.startsWith("clean")) {
        method = "Delete";
    } else if (method == "maven" || method == "ivy") {
        method = "Repository";
    }

    let map : {[key: string]: CompletionItem[]} = {

        // Compiles Java source files 
        'Copy' : [
            {
                label: 'dir',
                kind: CompletionItemKind.Property
            },
            {
                label: 'caseSensitive',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'destinationDir',
                kind: CompletionItemKind.Property,
                documentation: 'The directory to copy files into.'
            },
            {
                label: 'dirMode',
                kind: CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories. null means that existing permissions are preserved.'
            },
            {
                label: 'duplicatesStrategy',
                kind: CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'excludes',
                kind: CompletionItemKind.Property,
                documentation: 'The set of exclude patterns.'
            },
            {
                label: 'fileMode',
                kind: CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files. null means that existing permissions are preserved.'
            },
            {
                label: 'includeEmptyDirs',
                kind: CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'includes',
                kind: CompletionItemKind.Property,
                documentation: 'The set of include patterns.'
            },
            {
                label: 'source',
                kind: CompletionItemKind.Property,
                documentation: 'The source files for this task.'
            },
            {
                label: 'eachFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination.'
            },
            {
                label: 'exclude',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an exclude spec or an ANT style exclude pattern.'
            },
            {
                label: 'expand',
                kind: CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied. More specifically, each file is transformed using Groovy\'s SimpleTemplateEngine.'
            },
            {
                label: 'filesMatching',
                kind: CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filesNotMatching',
                kind: CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path does not match any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'include',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an include spec or an ANT style include pattern.'
            },
            {
                label: 'into',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies the destination directory for a copy.'
            },
            {
                label: 'rename',
                kind: CompletionItemKind.Method,
                documentation: 'Renames a source file. The closure will be called with a single parameter, the name of the file. The closure should return a String object with a new target name. The closure may return null, in which case the original name will be used.'
            },
            {
                label: 'with',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],

        // Simply removes the directory denoted by its dir property
        'Delete' : [
            {
                label: 'dir',
                kind: CompletionItemKind.Property
            },
            {
                label: 'delete',
                kind: CompletionItemKind.Property,
                documentation: 'The set of files which will be deleted by this task.'
            },
            {
                label: 'followSymlinks',
                kind: CompletionItemKind.Property,
                documentation: 'Returns if symlinks should be followed when doing a delete.'
            },
            {
                label: 'targetFiles',
                kind: CompletionItemKind.Property,
                documentation: 'The resolved set of files which will be deleted by this task.'
            }
        ],

        // Assembles a JAR archive
        'jar' : [
            {
                label: 'appendix',
                kind: CompletionItemKind.Property,
                documentation: 'The appendix part of the archive name, if any.'
            },
            {
                label: 'archiveName',
                kind: CompletionItemKind.Property,
                documentation: 'The archive name. If the name has not been explicitly set, the pattern for the name is:[baseName]-[appendix]-[version]-[classifier].[extension]'
            },
            {
                label: 'archivePath',
                kind: CompletionItemKind.Property,
                documentation: 'The path where the archive is constructed. The path is simply the destinationDir plus the archiveName.'
            },
            {
                label: 'baseName',
                kind: CompletionItemKind.Property,
                documentation: 'The base name of the archive.'
            },
            {
                label: 'caseSensitive',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether case-sensitive pattern matching should be used.'
            },
            {
                label: 'classifier',
                kind: CompletionItemKind.Property,
                documentation: 'The classifier part of the archive name, if any.'
            },
            {
                label: 'destinationDir',
                kind: CompletionItemKind.Property,
                documentation: 'The directory where the archive is generated into.'
            },
            {
                label: 'dirMode',
                kind: CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target directories. null means that existing permissions are preserved.'
            },
            {
                label: 'duplicatesStrategy',
                kind: CompletionItemKind.Property,
                documentation: 'The strategy to use when trying to copy more than one file to the same destination.'
            },
            {
                label: 'entryCompression',
                kind: CompletionItemKind.Property,
                documentation: 'The compression level of the entries of the archive.'
            },
            {
                label: 'excludes',
                kind: CompletionItemKind.Property,
                documentation: 'The set of exclude patterns.'
            },
            {
                label: 'extension',
                kind: CompletionItemKind.Property,
                documentation: 'The extension part of the archive name.'
            },
            {
                label: 'fileMode',
                kind: CompletionItemKind.Property,
                documentation: 'The Unix permissions to use for the target files. null means that existing permissions are preserved.'
            },
            {
                label: 'includeEmptyDirs',
                kind: CompletionItemKind.Property,
                documentation: 'Tells if empty target directories will be included in the copy.'
            },
            {
                label: 'includes',
                kind: CompletionItemKind.Property,
                documentation: 'The set of include patterns.'
            },
            {
                label: 'manifest',
                kind: CompletionItemKind.Property,
                documentation: 'The manifest for this JAR archive.'
            },
            {
                label: 'metadataCharset',
                kind: CompletionItemKind.Property,
                documentation: 'The character set used to encode JAR metadata like file names. Defaults to UTF-8.'
            },
            {
                label: 'preserveFileTimestamps',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether file timestamps should be preserved in the archive.'
            },
            {
                label: 'reproducibleFileOrder',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether to enforce a reproducible file order when reading files from directories.'
            },
            {
                label: 'source',
                kind: CompletionItemKind.Property,
                documentation: 'The source files for this task.'
            },
            {
                label: 'version',
                kind: CompletionItemKind.Property,
                documentation: 'The version part of the archive name, if any.'
            },
            {
                label: 'zip64',
                kind: CompletionItemKind.Property,
                documentation: 'Whether the zip can contain more than 65535 files and/or support files greater than 4GB in size.'
            },
            {
                label: 'eachFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an action to be applied to each file as it about to be copied into its destination. The given closure is called with a FileCopyDetails as its parameter. Actions are executed in the order added, and are inherited from the parent spec.'
            },
            {
                label: 'exclude',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an exclude spec or an ANT style exclude pattern.'
            },
            {
                label: 'expand',
                kind: CompletionItemKind.Method,
                documentation: 'Expands property references in each file as it is copied.'
            },
            {
                label: 'filesMatching',
                kind: CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path matches any of the specified Ant-style patterns.'
            },
            {
                label: 'filesNotMatching',
                kind: CompletionItemKind.Method,
                documentation: 'Configure the FileCopyDetails for each file whose path does not match any of the specified Ant-style patterns.'
            },
            {
                label: 'filter',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a content filter based on the provided closure.'
            },
            {
                label: 'from',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies the source files or directories for a copy and creates a child CopySourceSpec.'
            },
            {
                label: 'include',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an include spec or an ANT style include pattern'
            },
            {
                label: 'into',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies the destination directory *inside* the archive for the files.'
            },
            {
                label: 'manifest',
                kind: CompletionItemKind.Method,
                documentation: 'Configures the manifest for this JAR archive.'
            },
            {
                label: 'metaInf',
                kind: CompletionItemKind.Method,
                documentation: 'Adds content to this JAR archive\'s META-INF directory.'
            },
            {
                label: 'rename',
                kind: CompletionItemKind.Method,
                documentation: 'Renames a source file. The closure will be called with a single parameter, the name of the file. The closure should return a String object with a new target name. The closure may return null, in which case the original name will be used.'
            },
            {
                label: 'with',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the given specs as a child of this spec.'
            }
        ],

        // Compiles Java source files
        'JavaCompile' : [
            {
                label: 'classpath',
                kind: CompletionItemKind.Property,
                documentation: 'The classpath to use to compile the source files.'
            },
            {
                label: 'destinationDir',
                kind: CompletionItemKind.Property,
                documentation: 'The directory to generate the .class files into.'
            },
            {
                label: 'excludes',
                kind: CompletionItemKind.Property,
                documentation: 'The set of exclude patterns.'
            },
            {
                label: 'includes',
                kind: CompletionItemKind.Property,
                documentation: 'The compilation options.'
            },
            {
                label: 'source',
                kind: CompletionItemKind.Property,
                documentation: 'The source for this task, after the include and exclude patterns have been applied. Ignores source files which do not exist.'
            },
            {
                label: 'sourceCompatibility',
                kind: CompletionItemKind.Property,
                documentation: 'The Java language level to use to compile the source files.'
            },
            {
                label: 'targetCompatibility',
                kind: CompletionItemKind.Property,
                documentation: 'The target JVM to generate the .class files for.'
            },
            {
                label: 'toolChain',
                kind: CompletionItemKind.Property,
                documentation: 'The tool chain that will be used to compile the Java source.'
            },
            {
                label: 'exclude',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an exclude spec or an ANT style exclude pattern.'
            },
            {
                label: 'include',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an include spec or an ANT style include pattern.'
            },
            {
                label: 'source',
                kind: CompletionItemKind.Method,
                documentation: 'Adds some source to this task. The given source objects will be evaluated as per Project.files(java.lang.Object[]).'
            }
        ],

        // Configures the dependencies for this project
        'dependencies' : [
            {
                label: 'compile',
                kind: CompletionItemKind.Method,
                documentation: 'Compile time dependencies.'
            },
            {
                label: 'compileOnly',
                kind: CompletionItemKind.Method,
                documentation: 'Compile time only dependencies, not used at runtime.'
            },
            {
                label: 'compileClasspath',
                kind: CompletionItemKind.Method,
                documentation: 'Compile classpath, used when compiling source.'
            },
            {
                label: 'runtime',
                kind: CompletionItemKind.Method,
                documentation: 'Runtime dependencies.'
            },
            {
                label: 'testCompile',
                kind: CompletionItemKind.Method,
                documentation: 'Additional dependencies for compiling tests.'
            },
            {
                label: 'testCompileOnly',
                kind: CompletionItemKind.Method,
                documentation: 'Additional dependencies only for compiling tests, not used at runtime.'
            },
            {
                label: 'testCompileClasspath',
                kind: CompletionItemKind.Method,
                documentation: 'Test compile classpath, used when compiling test sources.'
            },
            {
                label: 'testRuntime',
                kind: CompletionItemKind.Method,
                documentation: 'Additional dependencies for running tests only.'
            },
            {
                label: 'archives',
                kind: CompletionItemKind.Method,
                documentation: 'Artifacts (e.g. jars) produced by this project.'
            },
            {
                label: 'default',
                kind: CompletionItemKind.Method,
                documentation: 'Artifacts (e.g. jars) produced by this project.'
            },
            {
                label: 'modules',
                kind: CompletionItemKind.Method
            }
        ],

        // A SourceSetContainer manages a set of SourceSet objects
        'sourceSets' : [ 
        ],

        // Assembles the production classes and resources directories.
        'classes' : [
        ],

        // Assembles the test classes and resources directories.
        'testClasses' : [
        ],

        // Core Javadoc options and standard doclet's options
        'javadoc' : [
            {
                label: 'classpath',
                kind: CompletionItemKind.Property
            },
            {
                label: 'source',
                kind: CompletionItemKind.Property
            },
            {
                label: 'destinationDir',
                kind: CompletionItemKind.Property
            },
            {
                label: 'title',
                kind: CompletionItemKind.Property
            }
        ],

        // Gradle repository management
        'repositories' : [
            {
                label: 'mavenCentral',
                kind: CompletionItemKind.Module,
                documentation: 'Maven central repository.'
            },
            {
                label: 'jcenter',
                kind: CompletionItemKind.Module,
                documentation: 'Maven JCenter repository.'
            },
            {
                label: 'google',
                kind: CompletionItemKind.Module,
                documentation: 'Maven Google repository.'
            },
            {
                label: 'maven',
                kind: CompletionItemKind.Module,
                documentation: 'Maven repositories.'
            },
            {
                label: 'flatDir',
                kind: CompletionItemKind.Module,
                documentation: 'Flat directory repository.'
            },
            {
                label: 'ivy',
                kind: CompletionItemKind.Module,
                documentation: 'Ivy repositories'
            },
            {
                label: 'localRepository',
                kind: CompletionItemKind.Module,
                documentation: 'Local repository'
            }
        ],

        // Add a custom repository
        'Repository' : [
            {
                label: 'credentials',
                kind: CompletionItemKind.Property
            },
            {
                label: 'authentication',
                kind: CompletionItemKind.Property
            },
            {
                label: 'url',
                kind: CompletionItemKind.Property
            },
            {
                label: 'artifactUrls',
                kind: CompletionItemKind.Property
            },
            {
                label: 'layout',
                kind: CompletionItemKind.Property
            },
            {
                label: 'ivyPattern',
                kind: CompletionItemKind.Property
            },
            {
                label: 'artifactPattern',
                kind: CompletionItemKind.Property
            }
        ],
        'credentials' : [
            {
                label: 'username',
                kind: CompletionItemKind.Property
            },
            {
                label: 'password',
                kind: CompletionItemKind.Property
            },
            {
                label: 'accessKey',
                kind: CompletionItemKind.Property
            },
            {
                label: 'secretKey',
                kind: CompletionItemKind.Property
            },
            {
                label: 'sessionToken',
                kind: CompletionItemKind.Property
            }
        ],
        'authentication' : [
            {
                label: 'digest',
                kind: CompletionItemKind.Method
            },
            {
                label: 'basic',
                kind: CompletionItemKind.Method
            }
        ],

        // Execute JUnit (3.8.x or 4.x) or TestNG tests
        'test' : [
            {
                label: 'allJvmArgs',
                kind: CompletionItemKind.Property,
                documentation: 'The full set of arguments to use to launch the JVM for the process.'
            },
            {
                label: 'binResultsDir',
                kind: CompletionItemKind.Property,
                documentation: 'The root folder for the test results in internal binary format.'
            },
            {
                label: 'bootstrapClasspath',
                kind: CompletionItemKind.Property,
                documentation: 'The bootstrap classpath to use for the process. The default bootstrap classpath for the JVM is used when this classpath is empty.'
            },
            {
                label: 'classpath',
                kind: CompletionItemKind.Property,
                documentation: 'The classpath to use to execute the tests.'
            },
            {
                label: 'debug',
                kind: CompletionItemKind.Property,
                documentation: 'Returns true if debugging is enabled for the process. When enabled, the process is started suspended and listening on port 5005.'
            },
            {
                label: '',
                kind: CompletionItemKind.Property,
                documentation: ''
            },
            {
                label: 'enableAssertions',
                kind: CompletionItemKind.Property,
                documentation: 'Returns true if assertions are enabled for the process.'
            },
            {
                label: 'environment',
                kind: CompletionItemKind.Property,
                documentation: 'The environment variables to use for the process. Defaults to the environment of this process.'
            },
            {
                label: 'excludes',
                kind: CompletionItemKind.Property,
                documentation: 'The exclude patterns for test execution.'
            },
            {
                label: 'executable',
                kind: CompletionItemKind.Property,
                documentation: 'The name of the executable to use.'
            },
            {
                label: 'forkEvery',
                kind: CompletionItemKind.Property,
                documentation: 'The maximum number of test classes to execute in a forked test process. The forked test process will be restarted when this limit is reached. The default value is 0 (no maximum).'
            },
            {
                label: 'ignoreFailures',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether the build should break when the verifications performed by this task fail.'
            },
            {
                label: 'includes',
                kind: CompletionItemKind.Property,
                documentation: 'The include patterns for test execution.'
            },
            {
                label: 'jvmArgs',
                kind: CompletionItemKind.Property,
                documentation: 'The extra arguments to use to launch the JVM for the process. Does not include system properties and the minimum/maximum heap size.'
            },
            {
                label: 'maxHeapSize',
                kind: CompletionItemKind.Property,
                documentation: 'The maximum heap size for the process, if any.'
            },
            {
                label: 'maxParallelForks',
                kind: CompletionItemKind.Property,
                documentation: 'The maximum number of forked test processes to execute in parallel. The default value is 1 (no parallel test execution). It cannot exceed the value of max-workers for the current build.'
            },
            {
                label: 'minHeapSize',
                kind: CompletionItemKind.Property,
                documentation: 'The minimum heap size for the process, if any.'
            },
            {
                label: 'options',
                kind: CompletionItemKind.Property,
                documentation: 'Returns test framework specific options. Make sure to call Test.useJUnit() or Test.useTestNG() before using this method.'
            },
            {
                label: 'reports',
                kind: CompletionItemKind.Property,
                documentation: 'The reports that this task potentially produces.'
            },
            {
                label: 'scanForTestClasses',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether test classes should be detected. When true the classes which match the include and exclude patterns are scanned for test classes, and any found are executed. When false the classes which match the include and exclude patterns are executed.'
            },
            {
                label: 'systemProperties',
                kind: CompletionItemKind.Property,
                documentation: 'The system properties which will be used for the process.'
            },
            {
                label: 'testClassesDir',
                kind: CompletionItemKind.Property,
                documentation: 'The root folder for the compiled test sources.'
            },
            {
                label: 'testClassesDirs',
                kind: CompletionItemKind.Property,
                documentation: 'The directories for the compiled test sources.'
            },
            {
                label: 'testLogging',
                kind: CompletionItemKind.Property,
                documentation: 'Allows to set options related to which test events are logged to the console, and on which detail level.'
            },
            {
                label: 'workingDir',
                kind: CompletionItemKind.Property,
                documentation: 'The working directory for the process. Defaults to the project directory.'
            },
            {
                label: 'jacoco',
                kind: CompletionItemKind.Property,
                documentation: 'The JacocoTaskExtension added by the jacoco plugin.'
            },
            {
                label: 'addTestListener',
                kind: CompletionItemKind.Method,
                documentation: 'Registers a test listener with this task.'
            },
            {
                label: 'addTestOutputListener',
                kind: CompletionItemKind.Method,
                documentation: 'Registers a output listener with this task.'
            },
            {
                label: 'afterSuite',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified after a test suite has executed. A TestDescriptor and TestResult instance are passed to the closure as a parameter.'
            },
            {
                label: 'afterTest',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified after a test has executed. A TestDescriptor and TestResult instance are passed to the closure as a parameter.'
            },
            {
                label: 'beforeSuite',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified before a test suite is executed. A TestDescriptor instance is passed to the closure as a parameter.'
            },
            {
                label: 'beforeTest',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified before a test is executed. A TestDescriptor instance is passed to the closure as a parameter.'
            },
            {
                label: 'bootstrapClasspath',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the given values to the end of the bootstrap classpath for the process.'
            },
            {
                label: 'copyTo',
                kind: CompletionItemKind.Method,
                documentation: 'Copies these options to the given target options.'
            },
            {
                label: 'environment',
                kind: CompletionItemKind.Method,
                documentation: 'Adds one or more environment variables to the environment for this process.'
            },
            {
                label: 'exclude',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a exclude spec or some exclude patterns.'
            },
            {
                label: 'executable',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the name of the executable to use.'
            },
            {
                label: 'include',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a include spec or some include patterns.'
            },
            {
                label: 'jvmArgs',
                kind: CompletionItemKind.Method,
                documentation: 'Adds some arguments to use to launch the JVM for the process.'
            },
            {
                label: 'onOutput',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a closure to be notified when output from the test received. A TestDescriptorand TestOutputEvent instance are passed to the closure as a parameter.'
            },
            {
                label: 'options',
                kind: CompletionItemKind.Method,
                documentation: 'Configures test framework specific options.'
            },
            {
                label: 'removeTestListener',
                kind: CompletionItemKind.Method,
                documentation: 'Unregisters a test listener with this task.'
            },
            {
                label: 'removeTestOutputListener',
                kind: CompletionItemKind.Method,
                documentation: 'Unregisters a test output listener with this task.'
            },
            {
                label: 'reports',
                kind: CompletionItemKind.Method,
                documentation: 'Configures the reports that this task potentially produces.'
            },
            {
                label: 'setTestNameIncludePatterns',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the test name patterns to be included in execution. Classes or method names are supported, wildcard \'*\' is supported.'
            },
            {
                label: 'systemProperties',
                kind: CompletionItemKind.Method,
                documentation: 'Adds some system properties to use for the process.'
            },
            {
                label: 'testLogging',
                kind: CompletionItemKind.Method,
                documentation: 'Allows configuring the logging of the test execution, for example log eagerly the standard output, etc.'
            },
            {
                label: 'useJUnit',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies that JUnit should be used to execute the tests.'
            },
            {
                label: 'useTestNG',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies that TestNG should be used to execute the tests.'
            },
            {
                label: 'workingDir',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the working directory for the process.'
            }
        ],

        // Uploads artifacts in the archives configuration, including the JAR file.
        'uploadArchives' : [
            {
                label: 'artifacts',
                kind: CompletionItemKind.Property,
                documentation: 'The artifacts which will be uploaded.'
            },
            {
                label: 'configuration',
                kind: CompletionItemKind.Property,
                documentation: 'The configuration to upload.'
            },
            {
                label: 'repositories',
                kind: CompletionItemKind.Property,
                documentation: 'The repositories to upload to.'
            },
            {
                label: 'uploadDescriptor',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether the dependency descriptor should be uploaded.'
            }
        ]
    }

    return map[method];
}

/**
 * Android plugin's keywords
 * @param method 
 */
function getAndroidKeywords(method: string) : CompletionItem[] {
    /* Preprocess method name */
    if (method.endsWith("Compile") || method.endsWith("CompileOnly") || method.endsWith("CompileClasspath")) {
        method = "compile";
    } else if (method.endsWith("Runtime")) {
        method = "runtime";
    }


    let map : {[key: string]: CompletionItem[]} = {
        // android => properties and closures
        "android" : [
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
                label: 'applicationVariants',
                kind: CompletionItemKind.Property,
                documentation: 'Returns a collection of build variants that the app project includes.'
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
                label: 'testBuildType',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the build type that the plugin should use to test the module.'
            },
            {
                label: 'testOptions',
                kind: CompletionItemKind.Property,
                documentation: 'Options for running tests.'
            },
            {
                label: 'testVariants',
                kind: CompletionItemKind.Property,
                documentation: 'Returns a collection of Android test build variants.'
            },
            {
                label: 'unitTestVariants',
                kind: CompletionItemKind.Property,
                documentation: 'Returns a collection of Android unit test build variants.'
            },
            {
                label: 'variantFilter',
                kind: CompletionItemKind.Property,
                documentation: 'Callback to control which variants should be excluded.'
            },
            {
                label: 'flavorDimensions',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies the names of product flavor dimensions for this project.'
            },
            {
                label: 'useLibrary',
                kind: CompletionItemKind.Method,
                documentation: 'Includes the specified library to the classpath.'
            }
        ],

        // DSL object for configuring aapt options.
        'aaptOptions': [
            {
                label: 'additionalParameters',
                kind: CompletionItemKind.Property,
                documentation: 'The list of additional parameters to pass to appt.'
            },
            {
                label: 'cruncherProcesses',
                kind: CompletionItemKind.Property,
                documentation: 'Obtains the number of cruncher processes to use. More cruncher processes will crunch files faster, but will require more memory and CPU.'
            },
            {
                label: 'failOnMissingConfigEntry',
                kind: CompletionItemKind.Property,
                documentation: 'Forces aapt to return an error if it fails to find an entry for a configuration.'
            },
            {
                label: 'ignoreAssets',
                kind: CompletionItemKind.Property,
                documentation: 'Pattern describing assets to be ignore.'
            },
            {
                label: 'ignoreAssetsPattern',
                kind: CompletionItemKind.Property,
                documentation: 'Pattern describing assets to be ignore.'
            },
            {
                label: 'noCompress',
                kind: CompletionItemKind.Property,
                documentation: 'Extensions of files that will not be stored compressed in the APK. Adding an empty extension, i.e., setting noCompress \'\' will trivially disable compression for all files.'
            },
            {
                label: 'additionalParameters',
                kind: CompletionItemKind.Method,
                documentation: 'Adds additional parameters to be passed to aapt.'
            },
            {
                label: 'noCompress',
                kind: CompletionItemKind.Method,
                documentation: 'Sets extensions of files that will not be stored compressed in the APK.'
            }
        ],

        // Options for the adb tool. 
        'adbOptions': [
            {
                label: 'installOptions',
                kind: CompletionItemKind.Property,
                documentation: 'The list of FULL_APK installation options.'
            },
            {
                label: 'timeOutInMs',
                kind: CompletionItemKind.Property,
                documentation: 'The time out used for all adb operations.'
            }
        ],

        // DSL object to configure build types.
        "buildTypes" : [

        ],

        // A Dependency on a module outside the current project.
        'compile' : [
            {
                label: 'addArtifact',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an artifact to this dependency.'
            },
            {
                label: 'artifact',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an artifact to this dependency.'
            },
            {
                label: 'copy',
                kind: CompletionItemKind.Method,
                documentation: 'Creates and returns a new dependency with the property values of this one.'
            },
            {
                label: 'exclude',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an exclude rule to exclude transitive dependencies of this dependency.'
            },
            {
                label: 'getArtifacts',
                kind: CompletionItemKind.Method,
                documentation: 'Returns the artifacts belonging to this dependency.'
            },
            {
                label: 'getExcludeRules',
                kind: CompletionItemKind.Method,
                documentation: 'Returns the exclude rules for this dependency.'
            },
            {
                label: 'getTargetConfiguration',
                kind: CompletionItemKind.Method,
                documentation: 'Returns the requested target configuration of this dependency.'
            },
            {
                label: 'isTransitive',
                kind: CompletionItemKind.Method,
                documentation: 'Returns whether this dependency should be resolved including or excluding its transitive dependencies.'
            },
            {
                label: 'setTargetConfiguration',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the requested target configuration of this dependency.'
            },
            {
                label: 'setTransitive',
                kind: CompletionItemKind.Method,
                documentation: 'Sets whether this dependency should be resolved including or excluding its transitive dependencies.'
            }
        ],

        // Java compilation options.
        'compileOptions' : [
            {
                label: 'encoding',
                kind: CompletionItemKind.Property,
                documentation: 'Java source files encoding.'
            },
            {
                label: 'incremental',
                kind: CompletionItemKind.Property,
                documentation: 'Whether java compilation should use Gradle\'s new incremental model.'
            },
            {
                label: 'sourceCompatibility',
                kind: CompletionItemKind.Property,
                documentation: 'Language level of the java source code.'
            },
            {
                label: 'targetCompatibility',
                kind: CompletionItemKind.Property,
                documentation: 'Version of the generated Java bytecode.'
            }
        ],

        // DSL object for configuring databinding options.
        'dataBinding' : [
            {
                label: 'addDefaultAdapters',
                kind: CompletionItemKind.Property,
                documentation: 'Whether to add the default data binding adapters.'
            },
            {
                label: 'enabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether to enable data binding.'
            },
            {
                label: 'enabledForTests',
                kind: CompletionItemKind.Property,
                documentation: 'Whether to run data binding code generation for test projects'
            },
            {
                label: 'version',
                kind: CompletionItemKind.Property,
                documentation: 'The version of data binding to use.'
            }
        ],

        // DSL object for the defaultConfig object.
        'defaultConfig' : [
            {
                label: 'applicationId',
                kind: CompletionItemKind.Property,
                documentation: 'The application ID.'
            },
            {
                label: 'applicationIdSuffix',
                kind: CompletionItemKind.Property,
                documentation: 'Application id suffix. It is appended to the "base" application id when calculating the final application id for a variant.'
            },
            {
                label: 'consumerProguardFiles',
                kind: CompletionItemKind.Property,
                documentation: 'ProGuard rule files to be included in the published AAR.'
            },
            {
                label: 'dimension',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the flavor dimension that this product flavor belongs to.'
            },
            {
                label: 'externalNativeBuild',
                kind: CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant CMake and ndk-build configurations for your external native build.'
            },
            {
                label: 'javaCompileOptions',
                kind: CompletionItemKind.Property,
                documentation: 'Options for configuration Java compilation.'
            },
            {
                label: 'manifestPlaceholders',
                kind: CompletionItemKind.Property,
                documentation: 'The manifest placeholders.'
            },
            {
                label: 'multiDexEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether Multi-Dex is enabled for this variant.'
            },
            {
                label: 'multiDexKeepFile',
                kind: CompletionItemKind.Property,
                documentation: 'Text file that specifies additional classes that will be compiled into the main dex file.'
            },
            {
                label: 'multiDexKeepProguard',
                kind: CompletionItemKind.Property,
                documentation: 'Text file with additional ProGuard rules to be used to determine which classes are compiled into the main dex file.'
            },
            {
                label: 'ndk',
                kind: CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant configurations for the NDK, such as ABI filters.'
            },
            {
                label: 'proguardFiles',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'signingConfig',
                kind: CompletionItemKind.Property,
                documentation: 'Signing config used by this product flavor.'
            },
            {
                label: 'testApplicationId',
                kind: CompletionItemKind.Property,
                documentation: 'Test application ID.'
            },
            {
                label: 'testFunctionalTest',
                kind: CompletionItemKind.Property
            },
            {
                label: 'testHandleProfiling',
                kind: CompletionItemKind.Property
            },
            {
                label: 'testInstrumentationRunner',
                kind: CompletionItemKind.Property,
                documentation: 'Test instrumentation runner class name.'
            },
            {
                label: 'testInstrumentationRunnerArguments',
                kind: CompletionItemKind.Property,
                documentation: 'Test instrumentation runner custom arguments.'
            },
            {
                label: 'vectorDrawables',
                kind: CompletionItemKind.Property,
                documentation: 'Options to configure the build-time support for vector drawables.'
            },
            {
                label: 'versionCode',
                kind: CompletionItemKind.Property,
                documentation: 'Version code.'
            },
            {
                label: 'versionName',
                kind: CompletionItemKind.Property,
                documentation: 'Version name.'
            },
            {
                label: 'versionNameSuffix',
                kind: CompletionItemKind.Property,
                documentation: 'Version name suffix. It is appended to the "base" version name when calculating the final version name for a variant.'
            },
            {
                label: 'wearAppUnbundled',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether to enable unbundling mode for embedded wear app. If true, this enables the app to transition from an embedded wear app to one distributed by the play store directly.'
            },
            {
                label: 'buildConfigField',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new field to the generated BuildConfig class.'
            },
            {
                label: 'maxSdkVersion',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the maximum SDK version to the given value.'
            },
            {
                label: 'minSdkVersion',
                kind: CompletionItemKind.Method,
                documentation: 'Sets minimum SDK version.'
            },
            {
                label: 'missingDimensionStrategy',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies a flavor that the plugin should try to use from a given dimension in a dependency.'
            },
            {
                label: 'proguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies a ProGuard configuration file that the plugin should use.'
            },
            {
                label: 'proguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'resConfig',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a resource configuration filter.'
            },
            {
                label: 'resConfigs',
                kind: CompletionItemKind.Method,
                documentation: 'Adds several resource configuration filters.'
            },
            {
                label: 'resValue',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new generated resource.'
            },
            {
                label: 'setConsumerProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies a proguard rule file to be included in the published AAR.'
            },
            {
                label: 'setProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the ProGuard configuration files.'
            },
            {
                label: 'setTestProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies proguard rule files to be used when processing test code.'
            },
            {
                label: 'targetSdkVersion',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the target SDK version to the given value.'
            },
            {
                label: 'testInstrumentationRunnerArgument',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a custom argument to the test instrumentation runner.'
            },
            {
                label: 'testInstrumentationRunnerArguments',
                kind: CompletionItemKind.Method,
                documentation: 'Adds custom arguments to the test instrumentation runner.'
            },
            {
                label: 'testProguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be used when processing test code.'
            },
            {
                label: 'testProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be used when processing test code.'
            }
        ],

        // Configures the dependencies for this project.
        'dependencies' : [
            {
                label: 'compile',
                kind: CompletionItemKind.Method,
            },
            {
                label: 'testCompile',
                kind: CompletionItemKind.Method,
            },
            {
                label: 'runtime',
                kind: CompletionItemKind.Method,
            },
            {
                label: 'module',
                kind: CompletionItemKind.Method,
                documentation: 'Creates a dependency on a client module.'
            },
            {
                label: 'project',
                kind: CompletionItemKind.Method,
                documentation: 'Creates a dependency on a project.'
            }
        ],

        // Gradle repository management
        'repositories' : [
            {
                label: 'mavenCentral',
                kind: CompletionItemKind.Module,
                documentation: 'Maven central repository.'
            },
            {
                label: 'jcenter',
                kind: CompletionItemKind.Module,
                documentation: 'Maven JCenter repository.'
            },
            {
                label: 'google',
                kind: CompletionItemKind.Module,
                documentation: 'Maven Google repository.'
            },
            {
                label: 'maven',
                kind: CompletionItemKind.Module,
                documentation: 'Maven repositories.'
            },
            {
                label: 'flatDir',
                kind: CompletionItemKind.Module,
                documentation: 'Flat directory repository.'
            },
            {
                label: 'ivy',
                kind: CompletionItemKind.Module,
                documentation: 'Ivy repositories'
            },
            {
                label: 'localRepository',
                kind: CompletionItemKind.Module,
                documentation: 'Local repository'
            }
        ],

        // Add a custom repository
        'repository' : [
            {
                label: 'credentials',
                kind: CompletionItemKind.Property
            },
            {
                label: 'authentication',
                kind: CompletionItemKind.Property
            },
            {
                label: 'url',
                kind: CompletionItemKind.Property
            },
            {
                label: 'artifactUrls',
                kind: CompletionItemKind.Property
            },
            {
                label: 'layout',
                kind: CompletionItemKind.Property
            },
            {
                label: 'ivyPattern',
                kind: CompletionItemKind.Property
            },
            {
                label: 'artifactPattern',
                kind: CompletionItemKind.Property
            }
        ],
        'credentials' : [
            {
                label: 'username',
                kind: CompletionItemKind.Property
            },
            {
                label: 'password',
                kind: CompletionItemKind.Property
            },
            {
                label: 'accessKey',
                kind: CompletionItemKind.Property
            },
            {
                label: 'secretKey',
                kind: CompletionItemKind.Property
            },
            {
                label: 'sessionToken',
                kind: CompletionItemKind.Property
            }
        ],
        'authentication' : [
            {
                label: 'digest',
                kind: CompletionItemKind.Method
            },
            {
                label: 'basic',
                kind: CompletionItemKind.Method
            }
        ],

        // DSL object for configuring dx options.
        'dexOptions' : [
            {
                label: 'additionalParameters',
                kind: CompletionItemKind.Property,
                documentation: 'List of additional parameters to be passed to dx.'
            },
            {
                label: 'javaMaxHeapSize',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the -Xmx value when calling dx. Example value is "2048m".'
            },
            {
                label: 'jumboMode',
                kind: CompletionItemKind.Property,
                documentation: 'Enable jumbo mode in dx (--force-jumbo).'
            },
            {
                label: 'keepRuntimeAnnotatedClasses',
                kind: CompletionItemKind.Property,
                documentation: 'Keep all classes with runtime annotations in the main dex in legacy multidex.'
            },
            {
                label: 'maxProcessCount',
                kind: CompletionItemKind.Property,
                documentation: 'The maximum number of concurrent processes that can be used to dex. Defaults to 4.'
            },
            {
                label: 'preDexLibraries',
                kind: CompletionItemKind.Property,
                documentation: 'Whether to pre-dex libraries. This can improve incremental builds, but clean builds may be slower.'
            },
            {
                label: 'threadCount',
                kind: CompletionItemKind.Property,
                documentation: 'Number of threads to use when running dx. Defaults to 4.'
            }
        ],

        // DSL object to configure external native builds using CMake or ndk-build.
        'externalNativeBuild' : [
            {
                label: 'cmake',
                kind: CompletionItemKind.Property,
                documentation: 'Encapsulates CMake build options.'
            },
            {
                label: 'ndkBuild',
                kind: CompletionItemKind.Property,
                documentation: 'Encapsulates ndk-build options.'
            }
        ],

        // DSL object for configuring lint options.
        'lintOptions' : [
            {
                label: 'abortOnError',
                kind: CompletionItemKind.Property,
                documentation: 'Whether lint should set the exit code of the process if errors are found.'
            },
            {
                label: 'absolutePaths',
                kind: CompletionItemKind.Property,
                documentation: 'Whether lint should display full paths in the error output. By default the paths are relative to the path lint was invoked from.'
            },
            {
                label: 'check',
                kind: CompletionItemKind.Property,
                documentation: 'The exact set of issues to check, or null to run the issues that are enabled by default plus any issues enabled via LintOptions.getEnable() and without issues disabled via LintOptions.getDisable(). If non-null, callers are allowed to modify this collection.'
            },
            {
                label: 'checkAllWarnings',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint should check all warnings, including those off by default.'
            },
            {
                label: 'checkReleaseBuilds',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint should check for fatal errors during release builds. Default is true. If issues with severity "fatal" are found, the release build is aborted.'
            },
            {
                label: 'disable',
                kind: CompletionItemKind.Property,
                documentation: 'The set of issue id\'s to suppress. Callers are allowed to modify this collection.'
            },
            {
                label: 'enable',
                kind: CompletionItemKind.Property,
                documentation: 'The set of issue id\'s to enable. Callers are allowed to modify this collection. To enable a given issue, add the issue ID to the returned set.'
            },
            {
                label: 'explainIssues',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint should include explanations for issue errors. (Note that HTML and XML reports intentionally do this unconditionally, ignoring this setting.)'
            },
            {
                label: 'htmlOutput',
                kind: CompletionItemKind.Property,
                documentation: 'The optional path to where an HTML report should be written'
            },
            {
                label: 'htmlReport',
                kind: CompletionItemKind.Property,
                documentation: 'Whether we should write an HTML report. Default true. The location can be controlled by LintOptions.getHtmlOutput().'
            },
            {
                label: 'ignoreWarnings',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint will only check for errors (ignoring warnings)'
            },
            {
                label: 'lintConfig',
                kind: CompletionItemKind.Property,
                documentation: 'The default configuration file to use as a fallback'
            },
            {
                label: 'noLines',
                kind: CompletionItemKind.Property,
                documentation: 'Whether lint should include the source lines in the output where errors occurred (true by default)'
            },
            {
                label: 'quiet',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint should be quiet (for example, not write informational messages such as paths to report files written)'
            },
            {
                label: 'severityOverrides',
                kind: CompletionItemKind.Property,
                documentation: 'An optional map of severity overrides. The map maps from issue id\'s to the corresponding severity to use, which must be "fatal", "error", "warning", or "ignore".'
            },
            {
                label: 'showAll',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint should include all output (e.g. include all alternate locations, not truncating long messages, etc.)'
            },
            {
                label: 'textOutput',
                kind: CompletionItemKind.Property,
                documentation: 'The optional path to where a text report should be written. The special value "stdout" can be used to point to standard output.'
            },
            {
                label: 'textReport',
                kind: CompletionItemKind.Property,
                documentation: 'Whether we should write an text report. Default false. The location can be controlled by LintOptions.getTextOutput().'
            },
            {
                label: 'warningsAsErrors',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether lint should treat all warnings as errors'
            },
            {
                label: 'xmlOutput',
                kind: CompletionItemKind.Property,
                documentation: 'The optional path to where an XML report should be written'
            },
            { 
                label: 'xmlReport',
                kind: CompletionItemKind.Property,
                documentation: 'Whether we should write an XML report. Default true. The location can be controlled by LintOptions.getXmlOutput().'
            },
            { 
                label: 'check',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the ids to the set of issues to check.'
            },
            { 
                label: 'disable',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the ids to the set of issues to disable.'
            },
            { 
                label: 'enable',
                kind: CompletionItemKind.Method,
                documentation: 'Adds the ids to the set of issues to enable.'
            },
            { 
                label: 'error',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            },
            { 
                label: 'fatal',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            },
            { 
                label: 'ignore',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            },
            { 
                label: 'warning',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a severity override for the given issues.'
            }
        ],

        // DSL object for configuring APK packaging options.
        'packagingOptions' : [
            { 
                label: 'doNotStrip',
                kind: CompletionItemKind.Property,
                documentation: 'The list of patterns for native library that should not be stripped of debug symbols.'
            },
            { 
                label: 'excludes',
                kind: CompletionItemKind.Property,
                documentation: 'The list of excluded paths.'
            },
            { 
                label: 'merges',
                kind: CompletionItemKind.Property,
                documentation: 'The list of patterns where all occurrences are concatenated and packaged in the APK.'
            },
            { 
                label: 'pickFirsts',
                kind: CompletionItemKind.Property,
                documentation: 'The list of patterns where the first occurrence is packaged in the APK. First pick patterns do get packaged in the APK, but only the first occurrence found gets packaged.'
            },
            { 
                label: 'exclude',
                kind: CompletionItemKind.Method,
                documentation: 'Adds an excluded pattern.'
            },
            { 
                label: 'merge',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a merge pattern.'
            },
            { 
                label: 'pickFirst',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a first-pick pattern.'
            }
        ],
        
        // Encapsulates all product flavors properties for this project.
        'productFlavors' : [
            
        ],

        // Encapsulates signing configurations that you can apply to BuildType and ProductFlavor configurations.
        'signingConfigs' : [
            
        ],

        // DSL object for configuring APK Splits options.
        'splits' : [
            { 
                label: 'abi',
                kind: CompletionItemKind.Property,
                documentation: 'ABI settings.'
            },
            { 
                label: 'abiFilters',
                kind: CompletionItemKind.Property,
                documentation: 'The list of ABI filters used for multi-apk.'
            },
            { 
                label: 'density',
                kind: CompletionItemKind.Property,
                documentation: 'Density settings.'
            },
            { 
                label: 'densityFilters',
                kind: CompletionItemKind.Property,
                documentation: 'The list of Density filters used for multi-apk.'
            },
            { 
                label: 'language',
                kind: CompletionItemKind.Property,
                documentation: 'Language settings.'
            },
            { 
                label: 'languageFilters',
                kind: CompletionItemKind.Property,
                documentation: 'The list of language filters used for multi-apk.'
            }
        ],

        // Options for running tests.
        'testOptions' : [
            { 
                label: 'animationsDisabled',
                kind: CompletionItemKind.Property,
                documentation: 'Disables animations during instrumented tests.'
            },
            { 
                label: 'execution',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether to use on-device test orchestration.'
            },
            { 
                label: 'reportDir',
                kind: CompletionItemKind.Property,
                documentation: 'Name of the reports directory.'
            },
            { 
                label: 'resultsDir',
                kind: CompletionItemKind.Property,
                documentation: 'Name of the results directory.'
            },
            { 
                label: 'unitTests',
                kind: CompletionItemKind.Property,
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
export function getNestedKeywords(method: string, pluginConf: PluginConf) : CompletionItem[] {
    // Initialize the default keywords as Script's keywords
    let keywords: CompletionItem[] = [];

    // Add Java plugin's nested keywords
    if (pluginConf['java']) {
        console.log("> Plugin 'java' detected!")
        keywords = keywords.concat(getJavaNestedKeywords(method));
    } 
    
    // Add Java-Library plugin's keywords
    if (pluginConf['java-library']) {
        console.log("> Plugin 'java-library' detected!")
    }
    
    // Add Android plugin's keywords
    if (pluginConf['com.android.application']) {
        console.log("> Plugin 'com.android.application' detected!")
        keywords = keywords.concat(getAndroidNestedKeywords(method));
    }

    return keywords;
}

/**
 * Java plugin's nested keywords
 * @param method 
 */
function getJavaNestedKeywords(method: string) : CompletionItem[] {
    let map : {[key: string]: CompletionItem[]} = {
        // SourceSetContainer manages a set of SourceSet objects.
        "sourceSets": [
            {
                label: 'name',
                kind: CompletionItemKind.Property,
                documentation: 'The name of the source set, used to identify it.'
            },
            {
                label: 'output',
                kind: CompletionItemKind.Property,
                documentation: 'The output files of the source set, containing its compiled classes and resources.'
            },
            {
                label: 'output.classesDirs',
                kind: CompletionItemKind.Property,
                documentation: 'The directories to generate the classes of this source set into.'
            },
            {
                label: 'output.resourcesDir',
                kind: CompletionItemKind.Property,
                documentation: 'The directory to generate the resources of this source set into.'
            },
            {
                label: 'compileClasspath',
                kind: CompletionItemKind.Property,
                documentation: 'The classpath to use when compiling the source files of this source set.'
            },
            {
                label: 'runtimeClasspath',
                kind: CompletionItemKind.Property,
                documentation: 'The classpath to use when executing the classes of this source set.'
            },
            {
                label: 'java',
                kind: CompletionItemKind.Property,
                documentation: 'The Java source files of this source set. Contains only .java files found in the Java source directories, and excludes all other files.'
            },
            {
                label: 'java.srcDirs',
                kind: CompletionItemKind.Property,
                documentation: 'The source directories containing the Java source files of this source set.'
            },
            {
                label: 'java.outputDir',
                kind: CompletionItemKind.Property,
                documentation: 'The directory to generate compiled Java sources into.'
            },
            {
                label: 'resources',
                kind: CompletionItemKind.Property,
                documentation: 'The resources of this source set. Contains only resources, and excludes any .java files found in the resource source directories. Other plugins, such as the Groovy plugin, exclude additional types of files from this collection.'
            },
            {
                label: 'resources.srcDirs',
                kind: CompletionItemKind.Property,
                documentation: 'The source directories containing the resources of this source set.'
            },
            {
                label: 'allJava',
                kind: CompletionItemKind.Property,
                documentation: 'All .java files of this source set. Some plugins, such as the Groovy plugin, add additional Java source files to this collection.'
            },
            {
                label: 'allSource',
                kind: CompletionItemKind.Property,
                documentation: 'All source files of this source set. This include all resource files and all Java source files. Some plugins, such as the Groovy plugin, add additional source files to this collection.'
            }
        ],
    }
    
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
function getAndroidNestedKeywords(method: string) : CompletionItem[] {
    let map : {[key: string]: CompletionItem[]} = {
        // DSL object to configure build types.
        'buildTypes': [
            {
                label: 'applicationIdSuffix',
                kind: CompletionItemKind.Property,
                documentation: 'Application id suffix. It is appended to the "base" application id when calculating the final application id for a variant.'
            },
            {
                label: 'consumerProguardFiles',
                kind: CompletionItemKind.Property,
                documentation: 'ProGuard rule files to be included in the published AAR.'
            },
            {
                label: 'crunchPngs',
                kind: CompletionItemKind.Property,
                documentation: 'Whether to crunch PNGs.'
            },
            {
                label: 'debuggable',
                kind: CompletionItemKind.Property,
                documentation: 'Whether this build type should generate a debuggable apk.'
            },
            {
                label: 'embedMicroApp',
                kind: CompletionItemKind.Property,
                documentation: 'Whether a linked Android Wear app should be embedded in variant using this build type.'
            },
            {
                label: 'javaCompileOptions',
                kind: CompletionItemKind.Property,
                documentation: 'Options for configuration Java compilation.'
            },
            {
                label: 'jniDebuggable',
                kind: CompletionItemKind.Property,
                documentation: 'Whether this build type is configured to generate an APK with debuggable native code.'
            },
            {
                label: 'manifestPlaceholders',
                kind: CompletionItemKind.Property,
                documentation: 'The manifest placeholders.'
            },
            {
                label: 'matchingFallbacks',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies a sorted list of build types that the plugin should try to use when a direct variant match with a local module dependency is not possible.'
            },
            {
                label: 'minifyEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether removal of unused java code is enabled.'
            },
            {
                label: 'multiDexEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether Multi-Dex is enabled for this variant.'
            },
            {
                label: 'multiDexKeepFile',
                kind: CompletionItemKind.Property,
                documentation: 'Text file that specifies additional classes that will be compiled into the main dex file.'
            },
            {
                label: 'multiDexKeepProguard',
                kind: CompletionItemKind.Property,
                documentation: 'Text file with additional ProGuard rules to be used to determine which classes are compiled into the main dex file.'
            },
            {
                label: 'name',
                kind: CompletionItemKind.Property,
                documentation: 'Name of this build type.'
            },
            {
                label: 'proguardFiles',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the ProGuard configuration files that the plugin should use.'
            },
            {
                label: 'pseudoLocalesEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether to generate pseudo locale in the APK.'
            },
            {
                label: 'renderscriptDebuggable',
                kind: CompletionItemKind.Property,
                documentation: 'Whether the build type is configured to generate an apk with debuggable RenderScript code.'
            },
            {
                label: 'renderscriptOptimLevel',
                kind: CompletionItemKind.Property,
                documentation: 'Optimization level to use by the renderscript compiler.'
            },
            {
                label: 'shrinkResources',
                kind: CompletionItemKind.Property,
                documentation: 'Whether shrinking of unused resources is enabled. Default is false;'
            },
            {
                label: 'signingConfig',
                kind: CompletionItemKind.Property,
                documentation: 'The signing configuration.'
            },
            {
                label: 'testCoverageEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether test coverage is enabled for this build type.'
            },
            {
                label: 'useJack',
                kind: CompletionItemKind.Property,
                documentation: 'The Jack toolchain is deprecated.'
            },
            {
                label: 'useProguard',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies whether to always use ProGuard for code and resource shrinking.'
            },
            {
                label: 'versionNameSuffix',
                kind: CompletionItemKind.Property,
                documentation: 'Version name suffix. It is appended to the "base" version name when calculating the final version name for a variant.'
            },
            {
                label: 'zipAlignEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether zipalign is enabled for this build type.'
            },
            {
                label: 'buildConfigField',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new field to the generated BuildConfig class.'
            },
            {
                label: 'consumerProguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be included in the published AAR.'
            },
            {
                label: 'consumerProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be included in the published AAR.'
            },
            {
                label: 'externalNativeBuild',
                kind: CompletionItemKind.Method,
                documentation: 'Configure native build options.'
            },
            {
                label: 'initWith',
                kind: CompletionItemKind.Method,
                documentation: 'Copies all properties from the given build type.'
            },
            {
                label: 'proguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new ProGuard configuration file.'
            },
            {
                label: 'proguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Adds new ProGuard configuration files.'
            },
            {
                label: 'resValue',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new generated resource.'
            },
            {
                label: 'setProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the ProGuard configuration files.'
            }
        ], 

        // Encapsulates all product flavors properties for this project.
        'productFlavors' : [
            { 
                label: 'applicationId',
                kind: CompletionItemKind.Property,
                documentation: 'The application ID.'
            },
            { 
                label: 'applicationIdSuffix',
                kind: CompletionItemKind.Property,
                documentation: 'Application id suffix. It is appended to the "base" application id when calculating the final application id for a variant.'
            },
            { 
                label: 'consumerProguardFiles',
                kind: CompletionItemKind.Property,
                documentation: 'ProGuard rule files to be included in the published AAR.'
            },
            { 
                label: 'dimension',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the flavor dimension that this product flavor belongs to.'
            },
            { 
                label: 'externalNativeBuild',
                kind: CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant CMake and ndk-build configurations for your external native build.'
            },
            { 
                label: 'javaCompileOptions',
                kind: CompletionItemKind.Property,
                documentation: 'Options for configuration Java compilation.'
            },
            { 
                label: 'manifestPlaceholders',
                kind: CompletionItemKind.Property,
                documentation: 'The manifest placeholders.'
            },
            { 
                label: 'matchingFallbacks',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies a sorted list of product flavors that the plugin should try to use when a direct variant match with a local module dependency is not possible.'
            },
            { 
                label: 'multiDexEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether Multi-Dex is enabled for this variant.'
            },
            { 
                label: 'multiDexKeepFile',
                kind: CompletionItemKind.Property,
                documentation: 'Text file that specifies additional classes that will be compiled into the main dex file.'
            },
            { 
                label: 'multiDexKeepProguard',
                kind: CompletionItemKind.Property,
                documentation: 'Text file with additional ProGuard rules to be used to determine which classes are compiled into the main dex file.'
            },
            { 
                label: 'ndk',
                kind: CompletionItemKind.Property,
                documentation: 'Encapsulates per-variant configurations for the NDK, such as ABI filters.'
            },
            { 
                label: 'proguardFiles',
                kind: CompletionItemKind.Property,
                documentation: 'Specifies the ProGuard configuration files that the plugin should use.'
            },
            { 
                label: 'signingConfig',
                kind: CompletionItemKind.Property,
                documentation: 'Signing config used by this product flavor.'
            },
            { 
                label: 'testApplicationId',
                kind: CompletionItemKind.Property,
                documentation: 'Test application ID.'
            },
            { 
                label: 'testFunctionalTest',
                kind: CompletionItemKind.Property
            },
            { 
                label: 'testHandleProfiling',
                kind: CompletionItemKind.Property
            },
            { 
                label: 'testInstrumentationRunner',
                kind: CompletionItemKind.Property,
                documentation: 'Test instrumentation runner class name.'
            },
            { 
                label: 'testInstrumentationRunnerArguments',
                kind: CompletionItemKind.Property,
                documentation: 'Test instrumentation runner custom arguments.'
            },
            { 
                label: 'vectorDrawables',
                kind: CompletionItemKind.Property,
                documentation: 'Options to configure the build-time support for vector drawables.'
            },
            { 
                label: 'versionCode',
                kind: CompletionItemKind.Property,
                documentation: 'Version code.'
            },
            { 
                label: 'versionName',
                kind: CompletionItemKind.Property,
                documentation: 'Version name.'
            },
            { 
                label: 'versionNameSuffix',
                kind: CompletionItemKind.Property,
                documentation: 'Version name suffix. It is appended to the "base" version name when calculating the final version name for a variant.'
            },
            { 
                label: 'wearAppUnbundled',
                kind: CompletionItemKind.Property,
                documentation: 'Returns whether to enable unbundling mode for embedded wear app. If true, this enables the app to transition from an embedded wear app to one distributed by the play store directly.'
            },
            { 
                label: 'buildConfigField',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new field to the generated BuildConfig class.'
            },
            { 
                label: 'consumerProguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be included in the published AAR.'
            },
            { 
                label: 'consumerProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be included in the published AAR.'
            },
            { 
                label: 'maxSdkVersion',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the maximum SDK version to the given value.'
            },
            { 
                label: 'missingDimensionStrategy',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies a flavor that the plugin should try to use from a given dimension in a dependency.'
            },
            { 
                label: 'proguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies a ProGuard configuration file that the plugin should use.'
            },
            { 
                label: 'proguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies ProGuard configuration files that the plugin should use.'
            },
            { 
                label: 'resConfig',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a resource configuration filter.'
            },
            { 
                label: 'resConfigs',
                kind: CompletionItemKind.Method,
                documentation: 'Adds several resource configuration filters.'
            },
            { 
                label: 'resValue',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a new generated resource.'
            },
            { 
                label: 'setConsumerProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies a proguard rule file to be included in the published AAR.'
            },
            { 
                label: 'setProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the ProGuard configuration files.'
            },
            { 
                label: 'setTestProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Specifies proguard rule files to be used when processing test code.'
            },
            { 
                label: 'targetSdkVersion',
                kind: CompletionItemKind.Method,
                documentation: 'Sets the target SDK version to the given value.'
            },
            { 
                label: 'testInstrumentationRunnerArgument',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a custom argument to the test instrumentation runner'
            },
            { 
                label: 'testInstrumentationRunnerArguments',
                kind: CompletionItemKind.Method,
                documentation: 'Adds custom arguments to the test instrumentation runner'
            },
            { 
                label: 'testProguardFile',
                kind: CompletionItemKind.Method,
                documentation: 'Adds a proguard rule file to be used when processing test code.'
            },
            { 
                label: 'testProguardFiles',
                kind: CompletionItemKind.Method,
                documentation: 'Adds proguard rule files to be used when processing test code.'
            }
        ],

        // DSL object for configuring signing configs.
        'signingConfigs' : [
            { 
                label: 'keyAlias',
                kind: CompletionItemKind.Property,
                documentation: 'Key alias used when signing.'
            },
            { 
                label: 'keyPassword',
                kind: CompletionItemKind.Property,
                documentation: 'Key password used when signing.'
            },
            { 
                label: 'storeFile',
                kind: CompletionItemKind.Property,
                documentation: 'Store file used when signing.'
            },
            { 
                label: 'storePassword',
                kind: CompletionItemKind.Property,
                documentation: 'Store password used when signing.'
            },
            { 
                label: 'storeType',
                kind: CompletionItemKind.Property,
                documentation: 'Store type used when signing.'
            },
            { 
                label: 'v1SigningEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether signing using JAR Signature Scheme (aka v1 signing) is enabled.'
            },
            { 
                label: 'v2SigningEnabled',
                kind: CompletionItemKind.Property,
                documentation: 'Whether signing using APK Signature Scheme v2 (aka v2 signing) is enabled.'
            }
        ],

        // An AndroidSourceSet represents a logical group of Java, aidl and RenderScript sources as well as Android and non-Android (Java-style) resources.
        'sourceSets' : [
            { 
                label: 'aidl',
                kind: CompletionItemKind.Property,
                documentation: 'The Android AIDL source directory for this source set.'
            },
            { 
                label: 'assets',
                kind: CompletionItemKind.Property,
                documentation: 'The Android Assets directory for this source set.'
            },
            { 
                label: 'java',
                kind: CompletionItemKind.Property,
                documentation: 'The Java source which is to be compiled by the Java compiler into the class output directory.'
            },
            { 
                label: 'jni',
                kind: CompletionItemKind.Property,
                documentation: 'The Android JNI source directory for this source set.'
            },
            { 
                label: 'jniLibs',
                kind: CompletionItemKind.Property,
                documentation: 'The Android JNI libs directory for this source set.'
            },
            { 
                label: 'manifest',
                kind: CompletionItemKind.Property,
                documentation: 'The Android Manifest file for this source set.'
            },
            { 
                label: 'name',
                kind: CompletionItemKind.Property,
                documentation: 'The name of this source set.'
            },
            { 
                label: 'renderscript',
                kind: CompletionItemKind.Property,
                documentation: 'The Android RenderScript source directory for this source set.'
            },
            { 
                label: 'res',
                kind: CompletionItemKind.Property,
                documentation: 'The Android Resources directory for this source set.'
            },
            { 
                label: 'resources',
                kind: CompletionItemKind.Property,
                documentation: 'The Java resources which are to be copied into the javaResources output directory.'
            },
            { 
                label: 'setRoot',
                kind: CompletionItemKind.Method,
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

