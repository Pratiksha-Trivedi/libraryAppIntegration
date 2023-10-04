import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
  name: 'libraries',
  initialState: [],
  reducers: {
    setLibraries: (state, action) => {
      return action.payload;
    },
    addLibrary: (state, action) => {
      state.push(action.payload);
    },
    updateLibrary: (state, action) => {
      const index = state.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteLibrary: (state, action) => {
      const libraryId = action.payload;
      return state.filter(library => library.id !== libraryId);
    }
  },
});

export const { setLibraries, addLibrary, deleteLibrary, updateLibrary } = librarySlice.actions;
export default librarySlice.reducer;
