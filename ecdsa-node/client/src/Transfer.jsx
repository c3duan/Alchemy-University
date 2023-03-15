import { useState } from "react";
import Key from "./Key";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState({});
  const [showKey, setShowKey] = useState(false);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  function transfer(evt) {
    evt.preventDefault();
    setMessage({
      sender: address,
      recipient,
      amount: parseInt(sendAmount),
    });
    setShowKey(true);
  }

  return (
    <div>
      <form className="container transfer" onSubmit={transfer}>
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>

        <input type="submit" className="button" value="Transfer" />
      </form>
      <Key
        message={message}
        setBalance={setBalance}
        show={showKey}
        close={() => setShowKey(false)}
      />
    </div>
  );
}

export default Transfer;
