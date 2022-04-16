import React, {Component} from 'react';
import {withGoogleReCaptcha} from 'react-google-recaptcha-v3';
  
  class ReCaptchaComponent extends Component {

    constructor(props){
        super(props);
        this.handleExchangeRecaptchaForNonce = this.handleExchangeRecaptchaForNonce.bind(this);
    };


    handleExchangeRecaptchaForNonce = async () => {
        const {updateNotification, googleReCaptchaProps} = this.props
        const { executeRecaptcha } = googleReCaptchaProps;

        if (!executeRecaptcha) {

            updateNotification({open: true, message: 'Recaptcha has not been loaded'});
            return;
        }

        updateNotification({open: false});

        const token = await executeRecaptcha('loadWallet');

        updateNotification({open: true, message: 'here we exchange the token for the nonce'});
    };
  
    render() {

        const {verifiedComponent} = this.props;

        return (
            <div>
                <button onClick={this.handleExchangeRecaptchaForNonce}>Verify Recaptcha</button>

                {verifiedComponent}

            </div>
        );
    }
  }
  
  export const RecaptchaVerifiedComponent = withGoogleReCaptcha(ReCaptchaComponent);