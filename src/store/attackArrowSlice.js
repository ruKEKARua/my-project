import { createSlice } from '@reduxjs/toolkit';

const attackArrowSlice = createSlice({
    name: 'attackArrow',
    initialState: {
        isVisible: false,
        attackerId: null,
        defenderId: null,
        attackerPosition: null,
        defenderPosition: null,
        isAttackerEnemy: false, // true если атакует враг, false если атакует игрок
    },
    reducers: {
        setAttackArrow(state, action) {
            state.isVisible = action.payload.isVisible;
            state.attackerId = action.payload.attackerId;
            state.defenderId = action.payload.defenderId;
            state.attackerPosition = action.payload.attackerPosition;
            state.defenderPosition = action.payload.defenderPosition;
            state.isAttackerEnemy = action.payload.isAttackerEnemy || false;
        },
        clearAttackArrow(state) {
            state.isVisible = false;
            state.attackerId = null;
            state.defenderId = null;
            state.attackerPosition = null;
            state.defenderPosition = null;
            state.isAttackerEnemy = false;
        },
    },
});

export const { setAttackArrow, clearAttackArrow } = attackArrowSlice.actions;
export default attackArrowSlice.reducer;
