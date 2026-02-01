// Rate limiting for form submissions
const RATE_LIMIT_KEY = 'amanat_lastSubmission';
const RATE_LIMIT_MS = 60000; // 1 minute

export const canSubmitForm = (): boolean => {
  try {
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmission) return true;
    
    const timeSinceLastSubmit = Date.now() - parseInt(lastSubmission);
    return timeSinceLastSubmit > RATE_LIMIT_MS;
  } catch {
    return true; // If localStorage fails, allow submission
  }
};

export const recordSubmission = (): void => {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const getRemainingTime = (): number => {
  try {
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmission) return 0;
    
    const timeSinceLastSubmit = Date.now() - parseInt(lastSubmission);
    const remaining = Math.max(0, RATE_LIMIT_MS - timeSinceLastSubmit);
    return Math.ceil(remaining / 1000); // Return seconds
  } catch {
    return 0;
  }
};
