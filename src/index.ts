/**
 * Server class to init the service.
 */
import compression from 'compression';
import CookieParser from 'cookie-parser';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import ExpressSession from 'express-session';
import path from 'path';

import AppDB from './utils/db';
import AppError from './middleware/error-handling';
import ConfigUtil from './utils/config';
import Logger from './utils/logger';
import Router from './routes';

class Server {

    public app: express.Application;
    
    /**
     * Constructor
     */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.db();
        this.app.use(new AppError().genericError);
        this.app.engine('html', ejs.renderFile);
        this.app.set('views', path.join(__dirname, '..', 'views'));
        this.app.set('view engine', 'ejs');
    }
    
    /**
     * Method to setup the config to init the server.
     * @returns {void}
     */
    private config(): void {
        this.app.set('port', ConfigUtil.serverPort);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(CookieParser());
        this.app.use(ExpressSession(
            {
                resave: false,
                saveUninitialized: true,
                secret: ConfigUtil.sessionSecret!
            }
        ));
        this.app.use(compression());
        this.app.use(cors());
    }

    /**
     * Method to init the routes.
     * @returns {void}
     */
    private routes(): void {
        this.app.use('/api', Router);
        this.app.use('/', Router);
    }

    /**
     * Method to start the http server.
     * @returns {void}
     */
    private start(): void {
        this.app.listen(this.app.get('port'), () => {
            Logger.info(`${ConfigUtil.appName} APP API is running at port ` +
                    `${this.app.get('port')}.`);
        });
    }

    /**
     * Method to init db connection.
     */
    private async db() {
        try {
            await new AppDB().connect();
            this.start();
        } catch (err) {
            process.exit(-1);
        }
    }

}

const server = new Server();