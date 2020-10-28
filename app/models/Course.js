import mongoose, { Schema } from 'mongoose'

class CourseSchema extends Schema {
    constructor() {
        const course = super({
            courseUniversity: { type: Schema.Types.ObjectId, ref: 'University' },
            courseName: String,
            courseDuration: String,
            courseLevel: String,
            englishRequirments: {
                "ExamType": String,
                "Overall": { type: Number, default: 0 },
                "Listening": { type: Number, default: 0 },
                "Reading": { type: Number, default: 0 },
                "Writing": { type: Number, default: 0 },
                "Speaking": { type: Number, default: 0 },
            },
            qualification: {
                "Qualification": String,
                "PassingYear": Number,
                "Percentage": Number,
                "Maths": Number,
                "English": Number,
                "Stream": Array,
                "Major": Array,
                "Backlogs": Number,
                "DegreeType": String
            },
            tuitionFee: Number,
            payable: String,
            additionalRequirments: String,
            intakes: { type: Array },
            paymentTerms: String,
        }, { timestamps: true })

        return course
    }

}

export default mongoose.model('Course', new CourseSchema)





