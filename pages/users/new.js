import { bindActionCreators } from 'redux'
import uuidV4 from 'uuid/v4'
import withRedux from 'next-redux-wrapper'
import configureStore from '../../store/configureStore'
import fetchKeyPairs from '../../actions/fetchKeyPairs'
import createNewIdentity from '../../actions/createNewIdentity'
import Layout from '../../layouts/Main'
import NewIdentityForm from '../../components/NewIdentityForm'


const NewUserPage = (props) => {
	const { keyPairs, isLoading, createNewIdentity } = props
	const { sk, skImg, pk, pkImg, } = keyPairs
	const uuid = (uuidV4()).replace(/-/g, '')
	return (
		<Layout>

			<h2>New Users</h2>

			{isLoading && <p>loading ...</p>}
			<p>
				uuid: {uuid}
			</p>
			<NewIdentityForm handleSubmit={(values) => {
				const params = Object.assign({ sk, pk, uuid }, values)
				localStorage.setItem('latestId', JSON.stringify(params))
				createNewIdentity(params)
			}}/>
			<div style={{display: 'flex'}}>
				<div style={{flex: '1'}}>
					<h2>Secret Key</h2>
					<img width="300" height="300" src={skImg} alt="image of secret key" />
					<p>
						{sk}
					</p>
				</div>
				<div style={{flex: '1'}}>
					<h2>Public Key</h2>
					<img width="300" height="300" src={pkImg} alt="image of public key" />
					<p>
						{pk}
					</p>
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

const mapDispatchToProps = (dispatch) => {
	return {
		createNewIdentity: bindActionCreators(createNewIdentity, dispatch)
	}
}

const mapStateToProps = (state) => {
	const { keyPairs, isLoading } = state.users
	return {
		isLoading,
		keyPairs,
	}
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(NewUserPage)
