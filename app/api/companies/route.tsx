import connectDb from '@/libs/connectDb'
import Company from '@/models/company'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
	runtime: 'edge', // this is a pre-requisite
	regions: ['pdx1'], // only execute this function on pdx1
}

export async function GET() {
	await connectDb()
	const companies = await Company.find()
	return NextResponse.json({ companies })
}

export async function POST(req: NextRequest, res: NextResponse) {
	const { name, website } = await req.json()
	await connectDb()
	await Company.create({ name, website })
	return NextResponse.json({ message: 'Company Added' }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id')
	await connectDb()
	await Company.findByIdAndDelete(id)
	return NextResponse.json({ message: 'Company deleted' }, { status: 200 })
}
