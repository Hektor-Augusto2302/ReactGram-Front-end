import { Link } from 'react-router-dom';
import { uploads } from '../../../../utils/config';

const CardPhotos = ({ photo }) => {
    return (
        <>
            <img
                src={`${uploads}/photos/${photo.image}`}
                className="card-img-top"
                alt={photo.title}
            />
            <div className="card-body">
                <h5 className="card-title text-center mt-3">{photo.title}</h5>
                <p className='text-center mt-3'>
                    Publicada por: {" "}
                    <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
                </p>
            </div>
        </>
    )
}

export default CardPhotos