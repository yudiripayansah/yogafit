import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useState,useRef, useEffect} from 'react';
import BookingHistory from '../screen/BookingHistory';
import BookingUpcoming from '../screen/BookingUpcoming';
import Class from '../screen/Class';
import Classes from '../screen/Classes';
import Courses from '../screen/Courses';
import Detail from '../screen/Detail';
import DetailClass from '../screen/DetailClass';
import Events from '../screen/Events';
import Faq from '../screen/Faq';
import Home from '../screen/Home';
import Intro from '../screen/Intro';
import Login from '../screen/Login';
import Location from '../screen/Location';
import MyContract from '../screen/MyContract';
import MyContractDetail from '../screen/MyContractDetail';
import MyDetailActivity from '../screen/MyDetailActivity';
import MyProfile from '../screen/MyProfile';
import Profile from '../screen/Profile';
import Trainer from '../screen/Trainer';
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
  useEffect(() => {
    
  },[])
  return (
    <>
      <LoginModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} forgotRef={forgotRef}/>
      <ForgotModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} forgotRef={forgotRef}/>
      <VerifyModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <ChangePhoneModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <RegisterModal changephoneRef={changephoneRef} verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} onRegister={(data) => {setregisterdata(data)}}/>
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
        <MainStack.Screen name={'Home'} component={Home} options={options} />
        <MainStack.Screen name={'BookingHistory'} component={BookingHistory} options={options} />
        <MainStack.Screen name={'BookingUpcoming'} component={BookingUpcoming} options={options} />
        <MainStack.Screen name={'Class'} component={Class} options={options} />
        <MainStack.Screen name={'Classes'} component={Classes} options={options} />
        <MainStack.Screen name={'Detail'} component={Detail} options={options} />
        <MainStack.Screen name={'DetailClass'} component={DetailClass} options={options} />
        <MainStack.Screen name={'Trainer'} component={Trainer} options={options} />
        <MainStack.Screen name={'Profile'} component={Profile} options={options} />
        <MainStack.Screen name={'Intro'} component={Intro} options={options} />
        <MainStack.Screen name={'Login'} component={Login} options={options} />
        <MainStack.Screen name={'Location'} component={Location} options={options} />
        <MainStack.Screen name={'MyContract'} component={MyContract} options={options} />
        <MainStack.Screen name={'MyContractDetail'} component={MyContractDetail} options={options} />
        <MainStack.Screen name={'MyDetailActivity'} component={MyDetailActivity} options={options} />
        <MainStack.Screen name={'MyProfile'} component={MyProfile} options={options} />
        <MainStack.Screen name={'Courses'} component={Courses} options={options} />
        <MainStack.Screen name={'Events'} component={Events} options={options} />
        <MainStack.Screen name={'Faq'} component={Faq} options={options} />
        <MainStack.Screen name={'Workshop'} component={Workshop} options={options} />
        <MainStack.Screen name={'YogaInstructor'} component={YogaInstructor} options={options} />
      </MainStack.Navigator>
      <Nav navigation={navigation} activeScreen={activeScreen} onPressMainBtn={openLogin}/>
    </>
  );
};
