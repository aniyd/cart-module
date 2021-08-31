/**
 * Logger class.
 */
import winston from 'winston';

import ConfigUtil from './../config';

class Logger {

    private static readonly Levels = {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    };
    private static readonly colors = {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'white'
    };

    /**
     * Method to select the level based on the environment.
     * @returns {string}
     */
    private static level(): string {
        return ConfigUtil.env === 'development' ? 'debug' : 'warn';
    }

    /**
     * Method to create the Logger instance.
     * @returns {winston.Logger}
     */
    public static logger(): winston.Logger {
        return winston.createLogger({
            level: Logger.level(),
            levels: Logger.Levels,
            transports: [
                new winston.transports.Console({
                    format:winston.format.combine(
                        winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss:ms'}),
                        winston.format.align(),
                        winston.format.colorize({ all: true }),
                        winston.format.printf(
                            info => 
                                `${info.level} ${info.message}`
                        )
                    )
                }),
                new winston.transports.File({
                    filename: ConfigUtil.logFile,
                    format:winston.format.combine(
                        winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss:ms'}),
                        winston.format.align(),
                        winston.format.printf(
                            info => 
                                `{"level": "${info.level.toUpperCase()}", "timestamp": ` +
                                        `"${[info.timestamp]}", "message": "${info.message}"}`
                        )
                    )
                })
            ]
        });
    }

}

export default Logger.logger();