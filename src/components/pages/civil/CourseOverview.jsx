import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Target,
  Play,
  ArrowRight,
  Sparkles,
  Video,
  TrendingUp,
  FileText,
  Award } from
"lucide-react";
import { GOOGLE_FORM_URL, NEXT_BATCH_DATE } from "@/config/site";

const CourseOverview = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
  {
    icon: Calendar,
    number: "90",
    unit: "DAYS",
    title: "Intensive Program",
    description: "Sunday to Thursday structured learning path",
    gradient: "from-primary to-red-600"
  },
  {
    icon: Clock,
    number: "2-4",
    unit: "PM",
    title: "Daily Classes",
    description: "Live sessions, 2 PM to 4 PM IST",
    gradient: "from-secondary to-gray-800"
  },
  {
    icon: Target,
    number: "3",
    unit: "DELIVERABLES",
    title: "Real Projects",
    description: "Videos, Social Media, Internship portfolio",
    gradient: "from-primary to-orange-600"
  }];


  return (
    <section className="py-32 mt-2 bg-background relative overflow-hidden">
      {}
      <div className="absolute top-10 right-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/30 rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6">
        {}
        <div className="flex flex-col lg:flex-row items-start gap-12 mb-24">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-primary"></div>
              <span className="font-secondary text-sm uppercase tracking-widest text-primary">
                90-Day Transformation
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-primary font-bold leading-tight mb-6">
              Civil
              <br />
              <span className="relative">
                <span className="text-primary">Cheatcamp</span>
                <Sparkles className="absolute -top-4 -right-8 w-6 h-6 text-primary/60" />
              </span>
            </h1>

            <p className="text-xl text-muted-foreground font-secondary leading-relaxed max-w-2xl">
              Go from absolute beginner to job-ready civil engineer through our
              project-intensive 90-day program. No fluff, just real skills.
            </p>
          </div>

          {}
          <div className="w-full md:w-full lg:w-1/3">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-500">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-primary text-2xl font-bold">
                    Next Batch
                  </span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-muted-foreground font-secondary">
                  {NEXT_BATCH_DATE ? `Starts ${NEXT_BATCH_DATE}` : "Admissions open"}
                </p>
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  <button className="w-full cursor-pointer bg-primary text-white py-4 rounded-xl font-primary font-bold hover:bg-[#d63620] transition-colors duration-300 flex items-center justify-center gap-2 group">
                    Join the Course Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) =>
          <div
            key={index}
            className="group cursor-pointer"
            onMouseEnter={() => setActiveFeature(index)}
            onClick={() => setActiveFeature(index)}>
            
              <div
              className={`relative bg-card border rounded-2xl p-8 transition-all duration-500 ${
              activeFeature === index ?
              "border-primary shadow-lg scale-105" :
              "border-border hover:border-primary/50"}`
              }>
              
                {}
                <div
                className={`text-6xl font-primary font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-4`}>
                
                  {feature.number}
                </div>

                {}
                <div className="font-primary text-lg font-semibold text-foreground mb-2">
                  {feature.unit}
                </div>

                {}
                <h3 className="font-primary text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                {}
                <p className="text-muted-foreground font-secondary leading-relaxed">
                  {feature.description}
                </p>

                {}
                {activeFeature === index &&
              <div className="absolute bottom-6 left-8 w-4 h-0.5 bg-primary rounded-full"></div>
              }
              </div>
            </div>
          )}
        </div>

        {}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-primary font-bold mb-3">
              How It <span className="text-primary">Works</span>
            </h2>
            <div className="w-16 h-0.5 bg-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-primary text-xl font-bold">Schedule</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly rhythm & routine
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                { day: "Sun to Thu", time: "2 to 4 PM IST", activity: "Live Classes" },
                {
                  day: "Daily",
                  time: "4 to 5 PM IST",
                  activity: "Reflection Videos"
                },
                {
                  day: "Weekly",
                  time: "Coach Sessions",
                  activity: "Personal Feedback"
                }].
                map((item, index) =>
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  
                    <div>
                      <div className="font-primary font-semibold">
                        {item.day}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {item.activity}
                      </div>
                    </div>
                    <div className="text-primary font-secondary font-semibold bg-primary/10 px-3 py-1 rounded-md text-xs sm:text-sm md:text-base whitespace-nowrap">
                      {item.time}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-primary text-xl font-bold">
                    Deliverables
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    What you'll submit
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                {
                  item: "Daily 1-min reflection videos",
                  icon: Video
                },
                {
                  item: "Weekly LinkedIn/Twitter updates",
                  icon: TrendingUp
                },
                {
                  item: "Month 3 internship documentation",
                  icon: FileText
                },
                {
                  item: "Final professional portfolio",
                  icon: Award
                }].
                map((item, index) =>
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-secondary text-sm text-foreground">
                      {item.item}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default CourseOverview;