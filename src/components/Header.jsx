import React, { useEffect, useRef, useState } from "react";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useScrollDirection from "./NavbarScroll";
import { logOutUser } from "../rtk/reducers//index";
import Cart from "./Cart";
import { deleteItemsCart } from "../rtk/reducers/cartReducer";
import { deleteItemsStores } from "../rtk/reducers/storesReducer";
import StoresPage from './StoresPage';
import Orders from "./Orders";
import { deleteItemsOrder } from "../rtk/reducers/orderReducer";
import { deleteAllClicked } from "../rtk/reducers/productReducer";

const Header = () => {
  const [activeItem, setActiveItem] = useState(null || "home");
  const [showCart, setShowCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [showWatch, setShowWatch] = useState("d-block");
  const [showOrder, setShowOrder] = useState("d-none");
  const [clear, setClear] = useState('');
  const boxRef = useRef(null);

  const {user} = useSelector(state => state.userState);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };

  useEffect(() => {
    const item = localStorage.getItem("activeItem");
    if (item) {
      setActiveItem(item);
    }
  }, []);

  const scrollDirection = useScrollDirection();
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100);
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  const handleWatch = () => {
    setShowWatch("d-block");
    setShowOrder("d-none");
    setClear('watch');
  }
  
  const handleOrder = () => {
    setShowOrder("d-block");
    setShowWatch('d-none');
    setClear("order");
  }

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleSign = () => {
    if (user) {
      dispatch(logOutUser());
    } else {
      navigate("/signIn");
    }
  };

  const handleClearCart = () => {
    dispatch(deleteItemsCart());
  };

  const handleClearStores = (e) => {
    if (e.target.id === "watch" || e.target.id === "" ) {
      dispatch(deleteItemsStores());
    } else {
      dispatch(deleteItemsOrder());
    };
    dispatch(deleteAllClicked());
  };

  return (
    <div className={`header navbar navbar-expand-lg bg-primary sticky p-1 ${scrollDirection === "down" ? "hide" : "show"}`}>
      <Container>
        <Navbar.Brand href="/">
          <img src="/image/logo.png" className="img-fluid" alt="logo" />
        </Navbar.Brand>
        <div className={`${showToggle ? "start-0" : "d-none d-md-flex start-100"} header-items`}>
          <ul  className="d-md-flex align-items-center d-block p-0 my-2 gap-4 pt-md-1">
            <li className='nav-item ' onClick={() => handleItemClick("home")}>
              <Link onClick={handleClick} to="/" className={`${activeItem === "home" ? "active" : ""} text-muted`}>
                Home
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleItemClick("men")}>
              <Link onClick={handleClick} to="/men" className={`${activeItem === "men" ? "active" : ""} text-muted`}>
                Men
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleItemClick("woman")}>
              <Link to="/woman" className={`${activeItem === "woman" ? "active" : ""} text-muted `}>
                Woman
              </Link>
            </li>
            <li className="nav-item" onClick={() => handleItemClick("contact")}>
              <Link to="/Contact" className={`${activeItem === "contact" ? "active" : ""} text-muted`}>
                Contact us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signIn">
                <button className="d-md-none bg-main text-white fw-semibold px-3 py-2 rounded-3 my-2 w-100">
                  {user ? "Sign Out" : "Sign In"}
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center" style={{gap:'11px'}}>
          <button onClick={() => setShowSaved(true)} className="cart-btn bg-transparent position-relative p-0 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} fill="#39C7A5">
              <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
            </svg>
          </button>
          <Offcanvas show={showSaved} onHide={() => setShowSaved(false)} placement="end" style={{ zIndex: "10000" }} className="stores-container">
            <Offcanvas.Header className="d-block px-3 py-2">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <button id={clear} className="m-0" style={{ fontWeight: "400" }} onClick={(e) => handleClearStores(e)}>
                  Clear
                </button>
                <Offcanvas.Title className="text-center" style={{ color: "#5f5e5f" }}>
                  Stores
                </Offcanvas.Title>
                <button className="bg-transparent" onClick={() => setShowSaved(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill="#5F5E5F" >
                    <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                  </svg>
                </button>
              </div>
              <div className="d-flex justify-content-center gap-5">
                <button id="watch" className="watch rounded-2 fw-semibold" onClick={handleWatch}
                  style={{backgroundColor: showWatch === "d-block" ? "#39C7A5" : "#f0f3f5",
                          color: showWatch === "d-block" ? "#fff" : "#6c757d"
                        }} 
                >Watch</button>
                <button id="order" className="order rounded-2 fw-semibold" onClick={handleOrder}
                  style={{backgroundColor: showOrder === "d-block" ? "#39C7A5" : "#f0f3f5",
                          color: showOrder === "d-block" ? "#fff" : "#6c757d"
                        }} 
                >Order</button>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body className="rounded-3 p-0 position-relative" style={{ backgroundColor: "#f0f3f5", overflow: 'visible' }}>
                <StoresPage showWatch={showWatch}/> 
                <Orders showOrder={showOrder}/> 
            </Offcanvas.Body>
          </Offcanvas>
          <button onClick={() => setShowCart(true)} className="cart-btn bg-transparent position-relative p-0" style={{marginBottom:'-1px'}}>
            <div className="position-absolute text-primary rounded-circle fw-bold bg-main" style={{ fontSize: "12px", width: "18px", right: "-7px", bottom: "20px",}}>
              {totalQuantity}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={24} fill="#39C7A5">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </button>
          <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end" className="cart-container">
            <Offcanvas.Header className="align-items-center">
              <button className="m-0" style={{ fontWeight: "400" }} onClick={handleClearCart}>
                Clear
              </button>
              <Offcanvas.Title className="text-center" style={{ color: "#5f5e5f" }}>
                Cart
              </Offcanvas.Title>
              <button className="bg-transparent" onClick={() => setShowCart(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} fill="#5F5E5F">
                  <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                </svg>
              </button>
            </Offcanvas.Header>
            <Offcanvas.Body className="rounded-3 p-0 position-relative" style={{ backgroundColor: "#f0f3f5" }}>
              <Cart closeCart={() => setShowCart(false)}/>
            </Offcanvas.Body>
          </Offcanvas>
          {user && user.email === "shopit22@gmail.com" 
          ? <button className='bg-transparent p-0' style={{marginBottom:'-1px', marginLeft:'2px'}}>
              <svg onClick={handleDashboard} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#39C7A5' width={22}>
                  <path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"/>
              </svg> 
          </button>
          : "" }
          <button onClick={handleSign} className="d-md-block d-none bg-main text-white fw-semibold px-3 py-2 rounded-3 ms-1">
            {user ? "Sign Out" : "Sign In"}
          </button>
          <button onClick={() => setShowToggle(!showToggle)} className="d-md-none bg-transparent p-0 ms-1">
            {showToggle === true ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={26} fill="#f44336">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={26} fill="#00A099">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            )}
          </button>
        </div>
      </Container>
    </div>
  );
};
export default Header;
