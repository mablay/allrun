#!/usr/bin/env node

const { parseArgs, spawn } = require('..')

commands = parseArgs()
  .map(args => ({
    cmd: 'node',
    args
  }))
  .filter(({args}) => args[0])

spawn(commands)