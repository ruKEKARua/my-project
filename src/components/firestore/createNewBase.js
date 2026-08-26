import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase.js";

/**
 * Компонент карточки на столе.
 * @param {String} collectionId - название коллекции в базе данных
 * @param {String} documentId - документ в коллекции
 * @param {Object} value - объект, который мы хотим создать
 */

const createNewBase = async (collectionId, documentId, value) => { 

    if (!collectionId || !documentId) {
        console.error("Ошибка: collectionId и documentId должны быть указаны.");
        return;
    }

    try {
      // Создаем (или полностью перезаписываем) документ с ID "custom-doc-id"
      await setDoc(doc(db, `${collectionId}`, `${documentId}`), value);

      //console.log("Документ с вашим ID успешно создан!", collectionId, value);
    } catch (error) {
      console.error("Ошибка при создании документа:", error);
    }

}


export default createNewBase;