import { GoTrash } from "react-icons/go";
import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini"

export default function ViewProducts({products, handleDelete, isDeleting}){
    const [loadedImages, setLoadedImages] = useState({});
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleImageLoad = (id) => {
      setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const handleDeleteClick = async (id) => {
      setDeletingProductId(id);
      try {
        await handleDelete(id);
      } finally {
        setDeletingProductId(null);
      }
    };

    return (
        <>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 lg:gap-4 p-2 lg:p-5 place-items-center">
                {products.map((prod) => {
                  const isProductDeleting = isDeleting && deletingProductId === prod.id;

                  return (
                  <div
                    key={prod.id}
                    className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow"
                  >
                    <button
                      onClick={() => handleDeleteClick(prod.id)}
                      className="absolute top-3 lg:top-5 right-3 lg:right-5 cursor-pointer z-10"
                      disabled={isDeleting}
                    >
                      <GoTrash className="text-secondary-300 text-base lg:text-lg" />
                    </button>

                    <div className="relative h-35 lg:h-[218.98px]">
                      <img
                        src={prod.image_url}
                        alt={prod.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          loadedImages[prod.id] ? 'blur-0' : 'blur-md'
                        } ${isProductDeleting ? 'blur-md' : ''}`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(prod.id)}
                      />

                      {isProductDeleting && (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center pointer-events-none">
                          <SpinnerMini />
                        </div>
                      )}
                    </div>

                    <div className="p-2 space-y-1 lg:p-6 lg:space-y-2">
                            <h3 className="text-sm lg:text-lg font-medium">{prod.name}</h3>
                            <p className="lg:text-sm text-neutral-100">{prod.caption}</p>                            
                        </div>
                  </div>
                  );
                })}
              </div>
        </>
    )
}