import { STATE_NAMES, type StateAbbreviation, type StateFullName } from "./states";

// 1. Create a reverse map for fast O(1) abbreviation lookups
const REVERSE_STATE_NAMES = Object.fromEntries(
  (Object.entries(STATE_NAMES) as [StateAbbreviation, StateFullName][]).map(
    ([abbr, name]) => [name, abbr]
  )
) as Record<StateFullName, StateAbbreviation>;


/**
 * Gets the full name of a state from its 2-letter abbreviation.
 * Returns undefined if the abbreviation is not found.
 */
export function getStateNameByAbbreviation(abbr: string): StateFullName | undefined {
  const upperAbbr = abbr.toUpperCase();
  
  // Guard clause to ensure the string exists in our map
  if (upperAbbr in STATE_NAMES) {
    return STATE_NAMES[upperAbbr as StateAbbreviation];
  }
  return undefined;
}


/**
 * Gets the 2-letter abbreviation of a state from its full name.
 * Case-insensitive. Returns undefined if the name is not found.
 */
export function getAbbreviationByStateName(name: string): StateAbbreviation | undefined {
  // Normalize the input to match the capitalized map values (e.g., "new york" -> "New York")
  const formattedName = name
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

  if (formattedName in REVERSE_STATE_NAMES) {
    return REVERSE_STATE_NAMES[formattedName as StateFullName];
  }
  return undefined;
}
