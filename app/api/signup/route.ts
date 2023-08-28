import connectDb from '@/libs/connectDb'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json()
		await connectDb()
		await User.create({ email, password })
		return NextResponse.json({ message: 'User Added' }, { status: 201 })
	} catch (err) {
		console.log(err)
	}
}
