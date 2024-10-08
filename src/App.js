import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteMain} from './config/Router';
import {ThemeContext} from './context/ThemeContext';
import {UserContext} from './context/UserContext';
import {AuthContext} from './context/AuthContext';
import Style from './config/Style';
import Splash from './screen/Splash';
import {useAuth} from './hook/useAuth';
import usePushNotification from './hook/usePushNotification';
const App = ({}) => {
  const {requestUserPermission} = usePushNotification();
  const RootStack = createStackNavigator();
  const [appState, setAppState] = useState(AppState.currentState);
  const [loading, setLoading] = useState(true);
  const {auth, state} = useAuth();
  const renderRoute = () => {
    if (loading) {
      return <RootStack.Screen name={'SplashScreen'} component={Splash} />;
    } else {
      return (
        <RootStack.Screen name={'RouteMain'}>
          {({navigation}) => (
            <UserContext.Provider value={state.user}>
              <RouteMain navigation={navigation} />
            </UserContext.Provider>
          )}
        </RootStack.Screen>
      );
    }
  };
  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      console.log('App has gone to the background or minimized!');
    }
    setAppState(nextAppState);
  };
  const listenToNotifications = () => {
    try {
      requestUserPermission();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    listenToNotifications();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    handleAppStateChange;
    AppState.addEventListener('change', handleAppStateChange);
    return () => {};
  }, [appState]);

  return (
    <ThemeContext.Provider value={Style}>
        <AuthContext.Provider value={auth}>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: true,
              }}>
              {renderRoute()}
            </RootStack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
