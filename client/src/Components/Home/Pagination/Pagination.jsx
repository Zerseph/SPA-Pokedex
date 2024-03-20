import { setCurrentPage } from "../../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import stylePagination from "./Pagination.module.css";

const Pagination = ({ numberOfPokesPerPage, totalNumberOfPokes }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.currentPage);
    const maxVisiblePages = 5; // Puedes ajustar este número según tus necesidades

    const pagination = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    // Calcula la cantidad total de páginas necesarias
    const numberOfPages = Math.ceil(totalNumberOfPokes / numberOfPokesPerPage);

    // Calcula el rango de páginas visibles
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(numberOfPages, startPage + maxVisiblePages - 1);

    return (
        <nav className={stylePagination.containerPag}>
            <button
                className={stylePagination.navButtonFirst}
                onClick={() => pagination(1)}
                disabled={currentPage === 1}
            >
                {'<<'}
            </button>

            <button
                className={stylePagination.navButtonLeft}
                onClick={() => pagination(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {'<'}
            </button>

                {/* Mostrar "..." al principio si hay más páginas antes del primer número */}
                {startPage > 1 && (
                    <span className={stylePagination.dots}>...</span>
                )}

                {/* Mapear sobre los números de página y renderizar un botón para cada uno dentro del rango */}
                {[...Array(endPage - startPage + 1)].map((_, index) => (
                    <button
                        className={`${stylePagination.numeros} ${startPage + index === currentPage ? stylePagination.currentPage : ''}`}
                        key={startPage + index}
                        onClick={() => pagination(startPage + index)}
                    >
                        {startPage + index}
                    </button>
                ))}

                {/* Mostrar "..." al final si hay más páginas después del último número */}
                {endPage < numberOfPages && (
                    <span className={stylePagination.dots}>...</span>
                )}


            <button
                className={stylePagination.navButtonRight}
                onClick={() => pagination(currentPage + 1)}
                disabled={currentPage === numberOfPages}
            >
                {'>'}
            </button>

            <button
                className={stylePagination.navButtonLast}
                onClick={() => pagination(numberOfPages)}
                disabled={currentPage === numberOfPages}
            >
                {'>>'}
            </button>
        </nav>
    );
};

export default Pagination;
