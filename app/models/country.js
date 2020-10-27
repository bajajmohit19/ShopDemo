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
            tutionFee: String,
            sigleOHSC: String,
            dualOHSC: String,
            visaFeeMainApplicant: String,
            visaFeeSpouse: String,
            visaFeeChild1: String,
            livingCostMainApplicant: String,
            livingCostSpouse: String,
        })

        return country
    }

}

export default mongoose.model('Country', new CountrySchema)





