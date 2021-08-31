/**
 * Service class for products API.
 */
import HttpException from '../../middleware/error-handling/http-exception';
import logger from '../../utils/logger';
import ProductModels from './../../models/products';
import { ProductsTypes } from './types';
import ProductsValidator from './validators';
 
export default class ProductsService {

    /**
     * Method to fetch the list of products.
     * @returns {Promise<any}
     */
    public static async getproductList$(): Promise<any> {
        try {
            return await ProductModels.find(
                {},
                {
                    _id: 0
                }
            );
        } catch (err) {
            throw new HttpException(500, 'internal error in process in the request');
        }
    }

    /**
     * Method to validate and fetch the list of products.
     * @returns {Promise<any}
     */
    public static getproductList(): Promise<any> {
        return ProductsService.getproductList$();
    }

    /**
     * Method to update the product in database.
     * @param {ProductsTypes.updateProduct} data
     * @returns {Promise<[ProductsTypes.updateProduct]>}
     */
    public static async updateProduct$(data: ProductsTypes.updateProduct):
            Promise<[ProductsTypes.updateProduct]> {
        try {
            await ProductModels.updateOne(
                {
                    name: data.name,
                },
                {
                    price: data.price,
                    discount: data.discount,
                    createdAt: new Date()
                },
                {
                    upsert: true
                }
            );
            return ProductModels.find(
                {},
                {
                    _id: 0
                }
            )
        } catch (err) {
            logger.error(`Error in updating the product list ${err}.`);
            throw new HttpException(500, 'Error in updating the product list.');
        }
    }

    /**
     * Method to validate and update the product in database.
     * @param {ProductsTypes.UpdateProduct} data
     * @returns {Promise<[ProductsTypes.UpdateProduct]>}
     */
    public static updateProduct(data: ProductsTypes.updateProduct):
            Promise<[ProductsTypes.updateProduct]> {
        let validatedData: ProductsTypes.updateProduct;
        try {
            validatedData = ProductsValidator.validateUpdateproduct(data);
        } catch (err) {
            logger.error(`Invalid data to update the product list ${err}`);
            throw new HttpException(400, 'Invalid data to update the product list.');
        }
        return ProductsService.updateProduct$(validatedData);
    }

    /**
     * Method to delete the product from the database.
     * @param {ProductsTypes.DeleteProduct} data
     * @returns {Promise<void>}
     */
     public static async deleteProduct$(data: ProductsTypes.DeleteProduct): Promise<void> {
        try {
            await ProductModels.deleteOne(
                {
                    name: data.name
                }
            );
        } catch (err) {
            logger.error('Error in removing the product');
            throw new HttpException(500, 'Error in removing the product');
        }
    }
    
    /**
     * Method to validate and delete the product from the database.
     * @param {ProductsTypes.DeleteProduct} data
     * @returns {Promise<void>}
     */
    public static async deleteProduct(data: ProductsTypes.DeleteProduct): Promise<void> {
        let validatedData: ProductsTypes.DeleteProduct;
        try {
            validatedData = ProductsValidator.validateDeleteProduct(data);
        } catch (err) {
            logger.error(`Invalid data to remove the product ${err}`);
            throw new HttpException(400, 'Invalid data to remove the product.');
        }
        await ProductsService.deleteProduct$(validatedData);
    }
 
}