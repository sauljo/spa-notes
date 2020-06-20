
export default {
  state: {
    preNote: {}
  },

  mutations: {
    SET_PRE_NOTE(state, preNote) {
      state.preNote = preNote;
    },

    UPD_PRE_NOTE(state, props) {
      state.preNote = {...state.preNote, ...props}
    }
  },

  actions: {
  },
  getters: {
  
  }
}