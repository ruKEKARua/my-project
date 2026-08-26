import { configureStore } from '@reduxjs/toolkit';
import userCardsReducer from './userCardsSlice';
import enemyCardsReducer from './enemyCardsSlice';

import isFightGoingReducer from './isFightGoingSlice';
import fightUserCardsReducer from './fightUserCardsSlice';
import fightEnemyCardsReducer from './fightEnemyCardsSlice';

import logsReducer from './logSlice';
import attackArrowReducer from './attackArrowSlice';

export const store = configureStore({
  reducer: {
    userCards: userCardsReducer,
    enemyCards: enemyCardsReducer,

    isFightGoing: isFightGoingReducer,
    fightUserCards: fightUserCardsReducer,
    fightEnemyCards: fightEnemyCardsReducer,

    log: logsReducer,
    attackArrow: attackArrowReducer,
  },
});
