import {
    GET_ALL_BOOKS,
    GET_NAME_BOOKS,
    GET_BOOKS_ID,
    DELETE_BOOKS_DETAIL,
    GET_ALL_CATEGORIES,
    GET_ALL_BOOKS_BY_CATEGORY,
    POST_BOOK,
    SET_PAGE,
    BANNED_BOOK,
    DELETE_LOGICO_BOOK,
    SET_ALL_BOOKS_BY_AUTHOR,
    SET_AUTHOR_BY_NAME,
    GET_ALL_AUTHORS,
    GET_ALL_PUBLISHERS,
    EMPTY_AUTHORS,
    PUT_BOOK,
    ADD_FAVORITES,
    SET_SECTION,
    GET_USER_FAVORITES,
    DELETE_FAVORITES,
    LOGIN,
    LOGOUT,
    CHECKING_CREDENTIALS,
    ORDER_BY,
    GET_USER_INFO,
    CLEAR_LOGIN_ERROR,
    GET_CART,
    CLEAR_CART,
    SET_FILTERS,
    GET_CART_QUANTITY,
    GET_ALL_CART_BY_USER,
    GET_ID_FAVORITES,
    GET_ALL_REVIEWS,
    POST_ALL_REVIEWS,
} from "../actions/index";
//mercado pago
import {
    CLEAR_PAYMENT,
    SET_ITEMS,
    SET_PAYMENT,
    SET_ORDER,
} from "../actions/checkoutActions";

const initialState = {
    allBooks: [],
    copyAllBooks: [],
    bookDetail: [],
    categories: [],
    authors: [],
    publishers: [],
    msg: [],
    createBooks: [],
    actualPage: 0,
    status: "checking",
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    address: null,
    isActive: true,
    isAdmin: false,
    isBanned: false,
    errorMessage: null,
    favorites: [],
    section: "",
    activeCart: [],
    activeCartAmount: 0,
    activeCartQuantity: 0,
    activeCartPaymentId: null,
    mpID: "",
    order: {
        ID: "",
        items: [],
        status: "",
        status_detail: "",
        total: 0,
    },
    items: [],
    reviews: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BOOKS:
            return {
                ...state,
                allBooks: action.payload,
                copyAllBooks: [...action.payload],
            };

        case GET_NAME_BOOKS:
            return {
                ...state,
                allBooks: action.payload,
            };

        case GET_BOOKS_ID:
            return {
                ...state,
                bookDetail: action.payload,
            };

        case DELETE_BOOKS_DETAIL: //Limpia el componente --> useEffect
            return {
                ...state,
                bookDetail: [],
            };

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case GET_ALL_BOOKS_BY_CATEGORY:
            return {
                ...state,
                allBooks: action.payload,
            };

        case POST_BOOK:
            return {
                ...state,
                allBooks: [...state.allBooks, { ...action.payload }],
            };

        case PUT_BOOK:
            return {
                ...state,
                allBooks: [...state.allBooks, { ...action.payload }],
            };

        case SET_PAGE:
            return {
                ...state,
                actualPage: action.payload,
            };

        case BANNED_BOOK:
            return {
                ...state,
            };

        case DELETE_LOGICO_BOOK:
            return {
                ...state,
                allBooks: [...state.allBooks, action.payload],
                bookDetail: action.payload,
            };

        case SET_ALL_BOOKS_BY_AUTHOR:
            return {
                ...state,
                allBooks: action.payload,
            };

        case SET_AUTHOR_BY_NAME:
            return {
                ...state,
                authors: action.payload,
            };

        case GET_ALL_AUTHORS:
            return {
                ...state,
                authors: action.payload,
            };

        case GET_ALL_PUBLISHERS:
            return {
                ...state,
                publishers: action.payload,
            };

        case EMPTY_AUTHORS:
            return {
                ...state,
                authors: [],
            };

        case LOGIN:
            if (action.payload.email === "admin@gmail.com") {
                return {
                    ...state,
                    status: "authenticated",
                    uid: action.payload.uid,
                    email: action.payload.email,
                    displayName: action.payload.displayName,
                    photoURL: action.payload.photoURL,
                    errorMessage: null,
                    isAdmin: true,
                };
            }
            return {
                ...state,
                status: "authenticated",
                uid: action.payload.uid,
                email: action.payload.email,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                errorMessage: null,
                // isActive: action.payload.isActive,
                // isAdmin: action.payload.isAdmin,
                // isBanned: action.payload.isBanned,
                // address: action.payload.address,
            };

        case LOGOUT:
            return {
                ...state,
                status: "not-authenticated",
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: action.payload?.errorMessage,
                isActive: true,
                isAdmin: false,
                isBanned: false,
                address: null,
                favorites: [],
            };

        case CHECKING_CREDENTIALS:
            return {
                ...state,
                status: "checking",
            };

        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                errorMessage: null,
            };

        case ADD_FAVORITES:
            const bookId = action.payload.books[0].id;
            return {
                ...state,
                favorites: [...state.favorites, bookId],
            };

        case SET_SECTION:
            return {
                ...state,
                section: action.payload,
            };

        case GET_USER_FAVORITES:
            const filtered = action.payload;
            return {
                ...state,
                allBooks: filtered,
            };

        case GET_ID_FAVORITES:
            const idFavorites = action.payload.map((b) => b.id);
            return {
                ...state,
                favorites: idFavorites,
            };

        case DELETE_FAVORITES:
            const availableFavorites = state.favorites.filter(
                (b) => b !== action.payload
            );
            // const filtereds = state.allBooks.filter((b) =>
            //     availableFavorites.includes(b.id)
            // );
            return {
                ...state,
                favorites: availableFavorites,
                // allBooks: filtereds,
            };

        //ORDENAMIENTOS
        case ORDER_BY:
            const order = action.payload;

            const orderByPrice = ["menorPrecio", "mayorPrecio"];
            const orderByRating = ["menorRating", "mayorRating"];
            //const orderBySoldCopies = ["menosVendidos", "masVendidos"];
            const less = ["menorPrecio", "menorRating", "menosVendidos"];

            let type = "";
            let orderedBy = "";

            if (orderByPrice.indexOf(order) > -1) {
                type = "price";
            } else if (orderByRating.indexOf(order) > -1) {
                type = "rating";
            } else {
                type = "soldCopies";
            }

            if (less.indexOf(order) > -1) {
                orderedBy = state.allBooks.sort((el1, el2) => {
                    return el1[type] > el2[type]
                        ? 1
                        : el1[type] < el2[type]
                        ? -1
                        : 0;
                });
            } else {
                orderedBy = state.allBooks.sort((el1, el2) => {
                    return el1[type] > el2[type]
                        ? -1
                        : el1[type] < el2[type]
                        ? 1
                        : 0;
                });
            }
            return {
                ...JSON.parse(JSON.stringify(state)),
                allBooks: orderedBy,
            };

        case GET_USER_INFO:
            if (action.payload.email === "admin@gmail.com") {
                return {
                    ...state,
                    isActive: action.payload.isActive,
                    isBanned: action.payload.isBanned,
                    address: action.payload.address,
                    isAdmin: true,
                };
            }
            return {
                ...state,
                isActive: action.payload.isActive,
                isAdmin: action.payload.isAdmin,
                isBanned: action.payload.isBanned,
                address: action.payload.address,
            };

        case GET_CART:
            return {
                ...state,
                activeCart: action.payload.books,
                activeCartAmount: action.payload.totalAmount
                    ? parseFloat(action.payload.totalAmount).toFixed(2)
                    : 0,
                activeCartPaymentId: action.payload.id,
            };

        case GET_ALL_CART_BY_USER:
            return {
                ...state,
                allCartByUser: action.payload,
            };

        //mercado pago
        case SET_PAYMENT:
            return {
                ...state,
                mpID: action.payload,
            };

        case CLEAR_PAYMENT:
            return {
                mpID: "",
                order: {
                    ID: "",
                    items: [],
                    status: "",
                    status_detail: "",
                    total: 0,
                },
                items: [],
            };

        case SET_ORDER:
            alert("estoy en order " + action.payload);
            return {
                ...state,
                order: action.payload,
            };

        case SET_ITEMS:
            return {
                ...state,
                items: action.payload.length
                    ? action.payload.map((i) => {
                          return {
                              id: i.id,
                              unit_price: i.price,
                              picture_url: i.image,
                              quantity: i.quantity,
                              title: i.title,
                          };
                      })
                    : [{ msg: "no hay datos" }],
            };

        case CLEAR_CART:
            return {
                ...state,
                activeCart: [],
                activeCartAmount: 0,
                activeCartQuantity: 0,
            };

        case GET_CART_QUANTITY:
            return {
                ...state,
                activeCartQuantity: action.payload,
            };

        case SET_FILTERS:
            return {
                ...state,
                allBooks: action.payload,
            };

        // REVIEWS
        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
            };

        case POST_ALL_REVIEWS:
            return {
                ...state,
                reviews: [...state.reviews, { ...action.payload }],
            };

        default:
            return state;
    }
}
export default rootReducer;
