import Sidebar from "../components/Sidebar";
import Pomodoro from "../components/Pomodoro";
import Estadisticas from "../components/Estadisticas";
import Tareas from "../components/Tareas";
import Navbar from "../components/Navbar";

import "../css/dashboard.css";


function Dashboard(){

    return (
        <div className="dashboard">
            <Sidebar/>
            <main className="contenido">
                <Navbar/>
                <section className="paneles">
                    <Pomodoro/>
                    <div className="derecha">
                        <Estadisticas/>
                        <Tareas/>
                    </div>
                </section>
            </main>
        </div>
    )
}


export default Dashboard;