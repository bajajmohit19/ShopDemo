import mongoose, { Schema } from 'mongoose'

class BranchSchema extends Schema {
    constructor() {
        const branch = super({
            branchName: { type: String, unique: true },
            branchAddress: String,
            branchCountry: {type: Schema.Types.ObjectId, ref:'Country'},
            branchState:{type: Schema.Types.ObjectId, ref:'State'},
            branchCity: {type: Schema.Types.ObjectId, ref:'City'},
            branchHeadName: String,
            branchHeadPhone: String,
            branchHeadEmail: {type: String, unique: true},
            commission: Number,
            paymentTerms: String,
        }, {timestamps: true})

        return branch
    }

}

export default mongoose.model('Branch', new BranchSchema)





