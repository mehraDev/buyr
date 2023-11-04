function getUrlImageStorage(relLocatioin: string): string {
  const bucket = "cloudyug-f2fe4.appspot.com";
  const encodedLocation = encodeURIComponent(relLocatioin);
  const storageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedLocation}`;

  return storageUrl;
}
export default getUrlImageStorage;
