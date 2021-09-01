/**
 * Validators class for all the users api.
 */
import * as Joi from 'joi';

import { CartsTypes } from './types';
import Validators from '../common/validators';

export default class CartsValidator extends Validators {

    /**
     * method to validate the data for updating the cart.
     * @param {CartsTypes.UpdateCart} data
     * @returns {CartsTypes.UpdateCart}
     */
    public static validateUpdateCart(data: CartsTypes.UpdateCart):
            CartsTypes.UpdateCart {
        const cartListSchema: Joi.ObjectSchema = Joi.object(
            {
                product_name: Joi.string().required(),
                count: Joi.number().required()
            }
        );
        const updateCartSchema: Joi.ObjectSchema = Joi.object(
            {
                sid: Joi.string().required(),
                cart_list: Joi.array().items(cartListSchema).default([])
            }
        );
        return CartsValidator.validateData(updateCartSchema, data);
    }

}