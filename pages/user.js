import Layout from '../layouts/Main'

const UserPage = (props) => {
	console.log('props: ', props)
	return (
		<Layout>
			<h2>User</h2>
		</Layout>
	)
}

UserPage.getInitialProps = async (context) => {
	return {}
}

export default UserPage
