import React from 'react';
import Carousel from './Carousel';
import CollegeInfoCards from "./CollegeInfoCards";
import Counter from "./Numbers/Counter";
import AboutSGC from './Constitution/AboutSGC';
import img3 from '../../assets/main/img3.webp';
const Home: React.FC = () => {
  const slides = [
    {
      id: 1,
      imageUrl: img3,
      title: 'Welcome to SGC',
      subtitle: 'Excellence in Education Since 1950',
      ctaText: 'Explore Programs',
      ctaLink: '/programs'
    },
    {
      id: 2,
      imageUrl: img3,
      title: 'Innovative Learning Environment',
      subtitle: "State-of-the-art Facilities for Tomorrow's Leaders",
      ctaText: 'Tour Our Campus',
      ctaLink: '/campus-tour'
    },
    {
      id: 3,
      imageUrl: img3,
      title: 'Join Our Vibrant Community',
      subtitle: 'Applications Now Open for Fall 2023',
      ctaText: 'Apply Now',
      ctaLink: '/admissions'
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden backdrop-blur-lg bg-white/30 border-white/20">
      <Carousel slides={slides} autoPlay={true} interval={6000} />
      
      {/* Cards positioned relative to the carousel */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <CollegeInfoCards />
        </div>
      </div>
      
      <AboutSGC />  
      {/* Counter section */}
      <div className="w-full bg-white pt-10 pb-20">
        <Counter />     
      </div>

      

    </div>
  );
};

export default Home;