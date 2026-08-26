import Card from '../components/card/card.jsx'

import { useSelector } from 'react-redux';
import { useEffect } from 'react';


import arrayCreaturesUser from '../../public/arrayCreaturesUser.js';
import arrayCreaturesEnemy from '../../public/arrayCreaturesEnemy.js';

import createNewBase from '../components/firestore/createNewBase.js';

import GetDataFromDB from '../components/GetDataFromDB';
import StartFight from '../components/StartFight.jsx';

createNewBase('creaturesUser', 'creaturesUser', {arrayOfCreatures: arrayCreaturesUser})
createNewBase('creaturesEnemy', 'creaturesEnemy', {arrayOfCreatures: arrayCreaturesEnemy})

function App() {

    const userCardsArrayFromDatabase = useSelector((state) => state.userCards.value);
    const enemyCardsArrayFromDatabase = useSelector((state) => state.enemyCards.value);
    

    GetDataFromDB()

    // обнуление базы данных с боем при перезагрузке страницы
    useEffect(() => {
        createNewBase('creaturesFight', 'isFightAreGoing', { 'isFightGoing': false });
        createNewBase('creaturesFight', 'creaturesFight', {

            'enemyCardsArray': '',
            'userCardsArray': '',

        })

    }, [])

    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-6">

          <StartFight  />

          <div className="justify-center items-center flex flex-col w-full h-full gap-6">

              <h1 className="text-center text-2xl text-white">Карты врага</h1>

              <div className="justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] flex-wrap justify-items-center w-full h-full">
                  {enemyCardsArrayFromDatabase.map((card) => (
                    <Card key={card.id} card={card} />
                  ))}
              </div>

          </div>

          <div className="h-1 w-full bg-mauve-700" />

          <div className="justify-center items-center flex flex-col w-full h-full gap-6">

              <h1 className="text-center text-2xl text-white">Твои карты</h1>
              <div className="justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] justify-items-center w-full h-full">
                  {userCardsArrayFromDatabase.map((card) => (
                    <Card key={card.id} card={card} />
                  ))}
              </div>
              
          </div>


      </div>
    );
}

export default App;
