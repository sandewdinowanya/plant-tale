import Image from 'next/image';

interface Feature {
  num: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { num: '01', title: 'AI Plant Recognition', desc: "Instantly identify any plant species by simply taking a photo with your device's camera" },
  { num: '02', title: 'Personalized Care Plans', desc: "Get tailored care instructions unique to each plant's species and your local environment" },
  { num: '03', title: 'Weather Integration', desc: 'Our system adapts care recommendations based on real-time local weather conditions' },
  { num: '04', title: 'Care Reminders', desc: 'Receive timely notifications when your plants need watering, fertilizing, or other care' },
  { num: '05', title: 'Plant Health Monitoring', desc: "Track your plants' growth and health over time with visual progress charts" },
  { num: '06', title: 'Community Garden', desc: 'Connect with fellow plant enthusiasts to share tips, success stories, and advice' },
];

const Features = () => {
  return (
    <div id="features" className="bg-ivory py-[100px] px-5">
      {/* Header */}
      <div className="text-center max-w-[800px] mx-auto mb-16">
        <h2 className="text-[36px] text-text-dark mb-5">Key Features</h2>
        <div className="h-[3px] w-20 bg-primary mx-auto mb-5"></div>
        <p className="text-[18px] text-text-light leading-relaxed">
          Discover how Plant Tale can transform your gardening experience with these powerful features
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-[1200px] mx-auto gap-16">
        {/* Image */}
        <div className="flex-1 flex justify-center items-center w-full max-w-[500px] mx-auto lg:mx-0">
          <Image
            src="/assets/plantcare.avif"
            alt="Plant Tale App"
            width={400}
            height={400}
            className="rounded-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Feature list */}
        <div className="flex-1 flex flex-col gap-8">
          {features.map((f) => (
            <div
              key={f.num}
              className="flex items-start gap-5 transition-transform duration-300 hover:translate-x-2.5"
            >
              <div className="text-[24px] font-bold text-primary opacity-80 leading-none min-w-[40px]">
                {f.num}
              </div>
              <div>
                <h3 className="text-[20px] text-text-dark mb-2">{f.title}</h3>
                <p className="text-[16px] text-text-light leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
