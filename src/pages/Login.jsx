import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validar = () => {
        if (username.trim().length === 0) {
            setError("El usuario es requerido");
            return false;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validar()) return;

        setLoading(true);
        try {
            const respuesta = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (!respuesta.ok) {
                throw new Error("Usuario o contraseña incorrectos");
            }

            const data = await respuesta.json();
            console.log("Login exitoso:", data);
            login(data, data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="tarjeta">
                <form onSubmit={handleSubmit}>
                    <label className="tituLogin">Iniciar Sesión</label>
                    <br/>
                    <br/>
                    <label className="texto">Usuario</label>
                    <input
                        className="campo"
                        type="text"
                        placeholder="emilys"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <label className="texto">Contraseña</label>
                    <input
                        className="campo"
                        type={mostrarPassword ? "text" : "password"}
                        placeholder="•••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label id="mostrar">
                        <input
                            type="checkbox"
                            checked={mostrarPassword}
                            onChange={(e) => setMostrarPassword(e.target.checked)}
                        />
                        Mostrar contraseña
                    </label>
                    <label id="pregunta">¿Olvidaste la contraseña?</label>
                    <br/>
                    <br/>
                    <br/>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button id="ingresar" type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar Sesion"}
                    </button>
                </form>
            </section>
        </>
    );
}

export default Login;