import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Config } from './config';

@Injectable()
export class LoggerService {

  public logger: Logger;

  constructor(public logg: Logger) {
    this.logger = this.logg;
    // Set the logger level using the config value
    switch (Config.logLevel) {
      case "OFF":
        this.logger.level = this.logger.Level.OFF;
        break;
      case "ERROR":
        this.logger.level = this.logger.Level.ERROR;
        break;
      case "WARN":
        this.logger.level = this.logger.Level.WARN;
        break;
      case "INFO":
        this.logger.level = this.logger.Level.INFO;
        break;
      case "DEBUG":
        this.logger.level = this.logger.Level.DEBUG;
        break;
      default:
        this.logger.level = this.logger.Level.logger;
    }
    console.log("logger level is ", this.logger.level);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    this.logger.error(this.formatMessage(message), optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    this.logger.warn(this.formatMessage(message), optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    this.logger.info(this.formatMessage(message), optionalParams);
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    this.logger.debug(this.formatMessage(message), optionalParams);
  }

  public log(message?: any, ...optionalParams: any[]): void {
    this.logger.log(this.formatMessage(message), optionalParams);
  }

  private formatMessage(message?: any): string {
    let date = new Date(Date.now());
    let res = "[" + date.toString() + "]: ";
    if (message) {
      res += message;
    }
    return  res;
  }
}
