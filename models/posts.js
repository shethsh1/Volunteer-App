
'use strict';

const mongoose = require('mongoose')
const { ObjectID } = require("mongodb");

const CommentSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: true,
    },
    status: {
        type: String,
    },
    username: {
        type: String,
    },
    image: {
        type: String,
    },

    detail: {
        type: String,
        required: true,
    },



})
CommentSchema.add({ responses: [CommentSchema] });

const PostSchema = new mongoose.Schema({
    author: {
        type: ObjectID,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    peopleNeeded: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
    },
    username: {
        type: String,
    },
    image: {
        type: String,
    },
    comments: [CommentSchema]





})




const Post = mongoose.model('Post', PostSchema)

module.exports = { Post }

