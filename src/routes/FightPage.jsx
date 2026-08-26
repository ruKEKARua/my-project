import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Logs } from '../components/logs/Logs.jsx';
import Card from '../components/card/card.jsx';
import GoBackToMain from '../components/goBackToMain.jsx';
import AttackArrow from '../components/AttackArrow.jsx';
import { setAttackArrow } from '../store/attackArrowSlice.js';




const FightPage = () => {
    const dispatch = useDispatch();
    const userCardsArrayFromDatabase = useSelector((state) => state.fightUserCards.value);
    const enemyCardsArrayFromDatabase = useSelector((state) => state.fightEnemyCards.value);
    const { attackerId, defenderId, isVisible } = useSelector((state) => state.attackArrow);

    const logs = useSelector((state) => state.log.value);
    
    const containerRef = useRef(null);
    const userCardsRefs = useRef({});
    const enemyCardsRefs = useRef({});

    // Обновляем позиции карт когда отображается стрелочка
    useEffect(() => {
        if (!isVisible || !attackerId || !defenderId || !containerRef.current) return;

        const getCardPosition = (cardId, isEnemy) => {
            const refs = isEnemy ? enemyCardsRefs.current : userCardsRefs.current;
            const ref = refs[cardId];
            if (!ref) return null;
            
            const cardRect = ref.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            
            return {
                x: cardRect.left - containerRect.left + cardRect.width / 2,
                y: cardRect.top - containerRect.top + cardRect.height / 2,
            };
        };

        // Определяем позиции атакующей и защищающейся карты
        // В текущей логике: attackerId - пользователь, defenderId - враг
        const attackerPos = getCardPosition(attackerId, false); // Пользователь
        const defenderPos = getCardPosition(defenderId, true);  // Враг

        if (attackerPos && defenderPos) {
            dispatch(setAttackArrow({
                isVisible: true,
                attackerId,
                defenderId,
                attackerPosition: attackerPos,
                defenderPosition: defenderPos,
            }));
        }
    }, [isVisible, attackerId, defenderId, dispatch]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col justify-center items-center gap-6 relative">

            <GoBackToMain />

            <div className="justify-center items-center flex flex-col w-full h-full gap-6">

                <h1 className="text-center text-2xl text-white">Карты врага</h1>

                <div className="justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] flex-wrap justify-items-center w-full h-full">
                    {enemyCardsArrayFromDatabase.map((card) => (
                      <Card 
                        key={card.id} 
                        card={card}
                        ref={(el) => {
                            if (el) enemyCardsRefs.current[card.id] = el;
                        }}
                      />
                    ))}
                </div>

            </div>

            <div className="h-1 w-full bg-mauve-700" />

            <div className="justify-center items-center flex flex-col w-full h-full gap-6">

                <h1 className="text-center text-2xl text-white">Твои карты</h1>
                <div className="justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] justify-items-center w-full h-full">
                    {userCardsArrayFromDatabase.map((card) => (
                      <Card 
                        key={card.id} 
                        card={card}
                        ref={(el) => {
                            if (el) userCardsRefs.current[card.id] = el;
                        }}
                      />
                    ))}
                </div>
                
            </div>
            <div className='w-200 h-100 m-10 bg-black overflow-scroll overflow-x-hidden flex  flex-col text-orange-500 '>

              <Logs logs={logs} />
            </div>

            <AttackArrow />

        </div>
    )
}

export default FightPage