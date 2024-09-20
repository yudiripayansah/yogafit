import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  StatusBar 
} from 'react-native';
import {useState,useRef} from 'react';
import Class from '../screen/Class';
import Courses from '../screen/Courses';
import Events from '../screen/Events';
import Home from '../screen/Home';
import Intro from '../screen/Intro';
import Login from '../screen/Login';
import Location from '../screen/Location';
import Profile from '../screen/Profile';
import Trainer from '../screen/Trainer';
import Workshop from '../screen/Workshop';
import Nav from '../components/Navigation';
import Header from '../components/Header';
import LoginModal from '../components/Login'
import VerifyModal from '../components/Verify'
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const options = {
  ...TransitionPresets.SlideFromRightIOS,
};
export const RouteMain = ({navigation}) => {
  let [activeHeader, setActiveHeader] = useState('Home');
  return (
    <>
      {/* <Header navigation={navigation} currentScreen={activeHeader} /> */}
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        screenListeners={({navigation}) => ({
          state: e => {
            let index = e.data.state.index;
            let routes = e.data.state.routes;
            let routeName = routes[index].name;
            setActiveHeader(routeName);
          },
        })}
        initialRouteName={'Home'}>
        <MainStack.Screen name={'Home'} component={Home} options={options} />
      </MainStack.Navigator>
      <Nav navigation={navigation} currentScreen={activeHeader} />
    </>
  );
};
export const RouteAuth = ({navigation}) => {
  let [activeScreen, setActiveScreen] = useState('Home');
  const loginRef = useRef(null);

  const openLogin = () => {
    loginRef.current?.show();
    console.log(loginRef.current)
  };
  const verifyRef = useRef(null);

  const openVerify = () => {
    verifyRef.current?.show();
    console.log(verifyRef.current)
  };
  return (
    <>
      <LoginModal loginRef={loginRef} verifyRef={verifyRef}/>
      <VerifyModal verifyRef={verifyRef} loginRef={loginRef}/>
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
        <AuthStack.Screen name={'Class'} component={Class} options={options} />
        <AuthStack.Screen name={'Trainer'} component={Trainer} options={options} />
        <AuthStack.Screen name={'Profile'} component={Profile} options={options} />
        <AuthStack.Screen name={'Intro'} component={Intro} options={options} />
        <AuthStack.Screen name={'Login'} component={Login} options={options} />
        <AuthStack.Screen name={'Location'} component={Location} options={options} />
        <AuthStack.Screen name={'Courses'} component={Courses} options={options} />
        <AuthStack.Screen name={'Events'} component={Events} options={options} />
        <AuthStack.Screen name={'Workshop'} component={Workshop} options={options} />
      </AuthStack.Navigator>
      <Nav navigation={navigation} activeScreen={activeScreen} onPressMainBtn={openLogin}/>
    </>
  );
};
