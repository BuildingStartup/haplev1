import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineCamera } from "react-icons/hi2";
import {useAuth} from "../../context/AuthContext"
import DashLayout from "../../layouts/DashLayout"
import AddProductButton from "../../features/Dashboard/AddProductButton";
import SellerContact from "../../features/Dashboard/SellerContact";
import ViewProducts from "../../features/Dashboard/ViewProducts";
import AddProductForm from "../../features/Dashboard/AddProductForm";
import useSeller from "../../features/profiles/useSeller";
import useSellerCategory from "../../features/categories/useSellerCategory";
import useSellerImages from "../../features/profiles/useSellerImages";
import ProfileData from "../../features/Dashboard/ProfileData";
import ProfileBanner from "../../features/Dashboard/ProfileBanner";
import ProfileEdit from "../../features/Dashboard/ProfileEdit";
import SplashScreen from "../../ui/SplashScreen";
import Modal from "../../ui/Modal";

function Profile() {
    const { user } = useAuth();
  const { fetchSellerById, seller: sellerInfo, loading, error } = useSeller();  
  const {
    fetchSellerCategory,
    loading: categoryLoading,
    error: categoryError,
    category,
  } = useSellerCategory();
  const {
      isUploading,
      isDeleting,
      handleUploadImage,
      handleGetImages,
      handleDeleteImage,
      images,
      loading: imageLoading,
      error: imageError,
  } = useSellerImages();

  useEffect(() => {
    if (user?.id) fetchSellerById(user.id);
  }, [user]);

  useEffect(() => {
    if (sellerInfo?.category_id) fetchSellerCategory(sellerInfo.category_id);
  }, [sellerInfo?.category_id]);

  useEffect(() => {
    if (sellerInfo?.id) handleGetImages(sellerInfo.id);
  }, [sellerInfo?.id]);

  // Products selected for upload (max 4 in total catalog)
  const [newProducts, setNewProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const selectedProductsRef = useRef([]);

  

  // keeps latest selected items
  useEffect(() => {
    selectedProductsRef.current = newProducts;
  }, [newProducts]);

  // revokes object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedProductsRef.current.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, []);  

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

  
  if (loading || categoryLoading || imageLoading) return <SplashScreen />;
  if (error || categoryError || imageError) return <NetworkError />;
  if (!sellerInfo) return <p>No seller data found</p>;

  const remaining = 4 - images.length;  

    return (
        <DashLayout>
            <main className="space-y-8 px-3 py-2 lg:px-12 lg:py-3 h-screen no-scrollbar overflow-y-auto">
                <ProfileBanner sellerInfo={sellerInfo} />
                <div className="-mt-20 lg:-mt-30 relative lg:px-6 flex flex-col lg:justify-between lg:items-start gap-4 lg:flex-row">

                    <ProfileData sellerInfo={sellerInfo} category={category} />

                    <div className="flex-4 rounded-lg p-2 lg:p-4 space-y-4 lg:space-y-6 bg-white">
                        <div className="space-y-1 ring ring-black/22 lg:space-y-4 p-2 lg:p-10 rounded-xl lg:rounded-2xl">
                        <h2 className="text-base lg:text-xl font-medium">About</h2>
                        <p className="lg:text-sm">{sellerInfo?.description}</p>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-black" />
                        <h3 className="text-base lg:text-xl font-medium">Catalog</h3>
                        <div className="flex-1 h-px bg-black" />
                    </div>

                    {/*view products  */}
                    <ViewProducts
                        products={images}
                        isDeleting={isDeleting}
                        handleDelete={(imageId) => deleteProduct(imageId)}
                    />

                    {/* Add Product Form */}
                    <AddProductForm
                        showForm={showForm}
                        setShowForm={setShowForm}
                        isUploading={isUploading}
                        errors={errors}
                        setErrors={setErrors}
                        images={images}
                        handleUploadImage={handleUploadImage}
                        newProducts={newProducts}
                        setNewProducts={setNewProducts}
                        handleCancel={handleCancel}
                        sellerInfo={sellerInfo}
                        remaining={Math.max(0, 4 - images.length - newProducts.length)}
                    />

                    <AddProductButton
                        products={images}
                        handleAddItem={handleAddItem}
                        showForm={showForm}
                        remaining={remaining}
                    />

                    {/* Contact Row */}
                    <SellerContact sellerInfo={sellerInfo} category={category} />

                    {/* action */}
                    <div className="flex gap-2.5 w-full lg:w-120.5">
                        <Modal.Open opens={"profileEdit"}>
                          <button className="bg-primary flex-1 lg:flex-4 p-1.5 lg:p-2.5 text-white rounded">
                            Edit Profile
                          </button>
                        </Modal.Open>
                        <button className="flex-1 lg:flex-2 p-1.5 lg:p-2.5 rounded bg-neutral-100/15">
                          Share
                        </button>
                    </div>

                    </div>

                </div>
                <Modal.Window name="profileEdit" noClose={true}>
                  <ProfileEdit sellerInfo={sellerInfo} />
                </Modal.Window>
            </main>
        </DashLayout>
    )
}

export default Profile
