import React from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import './CaptchaPage.scss';

function CaptchaPage({ handleUpload }) {
  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        sitekey="6Lf3qpsaAAAAAHfkSp9AHJL5ME0Ho-nFvSZAZpVu"
        onChange={token => handleUpload(token)}
      />
    </div>

  );
}

export default CaptchaPage;