import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  StatusBar 
} from 'react-native';
import {useState} from 'react';
import Class from '../screen/Class';
import Home from '../screen/Home';
import Intro from '../screen/Intro';
import Login from '../screen/Login';
import Profile from '../screen/Profile';
import Trainer from '../screen/Trainer';
import Nav from '../components/Navigation';
import Header from '../components/Header';
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const options = {
  ...TransitionPresets.SlideFromRightIOS,
};
export const RouteMain = ({navigation}) => {
  let [activeHeader, setActiveHeader] = useState('Home');
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
  return (
    <>
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
      </AuthStack.Navigator>
      <Nav navigation={navigation} activeScreen={activeScreen} />
    </>
  );
};
