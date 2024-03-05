import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../../slices/authSlice';
import './Register.css';
import Message from '../../../components/Message/Message';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        dispatch(register(user))
        
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className='col-md-6 form-div-control'>
                    <h2 className="text-center">ReactGram</h2>
                    <p className="subtitle text-center">Cadastre-se para ver as fotos dos seus amigos...</p>
                    <form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column">
                        <div className="mb-3 d-flex flex-column">
                            <label className="">Nome:</label>
                            <input
                                type="text"
                                className="text-center form-input"
                                placeholder='Nome'
                                value={name || ""}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="mt-3">E-mail:</label>
                            <input
                                type="email"
                                className="text-center form-input"
                                placeholder='E-mail'
                                value={email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="mt-3">Senha:</label>
                            <input
                                type="password"
                                className="text-center form-input"
                                placeholder='Digite a sua senha'
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="mt-3">Confirmação de senha:</label>
                            <input
                                type="password"
                                className="text-center mb-4 form-input"
                                placeholder='Confirme a sua senha'
                                value={confirmPassword || ""}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {!loading && <input type="submit" value="Cadastrar" />}
                            {loading && <input type="submit" value="Aguarde..." disabled />}
                            <div className='mt-4'>
                                {error && <Message msg={error} type="error" />}
                            </div>
                        </div>
                    </form>
                    <p className="text-center">Já tem conta? <Link className='text-link' to='/login'>Clique aqui.</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
