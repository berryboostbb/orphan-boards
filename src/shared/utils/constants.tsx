import {store} from '../exporter';
import Toast from 'react-native-toast-message';
const BASE_URL = 'https://api.orphanboards.com/api/v1/';
// const BASE_URL = 'https://backend.orphanboards.com/api/v1/';
// const BASE_URL = 'https://3d15-110-39-1-50.ngrok.io/api/v1/';
// const SOCKET_URL = 'https://backend.orphanboards.com';
const SOCKET_URL = 'https://api.orphanboards.com';

const WEATHER_API = 'http://api.worldweatheronline.com/premium/v1/weather.ashx';

const GOOGLE_PLACES_URL =
  'https://maps.googleapis.com/maps/api/place/textsearch/json';
const {user} = store.getState().root;

console.log('user token', user?.user?.token);

// const GOOGLE_MAPS_APIKEY = 'AIzaSyDrOgjqDQyIr1KbOfJx6Jwd9CAon1-RU5I';
const GOOGLE_MAPS_APIKEY = 'AIzaSyBxyyTYbY9gxFH_S6ufd3VshmTFRvJLeEk'; // Production key, from client's account lineup
// const weather_api_key = '6897cbbb45a74c37887203657190405';
const weather_api_key = '6897cbbb45a74c37887203657190405';
const HEADERS = () => {
  return {
    'Content-Type': 'multipart/form-data,octet-stream',
    Authorization: `Bearer ${user?.user?.token}`,
  };
};

const toastMessage = (type: string, msg1: string, msg2?: string) => {
  if (msg1) {
    Toast.show({
      type: type,
      text1: msg1,
    });
  } else if (msg1 && msg2) {
    Toast.show({
      type: type,
      text1: msg1,
      text2: msg2,
    });
  }
};
export {
  BASE_URL,
  SOCKET_URL,
  GOOGLE_MAPS_APIKEY,
  HEADERS,
  toastMessage,
  weather_api_key,
  WEATHER_API,
  GOOGLE_PLACES_URL,
};
