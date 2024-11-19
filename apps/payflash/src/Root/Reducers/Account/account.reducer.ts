// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  accountUser: string | null;
}

const initialState: AccountState = {
  accountUser: 'nguyen thanh se',
};

const accountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<string | null>) {
      state.accountUser = action.payload;
    },
    clearAccount(state) {
      state.accountUser = null;
    },
  },
});

export const { setAccount, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
