import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography';
import SimpleForm from '../SimpleForm'

const styles = theme => ({
    card: {
      maxWidth: '35%',
    },
    head: {
        marginBottom: 10,
        marginTop: 10,
    },
    key: {
        overflow: 'auto',
    },
  });

const NewUserForm = (props) => {
	const { keyPairs, uuid, handleSubmit, classes } = props
    const { sk, skImg, pk, pkImg, } = keyPairs
    console.log(pk)
    
	return (
        <Card className={classes.card}>
        <CardContent>
        <Typography className={classes.head} variant="title" color="secondary" align="center">Register</Typography>
        <Typography className={classes.uid} variant="subheading" align="center">uuid: {uuid}</Typography>
            <SimpleForm
                name="newIdentityForm"
                handleSubmit={handleSubmit}
                meta={{
                    inputs: [{
                        name: 'firstName',
                        label: 'first name',
                    }, {
                        name: 'lastName',
                        label: 'last name',
                    }, {
                        name: 'cosigner1',
                        label: 'cosigner1 (optional)',
                        placeholder: 'address',
                    }, {
                        name: 'cosigner2',
                        label: 'cosigner2 (optional)',
                        placeholder: 'address',
                    }, {
                        name: 'profilePicture',
                        label: 'Profile picture (optional)',
                    }],
                    submit: {
                        text: 'send'
                    }
                }}
            />
       
        <Typography className={classes.head} variant="title" color="primary">Secret Key</Typography>
        <Card className={classes.key}>
            <CardContent>
                <Typography  paragraph>{sk}}</Typography>
            </CardContent>
        </Card>
        <Typography className={classes.head} variant="title" color="primary">Public Key</Typography>
        <Card className={classes.key}>
            <CardContent>
                <Typography  paragraph>{pk}}</Typography>
            </CardContent>
        </Card>
    </CardContent>
    </Card>
	)
}

NewUserForm.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewUserForm)
