// utils.ts (or types.ts)
import { ALL_STATES } from './states';

/**
 * 1. O(1) Quick Dictionary for Name Lookups
 * Converts the array into a static key-value map: { AL: "Alabama", AK: "Alaska" }
 */
const STATE_MAP = Object.fromEntries(
  ALL_STATES.map((state) => [state.code, state.name])
);

/**
 * Gets the Full State Name from an Abbreviation (e.g., "NY" -> "New York")
 * Case-insensitive safety built-in. Returns undefined if not found.
 */
export const getNameFromAbb = (abb: string): string | undefined => {
  return STATE_MAP[abb.toUpperCase()];
};

/**
 * Gets the Abbreviation from a Full State Name (e.g., "New York" -> "NY")
 * Strips whitespace and handles case insensitivity.
 */
export const getAbbFromName = (name: string): string | undefined => {
  const normalizedSearch = name.trim().toLowerCase();
  
  const foundState = ALL_STATES.find(
    (state) => state.name.toLowerCase() === normalizedSearch
  );

  return foundState?.code; // Returns "NY" or undefined
};
