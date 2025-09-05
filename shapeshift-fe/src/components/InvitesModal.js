import React, { useState } from 'react';
import ChallengeInvitations from './ChallengeInvitations';

const InvitesModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', borderRadius: 8, padding: 24, minWidth: 350, maxWidth: 500, position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer' }}
        >
          ×
        </button>
        <h2>My Invitations</h2>
        <ChallengeInvitations />
      </div>
    </div>
  );
};

export default InvitesModal;
