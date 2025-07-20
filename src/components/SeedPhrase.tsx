import React, { useState } from "react";
import { generateMnemonic } from "bip39";

const SeedPhrase: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  const generateSeed = () => {
    const seed = generateMnemonic(128).split(" ");
    setMnemonic(seed);
  };

  return (
    <div className="mb-10 w-1/2 m-auto">
      <h2 className="text-2xl font-semibold">Seed Phrase</h2>
      <p className="mb-4">Generate a new seed phrase to secure your wallet.</p>
      <button
        onClick={generateSeed}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Seed Phrase
      </button>
      <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
        {mnemonic.map((word, idx) => (
          <span key={idx}>
            {idx + 1}. {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SeedPhrase;
