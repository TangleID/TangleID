import withRedux from 'next-redux-wrapper'
import configureStore from '../store/configureStore'
import fetchOffTangleUserList from '../actions/fetchOffTangleUserList'
import Layout from '../layouts/Main'

const UsersPage = (props) => {
	return (
		<Layout>
			<h2>Users</h2>
		</Layout>
	)
}

UsersPage.getInitialProps = async (context) => {
	const { isServer, store } = context
	await store.dispatch(fetchOffTangleUserList())
	return { isServer }
}

const mapStateToProps = (state) => {
	const { users } = state
	const { offTangleData } = users
	return { offTangleData }
}

export default withRedux(configureStore, mapStateToProps)(UsersPage)

