import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { removeEnemyCardFromFight } from "../store/fightEnemyCardsSlice";
import { removeUserCardFromFight } from "../store/fightUserCardsSlice";
import { clearLog } from "../store/logSlice";
import { clearAttackArrow } from "../store/attackArrowSlice";

function GoBackToMain() {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleBackToPage = () => {
        dispatch(removeEnemyCardFromFight())
        dispatch(removeUserCardFromFight())
        dispatch(clearLog())
        dispatch(clearAttackArrow())
        navigate('/app')
    }


    return (
        <button
            className="w-140 h-10 bg-mauve-500 hover:bg-mauve-800 transition duration-150 text-white font-bold rounded"
            onClick={handleBackToPage}
        >
            Вернуться
        </button>
    )
}

export default GoBackToMain