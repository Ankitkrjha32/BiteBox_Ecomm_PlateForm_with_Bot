import { Link as RouterLink } from "react-router-dom"; // For regular page navigation
import Location from "../../pages/home/components/Location";
import "./sidebar.css";

const Sidebar = () => {
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
        <div className="sidebar bg-[#74b83e] h-full p-4">
            <Location />
            <div className="h-[1px] w-full bg-white my-4 opacity-50"></div>
            <div className="flex flex-col gap-6">
                {navList.map((nav, index) => (
                    <RouterLink
                        key={index}
                        to={nav.link}
                        className="text-3xl text-white cursor-pointer">
                        {nav.name}
                    </RouterLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;














// import { Link as RouterLink } from "react-router-dom"; // For regular page navigation
// import { Link } from "react-scroll"; // For scrolling navigation
// import { useLocation } from "react-router-dom"; // To get the current route
// import Location from "../../pages/home/components/Location";
// import "./sidebar.css";

// const Sidebar = () => {
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
//         <div className="sidebar bg-[#74b83e] h-full p-4">
//             <Location />
//             <div className="h-[1px] w-full bg-white my-4 opacity-50"></div>
//             <div className="flex flex-col gap-6">
//                 {navList.map((nav, index) =>
//                     location.pathname === "/" ? (
//                         // Use react-scroll Link for home path
//                         <Link
//                             key={index}
//                             to={nav.link}
//                             smooth={true}
//                             duration={500}
//                             offset={-140}
//                             className="text-3xl text-white cursor-pointer">
//                             {nav.name}
//                         </Link>
//                     ) : (
//                         // Use react-router-dom Link for non-home path
//                         <RouterLink
//                             key={index}
//                             to={nav.link}
//                             className="text-3xl text-white cursor-pointer">
//                             {nav.name}
//                         </RouterLink>
//                     )
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
