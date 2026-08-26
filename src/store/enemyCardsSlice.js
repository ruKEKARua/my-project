import { createSlice } from '@reduxjs/toolkit';

const enemyCardsSlice = createSlice({
  name: 'enemyCards',
  initialState: {
    value: [],
  },
  reducers: {
    addEnemyCard: (state, action) => {
      const card = action.payload;
      if (!card || !card.id) return;

      const isAlreadyAdded = state.value.some((item) => item.id === card.id);
      if (!isAlreadyAdded) {
        state.value.push(card);
      }
    },
    removeEnemyCard: (state, action) => { // Экшн для удаления карты из массива, в игре это, например, продажа карты игроком
      
        state.value = state.value.filter((card) => card.id !== action.payload.id);

    },

  },
});

// Экспортируем экшены для использования в компонентах
export const { addEnemyCard, removeEnemyCard } = enemyCardsSlice.actions;

// Экспортируем редюсер для стора
export default enemyCardsSlice.reducer;