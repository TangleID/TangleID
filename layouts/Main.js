import Nav from '../components/Nav'

const MainLayout = (props) => (
	<div>
		<Nav />
		<div>
			{props.children}
		</div>
	</div>
)

export default MainLayout
