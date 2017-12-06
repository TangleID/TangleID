import withRedux from 'next-redux-wrapper'
import configureStore from '../../store/configureStore'
import fetchKeyPairs from '../../actions/fetchKeyPairs'
import Layout from '../../layouts/Main'

const NewUserPage = (props) => {
	return (
		<Layout>
			<h2>New Users</h2>
			<div>
				<div>
					<input type="text" name="firstName" placeholder="first name" />
					<input type="text" name="lastName" placeholder="last name" />
					<button> send </button>
				</div>
			</div>
		</Layout>
	)
}

NewUserPage.getInitialProps = async (context) => {
	const { store, isServer } = context
	await store.dispatch(fetchKeyPairs())
	return { isServer }
}

const mapStateToProps = (state) => {
	return state
}

export default withRedux(configureStore, mapStateToProps)(NewUserPage)
