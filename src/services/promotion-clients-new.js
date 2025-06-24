/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PromoteQueue.ts":
/*!*****************************!*\
  !*** ./src/PromoteQueue.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromoteQueue = void 0;
class PromoteQueue {
    constructor() {
        this.items = [];
        this.maxSize = 10;
        this.pushCount = new Map();
    }
    static getInstance() {
        if (!PromoteQueue.instance) {
            PromoteQueue.instance = new PromoteQueue();
        }
        while (PromoteQueue.instance.items.length >= PromoteQueue.instance.maxSize) {
            PromoteQueue.instance.items.shift();
        }
        return PromoteQueue.instance;
    }
    push(item) {
        // Remove items older than 1 hour from the pushCount map
        const now = Date.now();
        this.pushCount.forEach((data, key) => {
            if (now - data.timestamp > 60 * 60 * 1000) { // 1 hour = 60 minutes * 60 seconds * 1000 ms
                this.pushCount.delete(key);
            }
        });
        // Proceed with the normal push operation
        while (this.items.length >= this.maxSize) {
            this.items.shift();
        }
        this.items.push(item);
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.pop();
        }, 100000);
        // Update push count with timestamp
        if (this.pushCount.has(item)) {
            const existingData = this.pushCount.get(item);
            existingData.count += 1;
            existingData.timestamp = now; // Update timestamp to current time
        }
        else {
            this.pushCount.set(item, { count: 1, timestamp: now });
        }
    }
    clear() {
        this.items = [];
        this.pushCount.clear();
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
    getSentCount(item) {
        // Retrieve the count for the item within the last hour
        const data = this.pushCount.get(item);
        if (data && Date.now() - data.timestamp <= 60 * 60 * 1000) {
            return data.count;
        }
        else {
            return 0;
        }
    }
}
exports.PromoteQueue = PromoteQueue;


/***/ }),

/***/ "./src/Promotions.ts":
/*!***************************!*\
  !*** ./src/Promotions.ts ***!
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
exports.Promotion = void 0;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const express_1 = __webpack_require__(/*! ./express */ "./src/express.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const messages_1 = __webpack_require__(/*! ./messages */ "./src/messages.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/fetchWithTimeout.ts");
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const fs = __importStar(__webpack_require__(/*! fs/promises */ "fs/promises"));
const PromoteQueue_1 = __webpack_require__(/*! ./PromoteQueue */ "./src/PromoteQueue.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
class Promotion {
    constructor(client, clientDetails) {
        this.promotionResults = new Map();
        this.daysLeft = -1;
        this.sleepTime = 0;
        this.successCount = 0;
        this.failedCount = 0;
        this.releaseTime = 0;
        this.tempFailCount = 0;
        this.lastMessageTime = Date.now() - 16 * 60 * 1000;
        this.lastCheckedTime = 0;
        this.channels = [];
        this.messageQueue = [];
        this.messageCheckDelay = 10000;
        this.promoteMsgs = {};
        this.isPromoting = false;
        this.messageCount = 0;
        this.converted = 0;
        this.MAX_QUEUE_SIZE = 1000;
        this.MAX_RESULTS_SIZE = 5000;
        this.clientDetails = clientDetails;
        this.client = client;
        console.log(clientDetails.mobile, ": Promotion Instance created");
        this.messageQueueInterval = setInterval(() => this.checkQueuedMessages(), this.messageCheckDelay);
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        db.getPromoteMsgs().then((data) => {
            this.promoteMsgs = data;
        });
        this.importResultsFromJson();
        this.startPromotion();
        setTimeout(() => {
            this.checktghealth();
        }, 300000);
    }
    cleanup() {
        // Clear the message queue interval
        if (this.messageQueueInterval) {
            clearInterval(this.messageQueueInterval);
        }
        // Clear any pending timeouts
        if (this.client) {
            this.client.destroy();
            this.client = null;
        }
        // Clear collections
        this.messageQueue = [];
        this.channels = [];
        this.promotionResults.clear();
        // Save state before cleanup
        this.saveResultsToJson().catch(err => console.error('Failed to save results during cleanup:', err));
    }
    setDaysLeft(daysLeft) {
        this.daysLeft = daysLeft;
        if (daysLeft < 0) {
            this.resetPromotionResults();
        }
    }
    incrementMsgCount() {
        this.messageCount++;
    }
    incrementConvertedCount() {
        this.converted++;
    }
    resetMobileStats() {
        console.log("Resetting Mobile Stats...!!");
        this.setMobileStats({
            successCount: 0,
            failedCount: 0,
            sleepTime: 0,
            releaseTime: 0,
            lastMessageTime: this.lastMessageTime || Date.now() - 16 * 60 * 1000,
            daysLeft: this.daysLeft || -1,
            lastCheckedTime: this.lastCheckedTime || Date.now() - 16 * 60 * 1000,
            messageCount: 0,
            converted: 0
        });
    }
    getBannedChannels() {
        const bannedUserKeys = [];
        this.promotionResults.forEach((value, key) => {
            if (!value.success && value.errorMessage === "USER_BANNED_IN_CHANNEL") {
                bannedUserKeys.push(key);
            }
        });
        return bannedUserKeys;
    }
    resetPromotionResults() {
        console.log("Resetting promotion results...!!");
        this.promotionResults = new Map();
        PromoteQueue_1.PromoteQueue.getInstance().clear();
    }
    checkQueuedMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement queue size limit
            if (this.messageQueue.length > this.MAX_QUEUE_SIZE) {
                console.warn(`Message queue exceeded ${this.MAX_QUEUE_SIZE} items, removing oldest items`);
                this.messageQueue = this.messageQueue.slice(-this.MAX_QUEUE_SIZE);
            }
            const now = Date.now();
            const readyMessages = [];
            // Process messages in batches to avoid memory spikes
            const processMessages = this.messageQueue.slice(0, 100);
            for (const item of processMessages) {
                if ((now - item.timestamp) >= this.messageCheckDelay) {
                    readyMessages.push(item);
                }
            }
            for (const messageItem of readyMessages) {
                try {
                    yield this.checkMessageExist(messageItem);
                }
                catch (error) {
                    console.error(`Error checking message ${messageItem.messageId} in ${messageItem.channelId}:`, error);
                }
            }
            this.messageQueue = this.messageQueue.filter(item => !readyMessages.includes(item));
        });
    }
    fetchDialogs() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const batchSize = 500;
            const channelDataSet = new Set(); // Use Set to avoid duplicates
            let channelDetails = [];
            console.log(`${this.clientDetails.mobile} Fetching dialogs from clients...`);
            try {
                const dialogs = yield this.client.getDialogs({ limit: batchSize });
                for (const dialog of dialogs) {
                    if (dialog.isChannel || dialog.isGroup) {
                        const chatEntity = dialog.entity;
                        if (!chatEntity.broadcast && // Exclude broadcast channels
                            chatEntity.participantsCount > 500 && // Minimum participants
                            !((_a = chatEntity.defaultBannedRights) === null || _a === void 0 ? void 0 : _a.sendMessages) && // Allow messaging
                            !chatEntity.restricted && // Exclude restricted channels
                            chatEntity.id) {
                            const channelId = chatEntity.id.toString().replace(/^-100/, "");
                            if (!channelDataSet.has(channelId)) {
                                // Add to Set to prevent duplicates
                                channelDataSet.add(channelId);
                                channelDetails.push({
                                    channelId,
                                    participantsCount: chatEntity.participantsCount,
                                });
                            }
                        }
                    }
                }
                console.log(`${this.clientDetails.mobile} Days Left: ${this.daysLeft}`);
                if (this.daysLeft < 0) {
                    let bannedChannelsFromPromotions = [];
                    try {
                        const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.promoteRepl}/getbannedchannels`);
                        if (Array.isArray(response.data)) {
                            bannedChannelsFromPromotions = response.data;
                            console.log("INFO", `Fetched ${bannedChannelsFromPromotions.length} banned channels.`);
                        }
                        else {
                            console.log("WARN", "Unexpected data format for banned channels, proceeding without filtering.");
                        }
                    }
                    catch (fetchError) {
                        console.log("ERROR", "Error fetching banned channels:", { error: fetchError });
                    }
                    if (bannedChannelsFromPromotions.length > 150) {
                        channelDetails = channelDetails.filter(channel => !bannedChannelsFromPromotions.includes(channel.channelId));
                        console.log(`${this.clientDetails.mobile} `, `Filtered channels, remaining: ${channelDetails.length}`);
                    }
                    else {
                        console.log(`${this.clientDetails.mobile} `, "Less banned channels retrieved; proceeding with all eligible channels.");
                    }
                }
                else {
                    console.log(`${this.clientDetails.mobile} `, "Filtering channels based on previous results...");
                    channelDetails = channelDetails.filter(channel => {
                        const stats = this.promotionResults.get(channel.channelId) || { success: true, count: 0 };
                        return stats.success;
                    });
                }
                channelDetails.sort((a, b) => b.participantsCount - a.participantsCount);
                console.log(`${this.clientDetails.mobile}  Sorted channels by participants count: ${channelDetails.length}`);
                // Fisher-Yates Shuffle on top channels, up to 350 or the available length
                const topChannels = channelDetails.slice(0, Math.min(350, channelDetails.length));
                for (let i = topChannels.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [topChannels[i], topChannels[j]] = [topChannels[j], topChannels[i]];
                }
                return topChannels.map(channel => channel.channelId);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `Error occurred while fetching dialogs`, true);
                return [];
            }
        });
    }
    checkMessageExist(messageItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.getMessages(messageItem.channelId, { minId: messageItem.messageId - 2 });
                if (result.length > 0 && result[0] && result[0].id === messageItem.messageId) {
                    this.handleExistingMessage(messageItem.channelId, messageItem.messageIndex, result[0].id);
                }
                else {
                    this.handleDeletedMessage(messageItem.channelId, messageItem.messageIndex, messageItem.messageId);
                }
            }
            catch (error) {
                console.error(`Error checking message ${messageItem.messageId} in ${messageItem.channelId}: ${error.message}`);
            }
        });
    }
    sendMessageToChannel(mobile, channelInfo, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.sleepTime < Date.now()) {
                    //console.log(`${mobile} Sending Message: to ${channelInfo.channelId} || @${channelInfo.username}`);
                    const result = yield this.client.sendMessage(channelInfo.username ? `@${channelInfo.username}` : channelInfo.channelId, message);
                    if (result) {
                        // await sendToLogs({ message: `${mobile}:\n@${channelInfo.username} ✅\ntempFailCount:  ${this.tempFailCount}\nLastMsg:  ${((Date.now() - this.lastMessageTime) / 60000).toFixed(2)}mins\nDaysLeft:  ${this.daysLeft}\nChannelIndex: ${this.channelIndex}` });
                        console.log(`${mobile}:\n@${channelInfo.username} ✅\ntempFailCount:  ${this.tempFailCount}\nLastMsg:  ${((Date.now() - this.lastMessageTime) / 60000).toFixed(2)}mins\nDaysLeft:  ${this.daysLeft}\nChannelIndex: ${this.channelIndex}`);
                        this.lastMessageTime = Date.now();
                        yield (0, express_1.updateSuccessCount)(process.env.clientId);
                        PromoteQueue_1.PromoteQueue.getInstance().push(channelInfo.channelId);
                        const stats = this.promotionResults.get(channelInfo.channelId) || { success: true, count: 0 };
                        this.promotionResults.set(channelInfo.channelId, { success: true, count: (stats.count ? stats.count : 0) + 1 });
                        return result;
                    }
                    else {
                        console.error(`Client ${mobile}: Failed to send message to ${channelInfo.channelId} || @${channelInfo.username}`);
                        return undefined;
                    }
                }
                else {
                    // await sendToLogs({ message: `${mobile}:\n@${channelInfo.username} ❌\ntempFailCount:  ${this.tempFailCount}\nLastMsg:  ${((Date.now() - this.lastMessageTime) / 60000).toFixed(2)}mins\nSleeping:  ${(this.sleepTime - Date.now()) / 60000}mins\nDaysLeft:  ${this.daysLeft}\nReason: ${this.failureReason}\nchannelIndex: ${this.channelIndex}`, chatId: process.env.logsChannel2 });
                    console.log(`${mobile}:\n@${channelInfo.username} ❌\ntempFailCount:  ${this.tempFailCount}\nLastMsg:  ${((Date.now() - this.lastMessageTime) / 60000).toFixed(2)}mins\nSleeping:  ${(this.sleepTime - Date.now()) / 60000}mins\nDaysLeft:  ${this.daysLeft}\nReason: ${this.failureReason}\nchannelIndex: ${this.channelIndex}`);
                    console.log(`Client ${mobile}: Sleeping for ${this.sleepTime / 1000} seconds due to rate limit.`);
                    return undefined;
                }
            }
            catch (error) {
                const stats = this.promotionResults.get(channelInfo.channelId) || { success: true, count: 0 };
                yield (0, express_1.updateFailedCount)(process.env.clientId);
                this.promotionResults.set(channelInfo.channelId, { count: stats.count, success: false, errorMessage: error.errorMessage || "UNKNOWN" });
                this.failureReason = error.errorMessage;
                if (error.errorMessage !== 'USER_BANNED_IN_CHANNEL') {
                    console.log(mobile, `Some Error Occured, ${error.errorMessage}`);
                    if (!error.errorMessage) {
                        (0, parseError_1.parseError)(error, "Error sending message to channel", true);
                    }
                }
                if (error instanceof telegram_1.errors.FloodWaitError) {
                    console.log(error);
                    console.warn(`Client ${mobile}: Rate limited. Sleeping for ${error.seconds} seconds.`);
                    this.sleepTime = Date.now() + (error.seconds * 1000);
                    return undefined;
                }
                else {
                    console.error(`Client ${mobile}: Error sending message to ${channelInfo.username}: ${error.errorMessage}`);
                    if (error.errorMessage === "CHANNEL_PRIVATE") {
                        return yield this.handlePrivateChannel(this.client, channelInfo, message, error);
                    }
                    else {
                        return yield this.handleOtherErrors(mobile, channelInfo, message, error);
                    }
                }
            }
        });
    }
    restartPromotion() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Restarting Promotion...");
            this.checktghealth(true);
            yield (0, utils_1.sleep)(3000);
            this.channelIndex = 0;
            this.channels = yield this.fetchDialogs();
            this.startPromotion();
        });
    }
    startPromotion() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("promotion triggered...............");
            // this.startPromoteCount++;
            // if (this.startPromoteCount > 10 && this.lastMessageTime < Date.now() - 25 * 60 * 1000) {
            //     await fetchWithTimeout(`${ppplbot()}&text=@${(process.env.clientId).toUpperCase()}: Promotion HARD STOPPED.`);
            //     this.isPromoting = false;
            //     this.startPromoteCount = 0;
            //     this.lastMessageTime = Date.now();
            //     if (this.lastMessageTime < Date.now() - 30 * 60 * 1000) {
            //         await fetchWithTimeout(`${ppplbot()}&text=@${(process.env.clientId).toUpperCase()}: EXITTING as PROMOTION STOPPED.`);
            //         process.exit(0);
            //     }
            // }
            if (this.isPromoting || this.lastMessageTime > Date.now() - 15 * 60 * 1000) {
                console.log("Already Promoting, Skipping...");
                return;
            }
            console.log(`Starting Promotion...............`);
            this.isPromoting = true;
            try {
                while (true) {
                    console.log("Starting promoteInBatches...");
                    yield this.promoteInBatchesV2();
                    console.log("promoteInBatches completed. Retrying in 10 seconds.");
                    yield (0, utils_1.sleep)(10000); // Retry mechanism after small delay
                }
            }
            catch (error) {
                const errorDetails = (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error in promoteInBatches loop:`, true);
                yield (0, utils_1.sendToLogs)({ message: errorDetails.message, chatId: process.env.logsChannel2 });
            }
            finally {
                this.isPromoting = false;
                console.log("Promotion stopped unexpectedly.");
                yield (0, utils_1.sendToLogs)({ message: "Promotion stopped unexpectedly.", chatId: process.env.logsChannel2 });
                this.startPromotion();
            }
        });
    }
    isChannelNotSuitable(channelInfo) {
        var _a, _b;
        const notPattern = new RegExp('online|realestat|propert|board|design|realt|class|PROFIT|wholesale|retail|topper|exam|motivat|medico|shop|follower|insta|traini|cms|cma|subject|currency|color|amity|game|gamin|like|earn|popcorn|TANISHUV|bitcoin|crypto|mall|work|folio|health|civil|win|casino|shop|promot|english|invest|fix|money|book|anim|angime|support|cinema|bet|predic|study|youtube|sub|open|trad|cric|quot|exch|movie|search|boost|dx|film|offer|ott|deal|quiz|academ|insti|talkies|screen|series|webser', "i");
        if (((_a = channelInfo.title) === null || _a === void 0 ? void 0 : _a.match(notPattern)) || ((_b = channelInfo.username) === null || _b === void 0 ? void 0 : _b.match(notPattern))) {
            console.log(`Channel ${channelInfo.channelId} is not suitable for promotion. Skipping...`);
            return true;
        }
        return false;
    }
    isChannelScoreHigh(channelScore) {
        const score = channelScore.participantOffset + channelScore.activeUsers;
        if (score > 90) {
            console.log(`Channel has high/low score of ${score}. Skipping...`);
            return true;
        }
        return false;
    }
    sendPromotionalMessage(mobile, channelInfo, forceEven = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let sentMessage;
            const randomIndex = (0, utils_1.selectRandomElements)(channelInfo.availableMsgs, 1)[0] || '0';
            let endMsg = this.promoteMsgs[randomIndex] || this.promoteMsgs['0'];
            const randomFlag = forceEven || (0, utils_1.getRandomBoolean)();
            if (channelInfo.wordRestriction === 0 && randomFlag) {
                const greetings = ['Hellloooo', 'Hiiiiii', 'Oyyyyyy', 'Oiiiii', 'Haaiiii', 'Hlloooo', 'Hiiii', 'Hyyyyy', 'Oyyyyye', 'Oyeeee', 'Heyyy'];
                const emojis = (0, utils_1.generateEmojis)();
                const randomEmoji = (0, utils_1.getRandomEmoji)();
                const hour = (0, utils_1.getCurrentHourIST)();
                const isMorning = (hour > 9 && hour < 22);
                const offset = Math.floor(Math.random() * 3);
                endMsg = (0, messages_1.pickOneMsg)(['**U bussy👀?\n           U bussy👀?**', '**Trry Once!!😊💦\n           Trry Once!!😊💦**', '**Waiiting fr ur mssg.....Dr!!💦\nWaiiting fr ur mssg.....Dr!!💦**', '**U Onliine?👀\n           U Onliine?👀**', "**I'm Avilble!!😊\n           I'm Avilble!!😊**", '**U Intrstd??👀💦\n           U Intrstd??👀💦**', '**U Awakke?👀💦\n           U Awakke?👀💦**', '**U therre???💦💦\n           U therre???💦💦**']);
                const addon = (offset !== 1) ? `${(offset === 2) ? `**\n\n\n             TODAAY's OFFFER:\n-------------------------------------------\n𝗩𝗲𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗗𝗲𝗺𝗼 𝗔𝘃𝗶𝗹𝗯𝗹𝗲${randomEmoji}${randomEmoji}\n𝗩𝗲𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗗𝗲𝗺𝗼 𝗔𝘃𝗶𝗹𝗯𝗹𝗲${randomEmoji}${randomEmoji}\n-------------------------------------------**` : `**\n\nI'm Freee Now!!${(0, utils_1.generateEmojis)()}\nJUST Trry Once!!😚😚`}**` : endMsg;
                const msg = `**${(0, messages_1.pickOneMsg)(greetings)}_._._._._._._!!**${emojis}\n\n\n${addon}`;
                // console.log(`Selected Msg for ${channelInfo.channelId}, ${channelInfo.title} | ChannelIdex:${this.channelIndex} | MsgIndex: ${randomIndex}`);
                sentMessage = yield this.sendMessageToChannel(mobile, channelInfo, { message: `${msg}` });
            }
            else {
                // console.log(`Selected Msg for ${channelInfo.channelId}, ${channelInfo.title} | ChannelIdex:${this.channelIndex} | MsgIndex: ${randomIndex}`);
                // if (!randomAvailableMsg) {
                //     sendToLogs({ message: `Random Msg Does not EXIST:  ${channelInfo.channelId}, ${channelInfo.title}: index: ${randomIndex}| msg: ${this.promoteMsgs[randomIndex]}` });
                //     randomAvailableMsg = "**Hiiiiiiiiiii\nHiiiiiiiiiiiiiiiiiiii\nHiii\nHiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii\nHiiiiiii**"
                // }
                sentMessage = yield this.sendMessageToChannel(mobile, channelInfo, { message: endMsg });
            }
            return sentMessage;
        });
    }
    handleSuccessfulMessage(mobile, channelInfo, sentMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            this.successCount += 1;
            this.tempFailCount = 0;
            this.messageQueue.push({
                channelId: channelInfo.channelId,
                messageId: sentMessage.id,
                timestamp: Date.now(),
                messageIndex: '0',
            });
            console.log(`Client ${mobile}: Message SENT to ${channelInfo.channelId} || channelIndex: ${this.channelIndex}, messageId: ${sentMessage.id}`);
            if (this.daysLeft < 1) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const sentMessage = yield this.sendPromotionalMessage(mobile, channelInfo, true);
                }), 5 * 60 * 1000);
            }
            // const randomBatchDelay = Math.floor(Math.random() * (this.maxDelay - this.minDelay + 1)) + this.minDelay;
            // console.log(`Sleeping for ${(randomBatchDelay / 60000).toFixed(2)} minutes`);
            // await sleep(randomBatchDelay);
        });
    }
    promoteInBatchesV2() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.channels = yield this.fetchDialogs().catch(error => {
                    console.error("Error fetching dialogs:", error);
                    return [];
                });
                this.channelIndex = 0;
                if (this.channels.length === 0) {
                    console.error("No channels available for promotion. Will retry in 30 seconds.");
                    yield (0, utils_1.sleep)(30000);
                    return;
                }
                while (true) {
                    try {
                        // Check conditions for resetting channel list
                        // if (this.startPromoteCount > 5 && this.lastMessageTime < Date.now() - 25 * 60 * 1000) {
                        //     await fetchWithTimeout(`${ppplbot()}&text=@${(process.env.clientId).toUpperCase()}: Promotion SOFT STOPPED.`);
                        //     this.startPromoteCount = 0;
                        //     return;
                        // }
                        if (this.tempFailCount > 15 ||
                            (this.daysLeft <= 0 && this.channelIndex >= 250) ||
                            (this.daysLeft > 0 && this.channelIndex >= 320) ||
                            this.channelIndex >= this.channels.length) {
                            if (this.tempFailCount > 15) {
                                console.log("checking health as tempFailCount > 15");
                                yield this.checktghealth(true);
                            }
                            console.log("sleeping for 30 seconds before refreshing channel list...");
                            yield (0, utils_1.sleep)(30000);
                            console.log("Refreshing channel list...");
                            this.channels = yield this.fetchDialogs();
                            this.channelIndex = 0;
                            continue;
                        }
                        const healthyMobiles = yield this.waitForHealthyMobilesEventDriven();
                        if (!healthyMobiles || healthyMobiles.length === 0) {
                            console.error("No Healthy mobiles found. Waiting 30 seconds...");
                            yield (0, utils_1.sleep)(30000);
                            continue;
                        }
                        if (this.channelIndex >= this.channels.length) {
                            console.log("Reached end of channel list. Resetting...");
                            this.channelIndex = 0;
                            continue;
                        }
                        const channelId = this.channels[this.channelIndex];
                        if (!channelId) {
                            console.error("Invalid channel ID at index", this.channelIndex);
                            this.channelIndex++;
                            continue;
                        }
                        const channelInfo = yield this.getChannelInfo(channelId);
                        if (!channelInfo) {
                            console.error(`Channel info for ID ${channelId} not found. channelIndex: ${this.channelIndex}`);
                            this.channelIndex++;
                            continue;
                        }
                        // Check if channel was recently promoted
                        try {
                            const lastMessageIndex = channelInfo.messageIndex;
                            if (lastMessageIndex || PromoteQueue_1.PromoteQueue.getInstance().contains(channelId)) {
                                const lastMessage = yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.getMessages(channelId, { limit: 1 }));
                                if (PromoteQueue_1.PromoteQueue.getInstance().contains(channelId) || ((lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage[0]) && lastMessage[0].id - lastMessageIndex < 8)) {
                                    console.log(`Channel ${channelId} was recently promoted. Skipping... channelIndex: ${this.channelIndex}`);
                                    this.channelIndex++;
                                    continue;
                                }
                            }
                        }
                        catch (error) {
                            console.error(`Error checking recent promotion for channel ${channelId}:`, error);
                            this.channelIndex++;
                            continue;
                        }
                        if (this.daysLeft < 0) {
                            const count = PromoteQueue_1.PromoteQueue.getInstance().getSentCount(channelId);
                            if (count > 0) {
                                console.log(`Channel ${channelId} has already been promoted. Skipping... channelIndex: ${this.channelIndex}`);
                                this.channelIndex++;
                                continue;
                            }
                        }
                        if (channelInfo.banned) {
                            console.log(`Channel ${channelId} is banned or unsuitable. Skipping... channelIndex: ${this.channelIndex} | ${channelInfo.title} | ${channelInfo.username}`);
                            this.channelIndex++;
                            continue;
                        }
                        let messageSent = false;
                        for (const mobile of healthyMobiles) {
                            try {
                                const previousResult = this.promotionResults.get(channelId);
                                if (previousResult && previousResult.success === false) {
                                    console.log(`Skipping promotion for mobile ${mobile} and channel ${channelId} based on previous result.`);
                                    continue;
                                }
                                if (!messageSent) {
                                    const sentMessage = yield this.sendPromotionalMessage(mobile, channelInfo);
                                    if (sentMessage) {
                                        yield this.handleSuccessfulMessage(mobile, channelInfo, sentMessage);
                                        messageSent = true;
                                        break;
                                    }
                                    else {
                                        this.failedCount += 1;
                                        this.tempFailCount += 1;
                                        if (this.tempFailCount > 6 || (this.lastMessageTime < Date.now() - 15 * 60 * 1000 && this.tempFailCount > 0)) {
                                            // await sendToLogs({
                                            //     message: `${mobile}:\n@${channelInfo.username} ❌\ntempFailCount: ${this.tempFailCount}\nLastMsg: ${((Date.now() - this.lastMessageTime) / 60000).toFixed(2)}mins\nSleeping: ${(this.sleepTime - Date.now()) / 60000}mins\nDaysLeft: ${this.daysLeft}\nReason: ${this.failureReason}\nchannelIndex: ${this.channelIndex}`
                                            // });
                                            console.log(`${mobile}:\n@${channelInfo.username} ❌\ntempFailCount: ${this.tempFailCount}\nLastMsg: ${((Date.now() - this.lastMessageTime) / 60000).toFixed(2)}mins\nSleeping: ${(this.sleepTime - Date.now()) / 60000}mins\nDaysLeft: ${this.daysLeft}\nReason: ${this.failureReason}\nchannelIndex: ${this.channelIndex}`);
                                        }
                                    }
                                }
                            }
                            catch (error) {
                                console.error(`Error processing mobile ${mobile} for channel ${channelId}:`, error);
                                continue;
                            }
                        }
                    }
                    catch (error) {
                        console.error("Error in promotion loop:", error);
                        // Don't exit the loop on error, just continue with next iteration
                    }
                    finally {
                        yield (0, utils_1.sleep)(3000); // Avoid too frequent requests
                        this.channelIndex++;
                    }
                }
            }
            catch (error) {
                console.error("Fatal error in promoteInBatchesV2:", error);
                // Wait before attempting to restart the promotion
                yield (0, utils_1.sleep)(30000);
                // The method will be called again by the parent process
            }
        });
    }
    waitForHealthyMobilesEventDriven(retryInterval = 30000) {
        return new Promise((resolve) => {
            const checkMobiles = () => __awaiter(this, void 0, void 0, function* () {
                const healthyMobiles = this.getHealthyMobiles();
                if (healthyMobiles.length > 0) {
                    console.log(`Healthy mobiles: `, healthyMobiles);
                    resolve(healthyMobiles);
                }
                else {
                    // console.warn(`No healthy mobiles available. Retrying in ${retryInterval / 1000} seconds...`);
                    setTimeout(checkMobiles, retryInterval); // Schedule the next check without blocking
                }
            });
            checkMobiles();
        });
    }
    // private updateMobileStats(mobile: string, channelId: string) {
    //     const stats = this.mobileStats.get(mobile) || { messagesSent: 0, failedMessages: 0, sleepTime: 0, releaseTime: 0, lastMessageTime: Date.now(), daysLeft: 0, tempFailCount: 0 };
    //     this.failedMessages += 1;
    //     this.tempFailCount += 1;
    //     this.mobileStats.set(mobile, stats);
    //     if (this.tempFailCount > 6) {
    //         sendToLogs({
    //             message: `${mobile}:
    // @${channelId} ❌
    // tempFailCount: ${this.tempFailCount}
    // LastMsg: ${(Date.now() - this.lastMessageTime) / 60000} mins
    // Sleeping: ${(this.sleepTime - Date.now()) / 60000} mins
    // DaysLeft: ${this.daysLeft}
    // Reason: ${this.failureReason}
    // channelIndex: ${this.channelIndex}`
    //         });
    //     }
    // }
    handlePrivateChannel(client, channelInfo, message, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            if (channelInfo && channelInfo.username) {
                try {
                    return yield client.sendMessage(channelInfo.username, message);
                }
                catch (err) {
                    console.error(`Error retrying message for private channel ${channelInfo.username}:`, err);
                    // if (err.errorMessage === "CHANNEL_PRIVATE") {
                    //     await db.updateActiveChannel({ channelId: channelInfo.channelId }, { private: true });
                    // }
                    return undefined;
                }
            }
            return undefined;
        });
    }
    handleOtherErrors(mobile, channelInfo, message, error) {
        return __awaiter(this, void 0, void 0, function* () {
            // const db = UserDataDtoCrud.getInstance();
            // parseError(error, `Error sending message to ${channelInfo.channelId} (@${channelInfo.username}):`, false)
            if (error.errorMessage === 'USER_BANNED_IN_CHANNEL') {
                //trigger checktghealth method from  TelegramManager class
                yield this.checktghealth();
                // if (!result && daysLeftForRelease() < 0) {
                //     await leaveChannel(client, channelInfo);
                // }
            }
            else if (error.errorMessage === 'CHAT_WRITE_FORBIDDEN') {
                console.error(`${mobile}: ${error.errorMessage}`);
                // await leaveChannel(this.client, channelInfo);
            }
            else {
                console.error(`${mobile}: ${error.errorMessage}`);
                // const errorDetails = parseError(error, `${mobile}`, false)
            }
            return undefined;
        });
    }
    calculateChannelScore(client, channelInfo, forceUsername = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = forceUsername && channelInfo.username ? channelInfo.username : channelInfo.channelId;
                // Limit message fetch to last hour to reduce memory usage
                const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;
                const messages = yield client.getMessages(entity, {
                    limit: 50,
                    offsetDate: oneHourAgo
                });
                const tenMins = 10 * 60 * 1000;
                const currentTime = Date.now();
                // Process messages in memory-efficient way
                let recentMessageCount = 0;
                const activeUserSet = new Set();
                for (const msg of messages) {
                    if (msg.senderId && currentTime - (msg === null || msg === void 0 ? void 0 : msg.date) * 1000 < tenMins) {
                        recentMessageCount++;
                        if (!msg.viaBot &&
                            msg.senderId.toString() !== '609517172' &&
                            currentTime - (msg === null || msg === void 0 ? void 0 : msg.date) * 1000 < 3600000) {
                            activeUserSet.add(msg.senderId.toString());
                        }
                    }
                }
                const participantOffset = Math.floor(channelInfo.participantsCount / 2000);
                return {
                    participantOffset,
                    activeUsers: activeUserSet.size,
                    recentMessages: recentMessageCount
                };
            }
            catch (err) {
                const errorDetails = (0, parseError_1.parseError)(err, `Failed to score ${channelInfo.username}`, false);
                if (errorDetails.message.includes('Could not find the input entity') && !forceUsername) {
                    try {
                        console.error(`trying to join channel ${channelInfo.username}`);
                        yield client.invoke(new telegram_1.Api.channels.JoinChannel({
                            channel: channelInfo.username ? `@${channelInfo.username}` : channelInfo.channelId
                        }));
                        return yield this.calculateChannelScore(client, channelInfo, true);
                    }
                    catch (error) {
                        console.error(`Failed to join channel ${channelInfo.username}:`, error.message);
                    }
                }
                return { participantOffset: 0, activeUsers: 0, recentMessages: 0 };
            }
        });
    }
    handleDeletedMessage(channelId, messageIndex, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            if (messageIndex == '0') {
                const channelInfo = yield db.getActiveChannel({ channelId });
                if (channelInfo.availableMsgs.length < 1) {
                    console.log(`Setting channel ${channelId} as banned because messageIndex is '0'`);
                    yield db.updateActiveChannel({ channelId }, { banned: true });
                    console.log(`Channel ${channelId} is now banned.`);
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${(process.env.clientId).toUpperCase()}-PROM: Channel ${channelId} is now banned.`);
                }
            }
            else {
                const result = yield db.removeFromAvailableMsgs({ channelId }, messageIndex);
                console.log(`Removed message ${messageIndex} from channel ${channelId} messagesId: ${messageId}`);
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${(process.env.clientId).toUpperCase()}-PROM: Removed message ${messageIndex} from channel ${channelId} as messageId : ${messageId}`);
            }
        });
    }
    handleExistingMessage(channelId, messageIndex, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            console.log(`Message EXISTS for channelId: ${channelId}, messageIndex: ${messageIndex}, messageId: ${messageId}`);
            if (messageIndex) {
                const result = yield db.updateActiveChannel({ channelId }, { lastMessageTime: Date.now(), messageIndex: messageId });
            }
            else {
                console.log(`No message index provided for channel ${channelId}`);
            }
        });
    }
    getChannelInfo(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            let channelInfo = yield db.getActiveChannel({ channelId: channelId });
            if (!channelInfo) {
                yield (0, utils_1.sendToLogs)({ message: `Channel ${channelId} not found in DB. Fetching from Telegram...` });
                channelInfo = yield this.getIChannelFromTg(channelId);
                yield db.updateActiveChannel({ channelId: channelId }, channelInfo);
            }
            return channelInfo;
        });
    }
    getIChannelFromTg(channelId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const channelEnt = channelId.startsWith('-') ? channelId : `-100${channelId}`;
            const { id, defaultBannedRights, title, broadcast, username, participantsCount, restricted } = yield this.client.getEntity(channelEnt);
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
                availableMsgs: utils_1.defaultMessages,
                dMRestriction: 0,
                banned: false,
                reactions: utils_1.defaultReactions,
                reactRestricted: false,
                wordRestriction: 0
            };
            return channel;
        });
    }
    getMobileStats() {
        return {
            messageCount: this.messageCount,
            successCount: this.successCount,
            failedCount: this.failedCount,
            daysLeft: this.daysLeft,
            lastCheckedTime: this.lastCheckedTime,
            sleepTime: this.sleepTime,
            releaseTime: this.releaseTime,
            lastMessageTime: this.lastMessageTime,
            converted: this.converted
        };
    }
    //logic to set the mobileStats
    setMobileStats(mobileStats) {
        this.messageCount = mobileStats.messageCount || 0;
        this.successCount = mobileStats.successCount || 0;
        this.failedCount = mobileStats.failedCount || 0;
        this.sleepTime = mobileStats.sleepTime || 0;
        this.releaseTime = mobileStats.releaseTime || 0;
        this.lastMessageTime = mobileStats.lastMessageTime || 0;
        this.daysLeft = mobileStats.daysLeft || -1;
        this.lastCheckedTime = mobileStats.lastCheckedTime || Date.now();
    }
    getPromotionResults() {
        const result = {};
        for (const [key, value] of this.promotionResults) {
            result[key] = value;
        }
        return result;
    }
    cleanupPromotionResults() {
        if (this.promotionResults.size > this.MAX_RESULTS_SIZE) {
            console.warn(`Promotion results exceeded ${this.MAX_RESULTS_SIZE} items, cleaning up old entries`);
            const entries = Array.from(this.promotionResults.entries());
            const sortedEntries = entries.sort((a, b) => (b[1].count || 0) - (a[1].count || 0));
            this.promotionResults = new Map(sortedEntries.slice(0, this.MAX_RESULTS_SIZE));
        }
    }
    //logic to set the promotionResults
    setPromotionResults(promotionResults) {
        this.promotionResults = new Map(Object.entries(promotionResults));
        this.cleanupPromotionResults();
    }
    saveResultsToJson() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dir = path_1.default.dirname(`./mobileStats-${this.clientDetails.mobile}.json`);
                yield fs.mkdir(dir, { recursive: true });
                const data = {
                    mobileStats: this.getMobileStats(),
                    promotionResults: this.getPromotionResults(),
                };
                yield fs.writeFile(`./mobileStats-${this.clientDetails.mobile}.json`, JSON.stringify(data, null, 2), 'utf-8');
                console.log(`Results saved to mobileStats-${this.clientDetails.mobile}.json`);
            }
            catch (error) {
                console.error(`Failed to save results to ./mobileStats.json:`, error.message);
            }
        });
    }
    // Method to import results from a JSON file
    importResultsFromJson() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawData = yield fs.readFile(`./mobileStats-${this.clientDetails.mobile}.json`, 'utf-8');
                const data = JSON.parse(rawData);
                if (!data.mobileStats || !data.promotionResults) {
                    console.error("Invalid JSON format: Required keys are missing.");
                }
                this.setMobileStats(data.mobileStats);
                this.setPromotionResults(data.promotionResults);
                console.log(`Results imported from ./mobileStats-${this.clientDetails.mobile}.json`);
            }
            catch (error) {
                if (error.code === 'ENOENT') {
                    console.error(`File not found: ./mobileStats-${this.clientDetails.mobile}.json`);
                }
                else if (error instanceof SyntaxError) {
                    console.error(`Failed to parse JSON from ./mobileStats-${this.clientDetails.mobile}.json:`, error.message);
                }
                else {
                    console.error(`Failed to import results from ./mobileStats-${this.clientDetails.mobile}.json:`, error.message);
                }
            }
        });
    }
    getHealthyMobiles() {
        if (this.daysLeft < 7 && ((this.lastMessageTime < Date.now() - 12 * 60 * 1000 && this.daysLeft < 1) || (this.lastMessageTime < Date.now() - 3 * 60 * 1000 && this.daysLeft > 0)) && this.sleepTime < Date.now()) {
            return [this.clientDetails.mobile];
        }
        else {
            return [];
        }
    }
    checktghealth(force = false) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.lastCheckedTime < (Date.now() - 120 * 60 * 1000)) || force) { //&& daysLeftForRelease() < 0) {
                this.lastCheckedTime = Date.now();
                try {
                    if (this.client) {
                        yield this.client.sendMessage('@spambot', { message: '/start' });
                    }
                    else {
                        //console.log("instanse not exist")
                    }
                }
                catch (error) {
                    (0, parseError_1.parseError)(error, `CheckHealth in Tg: ${(_a = this.clientDetails) === null || _a === void 0 ? void 0 : _a.mobile}`);
                    yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                    try {
                        yield this.client.invoke(new telegram_1.Api.contacts.Unblock({
                            id: '178220800'
                        }));
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error, (_b = this.clientDetails) === null || _b === void 0 ? void 0 : _b.mobile);
                        yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                    }
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${(process.env.clientId).toUpperCase()}-PROM: Failed To Check Health`);
                }
                return true;
            }
            return false;
        });
    }
}
exports.Promotion = Promotion;


/***/ }),

/***/ "./src/ReactQueue.ts":
/*!***************************!*\
  !*** ./src/ReactQueue.ts ***!
  \***************************/
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

/***/ "./src/Telegram.service.ts":
/*!*********************************!*\
  !*** ./src/Telegram.service.ts ***!
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
exports.TelegramService = void 0;
const express_1 = __webpack_require__(/*! ./express */ "./src/express.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const react_1 = __webpack_require__(/*! ./react */ "./src/react.ts");
const reaction_utils_1 = __webpack_require__(/*! ./reaction.utils */ "./src/reaction.utils.ts");
const TelegramManager_1 = __importDefault(__webpack_require__(/*! ./TelegramManager */ "./src/TelegramManager.ts"));
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
class TelegramService {
    constructor() { }
    static getInstance() {
        if (!TelegramService.instance) {
            TelegramService.instance = new TelegramService();
        }
        return TelegramService.instance;
    }
    updateProfilePics() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [mobile, tgManager] of TelegramService.clientsMap.entries()) {
                yield tgManager.updateProfilePics();
            }
        });
    }
    getLastMessageTime(mobile) {
        const tgManager = this.getClient(mobile);
        return tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance.lastMessageTime;
    }
    restartPromotion(mobile) {
        const tgManager = this.getClient(mobile);
        return tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance.restartPromotion();
    }
    getDaysLeft(mobile) {
        const tgManager = this.getClient(mobile);
        return tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance.daysLeft;
    }
    startPromotion(mobile) {
        const tgManager = this.getClient(mobile);
        return tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance.startPromotion();
    }
    getPromotionResults() {
        var _a;
        const result = {};
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result[mobile] = (_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.getPromotionResults();
        }
        return result;
    }
    updatePrivacy() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (const mobile of this.getMobiles()) {
                const tgManager = this.getClient(mobile);
                yield tgManager.updatePrivacy();
            }
        });
    }
    getBannedChannels() {
        var _a;
        const result = [];
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result.push(...(_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.getBannedChannels());
        }
        return result;
    }
    getMobileStats() {
        var _a;
        const result = {};
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result[mobile] = (_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.getMobileStats();
            delete result[mobile]["lastCheckedTime"];
            delete result[mobile]["sleepTime"];
            delete result[mobile]["releaseTime"];
            delete result[mobile]["lastMessageTime"];
        }
        return result;
    }
    resetPromotionResults() {
        var _a;
        const result = {};
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result[mobile] = (_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.resetPromotionResults();
        }
        return result;
    }
    resetMobileStats() {
        var _a;
        const result = {};
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result[mobile] = (_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.resetMobileStats();
        }
        return result;
    }
    saveMobileStats() {
        var _a;
        const result = {};
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result[mobile] = (_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.saveResultsToJson();
        }
        return result;
    }
    importMobileStats() {
        var _a;
        const result = {};
        for (const mobile of this.getMobiles()) {
            const tgManager = this.getClient(mobile);
            result[mobile] = (_a = tgManager === null || tgManager === void 0 ? void 0 : tgManager.promoterInstance) === null || _a === void 0 ? void 0 : _a.saveResultsToJson();
        }
        return result;
    }
    setMobiles(mobiles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reactorInstance.setMobiles(mobiles);
        });
    }
    connectClients() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connecting....!!");
            const mobiles = (0, express_1.getMapKeys)();
            console.log("Total clients:", mobiles.length);
            this.reactorInstance = new react_1.Reactions(mobiles, this.getClient.bind(this));
            yield (0, reaction_utils_1.loadReactionsFromFile)();
            for (const mobile of mobiles) {
                const clientDetails = (0, express_1.getClientDetails)(mobile);
                yield this.createClient(clientDetails, false, true);
                yield (0, utils_1.sleep)(3000);
            }
            console.log("Connected....!!");
        });
    }
    getAverageReactionDelay() {
        return this.reactorInstance.averageReactionDelay;
    }
    getLastReactedTime() {
        return this.reactorInstance.lastReactedtime;
    }
    getTgManagers() {
        return Array.from(TelegramService.clientsMap.values());
    }
    getMobiles() {
        return Array.from(TelegramService.clientsMap.keys());
    }
    getClient(mobile) {
        // console.log("Getting Client :", mobile)
        const tgManager = TelegramService.clientsMap.get(mobile);
        try {
            if (tgManager) {
                return tgManager;
            }
            else {
                console.log(`tg manager is undefined: ${mobile}`);
                return undefined;
            }
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
    hasClient(mobile) {
        return TelegramService.clientsMap.has(mobile);
    }
    disposeClient(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tgManager = yield this.getClient(mobile);
                if (tgManager) {
                    yield tgManager.destroy();
                    console.log(`Disconnected and disposed old client for ${mobile}.`);
                }
                return TelegramService.clientsMap.delete(mobile);
            }
            catch (disposeError) {
                (0, parseError_1.parseError)(disposeError, `Failed to dispose old client for ${mobile}:`);
            }
        });
    }
    deleteClient(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            let tgManager = yield this.getClient(mobile);
            if (tgManager) {
                yield tgManager.destroy(); // Ensure this cleans up all resources
                console.log(`Client ${mobile} destroyed.`);
                tgManager = null;
            }
            else {
                console.log(`Client ${mobile} not found.`);
            }
            console.log("Disconnected : ", mobile);
            TelegramService.clientsMap.set(mobile, null);
            return TelegramService.clientsMap.delete(mobile);
        });
    }
    disconnectAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = TelegramService.clientsMap.entries();
            console.log("Disconnecting All Clients");
            for (const [clientId, tgManager] of data) {
                try {
                    this.reactorInstance = null;
                    yield ((_a = tgManager.client) === null || _a === void 0 ? void 0 : _a.disconnect());
                    TelegramService.clientsMap.delete(clientId);
                    console.log(`Client disconnected: ${clientId}`);
                }
                catch (error) {
                    console.log((0, parseError_1.parseError)(error, "Failed to Disconnect"));
                    console.log(`Failed to Disconnect : ${clientId}`);
                }
            }
            TelegramService.clientsMap.clear();
        });
    }
    createClient(clientDetails, autoDisconnect = false, handler = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientData = yield this.getClient(clientDetails.mobile);
            if (!clientData || !clientData.client) {
                const telegramManager = new TelegramManager_1.default(clientDetails, this.reactorInstance);
                try {
                    const client = yield telegramManager.createClient(handler);
                    TelegramService.clientsMap.set(clientDetails.mobile, telegramManager);
                    if (client) {
                        yield client.getMe();
                        if (autoDisconnect) {
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                if (client.connected || (yield this.getClient(clientDetails.mobile))) {
                                    console.log("SELF destroy client : ", clientDetails.mobile);
                                    yield telegramManager.client.disconnect();
                                }
                                else {
                                    console.log("Client Already Disconnected : ", clientDetails.mobile);
                                }
                                TelegramService.clientsMap.delete(clientDetails.mobile);
                            }), 180000);
                        }
                        else {
                            // setInterval(async () => {
                            //     //console.log("destroying loop :", mobile)
                            //     //client._destroyed = true
                            //     // if (!client.connected) {
                            //     // await client.connect();
                            //     //}
                            // }, 20000);
                        }
                        return telegramManager;
                    }
                    else {
                        console.log(`Client Expired: ${clientDetails.mobile}`);
                        // throw new BadRequestException('Client Expired');
                    }
                }
                catch (error) {
                    console.log("Parsing Error");
                    const errorDetails = (0, parseError_1.parseError)(error, clientDetails.mobile);
                }
            }
            else {
                console.log("Client Already exists: ", clientDetails.mobile);
                return this.getClient(clientDetails.mobile);
            }
        });
    }
    promotionsBannedMobiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const twentyMinutesAgo = Date.now() - 20 * 60 * 1000;
            const mobilesWithOldMessages = [];
            for (const mobile of this.getMobiles()) {
                const lastMessageTime = this.getLastMessageTime(mobile);
                if (lastMessageTime && lastMessageTime < twentyMinutesAgo) {
                    yield this.restartPromotion(mobile);
                    const minutesAgo = Math.floor((Date.now() - lastMessageTime) / (60 * 1000));
                    mobilesWithOldMessages.push(`${mobile} : ${minutesAgo} mins`);
                }
            }
            console.log("Mobiles with last message time greater than 20 minutes:");
            mobilesWithOldMessages.forEach(mobile => console.log(mobile));
            return mobilesWithOldMessages.join("\n");
        });
    }
}
exports.TelegramService = TelegramService;
TelegramService.clientsMap = new Map();


/***/ }),

/***/ "./src/TelegramManager.ts":
/*!********************************!*\
  !*** ./src/TelegramManager.ts ***!
  \********************************/
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
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const events_1 = __webpack_require__(/*! telegram/events */ "telegram/events");
const Logger_1 = __webpack_require__(/*! telegram/extensions/Logger */ "telegram/extensions/Logger");
const sessions_1 = __webpack_require__(/*! telegram/sessions */ "telegram/sessions");
const connection_1 = __webpack_require__(/*! ./connection */ "./src/connection.ts");
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/fetchWithTimeout.ts");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const uploads_1 = __webpack_require__(/*! telegram/client/uploads */ "telegram/client/uploads");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const Telegram_service_1 = __webpack_require__(/*! ./Telegram.service */ "./src/Telegram.service.ts");
const express_1 = __webpack_require__(/*! ./express */ "./src/express.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const Promotions_1 = __webpack_require__(/*! ./Promotions */ "./src/Promotions.ts");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
const phonestate_1 = __webpack_require__(/*! ./phonestate */ "./src/phonestate.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
const CHANNEL_UPDATE_INTERVAL = 5 * 60 * 1000; // Update top channels every 5 minutes
const CONNECTION_CHECK_INTERVAL = 5 * 60 * 1000; // Check connection every 5 minutes
const REACTION_INTERVAL = 3000; // Average time to wait between reactions (in ms)
const MIN_REACTION_DELAY = 2000; // Minimum reaction delay (in ms)
const MAX_REACTION_DELAY = 5000; // Maximum reaction delay (in ms)
const CHANNELS_LIMIT = 40; // Number of top channels to monitor
const MAX_RECONNECTION_ATTEMPTS = 3;
const RECONNECTION_DELAY = 5000; // 5 seconds
class TelegramManager {
    constructor(clientDetails, reactorInstance) {
        this.phoneCall = undefined;
        this.clientDetails = undefined;
        this.checkingAuths = false;
        this.lastResetTime = 0;
        this.liveMap = new Map();
        this.channels = []; // Array to store the top channels
        this.isReacting = false;
        this.isReconnecting = false;
        this.reconnectionAttempts = 0;
        this.lastReconnectionTime = 0;
        this.rateLimitedUntil = 0;
        this.isDestroyed = false;
        this.eventHandlers = [];
        this.LIVE_MAP_CLEANUP_INTERVAL = 30 * 60 * 1000; // 30 minutes
        this.LIVE_MAP_ENTRY_TTL = 2 * 60 * 60 * 1000; // 2 hours
        this.clientDetails = clientDetails;
        this.reactorInstance = reactorInstance;
        this.updateChannelsInterval = setInterval(this.updateChannels.bind(this), CHANNEL_UPDATE_INTERVAL);
        this.connectionCheckInterval = setInterval(this.checkConnection.bind(this), CONNECTION_CHECK_INTERVAL);
        this.startLiveMapCleanup();
    }
    checkConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client || this.isReconnecting || this.isDestroyed)
                return;
            try {
                const isConnected = yield this.validateConnection();
                if (!isConnected) {
                    console.log(`${this.clientDetails.mobile}: Connection lost, attempting to reconnect...`);
                    yield this.reconnect();
                }
                else {
                    console.log(`${this.clientDetails.mobile}: Connection health check passed`);
                    // Reset reconnection attempts on successful connection
                    this.reconnectionAttempts = 0;
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error checking connection`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                yield this.reconnect();
            }
        });
    }
    validateConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!((_a = this.client) === null || _a === void 0 ? void 0 : _a.connected))
                    return false;
                return true;
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error validating connection`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                return false;
            }
        });
    }
    reconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isReconnecting || this.isDestroyed)
                return;
            // Check rate limiting
            if (Date.now() < this.rateLimitedUntil) {
                console.log(`${this.clientDetails.mobile}: Rate limited, waiting before reconnection...`);
                return;
            }
            // Check reconnection attempts
            if (this.reconnectionAttempts >= MAX_RECONNECTION_ATTEMPTS) {
                const timeSinceLastReconnection = Date.now() - this.lastReconnectionTime;
                if (timeSinceLastReconnection < RECONNECTION_DELAY * 2) {
                    console.log(`${this.clientDetails.mobile}: Too many reconnection attempts, waiting...`);
                    return;
                }
                this.reconnectionAttempts = 0;
            }
            this.isReconnecting = true;
            this.reconnectionAttempts++;
            this.lastReconnectionTime = Date.now();
            try {
                console.log(`${this.clientDetails.mobile}: Attempting to reconnect (attempt ${this.reconnectionAttempts})...`);
                yield this.cleanupClient();
                yield (0, Helpers_1.sleep)(RECONNECTION_DELAY);
                yield this.createClient();
                console.log(`${this.clientDetails.mobile}: Successfully reconnected`);
                this.reconnectionAttempts = 0;
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Reconnection failed`);
                if (error instanceof telegram_1.errors.FloodWaitError) {
                    this.rateLimitedUntil = Date.now() + error.seconds * 1000;
                }
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
            finally {
                this.isReconnecting = false;
            }
        });
    }
    cleanupClient() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client)
                    return;
                // Remove tracked event handlers
                for (const [builder, handler] of this.eventHandlers) {
                    try {
                        this.client.removeEventHandler(handler, builder);
                    }
                    catch (error) {
                        console.warn(`Failed to remove event handler:`, error);
                    }
                }
                this.eventHandlers = [];
                // Clear all intervals
                if (this.updateChannelsInterval) {
                    clearInterval(this.updateChannelsInterval);
                    this.updateChannelsInterval = null;
                }
                if (this.connectionCheckInterval) {
                    clearInterval(this.connectionCheckInterval);
                    this.connectionCheckInterval = null;
                }
                if (this.cleanupInterval) {
                    clearInterval(this.cleanupInterval);
                    this.cleanupInterval = null;
                }
                // Cleanup phone call state
                if (this.phoneCall) {
                    try {
                        yield this.disconnectCall(this.phoneCall.id.toString());
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error cleaning up phone call`);
                        console.error(`${this.clientDetails.mobile}: Error cleaning up phone call:`, error);
                    }
                }
                try {
                    yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.destroy());
                    this.client._eventBuilders = [];
                    yield (0, Helpers_1.sleep)(2000);
                    console.log("Client Destroyed: ", this.clientDetails.mobile);
                }
                catch (error) {
                    (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error during client cleanup`);
                }
                finally {
                    this.client._destroyed = true;
                    if (this.client._sender && typeof this.client._sender.disconnect === 'function') {
                        yield this.client._sender.disconnect();
                    }
                }
                this.client = null;
                this.phoneCall = undefined;
                this.tgId = '';
                this.liveMap.clear();
                this.channels = [];
                this.isReacting = false;
                yield (0, Helpers_1.sleep)(2000);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error during client cleanup`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    startLiveMapCleanup() {
        this.cleanupInterval = setInterval(() => {
            const now = Date.now();
            for (const [chatId, entry] of this.liveMap) {
                if (now - entry.time > this.LIVE_MAP_ENTRY_TTL) {
                    this.liveMap.delete(chatId);
                }
            }
        }, this.LIVE_MAP_CLEANUP_INTERVAL);
    }
    updateChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateConnectionState())
                return;
            console.log(`${this.clientDetails.mobile}: Updating top channels...`);
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
                    console.log(`${this.clientDetails.mobile} Found ${this.channels.length} channels to monitor.`);
                    this.randomChannelReaction();
                }
                else {
                    console.warn(`${this.clientDetails.mobile} No valid channels found.`);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile} Failed to update top channels`);
                if (!(error instanceof telegram_1.errors.FloodWaitError)) {
                    yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                }
            }
        });
    }
    validateConnectionState() {
        if (this.isDestroyed) {
            console.log(`${this.clientDetails.mobile}: Instance is destroyed, skipping operation`);
            return false;
        }
        if (!this.client || !this.client.connected) {
            console.log(`${this.clientDetails.mobile}: Client not connected, triggering reconnection`);
            this.reconnect();
            return false;
        }
        return true;
    }
    randomChannelReaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isReacting || !this.validateConnectionState()) {
                console.log("Already Reacting or invalid state, ignoring trigger ", this.clientDetails.mobile);
                return;
            }
            console.log(`${this.clientDetails.mobile} Starting random channel reaction...`);
            this.isReacting = true;
            try {
                while (this.validateConnectionState()) {
                    if (this.channels.length === 0) {
                        yield this.updateChannels();
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
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile} Error in reaction loop`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
            finally {
                console.log("Reaction Loop Stopped", this.clientDetails.mobile);
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateConnectionState())
                return;
            try {
                if (!channel) {
                    console.warn(`${this.clientDetails.mobile}: Invalid channel ID`);
                    return;
                }
                const messages = yield this.client.getMessages(channel, { limit: 3 });
                const validMessages = messages.filter(msg => msg && !msg.out);
                const message = (0, utils_1.selectRandomElements)(validMessages, 1)[0];
                if (message) {
                    try {
                        yield ((_a = this.reactorInstance) === null || _a === void 0 ? void 0 : _a.react(message, this.clientDetails.mobile));
                        const reactionDelay = Math.random() * (MAX_REACTION_DELAY - MIN_REACTION_DELAY) + MIN_REACTION_DELAY;
                        yield (0, Helpers_1.sleep)(reactionDelay);
                    }
                    catch (error) {
                        console.warn(`${this.clientDetails.mobile} Failed to react to message: `, error);
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to process messages in channel ${channel.title}:`, error);
                    if (!(error instanceof telegram_1.errors.FloodWaitError)) {
                        yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                    }
                }
            }
        });
    }
    connected() {
        return this.client.connected;
    }
    setClientDetails(clientDetails) {
        this.clientDetails = clientDetails;
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isDestroyed = true;
                console.log(`${this.clientDetails.mobile}: Disposing TelegramManager instance...`);
                yield this.cleanupClient();
                this.reactorInstance.dispose();
                this.promoterInstance.cleanup();
                // Clear other instance variables
                this.clientDetails = undefined;
                this.reactorInstance = null;
                this.promoterInstance = null;
                console.log(`${this.clientDetails.mobile}: Instance successfully destroyed.`);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error during instance destruction`);
                console.error(`${this.clientDetails.mobile}: Error during instance destruction:`, error);
            }
        });
    }
    createClient(handler = true) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("Creating Client: ", this.clientDetails.clientId)
                const result2 = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.tgcms}/archived-clients/fetchOne/${this.clientDetails.mobile}`, {}, 3);
                // //console.log("ArchivedClient : ", result2.data)
                if (result2.data) {
                    this.client = new telegram_1.TelegramClient(new sessions_1.StringSession(result2.data.session), parseInt(process.env.API_ID), process.env.API_HASH, {
                        connectionRetries: 5,
                        useIPV6: true,
                        useWSS: true
                    });
                    this.client.setLogLevel(Logger_1.LogLevel.ERROR);
                    //TelegramManager.client._errorHandler = this.errorHandler
                    yield this.client.connect();
                    console.log("Connected : ", this.clientDetails.mobile);
                    // await this.updatePrivacy();
                    // await sleep(1500)
                    // await this.checkProfilePics();
                    // await sleep(1500)
                    // await this.updateUsername('')
                    console.log("Adding event Handler");
                    yield this.updateChannels();
                    if (handler && this.client) {
                        const newMessageHandler = (event) => this.handleEvents(event);
                        const otherEventsHandler = (event) => this.handleOtherEvents(event);
                        this.eventHandlers.push([new events_1.NewMessage({ incoming: true }), newMessageHandler]);
                        this.client.addEventHandler(newMessageHandler, new events_1.NewMessage({ incoming: true }));
                        this.eventHandlers.push([null, otherEventsHandler]);
                        this.client.addEventHandler(otherEventsHandler);
                    }
                    // await updatePromoteClient(this.clientDetails.clientId, { daysLeft: -1 })
                    this.promoterInstance = new Promotions_1.Promotion(this.client, this.clientDetails);
                    yield this.joinChannel("clientupdates");
                    // this.promoterInstance.PromoteToGrp()
                    setTimeout(() => {
                        this.randomChannelReaction();
                    }, 30000);
                    const me = yield this.checkMe();
                    this.tgId = me.id.toString();
                    return this.client;
                }
                else {
                    console.log(`No Session Found: ${this.clientDetails.mobile}`);
                }
            }
            catch (error) {
                console.log("=========Failed To Connect : ", this.clientDetails.mobile, error);
                (0, parseError_1.parseError)(error, (_a = this.clientDetails) === null || _a === void 0 ? void 0 : _a.mobile);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                return this.client;
            }
        });
    }
    updateUsername(baseUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUserName = '';
            let username = (baseUsername && baseUsername !== '') ? baseUsername : '';
            let increment = 0;
            if (username === '') {
                try {
                    const res = yield this.client.invoke(new telegram_1.Api.account.UpdateUsername({ username }));
                    console.log(`Removed Username successfully.`);
                }
                catch (error) {
                    (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error removing username`);
                    console.log(error.errorMessage);
                }
            }
            else {
                while (increment < 10) {
                    try {
                        const result = yield this.client.invoke(new telegram_1.Api.account.CheckUsername({ username }));
                        console.log(result, " - ", username);
                        if (result) {
                            const res = yield this.client.invoke(new telegram_1.Api.account.UpdateUsername({ username }));
                            console.log(`Username '${username}' updated successfully.`);
                            newUserName = username;
                            break;
                        }
                        else {
                            username = baseUsername + increment;
                            increment++;
                            yield (0, Helpers_1.sleep)(2000);
                        }
                    }
                    catch (error) {
                        (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error updating username`);
                        console.log(error.errorMessage);
                        if (error.errorMessage == 'USERNAME_NOT_MODIFIED') {
                            newUserName = username;
                            break;
                        }
                        username = baseUsername + increment;
                        increment++;
                        yield (0, Helpers_1.sleep)(2000);
                    }
                }
            }
            return newUserName;
        });
    }
    handleOtherEvents(ev) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((ev === null || ev === void 0 ? void 0 : ev.className) == "UpdatePhoneCall") {
                    if (this.phoneCall && ((_a = this.phoneCall.participantId) === null || _a === void 0 ? void 0 : _a.toString()) == ((_b = ev.phoneCall.participantId) === null || _b === void 0 ? void 0 : _b.toString())) {
                        console.log(`Phone Call Updated, ${ev.className}`);
                        if (ev.phoneCall.className == "PhoneCallAccepted") {
                            try {
                                const res = yield this.client.invoke(new telegram_1.Api.phone.DiscardCall({
                                    peer: new telegram_1.Api.InputPhoneCall({ id: this.phoneCall.id, accessHash: this.phoneCall.accessHash }),
                                    reason: new telegram_1.Api.PhoneCallDiscardReasonHangup()
                                }));
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                        if (ev.phoneCall.className == "PhoneCallDiscarded") {
                            this.phoneCall = undefined;
                            (0, phonestate_1.destroyPhoneCallState)();
                            // await joinPhoneCall(call.phoneCall.connections, sendSignalingData, true, true, apiUpdate)
                        }
                    }
                    else {
                        // console.log('unknown Phone Call Updated', this.phoneCall, ev.phonecall)
                        if (this.phoneCall) {
                            try {
                                const res = yield this.client.invoke(new telegram_1.Api.phone.DiscardCall({
                                    peer: new telegram_1.Api.InputPhoneCall({ id: this.phoneCall.id, accessHash: this.phoneCall.accessHash }),
                                    reason: new telegram_1.Api.PhoneCallDiscardReasonHangup()
                                }));
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error At HAnling other event");
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    disconnectCall(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.phoneCall)
                return;
            let attempts = 0;
            const maxAttempts = 2;
            while (attempts <= maxAttempts) {
                try {
                    const res = yield this.client.invoke(new telegram_1.Api.phone.DiscardCall({
                        peer: new telegram_1.Api.InputPhoneCall({ id: this.phoneCall.id, accessHash: this.phoneCall.accessHash }),
                        reason: new telegram_1.Api.PhoneCallDiscardReasonHangup()
                    }));
                    this.cleanupCallState();
                    break;
                }
                catch (error) {
                    yield (0, Helpers_1.sleep)(3000);
                    attempts++;
                    if (attempts > maxAttempts) {
                        (0, parseError_1.parseError)(error, "Error at Handling other event");
                        yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                    }
                    else {
                        console.warn(`${this.clientDetails.mobile}: Retrying disconnectCall, attempt ${attempts}`);
                    }
                }
            }
        });
    }
    handleEvents(event) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (event.isPrivate) {
                    if (event.message.text === `exit${(_a = this === null || this === void 0 ? void 0 : this.clientDetails) === null || _a === void 0 ? void 0 : _a.clientId}`) {
                        //console.log(`EXITTING PROCESS!!`);
                        const telegramService = Telegram_service_1.TelegramService.getInstance();
                        yield telegramService.disposeClient(this.clientDetails.mobile);
                    }
                    else {
                        const senderJson = yield this.getSenderJson(event);
                        const broadcastName = senderJson.username ? senderJson.username : senderJson.firstName;
                        const chatId = event.message.chatId.toString();
                        if (!broadcastName.toLowerCase().endsWith('bot') && event.message.chatId.toString() !== "178220800" && event.message.chatId.toString() !== "777000") {
                            const db = dbservice_1.UserDataDtoCrud.getInstance();
                            console.log(`${this.clientDetails.mobile.toUpperCase()}:${broadcastName}-${chatId} :: `, event.message.text);
                            yield (0, utils_1.sendToLogs)({ message: `${this.clientDetails.mobile}\n${broadcastName}: ${event.message.text}`, chatId: process.env.logsChannel2 });
                            try {
                                const db = dbservice_1.UserDataDtoCrud.getInstance();
                                try {
                                    yield event.client.markAsRead(event.chatId);
                                }
                                catch (error) {
                                }
                                const isExist = this.liveMap.get(chatId);
                                this.liveMap.set(chatId, { time: Date.now(), value: true });
                                if (!isExist || (isExist && isExist.time < Date.now() - 120000)) {
                                    if (!(isExist === null || isExist === void 0 ? void 0 : isExist.value)) {
                                        yield this.setTyping(chatId);
                                        yield (0, Helpers_1.sleep)(1500);
                                        try {
                                            yield event.message.respond({ message: `Hii Babyy!! ${this.generateEmojis()}`, linkPreview: true });
                                            yield this.setAudioRecording(chatId);
                                            yield (0, Helpers_1.sleep)(2500);
                                            yield event.message.respond({ message: `This is my official Account!!🔥\n\n\nMsg me **Dear!!👇👇:**\nhttps://t.me/${this.clientDetails.username} ${this.getRandomEmoji()}`, linkPreview: true });
                                            yield this.setVideoRecording(chatId);
                                        }
                                        catch (error) {
                                            if (error instanceof telegram_1.errors.FloodWaitError) {
                                                console.warn(`Client ${this.clientDetails.mobile}: Rate limited. Sleeping for ${error.seconds} seconds.`);
                                            }
                                        }
                                        yield (0, express_1.updateMsgCount)(this.clientDetails.clientId);
                                        this.promoterInstance.incrementMsgCount();
                                    }
                                    else {
                                        try {
                                            yield event.message.respond({ message: `Msg me here **Dear!! ${this.generateEmojis()}👇:**\n\nhttps://t.me/${this.clientDetails.username} ${this.getRandomEmoji()}`, linkPreview: true });
                                            yield this.setVideoRecording(chatId);
                                        }
                                        catch (error) {
                                        }
                                    }
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        const userData = yield db.getUserData(chatId);
                                        if (userData && userData.totalCount > 0) {
                                            console.log(`USer Exist Clearing interval2 ${chatId} ${userData.totalCount} ${userData.firstName}`);
                                            this.liveMap.set(chatId, { time: Date.now(), value: false });
                                        }
                                        else {
                                            console.log(`User Not Exist Calling Now ${chatId}`);
                                            try {
                                                yield event.message.respond({ message: `I am waiting for you Babyy ${this.generateEmojis()}!!\n\n                  👇👇👇👇\n\n\n**@${this.clientDetails.username} @${this.clientDetails.username} ${this.getRandomEmoji()}\n@${this.clientDetails.username} @${this.clientDetails.username} ${this.getRandomEmoji()}**`, linkPreview: true });
                                                yield this.setVideoRecording(chatId);
                                            }
                                            catch (error) {
                                                if (error instanceof telegram_1.errors.FloodWaitError) {
                                                    console.warn(`Client ${this.clientDetails.mobile}: Rate limited. Sleeping for ${error.seconds} seconds.`);
                                                }
                                            }
                                        }
                                    }), 25000);
                                    for (let i = 0; i < 3; i++) {
                                        try {
                                            yield (0, Helpers_1.sleep)(120000);
                                            const userData = yield db.getUserData(chatId);
                                            if (userData && userData.totalCount > 0) {
                                                this.promoterInstance.incrementConvertedCount();
                                                console.log(`USer Exist Clearing interval ${chatId} ${userData.totalCount} ${userData.firstName}`);
                                                this.liveMap.set(chatId, { time: Date.now(), value: false });
                                                break;
                                            }
                                            else {
                                                console.log(`User Not Exist Calling Now ${chatId}`);
                                                yield this.call(chatId);
                                                // await sleep(7000)
                                                // await this.disconnectCall(chatId);
                                                yield (0, Helpers_1.sleep)(10000);
                                                yield this.setVideoRecording(chatId);
                                                yield (0, Helpers_1.sleep)(3000);
                                                yield event.message.respond({ message: `**   Message Now Baby!!${this.generateEmojis()}**\n\n                  👇👇\n\n\nhttps://t.me/${this.clientDetails.username} ${this.getRandomEmoji()}`, linkPreview: true });
                                            }
                                        }
                                        catch (error) {
                                            // console.log("Failed to Call")
                                            (0, parseError_1.parseError)(error, `failed to Call ; ${chatId}`, false);
                                            yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                                        }
                                        //todo
                                        // if(i==2){
                                        //     fetchWithTimeout(`${process.env.repl}/sendMessage`)
                                        // }
                                    }
                                    this.liveMap.set(chatId, { time: Date.now(), value: false });
                                }
                            }
                            catch (error) {
                                console.log("Error in responding");
                            }
                        }
                        else {
                            if (event.message.chatId.toString() == "178220800") {
                                console.log(`${this.clientDetails.mobile.toUpperCase()}:: ${broadcastName} :: `, event.message.text);
                                if (event.message.text.toLowerCase().includes('automatically released')) {
                                    const date = event.message.text.split("limited until ")[1].split(",")[0];
                                    const days = (0, utils_1.getdaysLeft)(date);
                                    console.log("Days Left: ", days);
                                    this.promoterInstance.setDaysLeft(days);
                                    yield (0, utils_1.sendToLogs)({ message: `Limited :  ${this.clientDetails.mobile} as daysLeft : ${this.promoterInstance.daysLeft}`, chatId: process.env.logsChannel2 });
                                    // if (days == 3) {
                                    // this.promoterInstance.setChannels(openChannels)
                                    // }
                                }
                                else if (event.message.text.toLowerCase().includes('good news')) {
                                    this.promoterInstance.setDaysLeft(-1);
                                    yield (0, utils_1.sendToLogs)({ message: `Health is Good :  ${this.clientDetails.mobile} as daysLeft : ${this.promoterInstance.daysLeft}`, chatId: process.env.logsChannel2 });
                                }
                                else if (event.message.text.toLowerCase().includes('can trigger a harsh')) {
                                    // this.promoterInstance.setChannels(openChannels)
                                    this.promoterInstance.setDaysLeft(99);
                                    yield (0, utils_1.sendToLogs)({ message: `Limited :  ${this.clientDetails.mobile} as daysLeft : ${this.promoterInstance.daysLeft}`, chatId: process.env.logsChannel2 });
                                }
                                yield (0, express_1.updatePromoteClient)(this.clientDetails.clientId, { daysLeft: this.promoterInstance.daysLeft });
                                if (this.promoterInstance.daysLeft > 3 && (this.lastResetTime < Date.now() - 30 * 60 * 1000)) {
                                    this.lastResetTime = Date.now();
                                    try {
                                        const db = dbservice_1.UserDataDtoCrud.getInstance();
                                        const existingClients = yield db.getClients();
                                        const promoteMobiles = [];
                                        for (const existingClient of existingClients) {
                                            promoteMobiles.push(existingClient.promoteMobile);
                                        }
                                        const today = (new Date(Date.now())).toISOString().split('T')[0];
                                        const query = { availableDate: { $lte: today }, channels: { $gt: 350 }, mobile: { $nin: promoteMobiles } };
                                        const newPromoteClient = yield db.findPromoteClient(query);
                                        if (newPromoteClient) {
                                            yield (0, utils_1.sendToLogs)({ message: `Setting up new client for :  ${this.clientDetails.clientId} as days : ${this.promoterInstance.daysLeft}`, chatId: process.env.logsChannel2 });
                                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${this.clientDetails.clientId.toUpperCase()}-PROM Changed Number from ${this.clientDetails.mobile} to ${newPromoteClient.mobile}`);
                                            yield db.pushPromoteMobile({ clientId: this.clientDetails.clientId }, newPromoteClient.mobile);
                                            yield db.deletePromoteClient({ mobile: newPromoteClient.mobile });
                                            yield this.deleteProfilePhotos();
                                            yield (0, Helpers_1.sleep)(1500);
                                            yield this.updatePrivacyforDeletedAccount();
                                            yield (0, Helpers_1.sleep)(1500);
                                            yield this.updateUsername('');
                                            yield (0, Helpers_1.sleep)(1500);
                                            yield this.updateProfile('Deleted Account', '');
                                            yield (0, Helpers_1.sleep)(1500);
                                            const availableDate = (new Date(Date.now() + ((this.promoterInstance.daysLeft + 1) * 24 * 60 * 60 * 1000))).toISOString().split('T')[0];
                                            console.log("Today: ", today, "Available Date: ", availableDate);
                                            yield db.createPromoteClient({
                                                availableDate,
                                                channels: 30,
                                                lastActive: today,
                                                mobile: this.clientDetails.mobile,
                                                tgId: this.tgId
                                            });
                                            yield db.pullPromoteMobile({ clientId: this.clientDetails.clientId }, this.clientDetails.mobile);
                                            console.log(this.clientDetails.mobile, " - New Promote Client: ", newPromoteClient);
                                            const telegramService = Telegram_service_1.TelegramService.getInstance();
                                            yield telegramService.disposeClient(this.clientDetails.mobile);
                                        }
                                    }
                                    catch (error) {
                                        (0, parseError_1.parseError)(error, "Error Handling Message Event");
                                        yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                                    }
                                }
                            }
                            // if (this.daysLeft > 0) {
                            //     await sendToLogs({ message: `${this.clientDetails.mobile}\nDaysLeft: ${this.daysLeft}` });
                            // }
                            if (event.message.chatId.toString() == "777000") {
                                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${process.env.clientId}-PROM-${this.clientDetails.mobile}:\n${event.message.text}`)}`);
                                if (event.message.text.toLowerCase().includes('login code')) {
                                    yield this.removeOtherAuths();
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        try {
                                            const result = yield event.client.invoke(new telegram_1.Api.account.DeclinePasswordReset());
                                        }
                                        catch (error) {
                                            (0, parseError_1.parseError)(error, "Error at DeclinePasswordReset");
                                        }
                                    }), 5 * 60 * 1000);
                                }
                                if (event.message.text.toLowerCase().includes('request to reset account')) {
                                    yield (0, Helpers_1.sleep)(2000);
                                    try {
                                        const result = yield event.client.invoke(new telegram_1.Api.account.DeclinePasswordReset());
                                    }
                                    catch (error) {
                                        (0, parseError_1.parseError)(error, "Error at DeclinePasswordReset");
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    // await this.reactorInstance?.react(event, this.clientDetails.mobile);
                    (0, connection_1.setSendPing)(true);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "SomeError Parsing Msg");
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    updateProfilePics() {
        return __awaiter(this, void 0, void 0, function* () {
            let tempFiles = [];
            try {
                yield this.deleteProfilePhotos();
                yield (0, Helpers_1.sleep)(2000);
                const filepath = yield (0, utils_1.saveFile)(`https://promoteclients2.glitch.me/folders/${(0, utils_1.removeNumbersFromString)(this.clientDetails.clientId).toLowerCase()}/files/dp1.jpg?temp=true`, this.clientDetails.clientId);
                tempFiles.push(filepath);
                yield this.updateProfilePic(filepath);
                yield (0, Helpers_1.sleep)(2000);
                const filepath2 = yield (0, utils_1.saveFile)(`https://promoteclients2.glitch.me/folders/${(0, utils_1.removeNumbersFromString)(this.clientDetails.clientId).toLowerCase()}/files/dp2.jpg?temp=true`, this.clientDetails.clientId);
                tempFiles.push(filepath2);
                yield this.updateProfilePic(filepath2);
                console.log(`${this.clientDetails.clientId}: Uploaded Pic`);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error updating profile pictures`);
            }
            finally {
                // Cleanup temporary files
                for (const file of tempFiles) {
                    try {
                        fs.unlinkSync(file);
                    }
                    catch (error) {
                        console.warn(`Failed to delete temporary file ${file}:`, error);
                    }
                }
            }
        });
    }
    removeOtherAuths() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkingAuths) {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: Already Checking Auths`)}`);
                return;
            }
            this.checkingAuths = true;
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}: Inited Checking Auths`)}`);
            try {
                for (let i = 60; i > 0; i--) {
                    const result = yield this.client.invoke(new telegram_1.Api.account.GetAuthorizations());
                    for (const auth of result.authorizations) {
                        if (this.isAuthMine(auth)) {
                            continue;
                        }
                        try {
                            yield this.client.invoke(new telegram_1.Api.account.ResetAuthorization({ hash: auth.hash }));
                            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`@${(process.env.clientId).toUpperCase()}-PROM- ${this.clientDetails.mobile}: New AUTH Removed- ${auth.appName}|${auth.country}|${auth.deviceModel}`)}`);
                            this.checkingAuths = false;
                            return auth;
                        }
                        catch (error) {
                            console.warn(`Failed to remove auth: ${auth.appName}`, error);
                        }
                    }
                    yield (0, Helpers_1.sleep)(3500);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Failed to remove auth`);
            }
            finally {
                this.checkingAuths = false;
            }
        });
    }
    updatePrivacyforDeletedAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyPhoneCall(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueDisallowAll()
                    ],
                }));
                console.log("Calls Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyProfilePhoto(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueAllowAll()
                    ],
                }));
                console.log("PP Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyPhoneNumber(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueDisallowAll()
                    ],
                }));
                console.log("Number Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyStatusTimestamp(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueDisallowAll()
                    ],
                }));
                console.log("LAstSeen Updated");
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to update Privacy");
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    updatePrivacy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyPhoneCall(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueDisallowAll()
                    ],
                }));
                console.log("Calls Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyProfilePhoto(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueAllowAll()
                    ],
                }));
                console.log("PP Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyForwards(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueAllowAll()
                    ],
                }));
                console.log("forwards Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyPhoneNumber(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueDisallowAll()
                    ],
                }));
                console.log("Number Updated");
                yield this.client.invoke(new telegram_1.Api.account.SetPrivacy({
                    key: new telegram_1.Api.InputPrivacyKeyStatusTimestamp(),
                    rules: [
                        new telegram_1.Api.InputPrivacyValueAllowAll(),
                    ],
                }));
                console.log("LAstSeen Updated");
                // await this.client.invoke(
                //     new Api.account.SetPrivacy({
                //         key: new Api.InputPrivacyKeyAbout(),
                //         rules: [
                //             new Api.InputPrivacyValueAllowAll()
                //         ],
                //     })
                // );
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to update Privacy");
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    getSenderJson(event) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const defaultSender = {
                firstName: "DefaultUser",
                username: null,
                accessHash: null,
                lastName: ''
            };
            try {
                const senderObj = yield event.message.getSender();
                if (senderObj) {
                    return yield (senderObj === null || senderObj === void 0 ? void 0 : senderObj.toJSON());
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${(_a = this.clientDetails) === null || _a === void 0 ? void 0 : _a.mobile} || ${this.clientDetails.mobile}`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
            return defaultSender;
        });
    }
    getMediaUrl(message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.media)
                return null;
            try {
                if (message.media instanceof telegram_1.Api.MessageMediaPhoto) {
                    const photo = message.photo;
                    const sizes = (photo === null || photo === void 0 ? void 0 : photo.sizes) || [1];
                    return yield this.client.downloadMedia(message, { thumb: sizes[1] ? sizes[1] : sizes[0] });
                }
                if (message.media instanceof telegram_1.Api.MessageMediaDocument &&
                    ((_a = message.document) === null || _a === void 0 ? void 0 : _a.mimeType) &&
                    (message.document.mimeType.startsWith('video') || message.document.mimeType.startsWith('image'))) {
                    const sizes = ((_b = message.document) === null || _b === void 0 ? void 0 : _b.thumbs) || [1];
                    return yield this.client.downloadMedia(message, { thumb: sizes[1] ? sizes[1] : sizes[0] });
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error downloading media`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                return null;
            }
            return null;
        });
    }
    checkMe() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const me = yield this.getMe();
                if (me.firstName !== this.clientDetails.name) {
                    yield this.updateProfile(this.clientDetails.name, `Main Ac👉 @${this.clientDetails.username.toUpperCase()}`);
                    yield (0, Helpers_1.sleep)(2000);
                    yield this.updateProfilePics();
                    yield (0, Helpers_1.sleep)(2000);
                    yield this.updatePrivacy();
                }
                const fullUser = yield this.client.invoke(new telegram_1.Api.users.GetFullUser({
                    id: me.id, // Pass the current user's input peer
                }));
                if (fullUser.fullUser.about !== `Main Ac👉 @${this.clientDetails.username.toUpperCase()}`) {
                    console.log("updating About");
                    yield this.updateProfile(this.clientDetails.name, `Main Ac👉 @${this.clientDetails.username.toUpperCase()}`);
                    yield this.checkProfilePics();
                    yield (0, Helpers_1.sleep)(2000);
                    yield this.updatePrivacy();
                }
                return me;
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.name} - prom`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    checkProfilePics() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.invoke(new telegram_1.Api.photos.GetUserPhotos({
                    userId: "me"
                }));
                // console.log(`Profile Pics found: ${result.photos.length}`)
                if (result && ((_a = result.photos) === null || _a === void 0 ? void 0 : _a.length) < 2) {
                    // await this.deleteProfilePhotos();
                    // await sleep(2000);
                    // const filepath = await saveFile(process.env.img, this.clientDetails.clientId);
                    // console.log("FilePath :", filepath)
                    // await this.updateProfilePic(filepath);
                    yield this.updateProfilePics();
                    console.log(`${this.clientDetails.clientId}: Uploaded Pic`);
                }
                else {
                    console.log(`${this.clientDetails.clientId}: Profile pics exist`);
                }
                // console.log("Updated profile Photos");
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${(_b = this.clientDetails) === null || _b === void 0 ? void 0 : _b.clientId} || ${this.clientDetails.mobile}`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    joinChannel(entity) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.invoke(new telegram_1.Api.channels.JoinChannel({
                    channel: yield ((_b = this.client) === null || _b === void 0 ? void 0 : _b.getEntity(entity))
                })));
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `Failed to Join channel`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            const me = yield this.client.getMe();
            return me;
        });
    }
    updateProfilePic(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield this.client.uploadFile({
                    file: new uploads_1.CustomFile('pic.jpg', fs.statSync(image).size, image),
                    workers: 1,
                });
                //console.log("file uploaded")
                yield this.client.invoke(new telegram_1.Api.photos.UploadProfilePhoto({
                    file: file,
                }));
                console.log("profile pic updated");
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to update profile picture");
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    updateProfile(firstName, about) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { lastName: "" };
            if (firstName !== undefined)
                data.firstName = firstName;
            if (about !== undefined)
                data.about = about;
            try {
                const result = yield this.client.invoke(new telegram_1.Api.account.UpdateProfile(data));
                if (result) {
                    console.log(`${this.clientDetails.mobile}: Updated profile name:`, firstName);
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to update profile");
            }
        });
    }
    setTyping(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.invoke(new telegram_1.Api.messages.SetTyping({
                    peer: chatId,
                    action: new telegram_1.Api.SendMessageTypingAction(),
                }));
                yield (0, Helpers_1.sleep)(2000);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, 'Cannot set Typing');
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    setVideoRecording(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.invoke(new telegram_1.Api.messages.SetTyping({
                    peer: chatId,
                    action: new telegram_1.Api.SendMessageRecordVideoAction(),
                }));
                yield (0, Helpers_1.sleep)(2000);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, 'Cannot set Video Recording');
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    setAudioRecording(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.invoke(new telegram_1.Api.messages.SetTyping({
                    peer: chatId,
                    action: new telegram_1.Api.SendMessageRecordAudioAction(),
                }));
                yield (0, Helpers_1.sleep)(2000);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, 'Cannot set Audio Recording');
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    deleteProfilePhotos() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.invoke(new telegram_1.Api.photos.GetUserPhotos({
                    userId: "me"
                }));
                console.log(`${this.clientDetails.mobile}: Profile Pics found: ${result.photos.length}`);
                if (result && ((_a = result.photos) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    const res = yield this.client.invoke(new telegram_1.Api.photos.DeletePhotos({
                        id: result.photos
                    }));
                }
                console.log("Deleted profile Photos", result.photos.length);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to delete profile photos");
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
            }
        });
    }
    getMessagesNew(chatId, offset, minId, limit = 15) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { limit };
                if (offset) {
                    query.offsetId = parseInt(offset.toString());
                }
                if (minId) {
                    query.minId = parseInt(minId.toString()) + 1;
                }
                const messages = yield this.client.getMessages(chatId, query);
                return yield Promise.all(messages.map((message) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c;
                    const media = message.media
                        ? {
                            type: message.media.className.includes('video') ? 'video' : 'photo',
                            thumbnailUrl: yield this.getMediaUrl(message),
                        }
                        : null;
                    return {
                        id: message.id,
                        message: message.message,
                        date: message === null || message === void 0 ? void 0 : message.date,
                        sender: {
                            id: (_b = (_a = message.senderId) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '',
                            is_self: (_c = message.out) !== null && _c !== void 0 ? _c : false,
                            username: message.fromId ? message.fromId.toString() : null,
                        },
                        media,
                    };
                })));
            }
            catch (error) {
                (0, parseError_1.parseError)(error, `${this.clientDetails.mobile}: Error fetching messages`);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                return [];
            }
        });
    }
    isAuthMine(auth) {
        const authCriteria = [
            { field: 'country', value: 'singapore' },
            { field: 'deviceModel', values: ['oneplus 11', 'cli', 'linux', 'windows'] },
            { field: 'appName', values: ['likki', 'rams', 'sru', 'shru', 'hanslnz'] }
        ];
        return authCriteria.some(criterion => {
            if ('values' in criterion) {
                return criterion.values.some(value => auth[criterion.field].toLowerCase().includes(value.toLowerCase()));
            }
            return auth[criterion.field].toLowerCase().includes(criterion.value.toLowerCase());
        });
    }
    getRandomEmoji() {
        const emojiCategories = {
            reactions: ["🔥", "💋", "👅", "🍆", "💋", "🙈", "👅", "🍑", "💦", "😚", "😏", "🥕", "🥖"]
        };
        const selectedCategory = emojiCategories.reactions;
        return selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
    }
    generateEmojis() {
        return this.getRandomEmoji() + this.getRandomEmoji();
    }
    call(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            let callTimeoutHandle;
            if (!this.validateConnectionState() || this.phoneCall) {
                console.log(`${this.clientDetails.mobile}: Cannot initiate call - invalid state or call in progress`);
                return;
            }
            try {
                (0, phonestate_1.createPhoneCallState)();
                const dhConfig = yield this.client.invoke(new telegram_1.Api.messages.GetDhConfig({}));
                const gAHash = yield (0, phonestate_1.requestPhoneCall)(dhConfig);
                const result = yield this.client.invoke(new telegram_1.Api.phone.RequestCall({
                    video: true,
                    userId: chatId,
                    randomId: (0, phonestate_1.generateRandomInt)(),
                    gAHash: Buffer.from(gAHash),
                    protocol: new telegram_1.Api.PhoneCallProtocol({
                        udpP2p: true,
                        udpReflector: true,
                        minLayer: 65,
                        maxLayer: 105,
                        libraryVersions: ['2.4.4', '4.0.0']
                    }),
                }));
                if (result === null || result === void 0 ? void 0 : result.phoneCall) {
                    this.phoneCall = result.phoneCall;
                    // Set timeout to automatically cleanup call
                    callTimeoutHandle = setTimeout(() => {
                        var _a;
                        if (((_a = this.phoneCall) === null || _a === void 0 ? void 0 : _a.id) === result.phoneCall.id) {
                            this.disconnectCall(this.phoneCall.id.toString())
                                .catch(error => {
                                console.error(`${this.clientDetails.mobile}: Error in call auto-cleanup:`, error);
                                this.cleanupCallState(); // Force cleanup on error
                            });
                        }
                    }, 20000);
                }
            }
            catch (error) {
                this.cleanupCallState();
                if (error instanceof telegram_1.errors.FloodWaitError) {
                    console.warn(`${this.clientDetails.mobile}: Call rate limited for ${error.seconds} seconds`);
                    return;
                }
                (0, parseError_1.parseError)(error, "Failed to Call", false);
                yield (0, utils_1.startNewUserProcess)(error, this.clientDetails.mobile);
                try {
                    const errorMessage = error instanceof Error && error.message === 'USER_PRIVACY_RESTRICTED'
                        ? "Change Your Call Settings\n\nPrivacy Settings... I'm unable to call..!!"
                        : "Some issue at your side, I'm unable to call..!!";
                    yield this.client.sendMessage(chatId, { message: errorMessage });
                }
                catch (msgError) {
                    (0, parseError_1.parseError)(msgError, `${this.clientDetails.mobile}: Failed to send message on failed call`, false);
                }
            }
            finally {
                // Clear timeout if it exists and hasn't fired yet
                if (callTimeoutHandle) {
                    clearTimeout(callTimeoutHandle);
                }
            }
        });
    }
    cleanupCallState() {
        if (this.phoneCall) {
            try {
                this.disconnectCall(this.phoneCall.id.toString())
                    .catch(error => console.warn(`${this.clientDetails.mobile}: Error disconnecting call during cleanup:`, error));
            }
            finally {
                this.phoneCall = undefined;
                (0, phonestate_1.destroyPhoneCallState)();
            }
        }
    }
}
exports["default"] = TelegramManager;


/***/ }),

/***/ "./src/Utilities/memory-cleanup.ts":
/*!*****************************************!*\
  !*** ./src/Utilities/memory-cleanup.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemoryCleanupService = void 0;
class MemoryCleanupService {
    constructor(config) {
        this.monitorAndCleanup = () => {
            const mem = process.memoryUsage();
            const heapUsedMB = mem.heapUsed / 1024 / 1024;
            console.log(`🧠 Heap Used: ${heapUsedMB.toFixed(2)} MB`);
            if (heapUsedMB > this.memoryLimitMB) {
                console.warn(`🚨 Heap exceeded ${this.memoryLimitMB} MB. Cleaning up...`);
                this.cleanupMemory();
            }
        };
        this.memoryLimitMB = (config === null || config === void 0 ? void 0 : config.memoryLimitMB) || 100; // Default to 100MB
        this.checkIntervalMs = (config === null || config === void 0 ? void 0 : config.checkIntervalMs) || 300000; // Default to 5 minutes
    }
    static getInstance(config = {}) {
        if (!MemoryCleanupService.instance) {
            MemoryCleanupService.instance = new MemoryCleanupService(config);
        }
        return MemoryCleanupService.instance;
    }
    static resetInstance() {
        if (MemoryCleanupService.instance) {
            MemoryCleanupService.instance.stopMonitoring();
            MemoryCleanupService.instance = null;
        }
    }
    updateConfig(config) {
        if (config.memoryLimitMB !== undefined) {
            this.memoryLimitMB = config.memoryLimitMB;
        }
        if (config.checkIntervalMs !== undefined) {
            this.checkIntervalMs = config.checkIntervalMs;
        }
        if (this.intervalId) {
            this.stopMonitoring();
            this.startMonitoring();
        }
    }
    getMemoryUsageInMB() {
        const mem = process.memoryUsage();
        return {
            rss: (mem.rss / 1024 / 1024).toFixed(2),
            heapUsed: (mem.heapUsed / 1024 / 1024).toFixed(2),
            heapTotal: (mem.heapTotal / 1024 / 1024).toFixed(2),
            external: (mem.external / 1024 / 1024).toFixed(2),
        };
    }
    cleanupMemory() {
        if (typeof global.gc === 'function') {
            global.gc();
            console.log('✅ Manual GC triggered via global.gc()');
        }
        else {
            console.warn('⚠️ GC not available. Start Node with --expose-gc');
        }
        const mem = this.getMemoryUsageInMB();
        console.log(`🧹 Memory After Cleanup: ${JSON.stringify(mem)}`);
    }
    startMonitoring() {
        if (this.intervalId) {
            console.warn('Memory monitoring is already running');
            return;
        }
        console.log(`Starting memory monitoring (limit: ${this.memoryLimitMB}MB, interval: ${this.checkIntervalMs}ms)`);
        this.intervalId = setInterval(this.monitorAndCleanup, this.checkIntervalMs);
        // Run initial check
        this.monitorAndCleanup();
    }
    stopMonitoring() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            console.log('Memory monitoring stopped');
        }
    }
    forceCleanup() {
        this.cleanupMemory();
    }
    getCurrentMemoryStats() {
        return this.getMemoryUsageInMB();
    }
}
exports.MemoryCleanupService = MemoryCleanupService;
MemoryCleanupService.instance = null;


/***/ }),

/***/ "./src/connection.ts":
/*!***************************!*\
  !*** ./src/connection.ts ***!
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
exports.connectionState = exports.setSendPing = void 0;
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/fetchWithTimeout.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const express_1 = __webpack_require__(/*! ./express */ "./src/express.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
const CONFIG = {
    RETRY_INTERVAL: 120000,
    INITIAL_DELAY: 20000,
    MAX_RETRIES: 5,
    FETCH_TIMEOUT: 100000,
};
const connectionState = {
    retryCount: 0,
    isPinging: false,
};
exports.connectionState = connectionState;
function setSendPing(value) {
    const prevState = connectionState.isPinging;
    connectionState.isPinging = value;
}
exports.setSendPing = setSendPing;
function pingServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${process.env.promoteChecker}/receive?clientId=${process.env.clientId}`;
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
    });
}
function sendAlert(message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[Connection] Sending Request: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`);
        const url = `${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(message)}`;
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
    });
}
function checkProcessHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('[Connection] Initiating connection request');
        const url = `${process.env.promoteChecker}/promoteconnect/${express_1.prcessID}?clientId=${process.env.clientId}`;
        const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(url);
        const isHealthy = Boolean(response === null || response === void 0 ? void 0 : response.data);
        return isHealthy;
    });
}
function retryConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (connectionState.isPinging) {
            try {
                yield pingServer();
                connectionState.retryCount = 0;
            }
            catch (error) {
                console.log('[Connection] Ping failed:', error);
                (0, parseError_1.parseError)(error, "Cannot fetch pinger:");
            }
        }
        else {
            connectionState.retryCount++;
            console.log(`[Connection] Increment retry count to ${connectionState.retryCount}/${CONFIG.MAX_RETRIES}`);
            if (connectionState.retryCount > CONFIG.MAX_RETRIES) {
                console.log('[Connection] Max retries exceeded, initiating shutdown');
                const message = `${process.env.clientId.toUpperCase()}:UNABLE TO START at RETRY - EXITTING\n\nIP:${yield (0, express_1.getPublicIP)()}\n\nenv: ${process.env.clientId}`;
                yield sendAlert(message);
                process.exit(1);
            }
            try {
                const shouldContinue = yield checkProcessHealth();
                if (!shouldContinue) {
                    console.log('[Connection] Health check failed, initiating shutdown');
                    const message = `${process.env.clientId.toUpperCase()}:UNKNOWNPROCESS - EXITTING\n\nIP:${yield (0, express_1.getPublicIP)()}-${__dirname}\n\nenv: ${process.env.clientId}`;
                    yield sendAlert(message);
                    process.exit(1);
                }
            }
            catch (error) {
                console.error('[Connection] Health check error:', error);
            }
        }
    });
}
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    yield retryConnection();
    setInterval(retryConnection, CONFIG.RETRY_INTERVAL);
}), CONFIG.INITIAL_DELAY);


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
exports.UserDataDtoCrud = void 0;
const mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
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
                console.log('trying to connect to DB......', process.env.mongodburi);
                try {
                    this.client = yield mongodb_1.MongoClient.connect(process.env.mongodburi, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb_1.ServerApiVersion.v1, maxPoolSize: 10 });
                    console.log('Connected to MongoDB');
                    this.isConnected = true;
                    this.activeChannelDb = this.client.db("tgclients").collection('activeChannels');
                    this.promoteStatsDb = this.client.db("tgclients").collection('promoteStats');
                    yield this.getClients();
                    this.client.on('close', () => {
                        console.log('MongoDB connection closed.');
                        this.isConnected = false;
                    });
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
    getUserData(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDataCollection = yield this.client.db("tgclients").collection('userData');
            const result = yield userDataCollection.findOne({ chatId, profile: process.env.dbcoll });
            if (result) {
                return result;
            }
            else {
                return undefined;
            }
        });
    }
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.client.db("tgclients").collection('clients').find({}).toArray();
            clients.forEach(clt => {
                this.clients = Object.assign(this.clients, { [clt.dbcoll]: clt });
            });
            return clients;
        });
    }
    readPromoteStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.promoteStatsDb.findOne({ "client": "shruthi1" });
            return result.channels.slice(0, 200);
        });
    }
    updateActiveChannel(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            delete data["_id"];
            return yield this.activeChannelDb.updateOne(filter, {
                $set: Object.assign({}, data),
            }, { upsert: true, returnDocument: 'after' });
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
    closeConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isConnected) {
                    this.isConnected = false;
                    console.log('MongoDB connection closed.');
                }
                yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.close());
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error Closing Connection");
            }
        });
    }
    removeFromAvailableMsgs(filter, valueToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.activeChannelDb.updateOne(filter, { $pull: { availableMsgs: valueToRemove } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "RemoveChannelMsgErr");
            }
        });
    }
    addToAvailableMsgs(filter, valueToAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.activeChannelDb.updateOne(filter, { $addToSet: { availableMsgs: valueToAdd } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "AddChannelMsgErr");
            }
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
    pushPromoteMobile(filter, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDb = this.client.db("tgclients").collection('clients');
                return yield clientsDb.updateOne(filter, { $addToSet: { promoteMobile: mobile } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error pushing mobile to promoteMobile");
            }
        });
    }
    pullPromoteMobile(filter, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDb = this.client.db("tgclients").collection('clients');
                return yield clientsDb.updateOne(filter, { $pull: { promoteMobile: mobile } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error pulling mobile from promoteMobile");
            }
        });
    }
    getClient(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.client.db("tgclients").collection('clients').findOne(filter);
            return client;
        });
    }
    updatePromoteClientStat(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.updateOne(filter, { $set: data });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error updating Client stat");
            }
        });
    }
    getPromoteClientStat() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return (yield promoteClientStatDb.findOne({ clientId: process.env.clientId }));
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error getting Client stats");
            }
        });
    }
    getPromoteClientStats() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.find({}).sort({ messageCount: -1, successCount: -1, daysLeft: 1 }).toArray();
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error getting Client stats");
            }
        });
    }
    increaseMsgCount(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.updateOne({ clientId }, { $inc: { messageCount: 1 } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error increasing message count");
            }
        });
    }
    increaseSuccessCount(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.updateOne({ clientId }, { $inc: { successCount: 1 } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error increasing success count");
            }
        });
    }
    increaseFailedCount(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.updateOne({ clientId }, { $inc: { failedCount: 1 } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error increasing failed count");
            }
        });
    }
    increaseReactCount(clientId, number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.updateOne({ clientId }, { $inc: { reactCount: number } });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error increasing react count");
            }
        });
    }
    resetPromoteClientStats() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoteClientStatDb = this.client.db("tgclients").collection('promoteClientStats');
                return yield promoteClientStatDb.updateMany({}, {
                    $set: {
                        "successCount": 0,
                        "failedCount": 0,
                        "messageCount": 0,
                        "daysLeft": 0,
                        "lastStarted": (0, utils_1.formatDateTime)(new Date()),
                        "reactCount": 0
                    }
                });
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error resetting Client stats");
            }
        });
    }
    findPromoteClient(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDb = this.client.db("tgclients").collection('promoteClients');
                return yield clientsDb.findOne(filter);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error getting Client");
            }
        });
    }
    deletePromoteClient(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDb = this.client.db("tgclients").collection('promoteClients');
                return yield clientsDb.deleteOne(filter);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error deleting Client");
            }
        });
    }
    createPromoteClient(clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDb = this.client.db("tgclients").collection('promoteClients');
                const newClient = {
                    _id: new mongodb_1.ObjectId(),
                    tgId: clientData.tgId,
                    mobile: clientData.mobile,
                    lastActive: clientData.lastActive,
                    availableDate: clientData.availableDate,
                    channels: clientData.channels,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                const result = yield clientsDb.insertOne(newClient);
                return Object.assign({ _id: result.insertedId }, newClient);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error creating Promote Client");
            }
        });
    }
    updateTimestamps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.client) {
                    const collection = this.client.db("tgclients").collection('timestamps');
                    const result = yield collection.updateOne({}, { $set: { [`${process.env.clientId}_prom`]: Date.now() } }, { upsert: true });
                    return result;
                }
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Error updating timestamps");
            }
        });
    }
}
exports.UserDataDtoCrud = UserDataDtoCrud;


/***/ }),

/***/ "./src/express.ts":
/*!************************!*\
  !*** ./src/express.ts ***!
  \************************/
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
exports.restartClient = exports.updatePromoteClient = exports.updateMsgCount = exports.updateFailedCount = exports.updateSuccessCount = exports.getClientDetails = exports.getMapKeys = exports.getMapValues = exports.checkHealth = exports.prcessID = exports.getPublicIP = void 0;
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/fetchWithTimeout.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const connection_1 = __webpack_require__(/*! ./connection */ "./src/connection.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const schedule = __importStar(__webpack_require__(/*! node-schedule-tz */ "node-schedule-tz"));
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const Telegram_service_1 = __webpack_require__(/*! ./Telegram.service */ "./src/Telegram.service.ts");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const reaction_utils_1 = __webpack_require__(/*! ./reaction.utils */ "./src/reaction.utils.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
const memory_cleanup_1 = __webpack_require__(/*! ./Utilities/memory-cleanup */ "./src/Utilities/memory-cleanup.ts");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
let canTry2 = true;
memory_cleanup_1.MemoryCleanupService.getInstance().startMonitoring();
function exitHandler(options, exitCode) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("exitOptions: ", options);
            // Attempt to close DB connection
            try {
                yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
            }
            catch (err) {
                console.error("Error closing DB connection:", err);
            }
            // Attempt to disconnect Telegram clients
            try {
                yield Telegram_service_1.TelegramService.getInstance().disconnectAll();
            }
            catch (err) {
                console.error("Error disconnecting Telegram clients:", err);
            }
            // Stop memory monitoring
            try {
                memory_cleanup_1.MemoryCleanupService.getInstance().stopMonitoring();
            }
            catch (err) {
                console.error("Error stopping memory monitoring:", err);
            }
            // Notify exit
            try {
                yield axios_1.default.get(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()}-PROM:ExitHandler | pid - ${process.pid} | code - ${exitCode}| options: ${JSON.stringify(options)}`)}`);
            }
            catch (err) {
                console.error("Error sending exit notification:", err.code);
            }
        }
        catch (err) {
            console.error("Error in exitHandler:", err);
        }
        finally {
            process.exit(typeof exitCode === 'number' ? exitCode : 1);
        }
    });
}
function earlyFlushMiddleware(req, res, next) {
    if (typeof res.flush === 'function') {
        res.flush();
    }
    next();
}
// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, {}));
process.on('SIGQUIT', exitHandler.bind(null, {}));
process.on('SIGHUP', exitHandler.bind(null, {}));
process.on('SIGUSR1', exitHandler.bind(null, {}));
process.on('SIGUSR2', exitHandler.bind(null, {}));
process.on('SIGTERM', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('------------An uncaught exception occurred:', err);
    try {
        if (JSON.stringify(err).includes('MongoPoolClearedError')) {
            yield (dbservice_1.UserDataDtoCrud.getInstance()).closeConnection();
            setTimeout(() => {
                dbservice_1.UserDataDtoCrud.getInstance().connect();
            }, 15000);
        }
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(_a = (process.env.clientId)) === null || _a === void 0 ? void 0 : _a.toUpperCase()}: UNCAUGHT - ${err}`)}`);
    }
    catch (error) {
        console.log(error);
    }
}));
process.on('unhandledRejection', (reason, promise) => __awaiter(void 0, void 0, void 0, function* () {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    try {
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}-Prom : UNHANDLED - ${(0, parseError_1.parseError)(reason, "Unhandled Rejection", false).message}`)}`);
    }
    catch (error) {
        console.log(error);
    }
}));
setInterval(() => {
    checkHealth();
}, 5 * 60 * 1000);
schedule.scheduleJob('test3', '25 0 * * *', 'Asia/Kolkata', () => __awaiter(void 0, void 0, void 0, function* () {
    const db = dbservice_1.UserDataDtoCrud.getInstance();
    const totalStat = yield db.getPromoteClientStat();
    delete totalStat['_id'];
    delete totalStat["clientId"];
    delete totalStat["service"];
    delete totalStat["daysLeft"];
    const mobileStats = Telegram_service_1.TelegramService.getInstance().getMobileStats();
    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}-Prom\n${JSON.stringify(totalStat, null, 4)}\n\n${JSON.stringify(mobileStats, null, 4)}`)}`);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.resetPromoteClientStats();
        Telegram_service_1.TelegramService.getInstance().resetMobileStats();
    }), 30000);
}));
// schedule.scheduleJob('test3', '25 0 */3 * *', 'Asia/Kolkata', async () => {
// TelegramService.getInstance().resetPromotionResults();
// });
let ip = null;
const getPublicIP = () => __awaiter(void 0, void 0, void 0, function* () {
    if (ip)
        return ip;
    try {
        const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)('https://api.ipify.org?format=json');
        console.log(`Your public IP address is: ${response.data.ip}`);
        ip = response.data.ip;
    }
    catch (error) {
        console.error('Error fetching the public IP address:', error.message);
    }
});
exports.getPublicIP = getPublicIP;
(0, exports.getPublicIP)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(earlyFlushMiddleware);
app.use((0, cors_1.default)());
exports.prcessID = Math.floor(Math.random() * 123);
console.log("ProcessID: ", exports.prcessID);
app.use(express_1.default.json());
// Middleware to track the last received request timestamp and store it in the database
const trackLastRequestMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
app.use(trackLastRequestMiddleware);
const clientsMap = new Map();
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.get('/ip', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, exports.getPublicIP)());
}));
app.get('/getClients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield getALLClients());
}));
app.get('/getstats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = dbservice_1.UserDataDtoCrud.getInstance();
    const totalStat = yield db.getPromoteClientStat();
    delete totalStat['_id'];
    delete totalStat["clientId"];
    delete totalStat["service"];
    delete totalStat["daysLeft"];
    const mobileStats = Telegram_service_1.TelegramService.getInstance().getMobileStats();
    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${process.env.clientId}-Prom\n${JSON.stringify(totalStat, null, 4)}\n\n${JSON.stringify(mobileStats, null, 4)}`)}`);
    res.json({ totalStat, mobileStats });
}));
app.get('/exit', (req, res, next) => {
    res.send("App Exits in 2 seconds");
    next();
}, () => {
    setTimeout(() => {
        process.exit(1);
    }, 2000);
});
app.get('/exec/:cmd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cmd = req.params.cmd;
    console.log(`executing: `, cmd);
    try {
        res.send(console.log((0, child_process_1.execSync)(cmd).toString()));
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error Executing /exec/:cmd");
    }
}));
app.get('/updatePrivacy', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telegramService = Telegram_service_1.TelegramService.getInstance();
        res.json({ message: "Updating Privacy" });
        yield telegramService.updatePrivacy();
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error Executing updatePrivacy");
    }
}));
app.get('/getPromotionStats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telegramService = Telegram_service_1.TelegramService.getInstance();
        res.json(telegramService.getPromotionResults());
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error Executing getPromotionStats");
    }
}));
app.get('/getBannedChannels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telegramService = Telegram_service_1.TelegramService.getInstance();
        res.send(telegramService.getBannedChannels());
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error Executing getBannedChannels");
    }
}));
app.get('/updateProfilePics', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "Updating Profile Pics" });
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error Executing updateProfilePics");
    }
    next();
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const telegramService = Telegram_service_1.TelegramService.getInstance();
    telegramService.updateProfilePics();
}));
app.get('/getMobileStats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telegramService = Telegram_service_1.TelegramService.getInstance();
        res.json(telegramService.getMobileStats());
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error Executing getMobileStats");
    }
}));
app.get('/getProcessId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ ProcessId: exports.prcessID.toString() });
}));
app.get('/restart/:clientId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('OK');
    next();
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = req.params.clientId;
    yield restartClient(clientId);
}));
app.get('/tryToConnect/:num', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('OK');
    next();
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const receivePrcssId = parseInt((_b = req.params) === null || _b === void 0 ? void 0 : _b.num);
    console.log(exports.prcessID, 'Connect Req received from: ', receivePrcssId);
    try {
        if (canTry2) {
            if (receivePrcssId === exports.prcessID) {
                // const isAlive = await fetchWithTimeout(`${ppplbot()}&text=${(process.env.clientId).toUpperCase()}: Alive Check`);
                // if (isAlive) {
                yield (0, utils_1.sleep)(300);
                if (connection_1.connectionState.isPinging === false) {
                    console.log('Trying to Initiate CLIENT');
                    canTry2 = false;
                    const db = dbservice_1.UserDataDtoCrud.getInstance();
                    yield db.connect();
                    yield db.updatePromoteClientStat({ clientId: process.env.clientId }, { lastStarted: (0, utils_1.formatDateTime)(new Date()) });
                    setTimeout(() => {
                        canTry2 = true;
                    }, 70000);
                    let canStart = true;
                    const resp = yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`Starting ${process.env.clientId} Promotions`)}`);
                    for (let i = 0; i < 3; i++) {
                        // const resp = await fetchWithTimeout(`${ppplbot()}&text=exit${process.env.username}`);
                        // if (resp) {
                        //   canStart = true;
                        //   break;
                        // }
                    }
                    yield (0, utils_1.sleep)(3000);
                    // await fetchWithTimeout(`${ppplbot()}&text=exit${process.env.username}`);
                    if (canStart) {
                        // await fetchWithTimeout(`${ppplbot()}&text=${(process.env.clientId).toUpperCase()}: Connecting.......!!`);
                        yield startConn();
                    }
                    // } else {
                    //     await fetchWithTimeout(`${ppplbot()}&text=${(process.env.clientId).toUpperCase()}: Pinging is Working`);
                    // }
                }
                else {
                    console.log('Issue at sending Pings');
                }
            }
            else {
                console.log('SomeOther Unknown Process Exist');
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(_c = process.env.clientId) === null || _c === void 0 ? void 0 : _c.toUpperCase()}: SomeOther Unknown Process Exist`)}`);
            }
        }
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Error At Connecting");
    }
}));
function extractNumberFromString(str) {
    const match = str.match(/\d+/);
    return match;
}
function startConn() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting connections");
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const client = yield db.getClient({ clientId: process.env.clientId });
        for (const mobile of client.promoteMobile) {
            console.log(mobile);
            clientsMap.set(mobile, {
                clientId: client.clientId,
                mobile: mobile,
                repl: client.repl,
                username: client.username,
                lastMessage: Date.now(),
                name: client.name,
                startTime: Date.now(),
                daysLeft: -1
            });
        }
        const telegramService = Telegram_service_1.TelegramService.getInstance();
        yield telegramService.connectClients();
    });
}
function getALLClients() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        const result = yield db.getPromoteClientStats();
        return result;
    });
}
function checkHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("============Checking Health==============");
        try {
            const telegramService = Telegram_service_1.TelegramService.getInstance();
            yield telegramService.saveMobileStats();
            yield (0, reaction_utils_1.saveReactionsToFile)();
            const bannedMobiles = yield telegramService.promotionsBannedMobiles();
            const clientData = yield (dbservice_1.UserDataDtoCrud.getInstance()).getClient({ clientId: process.env.clientId });
            const averageReactionDelay = telegramService.getAverageReactionDelay();
            yield telegramService.setMobiles(clientData.promoteMobile);
            const lastReactedTime = telegramService.getLastReactedTime();
            yield (0, utils_1.sendToLogs)({ message: `\nAverage Reaction Delay: ${averageReactionDelay}: last:${((Date.now() - lastReactedTime) / 60000).toFixed(2)}mins\n${bannedMobiles !== '' ? `\n${bannedMobiles}` : ""}` });
            if (lastReactedTime < Date.now() - 5 * 60 * 1000) {
                console.log("Exiting as reactions failed: ", lastReactedTime, " : ", Date.now() - 5 * 60 * 1000);
                process.exit(1);
            }
            for (const mobile of clientData.promoteMobile) {
                yield (0, utils_1.sleep)(1000);
                try {
                    const client = clientsMap.get(mobile);
                    if (client) {
                        const clientDetails = {
                            clientId: client.clientId,
                            mobile: mobile,
                            repl: clientData.repl,
                            username: clientData.username,
                            lastMessage: Date.now(),
                            name: clientData.name,
                            startTime: (client === null || client === void 0 ? void 0 : client.startTime) || Date.now(),
                            daysLeft: client.daysLeft,
                        };
                        try {
                            const telegramManager = telegramService.getClient(mobile);
                            if (telegramManager) {
                                try {
                                    const me = yield telegramManager.getMe();
                                    if (me.phone !== clientDetails.mobile) {
                                        console.log(clientDetails.mobile, " : mobile changed", " me : ", me, "clientDetails: ", clientDetails);
                                        clientsMap.set(mobile, clientDetails);
                                        yield restartClient(mobile);
                                    }
                                    else {
                                        const lastMessageTime = telegramService.getLastMessageTime(mobile);
                                        const timeInMins = ((Date.now() - lastMessageTime) / 60000).toFixed(2);
                                        if (lastMessageTime < Date.now() - 15 * 60 * 1000) {
                                            yield telegramService.startPromotion(mobile);
                                            console.log(clientDetails.clientId, " : Promotions Seems stopped - ", `LastMSg : ${timeInMins} mins ago`, `DaysLeft: ${telegramService.getDaysLeft(mobile)}`);
                                            // await telegramManager.checktghealth();
                                            if (lastMessageTime < Date.now() - 30 * 60 * 1000) {
                                                console.log("Promotion stopped", clientDetails.mobile, "DaysLeft: ", telegramService.getDaysLeft(mobile));
                                                yield (0, utils_1.sendToLogs)({ message: `\n❌❌ Promotion stopped ❌❌\n${clientDetails.mobile}:\nLastMSg : ${timeInMins} mins ago`, chatId: process.env.logsChannel2 });
                                                yield (0, utils_1.setupNewMobile)(mobile, true, telegramManager.promoterInstance.daysLeft);
                                            }
                                        }
                                        else {
                                            console.log(mobile, me.username, " : Promotions Working fine - ", `LastMSg : ${timeInMins} mins ago`, `DaysLeft: ${telegramService.getDaysLeft(mobile)}`);
                                        }
                                        clientsMap.set(mobile, clientDetails);
                                        telegramManager.setClientDetails(clientDetails);
                                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                            try {
                                                yield (telegramManager === null || telegramManager === void 0 ? void 0 : telegramManager.checkMe());
                                                yield telegramManager.client.invoke(new telegram_1.Api.updates.GetState());
                                                yield telegramManager.client.markAsRead('myvcacc');
                                                yield telegramManager.setTyping('myvcacc');
                                            }
                                            catch (error) {
                                                (0, parseError_1.parseError)(error, `${mobile} Error at Health Check checking self`);
                                                (0, utils_1.startNewUserProcess)(error, mobile);
                                            }
                                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                                try {
                                                    yield telegramManager.client.invoke(new telegram_1.Api.updates.GetState());
                                                    yield telegramManager.client.markAsRead('myvcacc');
                                                    yield telegramManager.setTyping('myvcacc');
                                                }
                                                catch (e) {
                                                    (0, parseError_1.parseError)(e, `${mobile} Error at Health Check internal`);
                                                    (0, utils_1.startNewUserProcess)(e, mobile);
                                                }
                                            }), 150000);
                                        }), 30000);
                                    }
                                }
                                catch (e) {
                                    (0, parseError_1.parseError)(e, clientDetails.mobile);
                                }
                            }
                            else {
                                console.log("Does not Exist Client 1: ", clientDetails.mobile);
                            }
                        }
                        catch (error) {
                            console.log("Does not Exist Client 2: ", clientDetails.mobile);
                        }
                    }
                    else {
                        const clientDetails = {
                            clientId: clientData.clientId,
                            mobile: mobile,
                            repl: clientData.repl,
                            username: clientData.username,
                            lastMessage: Date.now(),
                            name: clientData.name,
                            startTime: Date.now(),
                            daysLeft: -1
                        };
                        clientsMap.set(mobile, clientDetails);
                        yield telegramService.createClient(clientDetails, false, true);
                    }
                }
                catch (e) {
                    (0, parseError_1.parseError)(e, "Error at Health Check 1");
                    yield (0, utils_1.sleep)(1000);
                    process.exit(1);
                }
            }
            const promoteMobilesSet = new Set(clientData.promoteMobile);
            for (const mobile of clientsMap.keys()) {
                try {
                    if (!promoteMobilesSet.has(mobile)) {
                        console.log(`Removing old client entry from clientsMap: ${mobile}`);
                        yield telegramService.disposeClient(mobile);
                        clientsMap.delete(mobile);
                    }
                }
                catch (error) {
                    (0, parseError_1.parseError)(error, "Error at Removing Old Client Entry");
                }
            }
            console.log("Average Reaction Delay: ", telegramService.getAverageReactionDelay());
        }
        catch (error) {
            (0, parseError_1.parseError)(error, `Error at Health Check 2 ${yield (0, exports.getPublicIP)()}`);
            yield (0, utils_1.sleep)(3000);
            process.exit(1);
        }
    });
}
exports.checkHealth = checkHealth;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function getMapValues() {
    return Array.from(clientsMap.values());
}
exports.getMapValues = getMapValues;
function getMapKeys() {
    return Array.from(clientsMap.keys());
}
exports.getMapKeys = getMapKeys;
function getClientDetails(mobile) {
    const client = clientsMap.get(mobile);
    return client;
}
exports.getClientDetails = getClientDetails;
function updateSuccessCount(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        yield db.increaseSuccessCount(clientId);
    });
}
exports.updateSuccessCount = updateSuccessCount;
function updateFailedCount(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        yield db.increaseFailedCount(clientId);
    });
}
exports.updateFailedCount = updateFailedCount;
function updateMsgCount(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        yield db.increaseMsgCount(clientId);
    });
}
exports.updateMsgCount = updateMsgCount;
function updatePromoteClient(clientId, clientData) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = dbservice_1.UserDataDtoCrud.getInstance();
        yield db.updatePromoteClientStat({ clientId }, Object.assign({}, clientData));
    });
}
exports.updatePromoteClient = updatePromoteClient;
function restartClient(mobile) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!mobile) {
            console.error(`ClientId ${mobile} is undefined`);
            return;
        }
        const telegramService = Telegram_service_1.TelegramService.getInstance();
        const clientDetails = clientsMap.get(mobile);
        if (!clientDetails) {
            console.error(`Client details for ${mobile} do not exist`);
            return;
        }
        if (clientDetails.startTime > Date.now() - 1000 * 60 * 5) {
            console.log(`Client ${mobile} was started less than 5 minutes ago. Skipping restart.`);
            return;
        }
        console.log(`===================Restarting service : ${mobile.toUpperCase()}=======================`);
        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=${encodeURIComponent(`${(_a = process.env.clientId) === null || _a === void 0 ? void 0 : _a.toUpperCase()}PROM: Restarting service : ${mobile.toUpperCase()}`)}`);
    });
}
exports.restartClient = restartClient;


/***/ }),

/***/ "./src/fetchWithTimeout.ts":
/*!*********************************!*\
  !*** ./src/fetchWithTimeout.ts ***!
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
exports.fetchWithTimeout = void 0;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
// Default configurations
const DEFAULT_RETRY_CONFIG = {
    maxRetries: 3,
    baseDelay: 500,
    maxDelay: 30000,
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
function notifyInternal(prefix, errorDetails, config = DEFAULT_NOTIFICATION_CONFIG) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.enabled)
            return;
        prefix = `${prefix} ${process.env.clientId || 'EventManager'}`;
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
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
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
function fetchWithTimeout(url, options = {}, maxRetries // Kept for backward compatibility
) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Fetching URL: ${url} with options:`, options);
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
                        yield notifyInternal(`Bypass attempt failed`, { message: `host=${host}\nendpoint=${endpoint}\n${`msg: ${errorDetails.slice(0, 150)}\nurl: ${url}`}` }, notificationConfig);
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
                            message: `${clientId} host=${host}\nendpoint=${endpoint}\n${`mgs: ${message.slice(0, 150)}`}`,
                            status: parsedError.status
                        }, notificationConfig);
                    }
                }
                // Check if we should retry
                if (attempt < retryConfig.maxRetries && shouldRetry(error, parsedError)) {
                    const delay = calculateBackoff(attempt, retryConfig);
                    console.log(`Retrying request (${attempt + 1}/${retryConfig.maxRetries}) after ${delay}ms`);
                    yield (0, utils_1.sleep)(delay);
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
            yield notifyInternal(`All ${retryConfig.maxRetries} retries exhausted`, { message: `${errorData.slice(0, 150)}` }, notificationConfig);
        }
        catch (finalError) {
            console.error('Failed to send final error notification:', finalError);
        }
        // Return undefined to indicate failure
        return undefined;
    });
}
exports.fetchWithTimeout = fetchWithTimeout;


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
exports.getDataAndSetEnvVariables = void 0;
(__webpack_require__(/*! dotenv */ "dotenv").config)();
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const node_fetch_1 = __importDefault(__webpack_require__(/*! node-fetch */ "node-fetch"));
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
// Function to write package.json
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
// Function to modify package.json
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
// modifyPackageJson('add', 'lodash', '^4.17.21');
// modifyPackageJson('remove', 'lodash');
// modifyPackageJson('change', 'telegram', '2.18.26');
// modifyPackageJson('add', 'cors', '^2.8.5');
// installPackage()
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
function getDataAndSetEnvVariables(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)(url);
            const jsonData = yield response.json();
            for (const key in jsonData) {
                process.env[key] = jsonData[key];
                console.log('setting key: ', key);
            }
            console.log('Environment variables set successfully!');
        }
        catch (error) {
            console.error('Error retrieving data or setting environment variables:', error);
        }
    });
}
exports.getDataAndSetEnvVariables = getDataAndSetEnvVariables;
function setEnv() {
    return __awaiter(this, void 0, void 0, function* () {
        // await getDataAndSetEnvVariables(`https://checker-production-c3c0.up.railway.app/forward/clients/${process.env.clientId}`);
        // await getDataAndSetEnvVariables(`https://mychatgpt-xk3y.onrender.com/forward/configuration`);
        yield getDataAndSetEnvVariables(`https://api.npoint.io/cc57d60feea67e47b6c4`);
        // await getDataAndSetEnvVariables(`https://mychatgpt-xk3y.onrender.com/forward/clients/${process.env.clientId}`);
        yield getDataAndSetEnvVariables(`https://api.npoint.io/7c2682f37bb93ef486ba/${process.env.clientId}`);
        console.log("Env Mobile : ", process.env.mobile);
        __webpack_require__(/*! ./express */ "./src/express.ts");
    });
}
setEnv();


/***/ }),

/***/ "./src/logbots.ts":
/*!************************!*\
  !*** ./src/logbots.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ppplbot = exports.notifbot = exports.getBotToken = void 0;
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
exports.getBotToken = getBotToken;
function notifbot(chatId = process.env.accountsChannel || "-1001801844217", botToken) {
    const tokens = initializeBotTokens();
    const token = botToken || tokens[currentTokenIndex];
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}`;
    if (!botToken) {
        currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
    }
    return apiUrl;
}
exports.notifbot = notifbot;
function ppplbot(chatId = process.env.updatesChannel || '-1001972065816', botToken) {
    const tokens = initializeBotTokens();
    const token = botToken || tokens[currentTokenIndex];
    const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}`;
    if (!botToken) {
        currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
    }
    return apiUrl;
}
exports.ppplbot = ppplbot;


/***/ }),

/***/ "./src/messages.ts":
/*!*************************!*\
  !*** ./src/messages.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pickOneMsg = exports.randomMsg = exports.messages = exports.endpoint = void 0;
exports.endpoint = `mode=02`; //&mam=15
exports.messages = {
    assureMSgArray: [
        "I'm little busy now, I will call u in some time",
        'Oyee.... Now??',
        'Oyee.... U there?',
        "Lets do now??",
        "Are you free now??",
        "Hey...Dont worry!! I will Call you pakka ok!!",
        "Hey...Dont worry!! I will Call you pakka ok!!",
        'Sorry, wait a while!!Dont worry, I will call you!!',
        "I'm Outside now, I will only Call you in some time!",
        'Sorry for the delay, I will Call you when I have a moment',
        'Can you please wait for a while? I will Call you after 1 hour',
        "I Just Came outside, I will only call u when I'm free!!"
    ],
    thanksArray: [`Aww...Thanks Naughty Boii!! ♥️🙈👀 `,
        `Thank youuu Dear!!♥️`,
        'Haha... Thanks🙈',
        `Thanks Baby🤗`,
        '♥️🙈♥️🙈♥️🙈',
        'Thanks a lot, dear! ❤️',
        'Thank you so much, love! 😍',
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
        "I'm ready now😏!!\n** Pay and Msg me**\n"
    ],
    bye: `Byee!!`,
    cantPay: `If You cant Pay Just **20₹** to a **Beautiful Girl** Like Me!! Never message me again and Waste your own Time!!`,
    time: `Demo : 1 minute\nFull service 1 hour\n\nFor any service you take!`,
    wait: "**I'm Checking Payments**, What is Your Name on Payment???\n\nWait... 5 Mins!!\n\n**Send your Payment Screenshot Once Now!!**",
    screenshot: `**Send ur  Payment Screenshot!!**`,
    qr: '**"PhonePe / PayTm"  ONLY!!** 👆👆\n',
    qr1: 'Pay to this NEW QR Code!!',
    demo: `\n**DEMO** Nude pics: **25₹**\n**DEMO** Video call: **50₹**\n**DEMO** Voice call: **40₹**\n\n**Pay on My Website 👉🏻 ${process.env.link}**`,
    noFreeDemo: `**No FREE Demos!!**`,
    installments: 'You Can Take Video call in Installments!!\n\n**Like...Daily 15Mins!!So 4 days u can enjoy in Full video call.🤗🤗**',
    daily100: `So Many **People** Msg me for **Free Demo😔**\nI cant waste my time on **TimePassers!!**\n\nDemo **Video Call** is just **50₹!!**\nTake **Full Service** Only If U like **Demo VC!!**\n\n**PAY nd Enjoy** me Like a **REAL MAN!!🔥❤️**\nDont be a **TimePasser!!😏**`,
    just50: `**Video Call** is just 👉🏻 **50₹!!**\n\nDont be a **TimePasser Baby!!😏**\n**Pay nd Msg!!**`,
    link: `\n**Pay on my Website 👇👇\n${process.env.link}**`,
    dir: `OPEN 👉🏻 **${process.env.demolink}/${process.env.clientId}**`,
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
const someMsg = `**Video Call** is JUST **50₹!!**\nI will **Show Everything** to You!!\n\nDont be a **TimePasser!!😏**` + '\n**Just TRY ONCE Dear...❤️❤️**';
exports.randomMsg = [exports.messages.demo, "👀👀", exports.messages.just50, 'hmm👀', exports.messages.just50, 'What do you do?', 'haaa', 'haaa❤️', '?', "I'm mood now!!😔", 'are you vigin?', 'Show Me your Dick!!', "I'm Pressing my boobs now🙈", 'Will you lick my pussy??🙈', 'Your Dick is Hard Now??🙈', 'You want to lick My nipples?🙈', 'Your Dick Size??', 'numb', 'numb', 'what are you doing?', 'Where are you from?', 'What do like Most in SEX👀', 'your age?', 'what?', 'You want to kiss my boobies?🙈', "I'm not Wearing Dress now!!🙈\nTake the Demo!!", 'Hmm Okay❤️', "qr", ...exports.messages.PayMsgArray, someMsg];
function pickOneMsg(msgsArray) {
    return (msgsArray[Math.floor(Math.random() * msgsArray.length)]);
}
exports.pickOneMsg = pickOneMsg;


/***/ }),

/***/ "./src/parseError.ts":
/*!***************************!*\
  !*** ./src/parseError.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseError = exports.extractMessage = void 0;
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/fetchWithTimeout.ts");
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
const extractMessage = (data) => {
    if (Array.isArray(data)) {
        return `${data.map((item) => (0, exports.extractMessage)(item)).join('\n')}`;
    }
    if (typeof data === 'string' ||
        typeof data === 'number' ||
        typeof data === 'boolean') {
        return data;
    }
    if (typeof data === 'object' && data !== null) {
        const messages = [];
        for (const key in data) {
            const value = data[key];
            const newPrefix = key;
            if (Array.isArray(value)) {
                messages.push(`${newPrefix}=${value.map((item) => (0, exports.extractMessage)(item)).join('\n')}`);
            }
            else if (typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean') {
                messages.push(`${newPrefix}=${value}`);
            }
            else if (typeof value === 'object' && value !== null) {
                messages.push(String((0, exports.extractMessage)(value)));
            }
        }
        return messages.length > 0 ? messages.join('\n') : '';
    }
    return ''; // Return empty string for null, undefined, and unhandled types
};
exports.extractMessage = extractMessage;
function parseError(err, prefix, sendErr = true) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const clientId = process.env.clientId || 'UnknownClient';
    const notifChannel = process.env.notifChannel || 'UnknownChannel';
    const prefixStr = `${clientId}:Prom - ${prefix || ''}`;
    let status = 500;
    let message = 'An unknown error occurred';
    let error = 'UnknownError';
    // Handle the case where `err` is undefined
    if (!err) {
        message = 'No error object provided';
        error = 'NoErrorObject';
    }
    else if (err.response) {
        const response = err.response;
        status =
            ((_a = response.data) === null || _a === void 0 ? void 0 : _a.statusCode) ||
                ((_b = response.data) === null || _b === void 0 ? void 0 : _b.status) ||
                ((_c = response.data) === null || _c === void 0 ? void 0 : _c.ResponseCode) ||
                response.status ||
                err.status ||
                500;
        message =
            ((_d = response.data) === null || _d === void 0 ? void 0 : _d.message) ||
                ((_e = response.data) === null || _e === void 0 ? void 0 : _e.errors) ||
                ((_f = response.data) === null || _f === void 0 ? void 0 : _f.ErrorMessage) ||
                ((_g = response.data) === null || _g === void 0 ? void 0 : _g.errorMessage) ||
                ((_h = response.data) === null || _h === void 0 ? void 0 : _h.UserMessage) ||
                response.data ||
                response.message ||
                response.statusText ||
                err.message ||
                'An error occurred';
        error =
            ((_j = response.data) === null || _j === void 0 ? void 0 : _j.error) || response.error || err.name || err.code || 'Error';
    }
    else if (err.request) {
        status = err.status || 408;
        message =
            ((_k = err.data) === null || _k === void 0 ? void 0 : _k.message) ||
                ((_l = err.data) === null || _l === void 0 ? void 0 : _l.errors) ||
                ((_m = err.data) === null || _m === void 0 ? void 0 : _m.ErrorMessage) ||
                ((_o = err.data) === null || _o === void 0 ? void 0 : _o.errorMessage) ||
                ((_p = err.data) === null || _p === void 0 ? void 0 : _p.UserMessage) ||
                err.data ||
                err.message ||
                err.statusText ||
                'The request was triggered but no response was received';
        error = err.name || err.code || 'NoResponseError';
    }
    else if (err.message) {
        status = err.status || 500;
        message = err.message;
        error = err.name || err.code || 'Error';
    }
    const fullMessage = `${prefixStr} :: ${(0, exports.extractMessage)(message)}`;
    const response = { status, message: err.errorMessage ? err.errorMessage : String(fullMessage), error };
    console.log("parsedErr: ", fullMessage);
    if (sendErr) {
        try {
            const shouldSend = !fullMessage.includes("INPUT_USER_DEACTIVATED") &&
                status.toString() !== "429" &&
                !fullMessage.toLowerCase().includes("too many req") &&
                !fullMessage.toLowerCase().includes('could not find') &&
                !fullMessage.includes('ECONNREFUSED');
            if (shouldSend) {
                const notifUrl = `${(0, logbots_1.notifbot)()}&text=${prefixStr} :: ${err.errorMessage ? err.errorMessage : (0, exports.extractMessage)(message)}`;
                (0, fetchWithTimeout_1.fetchWithTimeout)(notifUrl);
            }
        }
        catch (fetchError) {
            console.error('Failed to send error notification:', fetchError);
        }
    }
    return response;
}
exports.parseError = parseError;


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
exports.requestPhoneCall = exports.acceptPhoneCall = exports.confirmPhoneCall = exports.decodePhoneCallData = exports.encodePhoneCallData = exports.destroyPhoneCallState = exports.createPhoneCallState = exports.generateEmojiFingerprint = exports.generateRandomInt = void 0;
const big_integer_1 = __importDefault(__webpack_require__(/*! big-integer */ "big-integer"));
const MTProtoState_1 = __webpack_require__(/*! telegram/network/MTProtoState */ "telegram/network/MTProtoState");
const Logger_1 = __webpack_require__(/*! telegram/extensions/Logger */ "telegram/extensions/Logger");
const Helpers = __importStar(__webpack_require__(/*! telegram/Helpers */ "telegram/Helpers"));
const AuthKey_1 = __webpack_require__(/*! telegram/crypto/AuthKey */ "telegram/crypto/AuthKey");
const Helpers_1 = __webpack_require__(/*! telegram/Helpers */ "telegram/Helpers");
let currentPhoneCallState;
function generateRandomInt() {
    return (0, Helpers_1.readBigIntFromBuffer)((0, Helpers_1.generateRandomBytes)(4), true, true).toJSNumber();
}
exports.generateRandomInt = generateRandomInt;
class PhoneCallState {
    constructor() {
        this.seq = 0;
        this.waitForState = new Promise((resolve) => {
            this.resolveState = resolve;
        });
    }
    requestCall({ p, g, random }) {
        return __awaiter(this, void 0, void 0, function* () {
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
exports.generateEmojiFingerprint = generateEmojiFingerprint;
function createPhoneCallState() {
    currentPhoneCallState = new PhoneCallState();
}
exports.createPhoneCallState = createPhoneCallState;
function destroyPhoneCallState() {
    console.log("Delete Call State!!");
    currentPhoneCallState = undefined;
}
exports.destroyPhoneCallState = destroyPhoneCallState;
function encodePhoneCallData(params) {
    return currentPhoneCallState.encode(params);
}
exports.encodePhoneCallData = encodePhoneCallData;
function decodePhoneCallData(params) {
    return currentPhoneCallState.decode(params);
}
exports.decodePhoneCallData = decodePhoneCallData;
function confirmPhoneCall(params) {
    return currentPhoneCallState === null || currentPhoneCallState === void 0 ? void 0 : currentPhoneCallState.confirmCall(params);
}
exports.confirmPhoneCall = confirmPhoneCall;
function acceptPhoneCall(params) {
    return currentPhoneCallState === null || currentPhoneCallState === void 0 ? void 0 : currentPhoneCallState.acceptCall(params);
}
exports.acceptPhoneCall = acceptPhoneCall;
function requestPhoneCall(params) {
    return currentPhoneCallState === null || currentPhoneCallState === void 0 ? void 0 : currentPhoneCallState.requestCall(params);
}
exports.requestPhoneCall = requestPhoneCall;


/***/ }),

/***/ "./src/react.ts":
/*!**********************!*\
  !*** ./src/react.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reactions = void 0;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const users_1 = __webpack_require__(/*! telegram/client/users */ "telegram/client/users");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const ReactQueue_1 = __webpack_require__(/*! ./ReactQueue */ "./src/ReactQueue.ts");
const utils_2 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const reaction_utils_1 = __webpack_require__(/*! ./reaction.utils */ "./src/reaction.utils.ts");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const express_1 = __webpack_require__(/*! ./express */ "./src/express.ts");
const notifbot = `https://api.telegram.org/bot5856546982:AAEW5QCbfb7nFAcmsTyVjHXyV86TVVLcL_g/sendMessage?chat_id=${process.env.notifChannel}`;
class Reactions {
    constructor(mobiles, getClient) {
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
        this.nextMobileIndex = 0;
        this.mobiles = [];
        this.successCount = 0;
        this.reactStats = new Map();
        this.MAX_REACTION_DELAYS = 20;
        this.INITIAL_MIN_WAIT_TIME = 1500;
        this.INITIAL_TARGET_REACTION_DELAY = 6000;
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
        this.getClient = getClient;
        this.reactQueue = ReactQueue_1.ReactQueue.getInstance();
        this.mobiles = mobiles;
        for (const mobile of mobiles) {
            this.reactStats.set(mobile, {
                sleepTime: 0,
                releaseTime: 0,
                successCount: 0,
                failedCount: 0,
                lastReactedTime: 0,
                triggeredTime: 0,
                floodCount: 0
            });
        }
        console.log("Reaction Instance created : ", mobiles, mobiles === null || mobiles === void 0 ? void 0 : mobiles.length);
        this.minWaitTime = this.INITIAL_MIN_WAIT_TIME;
        this.targetReactionDelay = this.INITIAL_TARGET_REACTION_DELAY;
    }
    setMobiles(mobiles) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Setting Mobiles in Reaction Instance", mobiles.length);
            const validMobiles = mobiles.filter(mobile => this.getClient(mobile));
            this.mobiles = validMobiles;
            const db = dbservice_1.UserDataDtoCrud.getInstance();
            const result = yield db.increaseReactCount(process.env.clientId, this.successCount);
            this.successCount = 0;
            const mobileSet = new Set(mobiles);
            for (const mobile of this.reactStats.keys()) {
                if (!mobileSet.has(mobile)) {
                    this.reactStats.delete(mobile);
                    console.log(`Deleted mobile ${mobile} from mobileStats`);
                }
            }
            for (const mobile of mobiles) {
                if (!this.reactStats.has(mobile)) {
                    this.reactStats.set(mobile, {
                        sleepTime: 0,
                        releaseTime: 0,
                        successCount: 0,
                        failedCount: 0,
                        lastReactedTime: 0,
                        triggeredTime: 0,
                        floodCount: 0
                    });
                }
            }
        });
    }
    selectRandomReaction(availableReactions) {
        if (!availableReactions || availableReactions.length === 0) {
            return [this.standardReactions[0]];
        }
        const reactionIndex = Math.floor(Math.random() * availableReactions.length);
        return [availableReactions[reactionIndex]];
    }
    react(message, targetMobile) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const stats = this.reactStats.get(targetMobile);
            if (!stats)
                return;
            if (!this.flag || stats.releaseTime > Date.now() || stats.lastReactedTime > Date.now() - 15000) {
                return;
            }
            try {
                const chatId = message.chatId.toString();
                if (this.shouldReact(chatId) && !(((_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.recentReactions) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
                    this.flag = false;
                    const availableReactions = (0, reaction_utils_1.getAllReactions)(chatId);
                    if (availableReactions && availableReactions.length > 1) {
                        const reaction = this.selectRandomReaction(availableReactions);
                        yield this.processReaction(message, reaction, targetMobile);
                    }
                    else {
                        if (availableReactions == undefined) {
                            yield this.processReaction(message, this.selectRandomReaction(this.standardReactions), targetMobile);
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.flag2) {
                this.flag2 = false;
                try {
                    const availableReactions = yield this.getReactions(chatId, (_a = this.getClient(mobile)) === null || _a === void 0 ? void 0 : _a.client);
                    yield this.updateReactionsCache(chatId, availableReactions);
                }
                catch (error) {
                    this.handleCacheError(error, chatId);
                }
                finally {
                    this.flag2 = true;
                    yield (0, utils_1.sleep)(3000);
                }
            }
        });
    }
    fetchAvailableReactions(chatId, client) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
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
        var _a, _b;
        const isRestricted = (0, utils_2.contains)(chatId, this.reactRestrictedIds);
        const isInQueue = this.reactQueue.contains(chatId);
        const hasMobiles = ((_a = this.mobiles) === null || _a === void 0 ? void 0 : _a.length) > 0;
        if (!hasMobiles) {
            this.setMobiles((0, express_1.getMapKeys)());
        }
        return !isRestricted && !isInQueue && ((_b = this.mobiles) === null || _b === void 0 ? void 0 : _b.length) > 0;
    }
    processReaction(message, reaction, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const tgManager = this.getClient(mobile);
            if (tgManager === null || tgManager === void 0 ? void 0 : tgManager.client) {
                yield this.executeReaction(message, tgManager.client, reaction, mobile);
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
                yield this.sendReactionToMessage(client, message, reaction);
                yield this.updateReactionStats(mobile);
            }
            catch (error) {
                yield this.handleReactionFailure(error, reaction, chatId, mobile);
            }
            finally {
                const stats = this.reactStats.get(mobile);
                if (!stats)
                    return;
                if (this.averageReactionDelay < this.targetReactionDelay) {
                    this.reactSleepTime = Math.min(this.reactSleepTime + 200, this.maxWaitTime);
                }
                else if (Date.now() > stats.triggeredTime + 600000 && stats.floodCount < 3) {
                    this.reactSleepTime = Math.max(this.reactSleepTime - 50, this.minWaitTime);
                }
                this.waitReactTime = Date.now() + this.reactSleepTime;
                this.resetTargetDelays();
            }
        });
    }
    sendReactionToMessage(client, message, reaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const MsgClass = new telegram_1.Api.messages.SendReaction({
                    peer: message.chat,
                    msgId: message.id,
                    reaction,
                });
                yield client.invoke(MsgClass);
            }
            catch (error) {
                // Add specific error handling for network issues
                if (((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes('ETIMEOUT')) || ((_b = error.message) === null || _b === void 0 ? void 0 : _b.includes('network'))) {
                    console.warn(`Network error while sending reaction: ${error.message}`);
                    // Allow retry after a short delay
                    yield (0, utils_1.sleep)(1000);
                    throw error;
                }
                throw error;
            }
        });
    }
    handleReactionFailure(error, reaction, chatId, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = this.reactStats.get(mobile);
            if (!stats)
                return;
            this.reactStats.set(mobile, Object.assign(Object.assign({}, stats), { lastReactedTime: Date.now(), failedCount: stats.failedCount + 1 }));
            if (error.seconds) {
                yield this.handleFloodError(error, mobile);
            }
            else if (error.errorMessage === "REACTION_INVALID") {
                yield this.handleInvalidReaction(reaction, chatId);
            }
            else {
                console.log(error, reaction[0].emoticon);
                console.log(`${mobile} Reaction failed: ${error.errorMessage}`, new Date().toISOString().split('T')[1].split('.')[0]);
            }
        });
    }
    handleInvalidReaction(reaction, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactionsCache = (0, reaction_utils_1.getAllReactions)(chatId);
            if (!reactionsCache || reactionsCache.length === 0)
                return;
            const availableReactions = [...reactionsCache];
            const beforeLength = availableReactions.length;
            const index = availableReactions.findIndex(r => r.emoticon === reaction[0].emoticon);
            if (index !== -1) {
                availableReactions.splice(index, 1);
                (0, reaction_utils_1.setReactions)(chatId, availableReactions);
                console.log(`Removed Reaction: ${reaction[0].emoticon} from chat ${chatId}`, new Date().toISOString().split('T')[1].split('.')[0], `Before: ${beforeLength}, After: ${availableReactions.length}`);
            }
            else {
                console.warn(`Reaction ${reaction[0].emoticon} not found in chat ${chatId}`);
            }
        });
    }
    updateReactionDelays(delay) {
        if (this.reactionDelays.length >= this.MAX_REACTION_DELAYS) {
            this.reactionDelays.shift();
        }
        this.reactionDelays.push(delay);
    }
    updateReactionStats(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = this.reactStats.get(mobile);
            if (!stats)
                return;
            this.reactStats.set(mobile, Object.assign(Object.assign({}, stats), { lastReactedTime: Date.now(), successCount: stats.successCount + 1 }));
            const reactionDelay = Math.min(Date.now() - this.lastReactedtime, 25000);
            this.lastReactedtime = Date.now();
            this.updateReactionDelays(reactionDelay);
            this.successCount++;
            const totalDelay = this.reactionDelays.reduce((sum, delay) => sum + delay, 0);
            this.averageReactionDelay = this.reactionDelays.length > 0
                ? Math.floor(totalDelay / this.reactionDelays.length)
                : 0;
        });
    }
    resetTargetDelays() {
        if (Date.now() - this.reactionsRestarted > 3600000) { // Reset every hour
            this.minWaitTime = this.INITIAL_MIN_WAIT_TIME;
            this.targetReactionDelay = this.INITIAL_TARGET_REACTION_DELAY;
        }
    }
    handleFloodError(error, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Handling flood error for mobile: ${mobile} for ${error.seconds} seconds`);
            const stats = this.reactStats.get(mobile);
            if (!stats)
                return;
            const releaseTime = Date.now() + error.seconds * 1000;
            this.reactStats.set(mobile, Object.assign(Object.assign({}, stats), { triggeredTime: Date.now(), releaseTime, floodCount: stats.floodCount + 1 }));
            // Cap the increase in delays
            const MAX_WAIT_TIME_INCREASE = 5000;
            const MAX_TARGET_DELAY_INCREASE = 2000;
            this.reactSleepTime = 5000;
            this.targetReactionDelay = Math.min(this.targetReactionDelay + 500, this.INITIAL_TARGET_REACTION_DELAY + MAX_TARGET_DELAY_INCREASE);
            this.minWaitTime = Math.min(this.minWaitTime + 500, this.INITIAL_MIN_WAIT_TIME + MAX_WAIT_TIME_INCREASE);
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
    getHealthyMobiles() {
        return this.mobiles.filter((mobile) => {
            const stats = this.reactStats.get(mobile);
            return (stats === null || stats === void 0 ? void 0 : stats.releaseTime) < Date.now();
        });
    }
    selectNextMobile() {
        const healthyMobiles = this.getHealthyMobiles();
        if (!healthyMobiles.length) {
            console.warn("No healthy mobiles available for Reactions, but mobiles: ", this.mobiles);
            return null;
        }
        const selectedMobile = healthyMobiles[this.nextMobileIndex % healthyMobiles.length];
        this.nextMobileIndex = (this.nextMobileIndex + 1) % healthyMobiles.length;
        return selectedMobile;
    }
    dispose() {
        this.reactionDelays = [];
        this.reactStats.clear();
        this.mobiles = [];
        this.resetReactionState();
        this.minWaitTime = this.INITIAL_MIN_WAIT_TIME;
        this.targetReactionDelay = this.INITIAL_TARGET_REACTION_DELAY;
    }
}
exports.Reactions = Reactions;


/***/ }),

/***/ "./src/reaction.utils.ts":
/*!*******************************!*\
  !*** ./src/reaction.utils.ts ***!
  \*******************************/
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
exports.loadReactionsFromFile = exports.saveReactionsToFile = exports.hasReactions = exports.setReactions = exports.getAllReactions = exports.getAReaction = void 0;
const telegram_1 = __webpack_require__(/*! telegram */ "telegram");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const chatReactionsCache = new Map();
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
exports.getAReaction = getAReaction;
function getAllReactions(chatId) {
    return chatReactionsCache.get(chatId);
}
exports.getAllReactions = getAllReactions;
function setReactions(chatId, reactions) {
    chatReactionsCache.set(chatId, reactions);
}
exports.setReactions = setReactions;
function hasReactions(chatId) {
    return chatReactionsCache.has(chatId);
}
exports.hasReactions = hasReactions;
function saveReactionsToFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dir = path.dirname("./reactions.json");
            yield fs.promises.mkdir(dir, { recursive: true });
            const cacheObject = {};
            for (const [chatId, reactions] of chatReactionsCache.entries()) {
                const emoticons = reactions.map(reaction => reaction === null || reaction === void 0 ? void 0 : reaction.emoticon);
                cacheObject[chatId] = emoticons;
            }
            fs.writeFileSync("./reactions.json", JSON.stringify(cacheObject, null, 2), "utf-8");
            console.log("Reactions saved to file.");
        }
        catch (error) {
            console.error("Error saving reactions to file:", error);
        }
    });
}
exports.saveReactionsToFile = saveReactionsToFile;
function loadReactionsFromFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = "./reactions.json";
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            const cacheObject = JSON.parse(data);
            for (const [chatId, emoticons] of Object.entries(cacheObject)) {
                const reactions = emoticons.map(emoticon => new telegram_1.Api.ReactionEmoji({ emoticon }));
                chatReactionsCache.set(chatId, reactions);
            }
            console.log("Reactions loaded from file.");
        }
        else {
            console.error(`File not found: ${filePath}`);
        }
    });
}
exports.loadReactionsFromFile = loadReactionsFromFile;


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
exports.formatDateTime = exports.getRandomBoolean = exports.defaultMessages = exports.sendToLogs = exports.saveFile = exports.createPromoteClient = exports.getCurrentHourIST = exports.generateEmojis = exports.getRandomEmoji = exports.openChannels = exports.getdaysLeft = exports.setupNewMobile = exports.startNewUserProcess = exports.defaultReactions = exports.removeNumbersFromString = exports.fetchNumbersFromString = exports.toBoolean = exports.selectRandomElements = exports.contains = exports.sleep = void 0;
const Telegram_service_1 = __webpack_require__(/*! ./Telegram.service */ "./src/Telegram.service.ts");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const fetchWithTimeout_1 = __webpack_require__(/*! ./fetchWithTimeout */ "./src/fetchWithTimeout.ts");
const dbservice_1 = __webpack_require__(/*! ./dbservice */ "./src/dbservice.ts");
const parseError_1 = __webpack_require__(/*! ./parseError */ "./src/parseError.ts");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const logbots_1 = __webpack_require__(/*! ./logbots */ "./src/logbots.ts");
let setupTime = 0;
let startTime = Date.now();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function contains(str, arr) {
    return (arr.some(element => {
        if (str === null || str === void 0 ? void 0 : str.includes(element)) {
            return true;
        }
        return false;
    }));
}
exports.contains = contains;
;
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
exports.selectRandomElements = selectRandomElements;
function toBoolean(value) {
    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }
    if (typeof value === 'number') {
        return value === 1;
    }
    return value;
}
exports.toBoolean = toBoolean;
function fetchNumbersFromString(inputString) {
    const regex = /\d+/g;
    const matches = inputString.match(regex);
    if (matches) {
        const result = matches.join('');
        return result;
    }
    else {
        return '';
    }
}
exports.fetchNumbersFromString = fetchNumbersFromString;
function removeNumbersFromString(inputString) {
    const regex = /\d+/g;
    return inputString.replace(regex, '');
}
exports.removeNumbersFromString = removeNumbersFromString;
exports.defaultReactions = [
    '❤', '🔥', '👏', '🥰', '😁', '🤔',
    '🤯', '😱', '🤬', '😢', '🎉', '🤩',
    '🤮', '💩', '🙏', '👌', '🕊', '🤡',
    '🥱', '🥴', '😍', '🐳', '❤‍🔥', '💯',
    '🤣', '💔', '🏆', '😭', '😴', '👍',
    '🌚', '⚡', '🍌', '😐', '💋', '👻',
    '👀', '🙈', '🤝', '🤗', '🆒',
    '🗿', '🙉', '🙊', '🤷', '👎'
];
function startNewUserProcess(error, mobile) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error.errorMessage == 'CONNECTION_NOT_INITED' || error.errorMessage == 'AUTH_KEY_UNREGISTERED' || error.errorMessage == 'AUTH_KEY_DUPLICATED') {
            try {
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${(process.env.clientId).toUpperCase()}-PROM -${mobile}: AUTH KEY DUPLICATED : Deleting Archived Client`);
                console.log("AUTH KEY DUPLICATED : Deleting Archived Client");
                yield axios_1.default.delete(`${process.env.tgcms}/archived-clients/${mobile}`);
            }
            catch (error) {
                (0, parseError_1.parseError)(error, "Failed to delete archived client");
            }
            finally {
                yield sleep(5000);
                process.exit(1);
            }
        }
        if (error.errorMessage === "USER_DEACTIVATED_BAN" || error.errorMessage == 'SESSION_REVOKED' || error.errorMessage === "USER_DEACTIVATED") {
            yield sendToLogs({ message: `${mobile}\n${error.errorMessage}`, chatId: process.env.logsChannel2 });
            console.log(`${(process.env.clientId).toUpperCase()}-${mobile} ${error.errorMessage} : Exitiing`);
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${(process.env.clientId).toUpperCase()}-${mobile}: ${error.errorMessage} : Exitiing`);
            yield setupNewMobile(mobile, false, 0);
        }
    });
}
exports.startNewUserProcess = startNewUserProcess;
function setupNewMobile(mobile, saveOld = true, daysLeft = 3, force = false) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (force || (setupTime < Date.now() - 5 * 60 * 1000 && startTime < Date.now() - 10 * 60 * 1000)) {
            setupTime = Date.now();
            try {
                const db = dbservice_1.UserDataDtoCrud.getInstance();
                const existingClients = yield db.getClients();
                const promoteMobiles = [];
                for (const existingClient of existingClients) {
                    promoteMobiles.push(existingClient.promoteMobile);
                }
                const today = (new Date(Date.now())).toISOString().split('T')[0];
                const query = { availableDate: { $lte: today }, channels: { $gt: 250 }, mobile: { $nin: promoteMobiles } };
                const newPromoteClient = yield db.findPromoteClient(query);
                if (newPromoteClient) {
                    yield sendToLogs({ message: `Setting up new client for :  ${process.env.clientId} as days : ${daysLeft}` });
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${process.env.clientId.toUpperCase()}-PROM Changing Number from ${mobile} to ${newPromoteClient.mobile}`);
                    yield db.pushPromoteMobile({ clientId: process.env.clientId }, newPromoteClient.mobile);
                    yield db.deletePromoteClient({ mobile: newPromoteClient.mobile });
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimeChecker}/refreshMap`);
                    const telegramService = Telegram_service_1.TelegramService.getInstance();
                    if (saveOld) {
                        const tgManager = telegramService.getClient(mobile);
                        yield tgManager.deleteProfilePhotos();
                        yield sleep(1000);
                        yield tgManager.updatePrivacyforDeletedAccount();
                        yield sleep(1000);
                        yield tgManager.updateUsername('');
                        yield sleep(1000);
                        yield tgManager.updateProfile('Deleted Account', '');
                        yield sleep(2000);
                        const availableDate = (new Date(Date.now() + ((Math.max(daysLeft + 1, 2)) * 24 * 60 * 60 * 1000))).toISOString().split('T')[0];
                        const saveResult = yield db.createPromoteClient({
                            availableDate: availableDate,
                            channels: 30,
                            lastActive: today,
                            mobile: mobile,
                            tgId: (_a = telegramService.getClient(mobile)) === null || _a === void 0 ? void 0 : _a.tgId
                        });
                        // const response = await fetchWithTimeout(`${process.env.uptimeChecker}/promoteclients/SetAsPromoteClient/${mobile}`);
                        yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${process.env.clientId.toUpperCase()}-${mobile}: SaveResult- ${saveResult === null || saveResult === void 0 ? void 0 : saveResult.mobile}`);
                    }
                    yield db.pullPromoteMobile({ clientId: process.env.clientId }, mobile);
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${process.env.uptimeChecker}/refreshMap`);
                    yield telegramService.disposeClient(mobile);
                    console.log(mobile, " - New Promote Client: ", newPromoteClient);
                    process.exit(1);
                }
                else {
                    yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${process.env.clientId.toUpperCase()}- New Promote Clients Not available`);
                    process.exit(1);
                }
            }
            catch (error) {
                const errorDetails = (0, parseError_1.parseError)(error, "Error Setting up new mobile");
                yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=Error Setting up new mobile: ${errorDetails.message}`);
            }
        }
        else {
            console.log("Setup Time is less than 5 minutes");
            yield (0, fetchWithTimeout_1.fetchWithTimeout)(`${(0, logbots_1.ppplbot)()}&text=@${process.env.clientId.toUpperCase()}-PROM Stopped Changing from ${mobile} as Setup Time is less than 5 minutes`);
        }
    });
}
exports.setupNewMobile = setupNewMobile;
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
exports.getdaysLeft = getdaysLeft;
exports.openChannels = [
    "1503501267",
    "1551323319",
    "1874177023",
    "1726884257",
    "2078206164",
    "1783847947",
    "1280090273",
    "1680562555",
    "2034836144",
    "1837117287",
    "2048953473",
    "1659680108",
    "1942384583",
    "1633338877",
    "2062130327",
    "1801945887",
    "1825148754",
    "1586137943",
    "1847027610",
    "1508171809",
    "1712982876",
    "1249091516",
    "1514843822",
    "1959564784",
    "1529606821",
    "1751125886",
    "1755570724",
    "1627383361",
    "1687496208",
    "1541729758",
    "2003519665",
    "1913476459",
    "1548006801",
    "2035631610",
    "1236560723",
    "1622766959",
    "2049243534",
    "1780327268",
    "1803626686",
    "1802180690",
    "1769784193",
    "2087610212",
    "1813163445",
    "1684831952",
    "1387333195",
    "2122118869",
    "1887746719",
    "1652078022",
    "1988938452",
    "1583611497",
    "1673218199",
    "2122063964",
    "1956751085",
    "1686773455",
    "1705755336",
    "1894460536",
    "1635649108",
    "2064393771",
    "1831901563",
    "1862260678",
    "1318582599",
    "2106543232",
    "1654557420",
    "1181590789",
    "1222174863",
    "2008789348",
    "1746586826",
    "2121282957",
    "1794858656",
    "1617883662",
    "1590103744",
    "1972653135",
    "2041058457",
    "1546582368",
    "1673831190",
    "1637480510",
    "1480040054",
    "2115440057",
    "2059483606",
    "1336087349",
    "1347315367",
    "1935653698",
    "1209858289",
    "1650098849",
    "1643694723",
    "1732214668",
    "1740047200",
    "1586912179",
    "1559696504",
    "1469191373",
    "1851254214",
    "1234379666",
    "1917165275",
    "1584560094",
    "1179319575",
    "1641006506",
    "2035989217",
    "1926661300",
    "1678130613",
    "1727190974",
    "2093547249",
    "1652554715",
    "1772077397",
    "1929734618",
    "1394253915",
    "1519468408",
    "2141607443",
    "1314177183",
    "1624967628",
    "2091837588",
    "1614393352",
    "1720123123",
    "1709882922",
    "2104429073",
    "1922992673",
    "1376948626",
    "1814963734",
    "2186436757",
    "1813392684",
    "1875330360",
    "1746364549"
];
function getRandomEmoji() {
    const eroticEmojis = ["🔥", "💋", "👅", "🍆", "🔥", "💋", " 🙈", "👅", "🍑", "🍆", "💦", "🍑", "😚", "😏", "💦", "🥕", "🥖"];
    const randomIndex = Math.floor(Math.random() * eroticEmojis.length);
    return eroticEmojis[randomIndex];
}
exports.getRandomEmoji = getRandomEmoji;
function generateEmojis() {
    const emoji1 = getRandomEmoji();
    const emoji2 = getRandomEmoji();
    return emoji1 + emoji2;
}
exports.generateEmojis = generateEmojis;
function getCurrentHourIST() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const istHour = istTime.getUTCHours();
    return istHour;
}
exports.getCurrentHourIST = getCurrentHourIST;
const createPromoteClient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${process.env.uptimeChecker}/promoteclients`, payload, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });
        console.log('Response:', response.data);
    }
    catch (error) {
        (0, parseError_1.parseError)(error, "Failedd to insert promoteClient");
    }
});
exports.createPromoteClient = createPromoteClient;
function saveFile(url, name) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const urlPathname = new URL(url).pathname;
        const urlFilename = urlPathname.split('/').pop() || '';
        const urlExtMatch = urlFilename.match(/\.([^.]+)$/);
        const urlExtension = urlExtMatch ? urlExtMatch[1].toLowerCase() : '';
        const getExtFromMimeType = (mimeType) => {
            const mimeToExt = {
                'image/jpeg': 'jpg',
                'image/jpg': 'jpg',
                'image/png': 'png',
                'image/gif': 'gif',
                'image/webp': 'webp',
                'image/bmp': 'bmp',
                'video/mp4': 'mp4',
                'video/webm': 'webm',
                'video/quicktime': 'mov'
            };
            return mimeToExt[mimeType.toLowerCase()] || '';
        };
        try {
            const response = yield (0, fetchWithTimeout_1.fetchWithTimeout)(url, { responseType: 'arraybuffer' });
            if ((response === null || response === void 0 ? void 0 : response.status) === 200) {
                const contentType = (_a = response.headers) === null || _a === void 0 ? void 0 : _a['content-type'];
                const mimeExtension = contentType ? getExtFromMimeType(contentType) : '';
                const extension = urlExtension || mimeExtension || 'jpg';
                const filename = name
                    ? `${name}.${extension}`
                    : urlFilename && urlExtMatch
                        ? urlFilename
                        : urlFilename
                            ? `${urlFilename}.${extension}`
                            : `file_${Date.now()}.${extension}`;
                const downloadsDir = path.join(__dirname, 'downloads');
                try {
                    if (!fs.existsSync(downloadsDir)) {
                        fs.mkdirSync(downloadsDir, { recursive: true });
                    }
                }
                catch (err) {
                    console.error('Failed to create downloads directory:', err);
                    throw new Error(`Failed to create downloads directory: ${err.message}`);
                }
                const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
                const mypath = path.join(downloadsDir, sanitizedFilename);
                try {
                    fs.writeFileSync(mypath, response.data);
                    console.log(`${sanitizedFilename} Saved!!`);
                    return mypath;
                }
                catch (err) {
                    console.error('File operation error:', err);
                    throw new Error(`Failed to save file: ${err.message}`);
                }
            }
            else {
                throw new Error(`Unable to download file from ${url}`);
            }
        }
        catch (err) {
            console.error('Download error:', err);
            throw err;
        }
    });
}
exports.saveFile = saveFile;
const tokens = [
    '7384145001:AAF4Nl2pSazwu38-XWTJmet5FlrDxashEuU',
    '7680874957:AAE1mGeePmCICi806D6kx8otQ4UbEMXOZS0',
    '7958113591:AAG_HKjeSu35Abm4ktqU46FqIhAaprR9KaA',
    '7464291326:AAH7NCQ6dT7YVwFypv5H2K9Og2xaLXiQPSs',
    '7433483604:AAEX84KOmBgdixxxwFFFbjmQ1jCX9Mz7Mfw',
    '7885356543:AAH2NQHh-tg-18mx4Esfxii-KvqFmqX_oTY',
    '7614665094:AAFCUYuiuYHon6FUDtlbE_PBbW_NmIAf3Rw',
    '7828340584:AAHAh0HP9vjaMsw42iEzc125NaOsOKrSfAo',
    // '7769077001:AAGK0UT3pyhuwo81YG288-2_CwfFeQgB_EE',
    // '7994900648:AAEnwhn1ZS0Br2BdANBrNC9pZZggUItx5Rk',
    // '7979766907:AAG08akgblj4QGlLUrzBMAz_6VQrJ5dnSCw',
    // '7923345988:AAFFo5wXJYsWMt8TDquo9KZ5cGgYRqT3Oic',
    // '7634159711:AAF6QF7w8QfrksGG5ZTw4VDlEQ909gJNyWw',
    // '7634005083:AAG8QHPiwAkZCRVioaGtR-jTYgl6e5viQDQ',
    // '7820411275:AAHEOz0F0aDsJRwq4JLupwTs_LeOKQJgEY8',
    // '7707765607:AAGTs0xEhOvnBH5F6BjEBSmbXWdQCrHjk-E'
];
let currentTokenIndex = Math.floor(Math.random() * tokens.length);
function sendToLogs({ message, chatId = process.env.logsChatId, maxRetries = tokens.length, timeoutMs = 1500 }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let attempts = 0;
        const encodedMessage = encodeURIComponent(`@${process.env.clientId.toUpperCase()} : ${message}`);
        currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
        while (attempts < maxRetries) {
            const token = tokens[currentTokenIndex];
            const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`;
            try {
                const response = yield axios_1.default.get(apiUrl, { timeout: timeoutMs });
                if (response.status === 200) {
                    return; // Exit on success
                }
                else if (response.status === 429) {
                    console.error(`Rate limit error: ${response.status} ${response.statusText}`);
                    yield sleep(1000); // Wait before retrying
                }
                else {
                    console.error(`HTTP error: ${response.status} ${response.statusText}`);
                }
            }
            catch (error) {
                if (error.code === 'ECONNABORTED' || ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                    console.error(`Timeout error with token ${token}:`, error.message, "message: ", decodeURIComponent(encodedMessage));
                    return;
                }
                else {
                    if (error.response && error.response.status === 429) {
                        console.error(`Rate limit error with token ${token}:`, error.message, "message: ", decodeURIComponent(encodedMessage));
                        yield sleep(1000); // Wait before retrying
                    }
                    else {
                        console.error(`Error with token ${token}:`, error.message, "message: ", decodeURIComponent(encodedMessage));
                    }
                }
            }
            attempts++;
            if (attempts < maxRetries) {
                console.log(`Retrying with the next token...`);
            }
        }
        console.error(`Message sending failed after ${attempts} retries`);
    });
}
exports.sendToLogs = sendToLogs;
exports.defaultMessages = [
    "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "11", "12", "13", "14", "15",
    "16", "17", "18", "19", "20", "21"
];
function getRandomBoolean() {
    return Math.random() >= 0.5;
}
exports.getRandomBoolean = getRandomBoolean;
function formatDateTime(date) {
    return date.toLocaleString("en-US", {
        day: "numeric",
        month: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata" // Set to IST
    }).replace(/^(\d+)\/(\d+)/, "$2/$1"); // Swap month and day
}
exports.formatDateTime = formatDateTime;


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

/***/ "node-schedule-tz":
/*!***********************************!*\
  !*** external "node-schedule-tz" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node-schedule-tz");

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

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map