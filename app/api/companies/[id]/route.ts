import connectDb from '@/libs/connectDb'
import Company from '@/models/company'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface Params {
	id: string
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
	try {
		const { id: _id } = params
		const { newName: name, newWebsite: website } = await req.json()
		await connectDb()
		const res = await Company.findByIdAndUpdate(_id, { name, website })
		if (!res || res.nModified === 0) {
			// Handle the case where the company is not found or not updated
			return NextResponse.json(
				{ error: 'Company not found or not updated' },
				{ status: 404 }
			)
		} else {
			console.log('Company Updated')
			return NextResponse.json({ message: 'Company updated' }, { status: 200 })
		}
	} catch (err) {
		console.log(err)
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
	try {
		const { id } = params
		await connectDb()
		const company = await Company.findOne({ _id: id })
		return NextResponse.json({ company }, { status: 200 })
	} catch (err) {
		console.log(err)
	}
}
