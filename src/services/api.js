

import axios from "axios";

// const API_AUTH_URL = "/api/v1/auth";
// const API_OLIVES_URL = "/api/v1/olives";

const API_AUTH_URL = "http://localhost:5500/api/v1/auth";
const API_OLIVES_URL = "http://localhost:5500/api/v1/olives";

export const signUp = async (userData) => {
  return axios.post(`${API_AUTH_URL}/sign-up`, userData, {
    withCredentials: true,
  });
};

export const signIn = async (credentials) => {
  return axios.post(`${API_AUTH_URL}/sign-in`, credentials, {
    withCredentials: true,
  });
};

export const signOut = async () => {
  return axios.post(`${API_AUTH_URL}/sign-out`, {}, { withCredentials: true });
};

export const refreshToken = async () => {
  return axios.post(
    `${API_AUTH_URL}/refresh-token`,
    {},
    { withCredentials: true }
  );
};

export const getOlives = async () => {
  return axios.get(API_OLIVES_URL, {
    withCredentials: true,
  });
};

export const addOlive = async (oliveData) => {
  return axios.post(API_OLIVES_URL, oliveData, {
    withCredentials: true,
  });
};







// import axios from "axios";

// const API_URL = "https://olive-api-v2.onrender.com/api/v1/auth";
// const API_OLIVES_URL = "https://olive-api-v2.onrender.com/api/v1/olives";



// export const signUp = async (userData) => {
//   return axios.post(`${API_URL}/sign-up`, userData, {
//     withCredentials: true,
//   });
// };

// export const signIn = async (credentials) => {
//   return axios.post(`${API_URL}/sign-in`, credentials, {
//     withCredentials: true,
//   });
// };

// export const signOut = async () => {
//   return axios.post(`${API_URL}/sign-out`, {}, { withCredentials: true });
// };

// export const refreshToken = async () => {
//   return axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
// };

// export const getOlives = async () => {
//   return axios.get(API_OLIVES_URL, {
//     withCredentials: true,
//   });
// };

// export const addOlive = async (oliveData) => {
//   return axios.post(API_OLIVES_URL, oliveData, {
//     withCredentials: true,
//   });
// };


