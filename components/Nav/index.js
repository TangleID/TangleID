import Link from 'next/link'

const Nav = () => (
	<nav>
		<Link prefetch href="/users/">Users</Link>
		<Link prefetch href="/users/new/">New user</Link>
	</nav>
)

export default Nav
