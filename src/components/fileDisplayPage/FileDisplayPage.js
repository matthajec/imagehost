import * as React from 'react';
import './FileDisplayPage.scss';

function FileDisplayPage({ imgUrl }) {
  return (
    <div className="file-display">
      <img
        className="file-display__img"
        src={imgUrl}
        alt="your uploaded file"
      />
      <div className="file-display__url">
        <p>{imgUrl}</p>
        <button>Copy</button>
      </div>
    </div>
  );
}

export default FileDisplayPage;