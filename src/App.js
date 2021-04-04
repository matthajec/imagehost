import * as React from 'react';
import FileUploadPage from './components/fileUploadPage/FileUploadPage';
import LoadingPage from './components/loadingPage/LoadingPage';
import FileDisplayPage from './components/fileDisplayPage/FileDisplayPage';
import CaptchaPage from './components/captchaPage/CaptchaPage';
import Notification from './components/notification/Notification';

function App() {
  const [errorNotifcation, setErrorNotification] = React.useState(null);
  const [appStatus, setAppStatus] = React.useState(0);
  const [fileDropStatus, setFileDropStatus] = React.useState({
    error: false,
    status: 'INACTIVE'
  });
  const [imgUrl, setImgUrl] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const handleUpload = token => {
    setAppStatus(2);

    const formData = new FormData();

    formData.append(
      'image',
      file,
      file.name
    );

    formData.append(
      'cToken',
      token
    );

    fetch('http://localhost:8080/image', {
      method: 'POST',
      headers: {
        'X-Forwarded-For': '9.875.5.4'
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => setImgUrl(data.url));
  };

  React.useEffect(() => {
    if (imgUrl) {
      setAppStatus(3);
    }
  }, [imgUrl]);

  React.useEffect(() => {
    const errorTimer = setTimeout(() => {
      setErrorNotification(null);
    }, 4000);

    return () => clearTimeout(errorTimer);
  }, [errorNotifcation]);

  React.useEffect(() => {
    if (fileDropStatus.status === 'SUCCESS') {
      setAppStatus(1);
    }

    if (fileDropStatus.error) {
      switch (fileDropStatus.status) {
        case 'TOO_MANY_FILES':
          setErrorNotification('One file at a time, please');
          break;
        case 'INVALID_FILE_TYPE':
          setErrorNotification('File must be .jpg, .jpeg, .png, or .webp');
          break;
        case 'LIMIT_FILE_SIZE':
          setErrorNotification('File can\'t be larger than 2MB');
          break;
        default:
          setErrorNotification(null);
          break;
      }
    }
  }, [fileDropStatus]);

  return (
    <React.Fragment>
      {errorNotifcation &&
        <Notification type="error">{errorNotifcation}</Notification>
      }

      {appStatus === 0 &&
        <FileUploadPage
          fileDropStatus={fileDropStatus}
          setFileDropStatus={setFileDropStatus}
          setFile={setFile}
        />
      }

      {appStatus === 1 &&
        <CaptchaPage
          handleUpload={handleUpload}
        />
      }

      {appStatus === 2 &&
        <LoadingPage />
      }

      {appStatus === 3 &&
        <FileDisplayPage imgUrl={imgUrl} />
      }


    </React.Fragment>
  );
}

export default App;
