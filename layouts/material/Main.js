import PersistentDrawer from '../../components/material/PersistentDrawer'
import Loader from '../../components/Loader'

const MainLayout = (props) => (
	<PersistentDrawer title="tangleID" >
		<Loader isLoading={props.isLoading}/>
		{props.children}
	</PersistentDrawer>
)

export default MainLayout
