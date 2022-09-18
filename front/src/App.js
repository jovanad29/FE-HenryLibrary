import { Route, Switch } from "react-router-dom";
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
import CategoryForm from "./Components/Admin/CategoriesView/CategoryForm";

function App() {
  const status = useCheckAuth();

  if (status === "checking") {
    //     return <div>Autenticando</div>;
  }

  return (
    <>
      {/*Se agregan las rutas para el primer spint solo queda importar los componentes y pasarlos a cada ruta, puede ser necesario realizar cambios, ir descomentando una a una para que se puedan renderizar bien los componentes */}

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
        <Route path={"/nuevoLibro"} component={NewBookChakra} />

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

        {/*Ruta administrador*/}
        <Route exact path={"/user/admin"} component={Dashboard} />
        <Route exact path={"/user/admin/catalogue"} component={LibraryView} />
        <Route exact path={"/user/admin/users"} component={UserView} />
        <Route exact path={"/user/admin/payments"} component={PaymentsView} />
        <Route exact path={"/user/admin/categories/"} component={CategoryForm} />
        <Route path={"/user/admin/payments/:id"} component={DetailPayment} />

        {/*Rutas Extras*/}
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/politicaPrivacidad" component={PoliticaPrivacidad} />
        <Route exact path={"/checkout/validate"} component={Validate} />
        <Route exact path={"/checkout/pending"} component={Pending} />
        <Route exact path={"/checkout/rejected"} component={Rejected} />
        <Route exact path={"/checkout/success"} component={Success} />
        <Route exact path={"/checkout"} component={Checkout} />
        <Route path="/politicaDevolucion" component={PoliticaDevolucion} />

        {/*Rutas Error*/}
        <Route exact path={"/purchaseOrders"} component={PurchaseOrders} />
        <Route path="*" component={PageError} />
      </Switch>
    </>
  );
}

export default App;
