
export default {
  state: {
    status: false,
    component: null
  },

  mutations: {
    UPD_STATUS_MODAL(state) {
      if (state.status) state.component = null; // clear child component modal
      state.status = !state.status;
    },

    SET_COMPONENT(state, component) {
      state.component = component
    }

  },
  actions: {
  },
  getters: {
  }
}