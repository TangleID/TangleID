import Link from 'next/link'

const ClaimList = (props) => {
	const { claims } = props
	console.log(claims)
	return (
		<div>
			{claims.map(claim => (
				<div key={`claim-${claim}`}>
					<Link href={`/claims/info/?hash_txn=${JSON.stringify(claim)}`} as={`/claims/info/${claim}`}>
						<a>{claim}</a>
					</Link>
				</div>
			))}
		</div>
	)
}

export default ClaimList 
