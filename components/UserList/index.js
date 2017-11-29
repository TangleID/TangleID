import Link from 'next/link'

const UserList = (props) => {
	const { users } = props
	return (
		<div>
			{users.map(user => (
				<div key={user.id}>
					<Link href={`/user?id=${user.id}`} as={`/users/${user.id}`}>
						<a>{user.id}</a>
					</Link>
				</div>
			))}
		</div>
	)
}

export default UserList
