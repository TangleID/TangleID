import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/configureStore'
import checkTangleUsers from '../actions/checkTangleUsers'
//import fetchOffTangleUserList from '../actions/fetchOffTangleUserList'
import fetchUserList from '../actions/fetchUserList'
import fetchClaims from '../actions/fetchClaims'
import fetchMamMessages from '../actions/fetchMamMessages'
import createClaim from '../actions/createClaim'
import createMamMessage from '../actions/createMamMessage'
import transformToQRCode from '../utils/transformToQRCode'
//import Layout from '../layouts/Main'
import Layout from '../layouts/material/Main'
import Button from 'material-ui/Button'
import SimpleForm from '../components/SimpleForm'
import ClaimList from '../components/ClaimList'
import Link from 'next/link'

const UserPage = (props) => {
  const { claims, messages, user, otherUser, createClaim, createMamMessage } = props
  const { pk, sk, id, claim, qrcode, } = user
  const handleSubmit = (values) => {
    const params = Object.assign({
      uuid: id,
      partA: '',
      partB: '',
      expDate: '',
      claimPic: '',
    }, values)
    createClaim(params)
  }
  const handleMamSubmit = (values) => {
    const params = {
      sender: localStorage.getItem('act_as_id'),
      receiver: id,
      msg: values.msg
    }
    createMamMessage(params)
  }
  const handleSetUser = (values) => {
    localStorage.setItem('act_as_id', id)
  }
	return (
		<Layout>
			<h2>{claim.firstName}</h2>
			<img src={qrcode} alt="QRCode of id and public key"/>
			<div>
				<p>id: {id}</p>
				<p>public key: {pk}</p>
			</div>
			<div>
				<p>private key: {sk}</p>
			</div>
			<div>
				<h3>Claims about this user</h3>
				{claims.length === 0 && (
					<p>No Claims</p>
				)}
				{claims.length !== 0 && (
					<ClaimList claims={claims}></ClaimList>
				)}
			</div>
			<div>
				<h3>Mam Messages</h3>
				{Object.keys(messages).length === 0 && (
					<p>No Messages</p>
				)}
				{messages.length !== 0 && (
                                  Object.keys(messages).map( (key, i) => (
                                    <div key={'div-test-'+i}>
                                    <ul key={'ul1-'+i}>
                                      <li key={'li1-'+i}> {key} </li>
                                      <ul key={'ul2-'+i}>
                                    {messages[key].map((data, j) => (
                                      <li key={'li3-'+i+j}>{data.msg} {data.fromSelf? '- You' : ''}</li>
                                    ))}
                                      </ul>
                                    </ul>
                                    </div>
				)))}
			</div>
			<SimpleForm
				name="signClaim"
				handleSubmit={handleSubmit}
				meta={{
					inputs: [{
						name: 'msg',
						label: 'message',
					}],
					submit: {
						text: 'Sign & Attach'
					}
				}}
			/>
			<SimpleForm
				name="sendMessage"
				handleSubmit={handleMamSubmit}
				meta={{
					inputs: [{
						name: 'msg',
						label: 'sendMamMessage',
					}],
					submit: {
						text: 'Send'
					}
				}}
			/>

			<div style={{display: 'flex', justifyContent: 'center'}}>
				<Button onClick={handleSetUser} type="submit" variant="raised" color="primary" size="small">
                   SetUser
                </Button>
			</div>
		</Layout>
	)
}

UserPage.getInitialProps = async (context) => {
	const { store } = context
	const { id } = context.query
//	await store.dispatch(fetchOffTangleUserList())
        await store.dispatch(fetchUserList())
        /* what is this used for ? */
	await store.dispatch(checkTangleUsers([{ id }]))
	await store.dispatch(fetchClaims(id))
	await store.dispatch(fetchMamMessages(id))
	const { users } = store.getState()
	const { localList, validData, claims, messages } = users
	/* not working at all */
	const validIds = validData.map(v => v.id)
	// TODO: Use selector to get better performance
//	const userList = offTangleData.filter(d => validIds.indexOf(d.id) !== -1)
	const userList = localList//.filter(d => validIds.indexOf(d.id) !== -1)
	const user = userList.find(u => u.id === id)
	const otherUser = userList.map(u => {return u.id}).filter(i => i !== id)
	const { pk } = user
	user.qrcode = await transformToQRCode(JSON.stringify({pk, id}))
	return {
		id,
		user,
		claims,
		messages,
		otherUser,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createClaim: bindActionCreators(createClaim, dispatch),
		createMamMessage: bindActionCreators(createMamMessage, dispatch)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { user, claims, messages, otherUser } = ownProps
	return { user, claims, messages, otherUser }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(UserPage)
