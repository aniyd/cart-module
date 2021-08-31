/**
 * Class to define the error handling.
 */
import { NextFunction, Request, Response } from 'express';

import HttpException from './http-exception';

export default class AppError {

    /**
     * Method to send the response in case of error encounters.
     * @param {HttpException} err
     * @param {Response} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    genericError(err: HttpException, req: Request, res: Response, next: NextFunction) {
        res.status(err.status | 500).send(
            {
                status: err.status | 500,
                message: err.message
            }
        );
    }

}