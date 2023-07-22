'use client'
import React, { useState, useEffect } from 'react'
import RemoveButton from './RemoveButton'
import Link from 'next/link'
import { RiEdit2Line } from 'react-icons/ri'

interface ICompany {
	_id: string
	name: string
	website: string
}

async function getCompanies() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/companies`,
			{
				cache: 'no-store',
			}
		)
		if (!res.ok) {
			throw new Error('failed to fetch companies')
		}
		return res.json()
	} catch (err) {
		console.log(err)
		return { companies: [] }
	}
}

function List() {
	const [companies, setCompanies] = useState<ICompany[]>([])

	useEffect(() => {
		const fetchCompanies = async () => {
			const data = await getCompanies()
			setCompanies(data.companies)
		}
		fetchCompanies()
	}, [])

	return (
		<div className='flex flex-col w-5/6 lg:w-3/4 mt-10 gap-3'>
			{companies.map((company: ICompany, index: number) => (
				<div
					className={`flex w-full text-black p-4 justify-between border-2 border-gray-500 items-start ${
						index % 2 === 0 ? 'bg-neutral-50' : 'bg-slate-300' // Add your alternate background color class here
					}`}
					key={company._id}
				>
					<div className='flex flex-col w-full lg:flex-row lg:justify-between'>
						<div>
							<h1 className='text-xl font-semibold mb-3 lg:mb-0'>
								{company.name}
							</h1>
						</div>
						<div>
							<Link
								className='text-white mt-1 px-2 py-2 bg-green-600 rounded shadow-lg hover:bg-slate-400'
								href={company.website}
							>
								Career Page
							</Link>
							<span className='ps-2 lg:me-10'>Last Visited: </span>
						</div>
					</div>
					<div className='flex gap-2 '>
						<RemoveButton id={company._id} />
						<Link
							title='edit'
							href={`/edit/${company._id}`}
						>
							<RiEdit2Line
								className='text-black'
								size={24}
							/>
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default List
