#!/usr/bin/env node

const { parseArgs, spawn } = require('..')

commands = parseArgs()
  .map(([cmd, ...args]) => ({cmd, args}))

spawn(commands)