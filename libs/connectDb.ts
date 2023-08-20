import mongoose from 'mongoose'

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI!, { connectTimeoutMS: 5000 })
		console.log('Connected to MongoDB Atlas')
	} catch (err) {
		console.log(err)
	}
}

export default connectDb
