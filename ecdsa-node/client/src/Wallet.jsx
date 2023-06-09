import server from "./server";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
}) {
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

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
