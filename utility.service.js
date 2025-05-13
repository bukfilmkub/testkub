const utilityService = require("../services/utility.service");

// ตัวอย่างการใช้งาน
app.get("/test-sql", async (req, res) => {
  try {
    const result = await utilityService.testSQL(req.query.token);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});