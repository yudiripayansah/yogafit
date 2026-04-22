import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import {useEffect, useContext} from 'react';
const defAxios = axios.create({
  baseURL: 'https://api.yogafitidonline.com/api/',
});
const useSetupAxiosInterceptors = (navigation) => {
  const { removeUser } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = defAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 403) {
            removeUser();
            navigation.navigate('Home')
            console.error('Error: Forbidden (403) - You do not have access to this resource.');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove interceptor on cleanup
      defAxios.interceptors.response.eject(interceptor);
    };
  }, [removeUser]);
};
const Api = {
  region(payload) {
    let url = '/auth/get_regions';
    return defAxios.get(url, payload);
  },
  slider(payload) {
    let url = '/auth/slider';
    return defAxios.get(url, payload);
  },
  studio(payload) {
    let url = '/auth/get_studio';
    if(payload)
      url = url + '?id_region='+ payload
    return defAxios.get(url, payload);
  },
  login(payload) {
    let url = '/auth/login';
    return defAxios.post(url, payload);
  },
  updateProfile(payload, token) { 
    let url = '/member/update_profile';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
      body: payload
    };
    return defAxios.post(url,payload, config);
  },
  register(payload) {
    let url = '/auth/register';
    return defAxios.post(url, payload);
  },
  getuserotp(payload) {
    let url = '/auth/get_users_otp';
    return defAxios.post(url, payload);
  },
  updatePhone(payload) {
    let url = '/auth/edit_hp';
    return defAxios.post(url, payload);
  },
  resendOtp(payload) {
    let url = '/auth/resend_otp';
    return defAxios.post(url, payload);
  },
  cekotp(payload) {
    let url = '/auth/cek_otp';
    return defAxios.post(url, payload);
  },
  cekoptwithbooking(payload) {
    let url = '/auth/booking ';
    return defAxios.post(url, payload);
  },
  forgot(payload) {
    let url = '/auth/forgot';
    return defAxios.post(url, payload);
  },
  myBooking(payload, token) {
    let url = '/member/my_booking';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  getNotifSettings(payload, token) {
    let url = '/member/get_notification-setting';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  updateNotifSettings(payload, token) {
    let url = '/member/update_notification-setting';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url,payload, config);
  },
  myBookingHistory(payload, token) {
    let url = '/member/my_booking_history';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  mySchedule(payload, token) {
    let url = '/auth/get_users_schedule?'+payload;
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  myScheduleExp(payload, token) {
    let url = '/auth/get_users_schedule_experience?'+payload;
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
  getInstructor(token) {
    let url = '/member/get_instructor';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  myProfile(token) {
    let url = '/member/my_profile';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  myActivity(token) {
    let url = '/member/my_activity';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  trialContract(token) {
    let url = '/member/my_contract_trial';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  deleteAccount(token) {
    let url = '/member/delete_account';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, {}, config);
  },
  myContract(payload, token) {
    let url = '/member/my_contract';
    if(payload){
      url += `?id=${payload.id}`
    }
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  classes(payload) {
    let url = '/auth/get_class?'+payload;
    return defAxios.get(url);
  },
  studioDetail(payload) {
    let url = '/auth/get_studio?'+payload;
    return defAxios.get(url);
  },
  teacherDetail(payload) {
    let url = '/auth/get_teacher_active?'+payload;
    return defAxios.get(url);
  },
  classesDetail(payload) {
    let url = '/auth/get_class';
    return defAxios.get(url, payload);
  },
  workshop(payload) {
    let url = '/auth/get_workshop';
    return defAxios.get(url, payload);
  },
  course(payload) {
    let url = '/auth/get_course';
    return defAxios.get(url, payload);
  },
  event(payload) {
    let url = '/auth/get_event';
    return defAxios.get(url, payload);
  },
  trainer(payload) {
    let url = '/auth/get_teacher_active';
    return defAxios.get(url, payload);
  },
  classLevel(payload) {
    let url = '/auth/get_class_level';
    return defAxios.get(url, payload);
  },
  faq(token) {
    let url = '/member/get_faq';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.get(url, config);
  },
  changePassword(payload,token) {
    let url = '/member/change_password';
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return defAxios.post(url, payload, config);
  },
  countryCode() {
    let url = '/auth/get_kode_negara';
    return defAxios.get(url);
  },
  specialOffer() {
    let url = '/auth/special_offer';
    return defAxios.get(url);
  },
  article() {
    let url = '/auth/article';
    return defAxios.get(url);
  }
};
export {Api, useSetupAxiosInterceptors};