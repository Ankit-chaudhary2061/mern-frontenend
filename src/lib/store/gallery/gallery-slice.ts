import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/global-types";
import { GalleryState, IGallery } from "./gallery-slice-types";
import { AppDispatch } from "../store";
import api from "../../http/api";




const initialState: GalleryState = {
    gallery: [],
    status: Status.IDLE,
    singleGallery: null
}


const gallerySlice = createSlice({
    name:'gallery',
    initialState,
    reducers:{
        setGallery(state: GalleryState, action: PayloadAction<IGallery[]>){
            state.gallery = action.payload
        },
        setGalleryStatus(state: GalleryState, action: PayloadAction<Status>){
            state.status = action.payload
        },
        setSingleGallery(state: GalleryState, action: PayloadAction<IGallery | null>){
            // This reducer is currently not used, but can be implemented in the future for handling single gallery details.
            state.singleGallery = action.payload
        }
    }
})

export const { setGallery, setGalleryStatus, setSingleGallery } = gallerySlice.actions
export default gallerySlice.reducer



export function fetchGallery(){
    return async function fetchGalleryThunk(dispatch: AppDispatch){
try {
    const response =  await api.get("/gallery")
    if(response.status === 200){
        const { data } = response.data
        console.log(data, ":gallery")
        dispatch(setGallery(data))
        dispatch(setGalleryStatus(Status.SUCCESS))
    } else {
        dispatch(setGalleryStatus(Status.ERROR))
    }
} catch (error) {
    dispatch(setGalleryStatus(Status.ERROR))
}
    }
}

export  function singleGallery(galleryId: string){
    return async function singleGalleryThunk(dispatch: AppDispatch){
try {    const response =  await api.get(`/gallery/${galleryId}`)
    if(response.status === 200){
        const { data } = response.data
        console.log(data, ":single gallery")
        dispatch(setSingleGallery(data))
        dispatch(setGalleryStatus(Status.SUCCESS))
    } else {
        dispatch(setGalleryStatus(Status.ERROR))
    }   
} catch (error) {
    dispatch(setGalleryStatus(Status.ERROR))
}
    }  
}