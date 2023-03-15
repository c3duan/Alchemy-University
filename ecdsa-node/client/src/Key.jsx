import { useState } from "react";
import server from "./server";
import crypto from "./crypto";

function Key({ message, setBalance, show, close }) {
  const [privateKey, setPrivateKey] = useState("");

  async function confirmTransfer() {
    // build the transaction payload composed of
    // the message itself (amount to transfer and recipient) and
    // the signature of the transaction build from the user private key
    // and the message, inside the wallet.
    if (!privateKey) {
      return;
    }
    
    const signature = await crypto.sign(privateKey, message);
    const transaction = {
      message,
      signature,
    };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
      alert("Success!");
    } catch (ex) {
      alert(ex.response.data.message);
    }

    setPrivateKey("");
    close();
  }

  return show ? (
    <div class="container modal">
      <h2>Confirm Transfer</h2>
      <label class="content">
        Wallet Private Key
        <div>
          <input
            className="key"
            placeholder="Enter your private key"
            value={privateKey}
            onChange={(evt) => setPrivateKey(evt.target.value)}
          ></input>
        </div>
      </label>
      <div class="actions">
        <div className="button" onClick={close}>
          Cancel
        </div>
        <div className="button" onClick={confirmTransfer}>
          Confirm
        </div>
      </div>
    </div>
  ) : null;
}

export default Key;
