import { HTTP_CLIENT } from "../exporter"
import { endPoints } from "../utils/endpoint"
const createMsgService = (obj: any) => {
   return HTTP_CLIENT.post(endPoints.createMsg, obj)
}
const createConsrvtnService = (obj: any) => {
   return HTTP_CLIENT.post(endPoints.createConsvtn, obj)
}
const getMsgService = (conservtnId: string) => {
   return HTTP_CLIENT.get(endPoints.getSingleUserMsg + conservtnId)
}
const getConsrvtnService = (userid: string) => {
   return HTTP_CLIENT.get(`${endPoints.getConsvtnbyUser}/${userid}`)
}
const checkConsrvtnService = (obj: string) => {
   return HTTP_CLIENT.post(endPoints.checkConservation, obj)
}

export {
   createMsgService,
   createConsrvtnService,
   getConsrvtnService,
   getMsgService,
   checkConsrvtnService
}
