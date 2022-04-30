import { Grid } from "@mui/material/Grid";
import Logo from "../../../src/assets/logo.svg";
import Navbar from "../../components/navbar/Navbar";
import "./homeSearchBar.css";
import homeBG from "../../assets/homeSearchBg.jpg"

const HomeSearchBar = () => {
    return (
        <div className="searchArea">
            <img src={homeBG} />
        </div>

    )
}

export default HomeSearchBar