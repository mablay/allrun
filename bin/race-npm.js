#!/usr/bin/env node

const { parseArgs, spawn } = require('..')

commands = parseArgs()
  .map(([script, ...args]) => ({
    cmd: 'npm',
    args: ['run', script, ...args]
  }))
  .filter(({args}) => args[1])

// if (!commands.every(c => c.args.length >= 2)) {
//   console.error('Missing npm scripts!')
//   console.error('Example use: racenpm build -- test')
// }

spawn(commands)