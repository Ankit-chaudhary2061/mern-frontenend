import { configureStore } from "@reduxjs/toolkit";




const store = configureStore({
  reducer: {
    

  },
});

export default store;


// types for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;