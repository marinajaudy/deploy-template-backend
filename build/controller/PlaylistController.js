"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistController = void 0;
const BaseError_1 = require("../errors/BaseError");
class PlaylistController {
    constructor(playlistBusiness) {
        this.playlistBusiness = playlistBusiness;
        this.getPlaylists = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization
                };
                const output = yield this.playlistBusiness.getPlaylists(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.createPlaylist = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    name: req.body.name
                };
                yield this.playlistBusiness.createPlaylist(input);
                res.status(201).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.editPlaylist = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToEdit: req.params.id,
                    name: req.body.name,
                    token: req.headers.authorization
                };
                yield this.playlistBusiness.editPlaylist(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.deletePlaylist = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToDelete: req.params.id,
                    token: req.headers.authorization
                };
                yield this.playlistBusiness.deletePlaylist(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.likeOrDislikePlaylist = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToLikeOrDislike: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                };
                yield this.playlistBusiness.likeOrDislikePlaylist(input);
                res.status(200).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.PlaylistController = PlaylistController;
//# sourceMappingURL=PlaylistController.js.map