#!/usr/bin/env node

import React from 'react'
import { render } from 'ink'
import meow from 'meow'

import Kuis from '.'

const cli = meow(`
  Usage
    $ kuis

  Options
    --name  Your name

  Examples
    $ kuis --name=Jane
    Hello, Jane
`)

render(React.createElement(Kuis, cli.flags))
