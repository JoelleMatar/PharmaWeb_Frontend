import Dashboard from "../../components/Dashboard/Dashboard"
import Navbar from "../../components/navbar/Navbar"

const PharmacyDashboard = () => {
    return (
        <div style={{ overflowY: 'hidden'}}>
            {/* <div>PharmacyDashboard</div> */}
            <Navbar />
            <Dashboard />
        </div>
    )
}

export default PharmacyDashboard