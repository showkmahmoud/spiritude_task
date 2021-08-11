import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { Store } from "../../Context/Provider";
import './NavbarComponent.css';
const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const store = useContext(Store);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="fixed-top">
        <div className="container">
          <Link
            to="/"
            className="text-dark text-decoration-none text-capitalize"
          >
            product list
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="w-100" navbar>
              <NavItem className="mx-5">
                <Link className="text-dark text-decoration-none" to="/">
                  Home
                </Link>
              </NavItem>
            </Nav>
            <NavbarText className=" px-2 w-25">
              <Link className="text-dark navbar_items text-decoration-none" to="/CartPage">
              <MdAddShoppingCart className="cartIcon navbar_items" />
                 <span style={{color:"#F34770"}}>{store.cart.cartCounter}</span>
              </Link>
            </NavbarText>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
