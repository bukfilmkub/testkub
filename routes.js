const controllerMember = require('../controllers/backend.controller');

module.exports = (app) => {
    // เส้นทาง GET สำหรับดึงยอดเงินคงเหลือ
    app.get('/balance', controllerMember.balanceKBANK);

    // เส้นทาง GET สำหรับดึงกิจกรรมทั้งหมด
    app.get('/activities', controllerMember.activitiesKBANK);

    // เส้นทาง GET สำหรับดึงรายละเอียดของกิจกรรมเฉพาะ
    app.get('/activity-detail/:rqUid', validateRequestId, controllerMember.activitiesDetailKBANK);

    // เส้นทาง GET สำหรับดึงรายการข้อมูลของธนาคาร
    app.get('/bank-info-list', controllerMember.bankInfoListKBANK);

    // เส้นทาง POST สำหรับการตรวจสอบข้อมูลก่อนโอนเงิน
    app.post('/inquire-for-transfer-money', validateTransferRequest, controllerMember.inquireForTransferMoney);

    // เส้นทาง POST สำหรับการโอนเงิน
    app.post('/transfer-money/:kbankInternalSessionId', validateSessionId, controllerMember.transferMoney);
};

// Middleware: ตรวจสอบความถูกต้องของ rqUid
function validateRequestId(req, res, next) {
    const { rqUid } = req.params;
    if (!rqUid || typeof rqUid !== 'string') {
        return res.status(400).json({ error: 'Invalid request ID' });
    }
    next();
}

// Middleware: ตรวจสอบความถูกต้องของข้อมูลการโอนเงิน
function validateTransferRequest(req, res, next) {
    const { amount, recipientAccount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }
    if (!recipientAccount || typeof recipientAccount !== 'string') {
        return res.status(400).json({ error: 'Invalid recipient account' });
    }
    next();
}

// Middleware: ตรวจสอบความถูกต้องของ kbankInternalSessionId
function validateSessionId(req, res, next) {
    const { kbankInternalSessionId } = req.params;
    if (!kbankInternalSessionId || typeof kbankInternalSessionId !== 'string') {
        return res.status(400).json({ error: 'Invalid session ID' });
    }
    next();
}