'use client'
import React, { useState } from 'react'

function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [error, setError] = useState('')
	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (password !== confirmPass) {
			setError('Passwords do not match')
			return
		}

		// Send the data to your Next.js API route
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/signup`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}
		)

		if (response.status === 201) {
			// User created successfully

			// Clear the state by resetting the state variables
			setEmail('')
			setPassword('')
			setConfirmPass('')
			setError('')

			console.log('User created successfully')
		} else {
			// Handle errors
			setError('Error creating user')
		}
	}

	return (
		<div className='flex w-screen h-screen justify-center items-center'>
			<div className='p-5 bg-neutral-800 rounded-lg shadow-md shadow-black border-[3px] border-neutral-800'>
				<h1 className=' text-xl font-semibold'>Sign Up</h1>
				<form onSubmit={handleSubmit}>
					{error && <div className='error'>{error}</div>}
					<div className='p-3'>
						<div>
							<label>Email Address:</label>
						</div>
						<div>
							<input
								className='rounded border-2 border-slate-100 bg-neutral-500 w-full'
								title='exmaple@email.com'
								type='text'
								onChange={(e) => setEmail(e.target.value)}
								required
							></input>
						</div>
					</div>
					<div className='p-3'>
						<div>
							<label>Password:</label>
						</div>
						<div>
							<input
								className='rounded border-2 border-slate-100 bg-neutral-500 w-full'
								title='Password'
								name='pass'
								type='password'
								onChange={(e) => setPassword(e.target.value)}
								required
							></input>
						</div>
					</div>
					<div className='p-3'>
						<div>
							<label>Confirm Password:</label>
						</div>
						<div>
							<input
								className='rounded border-2 border-slate-100 bg-neutral-500 w-full'
								title='Confirm Password'
								name='confirmPass'
								type='password'
								onChange={(e) => setConfirmPass(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className='flex justify-center py-5'>
						<button
							type='submit'
							className=' bg-green-600 px-4 py-2 rounded-lg shadow-md shadow-black border-2 border-green-900'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp
