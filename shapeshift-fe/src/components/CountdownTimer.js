import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function getDurationInSeconds(challenge) {
  if (!challenge) return 0;
  switch (challenge.duration_type) {
    case 'seconds':
      return challenge.duration;
    case 'minutes':
      return challenge.duration * 60;
    case 'hours':
      return challenge.duration * 3600;
    default:
      return challenge.duration * 60;
  }
}

function formatTimeLeft(seconds) {
  if (seconds <= 0) return '00:00:00';
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const CountdownTimer = ({ participation, challenge }) => {
  const location = useLocation();
  const [active, setActive] = useState(true);

  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef();
  const pausedRef = useRef(false);
  const remainingRef = useRef(null);

  useEffect(() => {
    if (!participation || !participation.joined_at || !challenge) return;
    const joinedAt = new Date(participation.joined_at);
    const duration = getDurationInSeconds(challenge);
    const endTime = joinedAt.getTime() + duration * 1000;

    const update = () => {
      if (!pausedRef.current) {
        const now = Date.now();
        const left = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(left);
        remainingRef.current = left;
      }
    };
    update();
    timerRef.current = setInterval(update, 1000);

    const handleBlur = () => {
      pausedRef.current = true;
    };
    const handleFocus = () => {
      pausedRef.current = false;
      // Recalculate based on time passed
      update();
    };
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(timerRef.current);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [participation, challenge]);

  // Pause timer on route change away from challenge details
  useEffect(() => {
    const isOnChallengeDetails = location.pathname.includes('/challenges/') && !location.pathname.endsWith('/my-challenges');
    setActive(isOnChallengeDetails);
    pausedRef.current = !isOnChallengeDetails;
  }, [location]);

  if (!participation || !participation.joined_at || !challenge) return null;

  return (
    <div style={{ marginTop: '0.5rem', color: '#ff6600' }}>
      <strong>Time Left:</strong> {timeLeft !== null ? formatTimeLeft(timeLeft) : '...'}
    </div>
  );
};


export default CountdownTimer;
