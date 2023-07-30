import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { apiSlice } from '@/src/slices/pokemonApi';
import { dialogsReducer } from '@/src/slices/dialogs';

const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
  // devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useReduxSelector<RootState>;

export type AppDispatch = ThunkDispatch<any, any, Action>;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
