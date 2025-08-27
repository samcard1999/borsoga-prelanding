import React from "react";

const Header = () => {
  return (
    <header className="z-40 flex flex-col px-4 gap-2 items-start w-full">
      <img
        src="assets/logo_full1.svg"
        alt="Borsoga Logo"
        className="h-auto w-64"
      />
      <div className="w-full h-auto grid grid-cols-3 items-center border-t border-b border-white leading-8 text-sm">
        <h2 className="justify-self-start">Visualization</h2>
        <h2 className="justify-self-center">Programming</h2>
        <h2 className="justify-self-end">Graphic Design</h2>
      </div>
    </header>
  );
};

export default Header;
