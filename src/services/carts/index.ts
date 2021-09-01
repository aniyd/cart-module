/**
 * Service class for carts API.
 */
 import CartsModel from './../../models/carts';
import { CartsTypes } from './types';
import cartsValidator from './validators';
import HttpException from '../../middleware/error-handling/http-exception';
import logger from '../../utils/logger';
import productsModel from './../../models/products';

export default class CartsService {

    /**
     * Method to fetch the current status of the cart based on session id.
     * @param {string} sid
     * @returns {Promise<any>}
     */
    public static async fetchCart(sid: string): Promise<any> {
        try {
            const carts: any = await CartsModel.findOne(
                {
                    sid: sid
                }
            ).lean();
            const products: any = await productsModel.find({});
            const cart_data: any = {};
            products.forEach((product: any) => {
                cart_data[product.name] = {
                    name: product.name,        
                    discount: product.discount,
                    price: product.price,
                    count: 0
                };
            });
            carts?.cart_list.forEach((cartItem: any) => {
                cart_data[cartItem.product_name].count = cartItem.count
            });
            return cart_data;
        } catch (err) {
            logger.error(`Error in fetching the cart ${err}`);
            throw new HttpException(500, 'Error in fetching the cart.');
        }
    }

    /**
     * Method to load the cart for the session if exist.
     * @param {CartsTypes.GetCart} data
     * @returns {Promise<any>}
     */
    public static getCart$(data: CartsTypes.GetCart): Promise<any> {
        try {
            return CartsService.fetchCart(data.sid);
        } catch (err) {
            logger.error(`Error in getting the status of the cart ${err}`);
            throw new HttpException(500, 'Error in getting the status of the cart.');
        }
    }
    
    /**
     * Method to validate and load the cart for the session if exist.
     * @param {CartsTypes.GetCart} data
     * @returns {Promise<any>}
     */
    public static getCart(data: CartsTypes.GetCart): Promise<any> {
        return CartsService.getCart$(data);
    }

    /**
     * Method to update the cart.
     * @param {CartsTypes.UpdateCart} data
     * @returns {Promise<any>}
     */
    public static async updateCart$(data: CartsTypes.UpdateCart): Promise<any> {
        try {
            await CartsModel.updateOne(
                {
                    sid: data.sid
                },
                {
                    cart_list: data.cart_list,
                    modifiedAt: new Date()
                },
                {
                    upsert: true
                }
            );
            return CartsService.fetchCart(data.sid);
        } catch (err) {
            logger.error(`Error in updating the cart ${err}`);
            throw new HttpException(400, 'IError in updating the cart.');
        }
    }

    /**
     * Method to validate and update the cart.
     * @param {CartsTypes.UpdateCart} data
     * @returns {Promise<any>}
     */
    public static updateCart(data: CartsTypes.UpdateCart): Promise<any> {
        let validatedData: CartsTypes.UpdateCart;
        try {
            validatedData = cartsValidator.validateUpdateCart(data);
        } catch (err) {
            logger.error(`Invalid data to update the cart ${err}`);
            throw new HttpException(400, 'Invalid data to update the cart.');
        }
        return CartsService.updateCart$(validatedData);
    }

}