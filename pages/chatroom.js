import withRedux from 'next-redux-wrapper'
import configureStore from '../store/configureStore'
import Layout from '../layouts/material/Main'
import ChatRoomLayout from '../components/ChatRoom'

const ChatRoom = (props) => {
	return (
		<Layout>
			<ChatRoomLayout />
		</Layout>
	)
}

export default withRedux(configureStore)(ChatRoom)
