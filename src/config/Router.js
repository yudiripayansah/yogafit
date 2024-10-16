import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  StatusBar 
} from 'react-native';
import {useState,useRef} from 'react';
import BookingHistory from '../screen/BookingHistory';
import BookingUpcoming from '../screen/BookingUpcoming';
import Class from '../screen/Class';
import Classes from '../screen/Classes';
import Courses from '../screen/Courses';
import Detail from '../screen/Detail';
import DetailClass from '../screen/DetailClass';
import Events from '../screen/Events';
import Home from '../screen/Home';
import Intro from '../screen/Intro';
import Login from '../screen/Login';
import Location from '../screen/Location';
import MyContract from '../screen/MyContract';
import Profile from '../screen/Profile';
import Trainer from '../screen/Trainer';
import Workshop from '../screen/Workshop';
import Nav from '../components/Navigation';
import Header from '../components/Header';
import LoginModal from '../components/Login'
import VerifyModal from '../components/Verify'
import RegisterModal from '../components/Register'
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const options = {
  ...TransitionPresets.SlideFromRightIOS,
};
export const RouteMain = ({navigation}) => {
  let [activeScreen, setActiveScreen] = useState('Home');
  const loginRef = useRef(null);
  const verifyRef = useRef(null);
  const registerRef = useRef(null);
  const [registerdata,setregisterdata] = useState({})
  const openLogin = () => {
    loginRef.current?.show();
  };

  const openVerify = () => {
    verifyRef.current?.show();
  };
  return (
    <>
      <LoginModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef}/>
      <VerifyModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} registerdata={registerdata}/>
      <RegisterModal verifyRef={verifyRef} loginRef={loginRef} registerRef={registerRef} onRegister={(data) => {setregisterdata(data)}}/>
      <AuthStack.Navigator
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
        <AuthStack.Screen name={'Home'} component={Home} options={options} />
        <AuthStack.Screen name={'BookingHistory'} component={BookingHistory} options={options} />
        <AuthStack.Screen name={'BookingUpcoming'} component={BookingUpcoming} options={options} />
        <AuthStack.Screen name={'Class'} component={Class} options={options} />
        <AuthStack.Screen name={'Classes'} component={Classes} options={options} />
        <AuthStack.Screen name={'Detail'} component={Detail} options={options} />
        <AuthStack.Screen name={'DetailClass'} component={DetailClass} options={options} />
        <AuthStack.Screen name={'Trainer'} component={Trainer} options={options} />
        <AuthStack.Screen name={'Profile'} component={Profile} options={options} />
        <AuthStack.Screen name={'Intro'} component={Intro} options={options} />
        <AuthStack.Screen name={'Login'} component={Login} options={options} />
        <AuthStack.Screen name={'Location'} component={Location} options={options} />
        <AuthStack.Screen name={'MyContract'} component={MyContract} options={options} />
        <AuthStack.Screen name={'Courses'} component={Courses} options={options} />
        <AuthStack.Screen name={'Events'} component={Events} options={options} />
        <AuthStack.Screen name={'Workshop'} component={Workshop} options={options} />
      </AuthStack.Navigator>
      <Nav navigation={navigation} activeScreen={activeScreen} onPressMainBtn={openLogin}/>
    </>
  );
};
