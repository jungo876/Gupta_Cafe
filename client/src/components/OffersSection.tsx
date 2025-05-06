// import React from "react";

// const OffersSection = () => {
//   return (
//     <section className="flex h-[400px] w-full text-white font-serif text-3xl md:text-4xl font-semibold">
//       {/* Sandwiches Offer */}
//       <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500">
//         <p className="text-center px-4">✨ 20% OFF ON ALL SANDWICHES </p>
//       </div>
//       {/* White Divider */}
// <div className="w-full h-[1px] bg-white my-6" />

// {/* CTA Button */}
// <div className="w-full flex justify-center">
//   <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300">
//     Order Now
//   </button>
// </div>


//       {/* Lattes Offer */}
//       <div
//         className="w-1/2 flex items-center justify-center bg-cover bg-center"        
//         style={{
//           backgroundImage: `url(https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg)`, // Make sure this image exists
//         }}
//       >
        
//         <p className="text-center backdrop-blur-sm bg-black/40 px-4 py-2 rounded-lg">
//           ☕ 30% Off on All Lattes ☕
//         </p>
//       </div>
//     </section>
//   );
// };

// export default OffersSection;



import React from "react";

const OffersSection = () => {
  return (
    <section className="flex flex-col items-center">
      {/* Offer Section */}
      <div className="flex w-full h-[400px] text-white font-serif text-3xl md:text-4xl font-semibold">
        {/* Sandwich Offer */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-500">
          <p className="text-center px-4">✨ 20% OFF ON ALL SANDWICHES</p>
        </div>

        {/* Vertical Line */}
        <div className="w-[2px] bg-white h-full" />

        {/* Latte Offer */}
        <div
          className="w-1/2 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg)`, // your latte image path
          }}
        >
          <p className="text-center backdrop-blur-sm bg-black/40 px-4 py-2 rounded-lg">
            ☕ 30% OFF ON ALL COFEE
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center mt-6">
        {/* <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300">
          Order Now
        </button> */}
      </div>
    </section>
  );
};

export default OffersSection;
