"use client";

import Image from 'next/image';
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { singleGallery as fetchSingleGallery } from "@/src/lib/store/gallery/gallery-slice";
import { Status } from '@/src/lib/store/types/global-types';

const SinglePhoto = () => {
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useAppDispatch();
  const { singleGallery: galleryItem , status} = useAppSelector((state) => state.gallery);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleGallery(id));
    }
  }, [dispatch, id]);
  if (status === Status.LOADING) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-medium">Loading gallery...</p>
        </div>
      )
    }

  if (!galleryItem) {
    return <div className='container mx-auto p-8 text-center'>Loading gallery...</div>;
  }

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-semibold mb-6'>Gallery Item</h1>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {galleryItem.image.map((img) => (
          <div key={img.publicId} className='relative h-64 rounded-xl overflow-hidden shadow-lg'>
            <Image
              src={img.path}
              alt={`Gallery image ${img.publicId}`}
              fill
              className='object-cover transition-transform duration-500 hover:scale-105'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePhoto;





