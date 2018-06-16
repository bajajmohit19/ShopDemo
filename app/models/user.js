import mongoose, {Schema} from 'mongoose'
import bcrypt  from 'bcrypt-nodejs';

class UserSchema extends Schema {
    constructor() {

        const user = super({
            local: {
                email: String,
                password: String
            }
        });

        user.methods.generateHash = this.generateHash;
        user.methods.validPassword = this.validPassword;

        return user
    }

    generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

    validPassword(password) {
        return bcrypt.compareSync(password, this.local.password)
    }

}

export default mongoose.model('User', new UserSchema)
