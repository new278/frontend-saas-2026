import React from "react";
import { METRICS } from "../constants/home.constants";

export default function Matrix() {
  return (
    <section aria-label="metrics" className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
       		 <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Blogs are Provided worldwide
        </h2>
        <p className="text-center text-gray-600 mb-16 w-ful md:w-2/3 mx-auto">
          With years of experience in mobile security and upscale detection, our products have helped countless people
          safeguard their devices and find peace of mind.
        </p>
        <div className="bg-transparent rounded-lg">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center py-6">
            {METRICS.map((m) => (
              <div key={m.id} className="relative">
                {/* decorative blue offset shadow */}
                <div className="absolute inset-0 translate-x-2 translate-y-2 bg-transparent rounded-lg" aria-hidden />

                <div className="relative bg-white rounded-lg p-6 shadow-md overflow-hidden">
                  {/* top-right accent */}
                  <div className="absolute -top-2 -right-2 w-20 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-bl-lg" aria-hidden />

                  <div className="flex flex-col items-center justify-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
                      {m.value}
                    </div>
                    <div className="text-sm md:text-base text-blue-600 mt-2">{m.label}</div>
                    {m.hint && (
                      <div className="text-[11px] text-gray-400 mt-1">{m.hint}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}