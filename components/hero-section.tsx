import React from "react";

const HeroSection = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-24 pb-16 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            KlikSehat - Platform Kesehatan
          </h1>
          <p className=" leading-relaxed">
          Kliksehat adalah sebuah platform online yang menyediakan 
          layanan untuk melihat dokter dan membeli obat secara praktis dan efisien. Dengan kemajuan teknologi, 
          Kliksehat telah menghadirkan solusi yang memudahkan akses kesehatan bagi masyarakat di era digital.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
