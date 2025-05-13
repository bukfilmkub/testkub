// routes/encryptionRoute.js
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { aes256 } = require("../utils/encryption");
const { GenPass, M, X, V, Y, md5 } = require("../utils/md5");

const key = Buffer.from(process.env.AES_KEY, "utf8");

router.post("/encrypt", async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" });

    const result = await aes256(password);
    return res.json(result);
  } catch (err) {
    console.error("Encryption error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/decrypt", (req, res) => {
  try {
    const { encryptedPassword, iv } = req.body;
    if (!encryptedPassword || !iv) return res.status(400).json({ error: "Encrypted password and IV are required" });

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "base64"));
    let decrypted = decipher.update(encryptedPassword, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return res.json({ decryptedPassword: decrypted });
  } catch (err) {
    console.error("Decryption error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
