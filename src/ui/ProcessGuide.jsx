import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function ProcessGuide({ target }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = {
    buyer: [
      {
        imgSrc: "../buyers1.jpg",
        title: "Discover trusted sellers",
        description:
          "Browse trusted campus stores and products on Haple. Search by category, brand, or what's trending around you.",
        cta: "Start Browsing",
        linkTo: "/allSellers",
      },
      {
        imgSrc: "../buyers2.jpg",
        title: "Connect with sellers",
        description:
          "Tap a profile to see seller info. Message the seller directly on Whatsapp to ask questions or place your order.",
        cta: "Chat a Seller",
        linkTo: "/allSellers",
      },
      {
        imgSrc: "../buyers3.jpg",
        title: "Buy with confidence",
        description:
          "Pay the seller how you both agree and pick up on campus or arrange delivery. All sellers are verified campus stores.",
        cta: "Find stores near you",
        linkTo: "/allSellers",
      },
    ],
    seller: [
      {
        imgSrc: "../sellers1.jpg",
        title: "Create your store",
        description:
          "Sign up and set up your Haple profile in minutes. Add your products, prices and contact details.",
        cta: "Create your store",
        linkTo: "/signUp",
      },
      {
        imgSrc: "../sellers2.jpg",
        title: "Get discovered",
        description:
          "Show up where students are already looking. Your store stays live 24/7 so buyers can find you beyond the Trade Fair.",
        cta: "Go live now",
        linkTo: "/signUp",
      },
      {
        imgSrc: "../sellers3.jpg",
        title: "Sell & Track Growth",
        description:
          "Connect with eager buyers, close sales on Whatsapp, and use your Haple insights to see what's working.",
        cta: "Start Selling Today",
        linkTo: "/login",
      },
    ],
  };

  const activeData = content[target] || [];
  const totalSteps = activeData.length;

  const nextStep = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSteps);
  };

  const prevStep = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  const item = activeData[currentIndex];

  return (
    <div className="pb-4 pt-1">
      {/* Step Indicator */}
      <div className="flex justify-center mb-6 space-x-4">
        {activeData.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              idx === currentIndex ? "w-8 bg-primary" : "w-3 bg-neutral-300"
            }`}
          />
        ))}
      </div>

      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row min-h-112.5">
          {/* Image Section */}
          <div className="w-full md:grow relative h-72 md:h-auto overflow-hidden">
            <img
              key={item.imgSrc} // Key forces re-animation on change
              src={item.imgSrc}
              alt={item.title}
              className="w-full h-full object-cover animate-in fade-in zoom-in duration-500"
            />
          </div>
          {/* Navigation Arrows (Mobile Overlay) */}
          <div className="absolute inset-x-0 top-1/2 flex items-center justify-between px-4 md:hidden">
            <button
              onClick={prevStep}
              className="p-3 bg-white/80 rounded-full text-base cursor-pointer"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextStep}
              className="p-3 bg-white/80 rounded-full text-base cursor-pointer"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Text Section */}
          <div className="w-full p-7 md:8/12 flex flex-col justify-center">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">
              Step {currentIndex + 1} of {totalSteps}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4 transition-all">
              {item.title}
            </h3>
            <p className="text-neutral-600 mb-8 leading-relaxed text-sm">
              {item.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to={item.linkTo} className="w-full">
                <button className="w-full cursor-pointer md:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-xl transition-all">
                  {item.cta}
                </button>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-2 ml-auto">
                <button
                  onClick={prevStep}
                  className="p-3 bg-white/80 rounded-full text-base cursor-pointer"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextStep}
                  className="p-3 bg-white/80 rounded-full text-base cursor-pointer"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessGuide;
