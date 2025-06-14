export const CONFIG = {
  // Probability for a prompt to include a prefix (0.0 to 1.0)
  PREFIX_PROBABILITY: 0.25,

  // Probability for a prompt to include a suffix (0.0 to 1.0)
  SUFFIX_PROBABILITY: 0.1,

  // Probability for a portrait prompt to use a randomized shot (0.0 to 1.0)
  PORTRAIT_RANDOM_SHOT_ADD_PROBABILITY: 0.33,

  // Probability for a landscape prompt to use a randomized shot (0.0 to 1.0)
  LANDSCAPES_RANDOM_SHOT_ADD_PROBABILITY: 0.33,

  // Text used in select elements to indicate a random choice
  RANDOM_SHOT_TEXT: "Random Shot",

  // Options for portrait shot types
  PORTRAIT_SHOT_OPTIONS: ["Full-Length Shot", "American Shot", "Medium Shot", "Close-Up Shot", "Extreme Close-Up Shot"],

  // Options for landscape shot types
  LANDSCAPES_SHOT_OPTIONS: ["Long Shot", "Medium Shot", "Close-Up Shot", "Extreme Close-Up Shot"],

  // Probability for an object to be the main subject of a non-landscape prompt (0.0 to 1.0)
  OBJECT_AS_MAIN_SUBJECT_PROBABILITY: 0.1,

  // Probability for a character prompt to include an object (0.0 to 1.0)
  CHARACTER_WITH_OBJECT_PROBABILITY: 0.25,

  // Probability for a non-landscape prompt to include clothing if the toggle is active (0.0 to 1.0)
  CLOTHING_PROBABILITY: 0.75,

  // Probability to select a full outfit instead of individual pieces (0.0 to 1.0)
  OUTFIT_PROBABILITY: 0.2,

  // Minimum and maximum number of individual clothing pieces to add
  MIN_CLOTHING_PIECES: 1,
  MAX_CLOTHING_PIECES: 4,
  // --- END NEW ---

  // Minimum and maximum number of prompts to generate
  MIN_PROMPTS_TO_GENERATE: 1,
  MAX_PROMPTS_TO_GENERATE: 10000,
  DEFAULT_PROMPTS_TO_GENERATE: 50,

  // Minimum and maximum number of artists in a prompt
  MIN_ARTISTS: 1,
  MAX_ARTISTS: 5,

  // Minimum and maximum number of styles in a prompt
  MIN_STYLES: 1,
  MAX_STYLES: 3,

  // Disclaimer text visibility toggling
  DISCLAIMER_TEXT_SHOW: "Hide options",
  DISCLAIMER_TEXT_HIDE: "Show options",
};
