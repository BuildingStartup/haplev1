export default function Success() {
  return (
    <section className="">
      <div className="flex items-end bg-white pt-5 px-6 justify-between text-base">
        <img src="./Logo.png" alt="Haple Logo" className="w-17 object-cover" />
        <p className="text-[#0050CB]">Help</p>
      </div>
      <main className="flex items-center justify-center">
        <div className="flex flex-col items-center shadow-sm sm:py-13 sm:px-20 px-5 py-5 space-y-1 rounded-3xl">
          <img src="./Success.png" alt="" />
          <h3 className="text-[#191C1D] text-3xl font-semibold">Link Sent</h3>
          <p className="text-base sm:text-lg text-[#424656]">
            A Link have been sent to your email
          </p>
        </div>
      </main>
    </section>
  );
}
