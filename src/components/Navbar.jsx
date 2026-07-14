import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1>Dashboard</h1>
                
                <div className="user-profile">
                    <button 
                        className="profile-button" 
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="user-name">
                            {user?.firstName || user?.username || "Usuario"}
                        </span>
                        <span className="dropdown-icon">{menuOpen ? "▲" : "▼"}</span>
                    </button>
                    
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <div className="user-info">
                                <p><strong>Usuario:</strong> {user?.username}</p>
                                <p><strong>Email:</strong> {user?.email || "No disponible"}</p>
                            </div>
                            <button className="logout-button" onClick={handleLogout}>
                                🚪 Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
