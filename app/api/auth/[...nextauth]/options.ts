import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDb from '@/libs/connectDb'
import UserModel from '@/models/user'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/libs/MongoDb'

export const options: NextAuthOptions = {
	providers: [
		/* GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}) ,*/
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email:',
					type: 'email',
					placeholder: 'Email Address',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: any) {
				//this is where we retrieve user data from a database
				//Docs: https://next-auth.js.org/configuration/providers/credentials
				try {
					const { username, password } = credentials

					// Connect to MongoDB
					await connectDb()

					// Check if the user exists in the database
					const user = await UserModel.findOne({ username })
					if (!user) {
						throw new Error('Invalid credentials')
					}

					// Compare the provided password with the hashed password in the database
					const isValidPassword = await bcrypt.compare(password, user.password)
					if (!isValidPassword) {
						throw new Error('Invalid credentials')
					}

					// If the password is valid, return the user object
					return user
				} catch (err) {
					// If any error occurs, return null
					return null
				}
			},
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
}
