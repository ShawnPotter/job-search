import mongoose from 'mongoose'

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!)
		console.log('Connected to MongoDB Atlas')
	} catch (err) {
		console.log(err)
	}
}

export default connectDb
