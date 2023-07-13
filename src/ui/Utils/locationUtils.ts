export interface ICoordinates {
  latitude: number;
  longitude: number;
}

const DEFAULT_LATITUDE = 37.7749; // Example: San Francisco coordinates
const DEFAULT_LONGITUDE = -122.4194;

function getLocation(): Promise<ICoordinates> {
  if (navigator.geolocation) {
    return new Promise<ICoordinates>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        () => {
          resolve({ latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE });
        }
      );
    });
  } else {
    return Promise.resolve({ latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE });
  }
}

export default getLocation;
