import mongoose, { Schema } from 'mongoose'

class CampusSchema extends Schema {
    constructor() {
        const campus = super({
            campusUniversity: { type: Schema.Types.ObjectId, ref: 'University' },
            campusName: String,
            campusAddress: String,
            campusState: { type: Schema.Types.ObjectId, ref: 'State' },
            campusCity: { type: Schema.Types.ObjectId, ref: 'City' },
            campusCountry: { type: Schema.Types.ObjectId, ref: 'Country'},
            AdmissionPersonName: String,
            AdmissionPersonEmail: String,
            AdmissionPersonMobile: Number,
            additionalRequirments: String,
        }, { timestamps: true })

        return campus
    }

}

export default mongoose.model('Campus', new CampusSchema)





