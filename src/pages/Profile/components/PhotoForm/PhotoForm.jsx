import Message from "../../../../components/Message/Message";

const PhotoForm = ({
    newPhotoForm,
    submitHandle,
    title,
    setTitle,
    handleFile,
    loadingPhoto,
    errorPhoto,
    messagePhoto,
    editPhotoForm,
    editImage,
    uploads,
    editTitle,
    handleUpdate,
    setEditTitle,
    handleCancelEdit
}) => {
    
    return (
        <div className="row justify-content-center my-5" >
            <div className='col-md-6 form-div-control-post' ref={newPhotoForm}>
                <h3>Compartilhe algum momento seu...</h3>
                <form onSubmit={submitHandle} className="d-flex justify-content-center flex-column">
                    <label className="">Titulo:</label>
                    <input
                        type="text"
                        className="text-center form-input-post mb-3"
                        placeholder='Insira seu Titulo'
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="">Imagem:</label>
                    <input
                        type="file"
                        className="text-center mb-4 form-input-post"
                        placeholder='Imagem'
                        onChange={handleFile}
                    />
                    {!loadingPhoto && <input type="submit" value="Postar" />}
                    {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
                    <div className='mt-4'>
                        {errorPhoto && <Message msg={errorPhoto} type="error" />}
                        {messagePhoto && <Message msg={messagePhoto} type="success" />}
                    </div>
                </form>
            </div>
            <div className='col-md-6 form-div-control-post hide' ref={editPhotoForm}>
                <h3>Edite a sua foto...</h3>
                {editImage && (
                    <img
                        src={`${uploads}/photos/${editImage}`}
                        alt={editTitle}
                        className="img-fluid"
                    />
                )}
                <form onSubmit={handleUpdate} className="d-flex justify-content-center flex-column">
                    <label className="">Titulo:</label>
                    <input
                        type="text"
                        className="text-center form-input-post mb-3"
                        value={editTitle || ""}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input className='mb-4' type="submit" value="Atualizar" />
                    <button onClick={handleCancelEdit}>Cancelar a edição</button>
                    <div className='mt-4'>
                        {errorPhoto && <Message msg={errorPhoto} type="error" />}
                        {messagePhoto && <Message msg={messagePhoto} type="success" />}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PhotoForm