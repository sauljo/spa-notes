import Vue from 'vue'
import Vuex from 'vuex'
import modal from '../components/Modal/modal'
import confirmAction from '../components/ConfirmAction/confirmAction'
import notes from '../components/Notes/notes'
import note from '../components/Note/note'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
    confirmAction,
    notes,
    note
  }
})
