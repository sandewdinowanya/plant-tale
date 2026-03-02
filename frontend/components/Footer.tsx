
const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col">
            <div className="text-[31px] text-primary tracking-wide font-secondary mb-6">
              Plant Tale
            </div>
            <p className="text-[18px] text-text-light leading-relaxed">
              Plant Tale is a smart flower care companion that helps you identify plants,
              provides personalized care instructions, and sends timely reminders to keep
              your plants thriving and beautiful.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-[21px] mb-6 uppercase tracking-[2px] text-text-dark">
              Quick Links
            </h3>
            <ul className="list-none flex flex-col gap-3">
              {['Home', 'Features', 'Services', 'About'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[18px] text-text-light transition-all duration-300 hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h3 className="text-[21px] mb-6 uppercase tracking-[2px] text-text-dark">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center text-[18px] text-text-light">
                <span className="mr-2.5 text-primary">📧</span>
                <span>info@bloombuddy.com</span>
              </div>
              <div className="flex items-center text-[18px] text-text-light">
                <span className="mr-2.5 text-primary">📱</span>
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center text-[18px] text-text-light">
                <span className="mr-2.5 text-primary">📍</span>
                <span>123 Garden St, Plant City</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {['f', 't', 'in', 'ig'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-primary border border-primary transition-all duration-300 hover:bg-primary hover:text-white text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 text-center">
          <p className="text-[16px] text-text-light">
            © {new Date().getFullYear()} BloomBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
