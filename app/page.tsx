import Image from "next/image";

import HeroSection from "@/components/hero-section";
import Content from "@/components/content";

type Data = {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
  foto: string;
};

async function getMedicine() {
  const res = await fetch('http://127.0.0.1:5000/api/mahasiswa', { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const { data } = await getMedicine();
  const medicine: Data[] = data;
  const filteredByMedicine = medicine.filter((list) => {
    return list.type == `obat`
  });
  const filteredByDoctor = medicine.filter((list) => {
    return list.type == `dokter`
  });
  return (
    <main>
      <HeroSection />
      <Content />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Daftar Dokter yang tersedia Di Platform KlikSehat
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">

              KlikSehat memiliki jaringan dokter yang berpengalaman dan terverifikasi,
              siap memberikan pelayanan kesehatan terbaik secara online.
              Temukan dokter yang sesuai dengan kebutuhan Anda dengan mudah melalui platform KlikSehat.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="px-10">
            <div className="flex flex-wrap">
              {filteredByDoctor.map(item => (
                <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                  <div className="bg-white border rounded shadow p-4">
                    <img src={item.foto} alt={item.title} className="mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            <a href="/doctor">See More</a>

          </button>
        </div>
      </section>

      
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Daftar Obat yang tersedia Di Platform KlikSehat
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">

              Platform KlikSehat menyediakan beragam obat yang lengkap dan terpercaya,
              memudahkan Anda untuk menemukan dan membeli obat sesuai kebutuhan kesehatan Anda.
              Dapatkan kenyamanan dan kepastian dalam mencari dan memperoleh obat melalui KlikSehat.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="px-10">
            <div className="flex flex-wrap">
              {filteredByMedicine.map(item => (
                <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                  <div className="bg-white border rounded shadow p-4">
                    <img src={item.foto} alt={item.title} className="mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            <a href="/medicine">See More</a>
          </button>
        </div>
      </section>

    </main>
  );
}
