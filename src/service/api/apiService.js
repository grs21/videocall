import RequestService from "./request";
import { BASE_URL, GUID } from "../../constant/constant";
import { sendMessage } from "../../helper/videoCallHelper";
import { CloseModal } from '../../helper/videoCallHelper';

const requestService = RequestService.getInstance();

export const callPrepareVideo = async () => {
  const url = `${BASE_URL}/Mobile/PrepareVideoCall`
  const data = {
    RandevuGuid: GUID,
  };
  const header = {
    'Content-Type': 'application/json',
  }
  return requestService.post(url, JSON.stringify(data), header);
};

export const uploadFile = async (formdata, roomId, fromName, fromId, toId, toName, fileName) => {
  const url = `${BASE_URL}/Mobile/ChatUploadFile`;
  const boady = formdata;
  const header = {}
  var response = await requestService.post(url, boady, header);
  const fileUrl = response.fileUrl ? response.fileUrl : '';
  sendMessage(roomId, fromName, fromId, toId, fileUrl, toName, fileName)
  CloseModal('drag_files')
  return response;
};