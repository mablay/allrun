const { spawn } = require('child_process')
let verbose = false
let kill = false

function parseArgs () {
  // exit on help
  if (['-h', '--help'].includes(process.argv[2])) {
    console.log('Note:')
    console.log('   [x] means: x zero or more times')
    console.log('   -- is used as command separator')
    console.log('')
    console.log('Synopsis')
    console.log('   usage: allcmd [-k] [-v] <command>[ <argument>] [-- <command>[ <argument>]]')
    console.log('   usage: allnpm [-k] [-v] <script>[ <argument>] [-- <script>[ <argument>]]')
    console.log('   usage: allnode [-k] [-v] <file>[ <argument>] [-- <file>[ <argument>]]')
    console.log('')
    console.log('Options:')
    console.log('   -k The first finished process terminates the rest')
    console.log('   -v Print process ids, termination events and runtime durations')
    console.log('')
    console.log('Example:')
    console.log('   allcmd -kv sleep 1 -- sleep 3')
    process.exit()
  }

  // parse modes
  while (true) {
    if (['-kv','-vk'].includes(process.argv[2])) {
      verbose = true
      kill = true
      process.argv.splice(2, 1)
    }
    // verbose mode
    if (process.argv[2] === '-v') {
      verbose = true
      process.argv.splice(2, 1)
      continue
    }
    // kill mode
    if (process.argv[2] === '-k') {
      kill = true
      process.argv.splice(2, 1)
      continue
    }
    break
  }

  // split args into separate commands
  let args = []
  const cmds = []
  for (const token of process.argv.slice(2).concat('--')) {
    if (token === '--') {
      cmds.push(args)
      args = []
    } else {
      args.push(token)
    }
  }
  return cmds
}


function run (commands) {
  const start = Date.now()
  const procs = []
  for ({cmd, args} of commands) {
    const proc = spawn(cmd, args, {
      detached: false,
      stdio: 'inherit'
    })
    verbose && console.log(`Spawned [${proc.pid}]: ${cmd} `, args)
    proc.on('close', () => {
      verbose && console.log(`Process [${proc.pid}] terminated after ${Date.now()-start}ms`)
      if (kill) {
        procs.forEach(p => p.kill())
        // process.exit()
      }
    })
    procs.push(proc)
  }
}

module.exports = {
  parseArgs,
  run
}
