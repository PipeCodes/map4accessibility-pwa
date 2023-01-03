export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        return resolve(coordinates);
      },
      (error) => {
        reject(error?.message);
      },
    );
  });
