import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineCamera } from "react-icons/hi2";
import DashLayout from "../../layouts/DashLayout"
import AddProductButton from "../../features/Dashboard/AddProductButton";
import SellerContact from "../../features/Dashboard/SellerContact";
import ViewProducts from "../../features/Dashboard/ViewProducts";
import AddProductForm from "../../features/Dashboard/AddProductForm";

function Profile() {
    // dummy object
    const images = [
        // {
        //     name: "Luxe Lashes By Sarah",
        //     caption: "lorem ipsum dure skadf gkdahs hgitns ghisd nsdkfd shsia nshadn ahdna hhdjja",
        //     image_url: "luxelushes"
        // },        
        // {
        //     name: "Luxe Lashes By Sarah",
        //     caption: "lorem ipsum dure skadf gkdahs hgitns ghisd nsdkfd shsia nshadn ahdna hhdjja",
        //     image_url: "luxelushes"
        // },        
        // {
        //     name: "Luxe Lashes By Sarah",
        //     caption: "lorem ipsum dure skadf gkdahs hgitns ghisd nsdkfd shsia nshadn ahdna hhdjja",
        //     image_url: "luxelushes"
        // },        
                
    ]

    const sellerInfo = 
        {
            campus: "Bowen University",
            whatsapp_number: "+2347015482220"
        }
    

        const [newProducts, setNewProducts] = useState([]);
        const [showForm, setShowForm] = useState(false);
        const [openOptions, setOpenOptions] = useState(false);
        const [errors, setErrors] = useState({});
        const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
        const selectedProductsRef = useRef([]);
        const [uploadProgress, setUploadProgress] = useState([]);
        // const isProductUploadBusy = isSubmittingProduct || isUploading;
        const isProductUploadBusy = false;
      

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
    
      const deleteProduct = async (imageId) => {
        if (!imageId) return;
        return handleDeleteImage(sellerInfo.id, imageId);
      };
    
      const handleCancel = () => {
        newProducts.forEach((item) => {
          if (item.preview) URL.revokeObjectURL(item.preview);
        });
        setNewProducts([]);
        setErrors({});
        setShowForm(false);
      };

    const handleAddItem = () => {
        setShowForm(true);
      };
    const remaining = 4 - images.length;
    return (
        <DashLayout>
            <main className="space-y-8 px-3 py-2 lg:px-12 lg:py-3 h-screen no-scrollbar overflow-y-auto">
                <div className="relative w-full h-45 lg:h-70">
                    <img src="../sellerBanner.jpg" alt="seller banner" className="h-full w-full object-cover rounded-lg" />
                    <div className="absolute top-2 lg:top-4 right-2 lg:right-6 flex items-center gap-2.5 text-white p-1 lg:p-2.5 ring ring-white rounded bg-neutral-100/15">
                        <FaCamera />
                        <span>Change Cover</span>
                    </div>
                </div>
                <div className="-mt-20 lg:-mt-30 relative lg:px-6 flex flex-col lg:justify-between items-center lg:items-start gap-4 lg:flex-row">

                    <div className="flex-1 bg-white p-2 lg:p-4 rounded-lg space-y-3 flex flex-col items-center">
                        <div className="relative w-25 lg:w-57.5 h-25 lg:h-57.5 overflow-hidden">
                            <img src="../seller5.jpg" alt="seller logo" className="w-full h-full rounded-full" />
                            <HiOutlineCamera className="text-xl absolute bottom-2 lg:bottom-8 right-0 lg:right-5 fill-white stroke-primary" strokeWidth={2}/>
                        </div>
                        <div className="p-1 lg:p-2.5 flex flex-col justify-center items-center gap-3">
                            <h1 className="text-xl lg:text-2xl font-semibold">The Brunch Box</h1>
                            <span className="py-1.5 px-6 rounded-full bg-neutral-100/16">Shoes</span>
                        </div>
                    </div>

                    <div className="flex-4 rounded-lg p-2 lg:p-4 space-y-4 lg:space-y-6 bg-white">
                        <div className="space-y-1 ring ring-black/22 lg:space-y-4 p-2 lg:p-10 rounded-xl lg:rounded-2xl">
                        <h2 className="text-base lg:text-xl font-medium">About</h2>
                        <p className="lg:text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolore nobis commodi. Repudiandae laudantium doloremque illum unde nulla explicabo quam omnis consectetur debitis corporis placeat qui laboriosam vel, libero architecto.</p>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-black" />
                        <h3 className="text-base lg:text-xl font-medium">Catalog</h3>
                        <div className="flex-1 h-px bg-black" />
                    </div>

                    {/*view products  */}
                    <ViewProducts
                        products={images}
                        isDeleting={false}
                        // handleDelete={(imageId) => deleteProduct(imageId)}
                    />

                    {/* Add Product Form */}
                    <AddProductForm
                        showForm={showForm}
                        handleSubmit={submitProduct}
                        selectedProducts={newProducts}
                        errors={errors}
                        handleCancel={handleCancel}
                        handleSelectImages={handleSelectImages}
                        handleProductFieldChange={handleProductFieldChange}
                        handleRemoveSelectedImage={handleRemoveSelectedImage}
                        remaining={Math.max(0, 4 - images.length - newProducts.length)}
                        loading={isProductUploadBusy}
                        uploadProgress={uploadProgress}
                    />

                    <AddProductButton
                        products={images}
                        handleAddItem={handleAddItem}
                        showForm={showForm}
                        remaining={remaining}
                    />

                    {/* Contact Row */}
                    <SellerContact sellerInfo={sellerInfo} />

                    {/* action */}
                    <div className="flex gap-2.5 w-full lg:w-120.5">
                        <button className="bg-primary flex-1 lg:flex-4 p-1.5 lg:p-2.5 text-white rounded">Edit Profile</button>
                        <button className="flex-1 lg:flex-2 p-1.5 lg:p-2.5 rounded bg-neutral-100/15">Share</button>
                    </div>

                    </div>

                </div>
            </main>
        </DashLayout>
    )
}

export default Profile
