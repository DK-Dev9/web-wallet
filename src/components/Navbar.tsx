import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-between items-center w-1/2 m-auto">
        <h1 className="text-xl font-bold">Web3 Learning Wallet</h1>
        <ul className="flex gap-6">
          <li><a href="#">Transaction</a></li>
          <li><a href="#">Wallet</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
