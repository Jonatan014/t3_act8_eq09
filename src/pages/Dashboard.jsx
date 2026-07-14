import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Pomodoro from "../components/Pomodoro";
import Estadisticas from "../components/Estadisticas";
import Tareas from "../components/Tareas";
import Tabla from "../components/Tabla";
import "../css/dashboard.css";

function Dashboard(){
    const params = new URLSearchParams(window.location.search);
    
    const [vista, setVista] = useState(
        params.get("vista") || "inicio"
    );

    return(
        <div className="dashboard">

            <Sidebar
                vista={vista}
                setVista={setVista}
            />

            <main className="contenido">
                <Navbar/>
                {
                    vista === "inicio" && (
                        <section className="paneles">
                            <Pomodoro />
                            <div className="derecha">
                                <Estadisticas />
                                <Tareas />
                            </div>
                        </section>
                    )
                }

                {
                    vista === "tabla" && (
                        <Tabla />
                    )
                }
            </main>
        </div>
    )
}

export default Dashboard;