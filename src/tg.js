/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
let AppController = class AppController extends common_tg_service_1.AppController {
    constructor(appService) {
        super();
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async setupClient(clientId, setupClientQueryDto) {
        this.appService.setupClient(clientId, setupClientQueryDto);
        return `Started Client Seup for ${clientId}`;
    }
    exit() {
        process.exit(1);
    }
    async refreshmap() {
        return this.appService.refreshmap();
    }
    async forward(url, query) {
        delete query.url;
        if (!url) {
            throw new common_1.BadRequestException('The "url" query parameter is required.');
        }
        return await this.appService.forwardGetRequest(url, query);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('setupClient/:clientId'),
    (0, swagger_1.ApiOperation)({ summary: 'SetUp Client data' }),
    __param(0, (0, common_1.Param)('clientId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, common_tg_service_1.SetupClientQueryDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setupClient", null);
__decorate([
    (0, common_1.Get)("exit"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "exit", null);
__decorate([
    (0, common_1.Get)('refreshmap'),
    (0, swagger_1.ApiOperation)({ summary: 'refreshmap for Clients' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshmap", null);
__decorate([
    (0, common_1.Get)('forward'),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "forward", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const cts = __webpack_require__(/*! common-tg-service */ "common-tg-service");
const AMS = __webpack_require__(/*! ams-ssk */ "ams-ssk");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cts.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => cts.InitModule),
            AMS.FileModule.forRoot(),
            (0, common_1.forwardRef)(() => cts.BuildModule),
            (0, common_1.forwardRef)(() => cts.ClientModule),
            (0, common_1.forwardRef)(() => cts.BufferClientModule),
            (0, common_1.forwardRef)(() => cts.ChannelsModule),
            (0, common_1.forwardRef)(() => cts.UsersModule),
            (0, common_1.forwardRef)(() => cts.UserDataModule),
            (0, common_1.forwardRef)(() => cts.PromoteClientModule),
            (0, common_1.forwardRef)(() => cts.TelegramModule),
            (0, common_1.forwardRef)(() => cts.UpiIdModule),
            (0, common_1.forwardRef)(() => cts.NpointModule),
            (0, common_1.forwardRef)(() => cts.PromoteMsgModule),
            (0, common_1.forwardRef)(() => cts.TransactionModule),
            (0, common_1.forwardRef)(() => cts.ArchivedClientModule),
            (0, common_1.forwardRef)(() => cts.TimestampModule),
            (0, common_1.forwardRef)(() => cts.TgSignupModule),
            (0, common_1.forwardRef)(() => cts.ActiveChannelsModule),
            (0, common_1.forwardRef)(() => cts.Stat1Module),
            (0, common_1.forwardRef)(() => cts.Stat2Module),
            (0, common_1.forwardRef)(() => cts.PromoteStatModule),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule = __webpack_require__(/*! node-schedule-tz */ "node-schedule-tz");
const axios_1 = __webpack_require__(/*! axios */ "axios");
const common_tg_service_1 = __webpack_require__(/*! common-tg-service */ "common-tg-service");
let AppService = class AppService {
    constructor(clientService, bufferClientService) {
        this.clientService = clientService;
        this.bufferClientService = bufferClientService;
        console.log("App Module Constructor initiated !!");
    }
    onModuleInit() {
        console.log("App Module initiated !!");
        try {
            schedule.scheduleJob('test3', ' 25 2 * * * ', 'Asia/Kolkata', async () => {
                await this.bufferClientService.checkBufferClients();
            });
            schedule.scheduleJob('test4', '0 */3 * * *', 'Asia/Kolkata', async () => {
                this.bufferClientService.joinchannelForBufferClients();
            });
        }
        catch (error) {
            console.log("Some Error: ", error);
        }
        if (!process.env.LOCAL_SERVER) {
            setTimeout(() => {
                this.bufferClientService.joinchannelForBufferClients();
            }, 60000);
        }
    }
    refreshmap() {
        this.clientService.refreshMap();
    }
    async setupClient(clientId, setupClientQueryDto) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.bufferClientService.joinchannelForBufferClients();
            this.timeoutId = undefined;
        }, 120000);
        return this.clientService.setupClient(clientId, setupClientQueryDto);
    }
    getHello() {
        return 'Hello World!';
    }
    async forwardGetRequest(externalUrl, queryParams) {
        try {
            const response = await axios_1.default.get(externalUrl, { params: queryParams });
            return response.data;
        }
        catch (error) {
            throw new Error(`Error forwarding GET request: ${error.message}`);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_tg_service_1.ClientService,
        common_tg_service_1.BufferClientService])
], AppService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "ams-ssk":
/*!**************************!*\
  !*** external "ams-ssk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("ams-ssk");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "common-tg-service":
/*!************************************!*\
  !*** external "common-tg-service" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("common-tg-service");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "node-schedule-tz":
/*!***********************************!*\
  !*** external "node-schedule-tz" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node-schedule-tz");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
    });
    app.use((req, res, next) => {
        res.setHeader('Cache-Control', 'no-store');
        next();
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS and Express API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    mongoose_1.default.set('debug', true);
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    process.on('uncaughtException', (reason, promise) => {
        console.error(promise, reason);
    });
    let isShuttingDown = false;
    const shutdown = async (signal) => {
        if (isShuttingDown)
            return;
        isShuttingDown = true;
        console.log(`${signal} received`);
        await app.close();
        process.exit(0);
    };
    process.on('exit', async () => {
        console.log('Application closed');
    });
    process.on('SIGINT', async () => {
        await shutdown('SIGINT');
    });
    process.on('SIGTERM', async () => {
        await shutdown('SIGTERM');
    });
    process.on('SIGQUIT', async () => {
        await shutdown('SIGQUIT');
    });
    await app.init();
    await app.listen(process.env.PORT || 9000);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=index.js.map