'use client'

import React from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'

interface RemoveButtonProps {
	id: string
}

function RemoveButton({ id }: RemoveButtonProps) {
	const handleHardRefresh = () => {
		const url = new URL(window.location.href)
		url.searchParams.set('refresh', 'true')
		window.location.href = url.toString()
	}

	const deleteCompany = async () => {
		const confirmed = confirm('Delete Company?')
		if (confirmed) {
			await fetch(`${process.env.API_URL}/api/companies?id=${id}`, {
				method: 'DELETE',
			})
			handleHardRefresh()
		}
	}

	return (
		<button
			onClick={deleteCompany}
			title='delete'
			className='text-red-600'
		>
			<RiDeleteBin6Fill size={24} />
		</button>
	)
}

export default RemoveButton
