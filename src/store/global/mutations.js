export function cleanAll(state) {
  state.token = "";
  state.username = "";
  state.isLogin = false;
}

export function logout(state) {
  state.token = "";
  state.username = "";
  state.isLogin = false;
  state.privateInfo = "";
}

export function setUsername(state, username) {
  state.username = username;
}

export function setToken(state, token) {
  state.token = token;
}

export function setIsLogin(state, isLogin) {
  state.isLogin = isLogin;
}

export function setPrivateInfo(state, privateInfo) {
  state.privateInfo = privateInfo;
}
