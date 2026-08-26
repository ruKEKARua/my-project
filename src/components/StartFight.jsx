import { useDispatch, useSelector } from 'react-redux';

import { changeFightGoing } from '../store/isFightGoingSlice.js';

import { addLog, clearLog } from '../store/logSlice.js';
import { setAttackArrow, clearAttackArrow } from '../store/attackArrowSlice.js';
import createNewBase from './firestore/createNewBase.js';
import { useNavigate } from 'react-router';
import { addUserCardToFight, removeUserCardByIdFromFight, updateUserCardHealth } from '../store/fightUserCardsSlice.js';
import { addEnemyCardToFight, removeEnemyCardByIdFromFight, updateEnemyCardHealth } from '../store/fightEnemyCardsSlice.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function StartFight() {
    const dispatch = useDispatch();
    const isFightGoing = useSelector((state) => state.isFightGoing.value);
    const userCardsArrayFromDatabase = useSelector((state) => state.userCards.value);
    const enemyCardsArrayFromDatabase = useSelector((state) => state.enemyCards.value);
    const navigate = useNavigate();
    

    const fightLogic = async () => {
        if (isFightGoing) {return console.log('Файт ещё идёт.')}
        
        
        dispatch(clearLog());
        dispatch(changeFightGoing());

        const userCreatures = structuredClone(userCardsArrayFromDatabase);
        const enemyCreatures = structuredClone(enemyCardsArrayFromDatabase);

        createNewBase('creaturesFight', 'creaturesFight', {'userCardsArray': userCreatures, 'enemyCardsArray': enemyCreatures});
        createNewBase('creaturesFight', 'isFightAreGoing', {'isFightAreGoing': true});
        
        if (!userCreatures.length || !enemyCreatures.length) {
            dispatch(changeFightGoing());
            return;
        }

        const users = userCreatures;
        const enemies = enemyCreatures;

        while (users.length > 0 && enemies.length > 0) {

            const attacker = users[0];
            const targetIndex = Math.floor(Math.random() * enemies.length);
            const defender = enemies[targetIndex];
            


            if (!attacker || !defender) break;
            
            // Показываем стрелочку атаки (attacker это всегда пользователь, defender это враг)
            dispatch(setAttackArrow({
                isVisible: true,
                attackerId: attacker.id,
                defenderId: defender.id,
                isAttackerEnemy: false, // Атакует пользователь
            }));
            
            let log = `${attacker.title} ${attacker.damage} DMG ${attacker.health} HP | бьет | ${defender.title} ${defender.damage} DMG ${defender.health} HP`;
            dispatch(addLog(log));
            
            attacker.health -= defender.damage;
            defender.health -= attacker.damage;

            // Обновляем здоровье карт в Redux для динамической отрисовки
            dispatch(updateUserCardHealth({ id: attacker.id, health: attacker.health }));
            dispatch(updateEnemyCardHealth({ id: defender.id, health: defender.health }));

            log = `У ${attacker.title} осталось ${attacker.health} HP | У ${defender.title} осталось ${defender.health} HP`;
            dispatch(addLog(log));

            const attackerIsDead = attacker.health <= 0;
            const defenderIsDead = defender.health <= 0;
            console.log(attacker.health, attackerIsDead)

            if (attackerIsDead && defenderIsDead) {
                
                await sleep(500);  // Задержка 500 мс для показа стрелочки
                dispatch(clearAttackArrow());
                await sleep(0)  // Задержка между раундами для наглядности

                dispatch(addLog('—————— Оба существа погибли. ——————'));
                dispatch(removeUserCardByIdFromFight(attacker.id));
                dispatch(removeEnemyCardByIdFromFight(defender.id));
                users.shift();
                enemies.splice(targetIndex, 1);
            } else if (defenderIsDead) {
                
                await sleep(500);  // Задержка 500 мс для показа стрелочки
                dispatch(clearAttackArrow());
                await sleep(0)  // Задержка между раундами для наглядности

                dispatch(addLog(`—————— Существо ${defender.title} погибло. ——————`));
                dispatch(removeEnemyCardByIdFromFight(defender.id));
                enemies.splice(targetIndex, 1);

            } else if (attackerIsDead) {

                await sleep(500);  // Задержка 500 мс для показа стрелочки
                dispatch(clearAttackArrow());
                await sleep(0)  // Задержка между раундами для наглядности

                dispatch(addLog(`—————— Существо ${attacker.title} погибло. ——————`));
                dispatch(removeUserCardByIdFromFight(attacker.id));
                users.shift();

            }
            

            if (users.length === 0 || enemies.length === 0) break;

        }

        const result = users.length > 0 ? 'Победил игрок' : enemies.length > 0 ? 'Победил враг' : 'Ничья';
        dispatch(addLog(`——— Бой завершён: ${result} ———`));    
        await createNewBase('creaturesFight', 'isFightAreGoing', { isFightAreGoing: false });
        dispatch(changeFightGoing());
    };
    
    const handleStartFight = async () => {
        dispatch(addEnemyCardToFight(enemyCardsArrayFromDatabase))
        dispatch(addUserCardToFight(userCardsArrayFromDatabase))
        navigate('/fight');
        await fightLogic();
        
    };
    
    return (
        <button
            className="w-140 h-10 bg-mauve-500 hover:bg-mauve-800 transition duration-150 text-white font-bold rounded"
            onClick={handleStartFight}
        >
            Начать бой
        </button>
    );
}

export default StartFight;