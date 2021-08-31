/**
 * Type deifinition for products API. 
 */

export declare namespace ProductsTypes {

    interface CountBasedDiscount {
        noOfItemsInGrp: number;
        price: number;
    }

    interface PercentageBasedDiscount  {
        discount_percentage: number;
    }

    interface Discount {
        applicable: boolean;
        approach : 'COUNT-BASED' | 'PERCENTAGE-BASED';
        count_based: CountBasedDiscount;
        percentage_based: PercentageBasedDiscount
    }

    interface updateProduct {
        name: string;
        price: number;
        discount: Discount;
    }

    interface DeleteProduct {
        name: string;
    }

}