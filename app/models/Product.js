import mongoose, { Schema } from 'mongoose'

class ProductSchema extends Schema {
    constructor() {
        const city = super({
            productName: String,
            description: String,
            price: Number,
            quantity: Number,
            image: {
                name: String,
                tag: String,
                filename: String,
                mimetype: String,
                size: Number,
                contentType: String,
                fieldname: String,
                key: String,
                location: String,
                metadata: { fieldName: String },
                originalname: String,
            }
        }, { timestamps: {} })

        return city
    }
}

export default mongoose.model('Product', new ProductSchema)

