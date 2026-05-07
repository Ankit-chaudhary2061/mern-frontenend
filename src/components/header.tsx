'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#326E3B] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3">

        <div className="flex items-center justify-between">

          {/* LEFT - Logo */}
          <div>
            <Image
              src="/image/logo.png"
              alt="tea-garden"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* CENTER - Menu */}
          <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-10 text-white text-[16px]">
            <li className="nav-item">
              <Link href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* RIGHT - Actions */}
          <div className="hidden md:flex items-center gap-6 text-white">

            <button className="relative hover:scale-110 transition">
              <ShoppingCart size={22} />
              {/* Optional cart badge */}
              <span className="absolute -top-2 -right-2 bg-white text-[#326E3B] text-xs px-1 rounded-full">
                2
              </span>
            </button>

            <button className="flex items-center gap-2 hover:text-gray-200 transition">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#326E3B] px-4 pb-4">
          <ul className="flex flex-col gap-4 text-white text-lg">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </li>

            {/* Extra mobile actions */}
            <li className="flex items-center gap-2 pt-2 border-t border-white/20">
              <ShoppingCart size={20} /> Cart
            </li>
            <li className="flex items-center gap-2">
              <LogOut size={20} /> Logout
            </li>
          </ul>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .nav-item {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          color: #e5e7eb;
          transform: scale(1.08);
        }
      `}</style>
    </nav>
  );
};

export default Header;