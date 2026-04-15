import React from 'react'
import GalleryList from './GalleryList';

import { getGallary } from '@/src/server/GallaryService';


const GalleryLayout = async () => {
  const data = await getGallary()
  const gallaryItems = data.data
  return (
    <GalleryList initialData={gallaryItems} />
  )
}

export default GalleryLayout