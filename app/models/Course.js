import mongoose, { Schema } from 'mongoose'



class CourseSchema extends Schema {
    constructor() {

        const EnglishRequirments = new Schema({
            examType: String,
            overall: { type: Number, default: 0 },
            listening: { type: Number, default: 0 },
            reading: { type: Number, default: 0 },
            writing: { type: Number, default: 0 },
            speaking: { type: Number, default: 0 }
        })
        const Qualification = new Schema({
            qualification: String,
            passingYear: { type: Number, default: 0 },
            percentage: { type: Number, default: 0 },
            maths: { type: Number, default: 0 },
            english: { type: Number, default: 0 },
            stream: { type: Array },
            major: { type: Array },
            backlogs: { type: Number, default: 0 },
            degreeType: { type: String, default: 0 }
        })
        const course = super({
            courseUniversity: { type: Schema.Types.ObjectId, ref: 'University' },
            courseName: String,
            campusName: [{ type: Schema.Types.ObjectId, ref: 'Campus' }],
            courseDuration: String,
            courseLevel: String,
            englishRequirments: [EnglishRequirments],
            qualification: [Qualification],
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





