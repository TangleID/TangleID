import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import configureStore from '../store/configureStore'
import checkTangleUsers from '../actions/checkTangleUsers'
//import fetchOffTangleUserList from '../actions/fetchOffTangleUserList'
import fetchUserList from '../actions/fetchUserList'
import fetchClaims from '../actions/fetchClaims'
import createClaim from '../actions/createClaim'
import transformToQRCode from '../utils/transformToQRCode'
//import Layout from '../layouts/Main'
import Layout from '../layouts/material/Main'
import SimpleForm from '../components/SimpleForm'
import ClaimList from '../components/ClaimList'
import Link from 'next/link'

import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

import MessageInput from '../components/MessageInput'
import Button from '@material-ui/core/Button'




const styles = {
	root: {
		display: "flex",
		["flex-flow"]: "row",
		height: "75vh"
	},
	["left-block"]: {
		["align-items"]: "center",
		background: "#42A5F5",
		display: "flex",
		flex: "12%",
		["flex-direction"]: "column",
		["justify-content"]: "center"
	},
	["left-img"]: {
		["text-align"]: "center"
	},
	["right-block"]: {
		["align-items"]: "flex-start",
		background: "#81D4FA",
		display: "flex",
		flex: "40%",
		["justify-content"]: "flex-start"
	},
	qcode: {
		height: "45%",
		width: "45%"
	},
	["qcode-word"]:{
		// color: "#000000",
		color: "#424242",
		["font-weight"]: "bolder",
	},
	["qcode-Name"]:{
		// color: "#424242",
		color: "#000000",
		["font-size"]: "2.0em",
		["font-weight"]: "bolder",
	},
	messageInput: {
		display: "inline",
		["margin-left"]: "1.2em"
	},
	Button_Coler:{
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
		padding: '0 40px',
		margin: 30,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
	}
}

const UserPage = (props) => {
	const { claims, user, createClaim } = props
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
	return (
		<Layout>
			<div style={styles.root}>
				<div style={styles["left-block"]}>
					<div style={styles["qcode-Name"]}>Name</div>
					<div style={styles["left-img"]}>
						<p style={styles["qcode-word"]}>{claim.firstName}</p>
						<img
							alt="QRCode of id and public key"
							style={styles.qcode}
							src={qrcode} />
					</div>
				</div>
				<div style={styles["right-block"]}>
					<Card>
						<CardHeader
							title="Make Claim about User"
						/>
						<CardContent>
							<span>Acting as: {claim.firstName}</span>
							<MessageInput
								placeholder="Message"
								style={styles.messageInput} />
							<Button style={styles.Button_Coler}>{`Sign & Attach`}</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	)
}

UserPage.getInitialProps = async (context) => {
	const { store } = context
	const { id } = context.query
	// await store.dispatch(fetchOffTangleUserList())
	await store.dispatch(fetchUserList())
	await store.dispatch(checkTangleUsers([{ id }]))
	await store.dispatch(fetchClaims(id))
	const { users } = store.getState()
	const { localList, validData, claims } = users
	const validIds = validData.map(v => v.id)
	// TODO: Use selector to get better performance
	// const userList = offTangleData.filter(d => validIds.indexOf(d.id) !== -1)
	const userList = localList.filter(d => validIds.indexOf(d.id) !== -1)
	const user = userList.find(u => u.id === id)
	const { pk } = user
	user.qrcode = await transformToQRCode(JSON.stringify({pk, id}))
	return {
		id,
		user,
		claims
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createClaim: bindActionCreators(createClaim, dispatch)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { user, claims } = ownProps
	return { user, claims }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(UserPage)
