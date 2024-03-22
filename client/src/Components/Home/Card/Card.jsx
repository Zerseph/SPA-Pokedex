import { useState } from 'react';
import Chart from './Chart';
import styleCard from './Card.module.css';

const Card = ({
    img,
    id,
    name,
    Types,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed
}) => {
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
                        <span className={styleCard[type.name.toLowerCase()]}>{type.name}</span>
                    </div>
                ))}
            </div>
            <div className={`${styleCard.pokemonInfo2} ${styleCard.Back}`}>
                <div className={styleCard.ContainerCard}>
                    <div className={styleCard.titleNameBack}>{name}</div>
                    <div className={styleCard.chartBackground}>
                        <Chart
                            hp={hp}
                            attack={attack}
                            defense={defense}
                            special_attack={special_attack}
                            special_defense={special_defense}
                            speed={speed}
                        />
                    </div>
                    <div className={styleCard.chartText}>
                        <p><strong>Rareza:</strong> 5</p>
                        <p><strong>Habilidad:</strong> Nado Rapido / Punto Toxico</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
