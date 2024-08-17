// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     email: localStorage.getItem('userEmail') || null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.email = action.payload;
//       localStorage.setItem('userEmail', action.payload);
//     },
//     clearUser: (state) => {
//       state.email = null;
//       localStorage.removeItem('userEmail');
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: localStorage.getItem('userEmail') || null,
    userId: localStorage.getItem('userId') || null, // Add userId to state
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.userId = action.payload.userId; // Save userId in state
      localStorage.setItem('userEmail', action.payload.email);
      localStorage.setItem('userId', action.payload.userId); // Save userId in localStorage
    },
    clearUser: (state) => {
      state.email = null;
      state.userId = null; // Clear userId from state
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId'); // Clear userId from localStorage
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     email: localStorage.getItem('userEmail') || null,
//     userId: localStorage.getItem('userId') || null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.email = action.payload.email;
//       state.userId = action.payload.userId;
//       localStorage.setItem('userEmail', action.payload.email);
//       localStorage.setItem('userId', action.payload.userId);
//     },
//     clearUser: (state) => {
//       state.email = null;
//       state.userId = null;
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('userId');
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;