import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from  "../../ui/Modal"


export default function AddProductForm({
    showForm,
    setShowForm,
    isUploading,
    newProducts,
    errors,
    setErrors,
    setNewProducts,
    handleCancel,
    images,
    handleUploadImage,
    remaining,
    sellerInfo
}){
  
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]); 
  const isProductUploadBusy = isSubmittingProduct || isUploading;

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const MAX_FILE_SIZE = 11 * 1024 * 1024;
    const remainingSlots = Math.max(0, 4 - images.length - newProducts.length);
    const selectedFiles = files.slice(0, remainingSlots);

    const validItems = [];
    let hasLargeFile = false;

    selectedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        hasLargeFile = true;
        return;
      }

      validItems.push({
        file,
        preview: URL.createObjectURL(file),
        name: "",
        caption: "",
      });
    });

    setNewProducts((prev) => [...prev, ...validItems]);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.items;
      if (hasLargeFile) {
        next.image_url = "Some files were skipped because they exceed 11MB.";
      } else {
        delete next.image_url;
      }
      return next;
    });

    // Allow selecting the same file again after removing it.
    e.target.value = "";
  };

  const handleProductFieldChange = (index, field, value) => {
    if (field === "caption") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > 15 && value !== "") return;
    }

    setNewProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );

    setErrors((prev) => {
      const next = { ...prev };
      if (next.items?.[index]?.[field]) {
        next.items = { ...next.items, [index]: { ...next.items[index], [field]: undefined } };
      }
      return next;
    });
  };

  const handleRemoveSelectedImage = (index) => {
    setNewProducts((prev) => {
      const removedItem = prev[index];
      if (removedItem?.preview) URL.revokeObjectURL(removedItem.preview);
      return prev.filter((_, i) => i !== index);
    });

    setErrors((prev) => {
      const next = { ...prev };
      if (next.items) {
        const rebuilt = {};
        Object.entries(next.items).forEach(([key, value]) => {
          const currentIndex = Number(key);
          if (currentIndex < index) rebuilt[currentIndex] = value;
          if (currentIndex > index) rebuilt[currentIndex - 1] = value;
        });
        next.items = rebuilt;
      }
      return next;
    });
  };


  const validate = () => {
    let temp = {};
    if (!newProducts.length) {
      temp.image_url = "Select at least one image";
    }

    const itemErrors = {};
    newProducts.forEach((item, index) => {
      const perItemErrors = {};
      if (!item.name.trim()) perItemErrors.name = "Listing name is required";
      if (!item.caption.trim()) perItemErrors.caption = "Listing description is required";

      if (Object.keys(perItemErrors).length) {
        itemErrors[index] = perItemErrors;
      }
    });

    if (Object.keys(itemErrors).length) {
      temp.items = itemErrors;
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1600,
      initialQuality: 0.9,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch(error){
      console.error("Image compression error:", error);
      return file; //fallback
    }
  }

  const submitProduct = async () => {
    if (isProductUploadBusy) return;
    if (!validate()) return;

    setIsSubmittingProduct(true);
    setUploadProgress(new Array(newProducts.length).fill(0));
    try {
      const uploadItems = await Promise.all(
        newProducts.map(async (item, index) => ({
          imageFile: await compressImage(item.file),
          position: images.length + index + 1,
          name: item.name.trim(),
          caption: item.caption.trim(),
        }))
      );

      await handleUploadImage(uploadItems, sellerInfo.id, (itemIndex, progress) => {
        setUploadProgress((prev) => {
          const updated = [...prev];
          updated[itemIndex] = progress;
          return updated;
        });
      });

      newProducts.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
      setNewProducts([]);
      setShowForm(false);
      setErrors({});
      setUploadProgress([]);
    } finally {
      setIsSubmittingProduct(false);
    }
  };

    return (
        <>
        {showForm && (
                <form
                  className={`lg:mx-5 bg-neutral-600/3 rounded-lg px-2 lg:px-4 py-2 flex flex-col gap-6.5 transition-opacity duration-300 ${isProductUploadBusy ? "opacity-85" : "opacity-100"}`}
                  aria-busy={isProductUploadBusy}
                >                  
                  <span className="capitalize text-lg">New listing</span>                  
        
                  {/* Image upload selector */}
                  <div className="space-y-10.5">
                  <div className={`flex flex-col gap-1 ${remaining === 0 ? "hidden" : ""}`}>
                    <label className="w-full h-57 rounded-lg border border-dashed border-black/43 flex items-center justify-center cursor-pointer overflow-hidden bg-white">
                      <div className="flex flex-col items-center gap-2 text-stone-400 text-center px-3">
                        <FaImage className="text-lg" />
                        <span className="text-sm">
                          Select up to {remaining} more image{remaining !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <input
                        type="file"
                        name="image_url"
                        accept="image/*"
                        multiple
                        onChange={handleSelectImages}
                        className="hidden"
                        disabled={isProductUploadBusy || remaining === 0}
                      />
                    </label>
                    {errors.image_url && (
                      <p className="text-xs text-red-500">{errors.image_url}</p>
                    )}
                  </div>
        
                  {/* Per-image metadata */}
                  <div className="space-y-3">
                    {newProducts.map((item, index) => (
                      <div key= {`${item.preview}-${index}`}>
                      <div className="bg-white p-3 rounded ring ring-stone-200 space-y-2">
                        <div className="flex items-start gap-3">

                          <img
                            src={item.preview}
                            alt={`Selected listing ${index + 1}`}
                            className=" object-cover rounded"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleProductFieldChange(index, "name", e.target.value)}
                            placeholder="Name of product/service"
                            className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300"
                            disabled={isProductUploadBusy}
                          />
                          {errors.items?.[index]?.name && (
                            <p className="text-xs text-red-500">{errors.items[index].name}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-1">
                          <textarea
                            value={item.caption}
                            onChange={(e) => handleProductFieldChange(index, "caption", e.target.value)}
                            placeholder="Tell us more about it in 15 words..."
                            rows={2}
                            className="p-3 ring ring-stone-200 rounded outline-none focus:ring-primary bg-white transition-all duration-300 resize-none"
                            disabled={isProductUploadBusy}
                          />
                          {errors.items?.[index]?.caption && (
                            <p className="text-xs text-red-500">{errors.items[index].caption}</p>
                          )}
                        </div>

                        {/* Upload progress bar */}
                        {isProductUploadBusy && uploadProgress?.[index] !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  uploadProgress[index] === 100 ? "bg-green-500" : "bg-primary"
                                }`}
                                style={{ width: `${uploadProgress[index]}%` }}
                              />
                            </div>
                            <span className="text-xs text-stone-600 w-10 text-right">
                              {uploadProgress[index]}%
                            </span>
                          </div>
                        )}

                        {/* work on delete loading spinner */}
                        <div className="flex gap-2">
                          <Modal.Open opens={`productPreview-${index}`}>
                            <button
                              type="button"
                              className="flex-4 p-3 bg-white rounded text-primary cursor-pointer flex items-center justify-center gap-2 shadow active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70" disabled={isProductUploadBusy}>
                                Preview
                            </button>
                          </Modal.Open>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImage(index)}
                            className="flex-4 p-3 bg-stone-200 rounded text-stone-800 cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70"
                            disabled={isProductUploadBusy}>
                            Delete
                          </button>
                        </div>
                      </div>

                      <Modal.Preview name={`productPreview-${index}`} key={index}>
                          <img
                            src={item.preview}
                            alt={`Selected listing ${index + 1}`}
                            className=" object-cover rounded w-full"
                          />
                      </Modal.Preview>  
                    </div>
                    ))}
                  </div>
        
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={submitProduct}
                      className="flex-4 p-3 bg-primary rounded text-white cursor-pointer flex items-center justify-center gap-2 shadow active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70" disabled={isProductUploadBusy }>
                        {isProductUploadBusy && <SpinnerMini />}
                        {isProductUploadBusy ? "saving product..." : "save product"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-4 p-3 bg-stone-200 rounded text-stone-800 cursor-pointer active:scale-95 transition-all capitalize disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isProductUploadBusy}>
                      cancel
                    </button>
                  </div>
                  </div>
                </form>                  
              )}

              
        </>
    )
}