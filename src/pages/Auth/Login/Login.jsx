import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../../slices/authSlice';
import Message from '../../../components/Message/Message';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispath = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        };

        dispath(login(user));
    };

    useEffect(() => {
        dispath(reset())
    }, [dispath])

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className='col-md-6 form-div-control'>
                    <h2 className="text-center">ReactGram</h2>
                    <p className="subtitle text-center">Faça seu login e se junte a seus amigos...</p>
                    <form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column">
                        <div className="d-flex flex-column form-div-control-login">
                            <label className="mt-3">E-mail:</label>
                            <input
                                type="email"
                                className="text-center form-input-login"
                                placeholder='E-mail'
                                value={email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="mt-3">Senha:</label>
                            <input
                                type="password"
                                className="text-center form-input-login"
                                placeholder='Digite a sua senha'
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!loading && <input className='mt-4' type="submit" value="Entrar" />}
                            {loading && <input className='mt-4' type="submit" value="Aguarde..." disabled />}
                            <div className='mt-4'>
                                {error && <Message msg={error} type="error" />}
                            </div>
                        </div>
                    </form>
                    <p className="text-center">Se ainda não possui conta? <Link className='text-link-login' to='/register'>Clique aqui.</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login