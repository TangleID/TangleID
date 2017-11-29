import Link from 'next/link'

const Nav = () => (
	<nav>
		<span style={{padding: '5px'}}>
			<Link prefetch href="/users/">
				<a>Users</a>
			</Link>
		</span>
		<span style={{padding: '5px'}}>
			<Link prefetch href="/users/new/"><a>New User</a></Link>
		</span>
	</nav>
)

export default Nav
