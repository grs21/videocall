class RequestService {
  static instance = null;

  static getInstance() {
    if (!RequestService.instance) {
      RequestService.instance = new RequestService();
    }
    return RequestService.instance;
  }

  async get(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('GET işlemi hatası:', error);
      throw error;
    }
  }

  async post(url, body, header) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: body,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('POST işlemi hatası:', error);
      throw error;
    }
  }
}

export default RequestService;