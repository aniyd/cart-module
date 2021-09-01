/**
 * Type deifinition for carts API. 
 */

import { string } from "joi"

export declare namespace CartsTypes {

    interface GetCart {
        sid: string;
    }

    interface CartList {
        product_name: string;
        count: number;
    }

    interface UpdateCart {
        sid: string;
        cart_list: CartList;
    }

}