import React from "react";

interface IncidentDetailsModalProps {
  incident: any;
  closeModal: () => void;
}

const IncidentDetailsModal: React.FC<IncidentDetailsModalProps> = ({
  incident,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Incident Details</h2>
        <div>
          <p>
            <span className="font-semibold">Incident Number:</span>{" "}
            {incident.incidentNumber}
          </p>
          <p>
            <span className="font-semibold">Short Description:</span>{" "}
            {incident.shortDescription}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {incident.description}
          </p>
          <p>
            <span className="font-semibold">Priority:</span>
            {incident.priority}
          </p>
          <p>
            <span className="font-semibold">Category:</span>
            {incident.category}
          </p>
          <p>
            <span className="font-semibold">Assignment Group:</span>{" "}
            {incident.assignmentGroup}
          </p>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default IncidentDetailsModal;
