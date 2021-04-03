import './LoadingPage.scss';

function LoadingPage() {
  return (
    <div className="loader">
      <p className="loader__text">Uploading</p>
      <div className="loader__bar" />
    </div>
  );
}

export default LoadingPage;