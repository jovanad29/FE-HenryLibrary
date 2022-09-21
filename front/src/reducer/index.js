import {
    GET_ALL_BOOKS,
    GET_NAME_BOOKS,
    GET_BOOKS_ID,
    DELETE_BOOKS_DETAIL,
    GET_ALL_CATEGORIES,
    POST_CATEGORY,
    DELETE_CATEGORY,
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
    GET_USER_PAYMENTS_BOOK,
    DISCOUNT_CURRENT_STOCK,
    SET_BOOK_DETAIL_CURRENT_STOCK,
    DELETE_USER,
    GET_DIRECTIONS_USERS,
    SET_PAYMENTS_STATISTICS,
    DELETE_FAVORITES_WITHOUT_ALLBOOKS,
    SET_ERROR,
    SET_USERNAME,,
  RESET_ERROR,
  RESET_DELETE_MESSAGE
} from "../actions/index";
//mercado pago
import {
    CLEAR_PAYMENT,
    SET_ITEMS,
    SET_PAYMENT,
    SET_ORDER,
    SET_DELIVERY_ADDRESS,
    CLEAR_DELIVERY_ADDRESS,
} from "../actions/checkoutActions";
//DASHBOARD
import {
    GET_ALL_USERS,
    GET_ALL_REVIEW_BY_USER,
    GET_ALL_ORDERS,
    GET_ALL_ORDERS_STATUS,
    UPDATE_ORDER_STATE,
    USERS_MOST_BUIES,
    SET_CATEGORIES_MOST_BUY,
} from "../actions/dashboardActions";

const initialState = {
<<<<<<< HEAD
  allBooks: [],
  allUsers: [],
  allOrders: [],
  allOrderStatus: [],
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
  deleteMessage: null,
  favorites: [],
  section: "",
  activeCart: [],
  activeCartAmount: 0,
  activeCartQuantity: 0,
  activeCartPaymentId: null,
  allCartByUser: [],
  paymentsStatistics: [],
  //checkout
  mpID: "",
  order: {
    ID: "",
=======
    allBooks: [],
    allUsers: [],
    allOrders: [],
    allOrderStatus: [],
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
    allCartByUser: [],
    paymentsStatistics: [],
    //checkout
    mpID: "",
    order: {
        ID: "",
        items: [],
        status: "",
        status_detail: "",
        total: 0,
    },
>>>>>>> 93b0a4a9ac8ce9ddeb6858e7d63469d106217317
    items: [],
    deliveryAdress: "",
    //end Checkout
    reviews: [],
    reviewsUser: [],
    reviewsBook: 0,
    directionsUser: [],
    //dashboard image statistic
    usersMostBuies: [],
    categoriesMostBuies: [],
};

function rootReducer(state = initialState, action) {
<<<<<<< HEAD
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

    case SET_BOOK_DETAIL_CURRENT_STOCK:
      return {
        ...state,
        bookDetail: {
          ...state.bookDetail,
          currentStock: action.payload,
        },
      };

    case DISCOUNT_CURRENT_STOCK: //descuenta el stock de un libro
      return {
        ...state,
        bookDetail: {
          ...state.bookDetail,
          currentStock: state.bookDetail.currentStock - 1,
        },
      };

    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case POST_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        errorMessage: "El genero se creó con éxito",
      };

    case DELETE_CATEGORY:
      if(!Array.isArray(action.payload)){
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };}else{
        return {
          ...state,
          deleteMessage: "No se puede eliminar un género que tiene libros asociados"
        }
      };
      case RESET_DELETE_MESSAGE:
        return {
          ...state,
          deleteMessage: null
        };

    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case RESET_ERROR:
      return {
        ...state,
        errorMessage: null,
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
      const filtereds = state.allBooks.filter((b) =>
        availableFavorites.includes(b.id)
      );
      return {
        ...state,
        favorites: availableFavorites,
        allBooks: filtereds.length ? filtereds : state.allBooks,
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
        displayName: action.payload.nameUser,
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

    //pago
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
                unit_price: i.unit_price,
                picture_url: i.picture_url,
                quantity: i.quantity,
                title: i.title,
                description: i.description,
              };
            })
          : [{ msg: "no hay datos" }],
      };

    case SET_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAdress: action.payload,
      };

    case CLEAR_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAdress: "",
      };

    //fin pago
    case CLEAR_CART:
      return {
        ...state,
        activeCart: [],
        activeCartAmount: 0,
        activeCartQuantity: 0,
        allCartByUser: [],
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

    case GET_USER_PAYMENTS_BOOK:
      return {
        ...state,
        reviewsBook: action.payload,
      };

    //DASHBOARDS

    case GET_ALL_USERS:
      const allUsers = action.payload.filter((user) => user.isActive === true);
      return {
        ...state,
        allUsers: allUsers,
      };

    case GET_ALL_ORDERS:
      return {
        ...JSON.parse(JSON.stringify(state)),
        allOrders: action.payload,
      };

    case GET_ALL_ORDERS_STATUS:
      return {
        ...JSON.parse(JSON.stringify(state)),
        allOrderStatus: action.payload,
      };

    case UPDATE_ORDER_STATE:
      return {
        ...JSON.parse(JSON.stringify(state)),
      };

    case GET_DIRECTIONS_USERS:
      return {
        ...JSON.parse(JSON.stringify(state)),
        directionsUser: action.payload,
      };

    case GET_ALL_REVIEW_BY_USER:
      return {
        ...state,
        reviewsUser: action.payload,
      };

    case DELETE_USER:
      const users = state.allUsers.filter(
        (user) => user.uid !== action.payload
      );
      return {
        ...state,
        allUsers: users,
      };

    case SET_PAYMENTS_STATISTICS:
      return {
        ...state,
        paymentsStatistics: action.payload,
      };
    case USERS_MOST_BUIES:
      return {
        ...state,
        usersMostBuies: action.payload,
      };

    case DELETE_FAVORITES_WITHOUT_ALLBOOKS:
      const availableFavorite = state.favorites.filter(
        (b) => b !== action.payload
      );
      return {
        ...state,
        favorites: availableFavorite,
      };

    case SET_CATEGORIES_MOST_BUY:
      return {
        ...state,
        categoriesMostBuies: action.payload,
      };

    default:
      return state;
  }
=======
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

        case SET_BOOK_DETAIL_CURRENT_STOCK:
            return {
                ...state,
                bookDetail: {
                    ...state.bookDetail,
                    currentStock: action.payload,
                },
            };

        case DISCOUNT_CURRENT_STOCK: //descuenta el stock de un libro
            return {
                ...state,
                bookDetail: {
                    ...state.bookDetail,
                    currentStock: state.bookDetail.currentStock - 1,
                },
            };

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case POST_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
                errorMessage: null,
            };

        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category.id !== action.payload
                ),
            };

        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
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
            const filtereds = state.allBooks.filter((b) =>
                availableFavorites.includes(b.id)
            );
            return {
                ...state,
                favorites: availableFavorites,
                allBooks: filtereds.length ? filtereds : state.allBooks,
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
                displayName: action.payload.nameUser,
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

        //pago
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
                              unit_price: i.unit_price,
                              picture_url: i.picture_url,
                              quantity: i.quantity,
                              title: i.title,
                              description: i.description,
                          };
                      })
                    : [{ msg: "no hay datos" }],
            };

        case SET_DELIVERY_ADDRESS:
            return {
                ...state,
                deliveryAdress: action.payload,
            };

        case CLEAR_DELIVERY_ADDRESS:
            return {
                ...state,
                deliveryAdress: "",
            };

        //fin pago
        case CLEAR_CART:
            return {
                ...state,
                activeCart: [],
                activeCartAmount: 0,
                activeCartQuantity: 0,
                allCartByUser: [],
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

        case GET_USER_PAYMENTS_BOOK:
            return {
                ...state,
                reviewsBook: action.payload,
            };

        //DASHBOARDS

        case GET_ALL_USERS:
            const allUsers = action.payload.filter(
                (user) => user.isActive === true
            );
            return {
                ...state,
                allUsers: allUsers,
            };

        case GET_ALL_ORDERS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                allOrders: action.payload,
            };

        case GET_ALL_ORDERS_STATUS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                allOrderStatus: action.payload,
            };

        case UPDATE_ORDER_STATE:
            return {
                ...JSON.parse(JSON.stringify(state)),
            };

        case GET_DIRECTIONS_USERS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                directionsUser: action.payload,
            };

        case GET_ALL_REVIEW_BY_USER:
            return {
                ...state,
                reviewsUser: action.payload,
            };

        case DELETE_USER:
            const users = state.allUsers.filter(
                (user) => user.uid !== action.payload
            );
            return {
                ...state,
                allUsers: users,
            };

        case SET_PAYMENTS_STATISTICS:
            return {
                ...state,
                paymentsStatistics: action.payload,
            };
        case USERS_MOST_BUIES:
            return {
                ...state,
                usersMostBuies: action.payload,
            };

        case DELETE_FAVORITES_WITHOUT_ALLBOOKS:
            const availableFavorite = state.favorites.filter(
                (b) => b !== action.payload
            );
            return {
                ...state,
                favorites: availableFavorite,
            };

        case SET_CATEGORIES_MOST_BUY:
            return {
                ...state,
                categoriesMostBuies: action.payload,
            };

        case SET_USERNAME:
            return {
                ...state,
                displayName: action.payload,
            };

        default:
            return state;
    }
>>>>>>> 93b0a4a9ac8ce9ddeb6858e7d63469d106217317
}
export default rootReducer;
