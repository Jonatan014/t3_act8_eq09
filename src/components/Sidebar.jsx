function Sidebar({vista,setVista}){

    return(

        <aside className="sidebar">

            <h2>FocusFlow</h2>

            <button onClick={()=>setVista("inicio")}>
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

            <button onClick={()=>setVista("tabla")}>
                Recetas
            </button>

            <button className="cerrar">
                Cerrar sesión
            </button>

        </aside>

    )

}

export default Sidebar;