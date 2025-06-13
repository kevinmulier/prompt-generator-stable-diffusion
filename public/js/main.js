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
    this.randomDiv = document.querySelector("#randomDiv");
    this.generatorOptionsButton = document.querySelector("#generatorOptionsButton");
    this.generatorOptionsDiv = document.querySelector("#generatorOptionsDiv");
    this.inputsDisclaimer = document.querySelector("#inputsDisclaimer");
    this.charactersInputDiv = document.querySelector("#charactersInputDiv");
    this.objectsInputDiv = document.querySelector("#objectsInputDiv");
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
    const isPrefixePrompt = Math.random() < this.config.PREFIX_PROBABILITY;
    const isSuffixPrompt = Math.random() < this.config.SUFFIX_PROBABILITY;
    const isPortraitPrompt = this.currentGenerator === "portrait";
    const selectedPortraitShot = document.querySelector("#portraitShotSelect").value;
    const portraitShotOptions = this.config.PORTRAIT_SHOT_OPTIONS;
    const randomizedPortraitShot = this.randomElement(portraitShotOptions);
    const isLandscapesPrompt = this.currentGenerator === "landscapes";
    const selectedLandscapesShot = document.querySelector("#landscapesShotSelect").value;
    const landscapesShotOptions = this.config.LANDSCAPES_SHOT_OPTIONS;
    const randomizedLandscapesShot = this.randomElement(landscapesShotOptions);

    // Check active options from checkboxes
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

    let prompt = "";
    let mainSubject = "";

    // Hide places checkbox for landscape prompts
    if (isLandscapesPrompt) {
      document.querySelector("#placesActive").classList.add("hidden");
    } else {
      document.querySelector("#placesActive").classList.remove("hidden");
    }

    let numArtists = Number(document.querySelector("#numArtists").value);
    let numStyles = Number(document.querySelector("#numStyles").value);

    // Build artists and styles prompt parts
    let artistsPrompt = "";
    let stylesPrompt = "";

    for (let i = 0; i < numArtists; i++) {
      if (i < this.currentArtists.length) {
        artistsPrompt += `${this.randomElement(this.currentArtists.filter((artist) => !artistsPrompt.includes(artist)))}, `;
      }
    }
    artistsPrompt = artistsPrompt.slice(0, -2);

    for (let i = 0; i < numStyles; i++) {
      if (i < this.currentStyles.length) {
        stylesPrompt += `${this.randomElement(this.currentStyles.filter((style) => !stylesPrompt.includes(style)))}, `;
      }
    }
    stylesPrompt = stylesPrompt.slice(0, -2);

    // Add shot type for portraits
    if (isPortraitPrompt) {
      if (selectedPortraitShot !== this.config.RANDOM_SHOT_TEXT) {
        prompt += selectedPortraitShot + " ";
      } else {
        prompt += Math.random() < this.config.PORTRAIT_RANDOM_SHOT_ADD_PROBABILITY ? " " : `${randomizedPortraitShot} `;
      }
    } else if (isLandscapesPrompt) {
      if (selectedLandscapesShot !== this.config.RANDOM_SHOT_TEXT) {
        prompt += selectedLandscapesShot + " ";
      } else {
        prompt += Math.random() < this.config.LANDSCAPES_RANDOM_SHOT_ADD_PROBABILITY ? " " : `${randomizedLandscapesShot} `;
      }
    }

    if (prompt.length > 1) {
      prompt += "of ";
    }

    // Build main subject (not for landscapes)
    if (!isLandscapesPrompt) {
      if ((isPrefixePrompt && isPrefixesActive) || this.currentPrefixes[0] !== prefixes[0]) {
        prompt += `${this.randomElement(this.currentPrefixes)} `;
      }

      // Choose between object or character as main subject
      if (isObjectsActive && Math.random() < this.config.OBJECT_AS_MAIN_SUBJECT_PROBABILITY && this.currentCharacters[0] === characters[0]) {
        mainSubject = this.randomElement(this.currentObjects);
        prompt += `${mainSubject}`;
      } else {
        mainSubject = this.randomElement(this.currentCharacters);
        if (Math.random() < this.config.CHARACTER_WITH_OBJECT_PROBABILITY || this.currentObjects[0] !== objects[0]) {
          if (isObjectsActive) {
            prompt += `${mainSubject} with ${this.randomElement(this.currentObjects)}`;
          } else {
            prompt += `${mainSubject}`;
          }
        } else {
          prompt += `${mainSubject}`;
        }
      }

      if (isElementsActive) {
        prompt += ` of ${this.randomElement(this.currentElements)}`;
      }

      if ((isSuffixPrompt && isSuffixesActive) || this.currentSuffixes[0] !== suffixes[0]) {
        prompt += ` ${this.randomElement(this.currentSuffixes)}`;
      }
    }

    // Add places
    if (isLandscapesPrompt) {
      prompt += `${this.randomElement(this.currentPlaces)}`;
    } else if (isPlacesActive) {
      prompt += `, ${this.randomElement(this.currentPlaces)}`;
    }

    // Add style and artist information
    if (isArtistsActive && isStylesActive) {
      prompt += `, ${stylesPrompt} in ${artistsPrompt} style`;
    } else if (isArtistsActive) {
      prompt += `, ${artistsPrompt} style`;
    } else if (isStylesActive) {
      prompt += `, ${stylesPrompt}`;
    }

    // Add adjectives (ensure no duplicates)
    if (isAdjectivesActive) {
      const adjective1 = this.randomElement(this.currentAdjectives);
      prompt += `, ${adjective1}`;
      if (this.currentAdjectives.length > 1) {
        prompt += `, ${this.randomElement(this.currentAdjectives.filter((adjective) => adjective !== adjective1))}`;
      }
    }

    if (isImproversActive) {
      prompt += `, ${this.randomElement(this.currentImprovers)}`;
    }

    if (isColorsActive) {
      prompt += `, ${this.randomElement(this.currentColors)}`;
    }

    this.currentPrompts.push(prompt);
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
      newPromptLine.classList.add("py-3");
      newPromptLine.textContent = `${this.currentPrompts[i].toLowerCase().trim()}`;
      tempDocumentFragment.appendChild(newPromptLine);
    }

    this.promptsDiv.appendChild(tempDocumentFragment);
  }

  showChosenGenerator() {
    // Hide all generators and show common input divs
    this.portraitDiv.classList.add("hidden");
    this.landscapesDiv.classList.add("hidden");
    this.randomDiv.classList.add("hidden");
    this.charactersInputDiv.classList.remove("hidden");
    this.objectsInputDiv.classList.remove("hidden");
    document.querySelector("#elementsInputDiv").classList.remove("hidden");
    document.querySelector("#prefixesInputDiv").classList.remove("hidden");
    document.querySelector("#suffixesInputDiv").classList.remove("hidden");
    document.querySelector("#placesActive").classList.remove("hidden");

    // Show specific generator and hide irrelevant inputs for landscapes
    if (this.currentGenerator === "portrait") {
      this.portraitDiv.classList.remove("hidden");
    } else if (this.currentGenerator === "landscapes") {
      this.landscapesDiv.classList.remove("hidden");
      this.charactersInputDiv.classList.add("hidden");
      this.objectsInputDiv.classList.add("hidden");
      document.querySelector("#elementsInputDiv").classList.add("hidden");
      document.querySelector("#prefixesInputDiv").classList.add("hidden");
      document.querySelector("#suffixesInputDiv").classList.add("hidden");
      document.querySelector("#placesActive").classList.add("hidden");
    } else if (this.currentGenerator === "random") {
      this.randomDiv.classList.remove("hidden");
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
    return textArea.value !== "";
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
        this[`current${key.charAt(0).toUpperCase() + key.slice(1)}`] = inputs[key].value.split(/\r?\n/);
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

function mobileMenuClickHandling(event) {
  const hamburgerButton = document.getElementById("hamburgerButton");
  const bgMobileMenu = document.getElementById("bgMobileMenu");
  const menuList = document.getElementById("menuList");
  const isClickOnButton = hamburgerButton.contains(event.target);

  if (isClickOnButton) {
    if (isMenuOpen) {
      menuList.classList.add("hidden");
      bgMobileMenu.classList.add("hidden");
      hamburgerButton.blur();
      document.body.style.overflowY = "visible";
    } else {
      menuList.classList.remove("hidden");
      bgMobileMenu.classList.remove("hidden");
      document.body.style.overflowY = "hidden";
    }
    isMenuOpen = !isMenuOpen;
  } else if (menuList.contains(event.target)) {
    switchGenerator();
    menuList.classList.add("hidden");
    bgMobileMenu.classList.add("hidden");
    isMenuOpen = false;
    document.body.style.overflowY = "visible";
  } else {
    menuList.classList.add("hidden");
    bgMobileMenu.classList.add("hidden");
    isMenuOpen = false;
    document.body.style.overflowY = "visible";
  }
}

function mobileMenuFocusBack(event) {
  if (isMenuOpen && !menuList.contains(event.target)) {
    event.stopImmediatePropagation();
    hamburgerButton.focus();
  }
}

document.addEventListener("click", mobileMenuClickHandling);
document.addEventListener("focusin", mobileMenuFocusBack);

function switchGenerator() {
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
document.querySelector("#resetInputsButton").addEventListener("click", promptGenerator.resetUserInputs);

// Input validation for number inputs
document.querySelector("#numArtists").addEventListener("change", () => {
  let numArtistsInput = document.querySelector("#numArtists");
  let v = Number(numArtistsInput.value);
  if (v < CONFIG.MIN_ARTISTS) numArtistsInput.value = CONFIG.MIN_ARTISTS;
  if (v > CONFIG.MAX_ARTISTS) numArtistsInput.value = CONFIG.MAX_ARTISTS;
});

document.querySelector("#numStyles").addEventListener("change", () => {
  let numStylesInput = document.querySelector("#numStyles");
  let v = Number(numStylesInput.value);
  if (v < CONFIG.MIN_STYLES) numStylesInput.value = CONFIG.MIN_STYLES;
  if (v > CONFIG.MAX_STYLES) numStylesInput.value = CONFIG.MAX_STYLES;
});

// Initialize
promptGenerator.addPreviousUserInputs();
promptGenerator.generatePrompts(CONFIG.DEFAULT_PROMPTS_TO_GENERATE);
