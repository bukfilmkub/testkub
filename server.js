require("dotenv").config();
const express = require("express");
const app = express();
const encryptionRoute = require("./routes/encryptionRoute");

app.use(express.json());
app.use("/api", encryptionRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
