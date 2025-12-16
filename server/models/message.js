import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: Boolean, default: false },
    date: { type: Number, required: true },
    reply: { type: String, default: "" },
    replyDate: { type: Number, default: 0 },
});

const messageModel = mongoose.models.messages || mongoose.model("messages", messageSchema);
export default messageModel;