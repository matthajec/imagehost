import * as React from 'react';
import './FileDisplayPage.scss';

function FileDisplayPage() {
  return (
    <div className="file-display">
      <img
        className="file-display__img"
        src="https://dummyimage.com/1920x1080.png?text=imagehost"
        alt="your uploaded file"
      />
      <div className="file-display__url">
        <p>https://sampleurl.next/1781478.jpg</p>
        <button>Copy</button>
      </div>
    </div>
  );
}

export default FileDisplayPage;