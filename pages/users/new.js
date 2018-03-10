import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import configureStore from '../../store/configureStore'
import fetchKeyPairs from '../../actions/fetchKeyPairs'
import createNewIdentity from '../../actions/createIdentity'
//import Layout from '../../layouts/Main'
import Layout from '../../layouts/material/Main'
import NewUserForm from '../../components/NewUserForm'
import LoginDialog from '../../components/LoginDialog'
import Grid from 'material-ui/Grid'

const gen_uuid = () => {                                                                           
    const validChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9"
    var ret = ""
    for (var i = 0; i < 26; ++i) 
        ret = ret.concat(validChar[Math.floor(Math.random() * 27)])
    return ret 
}

const NewUserPage = (props) => {
	const { keyPairs, isLoading, isRegister, createNewIdentity } = props
	const { sk, skImg, pk, pkImg, } = keyPairs
	const uuid = gen_uuid() 
	const handleSubmit = (values) => {
		const params = Object.assign({ sk, pk, uuid }, values)
		localStorage.setItem('latestId', JSON.stringify(params))
		createNewIdentity(params)
    }
	return (
		<Layout>
            { isRegister
                ? <LoginDialog open="true" />
                : <div style={{display: 'flex', justifyContent: 'center'}}>
                      <NewUserForm 
                          keyPairs={keyPairs}
                          uuid={uuid}   
                          handleSubmit={handleSubmit} />
                   </div>	
             }
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
	const { keyPairs, isLoading, isRegister } = state.users
	return {
		isLoading,
		keyPairs,
        isRegister,
	}
}


export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(NewUserPage)
