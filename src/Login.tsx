import {useNavigation} from '@react-navigation/native';
import {useStore} from './store';
import {Button, View} from 'react-native';
import BaseText from './components/BaseText';
import BaseInput from './components/BaseInput';
import {setBaseUrl, setToken, setUserInfo} from './storage';
import {login} from './api/auth';
import {useAuth} from './Auth';
import {safePadding} from './constants';

export default function () {
  const {address, setAddress, username, setUsername, password, setPassword} =
    useStore();

  const navigation = useNavigation();

  const {login: authLogin} = useAuth();

  return (
    <View
      style={{
        height: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: safePadding,
          width: 500,
        }}>
        <BaseText>地址</BaseText>
        <BaseInput
          style={{height: 40}}
          focusable={true}
          placeholder="输入地址"
          onChangeText={text => setAddress(text)}
          defaultValue={address}
        />

        <BaseText>用户名</BaseText>
        <BaseInput
          focusable={true}
          style={{height: 40}}
          placeholder="Type here to username."
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />

        <BaseText>密码</BaseText>
        <BaseInput
          focusable={true}
          style={{height: 40}}
          placeholder="Type here to password."
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />

        <Button
          nextFocusDown={0}
          title={'登录'}
          onPress={async () => {
            try {
              await setBaseUrl(address);

              const res = await login({username, password});
              console.log(res);
              await setUserInfo(res.data);
              await setToken(res.data.token);
              authLogin(res.data.token);
            } catch (error) {
              console.log(error);
            }
          }}></Button>
      </View>
    </View>
  );
}
