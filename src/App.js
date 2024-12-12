import React, { useEffect, useState } from 'react';
import SecureViewer from './SecureViewer';
import {SpeedInsights} from '@vercel/speed-insights/react'

function App() {
  const [s3ImageUrl, setS3ImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const objectKey = params.get('key'); // Extract 'key' parameter from the URL

      if (objectKey) {
        const bucketBaseUrl = 'https://sihbucketyashu.s3.us-east-1.amazonaws.com/';
        setS3ImageUrl(`${bucketBaseUrl}${objectKey}`);
      } else {
        console.error('No object key found in the URL');
        setS3ImageUrl(null);
      }
    };

    fetchImageUrl();
  }, []);

  if (!s3ImageUrl) {
    return <div>Access Denied!!! Purging File</div>;
  }

  return (
    <div className="App">
      <SecureViewer imageUrl={s3ImageUrl} />
    </div>
  );
}

export default App;
