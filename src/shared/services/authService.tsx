import {HTTP_CLIENT} from '../exporter';
import {endPoints} from '../utils/endpoint';
const loginService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.login, obj);
};
const signupService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.signUP, obj);
};
const forgotPaswordService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.forgot, obj);
};
const resetPaswordService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.restPassword, obj);
};

const socialLogin = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.handleSocialLogin, obj);
};

export {
  loginService,
  signupService,
  forgotPaswordService,
  resetPaswordService,
  socialLogin,
};
