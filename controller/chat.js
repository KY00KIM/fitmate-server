const { Chatroom } = require('../model/Chatroom');
const ResponseManager = require('../config/response');
const STATUS_CODE = require('../config/http_status_code');

const chatController = {
    getAllChatroom: async (req, res) => {
        try {
            let user_id = req.user.id;
            const ChatroomList = await Chatroom.find({ $or: [{ 'chat_start_id': user_id }, { 'chat_join_id': user_id }], is_deleted: false });
            ResponseManager.getDefaultResponseHandler(res)['onSuccess'](ChatroomList, 'SuccessOK', STATUS_CODE.SuccessOK);
        } catch (error) {
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
        }
    },
    getOneChatroom: async (req, res) => {
        try {
            const { chatroomId } = req.params;
            const chatroom = await Chatroom.findById(chatroomId);
            return ResponseManager.getDefaultResponseHandler(res)['onSuccess'](chatroom, 'SuccessOK', STATUS_CODE.SuccessOK);
        } catch (error) {
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
        }
    },
    createOneChatroom: async (req, res) => {
        try {
            const { chat_join_id } = req.body
            const chatroom = await Chatroom.create({ chat_start_id: req.user.id, chat_join_id });
            ResponseManager.getDefaultResponseHandler(res)['onSuccess'](chatroom, 'SuccessCreated', STATUS_CODE.SuccessCreated);
        } catch (error) {
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
        }
    },
    deleteOneChatroom: async (req, res) => {
        try {
            const { chatroomId } = req.params;
            const chatroom = await Chatroom.findByIdAndUpdate(chatroomId, { is_deleted: true }, { new: true, runValidators: true });
            ResponseManager.getDefaultResponseHandler(res)['onSuccess'](chatroom, 'SuccessOK', STATUS_CODE.SuccessOK);
        } catch (error) {
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
        }
    },
    getAllPopulatedChatroom: async (req, res) => {
        try {
            let user_id = req.user.id;
            const ChatroomList = await Chatroom.find({ $or: [{ 'chat_start_id': user_id }, { 'chat_join_id': user_id }], is_deleted: false }).populate('chat_start_id').populate('chat_join_id');
            ResponseManager.getDefaultResponseHandler(res)['onSuccess'](ChatroomList, 'SuccessOK', STATUS_CODE.SuccessOK);
        } catch (error) {
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
        }
    },
    getOnePopulatedChatroom: async (req, res) => {
        try {
            const { chatroomId } = req.params;
            const chatroom = await Chatroom.findById(chatroomId).populate('chat_start_id').populate('chat_join_id');
            return ResponseManager.getDefaultResponseHandler(res)['onSuccess'](chatroom, 'SuccessOK', STATUS_CODE.SuccessOK);
        } catch (error) {
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
        }
    },
}


module.exports = chatController;