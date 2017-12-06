import withRedux from 'next-redux-wrapper'
import configureStore from '../store/configureStore'
import checkTangleUsers from '../actions/checkTangleUsers'
import fetchOffTangleUserList from '../actions/fetchOffTangleUserList'
import Layout from '../layouts/Main'

const UserPage = (props) => {
	const { user } = props
	return (
		<Layout>
			<h2>{user.claim.firstName}</h2>
		</Layout>
	)
}

UserPage.getInitialProps = async (context) => {
	const { store } = context
	const { id } = context.query
	await store.dispatch(fetchOffTangleUserList())
	await store.dispatch(checkTangleUsers([{ id }]))
	return { id }
}

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps
	const { users } = state
	const { offTangleData, validData } = users
	const validIds = validData.map(v => v.id)
	// TODO: Use selector to get better performance
	const userList = offTangleData.filter(d => validIds.indexOf(d.id) !== -1)
	const user = userList.find(u => u.id === id)
	return { user }
}

export default withRedux(configureStore, mapStateToProps)(UserPage)
