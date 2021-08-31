/**
 * Model to store the information about the carts.
 */
import { Schema, model } from 'mongoose';

const cartListSchema: Schema = new Schema({
    product_name: {
        type: String,
        required: true,
        unique: true
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
        type: [cartListSchema],
        default: []
    },
    cart_value: {
        type: Number,
        default: 0
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