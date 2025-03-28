// src/components/RoleSelection.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { createActor } from '../../../declarations/web3jobs_backend';
import { canisterId } from "../../../declarations/web3jobs_backend";
import { AuthService } from '../../services/authServices';

export const RoleSelection: React.FC = () => {
  const { checkUserRole } = useAuth();

  const selectRole = async (role: 'freelancer' | 'recruiter') => {
    try {
      const identity = await AuthService.getIdentity();
      const actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });

      // Convert the role into a valid Motoko variant type
      const motokoRole = role === "freelancer" ? { Freelancer: null } : { Recruiter: null };

      // Call your backend function to register the user with the selected role
      await actor.registerUser(motokoRole);
      await checkUserRole();
    } catch (error) {
      console.error("Error selecting role:", error);
    }
  };

  return (
    <div>
      <h2>Select Your Role</h2>
      <p>Please select your role on the platform:</p>
      <div>
        <button onClick={() => selectRole('freelancer')}>I'm a Freelancer</button>
        <button onClick={() => selectRole('recruiter')}>I'm a Recruiter</button>
      </div>
    </div>
  );
};
