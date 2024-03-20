import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemons } from "../../Redux/actions/actions";
import Card from './Card/Card';
import Pagination from "./Pagination/Pagination.jsx";
import styleHome from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const currentPage = useSelector((state) => state.currentPage)
    const numberOfPokesPerPage = 10;

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    const indexOfLastPoke = currentPage * numberOfPokesPerPage;
    const indexOfFirstPoke = indexOfLastPoke - numberOfPokesPerPage;
    const currentPokes = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke);


    return (
        <div className={styleHome.containerHome}>
            <div className={styleHome.banner}></div>

            <div className={styleHome.navBar}>NAVBAR</div>

            <ul className={styleHome.containterCards}>
                {currentPokes.length ? (
                    currentPokes.map(({ id, name, img, Types }) => {
                        return (
                            <Card
                                key={id}
                                img={img}
                                id={id}
                                name={name}
                                Types={Types}
                            />
                        );
                    })
                ) : (<h1> Loading Pokemons...</h1>)
                }
            </ul>

            <div className={styleHome.pagination}>
                <Pagination
                    numberOfPokesPerPage={numberOfPokesPerPage}
                    totalNumberOfPokes={allPokemons.length}
                />
            </div>


        </div>
    );
};

export default Home;