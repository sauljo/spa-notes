
const notes = JSON.parse(localStorage.getItem('notes'));
export default {
  state: {
    notes: notes || [],
    idNoteSelected: null
  },

  mutations: {

    ID__NOTE_SELECTED(state, id) {
      state.idNoteSelected = id
    },

    SAVE_NOTE(state, {note, idEdit}) {
      if (idEdit) { 
        state.notes = state.notes.map(item => {
          if (item.id === idEdit) return note;
          else return item;
        });  
      } else { 
        state.notes = [...state.notes, note];
      }
      localStorage.setItem('notes', JSON.stringify(state.notes || []));  
    },

    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter(item => item.id !== id);
      localStorage.setItem('notes', JSON.stringify(state.notes || []));  
    }
  },

  actions: {
  },

}