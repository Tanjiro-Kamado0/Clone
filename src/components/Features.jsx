import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import { animateWithGsap } from '../utils/animation';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {

    gsap.to('#exploreVideo', {
        scrollTrigger: {
          trigger:" #exploreVideo",
          toggleActions: 'play pause reverse restart',
          start: '-10% bottom',
        },
        onComplete:()=>{
            videoRef.current.play();
        }
    })

    const tl = gsap.timeline();

    // Animate the title
    tl.fromTo(
      '#features_title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Animate the text
    tl.fromTo(
      '.g_text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' },
      '-=0.5'
    );

    // ScrollTrigger for image animations with fade-out on scroll-up
    gsap.utils.toArray('.g-grow').forEach((image) => {
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',    // Animation starts when the image is 80% in view
            end: 'top 20%',      // Animation ends when the top of the image reaches 20% viewport height
            toggleActions: 'play reverse play reverse', // Handles enter/leave animations
            scrub: true,         // Smoothens animations on scroll
          },
        }
      );
    });
  }, []);

  return (
    <section className='h-full common-padding bg-zinc relative overflow-hidden'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full'>
          <h1 id='features_title' className='section-heading opacity-0 translate-y-10'>
            Explore the full story.
          </h1>
        </div>
        <div className='flex flex-col justify-center items-center overflow-hidden'>
          <div className='mt-32 mb-24 pl-24'>
            <h2 className='text-5xl md:text-7xl font-semibold'>iPhone.</h2>
            <h2 className='text-5xl md:text-7xl font-semibold'>Forged in titanium.</h2>
          </div>

          <div className='flex-center flex-col sm:px-10'>
            <div className='relative h-[50vh] w-full flex items-center'>
              <video
                playsInline
                id='exploreVideo'
                className='w-full h-full object-cover object-center'
                preload='none'
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>
            <div className='flex flex-col w-full relative'>
              <div className='feature-video-container'>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img
                    src={explore1Img}
                    alt='titanium'
                    className='feature-video g-grow opacity-0'
                  />
                </div>
                <div className='overflow-hidden flex-1 h-[50vh]'>
                  <img
                    src={explore2Img}
                    alt='titanium'
                    className='feature-video g-grow opacity-0'
                  />
                </div>
              </div>
              <div className='feature-text-container'>
                <div className='flex-1 flex-center'>
                  <p className='feature-text g_text opacity-0 translate-y-10'>
                    iPhone 15 Pro Max{' '}
                    <span className='text-white'>
                      the first iPhone to feature the aerospace-grade titanium design
                    </span>
                    , using the same alloy that spacecraft use for missions to Mars.
                  </p>
                </div>
                <div className='flex-1 flex-center'>
                  <p className='feature-text g_text opacity-0 translate-y-10'>
                    Titanium has one of the best strength-to-weight ratios of metals, making this our{' '}
                    <span className='text-white'>
                      lightest Pro model ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
