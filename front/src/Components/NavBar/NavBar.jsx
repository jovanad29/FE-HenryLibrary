import React, { useEffect, useState, useMemo } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllBooks,
    getUserFavorites,
    setSection,
    setPage,
    clearLoginError,
} from "../../actions";
import banderaArgentina from "./arg.png";
// import banderaEeuu from "./eeuu.png";


//COMPONENTES
import SearchBar from "../SearchBar/SearchBar";
import Login from "../Login/Login";


//CSS
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import styles from "./NavBar.module.css";



export default function NavBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { status, favorites, allBooks, displayName, uid } = useSelector((state) => state);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);

    const [loginModal, setLoginModal] = useState(false);

    function HandleOpenLogin() {
        dispatch(clearLoginError());
        loginModal === true ? setLoginModal(false) : setLoginModal(true);
    }

    useEffect(() => {
        if (allBooks.length === 0) dispatch(getAllBooks());
    }, [dispatch]);

    const handleOnFavorites = () => {
        if (favorites.length > 0) {
            dispatch(setSection("favoritos"));
            dispatch(getUserFavorites(uid));
            dispatch(setPage(0));
            history.push("/home");
        } else {
            dispatch(setSection("home"));
            dispatch(getAllBooks());
            dispatch(setPage(0));
        }
    };

    return (
        <nav className={styles.container}>
            <div className={styles.titulo}>
              <h1 className={styles.h1}>
                <NavLink to="/">Libreria</NavLink>
              </h1>

              <h2 className={styles.h1_1}>
                 <NavLink to="/">HENRY</NavLink>
              </h2>
            </div>

            <div className={styles.search}>
                <SearchBar />
            </div>

            
            <div className={status === "authenticated" ? styles.user : styles.notUser}>
                <h4>Bienvenido, {displayName}</h4>
            </div> 
            

            <div className={styles.iconos} >
                {favorites.length === 0 ? (
                    <button onClick={handleOnFavorites}
                    className={isAuthenticated ? styles.iconoFav: styles.iconoNoFav }
                    >
                        <MdOutlineFavoriteBorder
                            size="1.4rem"
                        />
                    </button>
                ) : (
                    <>
                        <button 
                        className={isAuthenticated ? styles.iconoFav : styles.iconoNoFav }
                        onClick={handleOnFavorites} 
                         >
                            <MdOutlineFavorite
                                size="1.4rem"
                            />
                        </button>
                        {favorites.length > 0 && isAuthenticated && <h3 className={styles.cantidad}>{favorites.length}</h3>}
                    </>
                )}

                <button onClick={() => HandleOpenLogin()}>
                    <VscAccount size="1.4rem" className={styles.icono}/>
                </button>

                <NavLink to="/carrito">
                    <BsCart2 size="1.5rem" className={styles.icono}/>
                </NavLink>


            </div>

            <div className={styles.banderas}>

                <button className={styles.bandera}>
                    <img src={banderaArgentina} alt="" />
                </button>

                {/* <button className={styles.bandera}>
                    <img src={banderaEeuu} alt="" />
                </button> */}
            </div>
            {loginModal && <Login HandleOpenLogin={HandleOpenLogin} />}
        </nav>
    );
}
