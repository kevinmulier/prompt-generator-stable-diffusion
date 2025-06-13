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
      prompt += "of ";
    }

    if (!isLandscapesPrompt) {
      if ((isPrefixePrompt && isPrefixesActive) || this.currentPrefixes[0] !== prefixes[0]) {
        // if is a prefix prompt, add a random prefix
        prompt += `${this.randomElement(this.currentPrefixes)} `;
      }

      if (isObjectsActive && Math.random() < 0.1 && this.currentCharacters[0] === characters[0]) {
        // if objects are active, can add a random object as the main subject of the prompt
        mainSubject = this.randomElement(this.currentObjects);
        prompt += `${mainSubject}`;
      } else {
        // otherwise, add a random character as the main subject of the prompt, possibly with a random object
        mainSubject = this.randomElement(this.currentCharacters);
        if (Math.random() < 0.25 || this.currentObjects[0] !== objects[0]) {
          if (isObjectsActive) {
            prompt += `${mainSubject} with ${this.randomElement(this.currentObjects)}`;
          } else {
            prompt += `${mainSubject}`;
          }
        } else {
          prompt += `${mainSubject}`;
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
      prompt += `${this.randomElement(this.currentPlaces)}`;
    } else if (isPlacesActive) {
      prompt += `, ${this.randomElement(this.currentPlaces)}`;
    }

    // Add a artists and/or styles to the prompt
    if (isArtistsActive && isStylesActive) {
      prompt += `, ${stylesPrompt} in ${artistsPrompt} style`;
    } else if (isArtistsActive) {
      prompt += `, ${artistsPrompt} style`;
    } else if (isStylesActive) {
      prompt += `, ${stylesPrompt}`;
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
  // --- Generic ---
  "Alchemist",
  "Alien",
  "Android",
  "Angel",
  "Antihero",
  "Archer",
  "Artist",
  "Assassin",
  "Astronaut",
  "Athlete",
  "Bard",
  "Barbarian",
  "Beastmaster",
  "Blacksmith",
  "Builder",
  "Captain",
  "Carpenter",
  "Centaur",
  "Champion",
  "Chef",
  "Civilian",
  "Clergy",
  "Cleric",
  "Commander",
  "Cowboy",
  "Cowgirl",
  "Cultist",
  "Cyborg",
  "Dancer",
  "Demon",
  "Detective",
  "Doctor",
  "Dragon",
  "Druid",
  "Duchess",
  "Duke",
  "Dwarf",
  "Elf",
  "Emperor",
  "Empress",
  "Engineer",
  "Explorer",
  "Fairy",
  "Farmer",
  "Firefighter",
  "Fisherman",
  "General",
  "Genie",
  "Ghost",
  "Giant",
  "Gladiator",
  "Goblin",
  "Goddess",
  "Golem",
  "Guardian",
  "Gunslinger",
  "Healer",
  "Hunter",
  "Imp",
  "Inventor",
  "Jester",
  "King",
  "Knight",
  "Kraken",
  "Leader",
  "Leviathan",
  "Lich",
  "Librarian",
  "Mage",
  "Mechanic",
  "Merchant",
  "Mermaid",
  "Miner",
  "Monk",
  "Monster Hunter",
  "Mummy",
  "Musician",
  "Mutant",
  "Naga",
  "Necromancer",
  "Ninja",
  "Nomad",
  "Nurse",
  "Oracle",
  "Orc",
  "Paladin",
  "Phoenix",
  "Pilot",
  "Pirate",
  "Police Officer",
  "Priest",
  "Priestess",
  "Prince",
  "Princess",
  "Prophet",
  "Protector",
  "Psion",
  "Queen",
  "Refugee",
  "Robot",
  "Rogue",
  "Sage",
  "Sailor",
  "Samurai",
  "Satyr",
  "Scholar",
  "Scientist",
  "Seer",
  "Sentinel",
  "Shaman",
  "Shapeshifter",
  "Siren",
  "Soldier",
  "Sorcerer",
  "Space Marine",
  "Spy",
  "Student",
  "Super-Soldier",
  "Superhero",
  "Supervillain",
  "Teacher",
  "Technomancer",
  "Templar",
  "Thief",
  "Troll",
  "Unicorn",
  "Vampire",
  "Vigilante",
  "Viking",
  "Wanderer",
  "Warlock",
  "Warrior",
  "Werewolf",
  "Witch",
  "Wizard",
  "Worker",
  "Zombie",

  // --- Popular Characters ---
  "Aerith Gainsborough",
  "Aloy",
  "Alucard",
  "Aloy",
  "Aang",
  "Aragorn",
  "Arthur Morgan",
  "Ash Ketchum",
  "Asuka Langley Soryu",
  "Bart Simpson",
  "Batman",
  "Black Widow",
  "Blossom",
  "Bubbles",
  "Bugs Bunny",
  "Bulma",
  "Buttercup",
  "C-3PO",
  "Captain America",
  "Captain Jack Sparrow",
  "Captain Kirk",
  "Charizard",
  "Chewbacca",
  "Chris Redfield",
  "Chun-Li",
  "Claire Redfield",
  "Cloud Strife",
  "Commander Shepard",
  "D.Va",
  "Daffy Duck",
  "Daenerys Targaryen",
  "Darth Vader",
  "Deadpool",
  "Dexter",
  "Dio Brando",
  "Doctor Eggman",
  "Donald Duck",
  "Doom Slayer",
  "Edward Elric",
  "Ellen Ripley",
  "Eren Yeager",
  "Ezio Auditore",
  "Finn the Human",
  "Freddy Krueger",
  "Frodo Baggins",
  "Gandalf",
  "Ganondorf",
  "Gengar",
  "Genji",
  "Geralt of Rivia",
  "Godzilla",
  "Goofy",
  "Guts",
  "Han Solo",
  "Harley Quinn",
  "Harry Potter",
  "He-Man",
  "Hermione Granger",
  "Homer Simpson",
  "Hulk",
  "Indiana Jones",
  "Inuyasha",
  "Iron Man",
  "Jake the Dog",
  "James Bond",
  "Jason Voorhees",
  "Jill Valentine",
  "Joker",
  "John Marston",
  "John Wick",
  "Johnny Silverhand",
  "Jotaro Kujo",
  "Katara",
  "Ken (Street Fighter)",
  "Kenshin Himura",
  "King Kong",
  "Korra",
  "Kratos",
  "L",
  "Lara Croft",
  "Leia Organa",
  "Legolas",
  "Leon S. Kennedy",
  "Levi Ackerman",
  "Light Yagami",
  "Link",
  "Lion-O",
  "Lisa Simpson",
  "Lois Griffin",
  "Luke Skywalker",
  "Luffy",
  "Luigi",
  "Mario",
  "Marge Simpson",
  "Master Chief",
  "Mega Man",
  "Megatron",
  "Mewtwo",
  "Mickey Mouse",
  "Mikasa Ackerman",
  "Minnie Mouse",
  "Morpheus",
  "Morty Smith",
  "Monkey D. Luffy",
  "Naruto Uzumaki",
  "Nami",
  "Nathan Drake",
  "Neo",
  "Optimus Prime",
  "Pac-Man",
  "Patrick Star",
  "Peter Griffin",
  "Pikachu",
  "Princess Peach",
  "Princess Zelda",
  "R2-D2",
  "Raiden (Mortal Kombat)",
  "Rick Sanchez",
  "Roronoa Zoro",
  "Ryu (Street Fighter)",
  "Sailor Moon",
  "Sakura Haruno",
  "Samus Aran",
  "Sanji",
  "Sasuke Uchiha",
  "Scooby Doo",
  "Scorpion (Mortal Kombat)",
  "Sephiroth",
  "Shaggy",
  "Sherlock Holmes",
  "Skeletor",
  "Snorlax",
  "Solid Snake",
  "Sonic the Hedgehog",
  "Spike Spiegel",
  "Spongebob Squarepants",
  "Steven Universe",
  "Stewie Griffin",
  "Sub-Zero (Mortal Kombat)",
  "Superman",
  "T-800 (Terminator)",
  "Thor",
  "Tifa Lockhart",
  "Trinity",
  "V (Cyberpunk)",
  "Vash the Stampede",
  "Vegeta",
  "Voldemort",
  "Voltron",
  "Wolverine",
  "Wonder Woman",
  "Yoda",
  "Zelda",
  "Zuko",
];

const objects = [
  "Abacus",
  "Action Figure",
  "Aircraft",
  "Altar",
  "Amulet",
  "Anvil",
  "Apple",
  "Archway",
  "Armor",
  "Art Easel",
  "Art Palette",
  "Artifact",
  "Ashtray",
  "Astronaut Helmet",
  "Astrolabe",
  "Axe",
  "Backpack",
  "Bag",
  "Ball",
  "Banana",
  "Banner",
  "Barrel",
  "Basketball Hoop",
  "Bat",
  "Baton",
  "Battle-axe",
  "Beacon",
  "Beaker",
  "Bed",
  "Bell",
  "Belt",
  "Bench",
  "Beret",
  "Bicycle",
  "Binoculars",
  "Blaster",
  "Blimp",
  "Block",
  "Blood Vial",
  "Bonsai Tree",
  "Book",
  "Bookcase",
  "Boomerang",
  "Boots",
  "Bottle",
  "Boulder",
  "Bow",
  "Bowl",
  "Box",
  "Brain",
  "Brazier",
  "Bread",
  "Breastplate",
  "Brick",
  "Brooch",
  "Broom",
  "Bucket",
  "Bunker Door",
  "Button",
  "Cactus",
  "Cage",
  "Cake",
  "Caltrops",
  "Camera",
  "Campfire",
  "Candle",
  "Canteen",
  "Canvas",
  "Cape",
  "Car",
  "Card",
  "Cardigan",
  "Cargo Container",
  "Carpet",
  "Cart",
  "Cauldron",
  "Chains",
  "Chainsaw",
  "Chair",
  "Chalice",
  "Chandelier",
  "Chariot",
  "Chassis",
  "Chemical Flask",
  "Chess Piece",
  "Chest",
  "Chicken",
  "Chisel",
  "Choker",
  "Cigar",
  "Circuit Board",
  "Clamp",
  "Clarinet",
  "Claw",
  "Clock",
  "Clockwork Mechanism",
  "Cloak",
  "Club",
  "Cogs",
  "Coin",
  "Collar",
  "Column",
  "Comb",
  "Communication Device",
  "Compass",
  "Computer",
  "Control Panel",
  "Cookbook",
  "Cooking Pot",
  "Couch",
  "Crab",
  "Crate",
  "Crown",
  "Crowbar",
  "Crucible",
  "Crystal Ball",
  "Crystal Shard",
  "Cup",
  "Curtains",
  "Cyborg Arm",
  "Dagger",
  "Dartboard",
  "Data Pad",
  "Desk",
  "Dice",
  "Dinosaur Skeleton",
  "Dish",
  "Diving Helmet",
  "Doll",
  "Door",
  "Dragon Egg",
  "Dresser",
  "Driftwood",
  "Drill",
  "Drone",
  "Drum",
  "Dynamite",
  "Earrings",
  "Easel",
  "Egg",
  "Elixir",
  "Emerald",
  "Engine",
  "Eraser",
  "Exoskeleton",
  "Eyeglasses",
  "Eyepatch",
  "Fan",
  "Fanny Pack",
  "Feather",
  "Fedora",
  "Figurine",
  "File Cabinet",
  "Fire Extinguisher",
  "Fireplace",
  "Fish",
  "Fishing Rod",
  "Flask",
  "Flamethrower",
  "Flashlight",
  "Flower",
  "Flute",
  "Food",
  "Footlocker",
  "Force Field Generator",
  "Fork",
  "Fossil",
  "Fountain",
  "Frame",
  "Frying Pan",
  "Furniture",
  "Gauntlet",
  "Gears",
  "Gemstone",
  "Geode",
  "Giant Mushroom",
  "Glaive",
  "Glasses",
  "Globe",
  "Glove",
  "Goblet",
  "Goggles",
  "Grappling Hook",
  "Grenade",
  "Grimoire",
  "Guitar",
  "Gun",
  "Hammer",
  "Handcuffs",
  "Harp",
  "Harvest Tool",
  "Hat",
  "Headphones",
  "Heart Locket",
  "Heavy Armor",
  "Helmet",
  "High Heels",
  "Holster",
  "Hook",
  "Horns",
  "Horse Saddle",
  "Hourglass",
  "Hoverboard",
  "Hut",
  "Idol",
  "Ink Bottle",
  "Inkwell",
  "Instrument",
  "Iron Bars",
  "Jack-o'-lantern",
  "Jacket",
  "Jade Statue",
  "Jar",
  "Jeans",
  "Jetpack",
  "Jewel",
  "Jukebox",
  "Key",
  "Keyboard",
  "Kilt",
  "Kimono",
  "Knife",
  "Knuckles",
  "Laboratory Equipment",
  "Ladder",
  "Lamp",
  "Lantern",
  "Laptop",
  "Lasso",
  "Laser Cannon",
  "Laser Pistol",
  "Leaf",
  "Leather Jacket",
  "Lens",
  "Lever",
  "Light",
  "Lightsaber",
  "Lock",
  "Log",
  "Longbow",
  "Loot Bag",
  "Lute",
  "Machine Gun",
  "Machine Part",
  "Magnifying Glass",
  "Mace",
  "Magnet",
  "Map",
  "Mask",
  "Medical Kit",
  "Medal",
  "Medallion",
  "Megaphone",
  "Melody",
  "Microchip",
  "Microphone",
  "Microscope",
  "Minecart",
  "Mirror",
  "Missile",
  "Mitten",
  "Mjölnir",
  "Monitor",
  "Monocle",
  "Motorcycle",
  "Mouse",
  "Mug",
  "Mushroom",
  "Musical Box",
  "Nail",
  "Necklace",
  "Needle",
  "Net",
  "Neural Interface",
  "Notebook",
  "Nunchaku",
  "Obelisk",
  "Oil Lamp",
  "Orb",
  "Ornament",
  "Padlock",
  "Paintbrush",
  "Painting",
  "Pants",
  "Paper",
  "Parchment",
  "Pedestal",
  "Pen",
  "Pencil",
  "Pendant",
  "Pendulum",
  "Petri Dish",
  "Philosopher's Stone",
  "Photograph",
  "Piano",
  "Pickaxe",
  "Picture Frame",
  "Pie",
  "Pillow",
  "Pin",
  "Pipe",
  "Piston",
  "Pistol",
  "Pizza",
  "Plate",
  "Playing Cards",
  "Pocket Watch",
  "Poison Vial",
  "Polearm",
  "Portable Device",
  "Portal",
  "Poster",
  "Potion",
  "Power Cell",
  "Power Core",
  "Pressure Gauge",
  "Prosthetic Arm",
  "Purse",
  "Puzzle Box",
  "Quill",
  "Quiver",
  "Radio",
  "Railroad Track",
  "Rapier",
  "Reactor",
  "Relic",
  "Revolver",
  "Rifle",
  "Ring",
  "Robot",
  "Rocket Launcher",
  "Rock",
  "Rope",
  "Rug",
  "Rune Stone",
  "Safe",
  "Sail",
  "Sandal",
  "Satellite Dish",
  "Saw",
  "Saxophone",
  "Scabbard",
  "Scarf",
  "Scepter",
  "Scroll",
  "Scythe",
  "Seed",
  "Sextant",
  "Shield",
  "Shin Guards",
  "Shirt",
  "Shoes",
  "Shop Sign",
  "Shotgun",
  "Shovel",
  "Shuriken",
  "Sigh",
  "Signpost",
  "Ski Goggles",
  "Skirt",
  "Skull",
  "Sleeping Bag",
  "Sling",
  "Slingshot",
  "Smartphone",
  "Smoke Bomb",
  "Snare Trap",
  "Sneakers",
  "Sofa",
  "Spaceship",
  "Speaker",
  "Spear",
  "Spellbook",
  "Spiderweb",
  "Spiked Collar",
  "Spikes",
  "Spoon",
  "Staircase",
  "Staff",
  "Statue",
  "Steampunk Gear",
  "Stereo",
  "Stick",
  "Stool",
  "Stopwatch",
  "Streetlight",
  "String",
  "Suit",
  "Suitcase",
  "Sun Hat",
  "Sunglasses",
  "Sushi",
  "Sweater",
  "Sword",
  "Table",
  "Tablet",
  "Talisman",
  "Teacup",
  "Teapot",
  "Telescope",
  "Television",
  "Tent",
  "Throne",
  "Tiara",
  "Tie",
  "Timepiece",
  "Torch",
  "Totem",
  "Tower Shield",
  "Toy",
  "Train",
  "Trench Coat",
  "Trophy",
  "Trumpet",
  "Turban",
  "Typewriter",
  "Umbrella",
  "Uniform",
  "Urn",
  "Vase",
  "Vehicle",
  "Veil",
  "Vest",
  "Vial",
  "Violin",
  "Visor",
  "Walking Stick",
  "Wallet",
  "Wand",
  "Wardrobe",
  "Watch",
  "Water Bottle",
  "Weapon",
  "Web",
  "Well",
  "Wheel",
  "Whip",
  "Whistle",
  "Wig",
  "Wind Chime",
  "Window",
  "Wine Glass",
  "Wing",
  "Wizard Hat",
  "Wooden Crate",
  "Wrench",
  "Writing Desk",
  "Yoyo",
];

const places = [
  "Abandoned Asylum",
  "Abandoned Factory",
  "Abandoned Space Station",
  "Abandoned Subway System",
  "Abyssal Trench",
  "Alchemist's Tower",
  "Alien Colony",
  "Alien Planet",
  "Alien Zoo",
  "Ancient Catacombs",
  "Ancient Citadel",
  "Ancient Library",
  "Ancient Monastery",
  "Ancient Pyramid",
  "Ancient Ruins",
  "Ancient Temple",
  "Arctic Outpost",
  "Arctic Wilderness",
  "Arena",
  "Artificial Intelligence Network",
  "Asteroid City",
  "Asteroid Mine",
  "Astral Nexus",
  "Atoll",
  "Aurora Borealis",
  "Bazaar",
  "Beacon",
  "Blighted Swamp",
  "Blood Cult Temple",
  "Bridge",
  "Bustling City",
  "Bustling Port",
  "Canal",
  "Carnival of Nightmares",
  "Cave",
  "Celestial Observatory",
  "Celestial Palace",
  "Celestial Zoo",
  "Cherry Blossom Temple",
  "Chromatic Coastline",
  "Citadel",
  "Cloud City",
  "Clockwork Metropolis",
  "Coliseum",
  "Coral Reef",
  "Cursed Island",
  "Cursed Graveyard",
  "Cursed Zoo",
  "Cyber City",
  "Cybernetic Arena",
  "Cybernetic London",
  "Dark Alleyway",
  "Dark Dimension",
  "Dark Forest",
  "Dark Matter Realm",
  "Data Center",
  "Deep Space Station",
  "Desert Mirage",
  "Desert Oasis",
  "Deserted Island",
  "Dimensional Library",
  "Doomsday New York",
  "Dragon's Den",
  "Dreamscape",
  "Dwarven Mine",
  "Dyson Sphere",
  "Eerie Circus",
  "Eerie New Orleans",
  "Elven City",
  "Elven Treehouse",
  "Emerald Canyon",
  "Enchanted Castle",
  "Enchanted Garden",
  "Enchanted Marketplace",
  "Enchanted Sydney",
  "Epic Berlin",
  "Ethereal Plane",
  "Ethereal Valley",
  "Euphoric Eden",
  "Exoplanet Outpost",
  "Fairy Tale Castle",
  "Fallout Zone",
  "Farmhouse",
  "Floating Island",
  "Floating Market",
  "Forbidden Archives",
  "Forbidden Lab",
  "Forbidden Temple",
  "Forest Clearing",
  "Forest of Echoes",
  "Forest Temple",
  "Fortress",
  "Frozen Tundra",
  "Frozen Wasteland",
  "Futuristic Casino",
  "Futuristic Laboratory",
  "Futuristic New York",
  "Galactic Gateway",
  "Giant Redwood Forest",
  "Giant's Lair",
  "Goblin Market",
  "Gothic Paris",
  "Grand Cathedral",
  "Grand Library",
  "Haunted Amusement Park",
  "Haunted Forest",
  "Haunted Graveyard",
  "Haunted Mansion",
  "Heavenly Observatory",
  "Hidden Cave",
  "Hidden Village",
  "Highlands",
  "Holographic City",
  "Holographic Theme Park",
  "Hyperborean Forest",
  "Ice Fortress",
  "Infinite Desert",
  "Infinite Jungle",
  "Infested Sewer",
  "Interdimensional Nexus",
  "Interstellar Hub",
  "Invisible Maze",
  "Iridescent Reef",
  "Jungle Canopy",
  "Jungle Ruins",
  "Keep",
  "Lost Atlantis",
  "Lost City",
  "Lost Continent",
  "Lost Oasis",
  "Lost Wilderness",
  "Lush Savannah",
  "Lunar Base",
  "Lunar Colony",
  "Magical Academy",
  "Magma Chamber",
  "Magnetic Caves",
  "Mars Colony",
  "Mausoleum",
  "Megastructure",
  "Mirrored City",
  "Moonlit Orchard",
  "Mountain Pass",
  "Museum Vault",
  "Mystical Island",
  "Mystical Labyrinth",
  "Mystical Mountain",
  "Mystic Marsh",
  "Nebula Cluster",
  "Necropolis",
  "Neon Alley",
  "Neo-Tokyo Megapolis",
  "Oceanic Abyss",
  "Orbital City",
  "Orbital Station",
  "Osaka",
  "Outer Space Colony",
  "Paradise",
  "Parallel Universe",
  "Petrified Forest",
  "Pirate Cove",
  "Pixelated Wonderland",
  "Plague City",
  "Post-Apocalyptic City",
  "Prison",
  "Quantum Realm",
  "Quiet Village",
  "Radiant Cityscape",
  "Rainbow Valley",
  "Rainforest Canopy",
  "Refuge",
  "Retro Arcade",
  "Retrofuturistic Moscow",
  "Ringworld",
  "Riverbend",
  "Robot Factory",
  "Robot Zoo",
  "Rooftop Garden",
  "Ruined Castle",
  "Ruins of Rome",
  "Sacred Grove",
  "Sacred Waterfall",
  "Sandswept Canyon",
  "Savage Wilds",
  "Secret Base",
  "Secret Bunker",
  "Secret Garden",
  "Server Farm",
  "Shadow Realm",
  "Shanghai Skybridge",
  "Shopping Mall",
  "Silent Forest",
  "Sky Castle",
  "Sky City",
  "Sky Kingdom",
  "Sky Scraper",
  "Slums",
  "Space Elevator",
  "Spacecraft Graveyard",
  "Spaceport",
  "Spectral Rome",
  "Spectral Sands",
  "Starlit Beach",
  "Steampunk London",
  "Steampunk Metropolis",
  "Steampunk San Francisco",
  "Submerged Cavern",
  "Submerged Ruins",
  "Sunken Cityscape",
  "Sunken Ship",
  "Surreal Landscape",
  "Swamp",
  "Tesseract Station",
  "Thundering Waterfall",
  "Time Warp",
  "Toxic Mire",
  "Tropical Beach",
  "Underground Bunker",
  "Underground City",
  "Underground Kingdom",
  "Underground Laboratory",
  "Underground Tunnels",
  "Underground Volcano",
  "Undiscovered Island",
  "Undying Desert",
  "Underwater City",
  "Underwater Temple",
  "Urban Sprawl",
  "Vampire Castle",
  "Venice of Dreams",
  "Virtual Reality Playground",
  "Volcano Lair",
  "Wasteland",
  "Whispering Gallery",
  "Whispering Woods",
  "Witch's Cottage",
  "Wormhole",
];

const elements = [
  "Abstract",
  "Active",
  "Aged",
  "Agitated",
  "Analog",
  "Ancient",
  "Angular",
  "Animalistic",
  "Anthropomorphic",
  "Asymmetric",
  "Asymmetrical",
  "Avant-garde",
  "Awake",
  "Awe-Inspiring",
  "Backlit",
  "Balanced",
  "Bleak",
  "Blemished",
  "Blurred",
  "Botanical",
  "Broken",
  "Building",
  "Buoyant",
  "Calm",
  "Campy",
  "Cavernous",
  "Chaotic",
  "Checkered",
  "Cheesy",
  "Chilling",
  "Chilly",
  "Chromatic",
  "Circuitry",
  "Clean",
  "Closed",
  "Coarse",
  "Cohesive",
  "Combustible",
  "Comforting",
  "Common",
  "Confident",
  "Conformist",
  "Conscious",
  "Contained",
  "Contemporary",
  "Contracting",
  "Cool",
  "Corrosive",
  "Cosmic",
  "Cracked",
  "Crafted",
  "Cramped",
  "Creating",
  "Crinkled",
  "Crisp",
  "Crocheted",
  "Crying",
  "Crystal Clear",
  "Curved",
  "Dappled",
  "Dead",
  "Deep",
  "Deflated",
  "Delicate",
  "Dense",
  "Destroying",
  "Devolving",
  "Digital",
  "Diminished",
  "Discovering",
  "Dismantling",
  "Dispersed",
  "Distorted",
  "Dramatic",
  "Drawn",
  "Dreaming",
  "Dreamlike",
  "Drinking",
  "Dry",
  "Dull",
  "Dynamic",
  "Earthy",
  "Eating",
  "Eccentric",
  "Echoing",
  "Eerie",
  "Elaborate",
  "Electronic",
  "Embroidered",
  "Empowering",
  "Enclosed",
  "Engraved",
  "Enigmatic",
  "Ephemeral",
  "Epic",
  "Etched",
  "Eternal",
  "Ethereal",
  "Evolving",
  "Exotic",
  "Expanding",
  "Exploring",
  "Explosive",
  "Falling",
  "Familiar",
  "Fierce",
  "Fiery",
  "Fighting",
  "Fine",
  "Flamboyant",
  "Flammable",
  "Fleeting",
  "Flickering",
  "Floating",
  "Floral",
  "Fluid",
  "Foreboding",
  "Fractured",
  "Fragile",
  "Fragmented",
  "Futuristic",
  "Fuzzy",
  "Galactic",
  "Gaseous",
  "Gentle",
  "Geometric",
  "Gigantic",
  "Glassy",
  "Glimmering",
  "Glossy",
  "Gothic",
  "Grandiose",
  "Gritty",
  "Growing",
  "Grungy",
  "Handmade",
  "Hard",
  "Harmonious",
  "Haunting",
  "Hazy",
  "Heavy",
  "Heroic",
  "Holographic",
  "Humanoid",
  "Humble",
  "Humming",
  "Hyperrealistic",
  "Hypnotic",
  "Icy",
  "Idyllic",
  "Illuminated",
  "Inert",
  "Inflammable",
  "Inflated",
  "Inspiring",
  "Intense",
  "Intricate",
  "Iridescent",
  "Joyful",
  "Kitsch",
  "Knitted",
  "Laughing",
  "Light",
  "Liquid",
  "Lively",
  "Living",
  "Luminous",
  "Magnified",
  "Majestic",
  "Matte",
  "Mechanical",
  "Meditating",
  "Melancholic",
  "Metallic",
  "Microscopic",
  "Mindless",
  "Miniature",
  "Minimalist",
  "Misty",
  "Modern",
  "Monochromatic",
  "Mossy",
  "Muted",
  "Mysterious",
  "Mythical",
  "Nebulous",
  "Neon",
  "New",
  "Nimble",
  "Noisy",
  "Nostalgic",
  "Old",
  "Opaque",
  "Open",
  "Opulent",
  "Orderly",
  "Organic",
  "Ornate",
  "Otherworldly",
  "Painted",
  "Pale",
  "Peaceful",
  "Pearlescent",
  "Plaid",
  "Playful",
  "Playing",
  "Poignant",
  "Polished",
  "Polychromatic",
  "Polygonal",
  "Post-Apocalyptic",
  "Praying",
  "Precious",
  "Prismatic",
  "Pristine",
  "Provocative",
  "Psychedelic",
  "Pulsating",
  "Quilted",
  "Quirky",
  "Radiant",
  "Rare",
  "Rebellious",
  "Reflective",
  "Relaxing",
  "Repaired",
  "Retro-Futuristic",
  "Reverberating",
  "Rich",
  "Rising",
  "Roaring",
  "Robust",
  "Rough",
  "Rubbery",
  "Rustic",
  "Saturated",
  "Scarred",
  "Scorching",
  "Scratched",
  "Sculpted",
  "Sculptural",
  "Sentient",
  "Serene",
  "Shaded",
  "Shadowed",
  "Shallow",
  "Sharp",
  "Shimmering",
  "Shiny",
  "Shrinking",
  "Silent",
  "Silhouetted",
  "Simple",
  "Singing",
  "Sinking",
  "Sleeping",
  "Slippery",
  "Smoky",
  "Smooth",
  "Soft Focus",
  "Soft",
  "Solemn",
  "Solid",
  "Sorrowful",
  "Spacious",
  "Sparse",
  "Spectral",
  "Spiky",
  "Spiraling",
  "Spirited",
  "Spotted",
  "Static",
  "Sticky",
  "Stone",
  "Striped",
  "Submerged",
  "Surreal",
  "Swirling",
  "Symmetric",
  "Symmetrical",
  "Telescopic",
  "Textured",
  "Thick",
  "Thin",
  "Timeless",
  "Tinted",
  "Tiny",
  "Towering",
  "Toxic",
  "Traditional",
  "Tranquil",
  "Transcendent",
  "Transforming",
  "Translucent",
  "Transparent",
  "Turbulent",
  "Twisted",
  "Unbalanced",
  "Unconscious",
  "Uncontained",
  "Undead",
  "Unique",
  "Valuable",
  "Vast",
  "Vengeful",
  "Venomous",
  "Vibrant",
  "Vibrating",
  "Vignetted",
  "Villainous",
  "Vivid",
  "Volumetric",
  "Vulnerable",
  "Warm",
  "Warped",
  "Wet",
  "Whimsical",
  "Whirlwind",
  "Whispering",
  "Wooden",
  "Working",
  "Worn",
  "Worshipping",
  "Worthless",
  "Woven",
  "Wrinkled",
  "Zoological",
];

const styles = [
  // --- Digital Art & Animation Styles ---
  "Digital Art",
  "Concept Art",
  "Illustration",
  "Character Design",
  "Anime Style",
  "Manga Style",
  "Webtoon Style",
  "Cartoon Style",
  "Comic Book Art",
  "Graphic Novel Art",
  "Visual Novel Art",
  "Cel-shaded",
  "3D Render",
  "Voxel Art",
  "Low Poly",
  "Pixel Art",
  "Vector Art",
  "Flat Design",
  "Material Design",
  "Motion Graphics",
  "CGI",
  "VFX Art",
  "Abstract Digital Painting",
  "Digital Painting",
  "Speedpaint",
  "Game Art",
  "Game Concept Art",
  "Cinematic Lighting",
  "Matte Painting",

  // --- Traditional Art Mediums & Techniques ---
  "Sketch",
  "Drawing",
  "Doodle",
  "Hand-Drawn",
  "Graphite Drawing",
  "Charcoal Drawing",
  "Pencil Drawing",
  "Colored Pencil Drawing",
  "Pastel Art",
  "Chalk Drawing",
  "Ink Drawing",
  "Ink Wash Painting",
  "Pen and Ink",
  "Watercolor Painting",
  "Oil Painting",
  "Acrylic Painting",
  "Gouache Painting",
  "Tempera Painting",
  "Fresco Painting",
  "Impasto",
  "Dry Brush",
  "Wet-on-Wet Watercolor",
  "Cross-hatching",
  "Stippling",
  "Sgraffito",
  "Chiaroscuro",
  "Sfumato",
  "Frottage",
  "Grattage",
  "Decoupage",
  "Mixed Media",
  "Collage",
  "Assemblage",
  "Readymade",

  // --- Art Movements & Historical Styles ---
  "Realism",
  "Hyperrealism",
  "Photorealism",
  "Impressionism",
  "Post-Impressionism",
  "Expressionism",
  "Cubism",
  "Surrealism",
  "Dadaism",
  "Futurism",
  "Constructivism",
  "Suprematism",
  "Bauhaus",
  "Art Nouveau",
  "Art Deco",
  "Pop Art",
  "Abstract Expressionism",
  "Minimalism",
  "Op Art",
  "Renaissance Art",
  "Baroque Art",
  "Rococo Art",
  "Neoclassicism",
  "Romanticism",
  "Gothic Art",
  "Byzantine Art",
  "Symbolism",
  "Fauvism",
  "Precisionism",
  "Social Realism",
  "Postmodernism",
  "Contemporary Art",
  "Classical Art",
  "Medieval Art",
  "Mannerism",

  // --- Craft & Sculpture Styles ---
  "Sculpture",
  "Ceramic Art",
  "Pottery",
  "Glass Art",
  "Stained Glass",
  "Mosaic Art",
  "Textile Art",
  "Embroidery",
  "Tapestry",
  "Knitting",
  "Crochet",
  "Quilting",
  "Origami",
  "Kirigami",
  "Papercutting",
  "Wood-Carving",
  "Stone Carving",
  "Ice Carving",
  "Metalwork",
  "Jewelry Design",
  "Calligraphy",
  "Lettering Art",

  // --- Printmaking Styles ---
  "Woodcut Print",
  "Linocut Print",
  "Etching",
  "Engraving",
  "Lithography",
  "Screen Print",
  "Giclée Print",
  "Monoprint",
  "Relief Print",
  "Intaglio Print",

  // --- Photography Styles & Techniques ---
  "Photography",
  "Portrait Photography",
  "Landscape Photography",
  "Wildlife Photography",
  "Street Photography",
  "Documentary Photography",
  "Fashion Photography",
  "Architectural Photography",
  "Still Life Photography",
  "Macro Photography",
  "Astrophotography",
  "Abstract Photography",
  "Fine Art Photography",
  "Photojournalism",
  "HDR Photography",
  "Long Exposure",
  "Shallow Depth of Field",
  "Deep Depth of Field",
  "Bokeh Effect",
  "Lens Flare Effect",
  "Vignette Effect",
  "Film Grain Effect",
  "Tilt-Shift Photography",
  "Ultra-Wide Angle Photography",
  "Fisheye Lens Photography",
  "Panoramic Photography",
  "Monochrome Photography",
  "Infrared Photography",
  "Cinematic Photography",

  // --- Niche, Aesthetic & Genre Styles ---
  "Fantasy Art",
  "Sci-Fi Art",
  "Cyberpunk",
  "Steampunk",
  "Dieselpunk",
  "Solarpunk",
  "Atompunk",
  "Biopunk",
  "Gothic Art",
  "Dark Fantasy",
  "High Fantasy",
  "Urban Fantasy",
  "Post-Apocalyptic Art",
  "Utopian Art",
  "Dystopian Art",
  "Vaporwave",
  "Synthwave",
  "Lo-fi Aesthetic",
  "Grunge Art",
  "Punk Art",
  "Neo-Expressionism",
  "New Wave Art",
  "Abstract Art",
  "Figurative Art",
  "Glitch Art",
  "Light Art",
  "Environmental Art",
  "Installation Art",
  "Performance Art",
  "Street Art",
  "Graffiti Art",
  "Mural Art",
  "Tattoo Art",
  "Folk Art",
  "Outsider Art",
  "Naive Art",
  "Brutalist Architecture",
  "Bauhaus Style",
  "Memphis Style",
  "Art Brut",
  "Art Deco Architecture",
  "Streamline Moderne",
  "Ukiyo-e",
  "Sumo-e",
  "Shodo",
  "Grisaille",
  "En Plein Air",
  "Alla Prima",
  "Trompe L'oeil",
  "Diaphanous",
  "Whimsical Art",
  "Ethereal Art",
  "Gritty Art",
  "Gloomy Art",
  "Serene Art",
  "Dynamic Art",
  "Static Art",
  "Abstract Geometric",
  "Abstract Organic",
  "Deconstructivism",
  "Fluid Art",
  "Pour Painting",
  "Generative Art",
  "Algorithmic Art",
  "Neural Style Transfer",
  "Dreamcore",
  "Weirdcore",
  "Liminal Space",
  "Surreal Dreamscape",
  "Dark Academia",
  "Cottagecore",
  "Goblincore",
  "Whimsigoth",
  "Fairycore",
  "Spacecore",
  "Warmcore",
  "Coldcore",
  "Neo-Traditional Tattoo",
  "Blackwork Tattoo",
  "Dotwork Tattoo",
  "Watercolor Tattoo",
  "Trash Polka Tattoo",
  "Biomechanical Art",
  "Vaporwave Aesthetics",
  "Synthwave Aesthetics",
  "Lo-fi Aesthetics",
  "Glitchcore",
  "Fractal Art",
  "Psychedelic Art",
  "Op Art",
  "Hyper-Detailed",
  "Highly Rendered",
  "Rough Sketch",
  "Clean Lines",
  "Loose Style",
  "Painterly Style",
  "Graphic Style",
  "Photographic Style",
  "Cartoon Network Style",
  "Disney Animation Style",
  "Pixar Style",
  "Studio Ghibli Style",
  "Adventure Time Style",
  "Jojo's Bizarre Adventure Style",
  "Dragon Ball Style",
  "Naruto Style",
  "One Piece Style",
  "Sailor Moon Style",
  "Berserk Style",
  "Akira Style",
  "Ghost in the Shell Style",
  "Cowboy Bebop Style",
  "Evangelion Style",
];

const colors = [
  // --- Broad Color Categories & Schemes ---
  "Colorful",
  "Vibrant Colors",
  "Rainbow",
  "Spectral Colors",
  "Polychromatic Colors",
  "Monochromatic",
  "Black and White",
  "Grayscale",
  "Achromatic",
  "Duotone",
  "Triadic Colors",
  "Complementary Colors",
  "Analogous Colors",
  "Split-Complementary Colors",
  "Tetradic Colors",
  "Accent Color",
  "Color Splash",

  // --- Color Qualities & Moods ---
  "Warm Color Palette",
  "Cool Color Palette",
  "Earthy Tones",
  "Pastel Palette",
  "Muted Colors",
  "Desaturated Colors",
  "Saturated Colors",
  "Rich Colors",
  "Deep Colors",
  "Bright Colors",
  "Dull Colors",
  "Soft Colors",
  "Harsh Colors",
  "Luminous Colors",
  "Glowing Colors",
  "Iridescent",
  "Pearlescent",
  "Opalescent",
  "Transparent Colors",
  "Translucent Colors",
  "Opaque Colors",
  "High Contrast",
  "Low Contrast",
  "Dramatic Colors",
  "Subtle Colors",
  "Bold Colors",
  "Faded Colors",
  "Washed Out Colors",
  "Bleached Colors",
  "Pop Art Colors",
  "Jewel Tones",
  "Gemstone Colors",
  "Neon Colors",
  "Electric Colors",
  "Metallic Colors",
  "Matte Colors",
  "Glossy Colors",
  "Flat Colors",

  // --- Specific Color Dominance/Monochromes ---
  "Red Monochrome",
  "Green Monochrome",
  "Blue Monochrome",
  "Yellow Monochrome",
  "Purple Monochrome",
  "Orange Monochrome",
  "Pink Monochrome",
  "Brown Monochrome",
  "Cyan Monochrome",
  "Magenta Monochrome",
  "Gold Tones",
  "Silver Tones",
  "Bronze Tones",
  "Copper Tones",
  "Rust Tones",
  "Blood Red",
  "Forest Green",
  "Sky Blue",
  "Oceanic Blue",
  "Deep Sea Colors",
  "Desert Hues",
  "Volcanic Colors",
  "Lava Tones",
  "Autumnal Colors",
  "Spring Colors",
  "Winter Colors",
  "Summer Colors",

  // --- Lighting & Time-Based Palettes ---
  "Night Colors",
  "Daylight Colors",
  "Golden Hour Lighting",
  "Blue Hour Lighting",
  "Twilight Colors",
  "Dawn Colors",
  "Dusk Colors",
  "Midday Sun Colors",
  "Moonlight Colors",
  "Candlelight Glow",
  "Fire Tones",
  "Ambient Lighting Colors",
  "Dramatic Lighting Colors",
  "Volumetric Lighting Colors",

  // --- Stylistic & Thematic Color Palettes ---
  "Technicolor",
  "Sepia",
  "Vintage Colors",
  "Retro Colors",
  "Aesthetic Colors",
  "Vaporwave Colors",
  "Synthwave Colors",
  "Cyberpunk Colors",
  "Steampunk Colors",
  "Gothic Palette",
  "Baroque Colors",
  "Renaissance Palette",
  "Art Nouveau Colors",
  "Art Deco Colors",
  "Film Noir Palette",
  "Atari Graphics",
  "Pixel Art Colors",
  "Gameboy Palette",
  "CRT Colors",
  "Dark Mode",
  "Gritty Colors",
  "Dreamlike Colors",
  "Misty Colors",
  "Ethereal Colors",
  "Haunting Colors",
  "Military Colors",
  "Urban Palette",
  "Nature's Palette",
  "Industrial Colors",
  "Neon Noir",
  "Pastel Goth",
  "Color Grading",
  "Cinematic Color Grading",
  "Lo-fi Colors",
  "Psychedelic Colors",
  "Aura Colors",
  "Spectrum Gradient",
  "Chromatic Aberration Colors",
  "Vignette Colors",
  "Lens Flare Colors",
  "Bokeh Colors",
];

const artists = [
  // --- Animation Studios & Directors ---
  "Pixar Animation Studios",
  "Studio Ghibli",
  "Bryan Konietzko and Michael Dante DiMartino",
  "Alex Hirsch",
  "Genndy Tartakovsky",
  "Craig McCracken",
  "Pendleton Ward",
  "Nick Park",
  "Hayao Miyazaki",
  "Makoto Shinkai",
  "Mamoru Hosoda",
  "Ankama Games",
  "Madhouse",
  "Toei Animation",
  "Ufotable",
  "Kyoto Animation",
  "Production I.G",
  "Trigger",
  "Bones",
  "MAPPA",
  "Wit Studio",
  "Tatsunoko Production",
  "Sunrise",
  "Gainax",
  "CoMix Wave Films",
  "DreamWorks Animation",
  "Sony Pictures Animation",
  "Laika",
  "Rooster Teeth",
  "Bruce Timm",

  // --- Manga & Comic Artists ---
  "Akira Toriyama",
  "Eiichiro Oda",
  "Masashi Kishimoto",
  "Hirohiko Araki",
  "Hiromu Arakawa",
  "Naoko Takeuchi",
  "Rumiko Takahashi",
  "Tite Kubo",
  "Junji Ito",
  "Osamu Tezuka",
  "Jack Kirby",
  "Frank Miller",
  "Todd McFarlane",
  "Jim Lee",
  "Neal Adams",
  "Alex Ross",
  "Mike Mignola",
  "Ashley Wood",
  "Greg Capullo",
  "David Finch",
  "J. Scott Campbell",
  "Adam Hughes",
  "Mark Brooks",
  "Art Adams",
  "R. Crumb",
  "Moebius",
  "Geof Darrow",
  "Katsuhiro Otomo",
  "Takeshi Obata",
  "Yusuke Murata",
  "Takehiko Inoue",
  "Kentaro Miura",
  "Katsuya Terada",

  // --- Classical & Renaissance Masters ---
  "Leonardo da Vinci",
  "Michelangelo",
  "Raphael",
  "Caravaggio",
  "Rembrandt van Rijn",
  "Johannes Vermeer",
  "Sandro Botticelli",
  "Hieronymus Bosch",
  "Pieter Bruegel the Elder",
  "El Greco",
  "Peter Paul Rubens",
  "Francisco Goya",
  "J.M.W. Turner",
  "Caspar David Friedrich",
  "Eugène Delacroix",
  "Jean-Auguste-Dominique Ingres",
  "Gustave Courbet",
  "Édouard Manet",

  // --- Impressionist, Post-Impressionist & Early Modern Masters ---
  "Claude Monet",
  "Edgar Degas",
  "Auguste Rodin",
  "Paul Cézanne",
  "Pierre-Auguste Renoir",
  "Georges Seurat",
  "Vincent van Gogh",
  "Paul Gauguin",
  "Henri Rousseau",
  "Henri Matisse",
  "Pablo Picasso",
  "Gustav Klimt",
  "Egon Schiele",
  "Edvard Munch",
  "Amedeo Modigliani",
  "Frida Kahlo",
  "Diego Rivera",
  "Marc Chagall",
  "Alphonse Mucha",
  "Wassily Kandinsky",
  "Piet Mondrian",
  "Georges Braque",
  "Fernand Léger",
  "Kazimir Malevich",
  "Constantin Brâncuși",
  "Louise Bourgeois",
  "Yayoi Kusama",

  // --- Surrealism, Pop Art & Contemporary Fine Art ---
  "Salvador Dalí",
  "René Magritte",
  "M.C. Escher",
  "Jackson Pollock",
  "Andy Warhol",
  "Roy Lichtenstein",
  "Jean-Michel Basquiat",
  "Keith Haring",
  "Banksy",
  "Shepard Fairey",
  "JR",
  "Kobra",
  "Tristan Eaton",
  "Zdzislaw Beksinski",

  // --- Illustrators, Digital Artists & Concept Artists ---
  "Artgerm",
  "Greg Rutkowski",
  "Lois Van Baarle",
  "Audrey Kawasaki",
  "Anna Dittmann",
  "Hsiao-Ron Cheng",
  "Ilya Kuvshinov",
  "Ismail Inceoglu",
  "Charlie Bowater",
  "Rossdraws",
  "WLOP",
  "Guweiz",
  "Sakimichan",
  "Serge Birault",
  "Agnes Cecile",
  "Carne Griffiths",
  "Cyril Rolando",
  "Conrad Roset",
  "Tom Bagshaw",
  "Miho Hirano",
  "Marco Mazzoni",
  "Karol Bak",
  "Donato Giancola",
  "Boris Vallejo",
  "Frank Frazetta",
  "Julie Bell",
  "Simon Stålenhag",
  "Syd Mead",
  "Akihiko Yoshida",
  "Yoshitaka Amano",
  "Tetsuya Nomura",
  "JC Leyendecker",
  "Norman Rockwell",
  "Robert McGinnis",
  "John Berkey",
  "Vincent Di Fate",
  "Alan Lee",
  "John Howe",
  "Marc Simonetti",
  "Peter Mohrbacher",
  "Wayne Barlowe",
  "Sparth",
  "Ian McQue",
  "Feng Zhu",
  "Craig Mullins",
  "Jaime Jones",
  "Peter Konig",
  "Maciej Kuciara",
  "Nivanh Chanthara",
  "Kim Jung Gi",
  "Ruan Jia",
  "Karl Kopinski",
  "Krenz Cushart",
  "Liang Xing",
  "Kinu Nishimura",
  "David Mack",
  "Joshua Middleton",
  "Bill Watterson",
  "Charles Schulz",
  "Richard Corben",
  "Glenn Fabry",
  "Phil Noto",
  "Adam Hughes",
  "Arthur Adams",
  "Frank Cho",

  // --- Photography Masters ---
  "Annie Leibovitz",
  "Ansel Adams",
  "Henri Cartier-Bresson",
  "Robert Capa",
  "Dorothea Lange",
  "Gordon Parks",
  "Cindy Sherman",
  "Diane Arbus",
  "Richard Avedon",
  "Irving Penn",
  "Robert Frank",
  "Steve McCurry",
  "Sebastião Salgado",
  "Vivian Maier",
  "Yousuf Karsh",
  "Helmut Newton",
  "Man Ray",
  "Robert Doisneau",
  "Elliott Erwitt",
  "Mary Ellen Mark",
  "Jovana Rikalo",

  // --- Other Notable Artists ---
  "John Singer Sargent",
  "Mary Blair",
  "Glen Keane",
  "William Blake",
  "H.R. Giger",
];

const prefixes = [
  "abyssal",
  "acidic",
  "adventurous",
  "aerial",
  "aether",
  "aggressive",
  "alchemical",
  "alert",
  "alien",
  "ancient",
  "angelic",
  "animated",
  "anxious",
  "apocalyptic",
  "aquatic",
  "arcane",
  "arctic",
  "armored",
  "arrogant",
  "artificer",
  "artisan",
  "ascendant",
  "ashy",
  "astral",
  "avian",
  "barbarian",
  "benevolent",
  "berserker",
  "bio-engineered",
  "biological",
  "bionic",
  "bleached",
  "blessed",
  "bloody",
  "boiling",
  "bold",
  "bronze",
  "brutal",
  "burning",
  "calm",
  "carnal",
  "cave",
  "celestial",
  "champion",
  "chipped",
  "chivalrous",
  "chrono",
  "clockwork",
  "cloth",
  "coarse",
  "commander",
  "corroded",
  "corrupt",
  "cosmic",
  "cowardly",
  "cracked",
  "crude",
  "cruel",
  "crumbling",
  "crushing",
  "crystal",
  "cunning",
  "curious",
  "cursed",
  "cyber",
  "cybernetic",
  "cyborg",
  "damaged",
  "decaying",
  "deceptive",
  "demigod",
  "demonic",
  "dense",
  "dent",
  "desert",
  "desperate",
  "determined",
  "devout",
  "dieselpunk",
  "digital",
  "diligent",
  "dimensional",
  "diplomat",
  "disciple",
  "distorted",
  "divine",
  "doubtful",
  "dragon",
  "dreamer",
  "druid",
  "dull",
  "dusty",
  "dystopian",
  "elder",
  "eldritch",
  "electric",
  "elegant",
  "elemental",
  "enchanted",
  "engineer",
  "equestrian",
  "explorer",
  "fabled",
  "faded",
  "fallen",
  "fanatical",
  "fearless",
  "feathered",
  "feral",
  "fierce",
  "fiery",
  "fine",
  "foolish",
  "forest",
  "fragile",
  "frozen",
  "fur",
  "furious",
  "galactic",
  "gallant",
  "gaseous",
  "general",
  "gentle",
  "ghost",
  "giant",
  "gilded",
  "glass",
  "gleaming",
  "goblin",
  "goddess",
  "gooey",
  "gothic",
  "grim",
  "grimy",
  "grotesque",
  "guardian",
  "healer",
  "heavenly",
  "heavy",
  "heroic",
  "hexed",
  "high",
  "hollow",
  "holographic",
  "hunter",
  "icy",
  "illusionist",
  "immortal",
  "impatient",
  "imperial",
  "industrial",
  "infernal",
  "innocent",
  "inventor",
  "invisible",
  "iron",
  "jungle",
  "knight",
  "lake",
  "leader",
  "leather",
  "light",
  "liquid",
  "lonely",
  "low",
  "loyal",
  "luminous",
  "lunar",
  "magitech",
  "majestic",
  "malevolent",
  "martial",
  "mechanical",
  "meditative",
  "meek",
  "melted",
  "mercenary",
  "miraculous",
  "mirrored",
  "mischievous",
  "monk",
  "monochrome",
  "monstrous",
  "mortal",
  "mountain",
  "muddy",
  "mundane",
  "mutated",
  "mystic",
  "mythic",
  "naive",
  "necromancer",
  "neon",
  "ninja",
  "noble",
  "noisy",
  "nomadic",
  "oceanic",
  "opaque",
  "ornamental",
  "outlaw",
  "patient",
  "peaceful",
  "performer",
  "pilgrim",
  "pirate",
  "playful",
  "poisonous",
  "polished",
  "pondering",
  "priest",
  "primordial",
  "prismatic",
  "pristine",
  "prophet",
  "protector",
  "psionic",
  "pulsating",
  "pure",
  "quantum",
  "radiant",
  "rebel",
  "reclusive",
  "refined",
  "reflective",
  "relentless",
  "revenant",
  "river",
  "robot",
  "rogue",
  "rough",
  "royal",
  "ruined",
  "rune",
  "rural",
  "rusty",
  "ruthless",
  "sage",
  "samurai",
  "sandy",
  "savage",
  "scabby",
  "scaled",
  "scarred",
  "scholar",
  "scout",
  "seeker",
  "sentinel",
  "serious",
  "serpentine",
  "shadow",
  "shaman",
  "sharp",
  "shattered",
  "shimmering",
  "sigil",
  "silent",
  "silk",
  "silvered",
  "slayer",
  "slimy",
  "smokey",
  "smooth",
  "smuggler",
  "sniper",
  "solar",
  "solarpunk",
  "soldier",
  "solid",
  "solitary",
  "sooty",
  "sorceress",
  "space",
  "spectral",
  "spiky",
  "stalker",
  "steam-powered",
  "steaming",
  "steampunk",
  "steel",
  "stellar",
  "stone",
  "strategist",
  "subterranean",
  "summoner",
  "superhero",
  "supernatural",
  "survivor",
  "swamp",
  "swordsman",
  "synthetic",
  "tactical",
  "tainted",
  "tamer",
  "tangled",
  "tarnished",
  "technomancer",
  "temporal",
  "textured",
  "thief",
  "time-traveler",
  "tiny",
  "tormented",
  "translucent",
  "tribal",
  "tropical",
  "twisted",
  "unblemished",
  "unbound",
  "undead",
  "unholy",
  "unstable",
  "urban",
  "utopian",
  "vampire",
  "velvet",
  "vengeful",
  "venomous",
  "veteran",
  "vibrant",
  "vigilant",
  "vigilante",
  "village",
  "villainous",
  "vintage",
  "viscous",
  "volcanic",
  "warped",
  "warrior",
  "wasteland",
  "werewolf",
  "wise",
  "witch",
  "wizard",
  "wooden",
  "worn",
  "wounded",
  "zealous",
  "zombie",
];

const suffixes = [
  "aiming",
  "bending",
  "blocking",
  "blushing",
  "bowing",
  "breaking",
  "building",
  "carrying",
  "catching",
  "cheering",
  "cleaning",
  "climbing",
  "closing",
  "cooking",
  "coughing",
  "cracking",
  "crawling",
  "crushing",
  "crying",
  "dancing",
  "dodging",
  "dragging",
  "drawing",
  "dressing",
  "driving",
  "eating",
  "fighting",
  "floating",
  "flying",
  "folding",
  "freezing",
  "frowning",
  "gasping",
  "gazing",
  "gesturing",
  "glaring",
  "gripping",
  "grooming",
  "hitting",
  "holding",
  "hopping",
  "hugging",
  "jumping",
  "kicking",
  "kissing",
  "kneeling",
  "laughing",
  "leaning",
  "lifting",
  "listening",
  "looking",
  "marching",
  "meditating",
  "melting",
  "nodding",
  "opening",
  "painting",
  "peeking",
  "playing",
  "pointing",
  "posing",
  "pouring",
  "pouting",
  "praying",
  "pressing",
  "pulling",
  "punching",
  "pushing",
  "reaching",
  "reading",
  "reloading",
  "repairing",
  "riding",
  "rolling",
  "running",
  "saluting",
  "scrubbing",
  "shaking",
  "shielding",
  "shivering",
  "shooting",
  "shouting",
  "sighing",
  "singing",
  "sinking",
  "sitting",
  "skipping",
  "sleeping",
  "smiling",
  "sneaking",
  "sneezing",
  "sniffing",
  "soaring",
  "spinning",
  "spitting",
  "standing",
  "staring",
  "stirring",
  "stretching",
  "studying",
  "sweating",
  "swimming",
  "talking",
  "texting",
  "throwing",
  "tiptoeing",
  "transforming",
  "trembling",
  "turning",
  "twirling",
  "twisting",
  "typing",
  "undressing",
  "unfolding",
  "waiting",
  "walking",
  "watching",
  "waving",
  "weeping",
  "whispering",
  "winking",
  "wiping",
  "working",
  "writing",
  "yawning",
];

const improvers = [
  // --- Core Quality & Excellence ---
  "masterpiece",
  "award-winning",
  "museum-quality",
  "gallery-worthy",
  "critically acclaimed",
  "groundbreaking",
  "innovative",
  "cutting-edge",
  "professional photography",
  "high quality",
  "top quality",
  "ultimate quality",
  "premium quality",
  "peak perfection",
  "flawless",
  "unblemished",
  "perfect",
  "epic",
  "legendary",
  "iconic",
  "definitive",
  "unrivaled",
  "unparalleled",
  "magnificent",
  "sublime",
  "majestic",
  "divine",

  // --- Realism & Detail ---
  "hyper-realistic",
  "photorealistic",
  "ultra-realistic",
  "super-realistic",
  "realistic rendering",
  "highly detailed",
  "intricate and detailed",
  "meticulous detail",
  "microscopic detail",
  "fine detail",
  "crisp and clear",
  "sharp focus",
  "high definition",
  "ultra HD",
  "4K",
  "8K",
  "16K",
  "textured",
  "richly textured",
  "complex",
  "elaborate",
  "ornate",
  "precision artwork",

  // --- Style & Aesthetic ---
  "ethereal beauty",
  "surreal masterpiece",
  "dreamlike",
  "mystical",
  "magical",
  "whimsical",
  "fantastical",
  "psychedelic",
  "abstract expressionism",
  "impressionistic",
  "expressionistic",
  "cubist influence",
  "art nouveau",
  "art deco",
  "cyberpunk aesthetic",
  "steampunk style",
  "gothic architecture",
  "baroque opulence",
  "rococo elegance",
  "minimalist design",
  "maximalist composition",
  "illustrative style",
  "comic book art",
  "anime style",
  "manga art",
  "pixel art",
  "low poly",
  "cartoonish charm",
  "cinematic feel",
  "film noir",
  "vintage aesthetic",
  "retro look",
  "futuristic vision",

  // --- Mood & Emotion ---
  "jaw-dropping",
  "awe-inspiring",
  "breathtaking",
  "stunning",
  "gorgeous",
  "beautiful",
  "elegant",
  "graceful",
  "delicate",
  "captivating",
  "mesmerizing",
  "enchanting",
  "serene",
  "tranquil",
  "peaceful",
  "calm",
  "dramatic lighting",
  "intense emotion",
  "evocative",
  "thought-provoking",
  "haunting atmosphere",
  "melancholic mood",
  "joyful",
  "uplifting",
  "powerful presence",
  "dynamic composition",
  "energetic",
  "vibrant energy",

  // --- Color & Lighting ---
  "colorful and vibrant",
  "rich colors",
  "deep colors",
  "saturated colors",
  "desaturated tones",
  "monochromatic palette",
  "duotone effect",
  "pastel shades",
  "neon glow",
  "luminous effects",
  "glowing",
  "iridescent sheen",
  "pearlescent finish",
  "chromatic aberration",
  "volumetric lighting",
  "god rays",
  "rim light",
  "backlighting",
  "soft lighting",
  "harsh lighting",
  "cinematic lighting",
  "natural lighting",
  "ambient lighting",
  "studio lighting",
  "dappled light",
  "sun-kissed",
  "golden hour",
  "blue hour",
  "twilight glow",
  "chiaroscuro",
  "contre-jour",

  // --- Composition & Perspective ---
  "rule of thirds",
  "golden ratio composition",
  "leading lines",
  "negative space",
  "balanced composition",
  "symmetrical",
  "asymmetrical",
  "wide angle",
  "telephoto lens",
  "fisheye perspective",
  "macro photography",
  "bokeh background",
  "depth of field",
  "shallow depth of field",
  "tilt-shift",
  "dynamic angle",
  "low angle",
  "high angle",
  "eye-level shot",

  // --- Technical & Post-processing ---
  "digital painting",
  "oil painting style",
  "watercolor effect",
  "acrylic art",
  "pastel drawing",
  "charcoal sketch",
  "pencil illustration",
  "ink wash",
  "mixed media",
  "3D render",
  "CGI masterpiece",
  "VFX breakdown",
  "concept art",
  "matte painting",
  "speedpaint",
  "visible brush strokes",
  "impasto texture",
  "bloom effect",
  "lens flare",
  "film grain",
  "vignette effect",
  "reflections",
  "refractions",
  "specular highlights",
  "subsurface scattering",
  "ambient occlusion",
  "global illumination",
  "ray tracing",
  "path tracing",
  "noise reduction",
  "color grading",
  "post-processing perfection",

  // --- Trending & Popularity ---
  "trending on artstation",
  "trending on deviantart",
  "popular on pixiv",
  "featured on cgsociety",
  "behance showcase",
  "zbrush central top row",
  "reddit popular",
  "viral sensation",
  "widely shared",
  "highly acclaimed",
  "community favorite",
  "editor's choice",
  "curated pick",
];

promptGenerator.addPreviousUserInputs();

// generate 10 random prompts
promptGenerator.generatePrompts(10);
