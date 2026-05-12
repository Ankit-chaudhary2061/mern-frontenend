
import { Status } from "../types/global-types";

   
export interface IImage {
  path: string;
  publicId: string;
}

export interface IGallery {
  _id: string;
  image: IImage[];
}

 export interface GalleryState {
  gallery: IGallery[];
status: Status;
singleGallery: IGallery | null;
}