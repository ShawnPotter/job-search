import mongoose, { Document, Schema } from 'mongoose'
import isEmail from 'validator/es/lib/isEmail'
import bcrypt from 'bcryptjs'

const SALT_WORK_FACTOR = 10

export interface IUser extends Document {
	email: string
	password: string
}

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [isEmail, 'Invalid Email'],
	},
	password: { type: String, required: true, select: true },
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()
	try {
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
		this.password = await bcrypt.hash(this.password, salt)
		return next()
	} catch (err: any) {
		return next(err)
	}
})

userSchema.methods.validatePassword = async function validatePassword(
	data: string
) {
	return bcrypt.compare(data, this.password)
}

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
