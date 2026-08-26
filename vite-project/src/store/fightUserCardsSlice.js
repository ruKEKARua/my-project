import { createSlice } from '@reduxjs/toolkit';

const fightUserCardsSlice = createSlice({
  name: 'fightUserCards',
  initialState: {
    value: [],
  },
  reducers: {
    addUserCardToFight: (state, action) => { // Экшн для добавления карты в массив, в игре это, например, приобритение карты игроком
      
        state.value = action.payload;
      
    },
    removeUserCardFromFight: (state) => { // Экшн для удаления карты из массива, в игре это, например, продажа карты игроком
      
        state.value = [];

    },
    removeUserCardByIdFromFight: (state, action) => { // Экшн для удаления конкретной карты по ID во время боя
      
        state.value = state.value.filter(card => card.id !== action.payload);

    },

    updateUserCardHealth: (state, action) => { // Экшн для обновления здоровья карты во время боя
      
        const card = state.value.find(card => card.id === action.payload.id);
        if (card) {
          card.health = action.payload.health;
        }

    },

  },
});

// Экспортируем экшены для использования в компонентах
export const { addUserCardToFight, removeUserCardFromFight, removeUserCardByIdFromFight, updateUserCardHealth } = fightUserCardsSlice.actions;

// Экспортируем редюсер для стора
export default fightUserCardsSlice.reducer;