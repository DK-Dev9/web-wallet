import { useRef, useState } from "react";
import nacl from "tweetnacl";
import * as bs58 from "bs58";

const Transaction = () => {
    const msg = useRef<HTMLInputElement>(null)
    const key = useRef<HTMLInputElement>(null)
    const publicKey = useRef<HTMLInputElement>(null)
  const [signedMsg, setSignedMsg] = useState("");

    const handleSignMessage = () => {
              const privateKeyBase58 = key.current?.value || "";

        // Logic to sign the message
        console.log("Message signed");
        console.log("Message:", msg.current?.value);
        console.log("Private Key:", key.current?.value);

            // 3. Sign the message
    const messageUint8 = new TextEncoder().encode(msg.current?.value || "");
          // 2. Decode private key from Base58 to Uint8Array
      const secretKeyUint8 = bs58.decode(privateKeyBase58); // should be 64 bytes for nacl

    const signature = nacl.sign.detached(messageUint8, secretKeyUint8);

    // 4. Convert signature to base58 for readability
    const signatureBase58 = bs58.encode(signature);
    setSignedMsg(signatureBase58);

    };

    const handleVerifyMessage = () => {
        const messageUint8 = new TextEncoder().encode(msg.current?.value || "");
        const signatureUint8 = bs58.decode(signedMsg || "");
        const publicKeyUint8 = bs58.decode(publicKey.current?.value || "");
        const res = nacl.sign.detached.verify(messageUint8, signatureUint8, publicKeyUint8);
        console.log("Message verified: ", res);
        if (res) {
            alert("Message verified successfully!");
        } else {
            alert("Message verification failed.");
        }
    }

  return (
    <div className="w-1/2 m-auto">
      <h2 className="text-2xl font-semibold">Transaction</h2>
      <p className="mb-4">This section will handle transactions.</p>
      <div>
        <span className="text-sm text-gray-500">Message to sign and send:</span>
        <input type="text" ref={msg} placeholder="Enter Transaction Message" className="border p-2 w-full mb-4" />
        <span className="text-sm text-gray-500">Secret Key:</span>
        <input type="text" ref={key} placeholder="Enter Sender Private key" className="border p-2 w-full mb-4" />
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {handleSignMessage()}}>Sign Message</button>
        <br/><span className="text-sm text-gray-500">Signed Message:</span>
        <input type="text" value={signedMsg} placeholder="Enter Signed Message" className="border p-2 w-full mb-4" />
        <span className="text-sm text-gray-500">Public Key to Verify:</span>
        <input type="text" ref={publicKey} placeholder="Enter Sender Public key" className="border p-2 w-full mb-4" />
        <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => {handleVerifyMessage()}}>Verify Message</button>
      </div>
    </div>
  )
}

export default Transaction
