/**
 * Router for all products related activites.
 */
import { NextFunction, Request, Response, Router } from 'express';

import ProductsService from './../../services/products';

const router: Router = Router();

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

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(
            await ProductsService.updateProduct(req.body.data)
        )
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.id);
        await ProductsService.deleteProduct(
            {
                name: req.params.id
            }
        );
        res.json();
    } catch (err) {
        next(err);
    }
});

export default router;