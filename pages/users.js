import withRedux from 'next-redux-wrapper'
import configureStore from '../store/configureStore'
//import fetchOffTangleUserList from '../actions/fetchOffTangleUserList'
import checkTangleUsers from '../actions/checkTangleUsers'
import fetchUserList from '../actions/fetchUserList'
//import Layout from '../layouts/Main'
import Layout from '../layouts/material/Main'
import UserList from '../components/UserList'

const UsersPage = (props) => {
	const { userList } = props
	return (
		<Layout>
			<UserList users={userList}></UserList>
		</Layout>
	)
}

UsersPage.getInitialProps = async (context) => {
	const { isServer, store } = context
	// await store.dispatch(fetchOffTangleUserList())
	await store.dispatch(fetchUserList())
	// TODO: Refactor offTangleData to list
	const { localList } = (store.getState()).users
	// await store.dispatch(checkTangleUsers(offTangleData.slice(0, 2)))
	await store.dispatch(checkTangleUsers(localList))
	return { isServer }
}

const mapStateToProps = (state) => {
	const { users } = state
	const { localList, validData } = users
	const validIds = validData.map(v => v.id)
	// TODO: Use selector to get better performance
	// const userList = offTangleData.filter(d => validIds.indexOf(d.id) !== -1)
	const userList = localList.filter(d => validIds.indexOf(d.id) !== -1)
	return { userList }
}

export default withRedux(configureStore, mapStateToProps)(UsersPage)

