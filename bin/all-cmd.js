#!/usr/bin/env node

const { parseArgs, run } = require('..')

commands = parseArgs()
  .map(([cmd, ...args]) => ({cmd, args}))
  .filter(({cmd}) => cmd)

run(commands)