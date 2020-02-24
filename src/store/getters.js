const getters = {
  firebase: function(state) {
    return state.firebase;
  },
  firebaseAuth: function(state) {
    return state.firebaseAuth;
  },
  alertMessage: function(state) {
    return state.alertMessage;
  },
  googleToken: function(state) {
    return state.googleToken;
  }
};
export default getters;