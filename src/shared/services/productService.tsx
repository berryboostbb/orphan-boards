import {HTTP_CLIENT, BASE_URL, store} from '../exporter';
import {endPoints} from '../utils/endpoint';
import RNFetchBlob from 'rn-fetch-blob';

const addProductService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.addProduct, obj);
};
const updateUserProductService = (id: any, obj: any) => {
  return HTTP_CLIENT.put(`${endPoints.updateUserProduct}/${id}`, obj);
};
const deleteProductPic = (id: any, obj: any) => {
  console.log('obj.........', obj);

  return HTTP_CLIENT.put(`${endPoints.deleteProductPic}/${id}`, obj);
};
const uploadProductPic = (id: any, obj: any) => {
  const {user} = store.getState().root;
  return RNFetchBlob.fetch(
    'PUT',
    `${BASE_URL + endPoints.uploadProductPic}/${id}`,
    {
      'Content-Type': 'multipart/form-data,octet-stream',
      Authorization: `Bearer ${user?.user?.token}`,
    },
    obj,
  );
};

export {
  addProductService,
  updateUserProductService,
  deleteProductPic,
  uploadProductPic,
};
