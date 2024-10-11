import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteMain} from './config/Router';
import {ThemeContext} from './context/ThemeContext';
import {UserContext} from './context/UserContext';
import {AuthContext} from './context/AuthContext';
import {LocContext} from './context/LocContext';
import {LocationContext} from './context/LocationContext';
import Style from './config/Style';
import Splash from './screen/Splash';
import {useAuth} from './hook/useAuth';
import usePushNotification from './hook/usePushNotification';
import {PermissionsAndroid, Platform} from 'react-native';
const App = ({}) => {
  const {requestUserPermission} = usePushNotification();
  const RootStack = createStackNavigator();
  const [appState, setAppState] = useState(AppState.currentState);
  const [loading, setLoading] = useState(true);
  const {loc, auth, state} = useAuth();
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can access the location");
        } else {
          console.log("Location permission denied");
        }
      }
    } catch (err) {
      console.warn("Failed to request location permission", err);
    }
  };
  const renderRoute = () => {
    if (loading) {
      return <RootStack.Screen name={'SplashScreen'} component={Splash} />;
    } else {
      return (
        <RootStack.Screen name={'RouteMain'}>
          {({navigation}) => (
            <LocationContext.Provider value={state.location}>
            <UserContext.Provider value={state.user}>
              <RouteMain navigation={navigation} />
            </UserContext.Provider>
            </LocationContext.Provider>
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
    requestLocationPermission();
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
        <LocContext.Provider value={loc}>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: true,
              }}>
              {renderRoute()}
            </RootStack.Navigator>
          </NavigationContainer>
        </LocContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
