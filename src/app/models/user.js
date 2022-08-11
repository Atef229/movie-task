/* eslint-disable babel/no-invalid-this */
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { USER_TYPES_GROUPS } from '../configs/constants';
import Utils from '../helpers/utils';

export default (mongoose) => {
    let UserSchema = mongoose.Schema(
        {
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true, set: (value) => Utils.toHash(value) },
            name: { type: String, required: true },
            birthDate: { type: Date, required: false },

            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        },
        {
            timestamps: true,
        },
    );

    /**
   * Add pre save hook into the user schema and update created_at and updated_at fields
   */
    UserSchema.pre('validate', function (next) {
        if (this.isNew && USER_TYPES_GROUPS.Adminstration.includes[this.userType]) {
            this.emailVerified = true;
            this.mobileVerified = true;
        }

        next();
    });

    /**
   * setup methods for generating and verifying user's passwords with `bcrypt` library
   * @type {{generatePassword: function(*=): *, setPassword: setUserPassword, comparePassword: function(*=): *}}
   */
    UserSchema.methods = {
    // Use `bcryptjs` to generate secure passwords
        generatePassword: function setUserPassword(pw) {
            return hashSync(pw, genSaltSync(8));
        },

        setPassword: function setUserPassword(pw) {
            this.password = hashSync(pw, genSaltSync(8));
        },

        comparePassword: function checkUserPassword(pw) {
            return this.password && compareSync(pw, this.password);
        },
    };

    return mongoose.model('User', UserSchema);
};
