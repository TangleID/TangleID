import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import configureStore from '../../store/configureStore'
import checkTangleUsers from '../../actions/checkTangleUsers'
import fetchOffTangleUserList from '../../actions/fetchOffTangleUserList'
import Layout from '../../layouts/Main'
import showClaims from '../../actions/showClaims.js'

const showCliamPage = (props) => {
   const { claims } = props
   const info_array = claims[0].text.split(',')

   console.log("Hellooooo ", info_array[0]) 

   const handleSubmit = (values) => {
       const params = Object.assign({
           uuid: id,
       }, values)
       showClaim(params)
   }
   
   return (
       <Layout>
           <h2>Claim full content:</h2>
           <a>Part A: {info_array[0]}</a><br></br>
           <a>Part B: {info_array[1]}</a><br></br>
	   <a>Expiration Date: {info_array[2]}</a><br></br>
	   <a>Image: </a><br></br>
           <img src={info_array[3]} /><br></br>
	   <a>Description: {info_array[4]}</a>
       </Layout>
   )
}

showCliamPage.getInitialProps = async (context) => {
   const { store } = context
   const { hash_txn } = context.query

   await store.dispatch(showClaims(hash_txn))

   return {
      hash_txn
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showClaim: bindActionCreators(showClaims, dispatch)
    }
}

const mapStateToProps = (state, ownProps) => {
   const { user, claims } = state.users
   
   return { user, claims }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(showCliamPage)
