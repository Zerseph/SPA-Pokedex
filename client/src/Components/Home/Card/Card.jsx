/* eslint-disable react/prop-types */
import { useState } from 'react';
import styleCard from "./Card.module.css";

// eslint-disable-next-line react/prop-types
const Card = ({ img, id, name, Types }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const determineClassBack = () => {
        const background = Types.map(type => `var(--color-${type.name.toLowerCase()})`).join(', ');
    
        return { background: Types.length === 1 ? background : `linear-gradient(to bottom, ${background})` };
    };

    return (
        <div style={determineClassBack()} className={`${styleCard.CardPokemon} ${isFlipped ? styleCard.Flipped : ''}`} onClick={handleFlip}>

            <div className={`${styleCard.pokemonInfo} ${styleCard.Front}`}>

                <img src={img} alt={name} className={`${styleCard.pokemonImage} ${styleCard.pokemonImageWithBorder}`} />

                <p className={styleCard.parrafoId}><span className={styleCard.numberId}>N.º</span> {id}</p>

                <h5 className={styleCard.namePokemon}>{name}</h5>

                {Types.map((type, index) => (
                    <div key={index} className={styleCard.types}>
                        <span className={styleCard[type.name.toLowerCase()]}>{type.name}</span></div>
                ))}

            </div>

            <div className={`${styleCard.pokemonInfo} ${styleCard.Back}`}>
                Detalles en la parte posterior
            </div>
        </div>
    );
};

export default Card;
