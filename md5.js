// utils/md5.js
const crypto = require("crypto");

function md5(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// สมมุติว่าฟังก์ชัน Y, X, V, M คือการใช้ md5 หลายรอบ
function GenPass(password) {
  return md5(md5(password));
}
function Y(password) {
  return md5(password + "Y");
}
function X(password) {
  return md5("X" + password);
}
function V(password) {
  return md5("V" + password);
}
function M(password) {
  return md5(password + "M");
}

module.exports = { GenPass, M, X, V, Y, md5 };
