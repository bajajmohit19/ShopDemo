import mongoose, { Schema } from 'mongoose'

class CountrySchema extends Schema {
    constructor() {
        const country = super({
            countryName: { type: String, unique: true },
            enrollmentBasic: String,
            enrollmentProcedure: String,
            fundAcceptable: String,
            fundSponsors: String,
            fundEducation: String,
            fundVisaCheckList: String,
            visaCategory: String,
            interview: { type: String, enum: ['Yes', 'No', 'Maybe'] },
            visaFillingBy: String,
            tutionFee: {type: Number},
            singleOHSC: String,
            dualOHSC: String,
            visaFeeMainApplicant: {type: Number},
            visaFeeSpouse: {type: Number},
            visaFeeChild: {type: Number},
            livingCostMainApplicant: String,
            livingCostSpouse: String,
        },{ timestamps: {} })

        return country
    }

}

export default mongoose.model('Country', new CountrySchema)





