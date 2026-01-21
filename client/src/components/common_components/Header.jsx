import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-primary text-dark">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-extrabold">
          <span className="text-accent">FORTUNE</span>
          <br />
          <span className="text-xs tracking-wider">ROOFING & SOLAR</span>
        </h1>
      </div>

      {/* Menu Items */}
      <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Services ▾</li>
        <li className="cursor-pointer">Roofing ▾</li>
        <li className="cursor-pointer">Gallery</li>
        <li className="cursor-pointer">Reviews</li>
        <li className="cursor-pointer">FAQ</li>
        <li className="cursor-pointer">Instant Quote</li>
        <li className="cursor-pointer">Contact</li>
      </ul>

      {/* CTA Buttons */}
      <div className="flex space-x-2">
        <button className="bg-accent text-white px-4 py-2 rounded-md text-sm font-semibold">
          Request Free Estimate
        </button>
        <button className="bg-accent text-white px-4 py-2 rounded-md text-sm font-semibold">
          386-301-9766
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
