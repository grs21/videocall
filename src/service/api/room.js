import RequestService from "./request";
import { BASE_URL,GUID } from "../../constant/constant";

const requestService = RequestService.getInstance();


export const getCallInfo = async () => {
    const url = `${BASE_URL}/Mobile/PrepareVideoCall`
    return requestService.post(url,GUID);
  };
  
  export const createUser = async (user) => {
    return requestService.post('/api/users', user);
  };