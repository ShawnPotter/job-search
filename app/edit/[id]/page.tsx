'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ICompany {
	name: string
	website: string
}

function Edit() {
	const defaultCompany: ICompany = {
		name: '',
		website: '',
	}

	const [company, setCompany] = useState<ICompany>(defaultCompany)
	const [loading, setLoading] = useState(true)

	const pathname = usePathname()
	const pathnameParts = pathname.split('/')
	const id = pathnameParts[2]

	async function getCompany() {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/companies/${id}`,
				{
					cache: 'no-store',
				}
			)
			if (!res.ok) {
				throw new Error('failed to fetch company')
			}

			const data = await res.json()
			setCompany(data.company)
		} catch (err) {
			console.log(err)
			throw new Error('run away function')
		}
	}

	useEffect(() => {
		const fetchCompany = async () => {
			await getCompany()
			setLoading(false) // Set loading to false after fetching data
		}
		fetchCompany()
	}, []) // Add an empty dependency array to run only on mount

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (!company.name || !company.website) {
			alert('Both fields are required')
			return
		}
		try {
			const newName = company.name
			const newWebsite = company.website
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/companies/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({ newName, newWebsite }),
				}
			)
			if (!res.ok) {
				alert('An error occurred while updating the company') // Generic error message
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex w-full mt-10 justify-center'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<form
					className='flex flex-col w-full md:w-3/4 justify-center items-center mx-10 '
					onSubmit={handleSubmit}
				>
					<div className='w-full'>
						<label>
							Company{' '}
							<input
								type='text'
								className='w-full p-1 rounded shadow-inner text-black'
								value={company.name}
								onChange={(e) =>
									setCompany({ ...company, name: e.target.value })
								}
							/>
						</label>
					</div>
					<div className='w-full mt-5'>
						<label>
							Website{' '}
							<input
								type='text'
								className='w-full p-1 rounded shadow-inner text-black'
								value={company.website}
								onChange={(e) =>
									setCompany({ ...company, website: e.target.value })
								}
							/>
						</label>
					</div>
					<div className='mt-5 w-full flex justify-center'>
						<input
							type='submit'
							value='Update'
							className='flex justify-center bg-yellow-600 py-4 w-full rounded-lg shadow align-center'
						/>
					</div>
				</form>
			)}
		</div>
	)
}

export default Edit
