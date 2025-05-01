import Home from "./components/pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import NavBar from "./components/common/navbar/NavBar";
// import Location from "./components/pages/home/Location";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/common/sidebar/Sidebar";
import Category from "./components/pages/category/Category";
import SearchBar from "./components/common/SearchBar";
import "./components/common/sidebar/sidebar.css";
import Footer from "./components/common/footer/Footer";
import Product from "./components/pages/product/Product";
import ScrollToTop from "./components/common/ScrollToTop";
import Login from "./components/pages/auth/Login";
import Signup from "./components/pages/auth/Signup";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Unauthenticated from "./routes/Unauthenticated";
import UserProvider from "./context/UserContext";
import Cart from "./components/pages/cart/cart";

function App() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const sidebarRef = useRef(null); // Create a ref for the sidebar
    const headerRef = useRef(null); // Create a ref for the header

    // Close the sidebar if clicked outside the sidebar (and not at the ham button)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !headerRef.current.contains(event.target)
            ) {
                setIsSidebarActive(false); // Close sidebar if clicked outside
            }
        };

        // Attach the event listener
        document.addEventListener("click", handleClickOutside);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <BrowserRouter>
            <UserProvider>
                <ScrollToTop />
                <div className="App">

                    {/* HEADER-NAVBAR-SIDEBAR */}
                    <div className="fixed z-40 w-full">
                        <div
                            className={`${isSidebarActive ? "active" : ""
                                } sidebar-parent z-50`}
                            ref={sidebarRef}>
                            <Sidebar />
                        </div>
                        <Header
                            isSidebarActive={isSidebarActive}
                            setIsSidebarActive={setIsSidebarActive}
                            headerRef={headerRef}
                        />
                        <NavBar />
                        <div className="min-h-12 md:hidden block">
                            <SearchBar size={"medium"} />
                        </div>
                        {/* <Location /> */}
                    </div>


                    {/* CONTENT */}
                    <div className="content-wrapper pt-32">
                        <Routes>
                            {/* Public Routes - No Auth Needed */}
                            <Route path="/" element={<Home />} />
                            <Route path="/category/:id" element={<Category />} />
                            <Route path="/product/:id" element={<Product />} />

                            {/* Unauthenticated Routes - Only Accessible When Logged Out */}
                            <Route element={<Unauthenticated />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                            </Route>

                            {/* Protected Routes - Only Accessible When Logged In */}
                            <Route element={<ProtectedRoutes />}>
                                {/* <Route path="/profile" element={<div>Dashboard</div>} /> */}
                                <Route path="/cart" element={<Cart />} />
                            </Route>

                        </Routes>
                    </div>

                    {/* FOOTER */}
                    <div>
                        <Footer />
                    </div>
                </div>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
