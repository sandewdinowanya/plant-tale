const HeroSection = () => {
  return (
    <section className="bg-ivory py-[120px] px-4 relative overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <div className="uppercase tracking-[3px] text-primary mb-4 font-secondary">
          Nurture Your Garden
        </div>

        <h1 className="text-[4rem] md:text-[3rem] leading-tight mb-8 font-secondary">
          BLOOM - REAL PASSION
        </h1>

        <div className="w-20 h-[1px] bg-primary my-8 mx-auto"></div>

        <p className="max-w-[800px] mx-auto mb-12 text-[1.4rem] text-text-light">
          Plant Tale is your intelligent gardening companion powered by AI and weather-aware technology
          helping home gardeners recognize plants, understand their unique needs, and care for them
          effortlessly. Whether you&apos;re a beginner or a seasoned green thumb, Plant Tale guides you with
          personalized tips, photo-based plant identification, and timely reminders to keep your garden
          blooming beautifully all year round.
        </p>

        <button className="inline-block px-8 py-3 border border-primary bg-transparent text-primary uppercase tracking-[2px] text-sm transition-all duration-300 hover:bg-primary hover:text-white">
          VIEW MORE
        </button>
      </div>

      <div className="absolute left-[5%] top-[20%] h-[60%] opacity-20 z-[1]"></div>
      <div className="absolute right-[5%] top-[20%] h-[60%] opacity-20 z-[1]"></div>
    </section>
  );
};

export default HeroSection;
