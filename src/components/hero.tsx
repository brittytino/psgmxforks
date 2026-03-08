"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./button";
import { VIDEO_LINKS } from "@/constants";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const STATUS_STEPS = [
    { at: 0,  msg: "$ git clone https://github.com/psgmxforks..." },
    { at: 15, msg: "$ npm install — resolving dependencies..." },
    { at: 30, msg: "$ Fetching open source contributions..." },
    { at: 48, msg: "$ Compiling 25MXians community modules..." },
    { at: 63, msg: "$ Building react components with GSAP..." },
    { at: 78, msg: "$ Optimizing assets for production..." },
    { at: 90, msg: "$ Deploying to the open source world..." },
    { at: 98, msg: "✓ Ready. Welcome to PSGMX Forks." },
  ];

  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const totalVideos = 4;
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingVideoIndex);
  };

  const VIDEO_KEYS = ["hero1", "hero2", "hero3", "hero4"] as const;
  const getVideoSrc = (i: number) => {
    const key = VIDEO_KEYS[i - 1]; // Subtract 1 because the array is 0-indexed, but the video indices are 1-based
    return VIDEO_LINKS[key];
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prevVideos) => prevVideos + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setIsLoading(false);
  }, [loadedVideos]);

  // Drive progress bar: accelerates to 90 in ~5s, locks until videos done or timeout
  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // hold at 90 until real done
        const increment = prev < 40 ? 2.5 : prev < 75 ? 1.5 : 0.6;
        return Math.min(prev + increment, 90);
      });
    }, 60);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Sync status message to progress
  useEffect(() => {
    const next = [...STATUS_STEPS].reverse().find((s) => progress >= s.at);
    if (next) setStatusIndex(STATUS_STEPS.indexOf(next));
  }, [progress]);

  // Dismiss loader 400ms after progress hits 100
  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(t);
    }
  }, [progress]);

  // Fallback: force-finish after 8s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            void nextVideoRef.current?.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[200] h-dvh w-screen overflow-hidden bg-[#010103]">
          <div className="flex w-full max-w-lg flex-col gap-8 px-8">

            {/* Brand */}
            <div className="flex flex-col gap-1">
              <p className="font-general text-[10px] uppercase tracking-[0.4em] text-violet-300 opacity-70">
                PSG College of Technology · Dept. of Computer Applications
              </p>
              <h1 className="font-zentry text-4xl font-black uppercase tracking-tight text-white">
                PSGMX <span className="text-violet-300">Forks</span>
              </h1>
              <p className="font-general text-[10px] uppercase tracking-[0.3em] text-white opacity-30">
                Open Source Community by 25MXians
              </p>
            </div>

            {/* Terminal status line */}
            <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3">
              <p
                className="font-general text-xs text-violet-300 transition-all duration-500"
                style={{ fontVariantLigatures: "none" }}
              >
                {STATUS_STEPS[statusIndex]?.msg ?? STATUS_STEPS[0].msg}
              </p>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-2">
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-violet-300 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                {/* Glow head */}
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-violet-300 blur-sm transition-all duration-100 ease-linear"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="font-general text-[10px] uppercase tracking-widest text-white opacity-30">
                  Initializing
                </p>
                <p className="font-zentry text-2xl font-black text-white tabular-nums">
                  {Math.round(progress)}
                  <span className="font-general text-sm font-normal text-violet-300">%</span>
                </p>
              </div>
            </div>

            {/* Bottom tag */}
            <p className="font-general text-[9px] uppercase tracking-[0.5em] text-white opacity-20">
              &lt; / &gt; &nbsp; Building the open source world
            </p>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="bg-blue-75 relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
                onError={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading text-blue-75 absolute right-5 bottom-5 z-40">
          F<b>o</b>rks
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              PSGM<b>X</b>
            </h1>

            <p className="font-robert-regular mb-5 max-w-64 text-blue-100">
              Open Source Community <br />
              by 25MXians of PSG Tech
            </p>

            <Button
              id="watch-trailer"
              leftIcon={TiLocationArrow}
              containerClass="bg-yellow-300 flex-center gap-1"
            >
              Explore Projects
            </Button>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute right-5 bottom-5 text-black">
        F<b>o</b>rks
      </h1>
    </section>
  );
};
