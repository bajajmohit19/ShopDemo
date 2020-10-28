import mongoose, { Schema } from 'mongoose'

class CitySchema extends Schema {
    constructor() {
        const city = super({
            cityName: String,
            country: { type: Schema.Types.ObjectId, ref: 'Country' },
            state: { type: Schema.Types.ObjectId, ref: 'State' },
        }, { timestamps: {} })

        return city
    }
}

export default mongoose.model('City', new CitySchema)

