#!/usr/bin/env node

const { parseArgs, run } = require('..')

commands = parseArgs()
  .map(args => ({
    cmd: 'node',
    args
  }))
  .filter(({args}) => args[0])

run(commands)