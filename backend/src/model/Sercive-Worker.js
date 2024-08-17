import mongoose from "mongoose";

const sw_Schema = mongoose.Schema({
    userId: { type: String, required: true, ref: 'user' },
    endpoint: { type: String, unique: true },
    keys: {
        p256dh: { type: String },
        auth: { type: String }
    },
}, { timestamp: true });


const ServiceWorker = mongoose.model('service-worker', sw_Schema);

export default ServiceWorker