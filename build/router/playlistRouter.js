"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRouter = void 0;
const express_1 = __importDefault(require("express"));
const PlaylistBusiness_1 = require("../business/PlaylistBusiness");
const PlaylistController_1 = require("../controller/PlaylistController");
const PlaylistDatabase_1 = require("../database/PlaylistDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
exports.playlistRouter = express_1.default.Router();
const playlistController = new PlaylistController_1.PlaylistController(new PlaylistBusiness_1.PlaylistBusiness(new PlaylistDatabase_1.PlaylistDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()));
exports.playlistRouter.get("/", playlistController.getPlaylists);
exports.playlistRouter.post("/", playlistController.createPlaylist);
exports.playlistRouter.put("/:id", playlistController.editPlaylist);
exports.playlistRouter.delete("/:id", playlistController.deletePlaylist);
exports.playlistRouter.put("/:id/like", playlistController.likeOrDislikePlaylist);
//# sourceMappingURL=playlistRouter.js.map