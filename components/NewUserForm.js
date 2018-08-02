import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Send from '@material-ui/icons/Send';

const styles = () => ({
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

class NewUserForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    for (const key of formData.keys()) {
      data[key] = formData.get(key);
    }
    this.props.handleSubmit(data);
    event.target.reset();
  }

  render() {
    const { keyPairs, uuid, classes } = this.props;
    const { sk, pk } = keyPairs;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.head} variant="title" color="secondary" align="center">Register</Typography>

          <form onSubmit={this.handleSubmit}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                name="first_name"
                label="first name"
                margin="normal"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                name="last_name"
                label="last name"
                margin="normal"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                name="cosignerp"
                label="cosigner1 (optional)"
                placeholder="address"
                margin="normal"
              />
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                name="cosigners"
                label="cosigner2 (optional)"
                placeholder="address"
                margin="normal"
              />
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                name="profile_picture"
                label="Profile picture (optional)"
                margin="normal"
              />
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" className={classes.button} variant="raised" color="primary" size="small">
                Send
                <Send className={classes.leftIcon} />
              </Button>
            </div>
          </form>

          <Typography className={classes.head} variant="title" color="error">**Please do remember the following information**</Typography>
          <Typography className={classes.head} variant="title" color="primary">UUID</Typography>
          <Typography variant="subheading">{uuid}</Typography>
          <Typography className={classes.head} variant="title" color="primary">Secret Key</Typography>
          <Card className={classes.key}>
            <CardContent>
              <Typography paragraph>{sk}</Typography>
            </CardContent>
          </Card>
          <Typography className={classes.head} variant="title" color="primary">Public Key</Typography>
          <Card className={classes.key}>
            <CardContent>
              <Typography paragraph>{pk}</Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

NewUserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  keyPairs: PropTypes.object,
  uuid: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default withStyles(styles)(NewUserForm);
