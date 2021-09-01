/**
 * Model to store the information about the carts.
 */
import { Schema, model } from 'mongoose';

const CartListSchema: Schema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    count: {
        type: String,
        min: 0
    }
});

const CartsSchema: Schema = new Schema({
    sid: {
        type: String,
        required: true
    },
    cart_list: {
        type: [CartListSchema],
        default: []
    },
    modifiedAt: {
        type: Date,
        required: true
    }
});

/**
 * This is TTL concept to auto delete the entry after 2 hours.
 */
CartsSchema.index({ 'modifiedAt': 1 }, { expireAfterSeconds: 2 * 60 * 60 });

export default model('carts', CartsSchema);