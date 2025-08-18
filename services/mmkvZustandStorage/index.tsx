import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

const statesStorage = new MMKV({
  id: 'states-storage',
});

const mmkvStatesStorage: StateStorage = {
  setItem: (name, value) => {
    return statesStorage.set(name, value);
  },
  getItem: name => {
    const value = statesStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return statesStorage.delete(name);
  },
};

const authStorage = new MMKV({
  id: 'auth-storage',
  encryptionKey: 'hunter2',
});

const mmkvAuthStorage: StateStorage = {
  setItem: (name, value) => {
    try {
      authStorage.set(name, JSON.stringify(value));
    } catch (error) {
      // error reading value
    }
  },
  getItem: name => {
    let res = null;
    try {
      const value = authStorage.getString(name);
      value && (res = JSON.parse(value));
    } catch (error) {
      // error reading value
    }
    return res;
  },
  removeItem: name => {
    try {
      return authStorage.delete(name);
    } catch (error) {
      // error reading value
    }
  },
};

export default {mmkvStatesStorage, mmkvAuthStorage};
