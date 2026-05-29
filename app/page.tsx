"use client";
import Image from "next/image";
import MarriageCountdown from "./components/MarriageCountdown";
import CoupleMessage from "./components/CoupleMessage";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";




const FloatingLamp = ({ className, style, reverse = false }: { className: string; style?: React.CSSProperties; reverse?: boolean }) => {
  // Memoize random values to prevent recalculation on re-renders
  const lampValues = useMemo(() => {
    // const duration = 60 + Math.random() * 40; // 60–100s (very slow flow)
    // const duration = 40 + Math.random() * 10; // 40–50s
    const duration = 60 + Math.random() * 10; // 60–70s
    const delay = Math.random() * 15;

    // depth feel - dramatic size variety
    const scale = Math.random() < 0.5
      ? 0.3 + Math.random() * 0.4  // 0.3–0.7 (small lamps)
      : 1.2 + Math.random() * 0.8; // 1.2–2.0 (large lamps)
    const blur = scale < 0.7 ? "blur(1.5px)" : "blur(0px)";

    return { duration, delay, scale, blur };
  }, []); // Empty dependency array means these values are calculated only once

  return (
    <img
      src="/lamp.png"
      alt="Lamp"
      className={`floating-lamp ${className}`}
      style={{
        animationName: reverse ? 'lampFlowReverse' : 'lampFlow',
        animationDuration: `${lampValues.duration}s`,
        animationDelay: `${lampValues.delay}s`,
        transform: `scale(${lampValues.scale})`,
        filter: `drop-shadow(0 0 18px rgba(255,180,90,0.9)) ${lampValues.blur}`,
        '--scale': lampValues.scale,
        ...style,
      } as React.CSSProperties}
    />
  );
};

export default function Home() {
  const events = [


    {
      Main_title_ceremony: "Blessings and Bangles",
      title_ceremony: "BYA HAATH",
      image: "/assets/byaah.png",
      date: "Saturday, 20th June 2026",
      venue: "Venue: The Pavilion hall",
      venue_address: <>Bund Garden Road, Agarkar Nagar, <br />   Pune, Maharashtra, 411001</>,
      time: "11am onwards",
      theme1: <><b>Theme:-</b> The Pink Edit <br/>(Dress in your favourite pink shade)</>,
      Main_title_ceremony2: "The Golden Glow",
      title_ceremony2: "HALDI HUES",
      image2: "/assets/haldi_m.png",
      time2: "4pm onwards",
      Main_title_ceremony3: "An Evening of Stars & Songs",
      image3: "/assets/cocktail_w.png",
      title_ceremony3: "SANGEET and DINNER",
      time3: "8pm onwards",
      theme2: <><b>Theme:-</b>  Glitz & Glam <br />(Dress in shimmery, sequins and statement fits)</>,
      link: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
    },
    {
      Main_title_ceremony: "Bhaat & Gaur",
      title_ceremony: "ANCESTRAL OFFERINGS/SACRED RITUAL",
      image: "/assets/gaur.png",
      date: "Sunday, 21st June 2026",
      venue: "Venue: The Pavilion hall",
      venue_address: <>Bund Garden Road, Agarkar Nagar, <br />   Pune, Maharashtra, 411001</>,
      time: "11am onwards",
      // Main_title_ceremony2: "Gaur",
      // title_ceremony2: "SACRED RITUAL",
      // time2: "12.30pm onwards",
      image2: "/assets/engagement_w.png",
      Main_title_ceremony2: "The Sacred Union",
      title_ceremony2: "WEDDING & RECEPTION",
      time2: <>6pm onwards <br /> followed by Varmala, Phera & Reception</>,
      theme2: <><b>Theme:-</b> Ethnic attire <br/> (Dress in any ethnic attire draped in lots of love and blessings)</>,
      link: "https://maps.app.goo.gl/fKxi3eDGsTSd5Aaz6?g_st=ic",
    },

  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio || started) return;

    try {
      audio.volume = 0.3;
      await audio.play();
      setStarted(true);
      setPlaying(true);
    } catch { }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch { }
    }
  };

  // First user interaction (mobile + desktop)
  useEffect(() => {
    const handler = () => startMusic();

    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [started]);


  return (

    <div>
      <div>

        <div className="fixed top-5 left-5 z-50">
          <a href="#details">
            <button className="flex items-center gap-3 border-white border-2 bg-white/0 backdrop-blur text-white px-6 py-3 rounded-full shadow-lg cursor-pointer">
              <span className="lg:text-[16px] text-[12px] font-semibold">
                View Details
              </span>

            </button>
          </a>
        </div>
      </div>
      <button
        onClick={() => {
          started ? toggleMusic() : startMusic();
        }}
        className="fixed bottom-4 right-4 z-50 bg-[#FF35A1] text-white p-3 rounded-xl text-xl cursor-pointer"
      >
        {/* {playing ? "⏸" : "▶"} */}
        <span className=" py-2 px-1.5 ">{playing ? "⏸" : "▶"} </span>
        <span className="text-[14px] lg:text-[16px]">{playing ? "Pause Music" : "Play Music"}</span>
      </button>

      <audio ref={audioRef} src="/assets/background_song_deeksha.mp3" loop preload="auto" playsInline />

      <div className="
    bg-[url('/assets/bride__mobilebg2.webp')]
    3xl:bg-[url('/assets/rohit_desktopbg22.jpg')]
    md:bg-[url('/assets/rohit_desktopbg2.webp')]
    bg-cover bg-no-repeat bg-top md:bg-center w-full px-4 sm:px-8 overflow-hidden relative">




        {/* Decorative Lamps - Natural Flow Pattern */}
        {/* Left-to-Right Lamps - Less crowded */}
        <FloatingLamp className="hidden lg:block absolute top-10 left-8 w-18 h-18 transform rotate-12 opacity-90" />
        <FloatingLamp className="hidden lg:block absolute top-30 left-20 w-16 h-16 transform rotate-45 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-20 h-20 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-70 left-60 w-14 h-14 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-90 left-80 w-20 h-20 transform rotate-25 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-110 left-100 w-18 h-18 transform rotate-10 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-130 left-120 w-20 h-20 transform rotate-35 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-150 left-140 w-16 h-16 transform rotate-22 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-170 left-160 w-20 h-20 transform rotate-18 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-190 left-180 w-18 h-18 transform rotate-28 opacity-85" />



        <FloatingLamp className="lg:hidden absolute top-10 left-8 w-12 h-12 transform rotate-12 opacity-90" />
        <FloatingLamp className="lg:hidden absolute top-30 left-20 w-12 h-12 transform rotate-45 opacity-80" />
        <FloatingLamp className="lg:hidden absolute top-50 left-40 w-10 h-10 transform rotate-30 opacity-85" />
        <FloatingLamp className="lg:hidden absolute top-70 left-60 w-10 h-10 transform rotate-15 opacity-80" />
        <FloatingLamp className="lg:hidden absolute top-90 left-80 w-12 h-12 transform rotate-25 opacity-75" />
        <FloatingLamp className="lg:hidden absolute top-110 left-100 w-12 h-12 transform rotate-10 opacity-85" />
        <FloatingLamp className="lg:hidden absolute top-130 left-120 w-12 h-12 transform rotate-35 opacity-75" />
        <FloatingLamp className="lg:hidden absolute top-150 left-140 w-12 h-12 transform rotate-22 opacity-85" />
        <FloatingLamp className="lg:hidden absolute top-170 left-160 w-12 h-12 transform rotate-18 opacity-80" />
        <FloatingLamp className="lg:hidden absolute top-190 left-180 w-12 h-12 transform rotate-28 opacity-85" />



        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-20 h-20 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-60 left-40 w-20 h-20 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-80 left-80 w-20 h-20 transform rotate-25 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-100 left-100 w-20 h-20 transform rotate-10 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-120 left-120 w-28 h-28 transform rotate-35 opacity-75" />
        <FloatingLamp className="hidden lg:block absolute top-140 left-140 w-20 h-20 transform rotate-22 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-160 left-160 w-28 h-28 transform rotate-18 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-180 left-180 w-20 h-20 transform rotate-28 opacity-85" />

        <FloatingLamp className="hidden lg:block absolute top-50 left-40 w-20 h-20 transform rotate-30 opacity-85" />
        <FloatingLamp className="hidden lg:block absolute top-60 left-40 w-20 h-20 transform rotate-15 opacity-80" />
        <FloatingLamp className="hidden lg:block absolute top-80 left-80 w-20 h-20 transform rotate-25 opacity-75" />


        {/* Right-to-Left Lamps - Less crowded */}
        <FloatingLamp className="hidden lg:block absolute top-20 right-12 w-18 h-19 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-40 right-32 w-20 h-20 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-60 right-52 w-18 h-18 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-80 right-72 w-16 h-16 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-100 right-92 w-18 h-18 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-120 right-112 w-18 h-18 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-140 right-132 w-16 h-16 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-160 right-152 w-18 h-18 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-180 right-172 w-16 h-16 transform -rotate-22 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-200 right-192 w-18 h-18 transform -rotate-35 opacity-85" reverse={true} />


        <FloatingLamp className="hidden lg:block absolute top-30 right-12 w-20 h-20 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-50 right-32 w-20 h-20 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-70 right-52 w-20 h-20 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-90 right-72 w-20 h-20 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-110 right-92 w-18 h-18 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-130 right-112 w-20 h-20 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-150 right-132 w-20 h-20 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-170 right-152 w-18 h-18 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-190 right-172 w-20 h-20 transform -rotate-22 opacity-85" reverse={true} />


        <FloatingLamp className="hidden lg:block absolute top-150 right-132 w-20 h-20 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-170 right-152 w-20 h-20 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="hidden lg:block absolute top-190 right-172 w-20 h-20 transform -rotate-22 opacity-85" reverse={true} />

        <FloatingLamp className="lg:hidden absolute top-20 right-12 w-12 h-12 transform -rotate-6 opacity-85" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-40 right-32 w-12 h-12 transform -rotate-12 opacity-75" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-60 right-52 w-12 h-14 transform -rotate-20 opacity-90" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-80 right-72 w-10 h-10 transform -rotate-8 opacity-85" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-100 right-92 w-12 h-12 transform -rotate-15 opacity-80" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-120 right-112 w-10 h-10 transform -rotate-25 opacity-90" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-140 right-132 w-12 h-12 transform -rotate-18 opacity-80" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-160 right-152 w-12 h-12 transform -rotate-30 opacity-75" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-180 right-172 w-12 h-12 transform -rotate-22 opacity-85" reverse={true} />
        <FloatingLamp className="lg:hidden absolute top-200 right-192 w-10 h-10 transform -rotate-35 opacity-85" reverse={true} />


        {/* <FallingLamps /> */}


        <div className=" md:pt-24 pt-4 md:pb-50 lg:pb-60 relative z-10 pb-24">
          <h2 className="text-[#15528A]  text-center leading-tight text-[32px] sm:text-5xl lg:text-[100px] md:pb-370 pb-0 flex flex-col items-center gap-y-2 ">
            <span className="font-parisienne [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)] font-extrabold">
              Deeksha
            </span>
            <span className="text-[12px] sm:text-3xl tracking-[10px] font-cormorant [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">WEDS</span>
            <span className="font-parisienne [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">Rohit</span>

            <p className="font-Cormorant-upright lg:text-4xl md:text-2xl text-[20px] font-bold md:mt-4">
              #RoSaysIDee
            </p>
          </h2>

          <div className="flex flex-col items-center text-center gap-6 mt-0  lg:pt-250 pt-150 md:pt-150">

 <img
              src="/assets/jain.webp"
              alt="ganesh"
              className="md:w-20 w-17 h-auto"
            />


            <h2 className="text-white font-cormorant 
            text-4xl sm:text-5xl lg:text-[50px] leading-tight lg:tracking-wide tracking-wider">
              The Jain Family
            </h2>
          </div>

          <div className="mt-8 text-center">

            <h2 className="text-white font-Cormorant-upright lg:text-[34px] md:text-2xl text-[26px]">
              invites
            </h2>
            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[19px] mt-6">
              you to join us in the wedding celebrations of
            </p>



            <h2 className="text-white font-Cormorant-upright text-center mt-14
            md:text-5xl text-[64px] lg:text-[100px] leading-tight font-bold">
              Deeksha
            </h2>


            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl mt-2 text-[16px]">
              (Daughter of Mrs. Sarita & Mr. Pradeep Jain)
              <br />(Granddaughter of Smt. Vidya Jain & Late Padam Chand Jain)
            </p>




            <h2 className="text-white font-Cormorant-upright text-center mt-4
            text-[64px] sm:text-7xl lg:text-[100px] leading-tight font-bold">
              <span className="text-white font-Cormorant-upright text-center lg:mt-10 mt-4 
            md:text-5xl text-[82px] lg:text-[150px] leading-tight">&</span>   <br />
              Rohit
            </h2>

            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[16px] mt-2">
              (Son of Mrs. Kanchan & Mr. Sanjay Bhawnani)<br />
              (Grandson of Mrs. Kanta & Mr. Kamal Bhawnani)
            </p>

            <p className="text-white font-Cormorant-upright lg:text-3xl md:text-2xl text-[24px] mt-8">
              On the following events
            </p>
            
          </div>

          <div className="flex justify-center mt-20" id="details">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-32 gap-16 ">
              {events.map((event, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <p className="text-white font-Cormorant-upright text-[28px] lg:text-[32px] md:text-[24px] mb-6 font-bold">
                    {event.date} <br />

                  </p>
                  <img
                    src={event.image}
                    alt={event.venue}
                    className="lg:w-80 lg-w-95 sm:w-76 h-auto w-70 "
                  />

                  <h2 className="text-white font-Cormorant-upright lg:text-[45px] md:text-2xl text-[35px] mt-4 font-bold">
                    {event.Main_title_ceremony}
                  </h2>
                  <h2 className="text-white font-Cormorant-upright lg:text-[25px] md:text-2xl text-[23px] font-bold">
                    {event.title_ceremony}
                  </h2>
                  <p className="text-white font-Cormorant-upright text-[22px]">

                    {event.time}

                  </p>

                  <img
                    src={event.image2}

                    className="lg:w-80 lg-w-95 sm:w-76 h-auto w-70 mt-12"
                  />
                  <h2 className="text-white font-Cormorant-upright lg:text-[45px] md:text-2xl text-[35px] mt-4 font-bold">
                    {event.Main_title_ceremony2}
                  </h2>
                  <h2 className="text-white font-Cormorant-upright lg:text-[25px] md:text-2xl text-[23px] font-bold">
                    {event.title_ceremony2}
                  </h2>
                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base">
                    <span className="text-[22px]">  {event.time2} </span>
                  </p>

                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
                    <span className="text-[20px]">{event.theme1}</span></p>
                  {/* <img
                    src={event.image3}
                    alt={event.venue}
                    className="lg:w-80 lg-w-95 sm:w-76 h-auto w-70 mt-12"
                  /> */}
                  {event.image3 && (
                    <img
                      src={event.image3}
                      alt={event.venue}
                      className="lg:w-80 sm:w-76 w-70 h-auto mt-12"
                    />
                  )}

                  <h2 className="text-white font-Cormorant-upright lg:text-[45px] md:text-2xl text-[35px] mt-4 font-bold">
                    {event.Main_title_ceremony3}
                  </h2>
                  <h2 className="text-white font-Cormorant-upright lg:text-[25px] md:text-2xl text-[23px] font-bold">
                    {event.title_ceremony3}
                  </h2>

                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base">
                    <span className="text-[22px]">  {event.time3} </span>
                  </p>
                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
                    <span className="text-[20px]">{event.theme2}</span></p>

                  <p className="text-white font-Cormorant-upright md:text-[22px] mt-2 text-[22px]">{event.venue}</p>



                </div>
              ))}
            </div>

          </div>

          <div className="flex justify-center md:mt-20 mt-10"><p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
            <span className="text-[22px] md:text-[24px]">Note: Themes optional, vibes unmatched</span></p>
          </div>

          <div className="lg:h-350 md:h-180 h-86 md:pt-0 pt-30 lg:pr-180 pr-40 md:pr-50  flex flex-col justify-end items-center text-center lg:pb-80 md:pb-40 pb-10">

            <h1 className="lg:text-3xl md:text-2xl text-xl text-[#E1EF1E] font-cormorant md:pb-12">
              MEET THE
            </h1>

            <h2 className="lg:text-[130px] text-6xl text-[#00EAFF] md:pt-0 pt-6 font-Cormorant-upright lg:leading-18 leading-8 md:leading-10">
              <span className="text-[#ADBAFF]">Bride</span> <br />
              & <br />
              <span className="text-[#3FA9FF]">Groom</span>
            </h2>
          </div>

        </div>
      </div>


      <div className="hidden md:block bg-[url('/assets/moon.webp')] bg-cover bg-no-repeat">
        <div className="lg:h-335 md:h-180 flex 3xl:pt-65 lg:pt-50 md:pt-25 3xl:h-410 justify-center">
<p className="font-Cormorant-upright lg:text-7xl md:text-4xl text-[34px] font-bold md:mt-4 text-white">
              #RoSaysIDee
            </p>
        </div>
      </div>



      <div className="md:hidden relative flex items-start justify-center">

        <img
          src="/assets/moon_mobile2.webp"
          alt="background"
          className="w-full h-full object-contain"
        />

        <div className="absolute top-[12svh] left-0 right-0 flex justify-center">
  <p className="font-Cormorant-upright lg:text-4xl md:text-2xl text-[34px] font-bold md:mt-4 text-white">
              #RoSaysIDee
            </p>
        </div>

      </div>

      <CoupleMessage />

      <MarriageCountdown />


    </div>
  );
}
