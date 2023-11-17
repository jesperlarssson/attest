import React from "react";
import { User } from "@/types";

interface UserDisplayProps {
  user: User | null;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div className="shadow overflow-hidden rounded-md">
      <div className="px-4 py-5 bg-card-light dark:bg-card-dark border border-edge-light dark:border-edge-dark space-y-6 sm:p-6">
        <div className="flex flex-col gap-4">
          <h3>
            {user.name} (ID: {user.id})
          </h3>
          <p>Full Name: {user.fullName}</p>
          <p>Division: {user.division}</p>
          <p>Max Approve Amount: {user.maxApproveAmount}</p>
          <p>Responsible: {user.responsible}</p>
          <p>Not Available From: {user.notAvailableFrom}</p>
          <p>Not Available To: {user.notAvailableTo}</p>
          <p>Security Access: {user.securityAccess}</p>
          <p>Approval Flow: {user.approvalFlow}</p>
        </div>
        {user.nextLevel && (
          <div className="flex flex-col gap-4 mt-4 border-t pt-4">
            <h4 className="text-md font-semibold">Next Level:</h4>
            <p>ID: {user.nextLevel.id}</p>
            <p>Name: {user.nextLevel.name}</p>
            <p>Max Approve Amount: {user.nextLevel.maxApproveAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDisplay;
