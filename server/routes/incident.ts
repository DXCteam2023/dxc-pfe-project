import { Router } from "express";

import {getIncidents, getIncidentById, updateIncident} from "../controllers/incidents"

const incidentRouter = Router();


// GET /api/incidents
incidentRouter.get("/",getIncidents);

// GET /api/incidents/:id
incidentRouter.get('/:id', getIncidentById);

// // DELETE /incidents/:id
// router.delete('/incidents/:id', async (req, res) => {
//   try {
//     const incidentId = req.params.id;
//     // Find the incident by ID and delete it from the database
//     const deletedIncident = await Incident.findByIdAndDelete(incidentId);

//     if (!deletedIncident) {
//       // If the incident with the specified ID doesn't exist, return a 404 response
//       return res.status(404).json({ error: 'Incident not found' });
//     }

//     // Return a success response
//     return res.json({ message: 'Incident deleted successfully' });
//   } catch (error) {
//     // Handle any errors that occur during the deletion process
//     console.error('Error deleting incident:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

// PUT /api/incidents/:id
incidentRouter.put('/:id', updateIncident);

export default incidentRouter;
