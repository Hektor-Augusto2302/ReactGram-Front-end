import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';
import { uploads } from '../../utils/config';
import Message from '../../components/Message/Message';
import './EditProfile.css';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector((state) => state.user)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        dispatch(profile())
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("password", password);

        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 3000);
    };

    const handleFile = (e) => {
        const image = e.target.files[0];
        setPreviewImage(image);
        setProfileImage(image);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className='col-md-6 form-div-control-profile'>
                    <h2 className="text-center">Editar perfil</h2>
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={
                                previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                            }
                            alt={user.name}
                            className="img-fluid img-circle rounded-circle mx-auto"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="d-flex justify-content-center flex-column">
                        <div className="mb-3 d-flex flex-column">
                            <label className="">Nome:</label>
                            <input
                                type="text"
                                className="text-center form-input-profile"
                                placeholder='Nome'
                                value={name || ""}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="mt-3">E-mail:</label>
                            <input
                                type="email"
                                className="text-center form-input-profile"
                                placeholder='E-mail'
                                value={email || ""}
                                readOnly
                            />
                            <label className="">Bio:</label>
                            <input
                                type="text"
                                className="text-center mt-3 form-input-profile"
                                placeholder='Bio'
                                value={bio || ""}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <label className="">Imagem:</label>
                            <input
                                type="file"
                                className="text-center mt-3 form-input-profile"
                                placeholder='Imagem'
                                onChange={handleFile}
                            />
                            <label className="mt-3">Senha:</label>
                            <input
                                type="password"
                                className="text-center mb-4 form-input-profile"
                                placeholder='Digite a sua senha'
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!loading && <input type="submit" value="Atualizar" />}
                            {loading && <input type="submit" value="Aguarde..." disabled />}
                            <div className='mt-4'>
                                {error && <Message msg={error} type="error" />}
                                {message && <Message msg={message} type="success" />}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;