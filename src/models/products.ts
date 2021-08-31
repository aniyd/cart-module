/**
 * Model to store the information about the products.
 */
import { Schema, model } from 'mongoose';

const CountBasedDiscountSchema: Schema = new Schema({
    noOfItemsInGrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const PercentageBasedDiscountSchema: Schema = new Schema({
    discount_percentage: {
        type: Number,
        required: true
    }
});

const DiscountSchema: Schema = new Schema({
    applicable: {
        type: Boolean,
        default: false
    },
    approach: {
        type: String,
        enum: ['COUNT-BASED', 'PERCENTAGE-BASED']
    },
    count_based: CountBasedDiscountSchema,
    percentage_based: PercentageBasedDiscountSchema
});

const ProductsSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    discount: DiscountSchema,
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default model('products', ProductsSchema);