# Race Commands

Execute multiple commands in parallel.
The first command that exits, kills the others.

## Usage

Synopsis
```sh
racecmd <cmd> [...args] [-- <cmd> [...args]]
```
Notice how `--` is used to separate commands.

### Race CLI commands
```sh
racecmd sleep 10 -- sleep 1
```
Exits after 1 second

### Race node scripts
```sh
racenode script.js "with a single argument" -- ./another/script.js with multiple arguments
```

### Race npm scripts

Assuming you have two long running npm scripts you want to run in parallel.
```sh
racenpm build-watch -- test-watch
```
