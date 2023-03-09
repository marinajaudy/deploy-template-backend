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
exports.PlaylistBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const Playlist_1 = require("../models/Playlist");
const types_1 = require("../types");
class PlaylistBusiness {
    constructor(playlistDatabase, idGenerator, tokenManager) {
        this.playlistDatabase = playlistDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.getPlaylists = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const playlistsWithCreatorsDB = yield this.playlistDatabase
                .getPlaylistsWithCreators();
            const playlists = playlistsWithCreatorsDB.map((playlistWithCreatorDB) => {
                const playlist = new Playlist_1.Playlist(playlistWithCreatorDB.id, playlistWithCreatorDB.name, playlistWithCreatorDB.likes, playlistWithCreatorDB.dislikes, playlistWithCreatorDB.created_at, playlistWithCreatorDB.updated_at, playlistWithCreatorDB.creator_id, playlistWithCreatorDB.creator_name);
                return playlist.toBusinessModel();
            });
            const output = playlists;
            return output;
        });
        this.createPlaylist = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, name } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            if (typeof name !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const updatedAt = new Date().toISOString();
            const creatorId = payload.id;
            const creatorName = payload.name;
            const playlist = new Playlist_1.Playlist(id, name, 0, 0, createdAt, updatedAt, creatorId, creatorName);
            const playlistDB = playlist.toDBModel();
            yield this.playlistDatabase.insert(playlistDB);
        });
        this.editPlaylist = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToEdit, token, name } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            if (typeof name !== "string") {
                throw new BadRequestError_1.BadRequestError("'name' deve ser string");
            }
            const playlistDB = yield this.playlistDatabase.findById(idToEdit);
            if (!playlistDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            if (playlistDB.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("somente quem criou a playlist pode editá-la");
            }
            const creatorName = payload.name;
            const playlist = new Playlist_1.Playlist(playlistDB.id, playlistDB.name, playlistDB.likes, playlistDB.dislikes, playlistDB.created_at, playlistDB.updated_at, creatorId, creatorName);
            playlist.setName(name);
            playlist.setUpdatedAt(new Date().toISOString());
            const updatedPlaylistDB = playlist.toDBModel();
            yield this.playlistDatabase.update(idToEdit, updatedPlaylistDB);
        });
        this.deletePlaylist = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToDelete, token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const playlistDB = yield this.playlistDatabase.findById(idToDelete);
            if (!playlistDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            if (payload.role !== types_1.USER_ROLES.ADMIN
                && playlistDB.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("somente quem criou a playlist pode deletá-la");
            }
            yield this.playlistDatabase.delete(idToDelete);
        });
        this.likeOrDislikePlaylist = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToLikeOrDislike, token, like } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausente");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            if (typeof like !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'like' deve ser boolean");
            }
            const playlistWithCreatorDB = yield this.playlistDatabase
                .findPlaylistWithCreatorById(idToLikeOrDislike);
            if (!playlistWithCreatorDB) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const userId = payload.id;
            const likeSQLite = like ? 1 : 0;
            const likeDislikeDB = {
                user_id: userId,
                playlist_id: playlistWithCreatorDB.id,
                like: likeSQLite
            };
            const playlist = new Playlist_1.Playlist(playlistWithCreatorDB.id, playlistWithCreatorDB.name, playlistWithCreatorDB.likes, playlistWithCreatorDB.dislikes, playlistWithCreatorDB.created_at, playlistWithCreatorDB.updated_at, playlistWithCreatorDB.creator_id, playlistWithCreatorDB.creator_name);
            const likeDislikeExists = yield this.playlistDatabase
                .findLikeDislike(likeDislikeDB);
            if (likeDislikeExists === types_1.PLAYLIST_LIKE.ALREADY_LIKED) {
                if (like) {
                    yield this.playlistDatabase.removeLikeDislike(likeDislikeDB);
                    playlist.removeLike();
                }
                else {
                    yield this.playlistDatabase.updateLikeDislike(likeDislikeDB);
                    playlist.removeLike();
                    playlist.addDislike();
                }
            }
            else if (likeDislikeExists === types_1.PLAYLIST_LIKE.ALREADY_DISLIKED) {
                if (like) {
                    yield this.playlistDatabase.updateLikeDislike(likeDislikeDB);
                    playlist.removeDislike();
                    playlist.addLike();
                }
                else {
                    yield this.playlistDatabase.removeLikeDislike(likeDislikeDB);
                    playlist.removeDislike();
                }
            }
            else {
                yield this.playlistDatabase.likeOrDislikePlaylist(likeDislikeDB);
                like ? playlist.addLike() : playlist.addDislike();
            }
            const updatedPlaylistDB = playlist.toDBModel();
            yield this.playlistDatabase.update(idToLikeOrDislike, updatedPlaylistDB);
        });
    }
}
exports.PlaylistBusiness = PlaylistBusiness;
//# sourceMappingURL=PlaylistBusiness.js.map