/**
 * Main roouter which pass the call to specific routers.
 */
import { NextFunction, Request, Response, Router } from 'express';

import HttpException from './../middleware/error-handling/http-exception';
import cartsRoute from './carts';
import productsRoute from './products';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.redirect('/cart');
});
router.get('/check-server', (req: Request, res: Response) => {
    res.status(200).send('App is alive..');
});

router.use('/products', productsRoute);
router.use('/carts', cartsRoute);

router.use((req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(404, `NOT FOUND`));
});

export default router;
