import axios from 'axios';

const siteUrl = process.env.REACT_APP_BASE_URL;

export function UploadFile(url: any, body: any, token: any) {
  const formData = new FormData();
  formData.append('file', body);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: token ? token : null,
    },
  };

  return axios.post(siteUrl + url, formData, config)
    .then(response => {
      const apiData = {
        status: response.status,
        data: response.data,
      };
      if (apiData.data.code === 410) {
        localStorage.setItem('authentication', 'false');
      }
      return apiData;
    })
    .catch(error => {
      return 'error';
    });
}

export async function Api(url: any, apiMethod: any, body: any, token: any) {
  const userAgent = navigator.userAgent;

  let headers = {
    token: token ? token : null,
    'Content-Type': 'application/json',
    latitude: localStorage.getItem('lat'),
    longitude: localStorage.getItem('long'),
    ip: localStorage.getItem('ip'),
    'user-Agent': userAgent,
    devicetype: userAgent.match(/Android/i)
      ? 'android'
      : userAgent.match(/mac/i)
        ? 'macbook'
        : 'windows',
  };

  let data = null;
  if (apiMethod !== 'GET') {
    data = JSON.stringify(body);
  }

  const config = {
    method: apiMethod,
    url: siteUrl + url,
    headers: headers,
    data: data,
  };

  try {
    const response = await axios(config);
    const apiData = {
      status: response.status,
      data: response.data,
    };
    if (apiData.data.code === 410) {
      localStorage.setItem('authentication', 'false');
    }
    return apiData;
  } catch (error) {
    return 'error';
  }
}
