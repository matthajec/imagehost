import * as React from 'react';
import './FileDisplayPage.scss';

function FileDisplayPage({ imgUrl }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const copyText = document.createElement('input');
    copyText.value = imgUrl;
    copyText.style.top = "-999999px";
    document.body.appendChild(copyText);

    copyText.select();
    copyText.setSelectionRange(0, 9999);
    document.execCommand('copy');
    setCopied(true);
  };

  return (
    <div className="file-display">
      <img
        className="file-display__img"
        src={imgUrl}
        alt="your uploaded file"
      />
      <div className="file-display__url">
        <p>{imgUrl}</p>
        <button
          className={copied && 'copied'}
          onClick={() => handleCopy()}
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default FileDisplayPage;