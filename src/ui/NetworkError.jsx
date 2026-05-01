export default function NetworkError() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-1 justify-center flex-col">
        <div className="p-5 bg-blue-50 rounded-full">
          <img
            src="./Phone-WIFI.png"
            alt="Phone displaying No signal"
            className="w-60 lg:w-80 h-60 lg:h-80 object-cover"
          />
        </div>
        <div className="text-center text-xl mt-2">
          <p>No Signal</p>
          <div className="text-slate-400 flex flex-col gap-1 text-sm mt-2">
            <p>No internet connection</p>
            <p>Please try again</p>
          </div>
        </div>
      </div>
      <div className="p-6 w-5/6 lg:flex lg:items-center lg:justify-center">
        <button
          onClick={() => window.location.reload()}
          className="w-full lg:w-fit bg-primary text-white py-3 lg:px-12 lg:py-2 lg:rounded rounded-xl text-base cursor-pointer"
        >
          Retry
        </button>
      </div>
    </section>
  );
}
