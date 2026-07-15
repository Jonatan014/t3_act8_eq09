import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App(){

    return(

        <AuthProvider>

            <BrowserRouter basename="/t3_act8_eq09">

                <Routes>

                    <Route path="/" element={<Login/>}/>

                    <Route path="/dashboard" element={<Dashboard/>}/>

                </Routes>

            </BrowserRouter>

        </AuthProvider>

    )

}

export default App;