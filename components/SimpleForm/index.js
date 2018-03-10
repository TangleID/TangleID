import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Send from 'material-ui-icons/Send'

const styles = theme => ({
      button: {
         margin: theme.spacing.unit,
      },
      leftIcon: {
          marginLeft: theme.spacing.unit,
      },
});

const getValues = (refs) => {
	return Object.keys(refs).reduce((acc, cur) => {
		acc[cur] = refs[cur].value
		return acc
	}, {})
}

const clear = (refs) => {
	Object.keys(refs).forEach(key => refs[key].value = '')
}

const SimpleForm = (props) => {
	const refs = {}
	const { handleSubmit, name, meta, classes } = props
	const { inputs, submit } = meta
	const formName = name

	const createInputBlock = (options) => {
		const { name, placeholder, label } = options
		const id = `${formName}-input-${name}`
		return (
			<div key={id} style={{display: 'flex', justifyContent: 'center'}}>
				<TextField
					id={id}
					name={name}
                    label={label}
                    placeholder={placeholder}
                    margin="normal"
					inputRef={(input) => { refs[name] = input }}
				/>
			</div>
		)
	}
	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			const values = getValues(refs)
			handleSubmit(values)
			clear(refs)
		}}>
			{inputs.map(createInputBlock)}
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<Button type="submit" className={classes.button} variant="raised" color="primary" size="small">
                    Send 
                    <Send className={classes.leftIcon} />
                </Button>
			</div>
		</form>
	)
}

SimpleForm.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleForm)
