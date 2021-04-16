import * as React from 'react';
import uploadSVG from '../../image.svg';
import './FileUploadPage.scss';

function FileUploadPage({ fileDropStatus, setFileDropStatus, setFile }) {
  const dropRef = React.createRef();
  const fileInput = React.createRef();

  let isDraggable = false;

  if ('draggable' in document.createElement('span')) {
    isDraggable = true;
  }

  const handleFiles = (files) => {
    if (files.length > 1) {
      // handle too many files
      return setFileDropStatus({
        error: true,
        status: 'TOO_MANY_FILES',
      });
    }

    if (
      files[0].type === 'image/jpeg' ||
      files[0].type === 'image/png' ||
      files[0].type === 'image/webp' ||
      files[0].type === 'image/jpg'
    ) { } else {
      // handle wrong file mimetype
      return setFileDropStatus({
        error: true,
        status: 'INVALID_FILE_TYPE'
      });
    }

    if (files[0].size > 2100000) {
      // handle file too large
      return setFileDropStatus({
        error: true,
        status: 'LIMIT_FILE_SIZE'
      });
    }

    // file is good
    setFileDropStatus({
      error: false,
      status: 'SUCCESS'
    });


    setFile(files[0]);
  };

  const handleInput = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDropStatus({
      error: false,
      status: 'ACTIVE',
    });
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDropStatus({
      error: false,
      status: 'ACTIVE'
    });
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDropStatus({
      error: false,
      status: 'NONE'
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };


  React.useEffect(() => {
    let dropArea = dropRef.current;

    dropArea.addEventListener('dragenter', handleDragIn);
    dropArea.addEventListener('dragleave', handleDragOut);
    dropArea.addEventListener('dragover', handleDrag);
    dropArea.addEventListener('drop', handleDrop);


    // clean up the event listeners
    return () => {
      dropArea.removeEventListener('dragenter', handleDragIn);
      dropArea.removeEventListener('dragleave', handleDragOut);
      dropArea.removeEventListener('dragover', handleDrag);
      dropArea.removeEventListener('drop', handleDrop);
    };
    // eslint-disable-next-line
  }, [dropRef]);

  return (
    <form
      className={`
        image-upload-form
        ${!isDraggable && "image-upload-form__unsupported"}
      `}
    >
      <h1 className="title">Upload your image</h1>
      <h2 className="subtitle">File should be jpg, jpeg, png, or webp.</h2>
      <label
        className={`
            file-drop-area 
            ${fileDropStatus.status === 'ACTIVE' && 'file-drop-area__dragging'}
            ${!isDraggable && "file-drop-area__unsupported"}
          `}
        ref={dropRef}
        onChange={handleInput}
      >
        <img src={uploadSVG} alt="" />
        <p className="greyed-text">Drag & Drop your image here</p>
        <input ref={fileInput} className="file-drop-input" type="file" id="fileElem" />
      </label>
      {isDraggable && <p className="greyed-text">Or</p>}
      <label className="button" htmlFor="fileElem">
        Select a file
      </label>
    </form>
  );
}

export default FileUploadPage;
