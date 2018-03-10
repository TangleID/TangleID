import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

const Nav = () => (
	<nav>
		<ListItem button>
			<Link prefetch href="/users/">
				<ListItemText primary="Users" />
			</Link>
		</ListItem>
		<ListItem button>
			<Link prefetch href="/users/new/">
				<ListItemText primary="New User" />
			</Link>
		</ListItem>

	</nav>
)

export default Nav
