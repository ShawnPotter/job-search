'use client'
import React, { useState, useEffect } from 'react'
import RemoveButton from './RemoveButton'
import Link from 'next/link'
import { RiEdit2Line } from 'react-icons/ri'

interface ICompany {
	_id: string
	name: string
	website: string
	lastVisited: Date
}

const handleClick = async (_id: string, website: string) => {
	await updateTime(_id)
	window.open(website)
}

async function updateTime(_id: string) {
	const newLastVisited = new Date()
	console.log(newLastVisited)
	try {
		await fetch(
			`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/companies/visited/${_id}`,
			{
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ newLastVisited }),
			}
		)
	} catch (err) {
		console.log(err)
	}
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

	function dateFormat(lastVisited: Date): React.ReactNode {
		const date = new Date(lastVisited)
		if (!lastVisited) {
			return 'Not Visited'
		}
		const month = date.getMonth() + 1
		const day = date.getDate()
		const year = date.getFullYear()
		return `${month}/${day}/${year}`
	}

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
							<button
								className='text-white mt-1 px-2 py-2 bg-green-600 rounded shadow-lg hover:bg-slate-400'
								onClick={(e: any) => handleClick(company._id, company.website)}
								onAuxClick={(e: any) =>
									handleClick(company._id, company.website)
								}
							>
								Career Page
							</button>
							<span className='ps-2 lg:me-10'>
								Last Visited: {dateFormat(company.lastVisited)}{' '}
							</span>
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
