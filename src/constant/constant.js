import { io } from "socket.io-client";

export const BASE_URL = 'https://mlpapi.mlpcare.com/api';
export const GUID = '7939bcb4-2a22-4833-af7c-6faf3381a613#';
export const SOCKET_IO = io.connect('https://mlponlinechat.mlpcare.com:3010');
export const FILE_EXTENSION = ['png', 'jpg', 'jpeg', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf'];

export const PLEASE_UPLOAD_FILE = 'Lütfen bir dosya yükleyiniz !'
export const UNSUPPORTED_FILE_TYPE = 'Desteklenmeyen Dosya türü !'
export const BEGIN_COLLING = 'Görüşmeyi Başlat'
export const AGAIN_BEGIN_COLLING = 'Tekrar Ara'
export const CANCEL = 'Vazgeç';
export const CALL_END = 'Görüşmeyi Sonlandır'
export const ARE_YOU_SHOURE = 'Görüşmeyi sonlandırmak istediğinize emin misiniz ?';
export const DRAG_AND_PUT = 'Dosya yüklemek için sürükleyip ya da tıklayınız';
export const UID = 1000;