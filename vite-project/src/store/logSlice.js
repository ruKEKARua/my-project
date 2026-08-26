import { createSlice } from '@reduxjs/toolkit';
const logSlice = createSlice({
    name: 'log',
    initialState: {
        value: [],
    },
    reducers: {
        addLog: (state, action) => { // Экшн для добавления карты в массив, в игре это, например, приобритение карты игроком
            state.value.push(action.payload)
        },
        clearLog: (state) => {
            state.value = [];
        },
  },
});

export const { addLog, clearLog } = logSlice.actions;


// Экспортируем редюсер для стора
export default logSlice.reducer;