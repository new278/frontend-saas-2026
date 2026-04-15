"use client";


interface GalleryItem {
  id: string;
  categoryName: string;
  description: string;
  createdAt: string;
  images: { imageUrl: string; altText: string }[];
}

export default function GalleryCard({
  id,
  categoryName,
  description,
  createdAt,
  images,
}: GalleryItem) {
  return (
    <div className="bg-base-100 rounded-lg overflow-hidden shadow-sm border border-base-100">
      <button
        onClick={() => console.log(`Gallery item ${id} clicked`)}
        className="w-full h-44 md:h-56 block relative focus:outline-none"
        aria-label={categoryName || `Gallery item ${id}`}>
        <img
          src={images[0]?.imageUrl}
          alt={images[0]?.altText || "gallery"}
          className="w-full h-full object-cover"
        />
      </button>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{categoryName || "Untitled"}</h3>
        <p className="text-sm text-gray-600 mb-2">{description || "No description available."}</p>
        {createdAt && (
          <p className="text-xs text-gray-500">Created on: {new Date(createdAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}
