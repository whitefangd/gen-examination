

const mutations = {
    googleToken: function (context, token) {
        context.commit('googleToken', token);
    },
    pushError: function (context, detail) {
        context.commit('cleanAlertMessage');
        context.commit('alertMessage', {
            type: "ERROR",
            message: detail.message,
            detail: detail
        });
    }
}

export default mutations;