"use client"
import { useState } from "react"
import { useEffect } from 'react';
import RCard from "@/app/components/card";
import FAQ from "@/app/components/faq";
import {
  GiAbstract020,
  GiAbstract041,
} from "react-icons/gi";


export default function Home() {
  //1. Create Initial UI.
  //2. Create State Variables.
  //3. Filling Islamic Content When Page Load.
  //4. Create Components.
  //5. Looping and Binding Data.

  // #2
  // State variables
  const [introduction, setIntroduction] = useState({
    title:'',
    content:'',
  });
  const [keyPoints, setKeyPoints] = useState([
    {'point':'Title','description':'Description..'},
    {'point':'Title','description':'Description..'},
    {'point':'Title','description':'Description..'},
    {'point':'Title','description':'Description..'},
  ]);
  const [faq, setFaq] = useState([
    {'question':'Question 1:...','answer':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.'},
    {'question':'Question 2:...','answer':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.'},
    {'question':'Question 3:...','answer':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.'},
    {'question':'Question 4:...','answer':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.'},
  ]);
  // const myArray = [1,2,3,4,5];

  // #3
  useEffect(() => {
    // Code to run on page load
    try {
      const storedData = localStorage.getItem('islamic-content');
      const data = storedData ? JSON.parse(storedData) : null;
      // Handle the parsed data
      if(data){
        setIntroduction(data.islamicData.intro);
        setKeyPoints(data.islamicData.keyPoints);
        setFaq(data.islamicData.faqs);
      }
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    // #1
    <div>
      {/* #Hero */}
      <section id="hero"
        className="relative bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div
          className="absolute inset-0 bg-black/25 lg:from-white/95 lg:to-white/25 ltr:lg:bg-gradient-to-r rtl:lg:bg-gradient-to-l"></div>

        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
              Let us find your
              <strong className="block font-extrabold text-sky-700 mt-4"> Islamic Content. </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white">
              Using artificial intelligence, you can get the Islamic content that suits you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
              <a
                href="#introduction"
                className="block w-full rounded bg-sky-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-800 focus:outline-none focus:ring active:bg-sky-700 sm:w-auto">
                Get Started
              </a>

              <a
                href="#faq"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-sky-700 shadow hover:text-sky-800 focus:outline-none focus:ring active:text-sky-700 sm:w-auto">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* #Introduction */}
      <section id="introduction" className="bg-white">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 bg-white p-3 sm:p-8">
          <h2 className="text-gray-700 text-xl font-bold uppercase">Introduction</h2>
          <RCard
            // bg-sky-100
            className="bg-[#fcf4ff]"
            heading={introduction.title || "Title"}
            description={introduction.content || "Description.."}
            // text-[#D566FF]
            icon={<GiAbstract041 size="2.5rem" className="text-sky-600" />} />
        </div>
      </section >
      {/* #Key Points */}
      <section id="key-points" >
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 bg-white p-3 sm:p-8">
          <h2 className="text-gray-700 text-xl font-bold uppercase lg:col-span-2 md:col-span-2">Key Points</h2>
          {keyPoints.length > 0 && keyPoints.map((item, index) => (
            <RCard key={index}
              className="bg-[#fcf4ff]"
              heading={item.point}
              description={item.description}
              icon={<GiAbstract020 size="2.5rem" className="text-sky-600" />}
            />
          ))}
          
        </div>
      </section >
      {/* # FAQ */}
      < section id="faq" className="bg-white dark:bg-gray-900" >
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-2xl dark:text-white">FAQs</h1>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <div>
          {faq.length>0 && faq.map((item:any,index)=>(
              <div key={index}>
                <FAQ
                  question={item.question}
                  answer={item.answer} />

                  <hr className="my-8 border-gray-200 dark:border-gray-700" />
              </div>
            ))
          }

          </div>
        </div>
      </section >
    </div >
  )
}
