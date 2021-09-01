/**
 * Router for all products related activites.
 */
import { NextFunction, Request, Response, Router } from 'express';

import ProductsService from './../../services/products';

const router: Router = Router();

/**
 * Route to get the list of existing products.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render(
            'products',
            {
                data: await ProductsService.getproductList()
            }
        );
    } catch (err) {
        next(err);
    }
});

/**
 * Route to update the product list and return the updated list.
 */
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(
            await ProductsService.updateProduct(req.body.data)
        )
    } catch (err) {
        next(err);
    }
});

/**
 * Route to delete the product based on product name.
 */
router.delete('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.id);
        await ProductsService.deleteProduct(
            {
                name: req.params.name
            }
        );
        res.json();
    } catch (err) {
        next(err);
    }
});

export default router;