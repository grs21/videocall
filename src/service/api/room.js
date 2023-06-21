import RequestService from "./request";
import { BASE_URL, GUID } from "../../constant/constant";

const requestService = RequestService.getInstance();


export const getPrepareVideo = async () => {
  const url = `${BASE_URL}/Mobile/PrepareVideoCall`
  const data = {
    RandevuGuid: GUID,
  };
  return requestService.post(url, data);
};

export const createUser = async (user) => {
  return requestService.post('/api/users', user);
};