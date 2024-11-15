import React, {useEffect, useContext, useRef, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import ActionSheet from 'react-native-actions-sheet';
// assets
import img from '../config/Image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// API
import {Api} from '../config/Api';
function DeleteAccount({navigation, ...props}) {
  const t = useContext(ThemeContext);
  const user = useContext(UserContext);
  const {removeUser} = useContext(AuthContext);
  const {deleteRef} = props;
  const [loading, setLoading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState({
    status: true,
    msg: null,
    data: null,
  });
  const doDeleteAccount = async () => {
    setLoading(true);
    try {
      let req = await Api.deleteAccount(user.token);
      if (req.status === 200) {
        setDeleteAccount({
          status: true,
          msg: 'Successfully delete account',
        });
        setTimeout(() => {
          removeUser();
          navigation.navigate('Home');
          setDeleteAccount({
            status: true,
            msg: null,
            data: null,
          });
        }, 3000);
      } else {
        setDeleteAccount({
          status: false,
          msg: 'Failed to delete account',
          data: null,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error delete account: ' + error);
      setDeleteAccount({
        status: false,
        msg: 'Failed to delete account. ' + error,
      });
      setLoading(false);
    }
  };
  return (
    <ActionSheet ref={deleteRef}>
      <View style={[t.bgwhite, t.wp100, t.px20, t.py20, t.brtl10, t.brtr10]}>
        <TouchableOpacity
          onPress={() => deleteRef.current?.hide()}
          style={[t.msAuto]}>
          <Image source={img.close} style={[t.w15, t.h15]} />
        </TouchableOpacity>
        <View style={[t.fjCenter, t.faCenter]}>
          <Image source={img.warningRed} style={[t.w100, t.h100]} />
        </View>
        <Text style={[t['p20-600'], t.cblack, t.tCenter]}>
          Ketentuan Hapus Akun
        </Text>
        <View
          style={[
            t.bgwarning,
            t.p15,
            t.mt20,
            t.br5,
            t.bw1,
            t.bsolid,
            t.borange,
          ]}>
          <Text style={[t['p12-500'], t.cblack]}>
            - Semua membership yang terdaftar di akun kamu akan terhapus
          </Text>
          <Text style={[t['p12-500'], t.cblack, t.mt10]}>
            - Setelah kamu berhasil menghapus akun, kamu tidak bisa untuk masuk
            kembali ke akun tersebut dan melihat riwayat transaksi yang lalu.
          </Text>
        </View>
        <View style={[t.fRow, t.fjBetween, t.faCenter, t.mt20]}>
          <Pressable
            style={[t.bgorange, t.faCenter, t.fjCenter, t.wp49, t.py10, t.br5]}
            onPress={() => {
              doDeleteAccount();
            }}>
            <Text style={[t['p14-700'], t.cwhite]}>
              {loading ? 'Processing...' : 'Lanjutkan'}
            </Text>
          </Pressable>
          <Pressable
            style={[t.bggreya, t.faCenter, t.fjCenter, t.wp49, t.py10, t.br5]}
            onPress={() => {
              deleteRef.current?.hide();
            }}>
            <Text style={[t['p14-700'], t.cwhite]}>Batal</Text>
          </Pressable>
        </View>
        <View style={[t.faCenter, t.fjCenter, t.mt5]}>
          <Text
            style={[
              t['p12-500'],
              t.tCenter,
              deleteAccount.status ? t.cblack : t.cdanger,
            ]}>
            {deleteAccount.msg}
          </Text>
        </View>
      </View>
    </ActionSheet>
  );
}

export default DeleteAccount;
