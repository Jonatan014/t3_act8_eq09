const URL_BASE = "https://dummyjson.com/recipes";

export async function obtenerRecetas(limit = 10, skip = 0) {
    const respuesta = await fetch(
        `${URL_BASE}?limit=${limit}&skip=${skip}`
    );

    if (!respuesta.ok) {
        throw new Error("No fue posible obtener las recetas");
    }

    return await respuesta.json();
}

export async function agregarReceta(receta) {
    const respuesta = await fetch(`${URL_BASE}/add`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(receta),
    });

    if (!respuesta.ok) {
        throw new Error("Error al agregar la receta");
    }

    return await respuesta.json();
}

export async function editarReceta(id, receta) {
    const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(receta),
    });

    if (!respuesta.ok) {
        throw new Error("Error al editar la receta");
    }

    return await respuesta.json();
}

export async function eliminarReceta(id) {

    const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: "DELETE",
    });

    if (!respuesta.ok) {
        throw new Error("Error al eliminar la receta");
    }

    return await respuesta.json();
}

export async function obtenerCategorias(){

    const respuesta = await fetch(
        "https://dummyjson.com/recipes/tags"
    );

    if(!respuesta.ok){
        throw new Error("Error al obtener categorías");
    }

    return await respuesta.json();
}