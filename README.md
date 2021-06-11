# AllRun

CLI polyfill for `sh -c 'cmd1 & cmd2 & ...`  
Works with linux, MacOS and Windows.

Execute multiple commands in parallel.  
Use `ctrl`+`c` to terminate them.  

Optionally
* first one finished terminates the rest
* log process ids, termination events and durations

No dependencies!

## Installation

```sh
npm i -g allrun
```

## Synopsis
```
Synopsis
   usage: allcmd [-k] [-v] <command>[ <argument>] [-- <command>[ <argument>]]
   usage: allnpm [-k] [-v] <script>[ <argument>] [-- <script>[ <argument>]]
   usage: allnode [-k] [-v] <file>[ <argument>] [-- <file>[ <argument>]]

Options:
   -k The first finished process terminates the rest
   -v Print process ids, termination events and runtime durations

Example:
   allcmd -kv sleep 1 -- sleep 3
```
Notice how `--` is used to separate commands.

## Example usage

### Parallel CLI commands
Run two parallel cli commands in verbose mode
```sh
allcmd -v sleep 3 -- sleep 1 
Spawned [24480]: sleep  [ '3' ]
Spawned [24481]: sleep  [ '1' ]
Process [24481] terminated after 1012ms
Process [24480] terminated after 3004ms
```

Same as before, now the first finished process terminates the rest.
```sh
allcmd -kv sleep 1 -- sleep 10 
Spawned [24441]: sleep  [ '10' ]
Spawned [24442]: sleep  [ '1' ]
Process [24442] terminated after 1006ms
Process [24441] terminated after 1008ms
```

### Parallel Node scripts
```sh
allnode script.js "with a single argument" -- ./another/script.js with multiple arguments
```

### Parallel npm scripts

A local installation might be more suitable using `npm i -D allrun`.

Assuming you have two long running npm scripts you want to run in parallel.
```sh
allnpm build-watch -- test-watch
```

Example use in your `package.json`
```json
"script": {
  "build-watch": "your watching build script",
  "test-watch": "your watching test script",
  "watch": "allnpm build-watch -- test-watch"
}
```
