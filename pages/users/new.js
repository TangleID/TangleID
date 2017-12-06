import withRedux from 'next-redux-wrapper'
import configureStore from '../../store/configureStore'
import fetchKeyPairs from '../../actions/fetchKeyPairs'
import Layout from '../../layouts/Main'

const NewUserPage = (props) => {
	const { keyPairs } = props
	const { sk, skImg, pk, pkImg, } = keyPairs
	return (
		<Layout>
			<h2>New Users</h2>
			<div>
				<div>
					<h2>Secret Key</h2>
					<img width="300" height="300" src={skImg} alt="image of secret key" />
					<p>
						{sk}
					</p>
				</div>

				<div>
					<h2>Public Key</h2>
					<img width="300" height="300" src={pkImg} alt="image of public key" />
					<p>
						{pk}
					</p>
				</div>

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
	const { keyPairs } = state.users
	return {
		keyPairs,
	}
}

export default withRedux(configureStore, mapStateToProps)(NewUserPage)
