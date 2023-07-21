import connectDb from '@/libs/connectDb'
import Company from '@/models/company'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface Params {
	id: string
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
	const { id } = params
	const { newName: name, newWebsite: website } = await req.json()
	await connectDb()
	await Company.findByIdAndUpdate(id, { name, website })
	return NextResponse.json({ message: 'Company updated' }, { status: 200 })
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
	const { id } = params
	await connectDb()
	const company = await Company.findOne({ _id: id })
	return NextResponse.json({ company }, { status: 200 })
}
