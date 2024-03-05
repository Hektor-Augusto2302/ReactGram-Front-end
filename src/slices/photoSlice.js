import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

export const publicPhoto = createAsyncThunk(
    "photo/public",
    async (photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.publicPhoto(photo, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        };

        return data;
    }
);

export const getUserPhotos = createAsyncThunk(
    "photo/userPhotos",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

        return data;
    }
);

export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.deletePhoto(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        };

        return data;
    }
);

export const updatePhotos = createAsyncThunk(
    "photo/update",
    async (photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhotos(
            { title: photoData.title },
            photoData.id,
            token
        );

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        };

        return data;
    }
);

export const getPhoto = createAsyncThunk(
    "photo/getPhoto",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getPhoto(id, token);

        return data;
    }
);

export const likePhoto = createAsyncThunk(
    "photo/like",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.like(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const comment = createAsyncThunk(
    "photo/comment",
    async (photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.comment(
            { comment: photoData.comment },
            photoData.id,
            token
        );

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    }
);

export const searchPhotos = createAsyncThunk(
    "photo/search",
    async (query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.searchPhotos(query, token);

        return data;
    }
);

export const getPhotos = createAsyncThunk(
    "photo/getAll",
    async () => {
        const data = await photoService.getPhotos();

        return data;
    }
);

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
        updatePhotos: (state, action) => {
            state.photos = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(publicPhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(publicPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso!"
            }).addCase(publicPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(getUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(getUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                console.log(action.payload)
                action.payload.forEach(newPhoto => {
                    if (!state.photos.some(existingPhoto => existingPhoto._id === newPhoto._id)) {
                        state.photos.push(newPhoto);
                    }
                });
            }).addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                const deletedPhotoId = action.payload.id;
                state.photos = state.photos.filter(photo => photo._id !== deletedPhotoId);
                state.message = action.payload.message;
            }).addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(updatePhotos.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(updatePhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = state.photos.map((photo) => {
                    if (photo._id === action.payload.photo._id) {
                        return { ...photo, title: action.payload.photo.title };
                    }
                    return photo;
                });
                state.message = action.payload.message;
            }).addCase(updatePhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(getPhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(getPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
            }).addCase(likePhoto.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(likePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                if (state.photo.likes) {
                    state.photo.likes.push(action.payload.userId);
                }

                state.photos = state.photos.map((photo) => {
                    if (photo._id === action.payload.photoId) {
                        return { ...photo, likes: [...new Set([...photo.likes, action.payload.userId])] }; // Usando Set para garantir IDs únicos
                    }
                    return photo;
                });
                state.message = action.payload.message;
            }).addCase(likePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(comment.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(comment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                if (state.photo && action.payload.photo) {
                    state.photos = state.photos.map((photo) => {
                        if (photo._id === action.payload.photo._id) {
                            return {
                                ...photo,
                                comments: [...photo.comments, action.payload.comment],
                            };
                        }
                        return photo;
                    });
                }

                state.message = action.payload.message;
            })
            .addCase(comment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getPhotos.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(getPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(searchPhotos.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(searchPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(searchPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;