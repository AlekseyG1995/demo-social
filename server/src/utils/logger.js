import colors from 'colors'

const mainConfig = {
  'info': true,
  'debug': true,
  'warning': true,
  'error': true,
  'fatal': true
}

const consoleConfig = {
  'info': {
    'color': colors.cyan,
    'enabled': true
  },
  'debug': {
    'color': colors.bgBlue,
    'enabled': true
  },
  'warning': {
    'color': colors.bgWhite,
    'enabled': true
  },
  'error': {
    'color': colors.bgRed,
    'enabled': true
  },
  'fatal': {
    'color': colors.red.bold,
    'enabled': true
  },
}

class Logger {
  constructor(colors, targets = []) {
    this.colors = colors
    this.targets = targets
  }

  info(logData) {
    this.log('info', logData)
  }

  debug(...logData) {
    this.log('debug', logData)
  }

  warning(logData) {
    this.log('warning', logData)
  }

  error(logData) {
    this.log('error', logData)
  }

  fatal(logData) {
    this.log('fatal', logData)
  }

  log = (level, logData) => {
    if (this.colors[level]) {
      this.targets.forEach(target => {
        target.log(level, logData)
      })
    }
  }
}

class ConsoleTarget {
  constructor(colors) {
    this.colors = colors
  }

  log(level, logData) {
    if (this.colors[level]) {
      if (this.colors[level].enabled) {
        console.log(this.colors[level].color(logData))
      }
    } else {
      throw new Error('Unknown level Log!')
    }
  }
}

// eslint-disable-next-line no-unused-vars
class FileTarget {
  constructor(filename) {
  }

  // code FS write to file
  log(level, logData) {
    console.log(`filename: ${this.filename} :`, logData)
  }
}

const arrayTargets = [
  new ConsoleTarget(consoleConfig),
]
export const logger = new Logger(mainConfig, arrayTargets)