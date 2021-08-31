/**
 * Config util class to define the app configuration. 
 */
import path from 'path';

export default class ConfigUtil {

    public static readonly appName: string = 'Cybrilla';
    public static readonly env: string = 'development';
    public static readonly logFile: string = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'logs',
        'all.log'
    );
    public static readonly mongoConfig = {
        dbUrl: process.env.DB_URL
    };
    public static readonly serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 4978;
    public static readonly sessionSecret: string | undefined = process.env.SESSION_SECRET;

}