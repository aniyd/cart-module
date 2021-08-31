/**
 * Router for all carts related activities.
 */
import { NextFunction, Request, Response, Router } from 'express';

import CartsService from './../../services/carts';

const router: Router = Router();

export default router;