import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

//COMPONENTES
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import BookDetail from "./Components/BookDetail/BookDetail";
// import NewBook from "./Components/NewBook/NewBook";
import NewBookChakra from "./Components/NewBook/NewBookChakra";
import AboutUs from "./Components/Extras/AboutUs/AboutUs";
import PoliticaPrivacidad from "./Components/Extras/PoliticaPrivacidad/PoliticaPrivacidad";
import PoliticaDevolucion from "./Components/Extras/PoliticaDevolucion/PoliticaDevolucion";
import ShoppingBook from "./Components/ShoppingBook/ShoppingBook";
import PageError from "./Components/PageError/PageError.jsx";
import CardsAuthor from "./Components/CardsAuthor/CardsAuthor";
// import Favorites from "./Components/Favorites/Favorites";
import Success from "./Components/MercadoPago/SuccessMP";
import Checkout from "./Components/Checkout/Checkout";
import Rejected from "./Components/MercadoPago/RejectedMP";
import Pending from "./Components/MercadoPago/PendingMP";
import Validate from "./Components/MercadoPago/ValidateMP";
import PurchaseOrders from "./Components/DashboardUser/PurchaseOrders/PurchaseOrders";
import { useCheckAuth } from "../src/hooks/useCheckAuth";
import Dashboard from "./Components/Admin/Dashboard";
import DashboardUser from "./Components/DashboardUser/DashboardUser.jsx";
import UserView from "./Components/Admin/UserView/UserView";
import PaymentsView from "./Components/Admin/PaymentsView/PaymentsView";
import DetailPayment from "./Components/Admin/PaymentsView/DetailPayment/DetailPayment";
import LibraryView from "./Components/Admin/LibraryView/LibraryView";
import EditBook from "./Components/Admin/LibraryView/EditBook/EditBook";
import NewBook from "./Components/Admin/LibraryView/NewBook/NewBook";
import CategoriesView from "./Components/Admin/CategoriesView/CategoriesView";
import CategoryForm from "./Components/Admin/CategoriesView/CategoryForm";
import { useCheckAdmin } from "./hooks/useCheckAdmin";

function App() {
    const status = useCheckAuth();
    const isAdmin = useCheckAdmin();
    console.log(status, isAdmin);

    if (status === "not-authenticated") {
        return (
            <Switch>
                {/*Ruta Landing Page */}
                <Route exact path="/" component={LandingPage} />

                {/*Ruta Catalogo de Libros */}
                <Route path="/home" component={Home} />

                {/*Ruta Favoritos de Libros */}
                {/* <Route path="/favoritos" component={Favorites} /> */}

                {/*Ruta Catalogo de Libros */}
                <Route path={"/carrito"} component={ShoppingBook} />

                {/*Ruta Creacion de Nuevo Libro */}
                {/* <Route path={"/nuevoLibro"} component={NewBookChakra} /> */}

                {/*Ruta Catalogo de Libros */}
                {/* <Route path={"/favoritos"} component={} /> */}

                {/*Ruta Detalles de Libro */}
                <Route path="/catalog/detail/:id" component={BookDetail} />

                {/*Ruta Inicio de Sesion */}
                {/* <Route path={"/login"} component={} /> */}
                <Route path="/catalog/author/:id" component={CardsAuthor} />
                {/*Ruta Panel de usuario */}
                {/* <Route path={"/dashboard/user"} component={DashboardUser} /> */}

                {/* <Route path="/catalog/author/:id" component={CardsAuthor} /> */}

                {/*Ruta administrador*/}
                {/* <Route exact path={"/user/admin"} component={Dashboard} /> */}
                {/* <Route
                        exact
                        path={"/user/admin/catalogue"}
                        component={LibraryView}
                    /> */}
                {/* <Route
                        exact
                        path={"/user/admin/catalogue/new"}
                        component={NewBook}
                    /> */}
                {/* <Route
                        path={"/user/admin/catalogue/:id"}
                        component={EditBook}
                    /> */}
                {/* <Route exact path={"/user/admin/users"} component={UserView} /> */}
                {/* <Route
                        exact
                        path={"/user/admin/payments"}
                        component={PaymentsView}
                    /> */}
                {/* <Route
                        exact
                        path={"/user/admin/categories/"}
                        component={CategoryForm}
                    /> */}
                {/* <Route
                        path={"/user/admin/payments/:id"}
                        component={DetailPayment}
                    /> */}

                {/*Rutas Extras*/}
                <Route path="/aboutUs" component={AboutUs} />
                <Route
                    path="/politicaPrivacidad"
                    component={PoliticaPrivacidad}
                />
                <Route exact path={"/checkout/validate"} component={Validate} />
                <Route exact path={"/checkout/pending"} component={Pending} />
                <Route exact path={"/checkout/rejected"} component={Rejected} />
                <Route exact path={"/checkout/success"} component={Success} />
                {/* <Route exact path={"/checkout"} component={Checkout} /> */}
                <Route
                    path="/politicaDevolucion"
                    component={PoliticaDevolucion}
                />

                {/*Rutas Error*/}
                {/* <Route
                        exact
                        path={"/purchaseOrders"}
                        component={PurchaseOrders}
                    /> */}

                {/* <Route path={"/user/admin"}>
                    <Redirect to="/" />
                </Route> */}

                <Route exact path={"/user/admin/logout"}>
                    <Redirect to="/" />
                </Route>
                <Route path={"/user/admin"}><Redirect to="/" /></Route>
                {/* <Route exact path={"/user/admin/catalogue"} />
                <Route exact path={"/user/admin/catalogue/new"} />
                <Route exact path={"/user/admin/catalogue/:id"} />
                <Route exact path={"/user/admin/categories/CategoriesForm"} />
                <Route exact path={"/user/admin/categories"} />
                <Route exact path={"/user/admin/users"} />
                <Route exact path={"/user/admin/payments"} />
                <Route exact path={"/user/admin/payments/:id"} /> */}

                <Route path="*" component={PageError} />
            </Switch>
        );
    } else if (status === "authenticated") {
        if (isAdmin) {
            return (
                <Switch>
                    {/*Ruta Landing Page */}
                    {/* <Route exact path="/" component={!isAdmin && LandingPage} /> */}

                    {/*Ruta Catalogo de Libros */}
                    {/* <Route path="/home" component={Home} /> */}

                    {/*Ruta Favoritos de Libros */}
                    {/* <Route path="/favoritos" component={Favorites} /> */}

                    {/*Ruta Catalogo de Libros */}
                    {/* <Route path={"/carrito"} component={ShoppingBook} /> */}

                    {/*Ruta Creacion de Nuevo Libro */}
                    {/* <Route path={"/nuevoLibro"} component={NewBookChakra} /> */}

                    {/*Ruta Catalogo de Libros */}
                    {/* <Route path={"/favoritos"} component={} /> */}

                    {/*Ruta Detalles de Libro */}
                    {/* <Route path="/catalog/detail/:id" component={BookDetail} /> */}

                    {/*Ruta Inicio de Sesion */}
                    {/* <Route path={"/login"} component={} /> */}
                    {/* <Route path="/catalog/author/:id" component={CardsAuthor} /> */}
                    {/*Ruta Panel de usuario */}
                    {/* <Route path={"/dashboard/user"} component={DashboardUser} /> */}

                    {/* <Route path="/catalog/author/:id" component={CardsAuthor} /> */}

                    {/*Ruta administrador*/}
                    <Route exact path={"/user/admin"} component={Dashboard} />
                    <Route
                        exact
                        path={"/user/admin/catalogue"}
                        component={LibraryView}
                    />
                    <Route
                        exact
                        path={"/user/admin/catalogue/new"}
                        component={NewBook}
                    />
                    <Route
                        path={"/user/admin/catalogue/:id"}
                        component={EditBook}
                    />
                    <Route
                        exact
                        path={"/user/admin/categories/CategoriesForm"}
                        component={CategoryForm}
                    />
                    <Route
                        exact
                        path={"/user/admin/categories"}
                        component={CategoriesView}
                    />
                    <Route
                        exact
                        path={"/user/admin/users"}
                        component={UserView}
                    />
                    <Route
                        exact
                        path={"/user/admin/payments"}
                        component={PaymentsView}
                    />
                    <Route
                        path={"/user/admin/payments/:id"}
                        component={DetailPayment}
                    />

                    {/*Rutas Extras*/}
                    {/* <Route path="/aboutUs" component={AboutUs} />
                    <Route
                        path="/politicaPrivacidad"
                        component={PoliticaPrivacidad}
                    />
                    <Route
                        exact
                        path={"/checkout/validate"}
                        component={Validate}
                    />
                    <Route
                        exact
                        path={"/checkout/pending"}
                        component={Pending}
                    />
                    <Route
                        exact
                        path={"/checkout/rejected"}
                        component={Rejected}
                    />
                    <Route
                        exact
                        path={"/checkout/success"}
                        component={Success}
                    />
                    <Route exact path={"/checkout"} component={Checkout} />
                    <Route
                        path="/politicaDevolucion"
                        component={PoliticaDevolucion}
                    /> */}

                    {/*Rutas Error*/}
                    {/* <Route
                        exact
                        path={"/purchaseOrders"}
                        component={PurchaseOrders}
                    /> */}
                    {/* <Route exact path={"/user/admin/logout"}>
                    <Redirect to="/" />
                    </Route> */}

                    <Route exact path={"/user/admin/logout"} />

                    {/* <Route path="*">
                        <Redirect to="/user/admin" />
                    </Route> */}
                </Switch>
            );
        } else {
            return (
                <Switch>
                    {/*Ruta Landing Page */}
                    <Route exact path="/" component={LandingPage} />

                    {/*Ruta Catalogo de Libros */}
                    <Route path="/home" component={Home} />

                    {/*Ruta Favoritos de Libros */}
                    {/* <Route path="/favoritos" component={Favorites} /> */}

                    {/*Ruta Catalogo de Libros */}
                    <Route path={"/carrito"} component={ShoppingBook} />

                    {/*Ruta Creacion de Nuevo Libro */}
                    {/* <Route path={"/nuevoLibro"} component={NewBookChakra} /> */}

                    {/*Ruta Catalogo de Libros */}
                    {/* <Route path={"/favoritos"} component={} /> */}

                    {/*Ruta Detalles de Libro */}
                    <Route path="/catalog/detail/:id" component={BookDetail} />

                    {/*Ruta Inicio de Sesion */}
                    {/* <Route path={"/login"} component={} /> */}
                    <Route path="/catalog/author/:id" component={CardsAuthor} />
                    {/*Ruta Panel de usuario */}
                    <Route path={"/dashboard/user"} component={DashboardUser} />

                    <Route path="/catalog/author/:id" component={CardsAuthor} />

                    {/* <Route path={"/user/admin/"}>
                        <Redirect to="/" />
                    </Route> */}

                    {/*Ruta administrador*/}
                    {/* <Route exact path={"/user/admin"} component={Dashboard} />
                    <Route
                        exact
                        path={"/user/admin/catalogue"}
                        component={LibraryView}
                    />
                    <Route
                        exact
                        path={"/user/admin/catalogue/new"}
                        component={NewBook}
                    />
                    <Route
                        path={"/user/admin/catalogue/:id"}
                        component={EditBook}
                    />
                    <Route
                        exact
                        path={"/user/admin/categories/CategoriesForm"}
                        component={CategoryForm}
                    />
                    <Route
                        exact
                        path={"/user/admin/categories"}
                        component={CategoriesView}
                    />
                    <Route
                        exact
                        path={"/user/admin/users"}
                        component={UserView}
                    />
                    <Route
                        exact
                        path={"/user/admin/payments"}
                        component={PaymentsView}
                    />
                    <Route
                        path={"/user/admin/payments/:id"}
                        component={DetailPayment}
                    /> */}

                    {/*Rutas Extras*/}
                    <Route path="/aboutUs" component={AboutUs} />
                    <Route
                        path="/politicaPrivacidad"
                        component={PoliticaPrivacidad}
                    />
                    <Route
                        exact
                        path={"/checkout/validate"}
                        component={Validate}
                    />
                    <Route
                        exact
                        path={"/checkout/pending"}
                        component={Pending}
                    />
                    <Route
                        exact
                        path={"/checkout/rejected"}
                        component={Rejected}
                    />
                    <Route
                        exact
                        path={"/checkout/success"}
                        component={Success}
                    />
                    <Route exact path={"/checkout"} component={Checkout} />
                    <Route
                        path="/politicaDevolucion"
                        component={PoliticaDevolucion}
                    />

                    {/*Rutas Error*/}
                    <Route
                        exact
                        path={"/purchaseOrders"}
                        component={PurchaseOrders}
                    />
                    <Route path="*" component={PageError} />
                </Switch>
            );
        }
    } else {
        return (
            <Switch>
                {/*Ruta Landing Page */}
                <Route exact path="/" component={LandingPage} />

                {/*Ruta Catalogo de Libros */}
                <Route path="/home" component={Home} />

                {/*Ruta Favoritos de Libros */}
                {/* <Route path="/favoritos" component={Favorites} /> */}

                {/*Ruta Catalogo de Libros */}
                <Route path={"/carrito"} component={ShoppingBook} />

                {/*Ruta Creacion de Nuevo Libro */}
                {/* <Route path={"/nuevoLibro"} component={NewBookChakra} /> */}

                {/*Ruta Catalogo de Libros */}
                {/* <Route path={"/favoritos"} component={} /> */}

                {/*Ruta Detalles de Libro */}
                <Route path="/catalog/detail/:id" component={BookDetail} />

                {/*Ruta Inicio de Sesion */}
                {/* <Route path={"/login"} component={} /> */}
                <Route path="/catalog/author/:id" component={CardsAuthor} />
                {/*Ruta Panel de usuario */}
                {/* <Route path={"/dashboard/user"} component={DashboardUser} /> */}

                <Route path="/catalog/author/:id" component={CardsAuthor} />

                {/*Ruta administrador*/}
                {/* <Route exact path={"/user/admin"} component={Dashboard} /> */}
                {/* <Route
                        exact
                        path={"/user/admin/catalogue"}
                        component={LibraryView}
                    />
                    <Route
                        exact
                        path={"/user/admin/catalogue/new"}
                        component={NewBook}
                    />
                    <Route
                        path={"/user/admin/catalogue/:id"}
                        component={EditBook}
                    />
                    <Route
                        exact
                        path={"/user/admin/users"}
                        component={UserView}
                    />
                    <Route
                        exact
                        path={"/user/admin/payments"}
                        component={PaymentsView}
                    />
                    <Route
                        exact
                        path={"/user/admin/categories/"}
                        component={CategoryForm}
                    />
                    <Route
                        path={"/user/admin/payments/:id"}
                        component={DetailPayment}
                    /> */}

                {/*Rutas Extras*/}
                <Route path="/aboutUs" component={AboutUs} />
                <Route
                    path="/politicaPrivacidad"
                    component={PoliticaPrivacidad}
                />
                <Route exact path={"/checkout/validate"} component={Validate} />
                <Route exact path={"/checkout/pending"} component={Pending} />
                <Route exact path={"/checkout/rejected"} component={Rejected} />
                <Route exact path={"/checkout/success"} component={Success} />
                {/* <Route exact path={"/checkout"} component={Checkout} /> */}
                <Route
                    path="/politicaDevolucion"
                    component={PoliticaDevolucion}
                />

                {/*Rutas Error*/}
                {/* <Route
                        exact
                        path={"/purchaseOrders"}
                        component={PurchaseOrders}
                    /> */}

                <Route exact path={"/user/admin/logout"}>
                    <Redirect to="/" />
                </Route>
                <Route exact path={"/user/admin"} />
                <Route exact path={"/user/admin/catalogue"} />
                <Route exact path={"/user/admin/catalogue/new"} />
                <Route path={"/user/admin/catalogue/:id"} />
                <Route exact path={"/user/admin/categories/CategoriesForm"} />
                <Route exact path={"/user/admin/categories"} />
                <Route exact path={"/user/admin/users"} />
                <Route exact path={"/user/admin/payments"} />
                <Route path={"/user/admin/payments/:id"} />

                {/* <Route path="*" component={PageError} /> */}
            </Switch>
        );
    }
}

export default App;
