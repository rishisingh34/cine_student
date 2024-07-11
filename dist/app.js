"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_config_1 = require("./config/env.config");
const db_config_1 = __importDefault(require("./config//db.config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const cors_config_1 = __importDefault(require("./config/cors.config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(cors_config_1.default);
(0, db_config_1.default)();
app.use('/student', student_routes_1.default);
app.listen(env_config_1.PORT, () => {
    console.log(`Server is running on port ${env_config_1.PORT}`);
});
