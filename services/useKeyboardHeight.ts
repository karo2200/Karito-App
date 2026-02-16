import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';

const isIos = Platform.OS === 'ios';

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardShow = isIos ? 'keyboardWillShow' : 'keyboardDidShow';
  const keyboardHide = isIos ? 'keyboardWillHide' : 'keyboardDidHide';

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener(
      keyboardShow,
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      keyboardHide,
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
};
