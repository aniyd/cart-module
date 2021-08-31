/**
 * Class to define the db related operation.
 */
import mongoose from 'mongoose';

import ConfigUtil from './../config';
import Logger from './../logger';

export default class AppDB {
    
    private static dburl: string; 
    private static dbOptions: mongoose.ConnectOptions = {};

    /**
     * Constructor 
     */
    constructor() {
        this.setupConfig();
    }

    /**
     * Method to setup the configuration for db connection.
     * @returns {void}
     */
    private setupConfig(): void {
        AppDB.dburl = ConfigUtil.mongoConfig.dbUrl!;
        AppDB.dbOptions.useNewUrlParser = true;
        AppDB.dbOptions.useUnifiedTopology = true;
    }

    /**
     * Method to connect to the db.
     * @returns {Promise<typeof mongoose>}
     */
    public async connect(): Promise<typeof mongoose> {
        try {
            const mongoDB: typeof mongoose = await mongoose.connect(AppDB.dburl, AppDB.dbOptions);
            Logger.info(`Connection to db established successfully.`);
            return mongoDB;
        } catch (err) {
            Logger.error(`Error in connecting to db ${err}`);
            throw err;
        }
    }

}