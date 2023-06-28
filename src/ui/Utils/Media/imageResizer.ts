import Resizer from 'react-image-file-resizer';

const resizeImage = (file:any,desiredWidth:number,desiredHeight:number) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        desiredWidth,
        desiredHeight,
        'JPEG',
        100,
        0,
        (resizedImage) => {
          resolve(resizedImage);
        },
        'base64',
        desiredWidth,
        desiredHeight
      );
    });
  };

  export default resizeImage