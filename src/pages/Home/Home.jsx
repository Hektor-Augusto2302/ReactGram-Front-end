import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../../slices/userSlice';
import { getPhotos, likePhoto, comment } from '../../slices/photoSlice';
import { uploads } from '../../utils/config';
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import CommentPhotos from '../../components/CommentPhotos/CommentPhotos';

const Home = () => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");

    const { user } = useSelector((state) => state.user);
    const { photos } = useSelector((state) => state.photo);

    useEffect(() => {
        dispatch(profile());
        dispatch(getPhotos());
    }, [dispatch]);

    const handleComment = (photoId, commentText) => {
        dispatch(comment({ id: photoId, comment: commentText }));
        setCommentText("");
    };

    const handleLike = (photoId) => {
        dispatch(likePhoto(photoId));
    };

    return (
        <div className='container my-5'>
            <div className="row justify-content-center">
                <div className="col-md-12 d-flex flex-column align-items-center">
                    <h1 className='mb-3'>Bem Vindo {user.name}</h1>
                    <h3>Veja suas fotos e de seus amigos que foram publicadas no ReactGram...</h3>
                </div>
            </div>
            <div className="row justify-content-center d-flex flex-column align-items-center">
                {photos.map((photo) => (
                    <div className="col-md-6 my-3" key={photo._id}>
                        <div className="card bg-dark">
                            <img
                                src={`${uploads}/photos/${photo.image}`}
                                className="img-fluid mb-3"
                                alt={photo.title}
                            />
                            <h2 className='mb-3 text-center'>{photo.title}</h2>
                            <LikeContainer
                                className="mb-3"
                                photo={photo}
                                user={user}
                                handleLike={() => handleLike(photo._id)}
                            />
                            <h3 className='my-3 text-center'>Criado por: {photo.userName}</h3>
                            <CommentPhotos
                                photo={photo}
                                uploads={uploads}
                                handleComment={() => handleComment(photo._id, commentText)}
                                commentText={commentText}
                                setCommentText={setCommentText}
                            />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;
