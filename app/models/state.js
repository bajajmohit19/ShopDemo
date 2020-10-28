import mongoose, { Schema, SchemaType } from 'mongoose'

class StateSchema extends Schema {
    constructor() {
        const state = super({
            stateName: String,
            country: {type: Schema.Types.ObjectId, ref: 'Country'},
        },{ timestamps: {} })

        return state
    }
}

export default mongoose.model('State', new StateSchema)





