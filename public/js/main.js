class PromptGenerator {
  constructor() {
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
    this.currentCharacters = [];
    this.currentObjects = [];
    this.currentPlaces = [];
    this.currentArtists = [];
    this.currentStyles = [];
    this.currentColors = [];
    this.currentAdjectives = [];
    this.currentElements = [];
    this.currentImprovers = [];
    this.currentPrefixes = [];
    this.currentSuffixes = [];
  }

  generatePrompt() {
    // Determine if the prompt will have prefix
    const isPrefixePrompt = Math.random() < 0.25;

    // Determine if the prompt will have suffix
    const isSuffixPrompt = Math.random() < 0.1;

    // Check if the current generator is for portraits
    const isPortraitPrompt = this.currentGenerator === "portrait";

    // Get the selected portrait shot from the HTML select element
    const selectedPortraitShot = document.querySelector("#portraitShotSelect").value;

    // Define options for portrait shot types
    const portraitShotOptions = ["Full-Length Shot", "American Shot", "Medium Shot", "Close-Up Shot", "Extreme Close-Up Shot"];

    // Randomly select a portrait shot type
    const randomizedPortraitShot = portraitShotOptions[Math.floor(Math.random() * portraitShotOptions.length)];

    // Check if the current generator is for landscapes
    const isLandscapesPrompt = this.currentGenerator === "landscapes";

    // Get the selected landscapes shot from the HTML select element
    const selectedLandscapesShot = document.querySelector("#landscapesShotSelect").value;

    // Define options for landscape shot types
    const landscapesShotOptions = ["Long Shot", "Medium Shot", "Close-Up Shot", "Extreme Close-Up Shot"];

    // Randomly select a landscape shot type
    const randomizedLandscapesShot = landscapesShotOptions[Math.floor(Math.random() * landscapesShotOptions.length)];

    // Check whether various types of prompts are active based on checkbox values
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

    // Initialize prompt and mainSubject variables
    let prompt = "";
    let mainSubject = "";

    // Hide the "Places" checkbox if generating a landscapes prompt
    if (isLandscapesPrompt) {
      document.querySelector("#placesActive").classList.add("hidden");
    } else {
      document.querySelector("#placesActive").classList.remove("hidden");
    }

    // Get value from artists and styles number inputs
    let numArtists = Number(document.querySelector("#numArtists").value);
    let numStyles = Number(document.querySelector("#numStyles").value);

    //  initialize artists prompt & styles prompt parts
    let artistsPrompt = "";
    let stylesPrompt = "";

    // set content of artists & styles prompts parts depending on user number inputs
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

    // Add a artists and/or styles to the prompt
    if (isArtistsActive && isStylesActive) {
      prompt += `${stylesPrompt} in ${artistsPrompt} style `;
    } else if (isArtistsActive) {
      prompt += `${artistsPrompt} style `;
    } else if (isStylesActive) {
      prompt += `${stylesPrompt} `;
    }

    if (isPortraitPrompt) {
      if (selectedPortraitShot !== "Random Shot") {
        // if a specific portrait shot is selected, add it to the prompt
        prompt += selectedPortraitShot + " ";
      } else {
        // otherwise, randomly choose whether to add a randomized portrait shot to the prompt
        prompt += Math.random() < 0.33 ? " " : `${randomizedPortraitShot} `;
      }
    } else if (isLandscapesPrompt) {
      if (selectedLandscapesShot !== "Random Shot") {
        // if a specific landscape shot is selected, add it to the prompt
        prompt += selectedLandscapesShot + " ";
      } else {
        // otherwise, randomly choose whether to add a randomized landscape shot to the prompt
        prompt += Math.random() < 0.33 ? " " : `${randomizedLandscapesShot} `;
      }
    }

    if (prompt.length > 1) {
      // if prompt has content, add "of" to the end of the prompt
      prompt += "of";
    }

    if (!isLandscapesPrompt) {
      if ((isPrefixePrompt && isPrefixesActive) || this.currentPrefixes[0] !== prefixes[0]) {
        // if is a prefix prompt, add a random prefix
        prompt += ` ${this.randomElement(this.currentPrefixes)}`;
      }

      if (isObjectsActive && Math.random() < 0.1 && this.currentCharacters[0] === characters[0]) {
        // if objects are active, can add a random object as the main subject of the prompt
        mainSubject = this.randomElement(this.currentObjects);
        prompt += ` ${mainSubject}`;
      } else {
        // otherwise, add a random character as the main subject of the prompt, possibly with a random object
        mainSubject = this.randomElement(this.currentCharacters);
        if (Math.random() < 0.25 || this.currentObjects[0] !== objects[0]) {
          if (isObjectsActive) {
            prompt += ` ${mainSubject} with ${this.randomElement(this.currentObjects)}`;
          } else {
            prompt += ` ${mainSubject}`;
          }
        } else {
          prompt += ` ${mainSubject}`;
        }
      }

      // adds a random element to the prompt if element prompt is active
      if (isElementsActive) {
        prompt += ` of ${this.randomElement(this.currentElements)}`;
      }

      if ((isSuffixPrompt && isSuffixesActive) || this.currentSuffixes[0] !== suffixes[0]) {
        // if is a suffix prompt, add a random suffix
        prompt += ` ${this.randomElement(this.currentSuffixes)}`;
      }
    }

    // adds a random place to the prompt if landscape prompt is active, or a random place after the main subject if place prompt is active
    if (isLandscapesPrompt) {
      prompt += ` ${this.randomElement(this.currentPlaces)}`;
    } else if (isPlacesActive) {
      prompt += `, ${this.randomElement(this.currentPlaces)}`;
    }

    // adds random adjectives to the prompt if adjective prompt is active
    if (isAdjectivesActive) {
      const adjective1 = this.randomElement(this.currentAdjectives);
      prompt += `, ${adjective1}`;
      if (this.currentAdjectives.length > 1) {
        prompt += `, ${this.randomElement(this.currentAdjectives.filter((adjective) => adjective !== adjective1))}`;
      }
    }

    // add improvers to the prompt if improver prompt is active
    if (isImproversActive) {
      prompt += `, ${this.randomElement(this.currentImprovers)}`;
    }

    // adds a random color palette to the prompt if color prompt is active
    if (isColorsActive) {
      prompt += `, ${this.randomElement(this.currentColors)}`;
    }

    // add the prompt to the arrays of prompts
    this.currentPrompts.push(prompt);
  }

  generatePrompts(num) {
    // Clears out any existing prompts in the currentPrompts array and in the promptsDiv element.
    this.currentPrompts = [];
    this.promptsDiv.innerHTML = "";

    // Replaces the default arrays used for generating prompts with any user-provided input arrays, if available.
    this.replaceArraysWithUserInputs.bind(this);
    this.replaceArraysWithUserInputs();

    // Generates the prompts by calling the generatePrompt() function a specified number of times.
    for (let i = 0; i < num; i++) {
      this.generatePrompt();
    }

    // Creates a temporary document fragment and appends each new prompt line to it.
    const tempDocumentFragment = document.createDocumentFragment();
    for (let i = 0; i < this.currentPrompts.length; i++) {
      const newPromptLine = document.createElement("p");
      newPromptLine.classList.add("py-3");
      newPromptLine.textContent = `${this.currentPrompts[i]}`;
      tempDocumentFragment.appendChild(newPromptLine);
    }

    // Appends the entire temporary document fragment to the promptsDiv element in a single operation, which enhances performance.
    this.promptsDiv.appendChild(tempDocumentFragment);
  }

  showChosenGenerator() {
    // Hide all generator divs and show input divs
    this.portraitDiv.classList.add("hidden");
    this.landscapesDiv.classList.add("hidden");
    this.randomDiv.classList.add("hidden");
    this.charactersInputDiv.classList.remove("hidden");
    this.objectsInputDiv.classList.remove("hidden");
    document.querySelector("#elementsInputDiv").classList.remove("hidden");
    document.querySelector("#prefixesInputDiv").classList.remove("hidden");
    document.querySelector("#suffixesInputDiv").classList.remove("hidden");

    // Show places, prefixes and suffixes input divs and hide if current generator is landscapes
    document.querySelector("#placesActive").classList.remove("hidden");

    // Show the chosen generator div based on current generator variable
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

  // Select a random element inside the array
  randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Copy the prompts to clipboard
  copyPromptsToClipboard(promptsArray) {
    this.textArea.textContent = promptsArray.join("\n");
    navigator.clipboard.writeText(this.textArea.textContent);
  }

  // check if textArea are empty
  checkUserArraysInputs(textArea) {
    return textArea.value !== "";
  }

  // Check if user has put inputs, and then assign them to their respective arrays
  replaceArraysWithUserInputs() {
    const charactersInput = document.querySelector("#charactersTextArea");
    const objectsInput = document.querySelector("#objectsTextArea");
    const placesInput = document.querySelector("#placesTextArea");
    const artistsInput = document.querySelector("#artistsTextArea");
    const stylesInput = document.querySelector("#stylesTextArea");
    const colorsInput = document.querySelector("#colorsTextArea");
    const adjectivesInput = document.querySelector("#adjectivesTextArea");
    const elementsInput = document.querySelector("#elementsTextArea");
    const improversInput = document.querySelector("#improversTextArea");
    const prefixesInput = document.querySelector("#prefixesTextArea");
    const suffixesInput = document.querySelector("#suffixesTextArea");

    if (this.checkUserArraysInputs(charactersInput)) {
      this.currentCharacters = charactersInput.value.split(/\r?\n/);
      localStorage.setItem("characters", charactersInput.value);
    } else {
      this.currentCharacters = [...characters];
      localStorage.setItem("characters", "");
    }

    if (this.checkUserArraysInputs(objectsInput)) {
      this.currentObjects = objectsInput.value.split(/\r?\n/);
      localStorage.setItem("objects", objectsInput.value);
    } else {
      this.currentObjects = [...objects];
      localStorage.setItem("objects", "");
    }

    if (this.checkUserArraysInputs(placesInput)) {
      this.currentPlaces = placesInput.value.split(/\r?\n/);
      localStorage.setItem("places", placesInput.value);
    } else {
      this.currentPlaces = [...places];
      localStorage.setItem("places", "");
    }

    if (this.checkUserArraysInputs(artistsInput)) {
      this.currentArtists = artistsInput.value.split(/\r?\n/);
      localStorage.setItem("artists", artistsInput.value);
    } else {
      this.currentArtists = [...artists];
      localStorage.setItem("artists", "");
    }

    if (this.checkUserArraysInputs(stylesInput)) {
      this.currentStyles = stylesInput.value.split(/\r?\n/);
      localStorage.setItem("styles", stylesInput.value);
    } else {
      this.currentStyles = [...styles];
      localStorage.setItem("styles", "");
    }

    if (this.checkUserArraysInputs(colorsInput)) {
      this.currentColors = colorsInput.value.split(/\r?\n/);
      localStorage.setItem("colors", colorsInput.value);
    } else {
      this.currentColors = [...colors];
      localStorage.setItem("colors", "");
    }

    if (this.checkUserArraysInputs(adjectivesInput)) {
      this.currentAdjectives = adjectivesInput.value.split(/\r?\n/);
      localStorage.setItem("adjectives", adjectivesInput.value);
    } else {
      this.currentAdjectives = [...adjectives];
      localStorage.setItem("adjectives", "");
    }

    if (this.checkUserArraysInputs(elementsInput)) {
      this.currentElements = elementsInput.value.split(/\r?\n/);
      localStorage.setItem("elements", elementsInput.value);
    } else {
      this.currentElements = [...elements];
      localStorage.setItem("elements", "");
    }

    if (this.checkUserArraysInputs(improversInput)) {
      this.currentImprovers = improversInput.value.split(/\r?\n/);
      localStorage.setItem("improvers", improversInput.value);
    } else {
      this.currentImprovers = [...improvers];
      localStorage.setItem("improvers", "");
    }

    if (this.checkUserArraysInputs(prefixesInput)) {
      this.currentPrefixes = prefixesInput.value.split(/\r?\n/);
      localStorage.setItem("prefixes", prefixesInput.value);
    } else {
      this.currentPrefixes = [...prefixes];
      localStorage.setItem("prefixes", "");
    }

    if (this.checkUserArraysInputs(suffixesInput)) {
      this.currentSuffixes = suffixesInput.value.split(/\r?\n/);
      localStorage.setItem("suffixes", suffixesInput.value);
    } else {
      this.currentSuffixes = [...suffixes];
      localStorage.setItem("suffixes", "");
    }
  }

  // If user entered inputs previously, get them back into the text areas
  addPreviousUserInputs() {
    const charactersInput = document.querySelector("#charactersTextArea");
    const objectsInput = document.querySelector("#objectsTextArea");
    const placesInput = document.querySelector("#placesTextArea");
    const artistsInput = document.querySelector("#artistsTextArea");
    const stylesInput = document.querySelector("#stylesTextArea");
    const colorsInput = document.querySelector("#colorsTextArea");
    const adjectivesInput = document.querySelector("#adjectivesTextArea");
    const elementsInput = document.querySelector("#elementsTextArea");
    const improversInput = document.querySelector("#improversTextArea");
    const prefixesInput = document.querySelector("#prefixesTextArea");
    const suffixesInput = document.querySelector("#suffixesTextArea");

    charactersInput.value = localStorage.getItem("characters");
    objectsInput.value = localStorage.getItem("objects");
    placesInput.value = localStorage.getItem("places");
    artistsInput.value = localStorage.getItem("artists");
    stylesInput.value = localStorage.getItem("styles");
    colorsInput.value = localStorage.getItem("colors");
    adjectivesInput.value = localStorage.getItem("adjectives");
    elementsInput.value = localStorage.getItem("elements");
    improversInput.value = localStorage.getItem("improvers");
    prefixesInput.value = localStorage.getItem("prefixes");
    suffixesInput.value = localStorage.getItem("suffixes");
  }

  // Reset all user's inputs
  resetUserInputs() {
    const charactersInput = document.querySelector("#charactersTextArea");
    const objectsInput = document.querySelector("#objectsTextArea");
    const placesInput = document.querySelector("#placesTextArea");
    const artistsInput = document.querySelector("#artistsTextArea");
    const stylesInput = document.querySelector("#stylesTextArea");
    const colorsInput = document.querySelector("#colorsTextArea");
    const adjectivesInput = document.querySelector("#adjectivesTextArea");
    const elementsInput = document.querySelector("#elementsTextArea");
    const improversInput = document.querySelector("#improversTextArea");
    const prefixesInput = document.querySelector("#prefixesTextArea");
    const suffixesInput = document.querySelector("#suffixesTextArea");

    localStorage.setItem("characters", "");
    localStorage.setItem("objects", "");
    localStorage.setItem("places", "");
    localStorage.setItem("artists", "");
    localStorage.setItem("styles", "");
    localStorage.setItem("colors", "");
    localStorage.setItem("adjectives", "");
    localStorage.setItem("elements", "");
    localStorage.setItem("improvers", "");
    localStorage.setItem("prefixes", "");
    localStorage.setItem("suffixes", "");

    charactersInput.value = localStorage.getItem("characters");
    objectsInput.value = localStorage.getItem("objects");
    placesInput.value = localStorage.getItem("places");
    artistsInput.value = localStorage.getItem("artists");
    stylesInput.value = localStorage.getItem("styles");
    colorsInput.value = localStorage.getItem("colors");
    adjectivesInput.value = localStorage.getItem("adjectives");
    elementsInput.value = localStorage.getItem("elements");
    improversInput.value = localStorage.getItem("improvers");
    prefixesInput.value = localStorage.getItem("prefixes");
    suffixesInput.value = localStorage.getItem("suffixes");
  }
}

const promptGenerator = new PromptGenerator();

// Event listener to copy prompts to clipboard
document.querySelector("#promptsCopyButton").addEventListener("click", (event) => {
  promptGenerator.copyPromptsToClipboard(promptGenerator.currentPrompts);
});

// Event listener to generate prompts when pressing generate
document.querySelector("#generatePromptsButton").addEventListener("click", (event) => {
  const promptsNumber = document.querySelector("#promptsNumberInput").value;
  if (!isNaN(promptsNumber) && promptsNumber > 0 && promptsNumber <= 10000) {
    promptGenerator.generatePrompts(promptsNumber);
  } else {
    alert("Please enter a number of prompts to generate between 1 and 10000.");
  }
});

// flag to track whether the menu is open or closed
let isMenuOpen = false;

function mobileMenuClickHandling(event) {
  // retrieve the hamburger button and the mobile menu
  const hamburgerButton = document.getElementById("hamburgerButton");
  const bgMobileMenu = document.getElementById("bgMobileMenu");
  const menuList = document.getElementById("menuList");

  const isClickOnButton = hamburgerButton.contains(event.target); // check if the clicked element is on the hamburger button

  if (isClickOnButton) {
    if (isMenuOpen) {
      menuList.classList.add("hidden"); // hide the menu
      bgMobileMenu.classList.add("hidden"); // hide the background filter
      hamburgerButton.blur(); // remove focus from the button
      document.body.style.overflowY = "visible";
    } else {
      menuList.classList.remove("hidden"); // show the menu
      bgMobileMenu.classList.remove("hidden"); // show the background filter
      document.body.style.overflowY = "hidden";
    }
    isMenuOpen = !isMenuOpen; // invert the flag
  } else if (menuList.contains(event.target)) {
    switchGenerator();
    menuList.classList.add("hidden"); // add the "hidden" class to hide the menu
    bgMobileMenu.classList.add("hidden"); // hide the background filter
    isMenuOpen = false; // set the flag to false
    document.body.style.overflowY = "visible";
  } else {
    menuList.classList.add("hidden"); // add the "hidden" class to hide the menu
    bgMobileMenu.classList.add("hidden"); // hide the background filter
    isMenuOpen = false; // set the flag to false
    document.body.style.overflowY = "visible";
  }
}

function mobileMenuFocusBack(event) {
  if (isMenuOpen && !menuList.contains(event.target)) {
    event.stopImmediatePropagation();
    hamburgerButton.focus();
  }
}

// add an event listener for the click on the hamburger button and anywhere except on the button
document.addEventListener("click", mobileMenuClickHandling);

// add an event listener for the focusin event
document.addEventListener("focusin", mobileMenuFocusBack);

// add a function to switch between generators
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

// add an event listener to handle generator switching
document.querySelector("nav").addEventListener("click", switchGenerator);

// add a function to show generator options
function showGeneratorOptions() {
  if (promptGenerator.shownOptions == 0) {
    promptGenerator.generatorOptionsButton.textContent = promptGenerator.generatorOptionsButton.textContent.replace("Show", "Hide");
    promptGenerator.shownOptions++;
  } else {
    promptGenerator.generatorOptionsButton.textContent = promptGenerator.generatorOptionsButton.innerHTML.replace("Hide", "Show");
    promptGenerator.shownOptions--;
  }
  promptGenerator.inputsDisclaimer.classList.toggle("hidden");
  promptGenerator.generatorOptionsDiv.classList.toggle("hidden");
}

// add an event listener to show/hide the generator options
document.querySelector("#generatorOptionsButton").addEventListener("click", showGeneratorOptions);

// add an event listener to reset generators options
document.querySelector("#resetInputsButton").addEventListener("click", promptGenerator.resetUserInputs);

// add an event listener to number of artists input that revert to min or max value if user input is out of range
document.querySelector("#numArtists").addEventListener("change", () => {
  let numArtists = document.querySelector("#numArtists");
  let v = Number(numArtists.value);
  if (v < 1) {
    numArtists.value = 1;
  }
  if (v > 5) {
    numArtists.value = 5;
  }
});

// add an event listener to number of styles & mediums input that revert to min or max value if user input is out of range
document.querySelector("#numStyles").addEventListener("change", () => {
  let numStyles = document.querySelector("#numStyles");
  let v = Number(numStyles.value);
  if (v < 1) {
    numStyles.value = 1;
  }
  if (v > 3) {
    numStyles.value = 3;
  }
});

// Arrays of randomness
const characters = [
  "Mermaid",
  "Fairy",
  "Wizard",
  "Warrior",
  "Vampire",
  "Dragon",
  "Goddess",
  "Cyborg",
  "Robot",
  "Angel",
  "Demon",
  "Alien",
  "Ghost",
  "Ninja",
  "Samurai",
  "Pirate",
  "Knight",
  "Bard",
  "Werewolf",
  "Zombie",
  "Giant",
  "Golem",
  "Sphinx",
  "Chimera",
  "Medusa",
  "Minotaur",
  "Harpy",
  "Kraken",
  "Cthulhu",
  "Gorgon",
  "Hydra",
  "Banshee",
  "Satyr",
  "Cyclops",
  "Dwarf",
  "Elf",
  "Centaur",
  "Manticore",
  "Frost Giant",
  "Sandworm",
  "Kelpie",
  "Thunderbird",
  "Leviathan",
  "Thundercats",
  "Gargantua",
  "Ogre",
  "Goblin",
  "Halfling",
  "Harlequin",
  "Jinn",
  "Kitsune",
  "Lich",
  "Mummy",
  "Naga",
  "Oni",
  "Pixie",
  "Siren",
  "Sylph",
  "Treant",
  "Unicorn",
  "Wendigo",
  "Wraith",
  "Xenomorph",
  "Yokai",
  "Zephyr",
  "Zombie Dragon",
  "Abomination",
  "Aasimar",
  "Arachne",
  "Cambion",
  "Cerberus",
  "Changeling",
  "Djinn",
  "Dryad",
  "Gargoyle",
  "Gnoll",
  "Grim Reaper",
  "Half-Demon",
  "Hobgoblin",
  "Ifrit",
  "Incubus",
  "Kappa",
  "Lizardfolk",
  "Mind Flayer",
  "Mongrelfolk",
  "Myconid",
  "Orc",
  "Sahuagin",
  "Shapeshifter",
  "Spectre",
  "Tengu",
  "Titan",
  "Witch",
  "Yeti",
  "Yuan-Ti",
  "Archer",
  "Barbarian",
  "Beastmaster",
  "Cleric",
  "Druid",
  "Enchanter",
  "Executioner",
  "Gladiator",
  "Gunslinger",
  "Healer",
  "Hunter",
  "Illusionist",
  "Infernal",
  "Inventor",
  "Jester",
  "Knight Errant",
  "Mage Hunter",
  "Marauder",
  "Necromancer",
  "Ninja Assassin",
  "Paladin",
  "Psionicist",
  "Ranger",
  "Rogue",
  "Runemaster",
  "Savage",
  "Scout",
  "Shaman",
  "Sniper",
  "Soldier",
  "Sorcerer",
  "Spellblade",
  "Spymaster",
  "Swashbuckler",
  "Templar",
  "Thief",
  "Time Traveler",
  "Tracker",
  "Trickster",
  "Vampire Hunter",
  "Warlock",
  "Warrior Monk",
  "Witch Doctor",
  "Wizard Hunter",
  "Zealot",
  "Arcanist",
  "Demon Hunter",
  "Dragon Slayer",
  "Elementalist",
  "Basilisk",
  "Cockatrice",
  "Cryptid",
  "Darkling",
  "Dracolich",
  "Elemental",
  "Enchantress",
  "Fenrir",
  "Gryphon",
  "Harpie",
  "Imp",
  "Jotun",
  "Lindworm",
  "Merfolk",
  "Nephilim",
  "Phoenix",
  "Roc",
  "Sasquatch",
  "Spriggan",
  "Troll",
  "Ursine",
  "Valkyrie",
  "Vargr",
  "Will-o'-the-wisp",
  "Wyvern",
  "Xorn",
  "Yeth Hound",
  "Zilant",
  "Ankheg",
  "Barghest",
  "Catoblepas",
  "Direwolf",
  "Empusa",
  "Frost Worm",
  "Giant Scorpion",
  "Homunculus",
  "Illithid",
  "Juggernaut",
  "Kobold",
  "Lamia",
  "Megafauna",
  "Nightmare",
  "Ophidian",
  "Peryton",
  "Quetzalcoatlus",
  "Rat King",
  "Salamander",
  "Alchemist",
  "Fire Elemental",
  "Water Elemental",
  "Earth Elemental",
  "Air Elemental",
  "Meteor Elemental",
  "Ice Elemental",
  "Light Elemental",
  "Shadow Elemental",
  "Astral Elemental",
  "Faun",
  "Moai",
  "Wight",
  "Bogeyman",
  "Revenant",
  "Selkie",
  "Pegasus",
  "Weretiger",
  "Werebear",
  "Seraphim",
  "Cherubim",
  "Hobbit",
  "Skinwalker",
  "Poltergeist",
  "Ghoul",
  "Fomorian",
  "Vodyanoi",
  "Kobaloi",
  "Graeae",
  "Erinyes",
  "Hippogriff",
  "Shade",
  "Kodama",
  "Strigoi",
  "Qilin",
  "Dullahan",
  "Headless Horseman",
  "Aswang",
  "Stymphalian Birds",
  "Tengu Warrior",
  "Koschei",
  "Nuckelavee",
  "Hellhound",
  "Simurgh",
  "Boogeyman",
  "Amphisbaena",
  "Amarok",
  "Tatzelwurm",
  "Kaiju",
  "Sea Serpent",
  "Raiju",
  "Wyrm",
  "Ooze",
  "Rakshasa",
  "Balrog",
  "Grotesque",
  "Warg",
  "Quasit",
  "Skull Knight",
  "Nephalem",
  "Archmage",
  "Astrophysicist",
  "Geomancer",
  "Lunar Deity",
  "Solar Deity",
  "Diviner",
  "Cartomancer",
  "Voodoo Priest",
  "Spiritualist",
  "Elemental Lord",
  "Shadowmancer",
  "Lunar Sorceress",
  "Wyrm Rider",
  "Geomancer",
  "Electromancer",
  "Quantum Mage",
  "Psychonaut",
  "Cosmonaut",
  "Seer",
  "Cosmic Serpent",
  "Galactic Entity",
  "Void Entity",
  "Astral Traveler",
  "Oracle",
  "Battle Mage",
  "Scholar",
  "High Priest",
  "Moon Priestess",
  "Sun Priest",
  "Seidr",
  "Feng Shui Master",
  "Metalbender",
  "Earthbender",
  "Firebender",
  "Waterbender",
  "Airbender",
  "Cosmic Bender",
  "Hexblade",
  "Shieldbearer",
  "Lorekeeper",
  "Peacekeeper",
  "Oathkeeper",
  "Master of Whispers",
  "Master of Arms",
  "Master of Beasts",
  "Master of Elements",
  "Death Knight",
  "Life Knight",
  "Chaos Knight",
  "Order Knight",
  "Cosmic Knight",
  "Temporal Knight",
  "Eldritch Knight",
  "Keyblade Master",
  "Astral Knight",
  "Lunar Knight",
  "Solar Knight",
  "Elemental Knight",
  "Undying",
  "Celestial",
  "Sea King",
  "Sky Queen",
  "Earth Mother",
  "Void Master",
  "Time Warden",
  "Cosmic Warden",
  "Lunar Warden",
  "Sun Warden",
  "Star Warden",
  "Shadow Warden",
  "Spirit Warden",
  "Ghost Pirate",
  "Sea Witch",
  "Lunar Witch",
  "Solar Witch",
  "Star Witch",
  "Wight King",
  "Oblivion Queen",
  "Astral Dragon",
  "Meteor Dragon",
  "Rainbow Dragon",
  "Stardust Dragon",
  "Lunar Phoenix",
  "Solar Phoenix",
  "Cosmic Phoenix",
  "Shadow Phoenix",
  "Flame Phoenix",
  "Ocean Phoenix",
  "Mystic Archer",
  "Time Archer",
  "Astral Archer",
  "Rocket Archer",
  "Void Archer",
  "Shadow Archer",
  "Spectral Archer",
  "Battle Seer",
  "Wind Dancer",
  "Shadow Dancer",
  "Star Dancer",
  "Spirit Dancer",
  "Oath Dancer",
  "Cosmic Dancer",
  "Chaos Dancer",
  "Order Dancer",
  "Sky Dancer",
  "Earth Dancer",
  "Flame Dancer",
  "Mystic Dancer",
  "Jungle Shaman",
  "Desert Shaman",
  "Mountain Shaman",
  "Island Shaman",
  "Sky Shaman",
  "Battle Shaman",
  "Shadow Shaman",
  "Star Shaman",
  "Chaos Shaman",
  "Order Shaman",
  "Master Chief",
  "Solid Snake",
  "Kratos",
  "Geralt of Rivia",
  "Cloud Strife",
  "Aloy",
  "Lara Croft",
  "Link",
  "Sonic",
  "Mario",
  "Zelda",
  "Samus Aran",
  "Sephiroth",
  "Arthur Morgan",
  "Niko Bellic",
  "Marcus Fenix",
  "Jill Valentine",
  "Sub-Zero",
  "Scorpion",
  "Goku",
  "Naruto",
  "Saitama",
  "Spike Spiegel",
  "Inuyasha",
  "Edward Elric",
  "Astolfo",
  "Alucard",
  "Light Yagami",
  "Asuka Langley",
  "Totoro",
  "Kenshin Himura",
  "Frodo Baggins",
  "Harry Potter",
  "Aragorn",
  "Gandalf",
  "Jon Snow",
  "Daenerys Targaryen",
  "Voldemort",
  "Lara Croft",
  "Samus Aran",
  "Aloy",
  "Jill Valentine",
  "Sailor Moon",
  "Homura Akemi",
  "Saber",
  "Mikasa Ackerman",
  "Asuka Langley Soryu",
  "Rem",
  "Nami",
  "Bulma",
  "Hermione Granger",
  "Galadriel",
  "Éowyn",
  "Daenerys Targaryen",
  "Arya Stark",
  "Leia Organa",
  "Ripley",
  "Wonder Woman",
];

const objects = [
  "Sword",
  "Amulet",
  "Crystal",
  "Potion",
  "Book",
  "Staff",
  "Wand",
  "Ring",
  "Armor",
  "Helm",
  "Goblet",
  "Chalice",
  "Crown",
  "Scepter",
  "Medallion",
  "Orb",
  "Talisman",
  "Relic",
  "Binoculars",
  "Spear",
  "Dagger",
  "Bow and Arrow",
  "Shield",
  "Mace",
  "Hammer",
  "Axe",
  "Crossbow",
  "Whip",
  "Bolas",
  "Poison",
  "Chainsaw",
  "Katana",
  "Glaive",
  "Shuriken",
  "Sniper",
  "Gun",
  "T-shirt",
  "Shirt",
  "Skirt",
  "Sneakers",
  "Jeans",
  "Sunglasses",
  "Baseball Cap",
  "Boots",
  "High Heels",
  "Excalibur",
  "Mjölnir",
  "Lightsaber",
  "Cape",
  "Leather Jacket",
  "Dragonscale Armor",
  "Laptop",
  "Smartphone",
  "Tablet",
  "Camera",
  "Chains",
  "Rope",
  "Breastplate",
  "Gauntlets",
  "Shin Guards",
  "Cuirass",
  "Gorget",
  "Pauldrons",
  "Vambraces",
  "Greaves",
  "Fascinator",
  "Beanie",
  "Bucket Hat",
  "Beret",
  "Cloak",
  "Sarong",
  "Kilt",
  "Chaps",
  "Quiver",
  "Holster",
  "Backpack",
  "Bracelet",
  "Choker",
  "Pendant",
  "Kimono",
  "Toga",
  "Fedora",
  "Tutu",
  "Turban",
  "Fanny Pack",
  "Combat Boots",
  "Aviator Glasses",
];

const places = [
  "Underwater City",
  "Sky Castle",
  "Forest Temple",
  "Haunted Mansion",
  "Crystal Cavern",
  "Ice Fortress",
  "Volcano Lair",
  "Cyber City",
  "Steam Punk Metropolis",
  "Enchanted Garden",
  "Dark Dimension",
  "Celestial Palace",
  "Underground Tunnels",
  "Frozen Wasteland",
  "Desert Oasis",
  "Jungle Ruins",
  "Floating Island",
  "Time Warp",
  "Alien Planet",
  "Deep Space Station",
  "Magical Academy",
  "Futuristic Laboratory",
  "Ancient Library",
  "Artificial Intelligence Network",
  "Giant's Lair",
  "Chaos Realm",
  "Fairy Tale Castle",
  "Post-Apocalyptic City",
  "Interdimensional Nexus",
  "Dreamscape",
  "Abandoned Asylum",
  "Sunken Ship",
  "Forbidden Temple",
  "Lost City",
  "Parallel Universe",
  "Mystic Marsh",
  "Parallel World",
  "Underground Kingdom",
  "Dark Forest",
  "Crystal Palace",
  "Cursed Island",
  "Rainbow Valley",
  "Fire Mountain",
  "Hidden Cave",
  "Sky Kingdom",
  "Savage Wilds",
  "Mystical Mountain",
  "Ancient Pyramid",
  "Tropical Beach",
  "Elemental Plane",
  "Outer Space Colony",
  "Underground Bunker",
  "Lunar Base",
  "Forgotten Citadel",
  "Ancient Catacombs",
  "Holographic Theme Park",
  "Crystal Lake",
  "Floating Market",
  "Underground Volcano",
  "Abandoned Space Station",
  "Surreal Landscape",
  "Crystal Tower",
  "Mystical Island",
  "Mysterious Labyrinth",
  "Jungle Canopy",
  "Enchanted Marketplace",
  "Sunken Cityscape",
  "Haunted Forest",
  "Space Elevator",
  "Crystal Lagoon",
  "Magma Chamber",
  "Thundering Waterfall",
  "Ethereal Valley",
  "Abandoned Subway System",
  "Mirrored City",
  "Ancient Citadel",
  "Frozen Tundra",
  "Haunted Amusement Park",
  "Sunken Ruins",
  "Enchanted Castle",
  "Sandswept Canyon",
  "Orbital Station",
  "Lost Wilderness",
  "Aurora Borealis",
  "Giant Redwood Forest",
  "Futuristic Casino",
  "Mythical Underworld",
  "Infinite Desert",
  "Mystical Labyrinth",
  "Galactic Gateway",
  "Submerged Cavern",
  "Eternal Ice Fields",
  "Dark Matter Realm",
  "Holographic City",
  "Celestial Observatory",
  "Nebula Cluster",
  "Glacier National Park",
  "Undiscovered Island",
  "Underground Laboratory",
  "Retro Arcade",
  "Crystal Gardens",
  "Chromatic Coastline",
  "Iridescent Reef",
  "Lunar Colony",
  "Rainforest Canopy",
  "Hyperborean Forest",
  "Tesseract Station",
  "Magnetic Caves",
  "Abyssal Trench",
  "Interstellar Hub",
  "Exoplanet Outpost",
  "Emerald Canyon",
  "Spectral Sands",
  "Lost Oasis",
  "Nebula Nebula",
  "Astral Nexus",
  "Radiant Cityscape",
  "Euphoric Eden",
  "Pixelated Wonderland",
  "Clockwork Metropolis",
  "Ethereal Plane",
  "Neo-Tokyo Megapolis",
  "Doomsday New York",
  "Osaka",
  "Futuristic New York",
  "Gothic Paris",
  "Cybernetic London",
  "Spectral Rome",
  "Mythical Cairo",
  "Enchanted Sydney",
  "Steampunk San Francisco",
  "Eerie New Orleans",
  "Epic Berlin",
  "Venice of Dreams",
  "Steampunk London",
  "Retrofuturistic Moscow",
  "Ruins of Rome",
  "Shanghai Skybridge",
  "Cybernetic Arena",
  "Witch's Cottage",
  "Infinite Jungle",
  "Robot Zoo",
  "Elven Treehouse",
  "Desert Mirage",
  "Virtual Reality Playground",
  "Crystalized Cave",
  "Dragon's Den",
  "Sacred Waterfall",
  "Dimensional Library",
  "Moonlit Orchard",
  "Alchemist's Tower",
  "Haunted Graveyard",
  "Oceanic Abyss",
  "Temporal Café",
  "Lost Atlantis",
  "Vampire Castle",
  "Invisible Maze",
  "Cherry Blossom Temple",
  "Digital Utopia",
  "Celestial Zoo",
  "Pirate Cove",
  "Forest of Echoes",
  "Mars Colony",
  "Alien Zoo",
  "Petrified Forest",
  "Goblin Market",
  "Cursed Zoo",
  "Eldritch Library",
  "Heavenly Observatory",
  "Magic School",
  "Undying Desert",
  "Temporal Rift",
  "Robot Factory",
  "Spacecraft Graveyard",
  "Arctic Wilderness",
  "Lush Savannah",
  "Carnival of Nightmares",
  "Starlit Beach",
];

const elements = [
  "Fire",
  "Water",
  "Air",
  "Earth",
  "Lightning",
  "Ice",
  "Nature",
  "Darkness",
  "Light",
  "Metal",
  "Shadow",
  "Blood",
  "Lava",
  "Crystal",
  "Poison",
  "Time",
  "Space",
  "Gravity",
  "Sound",
  "Electricity",
  "Plasma",
  "Radiation",
  "Magma",
  "Smoke",
  "Steam",
  "Void",
  "Wind",
  "Plantlife",
  "Moon",
  "Sun",
  "Stars",
  "Sand",
  "Ash",
  "Quicksand",
  "Frost",
  "Acid",
  "Thunder",
  "Psychic Energy",
  "Dimensional Rift",
  "Cosmic Dust",
  "Spirit",
  "Gravity Waves",
  "Invisibility",
  "Psychokinesis",
  "Luminosity",
  "Chaos",
  "Magnetism",
  "Antimatter",
  "Pulse",
  "Gravity Flux",
  "Echolocation",
  "Photosynthesis",
  "Radiance",
  "Oblivion",
  "Memory",
  "Gravity Well",
  "Nanobots",
  "Nuclear Energy",
  "Psionics",
  "Phase Shift",
];

const adjectives = [
  "Ethereal",
  "Whimsical",
  "Mysterious",
  "Eerie",
  "Futuristic",
  "Gothic",
  "Serene",
  "Enigmatic",
  "Otherworldly",
  "Surreal",
  "Mythical",
  "Transcendent",
  "Celestial",
  "Nostalgic",
  "Hypnotic",
  "Cinematic",
  "Awe-Inspiring",
  "Epic",
  "Radiant",
  "Ornate",
  "Holographic",
  "Prismatic",
  "Intricate",
  "Majestic",
  "Harmonious",
  "Opulent",
  "Spectral",
  "Dramatic",
  "Glimmering",
  "Dreamlike",
  "Hyperrealistic",
  "Melancholic",
  "Psychedelic",
  "Retro-Futuristic",
  "Post-Apocalyptic",
  "Neon",
  "Saturated",
  "Sculptural",
  "Minimalist",
  "Abstract",
  "Vibrant",
  "Cosmic",
  "Organic",
  "Luminous",
  "Tranquil",
  "Whirlwind",
  "Hazy",
  "Fragile",
  "Crisp",
  "Dynamic",
  "Galactic",
  "Flamboyant",
  "Shimmering",
  "Misty",
  "Idyllic",
  "Nebulous",
  "Rustic",
  "Fleeting",
  "Nimble",
  "Spirited",
  "Geometric",
  "Polygonal",
  "Golden Hour",
  "Underwater",
  "Pokémon",
];

const styles = [
  "Digital Art",
  "Surrealism",
  "Concept Art",
  "Illustration",
  "Character Design",
  "Anime",
  "Realism",
  "Impressionism",
  "Pop Art",
  "Steampunk",
  "Pixel Art",
  "Graffiti Art",
  "Fantasy Art",
  "Futurism",
  "Art Deco",
  "Minimalism",
  "Street Art",
  "Hyperrealism",
  "Glitch Art",
  "Photorealism",
  "Calligraphy",
  "Ink",
  "Woodcut Print",
  "Manga",
  "Sketch",
  "Drawing",
  "Doodle",
  "Dot Art",
  "Stipple",
  "Anatomical Drawing",
  "Visual Novel",
  "Graphic Novel",
  "Hand-Drawn",
  "Graphite",
  "Colored Pencil",
  "Pastel Art",
  "Blackboard",
  "Splatter Paint",
  "Paper-Marbling",
  "Logo",
  "Comic Book",
  "Poster",
  "Kirigami",
  "Origami",
  "Frame",
  "Wall Decal",
  "Banner",
  "Papercutting",
  "Ice Carving",
  "Linocut",
  "Wood-Carving",
  "Light Art",
  "Bokeh",
  "Wildlife Photography",
  "Portrait",
  "Microscopic",
  "Ultra-Wide Angle",
  "Depth of Field",
  "Closeup",
  "Blur Effect",
  "Lens Flare",
  "Punk",
];

const colors = [
  "Warm Color Palette",
  "Colorful",
  "Rainbow",
  "Spectral Color",
  "Inverted Colors",
  "Neon",
  "Electric Colors",
  "Complimentary-Colors",
  "Dark Mode",
  "Triadic-Colors",
  "Polychromatic Colors",
  "Tones of Black",
  "Black and White",
  "Monochrome",
  "Sepia",
  "High Contrast",
  "Low Contrast",
  "Technicolor",
  "Atari Graphics",
  "Adobe RGB",
  "Hexadecimal",
  "Vintage",
  "Pastel Palette",
  "Earth Tones",
  "Metallic Colors",
  "Crayon Box",
  "Sunset Hues",
  "Ocean Blues",
  "Fire Tones",
  "Shades of Gray",
  "Forest Greens",
  "Soothing Neutrals",
  "Pop Art Colors",
  "Solarized",
  "Night Sky",
  "Sunrise Shades",
  "Cool Tones",
  "Warm Tones",
  "Desert Palette",
  "Winter Wonderland",
  "Summer Vibes",
  "Fall Foliage",
  "Red Monochrome",
  "Green Monochrome",
  "Blue Monochrome",
  "Yellow Monochrome",
  "Purple Monochrome",
];

const artists = [
  "Alan Lee",
  "Cyril Rolando",
  "David Mack",
  "Donato Giancola",
  "Greg Rutkowski",
  "Ismail Inceoglu",
  "John Berkey",
  "Michael Garmash",
  "Peter Mohrbacher",
  "Sparth",
  "Vincent Di Fate",
  "Akihiko Yoshida",
  "Artgerm",
  "Charlie Bowater",
  "Frank Frazetta",
  "Hsiao-Ron Cheng",
  "Ilya Kuvshinov",
  "Joshua Middleton",
  "Krenz Cushart",
  "Lois Van Baarle",
  "Makoto Shinkai",
  "Rossdraws",
  "Wenjun Lin",
  "Anna Dittmann",
  "Agnes Cecile",
  "Alphonse Mucha",
  "Audrey Kawasaki",
  "Boris Vallejo",
  "Carne Griffiths",
  "Conrad Roset",
  "JC Leyendecker",
  "Joseph Lorusso",
  "Jovana Rikalo",
  "Karol Bak",
  "Marco Mazzoni",
  "Miho Hirano",
  "Rebeca Saray",
  "Robert McGinnis",
  "Russ Mills",
  "Tom Bagshaw",
  "Tristan Eaton",
  "Ed Mell",
  "Jessica Rossier",
  "Hubert Robert",
  "Ian McQue",
  "Marc Simonetti",
  "Raphael Lacoste",
  "Bernie Wrightson",
  "H.R. Giger",
  "Richard Corben",
  "Wayne Barlowe",
  "Zdzislaw Beksinski",
  "Hokusai Katsushika",
  "Akira Toriyama",
  "Eiichiro Oda",
  "Masashi Kishimoto",
  "Osamu Tezuka",
  "Vincent van Gogh",
  "Leonardo da Vinci",
  "Frida Kahlo",
  "Pablo Picasso",
  "Georgia O'Keeffe",
  "Ansel Adams",
  "Dorothea Lange",
  "Robert Capa",
  "Cindy Sherman",
  "Henri Cartier-Bresson",
  "Michelangelo",
  "Auguste Rodin",
  "Louise Bourgeois",
  "Donatello",
  "Constantin Brâncuși",
  "Milton Glaser",
  "Paul Rand",
  "Jessica Walsh",
  "Shepard Fairey",
  "Mary Blair",
  "Charles Schulz",
  "Bill Watterson",
  "Jack Kirby",
  "Stan Lee",
  "R. Crumb",
  "Banksy",
  "JR",
  "Shepard Fairey",
  "Kobra",
  "Obey",
  "Naughty Dog",
  "Blizzard Entertainment",
  "FromSoftware",
  "Nintendo",
  "Rockstar Games",
];

const prefixes = [
  "Zombie",
  "Superhero",
  "Robot",
  "Pirate",
  "Alien",
  "Wizard",
  "Vampire",
  "Werewolf",
  "Ninja",
  "Dragon",
  "Cyborg",
  "Time-traveler",
  "Space",
  "Giant",
  "Tiny",
  "Invisible",
  "Goblin",
  "Goddess",
  "Sorceress",
  "Witch",
  "Ghost",
  "Saiyan",
  "Astral",
  "Bionic",
  "Steampunk",
  "Chrono",
  "Quantum",
  "Cybernetic",
  "Galactic",
  "Arcane",
  "Mystic",
  "Eldritch",
  "Apocalyptic",
  "Elemental",
  "Divine",
  "Fallen",
  "Monstrous",
  "Mutated",
  "Psionic",
  "Supernatural",
  "Feral",
  "Aquatic",
  "Subterranean",
  "Celestial",
  "Phantasmal",
  "Revenant",
  "Living",
  "Sentient",
  "Spectral",
  "Mechanical",
  "Biological",
  "Mythic",
  "Fabled",
  "Demonic",
  "Shadow",
  "Lunar",
  "Solar",
  "Stellar",
  "Arctic",
  "Tropical",
  "Imperial",
  "Royal",
  "Majestic",
  "Temporal",
  "Dimensional",
  "Vigilante",
  "Cosmic",
  "Primordial",
  "Cursed",
  "Blessed",
  "Synthetic",
  "Aether",
  "Serpentine",
  "Nomadic",
  "Tribal",
  "High",
  "Low",
  "Cunning",
  "Ruthless",
  "Infernal",
  "Heavenly",
  "Abyssal",
  "Unholy",
  "Radiant",
  "Miraculous",
  "Noble",
  "Twisted",
  "Tormented",
  "Warped",
  "Grotesque",
  "Ascendant",
  "Dystopian",
  "Utopian",
  "Relentless",
  "Carnal",
  "Martial",
  "Aerial",
  "Aquamarine",
  "Ivory",
  "Amber",
  "Obsidian",
  "Coral",
  "Verdant",
  "Frigid",
  "Fiery",
  "Volcanic",
  "Magnetic",
  "Elastic",
  "Immortal",
  "Mortal",
  "Digital",
  "Equestrian",
  "Feathered",
  "Scaled",
  "Translucent",
  "Ornamental",
  "Alchemical",
  "Incorporeal",
  "Reclusive",
  "Avian",
  "Venomous",
  "Electric",
];

const suffixes = [
  "dancing",
  "flying",
  "running",
  "singing",
  "fighting",
  "swimming",
  "climbing",
  "jumping",
  "laughing",
  "crying",
  "shouting",
  "exploring",
  "sleeping",
  "eating",
  "walking",
  "sneaking",
  "teleporting",
  "summoning",
  "twirling",
  "mystifying",
  "illuminating",
  "contemplating",
  "enchanting",
  "whispering",
  "wandering",
  "daydreaming",
  "captivating",
  "vanishing",
];

const improvers = [
  "masterpiece, trending on artstation",
  "trending on deviantart",
  "award-winning",
  "masterpiece",
  "intricate and detailed",
  "hyper-realistic",
  "ethereal beauty",
  "surreal masterpiece",
  "jaw-dropping",
  "psychedelic",
  "colorful and vibrant",
];

promptGenerator.addPreviousUserInputs();

// generate 10 random prompts
promptGenerator.generatePrompts(10);
