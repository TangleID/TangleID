import { createStore, applyMiddleware } from 'redux'
import api from '../middlewares/api'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
	rootReducer,
	preloadedState,
	applyMiddleware(api)
)

export default configureStore