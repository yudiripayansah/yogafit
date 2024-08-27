import React, {useEffect, useContext} from 'react';
import {
  View
} from 'react-native';
import axios from 'axios';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
const Class = ({navigation}) => {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  useEffect(() => {

  }, []);
  return (
    <View style={[t.bgblack]}>
    </View>
  );
};

export default Class;
