import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  id: number;
  name: string;
}

export interface UserSlice extends UserData { }

const initialState: UserSlice = {
    id: 0,
    name: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData: (state, action: PayloadAction<UserData>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    fetchUserDataAsync: (state) => {}
  },
});

export const {
    actions: userActions,
    reducer: userReducer
  } =
    userSlice;
