function Modal({mostrar, cerrar, titulo, children}){
    
    if(!mostrar)
        return null;


    return(

        <div className="modal-fondo">


            <div className="modal">


                <h2>
                    {titulo}
                </h2>


                {children}


                <button
                onClick={cerrar}
                >
                    Cancelar
                </button>


            </div>


        </div>

    )

}

export default Modal;