/**
 * Validators class for all the users api.
 */
import * as Joi from 'joi';

import { ProductsTypes } from './types';
import Validators from '../common/validators';

export default class ProductsValidator extends Validators {

    /**
     * Method to validate the data for updating the product.
     * @param {ProductsTypes.updateProduct} data
     * @returns {ProductsTypes.updateProduct} 
     */
    public static validateUpdateproduct(data: ProductsTypes.updateProduct):
            ProductsTypes.updateProduct {
        const countBasedDiscountSchema: Joi.ObjectSchema = Joi.object(
            {
                noOfItemsInGrp: Joi.number().required(),
                price: Joi.number().required()
            }
        );
        const percentageBasedDiscountSchema: Joi.ObjectSchema = Joi.object(
            {
                discount_percentage: Joi.number().required()
            }
        );
        const discountSchema: Joi.ObjectSchema = Joi.object(
            {
                applicable: Joi.boolean().required(),
                approach: Joi.string().valid('COUNT-BASED', 'PERCENTAGE-BASED'),
                count_based: countBasedDiscountSchema,
                percentage_based: percentageBasedDiscountSchema
            }
        );
        const updateProductSchema: Joi.ObjectSchema = Joi.object(
            {
                name: Joi.string().required(),
                price: Joi.number().required(),
                discount: discountSchema.required()
            }
        );
        return ProductsValidator.validateData(updateProductSchema, data);
    }

    public static validateDeleteProduct(data: ProductsTypes.DeleteProduct):
            ProductsTypes.DeleteProduct {
        const deleteProductSchema: Joi.ObjectSchema = Joi.object(
            {
                name: Joi.string().required()
            }
        );
        return ProductsValidator.validateData(deleteProductSchema, data);
    }

}