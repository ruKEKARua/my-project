import { createSlice } from '@reduxjs/toolkit';
const fightEnemyCardsSlice = createSlice({
    name: 'fightEnemyCards',
    initialState: {
        value: [],
    },
    reducers: {
        addEnemyCardToFight: (state, action) => { // Экшн для добавления карты в массив, в игре это, например, приобритение карты игроком
        
            state.value = action.payload;
        
        },
        removeEnemyCardFromFight: (state) => { // Экшн для удаления карты из массива, в игре это, например, продажа карты игроком
        
            state.value = [];
        
        },
        removeEnemyCardByIdFromFight: (state, action) => { // Экшн для удаления конкретной карты по ID во время боя
        
            state.value = state.value.filter(card => card.id !== action.payload);
        
        },

        updateEnemyCardHealth: (state, action) => { // Экшн для обновления здоровья карты во время боя
        
            const card = state.value.find(card => card.id === action.payload.id);
            if (card) {
              card.health = action.payload.health;
            }
        
        },

  },
});

/**
 * Копирует массив карт врагов для использования в процессе битвы.
 * 
 * @param {Array} payload - Массив карт, который передается в action.payload
 */
export const addEnemyCardToFight = fightEnemyCardsSlice.actions.addEnemyCardToFight;

/**
 * Удаляет карту врага из массива битвы по её ID.
 * 
 * @param {Object} payload - Объект карты (обязательно должен содержать id)
 * @param {number|string} payload.id - ID удаляемой карты
 */
export const removeEnemyCardFromFight = fightEnemyCardsSlice.actions.removeEnemyCardFromFight;

/**
 * Удаляет конкретную карту врага по ID во время боя.
 */
export const removeEnemyCardByIdFromFight = fightEnemyCardsSlice.actions.removeEnemyCardByIdFromFight;

/**
 * Обновляет здоровье карты врага во время боя.
 */
export const updateEnemyCardHealth = fightEnemyCardsSlice.actions.updateEnemyCardHealth;


// Экспортируем редюсер для стора
export default fightEnemyCardsSlice.reducer;