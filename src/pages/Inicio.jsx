import Pomodoro from "../components/Pomodoro";
import Estadisticas from "../components/Estadisticas";
import Tareas from "../components/Tareas";

function Inicio() {
    return (
        <section className="paneles">
            <Pomodoro />

            <div className="derecha">
                <Estadisticas />
                <Tareas />
            </div>
        </section>
    );
}

export default Inicio;