import {BASE_URL, HTTP_CLIENT, store} from '../exporter';
import RNFetchBlob from 'rn-fetch-blob';
import {endPoints} from '../utils/endpoint';
import {
  GOOGLE_MAPS_APIKEY,
  GOOGLE_PLACES_URL,
  HEADERS,
  WEATHER_API,
  weather_api_key,
} from '../utils/constants';
import axios from 'axios';
import moment from 'moment';
const addReportService = (obj: any) => {
  const {user} = store.getState().root;
  return RNFetchBlob.fetch(
    'POST',
    BASE_URL + endPoints.addReport,
    {
      'Content-Type': 'multipart/form-data,octet-stream',
      Authorization: `Bearer ${user?.user?.token}`,
    },
    obj,
  );
};
const getAllReportService = (qrystrng: any) => {
  return HTTP_CLIENT.get(endPoints.getAllReport + qrystrng);
};
const addFavReportService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.favReport, obj);
};

const getLatestReportService = (query: any) => {
  return HTTP_CLIENT.get(endPoints.latestReport + query);
};

const getallBeaches = (query: string) => {
  return axios.get(
    GOOGLE_PLACES_URL + `?key=${GOOGLE_MAPS_APIKEY}${query && query}`,
  );
};
const weatherDataService = (obj: any) => {
  return axios.get(
    WEATHER_API +
      `?key=${weather_api_key}&format=json&q=${obj?.lat},${
        obj?.lng
      }&date=${moment(new Date()).format('YYYY-MM-DD')}`,
  );
};
export {
  addReportService,
  getAllReportService,
  getLatestReportService,
  addFavReportService,
  weatherDataService,
  getallBeaches,
};
