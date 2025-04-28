import "./navbar.css";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom for non-home pages

const NavBar = () => {
    // Navigation list for non-home pages
    const navList = [
        { name: "Home", link: "/" },
        { name: "Today's Deal", link: "category/Today's Deal" },
        { name: "Offers", link: "category/Offers" },
        { name: "Top Rated", link: "category/Top Rated" },
        { name: "Vegetables", link: "category/Vegetables" },
        { name: "Fruits", link: "category/Fruits" },
        { name: "Snacks", link: "category/Snacks" },
    ];

    return (
        <div className="navbar bg-[#429A2D] h-12 w-full md:flex items-center justify-evenly hidden">
            {navList.map((nav, index) => (
                <RouterLink
                    key={index}
                    to={nav.link}
                    className="text-white hover:text-gray text-2xl nav-item cursor-pointer">
                    <div className="transition-all duration-100">
                        {nav.name}
                    </div>
                    <div className="under-highlight w-full h-[1px] bg-white opacity-0 transition-all"></div>
                </RouterLink>
            ))}
        </div>
    );
};

export default NavBar;















// BELOW IS FOR


// import "./navbar.css";
// import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom for non-home pages
// import { Link } from "react-scroll";
// import { useLocation } from "react-router-dom";

// const NavBar = () => {
//     // Navigation lists for different pages
//     const homeNavList = [
//         { name: "Home", link: "App" },
//         { name: "Today's Deal", link: "category-Today's Deal" },
//         { name: "Offers", link: "category-Offers" },
//         { name: "Top Rated", link: "category-Top Rated" },
//         { name: "Vegetables", link: "category-Vegetables" },
//         { name: "Fruits", link: "category-Fruits" },
//         { name: "Snacks", link: "category-Snacks" },
//     ];

//     const NoneHomeNavList = [
//         { name: "Home", link: "/" },
//         { name: "Today's Deal", link: "category/Today's Deal" },
//         { name: "Offers", link: "category/Offers" },
//         { name: "Top Rated", link: "category/Top Rated" },
//         { name: "Vegetables", link: "category/Vegetables" },
//         { name: "Fruits", link: "category/Fruits" },
//         { name: "Snacks", link: "category/Snacks" },
//     ];

//     const location = useLocation();

//     // Decide which nav list to use based on the location
//     const navList = location.pathname === "/" ? homeNavList : NoneHomeNavList;

//     return (
//         <div className="navbar bg-[#429A2D] h-12 w-full md:flex items-center justify-evenly hidden">
//             {navList.map((nav, index) =>
//                 location.pathname === "/" ? (
//                     // Use react-scroll Link for home path
//                     <Link
//                         key={index}
//                         to={nav.link}
//                         smooth={true}
//                         duration={500}
//                         offset={-128}
//                         className="text-white hover:text-gray text-2xl nav-item cursor-pointer">
//                         <div className="transition-all duration-100">
//                             {nav.name}
//                         </div>
//                         <div className="under-highlight w-full h-[1px] bg-white opacity-0 transition-all"></div>
//                     </Link>
//                 ) : (
//                     // Use react-router-dom Link for non-home path
//                     <RouterLink
//                         key={index}
//                         to={nav.link}
//                         className="text-white hover:text-gray text-2xl nav-item cursor-pointer">
//                         <div className="transition-all duration-100">
//                             {nav.name}
//                         </div>
//                         <div className="under-highlight w-full h-[1px] bg-white opacity-0 transition-all"></div>
//                     </RouterLink>
//                 )
//             )}
//         </div>
//     );
// };

// export default NavBar;
