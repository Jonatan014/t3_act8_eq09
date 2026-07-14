import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TablaRecetas from "../components/TablaRecetas";

import { obtenerRecetas } from "../services/recipesApi";

function Recetas() {

    const [recetas, setRecetas] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [total, setTotal] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const pagina =
        Number(searchParams.get("page")) || 1;

    const limite =
        Number(searchParams.get("limit")) || 10;

    const [buscar, setBuscar] = useState("");

    const [cocina, setCocina] = useState("");

    useEffect(() => {

        cargarRecetas();

    }, [pagina, limite]);

    async function cargarRecetas() {

        try {

            setLoading(true);

            const skip = (pagina - 1) * limite;

            const datos = await obtenerRecetas(
                limite,
                skip
            );

            setRecetas(datos.recipes);

            setTotal(datos.total);

        }

        catch (error) {

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    const recetasFiltradas = recetas.filter((receta) => {

        const coincideNombre =
            receta.name
                .toLowerCase()
                .includes(buscar.toLowerCase());

        const coincideCocina =
            cocina === "" ||
            receta.cuisine === cocina;

        return coincideNombre && coincideCocina;

    });

    function cambiarPagina(nuevaPagina) {

        setSearchParams({

            page: nuevaPagina,

            limit: limite,

        });

    }

    function cambiarLimite(e) {

        setSearchParams({

            page: 1,

            limit: e.target.value,

        });

    }

    return (

        <>

            <Sidebar />

            <div className="contenido">

                <Navbar />

                <h1>Recetas</h1>

                <br />

                <input

                    type="text"

                    placeholder="Buscar receta..."

                    value={buscar}

                    onChange={(e) =>
                        setBuscar(e.target.value)
                    }

                />

                <select

                    value={cocina}

                    onChange={(e) =>
                        setCocina(e.target.value)
                    }

                >

                    <option value="">Todas</option>

                    <option>American</option>

                    <option>Italian</option>

                    <option>Indian</option>

                    <option>Mexican</option>

                    <option>Japanese</option>

                </select>

                <br />

                <br />

                {

                    loading ?

                        <h2>Cargando...</h2>

                        :

                        error ?

                            <h2>{error}</h2>

                            :

                            <TablaRecetas

                                recetas={recetasFiltradas}

                            />
                }
                <br />

                <button
                    disabled={pagina === 1}

                    onClick={() =>
                        cambiarPagina(pagina - 1)
                    }
                >
                    Anterior
                </button>

                <span>
                    Página {pagina}
                </span>

                <button
                    disabled={
                        pagina >=
                        Math.ceil(total / limite)
                    }

                    onClick={() =>
                        cambiarPagina(pagina + 1)
                    }

                >
                    Siguiente
                </button>
                <br />
                <br />
                <label>
                    Mostrar
                </label>

                <select
                    value={limite}
                    onChange={cambiarLimite}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </>
    );
}

export default Recetas;