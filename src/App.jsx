import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Home from "./pages/Home";
import JobListing from "./pages/JobListing";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SignInPage";
import Favorites from "./pages/Favorites";
import Nav from "./components/Nav-component/Nav";

function ProtectedRoute() {
    const authContext = useContext(AuthContext);
    const isAuth = authContext && authContext.user !== null;

    return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes
                style={{
                    backgroundImage: "url('../../public/assets/workplace.jpg')",
                }}
            >
                <Route path="/" element={<Home />} />
                <Route path="/joblisting" element={<JobListing />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/favorites" element={<ProtectedRoute />}>
                    <Route path="/favorites" element={<Favorites />} />
                </Route>
            </Routes>

            {/*  <footer>
                <p>@Footer</p>
            </footer> */}
        </BrowserRouter>
    );
}

export default App;