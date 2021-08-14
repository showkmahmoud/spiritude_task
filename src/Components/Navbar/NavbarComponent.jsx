import React, { useState, useContext, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { Store } from "../../Context/Provider";
import "./NavbarComponent.css";
import { auth, firestore } from "../../Firebase/config";



const NavbarComponent = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const store = useContext(Store);
  const toggle = () => setIsOpen(!isOpen);
  // eslint-disable-next-line 
  const [name, setName] = useState("");
 
  useEffect(() => {
      const fetchData = async () =>{
        if (user.currentUser) {
          const userInfo = await firestore
            .doc(`users/${user.currentUser.id}`)
            .get();
          setName(userInfo.data().displayName);
        }
      }
      fetchData();
  }, [user])


  return (
    <div>
      <Navbar color="light" light expand="md" className="fixed-top">
        <div className="container">
          <Link
            to="/"
            className="text-dark  text-capitalize"
          >
            product list
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="w-100 justify-content-between pt-2" navbar>
              <NavItem className="mx-5 mt-md-2 mt-lg-0">
                <Link className="text-dark " to="/">
                  Home
                </Link>
              </NavItem>
              <div className=' d-lg-flex justify-content-around flex-lg-nowrap col-2  '>
              <NavItem>
                <Link
                  className="text-dark navbar_items "
                  to="/CartPage"
                >
                  <MdAddShoppingCart className="cartIcon navbar_items " />
                  <span style={{ color: "#F34770" }}>
                    {store.cart.cartCounter}
                  </span>
                </Link>
              </NavItem>

              {!user.currentUser && (
                <NavItem>
                  <Link
                  style={{ color: "#F34770" }}
                  className=" text-decoration-none mt-5 "
                  to="/SignIn"
                >
                  Sign In
                </Link>
                </NavItem>
              )}
               {user.currentUser &&(
                  <NavItem>
                  <Link
                  style={{ color: "#F34770" }}
                  className=" text-decoration-none mt-5 "
                  onClick={() => auth.signOut()}
                  to ='/'
                >
                  Log Out
                </Link>
                </NavItem>
               )}



              </div>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
