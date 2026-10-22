import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevActiveIndex) => {
      const indexExists = prevActiveIndex === index;
      if (indexExists) {
        return null;
      }
      return index;
    });
  };

  const items = [
  {
    question: "What courses do you offer?",
    answer: "Admissions are open for the Civil Cheatcamp, our 90 day civil engineering bootcamp covering AutoCAD, Revit, project management, quantity surveying and AI in construction. Our AI Engineering bootcamp is launching soon; you can register your interest on its page."
  },
  {
    question: "What is the weekly schedule?",
    answer: "Live classes run Sunday to Thursday, 2 PM to 4 PM IST, followed by a short daily reflection video. Friday and Saturday are off, or available for catch up. You also get weekly coach feedback."
  },
  {
    question: "Is it suitable for beginners?",
    answer: "Yes. The Civil Cheatcamp starts from the basics and is built for engineering students in any year. No prior software experience is needed."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes. When you complete all assignments and deliverables, you receive a Cheat School certificate of completion that you can share on LinkedIn and add to your portfolio."
  }];


  return (
    <section className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-14 md:p-8">
      <h2
        className="text-center text-4xl font-bold text-[#2b2b2b] md:text-left md:text-6xl"
        style={{ fontFamily: 'Antonio, sans-serif' }}>
        
        Frequently Asked Questions
      </h2>
      <div>
        {items.map(({ question, answer }, idx) =>
        <div
          key={idx}
          onClick={() => toggleFaq(idx)}
          className="flex cursor-pointer items-start gap-4 border-b border-gray-300 py-5 last:border-0">
          
            <div className="mt-0.5">
              {idx === activeIndex ?
            <Minus color="#e83f25" /> :

            <Plus color="#e83f25" />
            }
            </div>
            <div>
              <h4
              className="text-lg font-medium"
              style={{ fontFamily: 'Oswald, sans-serif' }}>
              
                {question}
              </h4>
              <div
              className={`${idx === activeIndex ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'} transition-all duration-300`}>
              
                <p
                className="mt-2 overflow-hidden text-left text-gray-700"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                
                  {answer}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

};

export default Faq;