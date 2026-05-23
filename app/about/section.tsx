'use client';

import { useEffect } from 'react';
import AOS from 'aos';

import 'aos/dist/aos.css';
import Image from 'next/image';
import { Target, Eye, Box } from 'lucide-react';

const services = [
  {
    title: 'Our Mission',
    description:
      'To provide premium quality, organic, and sustainable tea that enhances the health and happiness of our customers worldwide.',
    icon: Target,
    delay: 0,
  },
  {
    title: 'Our Vision',
    description:
      'To be recognized as a global leader in sustainable tea production, nurturing communities and promoting eco-friendly practices.',
    icon: Eye,
    delay: 100,
  },
  {
    title: 'Our Services',
    description:
      'We offer tea cultivation, organic processing, wholesale distribution, private labeling, and workshops.',
    icon: Box,
    delay: 200,
  },
];

const AboutUsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    // <section className="bg-white">
    //   <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">

    //     {/* 🔶 CEO Section */}
    //     <div className="grid md:grid-cols-2 gap-10 items-center">
          
    //       {/* Text */}
    //       <div data-aos="fade-right">
    //         <h2 className="text-3xl font-bold text-green-700 mb-4">
    //           Our CEO Story
    //         </h2>
    //         {/* <div className="w-16 h-1 bg-orange-500 mb-6"></div> */}
    //         <p className="text-gray-600 leading-relaxed">
    //           Our CEO, Mr. chaudhary, started Rampokha Green Tea with a vision to
    //           bring the finest tea from Ilam to the world. From humble beginnings,
    //           his dedication has built a trusted tea brand focused on quality and sustainability.
    //         </p>
    //       </div>

    //       {/* Image */}
    //       <div data-aos="zoom-in">
    //         <Image
    //           src="/image/ankit.jpeg"
    //           alt="CEO"
    //           width={600}
    //           height={600}
    //           className="rounded-2xl shadow-lg object-cover w-full h-[350px]"
    //         />
    //       </div>
    //     </div>

    //     {/* 🔶 Services Section */}
    //     <div>
    //       <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
    //         Our Values
    //       </h2>
    //       {/* <div className="w-20 h-1 bg-orange-500 mx-auto mb-10"></div> */}

    //       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
    //         {services.map((service, index) => {
    //           const Icon = service.icon;
    //           return (
    //             <div
    //               key={index}
    //               data-aos="fade-up"
    //               data-aos-delay={service.delay}
    //               className="bg-white border border-green-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 text-center"
    //             >
    //               <div className="flex justify-center mb-4">
    //                 <div className="bg-green-100 p-4 rounded-full">
    //                   <Icon className="w-8 h-8 text-green-700" />
    //                 </div>
    //               </div>

    //               <h4 className="text-xl font-semibold text-green-700 mb-2">
    //                 {service.title}
    //               </h4>

    //               <p className="text-gray-600 text-sm">
    //                 {service.description}
    //               </p>

    //               {/* Accent line */}
    //               {/* <div className="mt-4 w-10 h-1 bg-orange-500 mx-auto"></div> */}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>

    //   </div>
    // </section>
    <section className="bg-white">
  <div className="container mx-auto px-[200px] py-16 space-y-20">

    {/* 🔶 CEO SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      {/* TEXT */}
      <div data-aos="fade-right">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Our CEO Story
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Our CEO, Mr. Chaudhary, started Rampokha Green Tea with a vision to
          bring the finest tea from Ilam to the world. From humble beginnings,
          his dedication has built a trusted tea brand focused on quality and sustainability.
        </p>
      </div>

      {/* IMAGE */}
      <div data-aos="zoom-in">
        <Image
          src="/image/ankit.jpeg"
          alt="CEO"
          width={600}
          height={600}
          className="rounded-2xl shadow-lg object-cover w-full h-[350px]"
        />
      </div>

    </div>

    {/* 🔶 VALUES SECTION */}
    <div>

      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        Our Values
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={service.delay}
              className="bg-white border border-green-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-green-700" />
                </div>
              </div>

              <h4 className="text-xl font-semibold text-green-700 mb-2">
                {service.title}
              </h4>

              <p className="text-gray-600 text-sm">
                {service.description}
              </p>

            </div>
          );
        })}

      </div>
    </div>

  </div>
</section>
  );
};

export default AboutUsSection;