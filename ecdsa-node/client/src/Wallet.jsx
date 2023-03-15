import { useState } from "react";
import server from "./server";

function Wallet({
  address,
  setAddress,
  setPrivateKey,
  balance,
  setBalance,
}) {
  const [privateKeyText, setPrivateKeyText] = useState();
  const [showPrivateKeyInput, setShowPrivateKeyInput] = useState(false);

  async function onAddressChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function onPrivateKeyChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKeyText(privateKey);
  }

  function onConfirm() {
    setPrivateKeyText("");
    setPrivateKey(privateKeyText);
    setShowPrivateKeyInput(false);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onAddressChange}
        ></input>
      </label>

      {showPrivateKeyInput ? (
        <label>
          Wallet Private Key
          <div>
            <input
              className="key"
              placeholder="Enter your private key"
              value={privateKeyText}
              onChange={onPrivateKeyChange}
            ></input>
            <div className="button" onClick={() => onConfirm()}>Confirm</div>
          </div>
        </label>
      ) : (
        <div className="button" onClick={() => setShowPrivateKeyInput(true)}>Enter Private Key</div>
      )}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
