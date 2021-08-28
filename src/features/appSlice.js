import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counter/counterAPI';

const initialState = {                     //  initial state of state
  value: 0,
  status: 'idle',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    directName: null
  },

  reducers: {                                                 //two reducers are been initialized
    enterRoom: (state, action) => {
      // console.log('working', action)
      state.roomId = action.payload.roomId;                   
    },
    enterName: (state, action) => {
      state.directName = action.payload.directName
    }
  },
});

export const { enterRoom, enterName } = appSlice.actions;                                //exporting reducer
export const selectRoomId = (state) => state.app.roomId;
export const selectDirectName = (state) => state.app.directName;
export default appSlice.reducer;
