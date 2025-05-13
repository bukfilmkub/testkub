const pool = require('../config/database');
const { encrypt, decrypt } = require('../utils/cryptoUtil');

async function addUser(username, password) {
  const encryptedPassword = encrypt(password);
  const sql = 'INSERT INTO users (username, password, iv) VALUES (?, ?, ?)';
  const [result] = await pool.execute(sql, [username, encryptedPassword.encryptedData, encryptedPassword.iv]);
  return result.insertId;
}

async function getUserByUsername(username) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.execute(sql, [username]);
  if (rows.length === 0) return null;

  const user = rows[0];
  user.password = decrypt(user.password, user.iv); // ถอดรหัสรหัสผ่าน
  return user;
}

async function verifyUser(username, password) {
  const user = await getUserByUsername(username);
  if (!user) return false;

  return user.password === password;
}

module.exports = { addUser, getUserByUsername, verifyUser };