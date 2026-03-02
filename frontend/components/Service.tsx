import Image from 'next/image';

const Service = () => {
  return (
    <div id="services" className="bg-ivory py-20 px-5">
      {/* Header */}
      <div className="text-center max-w-[800px] mx-auto mb-16">
        <h2 className="text-[38px] text-text-dark mb-5">Our Services</h2>
        <div className="h-[3px] w-20 bg-primary mx-auto mb-5"></div>
        <p className="text-[20px] text-text-light leading-relaxed">
          Plant Tale helps you care for your plants with personalized recommendations and timely reminders.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
        {/* Card 1 */}
        <div className="bg-white rounded-lg p-10 shadow-sm text-center transition-all duration-300 hover:-translate-y-2.5 hover:shadow-md">
          <div className="w-[70px] h-[70px] mx-auto mb-6 flex items-center justify-center">
            <Image src="/assets/plant-recognition.png" alt="plant recognition" width={70} height={70} className="max-w-full max-h-full" />
          </div>
          <h3 className="text-[20px] text-text-dark mb-4 tracking-wide font-semibold">PLANT RECOGNITION</h3>
          <div className="h-[2px] w-[50px] bg-primary mx-auto mb-5"></div>
          <p className="text-[18px] text-text-light leading-relaxed">
            Identify any plant instantly with our AI-powered plant recognition technology.
            Just upload a photo and receive accurate identification.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg p-10 shadow-sm text-center transition-all duration-300 hover:-translate-y-2.5 hover:shadow-md">
          <div className="w-[70px] h-[70px] mx-auto mb-6 flex items-center justify-center">
            <Image src="/assets/care-instructions.jpg" alt="care instruction" width={70} height={70} className="max-w-full max-h-full" />
          </div>
          <h3 className="text-[20px] text-text-dark mb-4 tracking-wide font-semibold">CARE INSTRUCTIONS</h3>
          <div className="h-[2px] w-[50px] bg-primary mx-auto mb-5"></div>
          <p className="text-[18px] text-text-light leading-relaxed">
            Get personalized care advice for each of your plants, including watering schedules,
            sunlight requirements, and soil recommendations.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg p-10 shadow-sm text-center transition-all duration-300 hover:-translate-y-2.5 hover:shadow-md">
          <div className="w-[70px] h-[70px] mx-auto mb-6 flex items-center justify-center">
            <Image src="/assets/smart-reminders.png" alt="Smart Reminders" width={70} height={70} className="max-w-full max-h-full" />
          </div>
          <h3 className="text-[20px] text-text-dark mb-4 tracking-wide font-semibold">SMART REMINDERS</h3>
          <div className="h-[2px] w-[50px] bg-primary mx-auto mb-5"></div>
          <p className="text-[18px] text-text-light leading-relaxed">
            Never forget to water your plants again. Receive timely notifications
            customized to each plant&apos;s specific needs.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg p-10 shadow-sm text-center transition-all duration-300 hover:-translate-y-2.5 hover:shadow-md">
          <div className="w-[70px] h-[70px] mx-auto mb-6 flex items-center justify-center">
            <Image src="/assets/whether-integration.png" alt="Weather Integration" width={70} height={70} className="max-w-full max-h-full" />
          </div>
          <h3 className="text-[20px] text-text-dark mb-4 tracking-wide font-semibold">WEATHER INTEGRATION</h3>
          <div className="h-[2px] w-[50px] bg-primary mx-auto mb-5"></div>
          <p className="text-[18px] text-text-light leading-relaxed">
            Our app uses local weather data to adjust care recommendations,
            ensuring your plants get exactly what they need in any climate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
