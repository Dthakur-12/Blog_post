import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Find from "../Pages/Find";
const RoutesFile = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Find" element={<Find/>} />
        </Routes>
    )
}
export default RoutesFile