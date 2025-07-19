import React, { useState } from "react";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import * as bs58 from "bs58";

interface Wallet {
  index: number;
  pubKey: string;
  privKey: string;
}

const WalletList: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [mnemonic] = useState<string>(() => bip39.generateMnemonic(128));

//   const [mnemonic] = useState<string>(() => generateMnemonic(128));

//   function generateMnemonic(bits: 128 | 256 = 128): string {
//     const bip39 = require("bip39");
//     return bip39.generateMnemonic(bits);
//   }

  const addWallet = () => {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const i = wallets.length;
    const path = `m/44'/501'/${i}'/0'`;
    const derived = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derived);
    const pubKey = bs58.encode(keypair.publicKey);
    const privKey = bs58.encode(keypair.secretKey.slice(0, 32));

    const newWallet: Wallet = {
      index: i,
      pubKey,
      privKey,
    };

    setWallets([...wallets, newWallet]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Wallets</h2>
      <p className="mb-4">Manage your wallets and view their public/private keys.</p>
      <button
        onClick={addWallet}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Wallet
      </button>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Public Key</th>
            <th className="border p-2">Private Key</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr key={wallet.index}>
              <td className="border p-2">{wallet.index}</td>
              <td className="border p-2 break-all">{wallet.pubKey}</td>
              <td className="border p-2 break-all">{wallet.privKey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletList;
