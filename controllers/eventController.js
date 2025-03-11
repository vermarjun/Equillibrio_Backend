import { response } from 'express';
import Event from '../model/user.js'

// Fetch Events
export const fetchEvents = async (req, res) => {
    try {
        const events = await Event.findOne();
        return res.status(200).json({
            response: events,
            message: "Data Fetched Successfully",
            success: false, 
        })
    } catch (error) {
        console.error("Error in fetching events:", error.message); // Log the error
        return res.status(500).json({ 
            response: null,
            message: "Server error. Please try again later.", 
            success: false, 
        });
    }
};

// Add new events
export const AddNewEvents = async (req, res) => {
    try {
        const {name ,title ,desc ,image ,dept , place} = req.body;

        if (!name || !title || !desc || !image || !dept){
            return res.status(400).json({
                response: null,
                message: "All fields (name, title, description, image, dept) are required!",
                success: false
            })
        } 

        // Check if the event already exists
        const existingEvent = await Event.findOne({name});
        if (existingEvent) {
            return res.status(400).json({ 
                message: 'Event already Exists', 
                success: false 
            });
        }

        if (place == undefined || place == null || place == ""){
            place = "New IT Building"
        }
        // Create a new event
        const newEvent = await Event.create({
            name: name,
            title: title,
            description: desc,
            image: image,
            department: dept,
            place: place
            
        });
        return res.status(201).json({ 
            response: newEvent,
            message: "Event added successfully", 
            success: true,
        });
    } catch (error){
        return res.status(500).json({ 
            response: null,
            message: error.message, 
            success: false,
        });
    }
}