import React from "react";
import Navbar from "./components/Navbar.tsx";
import SeedPhrase from "./components/SeedPhrase.tsx";
import WalletList from "./components/WalletList.tsx";
import Transaction from "./components/Transaction.tsx";
import './App.css'


const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <SeedPhrase />
        <WalletList />
        <Transaction />
      </main>
    </div>
  );
};

export default App;
