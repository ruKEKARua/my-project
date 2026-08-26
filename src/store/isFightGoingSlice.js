import { createSlice } from '@reduxjs/toolkit';

const isFightGoingSlice = createSlice({
  name: 'isFightGoing',
  initialState: {
    value: false, 
  },
  reducers: {
    changeFightGoing: (state) => {
      
        state.value = !state.value


    },
  },
});

// Экспортируем экшены для использования в компонентах
export const { changeFightGoing } = isFightGoingSlice.actions;

// Экспортируем редюсер для стора
export default isFightGoingSlice.reducer;