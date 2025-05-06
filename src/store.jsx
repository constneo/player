import {createContext, useContext, useState} from 'react';
import {UserInfo} from './types';

export const StoreContext = createContext({
  address: 'http://navidrome.lan',
  setAddress: value => {},
  username: 'neo',
  setUsername: value => {},
  password: 'neo',
  setPassword: value => {},
});

export const useStore = () => {
  // const [address, setAddress] = useState('http://navidrome.lan');
  // const [username, setUsername] = useState('neo');
  // const [password, setPassword] = useState('neo');

  // return {
  //   address,
  //   setAddress,
  //   username,
  //   setUsername,
  //   password,
  //   setPassword,
  // };

  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [address, setAddress] = useState('http://navidrome.lan');
  const [username, setUsername] = useState('neo');
  const [password, setPassword] = useState('neo');

  return (
    <StoreContext.Provider
      value={{
        address,
        setAddress,
        username,
        setUsername,
        password,
        setPassword,
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useUserInfo = () => {
  const [userInfo, setUserInfo] =
    useState <
    UserInfo >
    {
      name: '',
      id: '',
      isAdmin: false,
      lastFMApiKey: '',
      subsonicSalt: '',
      subsonicToken: '',
      token: '',
      username: '',
    };

  return {
    userInfo,
    setUserInfo,
  };
};
