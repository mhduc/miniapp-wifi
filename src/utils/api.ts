import axios from 'axios';

const getDataById = async (id) => {
  let url: string | null;
  if (id !== null) {
    url = `https://wifi-stg.vivas.vn/?r=api-zalo/detail&id=${id}`;
  }
  else {
    url = `https://wifi-stg.vivas.vn/index.php?r=api-zalo/index`;
  }
  const response = await axios.get(url);
  const result = response.status === 200 ? response.data : {};
  return result;
}

const postData = async (data) => {
  const url = `https://wifi-stg.vivas.vn?r=api-zalo/submit`;
  const response = await axios.post(url, data);
  // const result = response.status === 200 ? response.data : {};
  return response;

}

const postAccespoint = async (data) => {
  const url = `https://wifi-stg.vivas.vn?r=api-zalo/access`;
  const response = await await axios.post(url, data);
  // const result = response.status === 200 ? response.data : {};
  return response;
}

export const apiWifiMkt = {
  getDataById,
  postData,
  postAccespoint,
}