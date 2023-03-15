import "./App.scss";
import { useState } from "react";
import Wallet from "./Wallet";
import Transfer from "./Transfer";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer address={address} setBalance={setBalance} />
    </div>
  );
}

export default App;
