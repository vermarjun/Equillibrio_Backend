import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const Event = mongoose.model("Events", EventSchema);

export default Event;
