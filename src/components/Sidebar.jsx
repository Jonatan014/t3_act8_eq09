function Sidebar({ vista, setVista }) {
    function cambiarVista(nuevaVista){
        setVista(nuevaVista);

        const params = new URLSearchParams(window.location.search);

        params.set("vista", nuevaVista);

        if(nuevaVista !== "tabla"){
            params.delete("page");
            params.delete("limit");
        }else{
            if(!params.get("page")) params.set("page",1);
            if(!params.get("limit")) params.set("limit",10);
        }

        window.history.pushState(
            {},
            "",
            `?${params.toString()}`
        );
    }

    return(
        <aside className="sidebar">
            <h2>FocusFlow</h2>

            <button onClick={() => cambiarVista("inicio")}>
                Inicio
            </button>

            <button>
                Timer
            </button>

            <button>
                Tareas
            </button>

            <button>
                Estadísticas
            </button>

            <button>
                Clasificación
            </button>

            <button onClick={() => cambiarVista("tabla")}>
                Recetas
            </button>

            <button className="cerrar">
                Cerrar sesión
            </button>
        </aside>
    )
}

export default Sidebar;