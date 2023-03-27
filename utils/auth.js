export const handleLogin = (login, setLogin) => {
  if (!login) {
    setLogin(true);
  } else {
    setLogin(false);
  }
};

export const handleSignUp = (signUp, setSignUp) => {
  if (!signUp) {
    setSignUp(true);
  } else {
    setSignUp(false);
  }
};
