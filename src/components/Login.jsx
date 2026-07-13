function Login() {
  return (
    <>
        <section className="tarjeta">
            <form>
                <label className="tituLogin">Iniciar Sesión</label>
                <br/>
                <br/>
                <label className="texto">Correo Electronico</label>
                <input className="campo" type="text" placeholder="example@correo.com" />
                <br/>
                <br/>
                <br/>
                <label className="texto">Contraseña</label>
                <input className="campo" type="password" placeholder="•••••••••••" />
                <label id="mostrar">
                    <input type="checkbox"/>
                    Mostrar contraseña
                </label>
                <label id="pregunta">¿Olvidaste la contraseña?</label>
                <br/>
                <br/>
                <br/>
                <button id="ingresar" type="submit">Iniciar Sesion</button>
            </form>
        </section>
    </>
  )
}

export default Login
