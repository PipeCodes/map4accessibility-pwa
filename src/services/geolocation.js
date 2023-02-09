export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
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
