import io from '../style/js/socket.io.js';

export const BASE_URL = 'https://mlpapi.mlpcare.com/api';
export const GUID = '7939bcb4-2a22-4833-af7c-6faf3381a613#';
export const SOCKET_IO = io.connect('https://mlponlinechat.mlpcare.com:3010');
export const FILE_EXTENSION = ['png', 'jpg', 'jpeg', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf'];

export const PLEASE_UPLOAD_FILE = 'Lütfen bir dosya yükleyiniz !'
export const UNSUPPORTED_FILE_TYPE = 'Desteklenmeyen Dosya türü !'
export const BEGIN_COLLING = 'Aramayı Başlat'
export const CANCEL = 'Vazgeç';
export const CALL_END = 'Görüşmeyi Sonlandır'
export const ARE_YOU_SHOURE = 'Görüşmeyi sonlandırmak istediğinize emin misiniz ?';