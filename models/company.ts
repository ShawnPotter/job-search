//TODO: Create "last visited" tracker

import mongoose, { Schema } from 'mongoose'

interface ICompany {
	name: string
	website: string
}

const companySchema = new Schema<ICompany>({
	name: { type: String, required: true },
	website: { type: String, required: true },
})

const Company =
	mongoose.models.Company || mongoose.model('Company', companySchema)

export default Company
