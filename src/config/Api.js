import axios from 'axios';
const defAxios = axios.create({
  baseURL: 'https://login.yogafitidonline.com/api/api/',
});
const Api = {
  slider(payload) {
    let url = '/auth/slider';
    return defAxios.get(url, payload);
  },
  studio(payload) {
    let url = '/auth/get_studio';
    return defAxios.get(url, payload);
  },
  login(payload) {
    let url = '/auth/login';
    return defAxios.post(url, payload);
  },
  myBooking(payload, token) {
    let url = '/member/my_booking';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  mySchedule(payload, token) {
    let url = '/auth/get_users_schedule'+payload;
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  bookingClass(payload, token) {
    let url = '/member/booking_class';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  myContract(payload, token) {
    let url = '/member/my_contract';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
};
export default Api;
