import noteServices from '../services/notes'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'TOGGLE_IMPORTANCE':
      console.log('state:', state)
      const id = action.data.id
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map((note) => (note.id !== id ? note : changedNote))
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteServices.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteServices.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}

export default noteReducer
