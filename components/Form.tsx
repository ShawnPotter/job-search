'use client'

import React, { useState } from 'react'

function Form() {
	const [name, setName] = useState('')
	const [website, setWebsite] = useState('')

	const handleHardRefresh = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('refresh', 'true')
		window.location.href = url.toString()
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (!name || !website) {
			alert('Both fields are required')
			return
		}
		try {
			await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/companies`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ name, website }),
			})
			handleHardRefresh()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex w-full mt-10 justify-center'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-full md:w-3/4 justify-center items-center mx-10 '
			>
				<div className='w-full'>
					<label>
						Company{' '}
						<input
							onChange={(e) => setName(e.target.value)}
							value={name}
							type='text'
							className='w-full p-1 rounded shadow-inner text-black'
							placeholder='Company Name'
						/>
					</label>
				</div>
				<div className='w-full mt-5'>
					<label>
						Website{' '}
						<input
							onChange={(e) => setWebsite(e.target.value)}
							value={website}
							type='text'
							className='w-full p-1 rounded shadow-inner text-black'
							placeholder='Career Website'
						/>
					</label>
				</div>
				<div className='mt-5 w-full flex justify-center'>
					<input
						type='submit'
						className='flex justify-center bg-blue-600 hover:bg-blue-400  py-4 w-full rounded-lg shadow align-center'
					/>
				</div>
			</form>
		</div>
	)
}

export default Form
