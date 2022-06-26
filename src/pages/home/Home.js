import { useState } from "react";
import Footer from "../../components/footer/Footer";
import HomeSearchBar from "../../components/homeSearchBar/HomeSearchBar";
import SearchedProductSuggestions from "../../components/homeSearchBar/SearchedProductSuggestions/SearchedProductSuggestions";
import HomeServicesCards from "../../components/homeServicesCards/homeServicesCards";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
    const [searched, setSearched] = useState("");
    const getdata = (search) => {
        setSearched(search)
        console.log("getdata", search)

    }
    console.log("searcheddd", searched)
    return (
        <div>
            <Navbar />
            <HomeSearchBar handleSearchChange={getdata} />
            {
                searched != "" ? <SearchedProductSuggestions className="productsugg" searchedProduct={searched} /> : null
            }
            {/* <SearchedProductSuggestions searchedProduct={getdata} /> */}
            <HomeServicesCards />
            <Footer />
        </div>

    )
}

export default Home