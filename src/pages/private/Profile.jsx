import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineCamera } from "react-icons/hi2";
import DashLayout from "../../layouts/DashLayout"
import AddProductButton from "../../features/Dashboard/AddProductButton";
import SellerContact from "../../features/Dashboard/SellerContact";
import ViewProducts from "../../features/Dashboard/ViewProducts";

function Profile() {
    // dummy object
    const images = [
        // {
        //     name: "hello",
        //     caption: "lorem ipsum dure skadf gkdahs hgitns ghisd nsdkfd shsia nshadn ahdna hhdjja",
        //     image_url: "luxelushes"
        // },        
        // {
        //     name: "hello",
        //     caption: "lorem ipsum dure skadf gkdahs hgitns ghisd nsdkfd shsia nshadn ahdna hhdjja",
        //     image_url: "luxelushes"
        // },        
        // {
        //     name: "hello",
        //     caption: "lorem ipsum dure skadf gkdahs hgitns ghisd nsdkfd shsia nshadn ahdna hhdjja",
        //     image_url: "luxelushes"
        // },        
                
    ]

    const sellerInfo = 
        {
            campus: "Bowen University",
            whatsapp_number: "+2347015482220"
        }
    


    const [showForm, setShowForm] = useState(false);

    const handleAddItem = () => {
        setShowForm(true);
      };
    const remaining = 4 - images.length;
    return (
        <DashLayout>
            <main className="space-y-8 px-4 py-2 lg:px-12 lg:py-3 h-screen no-scrollbar overflow-y-auto">
                <div className="relative h-80">
                    <img src="../sellerBanner.jpg" alt="seller banner" className="h-full w-full object-cover rounded-lg" />
                    <div className="absolute top-4 right-6 flex items-center gap-2.5 text-white p-2.5 ring ring-white rounded bg-neutral-100/15">
                        <FaCamera />
                        <span>Change Cover</span>
                    </div>
                </div>
                <div className="-mt-30 relative px-6 flex justify-between items-start gap-4">

                    <div className="flex-1 bg-white p-4 rounded-lg space-y-3">
                        <div className="relative w-57.5 h-57.5 overflow-hidden">
                            <img src="../seller5.jpg" alt="seller logo" className="w-full h-full rounded-full" />
                            <HiOutlineCamera className="text-xl absolute bottom-8 right-5 fill-white stroke-primary" strokeWidth={2}/>
                        </div>
                        <div className="p-2.5 flex flex-col justify-center items-center gap-3">
                            <h1 className="text-2xl font-semibold">The Brunch Box</h1>
                            <span className="py-1.5 px-6 rounded-full bg-neutral-100/16">Shoes</span>
                        </div>
                    </div>

                    <div className="flex-4 rounded-lg p-4 space-y-6 bg-white">
                        <div className="space-y-1 ring ring-black/22 lg:space-y-4 p-2 lg:p-10 rounded-xl lg:rounded-2xl">
                        <h2 className="text-lg lg:text-xl font-medium">Description</h2>
                        <p className="lg:text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolore nobis commodi. Repudiandae laudantium doloremque illum unde nulla explicabo quam omnis consectetur debitis corporis placeat qui laboriosam vel, libero architecto.</p>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1 h-px bg-black" />
                        <h3 className="text-lg lg:text-xl font-medium">Catalog</h3>
                        <div className="flex-1 h-px bg-black" />
                    </div>

                    {/*view products  */}
                    <ViewProducts
                        products={images}
                        isDeleting={false}
                        // handleDelete={(imageId) => deleteProduct(imageId)}
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
                    <div className="flex gap-2.5 w-120.5">
                        <button className="bg-primary flex-4 p-2.5 text-white rounded">Edit Profile</button>
                        <button className="flex-2 p-2.5 rounded bg-neutral-100/15">Share</button>
                    </div>

                    </div>

                </div>
            </main>
        </DashLayout>
    )
}

export default Profile
