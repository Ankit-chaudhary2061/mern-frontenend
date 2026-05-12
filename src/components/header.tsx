'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingCart, LogOut, LogIn } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hook';
import { logoutUser } from '@/src/lib/store/auth/auth-slice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);
  const { items } = useAppSelector((store) => store.cart);

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

           <Link
  href="/cart"
  className="relative hover:scale-110 transition"
>
  <ShoppingCart size={22} />

  {items.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-white text-[#326E3B] text-xs px-1 rounded-full">
      {items.length}
    </span>
  )}
</Link>

            {user ? (
              <button 
                onClick={() => dispatch(logoutUser())}
                className="flex items-center gap-2 hover:text-gray-200 transition"
              >
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
            ) : (
              <Link 
                href="/login"
                className="flex items-center gap-2 hover:text-gray-200 transition"
              >
                <LogIn size={20} />
                <span className="text-sm">Login</span>
              </Link>
            )}

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
            {user ? (
              <li className="flex items-center gap-2">
                <LogOut size={20} /> 
                <button onClick={() => dispatch(logoutUser())}>Logout</button>
              </li>
            ) : (
              <li className="flex items-center gap-2">
                <LogIn size={20} /> 
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
            )}
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