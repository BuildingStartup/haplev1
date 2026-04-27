function ProfileActions() {
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

    

    return (
        <div className="flex gap-2.5 w-full lg:w-120.5">
            <button className="bg-primary flex-1 lg:flex-4 p-1.5 lg:p-2.5 text-white rounded">Edit Profile</button>
            <button className="flex-1 lg:flex-2 p-1.5 lg:p-2.5 rounded bg-neutral-100/15">Share</button>
        </div>
    )
}

export default ProfileActions
