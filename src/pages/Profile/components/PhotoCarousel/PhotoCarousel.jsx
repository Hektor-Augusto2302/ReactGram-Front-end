import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';
import { Carousel } from 'react-bootstrap';

const PhotoCarousel = ({handleEdit, photos, index, handleSelect, uploads, handleDeletePhoto}) => {
    return (
        <div className='col-md-6'>
            <h2 className='text-center mb-3'>Fotos publicadas:</h2>
            {photos.length > 0 ? (
                <Carousel className='py-5' activeIndex={index} onSelect={handleSelect}>
                    {photos.map((photo) => (
                        <Carousel.Item key={photo._id}>
                            <div className="card bg-dark">
                                <img
                                    className="card-img-top"
                                    src={`${uploads}/photos/${photo.image}`}
                                    alt={photo.title}
                                />
                                <h5 className='text-center my-3'>{photo.title}</h5>
                                <div className='d-flex justify-content-center mb-3 align-items-center'>
                                    <Link className='me-3' to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencilFill
                                        className='me-3'
                                        type='button'
                                        onClick={() => handleEdit(photo)}
                                    />
                                    <BsXLg
                                        onClick={() => handleDeletePhoto(photo._id)}
                                        type='button'
                                    />
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p className='text-center'>Ainda não há fotos publicadas</p>
            )}
        </div>
    )
}

export default PhotoCarousel

