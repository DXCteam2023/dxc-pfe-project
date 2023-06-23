import Incident from "../../models/incident"
import { Request, Response } from "express";

export default async function getIncidentById  (req: Request, res: Response) {
    try {
      const incidentId = req.params.id;
      // Find the incident by ID in the database
      const incident = await Incident.findById(incidentId);
  
      if (!incident) {
        // If the incident with the specified ID doesn't exist, return a 404 response
        return res.status(404).json({ error: 'Incident not found' });
      }
  
      // Return the incident
      return res.json(incident);
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      console.error('Error retrieving incident:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }