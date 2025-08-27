import React from "react";

const Footer = () => {
  return (
    <footer className="z-10 flex flex-col  h-auto px-4 items-start w-full">
      <div className="border-t border-white  flex   justify-between items-end w-full py-2">
        <span className="text-2xl leading-6">
          <h2 className="font-thin">Contact</h2>
          <h2 className="font-semibold">Now</h2>
        </span>
        <img src="assets/arrow.svg" alt="arrow" className="w-6 h-auto pb-1" />
      </div>
      <div className="flex justify-between w-full border-t border-b border-white py-1">
        <h2 className="font-semibold">Based in Miami</h2>
        <h2 className="font-light">
          Our site is <span className="italic font-semibold">coming soon!</span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
