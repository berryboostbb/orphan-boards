import {BASE_URL, HTTP_CLIENT, store} from '../exporter';
import RNFetchBlob from 'rn-fetch-blob';
import {endPoints} from '../utils/endpoint';
import {HEADERS} from '../utils/constants';

const addShopService = (obj: any, imageState: any) => {
  if (imageState == 'edit') {
    return HTTP_CLIENT.post(endPoints.addShop, obj);
  } else {
    console.log('old call......');

    const {user} = store.getState().root;
    return RNFetchBlob.fetch(
      'POST',
      BASE_URL + endPoints.addShop,
      {
        'Content-Type': 'multipart/form-data,octet-stream',
        Authorization: `Bearer ${user?.user?.token}`,
      },
      obj,
    );
  }
};
const getAllShopService = (query: any) => {
  return HTTP_CLIENT.get(endPoints.getAllShops + query);
};

const getSingleProduct = (pid: string) => {
  return HTTP_CLIENT.post(endPoints.getSingleShop + pid);
};

const deleteProduct = (id: any) => {
  return HTTP_CLIENT.delete(`${endPoints.deleteProduct}/${id}`);
};

export {addShopService, getAllShopService, getSingleProduct, deleteProduct};
