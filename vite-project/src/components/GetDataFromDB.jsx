
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase.js"; // Импортируем нашу настроенную базу данных

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addUserCard } from '../store/userCardsSlice.js';
import { addEnemyCard } from '../store/enemyCardsSlice.js';


const GetDataFromDB = () => {
    
    const dispatch = useDispatch();

    // получение данных о картах врага 
    useEffect(() => {
        const getSingleDocument = async () => {
            const docRefEnemy = doc(db, 'creaturesEnemy', 'creaturesEnemy'); // чтобы получить данные из firestore, второй аргумент — это коллекция, а третий аргумент — это документ, который мы хотим получить
            const docRefUser = doc(db, 'creaturesUser', 'creaturesUser');
            try {
                const docSnap = await getDoc(docRefEnemy);
                if (docSnap.exists()) {
                    const arrayCreatures = docSnap.data().arrayOfCreatures ?? []; //здесь указывается путь к массиву в документе firestore, если его нет, то будет пустой массив
                    arrayCreatures.forEach((card) => {
                        dispatch(addEnemyCard(card));
                    });
                } else {
                    console.log('Такого документа не существует!');
                }
            } catch (error) {
                console.error('Ошибка при получении документа: ', error);
            }

            try {
                const docSnap = await getDoc(docRefUser);
                if (docSnap.exists()) {
                    const arrayCreatures = docSnap.data().arrayOfCreatures ?? []; //здесь указывается путь к массиву в документе firestore, если его нет, то будет пустой массив
                    arrayCreatures.forEach((card) => {
                        dispatch(addUserCard(card));
                    });
                } else {
                    console.log('Такого документа не существует!');
                }
            } catch (error) {
                console.error('Ошибка при получении документа: ', error);
            }
      };

      getSingleDocument();
    }, [dispatch]);

    return (
      <></>
    )
}

export default GetDataFromDB;