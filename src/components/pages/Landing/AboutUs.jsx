import React from "react";
import { Wrench, Target, Briefcase, FileText } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-40 h-40"
          style={{ backgroundColor: "rgba(232, 63, 37, 0.08)" }}>
        </div>
        <div
          className="absolute top-20 right-20 w-24 h-24"
          style={{ backgroundColor: "rgba(232, 63, 37, 0.12)" }}>
        </div>
        <div
          className="absolute bottom-0 left-0 w-48 h-48"
          style={{ backgroundColor: "rgba(43, 43, 43, 0.08)" }}>
        </div>
        <div
          className="absolute bottom-16 left-16 w-32 h-32"
          style={{ backgroundColor: "rgba(43, 43, 43, 0.12)" }}>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {}
        <div className="text-center mb-8 space-y-4">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
            style={{ fontFamily: "Antonio, sans-serif" }}>
            
            WHY CHOOSE US ?
          </h2>
          <p
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4"
            style={{ fontFamily: "Inter, sans-serif" }}>
            
            A 90 day professional bootcamp that turns engineering students
            into industry ready professionals through hands on projects,
            live classes and personal coaching.
          </p>
        </div>

        {}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-12 sm:mb-16 max-w-3xl mx-auto text-center">
          <div>
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-gray-900"
              style={{ fontFamily: "Antonio, sans-serif" }}>
              
              3 Hrs/Day
            </div>
            <div
              className="text-xs sm:text-sm text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}>
              
              2 PM to 5 PM IST
            </div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-gray-900"
              style={{ fontFamily: "Antonio, sans-serif" }}>
              
              Sun to Thu
            </div>
            <div
              className="text-xs sm:text-sm text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}>
              
              Fri &amp; Sat Off
            </div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 text-gray-900"
              style={{ fontFamily: "Antonio, sans-serif" }}>
              
              Certificate
            </div>
            <div
              className="text-xs sm:text-sm text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}>
              
              On Completion
            </div>
          </div>
        </div>

        {}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center">
            {}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {}
              <div className="text-left lg:text-right space-y-2 sm:space-y-3 p-4 rounded-xl bg-gray-100 sm:bg-transparent">
                <div className="flex items-center gap-3 lg:flex-row-reverse lg:justify-end">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 63, 37, 0.1)" }}>
                    
                    <Wrench
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: "#e83f25" }} />
                    
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900"
                    style={{ fontFamily: "Antonio, sans-serif" }}>
                    
                    Industry-Ready Skills
                  </h3>
                </div>
                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  
                  Master industry-standard software, tools, and technologies
                  used by top firms.
                </p>
              </div>

              {}
              <div className="text-left lg:text-right space-y-2 sm:space-y-3 p-4 rounded-xl bg-gray-100 sm:bg-transparent">
                <div className="flex items-center gap-3 lg:flex-row-reverse lg:justify-end">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 63, 37, 0.1)" }}>
                    
                    <Target
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: "#e83f25" }} />
                    
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900"
                    style={{ fontFamily: "Antonio, sans-serif" }}>
                    
                    Personality Development
                  </h3>
                </div>
                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  
                  1:1 communication & confidence coaching, LinkedIn building,
                  and interview prep.
                </p>
              </div>
            </div>

            {}
            <div className="flex justify-center">
              <div className="min-w-[320px] min-h-[320px] sm:min-w-[400px] sm:min-h-[400px] md:min-w-[500px] md:min-h-[500px]">
                <img
                  src="/pt-3.png"
                  alt="Professional Training Education"
                  className="w-full h-full max-w-full max-h-full object-contain" />
                
              </div>
            </div>

            {}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {}
              <div className="text-left space-y-2 sm:space-y-3 p-4 rounded-xl bg-gray-100 sm:bg-transparent">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 63, 37, 0.1)" }}>
                    
                    <Briefcase
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: "#e83f25" }} />
                    
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900"
                    style={{ fontFamily: "Antonio, sans-serif" }}>
                    
                    Real Internship Experience
                  </h3>
                </div>
                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  
                  Work on real industry projects with mentor guidance and actual
                  professional documentation.
                </p>
              </div>

              {}
              <div className="text-left space-y-2 sm:space-y-3 p-4 rounded-xl bg-gray-100 sm:bg-transparent">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 63, 37, 0.1)" }}>
                    
                    <FileText
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: "#e83f25" }} />
                    
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900"
                    style={{ fontFamily: "Antonio, sans-serif" }}>
                    
                    Complete Portfolio
                  </h3>
                </div>
                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  
                  Graduate with a complete professional portfolio, project
                  deliverables, and a certificate of completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default AboutUs;