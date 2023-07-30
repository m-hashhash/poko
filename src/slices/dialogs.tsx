import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DIALOG_IDS } from '../constants';

const slice = createSlice({
  name: 'dialogs',
  initialState: {
    [DIALOG_IDS.POKEMON_DETAILS]: { show: false, name: 'POKEMON_DETAILS' }
  } as Record<string, { show: boolean; name: string; details: any }>,
  reducers: {
    showDialog(state, action: PayloadAction<{ id: string; details: any }>) {
      state[action.payload.id].show = true;
      state[action.payload.id].details = action.payload.details;
    },
    closeDialog(state, action: PayloadAction<string>) {
      state[action.payload].show = false;
    }
  }
});

export const dialogsReducer = slice.reducer;

export const dialogsActions = slice.actions;

export default slice;
