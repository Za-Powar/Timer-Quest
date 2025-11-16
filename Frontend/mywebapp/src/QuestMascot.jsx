// QuestMascot.jsx
// Contains three clock mascots + a default export

// ---------- SAD CLOCK ----------
export const SadClock = () => (
  <svg width="180" height="180" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="70" fill="white" stroke="#6C63FF" strokeWidth="8" />
    <line x1="100" y1="100" x2="100" y2="55" stroke="#6C63FF" strokeWidth="6" strokeLinecap="round" />
    <line x1="100" y1="100" x2="140" y2="100" stroke="#6C63FF" strokeWidth="6" strokeLinecap="round" />

    <circle cx="78" cy="90" r="9" fill="#1a1a2e" />
    <circle cx="122" cy="90" r="9" fill="#1a1a2e" />
    <circle cx="76" cy="88" r="3" fill="white" />
    <circle cx="120" cy="88" r="3" fill="white" />

    <path d="M70 125 Q100 105 130 125" stroke="#444" strokeWidth="5" fill="transparent" strokeLinecap="round" />

    <ellipse cx="100" cy="40" rx="75" ry="18" fill="#8b5e34" />
    <rect x="45" y="10" width="110" height="35" rx="10" fill="#a07442" />

    <circle cx="40" cy="110" r="18" fill="#6C63FF" />
    <circle cx="160" cy="110" r="18" fill="#6C63FF" />
    <ellipse cx="75" cy="165" rx="26" ry="12" fill="#9A63F9" />
    <ellipse cx="125" cy="165" rx="26" ry="12" fill="#9A63F9" />
  </svg>
);


// ---------- NEUTRAL CLOCK ----------
export const NeutralClock = () => (
  <svg width="180" height="180" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="70" fill="white" stroke="#6C63FF" strokeWidth="8" />
    <line x1="100" y1="100" x2="100" y2="55" stroke="#6C63FF" strokeWidth="6" strokeLinecap="round" />
    <line x1="100" y1="100" x2="140" y2="100" stroke="#6C63FF" strokeWidth="6" strokeLinecap="round" />

    <circle cx="78" cy="90" r="10" fill="#1a1a2e" />
    <circle cx="122" cy="90" r="10" fill="#1a1a2e" />
    <circle cx="76" cy="87" r="4" fill="white" />
    <circle cx="120" cy="87" r="4" fill="white" />

    <path d="M70 120 Q100 130 130 120" stroke="#444" strokeWidth="5" fill="transparent" strokeLinecap="round" />

    <ellipse cx="100" cy="40" rx="75" ry="18" fill="#8b5e34" />
    <rect x="45" y="10" width="110" height="35" rx="10" fill="#a07442" />

    <circle cx="40" cy="110" r="18" fill="#6C63FF" />
    <circle cx="160" cy="110" r="18" fill="#6C63FF" />
    <ellipse cx="75" cy="165" rx="28" ry="12" fill="#9A63F9" />
    <ellipse cx="125" cy="165" rx="28" ry="12" fill="#9A63F9" />
  </svg>
);


// ---------- HAPPY CLOCK ----------
export const HappyClock = () => (
  <svg width="180" height="180" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="70" fill="white" stroke="#6C63FF" strokeWidth="8" />
    <line x1="100" y1="100" x2="100" y2="55" stroke="#6C63FF" strokeWidth="6" strokeLinecap="round" />
    <line x1="100" y1="100" x2="140" y2="100" stroke="#6C63FF" strokeWidth="6" strokeLinecap="round" />

    <circle cx="78" cy="90" r="12" fill="#1a1a2e" />
    <circle cx="122" cy="90" r="12" fill="#1a1a2e" />
    <circle cx="76" cy="87" r="5" fill="white" />
    <circle cx="120" cy="87" r="5" fill="white" />

    <path d="M65 120 Q100 150 135 120" stroke="#444" strokeWidth="6" fill="transparent" strokeLinecap="round" />

    <ellipse cx="100" cy="40" rx="75" ry="18" fill="#8b5e34" />
    <rect x="45" y="10" width="110" height="35" rx="10" fill="#a07442" />

    <circle cx="40" cy="110" r="20" fill="#6C63FF" />
    <circle cx="160" cy="110" r="20" fill="#6C63FF" />
    <ellipse cx="75" cy="165" rx="30" ry="14" fill="#9A63F9" />
    <ellipse cx="125" cy="165" rx="30" ry="14" fill="#9A63F9" />
  </svg>
);



// ---------- DEFAULT EXPORT ----------
// (NeutralClock is used as the default mascot)
export default NeutralClock;
