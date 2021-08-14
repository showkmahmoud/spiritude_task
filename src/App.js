import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/config";
//Pages
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp'
import Home from "./Components/Home/Home";
import NavbarComponent from "./Components/Navbar/NavbarComponent";
import CartPage from "./Components/CartPage/CartPage";


function App() {
  const initialState = {
    currentUser: null,
  };
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setUser({
            currentUser: {
              id: snapshot.id,
            },
          });
        });
      } else {
        setUser({
          ...initialState,
        });
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <NavbarComponent user={user} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/CartPage">
            <CartPage />
          </Route>
          <Route
              path="/SignIn"
              render={() =>
                user.currentUser ? <Redirect to="/" /> : <SignIn></SignIn>
              }
            />
          <Route
              path="/SignUp"
              render={() =>
                user.currentUser ? <Redirect to="/" /> : <SignUp></SignUp>
              }
            />
        </Switch>
    </Router>
  );
}

export default App;
