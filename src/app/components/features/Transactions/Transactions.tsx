import React from 'react';
import ImageUploadForm from './imageUpload';
import ImageCollectionViewer from './imageViewer';

const Transactions = () => {
  return (
    <div>
      <ImageUploadForm onSubmit={(a,b) => console.log(a,b)}/>
      <ImageCollectionViewer />
    </div>
  );
};

export default Transactions;
