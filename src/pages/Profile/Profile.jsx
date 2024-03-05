import { uploads } from '../../utils/config';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../slices/userSlice';
import { publicPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhotos } from '../../slices/photoSlice';
import PhotoCarousel from './components/PhotoCarousel/PhotoCarousel';
import PhotoForm from './components/PhotoForm/PhotoForm';
import './Profile.css';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        photos,
        loading: loadingPhoto,
        message: messagePhoto,
        error: errorPhoto
    } = useSelector((state) => state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [editId, setEditId] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editImage, setEditImage] = useState("");
    const [index, setIndex] = useState(0);

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    if (loading) {
        return <p>Carregando...</p>
    };

    const submitHandle = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("image", image);

        await dispatch(publicPhoto(formData));

        setTitle("");
        setImage("");

        resetComponentMessage();
    };

    const handleFile = (e) => {
        const image = e.target.files[0];
        setImage(image);
    };

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    };

    const handleDeletePhoto = (photoId) => {
        dispatch(deletePhoto(photoId)).then((result) => {
            if (!result.error) {
                const updatedPhotos = photos.filter((photo) => photo._id !== photoId);

                dispatch({ type: 'photo/updatePhotos', payload: updatedPhotos });
            }
        });
        resetComponentMessage();
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhotos(photoData));
        resetComponentMessage();
    };

    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle("hide");
        editPhotoForm.current.classList.toggle("hide");
    }

    const handleCancelEdit = () => {
        hideOrShowForms();
    };

    const handleEdit = (photo) => {
        if (editPhotoForm.current.classList.contains("hide")) {
            hideOrShowForms();
        };

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 d-flex post-header">
                    <div className="mb-3 me-5">
                        {user.profileImage && (
                            <img
                                src={`${uploads}/users/${user.profileImage}`}
                                alt={user.name}
                                className="img-fluid img-post"
                            />
                        )}
                    </div>
                    <div className='post-footer d-flex flex-column justify-content-center'>
                        <h2 className="text-center">{user.name}</h2>
                        <p className="text-center">{user.bio}</p>
                    </div>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <PhotoForm
                        newPhotoForm={newPhotoForm}
                        submitHandle={submitHandle}
                        title={title}
                        setTitle={setTitle}
                        handleFile={handleFile}
                        loadingPhoto={loadingPhoto}
                        errorPhoto={errorPhoto}
                        messagePhoto={messagePhoto}
                        editPhotoForm={editPhotoForm}
                        editImage={editImage}
                        uploads={uploads}
                        editTitle={editTitle}
                        handleUpdate={handleUpdate}
                        setEditTitle={setEditTitle}
                        handleCancelEdit={handleCancelEdit}

                    />
                </>
            )}
            {user && (
                <div className="row justify-content-center">
                    <PhotoCarousel
                        handleEdit={handleEdit}
                        photos={photos.filter(photo => photo.userId === id)}
                        index={index}
                        handleSelect={handleSelect}
                        uploads={uploads}
                        handleDeletePhoto={handleDeletePhoto}
                    />
                </div>
            )}
        </div>
    )
}

export default Profile;
