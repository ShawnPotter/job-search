import connectDb from '@/libs/connectDb'
import Company from '@/models/company'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface Params {
	id: string
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
	console.log('PUT for updating time reached.')
	try {
		console.log('initiating Try')
		const { id } = params
		const { newLastVisited: lastVisited } = await req.json()
		await connectDb()
		const updatedCompany = await Company.findByIdAndUpdate(id, { lastVisited })
		if (!updatedCompany) {
			return NextResponse.json({ error: 'Company not found' }, { status: 404 })
		}
		return NextResponse.json(
			{ message: 'Page visited. Company document updated' },
			{ status: 200 }
		)
	} catch (err) {
		console.log(err)
		return NextResponse.json(
			{ error: 'An error occurred while updating the document' },
			{ status: 500 }
		)
	}
}
