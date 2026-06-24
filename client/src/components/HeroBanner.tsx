import { useEffect, useState } from "react";

const heroSlides = [
  {
    title: "Find it.",
    description: "Search and discover movies based on your mood, interests, and favorite genres.",
  },
  {
    title: "Rate it.",
    description: "Share your opinion, rate movies, and help the community discover what's worth watching.",
  },
  {
    title: "Talk about it.",
    description: "Read reviews, join discussions, and see what the community thinks.",
  },
];

function HeroBanner({ backdrops }: { backdrops: any[] }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((previousSlide) =>
        previousSlide === heroSlides.length - 1 ? 0 : previousSlide + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
 <section 
  className="max-w-[1500px] mx-auto mb-12 px-12 py-16 rounded-2xl border border-movie-accent shadow-lg text-left bg-cover bg-center transition-all duration-1000"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${backdrops[activeSlide]?.backdrop_path})`
  }}
>
      <h2 className="text-5xl font-bold text-movie-accent mb-4">
        {currentSlide.title}
      </h2>

      <p className="text-movie-text-sec text-lg max-w-md">
        {currentSlide.description}
      </p>

      <div className="mt-8 flex gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full border border-movie-accent cursor-pointer transition-all ${
              activeSlide === index
                ? "bg-movie-accent scale-125"
                : "bg-transparent"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;