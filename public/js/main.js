import { characters, objects, places, elements, styles, colors, artists, prefixes, suffixes, improvers, adjectives } from "./data.js";
import { CONFIG } from "./config.js";

class PromptGenerator {
  constructor(config) {
    this.config = config;
    this.currentPrompts = [];
    this.promptsDiv = document.querySelector("#prompts");
    this.textArea = document.createElement("textarea");
    this.portraitDiv = document.querySelector("#portraitDiv");
    this.landscapesDiv = document.querySelector("#landscapesDiv");
    this.generatorOptionsButton = document.querySelector("#generatorOptionsButton");
    this.generatorOptionsDiv = document.querySelector("#generatorOptionsDiv");
    this.inputsDisclaimer = document.querySelector("#inputsDisclaimer");

    // Select all relevant input sections by their IDs (newly added/confirmed)
    this.charactersInputSection = document.querySelector("#charactersInputDiv");
    this.objectsInputSection = document.querySelector("#objectsInputDiv");
    this.placesInputSection = document.querySelector("#placesInputDiv");
    this.artistsInputSection = document.querySelector("#artistsInputDiv");
    this.stylesInputSection = document.querySelector("#stylesInputDiv");
    this.colorsInputSection = document.querySelector("#colorsInputDiv");
    this.adjectivesInputSection = document.querySelector("#adjectivesInputDiv");
    this.elementsInputSection = document.querySelector("#elementsInputDiv");
    this.improversInputSection = document.querySelector("#improversInputDiv");
    this.prefixesInputSection = document.querySelector("#prefixesInputDiv");
    this.suffixesInputSection = document.querySelector("#suffixesInputDiv");

    this.shownOptions = 0;
    this.currentGenerator = "random";

    // Initialize arrays with default data
    this.currentCharacters = [...characters];
    this.currentObjects = [...objects];
    this.currentPlaces = [...places];
    this.currentArtists = [...artists];
    this.currentStyles = [...styles];
    this.currentColors = [...colors];
    this.currentAdjectives = [...adjectives];
    this.currentElements = [...elements];
    this.currentImprovers = [...improvers];
    this.currentPrefixes = [...prefixes];
    this.currentSuffixes = [...suffixes];
  }

  generatePrompt() {
    // --- Get all checkbox states and values ---
    const isPrefixPrompt = Math.random() < this.config.PREFIX_PROBABILITY;
    const isSuffixPrompt = Math.random() < this.config.SUFFIX_PROBABILITY;
    const isPortraitPrompt = this.currentGenerator === "portrait";
    const selectedPortraitShot = document.querySelector("#portraitShotSelect").value;
    const randomizedPortraitShot = this.randomElement(this.config.PORTRAIT_SHOT_OPTIONS);
    const isLandscapesPrompt = this.currentGenerator === "landscapes";
    const selectedLandscapesShot = document.querySelector("#landscapesShotSelect").value;
    const randomizedLandscapesShot = this.randomElement(this.config.LANDSCAPES_SHOT_OPTIONS);

    const isObjectsActive = document.querySelector("#objectsActive").checked;
    const isPlacesActive = document.querySelector("#placesActive").checked;
    const isArtistsActive = document.querySelector("#artistsActive").checked;
    const isStylesActive = document.querySelector("#stylesActive").checked;
    const isColorsActive = document.querySelector("#colorsActive").checked;
    const isAdjectivesActive = document.querySelector("#adjectivesActive").checked;
    const isElementsActive = document.querySelector("#elementsActive").checked;
    const isImproversActive = document.querySelector("#improversActive").checked;
    const isPrefixesActive = document.querySelector("#prefixesActive").checked;
    const isSuffixesActive = document.querySelector("#suffixesActive").checked;

    let numArtists = Number(document.querySelector("#numArtists").value);
    let numStyles = Number(document.querySelector("#numStyles").value);

    // --- Prompt construction using ordered parts ---
    const promptParts = [];

    // 1. Quality Tags (from improvers list)
    if (isImproversActive && this.currentImprovers.length > 0) {
      const numImproversToPick = Math.min(this.currentImprovers.length, 3);
      const selectedImprovers = new Set();
      while (selectedImprovers.size < numImproversToPick) {
        selectedImprovers.add(this.randomElement(this.currentImprovers));
      }
      promptParts.push(...selectedImprovers);
    }

    // 2. Subject, Pose, and Environment
    let subjectString = "";
    let poseString = "";
    let environmentString = "";

    if (isLandscapesPrompt) {
      // For landscapes, the "subject" is the place.
      if (isPlacesActive && this.currentPlaces.length > 0) {
        subjectString = this.randomElement(this.currentPlaces);
      }
      // The "pose" is the shot type.
      if (selectedLandscapesShot !== this.config.RANDOM_SHOT_TEXT) {
        poseString = selectedLandscapesShot;
      } else if (Math.random() > this.config.LANDSCAPES_RANDOM_SHOT_ADD_PROBABILITY) {
        poseString = randomizedLandscapesShot;
      }
    } else {
      // For portrait or random prompts
      // 2a. Subject
      const subjectParts = [];
      if (isPrefixPrompt && isPrefixesActive && this.currentPrefixes.length > 0) {
        subjectParts.push(this.randomElement(this.currentPrefixes));
      }

      let mainSubject;
      if (isObjectsActive && this.currentObjects.length > 0 && Math.random() < this.config.OBJECT_AS_MAIN_SUBJECT_PROBABILITY) {
        mainSubject = this.randomElement(this.currentObjects);
        subjectParts.push(mainSubject);
      } else if (this.currentCharacters.length > 0) {
        mainSubject = this.randomElement(this.currentCharacters);
        subjectParts.push(mainSubject);
        if (isObjectsActive && this.currentObjects.length > 0 && Math.random() < this.config.CHARACTER_WITH_OBJECT_PROBABILITY) {
          subjectParts.push(`with ${this.randomElement(this.currentObjects)}`);
        }
      }

      if (isElementsActive && this.currentElements.length > 0) {
        subjectParts.push(`of ${this.randomElement(this.currentElements)}`);
      }
      subjectString = subjectParts.join(" ");

      // 2b. Pose/Perspective
      const poseParts = [];
      if (isPortraitPrompt) {
        if (selectedPortraitShot !== this.config.RANDOM_SHOT_TEXT) {
          poseParts.push(selectedPortraitShot);
        } else if (Math.random() > this.config.PORTRAIT_RANDOM_SHOT_ADD_PROBABILITY) {
          poseParts.push(randomizedPortraitShot);
        }
      }
      if (isSuffixPrompt && isSuffixesActive && this.currentSuffixes.length > 0) {
        poseParts.push(this.randomElement(this.currentSuffixes));
      }
      poseString = poseParts.join(", ");

      // 2c. Environment
      if (isPlacesActive && this.currentPlaces.length > 0) {
        environmentString = this.randomElement(this.currentPlaces);
      }
    }

    if (subjectString) promptParts.push(subjectString);
    if (poseString) promptParts.push(poseString);
    if (environmentString) promptParts.push(environmentString);

    // 3. Adjectives
    if (isAdjectivesActive && this.currentAdjectives.length > 0) {
      const numAdjectivesToPick = Math.min(this.currentAdjectives.length, 2);
      const selectedAdjectives = new Set();
      while (selectedAdjectives.size < numAdjectivesToPick) {
        selectedAdjectives.add(this.randomElement(this.currentAdjectives));
      }
      promptParts.push(...selectedAdjectives);
    }

    // 4. Colors
    if (isColorsActive && this.currentColors.length > 0) {
      promptParts.push(this.randomElement(this.currentColors));
    }

    // 5. Styles
    if (isStylesActive && this.currentStyles.length > 0) {
      const selectedStyles = new Set();
      while (selectedStyles.size < numStyles && selectedStyles.size < this.currentStyles.length) {
        selectedStyles.add(this.randomElement(this.currentStyles));
      }
      promptParts.push(...selectedStyles);
    }

    // 6. Artists
    if (isArtistsActive && this.currentArtists.length > 0) {
      const selectedArtists = new Set();
      while (selectedArtists.size < numArtists && selectedArtists.size < this.currentArtists.length) {
        selectedArtists.add(this.randomElement(this.currentArtists));
      }
      const formattedArtists = Array.from(selectedArtists).map((artist) => `(by ${artist})`);
      promptParts.push(...formattedArtists);
    }

    // --- Final Assembly ---
    const finalPrompt = promptParts.filter((part) => part && part.trim() !== "").join(", ");
    this.currentPrompts.push(finalPrompt);
  }

  generatePrompts(num) {
    this.currentPrompts = [];
    this.promptsDiv.innerHTML = "";
    this.replaceArraysWithUserInputs();

    for (let i = 0; i < num; i++) {
      this.generatePrompt();
    }

    // Use document fragment for better performance
    const tempDocumentFragment = document.createDocumentFragment();
    for (let i = 0; i < this.currentPrompts.length; i++) {
      const newPromptLine = document.createElement("p");
      newPromptLine.textContent = `${this.currentPrompts[i].toLowerCase().trim()}`;
      tempDocumentFragment.appendChild(newPromptLine);
    }

    this.promptsDiv.appendChild(tempDocumentFragment);
  }

  showChosenGenerator() {
    // Hide all main generator divs
    this.portraitDiv.classList.add("hidden");
    this.landscapesDiv.classList.add("hidden");

    this.charactersInputSection.classList.remove("hidden");
    this.objectsInputSection.classList.remove("hidden");
    this.placesInputSection.classList.remove("hidden");
    this.artistsInputSection.classList.remove("hidden");
    this.stylesInputSection.classList.remove("hidden");
    this.colorsInputSection.classList.remove("hidden");
    this.adjectivesInputSection.classList.remove("hidden");
    this.elementsInputSection.classList.remove("hidden");
    this.improversInputSection.classList.remove("hidden");
    this.prefixesInputSection.classList.remove("hidden");
    this.suffixesInputSection.classList.remove("hidden");

    // Show specific generator div and hide irrelevant inputs for landscapes
    if (this.currentGenerator === "portrait") {
      this.portraitDiv.classList.remove("hidden");
    } else if (this.currentGenerator === "landscapes") {
      this.landscapesDiv.classList.remove("hidden");
      this.charactersInputSection.classList.add("hidden");
      this.objectsInputSection.classList.add("hidden");
      this.elementsInputSection.classList.add("hidden");
      this.prefixesInputSection.classList.add("hidden");
      this.suffixesInputSection.classList.add("hidden");
    }
  }

  randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  copyPromptsToClipboard(promptsArray) {
    this.textArea.textContent = promptsArray.join("\n");
    navigator.clipboard.writeText(this.textArea.textContent);
  }

  checkUserArraysInputs(textArea) {
    return textArea.value.trim() !== "";
  }

  // Replace arrays with user inputs from textareas and save to localStorage
  replaceArraysWithUserInputs() {
    const inputs = {
      characters: document.querySelector("#charactersTextArea"),
      objects: document.querySelector("#objectsTextArea"),
      places: document.querySelector("#placesTextArea"),
      artists: document.querySelector("#artistsTextArea"),
      styles: document.querySelector("#stylesTextArea"),
      colors: document.querySelector("#colorsTextArea"),
      adjectives: document.querySelector("#adjectivesTextArea"),
      elements: document.querySelector("#elementsTextArea"),
      improvers: document.querySelector("#improversTextArea"),
      prefixes: document.querySelector("#prefixesTextArea"),
      suffixes: document.querySelector("#suffixesTextArea"),
    };

    const defaults = {
      characters,
      objects,
      places,
      artists,
      styles,
      colors,
      adjectives,
      elements,
      improvers,
      prefixes,
      suffixes,
    };

    Object.keys(inputs).forEach((key) => {
      if (this.checkUserArraysInputs(inputs[key])) {
        this[`current${key.charAt(0).toUpperCase() + key.slice(1)}`] = inputs[key].value.split(/\r?\n/).filter((line) => line.trim() !== "");
        localStorage.setItem(key, inputs[key].value);
      } else {
        this[`current${key.charAt(0).toUpperCase() + key.slice(1)}`] = [...defaults[key]];
        localStorage.setItem(key, "");
      }
    });
  }

  // Restore previous user inputs from localStorage
  addPreviousUserInputs() {
    const inputIds = [
      "charactersTextArea",
      "objectsTextArea",
      "placesTextArea",
      "artistsTextArea",
      "stylesTextArea",
      "colorsTextArea",
      "adjectivesTextArea",
      "elementsTextArea",
      "improversTextArea",
      "prefixesTextArea",
      "suffixesTextArea",
    ];

    const keys = ["characters", "objects", "places", "artists", "styles", "colors", "adjectives", "elements", "improvers", "prefixes", "suffixes"];

    inputIds.forEach((id, index) => {
      document.querySelector(`#${id}`).value = localStorage.getItem(keys[index]) || "";
    });
  }

  // Clear all user inputs and localStorage
  resetUserInputs() {
    const inputIds = [
      "charactersTextArea",
      "objectsTextArea",
      "placesTextArea",
      "artistsTextArea",
      "stylesTextArea",
      "colorsTextArea",
      "adjectivesTextArea",
      "elementsTextArea",
      "improversTextArea",
      "prefixesTextArea",
      "suffixesTextArea",
    ];

    const keys = ["characters", "objects", "places", "artists", "styles", "colors", "adjectives", "elements", "improvers", "prefixes", "suffixes"];

    keys.forEach((key) => localStorage.setItem(key, ""));
    inputIds.forEach((id) => {
      document.querySelector(`#${id}`).value = "";
    });
  }
}

const promptGenerator = new PromptGenerator(CONFIG);

// Event listeners
document.querySelector("#promptsCopyButton").addEventListener("click", () => {
  promptGenerator.copyPromptsToClipboard(promptGenerator.currentPrompts);
});

document.querySelector("#generatePromptsButton").addEventListener("click", () => {
  const promptsNumber = Number(document.querySelector("#promptsNumberInput").value);
  if (!isNaN(promptsNumber) && promptsNumber >= CONFIG.MIN_PROMPTS_TO_GENERATE && promptsNumber <= CONFIG.MAX_PROMPTS_TO_GENERATE) {
    promptGenerator.generatePrompts(promptsNumber);
  } else {
    alert(`Please enter a number of prompts to generate between ${CONFIG.MIN_PROMPTS_TO_GENERATE} and ${CONFIG.MAX_PROMPTS_TO_GENERATE}.`);
  }
});

// Mobile menu handling
let isMenuOpen = false;

function toggleMobileMenu() {
  const bgMobileMenu = document.getElementById("bgMobileMenu");
  const menuList = document.getElementById("menuList");

  if (isMenuOpen) {
    // Closing
    menuList.classList.add("-translate-y-full");
    bgMobileMenu.classList.add("opacity-0");
    // Wait for animation to finish before hiding
    setTimeout(() => {
      bgMobileMenu.classList.add("hidden");
      document.body.style.overflowY = "visible";
    }, 300); // Duration of the transition
  } else {
    // Opening
    bgMobileMenu.classList.remove("hidden");
    setTimeout(() => {
      // Small delay to allow 'hidden' to be removed before transition starts
      menuList.classList.remove("-translate-y-full");
      bgMobileMenu.classList.remove("opacity-0");
    }, 10);
    document.body.style.overflowY = "hidden";
  }
  isMenuOpen = !isMenuOpen;
}

function mobileMenuClickHandling(event) {
  const hamburgerButton = document.getElementById("hamburgerButton");
  const bgMobileMenu = document.getElementById("bgMobileMenu"); // Use bgMobileMenu for overall click detection
  const menuList = document.getElementById("menuList");
  const isClickOnButton = hamburgerButton.contains(event.target);

  if (isClickOnButton) {
    toggleMobileMenu();
    hamburgerButton.blur(); // Remove focus after click
  } else if (menuList.contains(event.target)) {
    switchGenerator(event); // Pass event object to switchGenerator
    toggleMobileMenu();
  } else if (isMenuOpen && bgMobileMenu.contains(event.target)) {
    // Click outside the menu but inside the overlay
    toggleMobileMenu();
  }
}

function mobileMenuFocusBack(event) {
  const hamburgerButton = document.getElementById("hamburgerButton");
  const menuList = document.getElementById("menuList");
  if (isMenuOpen && !menuList.contains(event.target) && !hamburgerButton.contains(event.target)) {
    event.stopImmediatePropagation();
    hamburgerButton.focus();
  }
}

document.addEventListener("click", mobileMenuClickHandling);
document.addEventListener("focusin", mobileMenuFocusBack);

function switchGenerator(event) {
  // Added event parameter
  const isClickOnPortrait = event.target.classList.contains("portraitLink");
  const isClickOnLandscapes = event.target.classList.contains("landscapesLink");
  const isClickOnRandom = event.target.classList.contains("randomLink");

  if (isClickOnPortrait) {
    promptGenerator.currentGenerator = "portrait";
  } else if (isClickOnLandscapes) {
    promptGenerator.currentGenerator = "landscapes";
  } else if (isClickOnRandom) {
    promptGenerator.currentGenerator = "random";
  }

  promptGenerator.showChosenGenerator();
}

document.querySelector("nav").addEventListener("click", switchGenerator);

function showGeneratorOptions() {
  if (promptGenerator.shownOptions == 0) {
    promptGenerator.generatorOptionsButton.textContent = CONFIG.DISCLAIMER_TEXT_SHOW;
    promptGenerator.shownOptions++;
  } else {
    promptGenerator.generatorOptionsButton.textContent = CONFIG.DISCLAIMER_TEXT_HIDE;
    promptGenerator.shownOptions--;
  }
  promptGenerator.inputsDisclaimer.classList.toggle("hidden");
  promptGenerator.generatorOptionsDiv.classList.toggle("hidden");
}

document.querySelector("#generatorOptionsButton").addEventListener("click", showGeneratorOptions);
document.querySelector("#resetInputsButton").addEventListener("click", () => promptGenerator.resetUserInputs()); // Wrap in arrow function to call resetUserInputs method

// Input validation for number inputs
document.querySelector("#numArtists").addEventListener("change", () => {
  let numArtistsInput = document.querySelector("#numArtists");
  let v = Number(numArtistsInput.value);
  if (isNaN(v) || v < CONFIG.MIN_ARTISTS) numArtistsInput.value = CONFIG.MIN_ARTISTS;
  if (v > CONFIG.MAX_ARTISTS) numArtistsInput.value = CONFIG.MAX_ARTISTS;
});

document.querySelector("#numStyles").addEventListener("change", () => {
  let numStylesInput = document.querySelector("#numStyles");
  let v = Number(numStylesInput.value);
  if (isNaN(v) || v < CONFIG.MIN_STYLES) numStylesInput.value = CONFIG.MIN_STYLES;
  if (v > CONFIG.MAX_STYLES) numStylesInput.value = CONFIG.MAX_STYLES;
});

// Initialize
promptGenerator.addPreviousUserInputs();
promptGenerator.generatePrompts(CONFIG.DEFAULT_PROMPTS_TO_GENERATE);
