import React from 'react';
import ChallengeForm from './ChallengeForm';
import { useNavigate } from 'react-router-dom';

const CreateChallengePage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <ChallengeForm onSuccess={() => navigate('/challenges')} onCancel={() => navigate('/challenges')} />
    </div>
  );
};

export default CreateChallengePage;
