import combineLogoText from "../../utils/images/logo/combine-logo-text-white.svg";
import user from "../../utils/images/header/user.svg";
import cart from "../../utils/images/header/cart.svg";
import ham from "../../utils/images/header/ham.svg";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { Link } from "react-router-dom";
// import axiosInstance from "../../services/users/axiosInstance";
// import refreshAccessToken from "../../services/users/refreshAccessToken";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userAuthenticatedAxiosInstance from "../../services/users/userAuthenticatedAxiosInstance";

const Header = ({ setIsSidebarActive, isSidebarActive, headerRef }) => {
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await userAuthenticatedAxiosInstance.post("/logout");
            console.log(response);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("An error occurred", error.message);
        } finally {
            localStorage.removeItem("accessToken");
            setIsUserLoggedIn(false); // Update login state
            navigate("/");
            console.log("User logged out unsuccessfully");
        }
    };

    return (
        <div className="bg-[#74B83E] h-20 flex items-center justify-between gap-4 px-8 w-full">
            {/* Logo */}
            <Link className="flex items-center" to={"/"}>
                <img
                    src={combineLogoText}
                    alt="Combine logo"
                    className="h-16"
                />
            </Link>

            {/* Search Bar */}
            <div className="w-1/3 md:block hidden">
                <SearchBar size={"small"} />
            </div>

            {/* Location */}
            <Button
                color={"#FFFFFF"}
                text={"Location"}
                textColor={"#00000"}
                customClasses="md:block hidden"
            />

            {/* User/Cart */}
            <div className="flex gap-4 items-center">
                {/* Cart */}
                <div>
                    <Link to={isUserLoggedIn ? "/cart" : "/login"} className="">
                        <img src={cart} alt="Cart" className="h-12" />
                    </Link>
                </div>
                {/* User */}
                <div>
                    <img src={user} alt="User" className="h-12" />
                </div>
                <Link to={isUserLoggedIn ? "#" : "/login"} className="" onClick={isUserLoggedIn ? handleLogout : null}>
                    <div className="bg-white text-black rounded-md px-4 py-2 flex justify-center items-center cursor-pointer">
                        <p>
                            {isUserLoggedIn ? "Logout" : "Login"}
                        </p>
                    </div>
                </Link>

                {/* Hamburger */}
                <div
                    className="md:hidden block"
                    onClick={() => setIsSidebarActive(!isSidebarActive)}
                    ref={headerRef}>
                    <img src={ham} alt="ham" className="h-12" />
                </div>
            </div>
        </div>
    );
};

export default Header;
