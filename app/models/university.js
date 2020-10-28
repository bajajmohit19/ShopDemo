import mongoose, { Schema } from 'mongoose'
import { stringify } from 'yamljs'

class UniversitySchema extends Schema {
    constructor() {
        const university = super({
            universityCountry: {type: Schema.Types.ObjectId, ref: 'Country'},
            universityState: {type: Schema.Types.ObjectId, ref: 'State'},
            universityCity: {type: Schema.Types.ObjectId, ref: 'City'},
            universityName: String,
            universityWebsite: String,
            universityType: String,
            universityPartnership: String,
            elicos: String,
            contactAddress: String,
            applicationFee: {type: Number} ,
            contactName: String,
            contactPhone: String,
            contactEmail: String,
            enrollmentDocuments: String,
            enrollmentProcedure: String,
            enrollmentAdmissionOfficer: String,
            enrollmentConfirmation: String,
            agreementSigningDate: {type: Date},
            enrollmentExpiry: {type: Date},
            enrollmentRenewal: {type: Date},
            commission: {type:Number},
            paymentTerms: String,
            mediaFiles: String,
        },{ timestamps: {} })

        return university
    }

}

export default mongoose.model('University', new UniversitySchema)





