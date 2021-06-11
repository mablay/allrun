#!/usr/bin/env node

const { parseArgs, run } = require('..')

commands = parseArgs()
  .map(([script, ...args]) => ({
    cmd: 'npm',
    args: ['run', script, ...args]
  }))
  .filter(({args}) => args[1])

run(commands)