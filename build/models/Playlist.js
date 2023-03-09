"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
class Playlist {
    constructor(id, name, likes, dislikes, createdAt, updatedAt, creatorId, creatorName) {
        this.id = id;
        this.name = name;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    addLike() {
        this.likes += 1;
    }
    removeLike() {
        this.likes -= 1;
    }
    addDislike() {
        this.dislikes += 1;
    }
    removeDislike() {
        this.dislikes -= 1;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(value) {
        this.updatedAt = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getCreatorName() {
        return this.creatorName;
    }
    setCreatorName(value) {
        this.creatorName = value;
    }
    toDBModel() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            name: this.name,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    toBusinessModel() {
        return {
            id: this.id,
            name: this.name,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        };
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=Playlist.js.map