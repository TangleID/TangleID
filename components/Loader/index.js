import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
	progress: {
		margin: `0 ${theme.spacing.unit * 2}px`,
		position: 'fixed',
		transform: 'translate(-50%)',
		left: '50%'
	},
})

function CircularIndeterminate(props) {
	const { classes, isLoading } = props
        console.log(classes.progress);
	return (
		<div>
			{isLoading &&
          <CircularProgress className={classes.progress} size={100}/>
			}
		</div>
	)
}

CircularIndeterminate.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CircularIndeterminate)
