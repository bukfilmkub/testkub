const crypto = require('crypto');

// การตั้งค่าขั้นพื้นฐาน
const algorithm = 'aes-256-cbc'; // อัลกอริทึมสำหรับการเข้ารหัส/ถอดรหัส
const key = crypto.randomBytes(32); // คีย์ 32-byte สำหรับการเข้ารหัส
const iv = crypto.randomBytes(16); // ค่าเริ่มต้น (Initialization Vector)

// ฟังก์ชันสำหรับเข้ารหัสข้อมูล
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex'), key: key.toString('hex') };
}

// ฟังก์ชันสำหรับถอดรหัสข้อมูล
function decrypt(encryptedData, iv, key) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// ตัวอย่างการใช้งาน
const plaintext = "Hello, this is a secret message!";
console.log("Plaintext:", plaintext);

// เข้ารหัสข้อมูล
const encrypted = encrypt(plaintext);
console.log("Encrypted Data:", encrypted.encryptedData);

// ถอดรหัสข้อมูล
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv, encrypted.key);
console.log("Decrypted Data:", decrypted);