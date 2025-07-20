import React, { useState } from "react";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import * as bs58 from "bs58";

interface Wallet {
  index: number;
  pubKey: string;
  privKey: string;
  secretKey: string;
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
    const secretKey = bs58.encode(keypair.secretKey);

    const newWallet: Wallet = {
      index: i,
      pubKey,
      privKey,
      secretKey,
    };

    setWallets([...wallets, newWallet]);
  };

  return (
    <div className="mb-10 w-1/2 m-auto">
      <h2 className="text-2xl font-semibold">Wallets</h2>
      <p className="mb-4">
        Manage your wallets and view their public/private keys.
      </p>
      <button
        onClick={addWallet}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Wallet
      </button>
      <div>
        <div>
        {wallets.map((wallet) => (
          <div className="my-4 p-2 border rounded" key={wallet.index}>
            <h4 className="font-semibold">Wallet {wallet.index + 1}</h4>
            <span className="text-sm text-gray-500">Public Key:</span>
            <p className="border px-2 py-1 mb-1 break-all">{wallet.pubKey}</p>
            <span className="text-sm text-gray-500">Private Key:</span>
            <p className="border px-2 py-1 break-all">{wallet.privKey}</p>
            <span className="text-sm text-gray-500">Secret Key:</span>
            <p className="border px-2 py-1 break-all">{wallet.secretKey}</p>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default WalletList;
