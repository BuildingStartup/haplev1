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
import useSignOut from "../../features/authentication/useSignOut";
import SplashScreen from "../../ui/SplashScreen";

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
  const { loading: signOutLoading, handleSignOut } = useSignOut();

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

  const handleLogout = () => {
    handleSignOut();
  };

  if (loading || categoryLoading || imageLoading) return <SplashScreen />;
  if (error || categoryError || imageError) return <NetworkError />;
  if (!sellerInfo) return <p>No seller data found</p>;

  const remaining = 4 - images.length;

  // Share and Copy
  const profilePath = `/seller/${sellerInfo?.username}`;
  const profileUrl = `${window.location.origin}${profilePath}`;
  // e.g. http://localhost:5173/seller/john
  // or https://yourdomain.com/seller/john in production

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: sellerInfo.business_name,
        text: `Check out ${sellerInfo.business_name} on Haple!`,
        url: profileUrl,
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl).then(() => alert("Link copied!"));
  };

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
