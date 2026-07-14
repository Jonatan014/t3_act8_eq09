import { useEffect, useState } from "react";
import Modal from "./Modal";

import {
    obtenerRecetas,
    obtenerCategorias,
    agregarReceta,
    editarReceta,
    eliminarReceta
} from "../services/api";

function Tabla(){

    const [recetas,setRecetas] = useState([]);

    const [total,setTotal] = useState(0);

    const [categorias,setCategorias] = useState([]);

    const [cargando,setCargando] = useState(true);

    const [error,setError] = useState("");

    const [busqueda,setBusqueda] = useState("");

    const [categoria,setCategoria] = useState("");

    const [pagina,setPagina] = useState(
        Number(
            new URLSearchParams(window.location.search)
            .get("page")
        ) || 1
    );

    const [limite,setLimite] = useState(
        Number(
            new URLSearchParams(window.location.search)
            .get("limit")
        ) || 10
    );

    const [mensaje, setMensaje] = useState("");

    const [modal,setModal] = useState("");

    const [recetaActual,setRecetaActual] = useState(null);

    const [formulario,setFormulario] = useState({
        name:"",
        cuisine:""
    });

    useEffect(()=>{

        cargarRecetas();

    },[pagina,limite]);

    useEffect(()=>{

    const manejarCambioURL = ()=>{
        const params =
        new URLSearchParams(window.location.search);

        setPagina(
            Number(params.get("page")) || 1
        );

        setLimite(
            Number(params.get("limit")) || 10
        );
    };

    window.addEventListener(
        "popstate",
        manejarCambioURL
    );

    return ()=>{
        window.removeEventListener(
            "popstate",
            manejarCambioURL
        );
    };

},[]);

    async function cargarRecetas(){
        try{
            setCargando(true);
            const skip=(pagina-1)*limite;

            const datos = await obtenerRecetas(
                limite,
                skip
            );

            setRecetas(datos.recipes);

            setTotal(datos.total);

            const cats = await obtenerCategorias();

            setCategorias(cats);

        }catch(error){
            setError(error.message);
        }finally{
            setCargando(false);
        }
    }

    function cambiarPagina(nueva, nuevoLimite = limite){
        setPagina(nueva);

        window.history.pushState(
            {},
            "",
            `?page=${nueva}&limit=${nuevoLimite}`
        );
    }

    const recetasFiltradas = recetas.filter(
        receta =>
        receta.name
        .toLowerCase()
        .includes(busqueda.toLowerCase())
        &&
        (
            categoria===""
            ||
            receta.tags.includes(categoria)
        )
    );

    async function handleAgregar(){
        if(
            !formulario.name ||
            !formulario.cuisine
        ){
            setMensaje(
                "Todos los campos son obligatorios"
            );
            return;
        }

        const nueva={
            name:formulario.name,
            cuisine:formulario.cuisine
        };

        const respuesta =
        await agregarReceta(nueva);

        setRecetas([
            respuesta,
            ...recetas
        ]);

        setMensaje("");

        setModal("");
    }

    async function confirmarEliminar(){
        await eliminarReceta(
        recetaActual.id
        );

        setRecetas(

        recetas.filter(

        r=>r.id!==recetaActual.id
        )
        );
        setModal("");
    }

    function abrirAgregar(){
        setMensaje("");
        setFormulario({
            name:"",
            cuisine:""
        });
        setModal("agregar");
    }

    async function guardarEdicion(){
        if(
        !formulario.name ||
        !formulario.cuisine
        ){

        setMensaje(
        "Todos los campos son obligatorios"
        );

        return;
        }

        const cambios={
        name:formulario.name,
        cuisine:formulario.cuisine
        };

        const respuesta =
        await editarReceta(
        recetaActual.id,
        cambios
        );

        setRecetas(

        recetas.map(r=>

        r.id===recetaActual.id

        ?

        {
        ...r,
        ...respuesta
        }

        :

        r

        )

        );

        setModal("");
    }

    if(cargando)
        return <h2>Cargando...</h2>


    if(error)
        return <h2>{error}</h2>

    const totalPaginas = Math.ceil(total / limite);
    return(
    <section className="tabla">
        <div className="tabla-contenedor">
        <h1>
            Tabla de Recetas
        </h1>

        <div>
            <input
                placeholder="Buscar receta..."
                value={busqueda}
                onChange={
                    e=>{
                        setBusqueda(e.target.value);
                        setPagina(1);
                    }
                }
            />

            <select
                value={categoria}
                onChange={
                    e=>{
                        setCategoria(e.target.value);
                        setPagina(1);
                    }
                }
            >

            <option value="">
                Todas
            </option>

            {
                categorias.map(cat=>

                <option key={cat}>
                    {cat}
                </option>
                )
            }

            </select>

            <select
                value={limite}
                onChange={
                    e=>{

                        const nuevoLimite = Number(e.target.value);


                        setLimite(nuevoLimite);


                        cambiarPagina(1,nuevoLimite);


                    }
                }
            >
                <option>10</option>
                <option>20</option>
                <option>40</option>
                <option>50</option>

            </select>

            <button onClick={abrirAgregar}>
                Agregar
            </button>

        </div>

        <table>

        <thead>

        <tr>

            <th>
                Nombre
            </th>

            <th>
                Cocina
            </th>

            <th>
                Acciones
            </th>

        </tr>

        </thead>

        <tbody>

        {
        recetasFiltradas.map(receta=>

        <tr key={receta.id}>

            <td>
                {receta.name}
            </td>

            <td>
                {receta.cuisine}
            </td>

            <td>
            <button onClick={()=>{
                setMensaje("");
                setRecetaActual(receta);
                setFormulario({
                    name:receta.name,
                    cuisine:receta.cuisine
                });

                setModal("editar");
            }}
            >
                Editar
            </button>

            <button onClick={()=>{
            setRecetaActual(receta);
            setModal("eliminar");
            }}
            >
                Eliminar
            </button>

            </td>

        </tr>

        )
        }
        </tbody>

        </table>

        <div className="paginacion">

    <button
    disabled={pagina===1}
    onClick={()=>
        cambiarPagina(pagina-1)
    }
    >
        Anterior
    </button>

    <span>
        Página {pagina} de {totalPaginas}
    </span>

    <button

    disabled={pagina >= totalPaginas}

    onClick={()=>
        cambiarPagina(pagina+1)
    }

    >
        Siguiente
    </button>

</div>
        <Modal
            mostrar={
            modal!==""
            }

            cerrar={()=>
            setModal("")
            }

            titulo={
            modal==="agregar"

            ?

            "Agregar receta"

            :

            modal==="editar"

            ?

            "Editar receta"

            :

            "Eliminar receta"

            }

            >

            {
            modal==="confirmarEditar"

            ?
            <>
            <p>
            ¿Deseas guardar los cambios de:
            <br/>

            <b>
            {recetaActual?.name}
            </b>

            ?
            </p>


            <button
            onClick={guardarEdicion}
            >
            Guardar cambios
            </button>

            </>

            
            :
            
            modal==="eliminar"

            ?
            <>
            <p>
            ¿Seguro que deseas eliminar:
            <br/>

            <b>
            {recetaActual?.name}
            </b>

            ?
            </p>


            <button
            onClick={confirmarEliminar}
            >
            Eliminar
            </button>

            </>

            :
            <>

            {
                mensaje &&

                <p className="mensaje-error">
                {mensaje}
                </p>

                }

            <input

            placeholder="Nombre"

            value={formulario.name}

            onChange={
            e=>
            setFormulario({
            ...formulario,
            name:e.target.value
            })
            }

            />
                <input
                placeholder="Cocina"

                value={formulario.cuisine}

                onChange={
                e=>
                setFormulario({
                ...formulario,
                cuisine:e.target.value
                })
                }
            />

            <button
            onClick={
                modal==="agregar"
                ?
                handleAgregar
                :
                ()=>setModal("confirmarEditar")
            }
            >
            Guardar
            </button>
            </>
            }
        </Modal>

        </div>

    </section>
    )
}

export default Tabla;