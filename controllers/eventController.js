import { response } from 'express';
import Event from '../model/event.js'

// Fetch Events
export const fetchEvents = async (req, res) => {
    try {
        const events = await Event.find();
        return res.status(200).json({
            response: events,
            message: "Data Fetched Successfully",
            success: true, 
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

// Delete event
export const deleteEvents = async (req, res) => {
    try {
        const {_id} = req.body;
        
        if (!_id){
            return res.status(400).json({
                response: null,
                message: "Name of the event is required to delete it",
                success: false
            })
        } 
        
        // Check if the event exists or not
        const existingEvent = await Event.findOne({_id});
        if (!existingEvent) {
            return res.status(400).json({ 
                message: 'Event hai hi nhi delete kaise hoga', 
                success: false 
            });
        }
        
        // Create a new event
        const deletedEvent = await Event.deleteMany({_id});

        return res.status(201).json({ 
            response: deletedEvent,
            message: "Event deleted successfully", 
            success: true,
        });
    } catch (error){
        console.log("error while deleting event: ", error);
        return res.status(500).json({ 
            response: null,
            message: error.message, 
            success: false,
        });
    }
};

// Update event
export const updateEvents = async (req, res) => {
    try {
        const {_id, name ,title ,description ,image ,department , place} = req.body;
        
        if (!_id){
            return res.status(400).json({
                response: null,
                message: "_id of the event is required to update it",
                success: false
            })
        } 
        
        // Check if the event exists
        const existingEvent = await Event.findOne({_id});
        if (!existingEvent) {
            return res.status(400).json({ 
                message: 'No such event exists, check _id for typo', 
                success: false 
            });
        }

        // jo jo user ne request me bheja hai i.e jo jo non null hai update it
        if (name) existingEvent.name = name;
        if (title) existingEvent.title = title;
        if (description) existingEvent.description = description;
        if (image) existingEvent.image = image;
        if (department) existingEvent.department = department;
        if (place) existingEvent.place = place;
        
        const updatedEvent = await existingEvent.save(); 

        return res.status(201).json({ 
            response: updatedEvent,
            message: "Event updated successfully", 
            success: true,
        });
    } catch (error){
        console.log("error while updating event: ", error);
        return res.status(500).json({ 
            response: null,
            message: error.message, 
            success: false,
        });
    }
};

// Add new events
export const AddNewEvents = async (req, res) => {
    try {
        const {name ,title ,description ,image ,department , place} = req.body;
        // console.log("checkpoint 1");
        if (!name || !title || !description || !image || !department){
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
        // console.log("checkpoint 2", existingEvent);
        
        if (place == undefined || place == null || place == ""){
            place = "New IT Building"
        }
        // Create a new event
        const newEvent = await Event.create({
            name,
            title,
            description,
            image,
            department,
            place
        });
        
        // console.log("checkpoint 3", newEvent);

        return res.status(201).json({ 
            response: newEvent,
            message: "Event added successfully", 
            success: true,
        });
    } catch (error){
        console.log("error while adding event: ", error);
        return res.status(500).json({ 
            response: null,
            message: error.message, 
            success: false,
        });
    }
}