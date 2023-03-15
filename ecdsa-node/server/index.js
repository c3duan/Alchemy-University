const express = require("express");
const cors = require("cors");
const crypto = require("./crypto");

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "B751181881B238BC03AFF2F05238523E5153CE7C": 100,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { sender, recipient, amount } = message;

  try {
    const pubKey = crypto.signatureToPubKey(message, signature);
    const signSender = crypto.pubKeyToAddress(pubKey);

    if (sender != signSender) {
      res.status(401).send({ message: "Invalid signature!"});
      return;
    }
  } catch (ex) {
    res.status(401).send({ message: "Bad formatted signature!"});
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
