import { forwardRef } from 'react';

const Card = forwardRef(({ card }, ref) => {
    if (!card) return null;

    const { title, damage, health, image } = card;

    return (
        <div ref={ref} className={`
        w-full h-full 
        max-w-50 max-h-80 
        min-w-10 min-h-30 
        flex flex-col justify-center items-center 
        bg-red-300 p-2 rounded-3xl transition-all duration-300 ease-out hover:shadow-lg `}>
            <h2 className="text-center font-bold text-sm">{title}</h2>
            <img 
                src={image} 
                alt={title} 
                className="m-5 rounded-2xl w-full h-full max-w-50 max-h-80 min-w-10 min-h-30 transition-opacity duration-300"
            />
            <div className="flex justify-center w-full gap-3">
                <p className="bg-red-800 w-7 h-7 text-center rounded-full text-white text-1xl font-bold">{damage}</p>
                <p className={`w-7 h-7 text-center rounded-full bg-green-400 text-white text-1xl font-bold transition-colors duration-300`}>
                    {Math.max(0, health)}
                </p>
            </div>
            <p className="text-wrap text-xs">Описание</p>
        </div>
    )
})

Card.displayName = 'Card';

export default Card;