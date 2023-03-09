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
exports.PlaylistDatabase = void 0;
const types_1 = require("../types");
const BaseDatabase_1 = require("./BaseDatabase");
class PlaylistDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getPlaylistsWithCreators = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PlaylistDatabase.TABLE_PLAYLISTS)
                .select("playlists.id", "playlists.creator_id", "playlists.name", "playlists.likes", "playlists.dislikes", "playlists.created_at", "playlists.updated_at", "users.name AS creator_name")
                .join("users", "playlists.creator_id", "=", "users.id");
            return result;
        });
        this.insert = (playlistDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PlaylistDatabase.TABLE_PLAYLISTS)
                .insert(playlistDB);
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PlaylistDatabase.TABLE_PLAYLISTS)
                .select()
                .where({ id });
            return result[0];
        });
        this.update = (id, playlistDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PlaylistDatabase.TABLE_PLAYLISTS)
                .update(playlistDB)
                .where({ id });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PlaylistDatabase.TABLE_PLAYLISTS)
                .delete()
                .where({ id });
        });
        this.findPlaylistWithCreatorById = (playlistId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PlaylistDatabase.TABLE_PLAYLISTS)
                .select("playlists.id", "playlists.creator_id", "playlists.name", "playlists.likes", "playlists.dislikes", "playlists.created_at", "playlists.updated_at", "users.name AS creator_name")
                .join("users", "playlists.creator_id", "=", "users.id")
                .where("playlists.id", playlistId);
            return result[0];
        });
        this.likeOrDislikePlaylist = (likeDislike) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
                .insert(likeDislike);
        });
        this.findLikeDislike = (likeDislikeDBToFind) => __awaiter(this, void 0, void 0, function* () {
            const [likeDislikeDB] = yield BaseDatabase_1.BaseDatabase
                .connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
                .select()
                .where({
                user_id: likeDislikeDBToFind.user_id,
                playlist_id: likeDislikeDBToFind.playlist_id
            });
            if (likeDislikeDB) {
                return likeDislikeDB.like === 1
                    ? types_1.PLAYLIST_LIKE.ALREADY_LIKED
                    : types_1.PLAYLIST_LIKE.ALREADY_DISLIKED;
            }
            else {
                return null;
            }
        });
        this.removeLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
                .delete()
                .where({
                user_id: likeDislikeDB.user_id,
                playlist_id: likeDislikeDB.playlist_id
            });
        });
        this.updateLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PlaylistDatabase.TABLE_LIKES_DISLIKES)
                .update(likeDislikeDB)
                .where({
                user_id: likeDislikeDB.user_id,
                playlist_id: likeDislikeDB.playlist_id
            });
        });
    }
}
exports.PlaylistDatabase = PlaylistDatabase;
PlaylistDatabase.TABLE_PLAYLISTS = "playlists";
PlaylistDatabase.TABLE_LIKES_DISLIKES = "likes_dislikes";
//# sourceMappingURL=PlaylistDatabase.js.map