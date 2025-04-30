import Hero from "./components/Hero";
import Product from "./components/Product";

import "./home.css";

const Home = () => {
    return (
        <div className="home overflow-x-hidden  relative">
            <div className="w-full">
                <Hero />
                <Product />
            </div>
        </div>
    );
};

export default Home;
