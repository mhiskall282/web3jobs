// src/components/Login.tsx
import * as React from 'react';
import { useAuth } from '../../context/AuthContext';



export const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div>
      <h2>Welcome to Freelancing Platform</h2>
      <button onClick={login}>Login with Internet Identity</button>
    </div>
  );
};

