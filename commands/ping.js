"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Replies with pong',
    callback: function (_a) {
        var message = _a.message;
        message.reply('Pong');
    }
};
