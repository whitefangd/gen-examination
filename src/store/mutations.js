

const mutations = {
    googleToken: function(state, token) {
        state.googleToken = token;
    },
    alertMessage: function(state, alert) {
        state.alertMessage.push(alert);
    },
    cleanAlertMessage: function(state) {
        state.alertMessage.length = 0;
        state.alertMessage.push(alert);
    }
}

export default mutations;