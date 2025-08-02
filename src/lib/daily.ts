/**
 * Daily Pokemon related utility functions
 */

import { API_CONFIG } from '@/constants/pokemon';

/**
 * Generate unique user identifier
 * Prefer localStorage, fallback to temporary identifier if not available
 */
export function getUserId(): string {
  if (typeof window === 'undefined') {
    // Return default value during server-side rendering
    return 'server-default';
  }

  try {
    let userId = localStorage.getItem('pokemon-daily-user-id');

    if (!userId) {
      // Generate new user ID
      userId = generateUserId();
      localStorage.setItem('pokemon-daily-user-id', userId);
    }

    return userId;
  } catch (error) {
    // When localStorage is not available, generate browser-based temporary identifier
    console.warn('localStorage not available, using temporary user ID');
    return generateBrowserFingerprint();
  }
}

/**
 * Generate UUID format user ID
 */
function generateUserId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generate simple browser-based fingerprint
 */
function generateBrowserFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('pokemon-daily', 10, 10);

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');

  return hashString(fingerprint);
}

/**
 * Get current date string (YYYY-MM-DD)
 */
export function getCurrentDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Simple string hash function
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Calculate daily Pokemon ID based on user ID and date
 */
export function getDailyPokemonId(userId: string, dateString: string): number {
  // Create seed string
  const seed = `${dateString}-${userId}`;

  // Calculate hash value
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Ensure positive number and map to 1-1010 range
  const pokemonId = Math.abs(hash) % API_CONFIG.LIMITS.RANDOM_RANGE + 1;
  return pokemonId;
}

/**
 * Get today's Pokemon ID
 */
export function getTodaysPokemonId(): number {
  const userId = getUserId();
  const dateString = getCurrentDateString();
  return getDailyPokemonId(userId, dateString);
}

/**
 * Format date for display
 */
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
}
