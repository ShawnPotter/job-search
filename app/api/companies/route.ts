import connectDb from '@/libs/connectDb'
import Company from '@/models/company'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const preferredRegion = 'pdx1'

export async function GET() {
	try {
		await connectDb()
		const companies = await Company.find()
		return NextResponse.json({ companies })
	} catch (err) {
		console.log(err)
	}
}

export async function POST(req: NextRequest) {
	try {
		const { name, website } = await req.json()
		await connectDb()
		await Company.create({ name, website })
		return NextResponse.json({ message: 'Company Added' }, { status: 201 })
	} catch (err) {
		console.log(err)
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get('id')
		await connectDb()
		await Company.findByIdAndDelete(id)
		return NextResponse.json({ message: 'Company deleted' }, { status: 200 })
	} catch (err) {
		console.log(err)
	}
}
