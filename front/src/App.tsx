import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import Welcome from "./Pages/Welcome.tsx";

const App = () => {

    return (
        <Routes>
            <Route index element={<LoginPage/>} />
            <Route path={"/welcome"} element={<Welcome/>}/>
        </Routes>
    );
};

export default App;
