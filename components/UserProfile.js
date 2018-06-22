import React, { Component } from 'react';
import PropTypes from 'prop-types';

const QRCode = require('qrcode');

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qrcode: null,
    };
  }

  componentDidMount() {
    const qrcodeData = JSON.stringify({
      pk: this.props.user.pk,
      id: this.props.user.id,
    });

    QRCode.toDataURL(qrcodeData, (error, url) => {
      if (!error) {
        this.setState({ qrcode: url });
      }
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.user.claim.firstName}</h2>

        {
          this.state.qrcode
            ? <img src={this.state.qrcode} alt="QRCode of id and public key" />
            : <p>No QRcode Provided</p>
        }

        <div>
          <p>id: {this.props.user.id}</p>
          <p>public key: {this.props.user.pk}</p>
        </div>
        <div>
          <p>private key: {this.props.user.sk}</p>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
};

export default UserProfile;
