import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useState,useRef, useEffect} from 'react';
import Booking from '../screen/Booking';
import BookingHistory from '../screen/BookingHistory';
import BookingUpcoming from '../screen/BookingUpcoming';
import BookingConfirmation from '../screen/BookingConfirmation';
import BecomeInstructor from '../screen/BecomeInstructor';
import Class from '../screen/Class';
import Classes from '../screen/Classes';
import Courses from '../screen/Courses';
import ChoosePlan from '../screen/ChoosePlan';
import CheckinConfirmation from '../screen/CheckinConfirmation';
import Detail from '../screen/Detail';
import DetailClass from '../screen/DetailClass';
import DetailClassNew from '../screen/DetailClassNew';
import DetailCourseNew from '../screen/DetailCourseNew';
import DetailWorkshopNew from '../screen/DetailWorkshopNew';
import DetailEventNew from '../screen/DetailEventNew';
import DetailClassCheckin from '../screen/DetailClassCheckin';
import DetailArticle from '../screen/DetailArticle';
import Events from '../screen/Events';
import EditProfile from '../screen/EditProfile';
import MyActivity from '../screen/MyActivity';
import Faq from '../screen/Faq';
import FaqNew from '../screen/FaqNew';
import Home from '../screen/Home';
import Splash from '../screen/Splash';
import Intro from '../screen/Intro';
import InstructorDetail from '../screen/InstructorDetail';
import LoginRegister from '../screen/LoginRegister';
import Location from '../screen/Location';
import LeaveFeedback from '../screen/LeaveFeedback';
import MyContract from '../screen/MyContract';
import MyContractDetail from '../screen/MyContractDetail';
import MyDetailActivity from '../screen/MyDetailActivity';
import MembershipInfo from '../screen/MembershipInfo';
import MembershipPrevilage from '../screen/MembershipPrevilage';
import MyProfile from '../screen/MyProfile';
import Notification from '../screen/Notification';
import NotificationSettings from '../screen/NotificationSettings';
import OfferDetails from '../screen/OfferDetails';
import Profile from '../screen/Profile';
import ProfileNew from '../screen/ProfileNew';
import Rebook from '../screen/Rebook';
import StudioDetail from '../screen/StudioDetail';
import ScanQr from '../screen/ScanQr';
import Trainer from '../screen/Trainer';
import TrialClass from '../screen/TrialClass';
import Workshop from '../screen/Workshop';
import YogaInstructor from '../screen/YogaInstructor';
import Nav from '../components/Navigation';
import LoginModal from '../components/Login'
import VerifyModal from '../components/Verify'
import RegisterModal from '../components/Register'
import ForgotModal from '../components/Forgot'
import ChangePhoneModal from '../components/ChangePhone'
import {useSetupAxiosInterceptors} from '../config/Api'
const MainStack = createStackNavigator();
const options = {
  ...TransitionPresets.SlideFromRightIOS,
};
export const RouteMain = ({navigation}) => {
  useSetupAxiosInterceptors(navigation)
  let [activeScreen, setActiveScreen] = useState('Home');
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const forgotRef = useRef(null);
  const changephoneRef = useRef(null);
  const [registerdata,setregisterdata] = useState({})
  const openLogin = () => {
    loginRef.current?.show();
  };
  const openVerify = () => {
    verifyRef.current?.show();
  };
  const openRegister = () => {
    registerRef.current?.show();
  }
  return (
    <>
      <ForgotModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} forgotRef={forgotRef}/>
      <VerifyModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <ChangePhoneModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        screenListeners={({navigation}) => ({
          state: e => {
            let index = e.data.state.index;
            let routes = e.data.state.routes;
            let routeName = routes[index].name;
            setActiveScreen(routeName);
          },
        })}>
        <MainStack.Screen name={'Intro'} component={Intro} options={options} />
        <MainStack.Screen name={'LoginRegister'} component={LoginRegister} options={options}/>
        <MainStack.Screen name={'Home'} component={Home} options={options} />
        <MainStack.Screen name={'Booking'} component={Booking} options={options} />
        <MainStack.Screen name={'BookingHistory'} component={BookingHistory} options={options} />
        <MainStack.Screen name={'BookingUpcoming'} component={BookingUpcoming} options={options} />
        <MainStack.Screen name={'BookingConfirmation'} component={BookingConfirmation} options={options} />
        <MainStack.Screen name={'BecomeInstructor'} component={BecomeInstructor} options={options} />
        <MainStack.Screen name={'Class'} component={Class} options={options} />
        <MainStack.Screen name={'Classes'} component={Classes} options={options} />
        <MainStack.Screen name={'ChoosePlan'} component={ChoosePlan} options={options} />
        <MainStack.Screen name={'CheckinConfirmation'} component={CheckinConfirmation} options={options} />
        <MainStack.Screen name={'Detail'} component={Detail} options={options} />
        <MainStack.Screen name={'DetailClass'} component={DetailClass} options={options} />
        <MainStack.Screen name={'DetailClassNew'} component={DetailClassNew} options={options} />
        <MainStack.Screen name={'DetailCourseNew'} component={DetailCourseNew} options={options} />
        <MainStack.Screen name={'DetailWorkshopNew'} component={DetailWorkshopNew} options={options} />
        <MainStack.Screen name={'DetailEventNew'} component={DetailEventNew} options={options} />
        <MainStack.Screen name={'DetailClassCheckin'} component={DetailClassCheckin} options={options} />
        <MainStack.Screen name={'DetailArticle'} component={DetailArticle} options={options} />
        <MainStack.Screen name={'InstructorDetail'} component={InstructorDetail} options={options} />
        <MainStack.Screen name={'FaqNew'} component={FaqNew} options={options} />
        <MainStack.Screen name={'Rebook'} component={Rebook} options={options} />
        <MainStack.Screen name={'StudioDetail'} component={StudioDetail} options={options} />
        <MainStack.Screen name={'ScanQr'} component={ScanQr} options={options} />
        <MainStack.Screen name={'Trainer'} component={Trainer} options={options} />
        <MainStack.Screen name={'TrialClass'} component={TrialClass} options={options} />
        <MainStack.Screen name={'Profile'} component={Profile} options={options} />
        <MainStack.Screen name={'ProfileNew'} component={ProfileNew} options={options} />
        <MainStack.Screen name={'Location'} component={Location} options={options} />
        <MainStack.Screen name={'LeaveFeedback'} component={LeaveFeedback} options={options} />
        <MainStack.Screen name={'MyActivity'} component={MyActivity} options={options} />
        <MainStack.Screen name={'MyContract'} component={MyContract} options={options} />
        <MainStack.Screen name={'MyContractDetail'} component={MyContractDetail} options={options} />
        <MainStack.Screen name={'MyDetailActivity'} component={MyDetailActivity} options={options} />
        <MainStack.Screen name={'MembershipInfo'} component={MembershipInfo} options={options} />
        <MainStack.Screen name={'MembershipPrevilage'} component={MembershipPrevilage} options={options} />
        <MainStack.Screen name={'Notification'} component={Notification} options={options} />
        <MainStack.Screen name={'NotificationSettings'} component={NotificationSettings} options={options} />
        <MainStack.Screen name={'OfferDetails'} component={OfferDetails} options={options} />
        <MainStack.Screen name={'MyProfile'} component={MyProfile} options={options} />
        <MainStack.Screen name={'Courses'} component={Courses} options={options} />
        <MainStack.Screen name={'Events'} component={Events} options={options} />
        <MainStack.Screen name={'EditProfile'} component={EditProfile} options={options} />
        <MainStack.Screen name={'Faq'} component={Faq} options={options} />
        <MainStack.Screen name={'Workshop'} component={Workshop} options={options} />
        <MainStack.Screen name={'YogaInstructor'} component={YogaInstructor} options={options} />
      </MainStack.Navigator>
      <Nav navigation={navigation} activeScreen={activeScreen} onPressMainBtn={openLogin}/>
      <LoginModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} forgotRef={forgotRef}/>
      <RegisterModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} onRegister={(data) => {setregisterdata(data)}}/>
    </>
  );
};
