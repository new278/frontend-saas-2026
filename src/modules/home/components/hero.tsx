import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative h-[420px]  md:h-[520px] w-full">
      <Image
        src="/image/banner.png"
        alt="Hero banner"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Global Innovation in Information Technology & Civil Engineering
          </h1>
          <p className="text-sm md:text-base text-white/90 mb-6">
            Building tomorrow&apos;s solutions today through cutting-edge technology and engineering excellence.
            Join us in shaping a better future for generations to come.
          </p>

          <a
            href="#services"
            className="inline-block bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium shadow-lg"
          >
            Global Service Provision
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero