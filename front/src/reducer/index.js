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
  ADD_CARRITO,
  ADD_FAVORITES,
  SET_SECTION,
  GET_ALL_FAVORITES,
  DELETE_FAVORITES,
  LOGIN,
  LOGOUT,
  CHECKING_CREDENTIALS,
  ORDER_BY,
  GET_USER_INFO,
  CLEAR_LOGIN_ERROR,
  ACTIVE_CART,
} from "../actions/index";
//mercado pago
import { CLEAR_PAYMENT, SET_ITEMS, SET_PAYMENT, SET_ORDER, } from "../actions/checkoutActions";

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
  carrito: [],
  favorites: [],
  section: "",
  activeCart: {},
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
      return {
        ...state,
        status: "authenticated",
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        errorMessage: null,
        isActive: true,
        isAdmin: false,
        isBanned: false,
        address: null,
      };
    case LOGOUT:
      return {
        ...state,
        status: "not-authenticated",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: action.payload,
        isActive: true,
        isAdmin: false,
        isBanned: false,
        address: null,
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

    case ADD_CARRITO:
      return {
        ...state,
        carrito: [...state.carrito, action.payload],
      };

    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case SET_SECTION:
      return {
        ...state,
        section: action.payload,
      };

    case GET_ALL_FAVORITES:
      const filtered = state.allBooks.filter((b) =>
        state.favorites.includes(b.id)
      );
      return {
        ...state,
        allBooks: filtered,
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
          return el1[type] > el2[type] ? 1 : el1[type] < el2[type] ? -1 : 0;
        });
      } else {
        orderedBy = state.allBooks.sort((el1, el2) => {
          return el1[type] > el2[type] ? -1 : el1[type] < el2[type] ? 1 : 0;
        });
      }
      return {
        ...JSON.parse(JSON.stringify(state)),
        allBooks: orderedBy,
      };

    case GET_USER_INFO:
      return {
        ...state,
        isActive: action.payload.isActive,
        isAdmin: action.payload.isAdmin,
        isBanned: action.payload.isBanned,
        address: action.payload.address,
      };
    case ACTIVE_CART:
      return {
        ...state,
        activeCart: action.payload,
      };

   //mercado pago
      case SET_PAYMENT: 
         return {
          ...state,
              mpID :action.payload.mpID
        };
       case  CLEAR_PAYMENT: 
       return{
          mpID : "",
          order : {
            ID: "",
            items: [],
            status: "",
            status_detail: "",
            total: 0,
          },
          items :[],
        };
        case SET_ORDER: 
        return {
          ...state,
          order : action.payload,
        };
        case SET_ITEMS:
         // console.log('Estoy en el reducer', action)
          return {
            ...state,
            items: action.payload.length ? action.payload.map ( i => {
              return {
                id: i.id,
                unit_price: i.price,
                picture_url: i.image,
                quantity: 1,
                title: i.title,
              }
            }) : [{msg: 'no hay datos'}]
          } 
      
    default:
      return state;
  }
}
export default rootReducer;
