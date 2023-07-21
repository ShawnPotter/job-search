import React from 'react'

function Edit() {
	return (
		<div className='flex w-full mt-10 justify-center'>
			<form className='flex flex-col w-full md:w-3/4 justify-center items-center mx-10 '>
				<div className='w-full'>
					<label>
						Company{' '}
						<input
							type='text'
							className='w-full p-1 rounded shadow-inner'
						/>
					</label>
				</div>
				<div className='w-full mt-5'>
					<label>
						Website{' '}
						<input
							type='text'
							className='w-full p-1 rounded shadow-inner'
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
		</div>
	)
}

export default Edit
