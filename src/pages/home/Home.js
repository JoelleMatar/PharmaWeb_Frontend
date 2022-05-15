import HomeSearchBar from "../../components/homeSearchBar/HomeSearchBar";
import HomeServicesCards from "../../components/homeServicesCards/homeServicesCards";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <HomeSearchBar />
            <HomeServicesCards />
        </div>

    )
}

export default Home