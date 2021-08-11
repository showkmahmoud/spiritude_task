import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Components/Home/Home";
import NavbarComponent from "./Components/Navbar/NavbarComponent";
import CartPage from "./Components/CartPage/CartPage";

function App() {
  return (
    <Router>
      <NavbarComponent />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/CartPage">
            <CartPage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
