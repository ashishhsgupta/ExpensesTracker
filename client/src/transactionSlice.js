import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (txn) => txn.id !== action.payload
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (txn) => txn.id === action.payload.id
      );
      if (index !== -1) state.transactions[index] = action.payload;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
