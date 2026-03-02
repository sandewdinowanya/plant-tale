'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 z-[2000] bg-white border-b border-primary/10 py-6">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/assets/logo.png" alt="logo" width={120} height={120} />
          </Link>
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden flex flex-col justify-between w-[30px] h-[21px] cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="h-[3px] w-full bg-primary rounded-[10px]"></span>
          <span className="h-[3px] w-full bg-primary rounded-[10px]"></span>
          <span className="h-[3px] w-full bg-primary rounded-[10px]"></span>
        </div>

        {/* Nav links */}
        <div
          className={`
            ${menuOpen ? 'flex' : 'hidden'}
            md:flex flex-col md:flex-row items-center
            absolute md:static top-[80px] left-0 right-0
            bg-white md:bg-transparent
            shadow-lg md:shadow-none
            py-4 md:py-0
            z-50
          `}
        >
          <Link href="/" className="mx-5 py-2 text-text-dark tracking-wide transition-all duration-300 hover:text-primary relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a href="#services" className="mx-5 py-2 text-text-dark tracking-wide transition-all duration-300 hover:text-primary relative group">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#features" className="mx-5 py-2 text-text-dark tracking-wide transition-all duration-300 hover:text-primary relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 md:mt-0 md:ml-6 flex-col md:flex-row w-4/5 md:w-auto">
            <Link
              href="/login"
              className="border border-primary text-primary bg-transparent px-6 py-2 tracking-wide transition-all duration-300 hover:bg-primary hover:text-white text-center"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="border border-primary bg-primary text-white px-6 py-2 tracking-wide transition-all duration-300 hover:bg-transparent hover:text-primary text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
