const { spawn } = require('child_process')

function parseArgs () {
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

function spawnCommands (commands) {
  // console.log('spawnCommands', commands)
  const procs = []
  for ({cmd, args} of commands) {
    const proc = spawn(cmd, args, {
      detached: false,
      stdio: 'inherit'
    })
    console.log(`Spawned [${proc.pid}]: ${cmd} `, args)
    proc.on('close', () => {
      procs.forEach(p => p.kill())
      process.exit()
    })
    procs.push(proc)
  }
}

module.exports = {
  parseArgs,
  spawn: spawnCommands
}
