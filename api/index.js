const express = require("express");
const bodyParser = require("body-parser");
const { createUser, searchUsers } = require("./controllers/user.controller.js");
const {
  createConversation,
  getAllConversations,
  addMessageToConversation,
  getConversationMessages,
} = require("./controllers/conversions.controller.js");
const { exec } = require("node:child_process");


const { Server } = require("socket.io");
const http = require("http");
const Socket = require("./utils/socket.js");
const { minify } = require("html-minifier");
const fs = require('fs');
const { join } = require("path")
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MINIFY_OPTIONS = {
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  includeAutoGeneratedTags: false,
  keepClosingSlash: false,
  minifyJS: true,
  minifyCSS: true,
  removeAttributeQuotes: true,
};


app.get('/api/', (req, res) => {
  res.send('index.html')
});
app.get("server/users/create", createUser);
app.get("/backend/users/search", searchUsers);
app.post("/conversations/create", createConversation);
app.get("*/conversations", getAllConversations);
app.post("/messages/create", addMessageToConversation);
app.get("/messages/get", getConversationMessages);
const server = http.createServer(app);
const ioServer = new Server(server);

Socket.getInstance(ioServer);
server.listen(4000);
module.exports = server;
