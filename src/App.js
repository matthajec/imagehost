import * as React from 'react';
import FileUploadPage from './components/fileUploadPage/FileUploadPage';
import LoadingPage from './components/loadingPage/LoadingPage';
import FileDisplayPage from './components/fileDisplayPage/FileDisplayPage';
import Notification from './components/notification/Notification';

function App() {
  const [errorNotifcation, setErrorNotification] = React.useState(null);
  const [appStatus, setAppStatus] = React.useState(0);
  const [fileDropStatus, setFileDropStatus] = React.useState({
    error: false,
    status: 'INACTIVE'
  });
  const [imgUrl, setImgUrl] = React.useState(null);

  React.useEffect(() => {
    if (imgUrl) {
      setAppStatus(2);
    }
  }, [imgUrl]);

  React.useEffect(() => {
    const errorTimer = setTimeout(() => {
      setErrorNotification(null);
    }, 4000);

    return () => clearTimeout(errorTimer);
  }, [errorNotifcation]);

  React.useEffect(() => {
    if (fileDropStatus.status === 'UPLOADING') {
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
          setImgUrl={setImgUrl}
        />
      }

      {appStatus === 1 &&
        <LoadingPage />
      }

      {appStatus === 2 &&
        <FileDisplayPage imgUrl={imgUrl} />
      }
    </React.Fragment>
  );
}

export default App;
