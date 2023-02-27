import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  date: string;

  constructor() {
    this.date = new Date().toLocaleString();
  }

  log(message: any) {
    console.log(
      `\u001b[1;34m CUSTOM_LOG: \u001b[1;33m [${this.date}] --\u001b[0;37m ${message}`,
    );
  }
  error(message: any) {
    console.error(
      `\u001b[1;31m CUSTOM_ERROR: \u001b[1;33m [${this.date}] --\u001b[0;37m ${message}`,
    );
  }

  warn(message: any) {
    console.warn(
      `\u001b[1;33m CUSTOM_WARN: \u001b[1;33m [${this.date}] --\u001b[0;37m ${message}`,
    );
  }

  debug?(message: any) {
    console.debug(
      `\u001b[1;35m CUSTOM_DEBUG: \u001b[1;33m [${this.date}] --\u001b[0;37m ${message}`,
    );
  }

  verbose?(message: any) {
    console.debug(
      `\u001b[1;36m CUSTOM_VERBOSE: \u001b[1;33m [${this.date}] --\u001b[0;37m ${message}`,
    );
  }
}
