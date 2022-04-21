import React, {Component} from 'react';
import {withGoogleReCaptcha} from 'react-google-recaptcha-v3';
  
  class ReCaptchaComponent extends Component {

    constructor(props){
        super(props);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);
    };

    handleRecaptcha = async () => {
        const {updateNotification, googleReCaptchaProps} = this.props
        const { executeRecaptcha } = googleReCaptchaProps;

        if (!executeRecaptcha) {

            updateNotification({open: true, message: 'Recaptcha has not been loaded'});
            return;
        }

        const token = await executeRecaptcha('loadWallet');

        const response = await fetch('http://127.0.0.1:8787/api/get-access-token');
        const data = await response.json();

        console.log(data);
    };
  
    render() {

        const {verifiedComponent} = this.props;

        return (
            <div>
                <button onClick={this.handleRecaptcha}>Verify Recaptcha</button>

                {verifiedComponent}

            </div>
        );
    }
  }
  
  export const RecaptchaVerifiedComponent = withGoogleReCaptcha(ReCaptchaComponent);