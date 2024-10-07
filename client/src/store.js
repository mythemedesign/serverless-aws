import { configureStore, createSlice ,combineReducers,   createAsyncThunk, isPending, isRejected, isFulfilled, current } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import axios from "axios"
import { BASE_URL, POSTFIX, RESOUCE } from './api';

const baseUrl = BASE_URL + POSTFIX + RESOUCE;

const fetchNotes = createAsyncThunk("fetchNotes" , async  ( _args, { rejectWithValue, dispatch }) => {
  try {
  console.log(baseUrl)
  const res = await axios.get(baseUrl, {
    headers: {
      app_user_id: localStorage.getItem("tokenId")
    }
  });
  if(res.status === 200) {
    return res.data.notes;
  } else rejectWithValue(res)
} catch(e) { 
  rejectWithValue(e)
}
});

const addNote = createAsyncThunk("addNote" , async  ( noteToAdd, { rejectWithValue, dispatch }) => {
  try {
  const res = await axios.post(baseUrl, noteToAdd ,
  {
    headers: {
      app_user_id: localStorage.getItem("tokenId")
    }
  });
  if(res.status === 200) {
    dispatch(globalAction.isModalOpen());
    await dispatch(fetchNotes());
    return res.data.notes;
  } else rejectWithValue(res)
} catch(e) { 
  rejectWithValue(e)
}
});

const deleteNote = createAsyncThunk("deleteNote" , async  ( noteId, { rejectWithValue, dispatch }) => {
  try {
  const res = await axios.delete(`${baseUrl}/`+noteId, 
  {
    headers: {
      app_user_id: localStorage.getItem("tokenId")
    }
  });
  if(res.status === 200) {
    await dispatch(fetchNotes());
    return res.data.notes;
  } else rejectWithValue(res)
} catch(e) { 
  rejectWithValue(e)
}
});

const updateNote = createAsyncThunk("updateNote" , async  ( noteToUpdate, { rejectWithValue, dispatch }) => {
  try {
  const res = await axios.patch(`${baseUrl}/`+ noteToUpdate.noteId ,
  noteToUpdate,
  {
    headers: {
      app_user_id: localStorage.getItem("tokenId")
    }
  });
  if(res.status === 200) {
    await dispatch(fetchNotes());
    dispatch(globalAction.isModalOpen());
    return res.data.notes
  } else rejectWithValue(res)
} catch(e) { 
  rejectWithValue(e)
}
});

const getNoteById = createAsyncThunk("updateNote" , async  ( noteId, { rejectWithValue, dispatch }) => {
  try {
  const res = await axios.get(`${baseUrl}/`+ noteId ,
  {
    headers: {
      app_user_id: localStorage.getItem("tokenId")
    }
  });
  return res.status === 200 ?  res.data.note : rejectWithValue(res)
} catch(e) { 
  rejectWithValue(e)
}
});

export const thunks = {
  notes : {
    fetchNotes,
    addNote,
    deleteNote,
    updateNote,
    getNoteById,
  }
}

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes : [],
    noteToAdd : {
        title: "",
        category: "",
        description: "",
        date: "",
        time: ""
    },
    noteToUpdate : {
        title: "",
        category: "",
        description: "",
        date: "",
        time: ""
    }
  },
  reducers: {
    noteAdded: (state) => {
      return state
    },
    setNoteToAdd:(state, action) => {
      const noteToAdd = current(state.noteToAdd);
      const field = action.payload;
      state.noteToAdd = {...noteToAdd, ...field}
    
    },
    setNoteToUpdate:(state, action) => {
      const noteToUpdate = current(state.noteToUpdate);
      const field = action.payload;
      state.noteToUpdate = {...noteToUpdate, ...field}
    }
  },
  extraReducers: {
    [thunks.notes.fetchNotes.fulfilled]: (state , action) => {
      state.notes = action.payload;
    },
    [thunks.notes.addNote.fulfilled]: (state , action) => {
      const currentState = current(state);
      return {
        ...currentState,
        noteToAdd: {
          title: "",
          category: "",
          description: "",
          date: "",
          time: ""
      }
      }
     
    },
    [thunks.notes.getNoteById.fulfilled]: (state , action) => {
      const currentState = current(state);
      return {
        ...currentState,
        noteToUpdate: action.payload
      }
     
    }
  }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
      user : {
        userName: ""
      },
      awsCred: {
        
      },
      IdentityId: ""
    },
    reducers: {
      setUser: (state ,action) => {
        state.user.userName = action.payload
      },
      setTokens: (state, action) => {
        const {IdentityId , Credentials } = action.payload;
        state.awsCred = Credentials;
        state.IdentityId = IdentityId;
      }
    }
});

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    loading: false,
    isModalOpen: false,
    error: {}
  },
  reducers: {
    isLoading: (state) => { state.loading = true; },
    isError: (state, action) => { state.error = action.payload; },
    isModalOpen: (state) => { state.isModalOpen = !state.isModalOpen; }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
       state.loading = true;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.error = action.payload;
   });
   builder.addMatcher(isFulfilled, (state, action) => {
    state.loading = false;
    // state.isModalOpen = false;
 });
  }
});

export default configureStore({
  reducer: combineReducers({
    note : noteSlice.reducer,
    user : userSlice.reducer,
    global: globalSlice.reducer
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export const notesAction = noteSlice.actions;
export const userAction = userSlice.actions;
export const globalAction = globalSlice.actions;
