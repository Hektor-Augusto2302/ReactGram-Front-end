import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../../slices/authSlice';
import { searchPhotos } from '../../slices/photoSlice';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchterm, setSearchTerm] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(searchPhotos(searchterm));

        if(searchterm) {
            navigate(`/search?q=${searchterm}`);
        };
    }

    return (
        <nav className='d-flex justify-content-between align-items-center navbar navbar-expand-sm navbar'>
            <div className='container'>
                <h3 className='brand navbar-brand' to="/">
                    ReactGram
                </h3>
                <form className='search-form' onSubmit={handleSearchSubmit}>
                    <BsSearch />
                    <input
                        type="text"
                        placeholder='Pesquisar'
                        value={searchterm || ""}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
                <div className="d-flex flex-column justify-content-end">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-text-left"></i>
                    </button>
                    <ul className="navbar-nav collapse navbar-collapse list-unstyled" id="navbarNav">
                        {auth ? (
                            <>
                                <li className='links nav-item me-3 mb-1'>
                                    <NavLink to='/'>
                                        <BsHouseDoorFill />
                                    </NavLink>
                                </li>
                                {user && (
                                    <li className='links nav-item me-3 mb-1'>
                                        <NavLink to={`/users/${user._id}`}>
                                            <BsFillCameraFill />
                                        </NavLink>
                                    </li>
                                )}
                                <li className='links nav-item me-3 mb-1'>
                                    <NavLink to="/profile">
                                        <BsFillPersonFill />
                                    </NavLink>
                                </li>
                                <li>
                                    <span className='span-link nav-item' onClick={handleLogout}>
                                        Sair
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='links nav-item me-3'>
                                    <NavLink to="/login">
                                        Entrar
                                    </NavLink>
                                </li>
                                <li className='links nav-item me-3'>
                                    <NavLink to="/register">
                                        Registrar
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;