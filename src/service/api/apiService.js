import RequestService from "./request";
import { BASE_URL } from "../../constant/constant";
import { sendMessage } from "../../helper/videoCallHelper";
import { CloseModal } from '../../helper/videoCallHelper';

const requestService = RequestService.getInstance();

export const callPrepareVideo = async (GUID) => {
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

export const prepareVideoCallPush = async (GUID) => {
  const url = `${BASE_URL}/Mobile/PrepareVideoCall_Push`;
  const data = {
    RandevuGuid: GUID,
  };
  const header = {
    'Content-Type': 'application/json',
  }
  return requestService.post(url, JSON.stringify(data), header);
}

export const videoCallRecord = async (status, uid, guid, deviceBattery, device) => {
  const url = `${BASE_URL}/Mobile/Video_Call_Record`;
  const data = {
    Status: status,
    Uid: uid,
    Guid: guid,
    DeviceBattery: deviceBattery,
    DeviceHardware: device.browser + " " + device.browserVersion,
    DeviceOS: device.os + " " + device.osVersion,
    DeviceType: 'web',
    StatusDescription: '',
  };
  const header = {
    'Content-Type': 'application/json',
  }
  return requestService.post(url, JSON.stringify(data), header);
}