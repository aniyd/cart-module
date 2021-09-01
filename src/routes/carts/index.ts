/**
 * Router for all carts related activities.
 */
import { NextFunction, Request, Response, Router } from 'express';

import CartsService from './../../services/carts';
import HttpException from './../../middleware/error-handling/http-exception';

const router: Router = Router();

/**
 * Route to render the cart page and list out the cart details.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('carts',
        {
            data: await CartsService.getCart(
                {
                    sid: req.sessionID
                }
            )
        }
    );
    } catch (err) {
        next(err);
    }
});

/**
 * Route to update the cart details and return the latest status of the cart.
 */
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(
            await CartsService.updateCart(
                {
                    cart_list: req.body.cart_list,
                    sid: req.sessionID
                }
            )
        );
    } catch (err) {
        next(err);
    }
});

export default router;