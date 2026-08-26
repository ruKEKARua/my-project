import { createSlice } from '@reduxjs/toolkit';

const userCardsSlice = createSlice({
  name: 'userCards',
  initialState: {
    value: [],
  },
  reducers: {
    addUserCard: (state, action) => {
      const card = action.payload;
      if (!card || !card.id) return;

      const isAlreadyAdded = state.value.some((item) => item.id === card.id);
      if (!isAlreadyAdded) {
        state.value.push(card);
      }
    },
    removeUserCard: (state, action) => { // Экшн для удаления карты из массива, в игре это, например, продажа карты игроком
      
        state.value = state.value.filter((card) => card.id !== action.payload.id);

    },

  },
});

// Экспортируем экшены для использования в компонентах
export const { addUserCard, removeUserCard } = userCardsSlice.actions;

// Экспортируем редюсер для стора
export default userCardsSlice.reducer;