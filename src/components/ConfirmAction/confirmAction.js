
export default {
  state: {
    title: '',
    typeAction: ''
  },

  mutations: {
    SET_CONFIRM_ACTIONS_PROPS(state, {...props}) {
      for (let key in props) {
        state[key] = props[key];
      }
    }

  },
  actions: {
  },
  getters: {
  }
}