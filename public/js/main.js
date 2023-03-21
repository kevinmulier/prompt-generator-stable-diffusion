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
  }

  generatePrompt() {
    const isObjectPrompt = Math.random() < 0.1; // determine if the prompt will be for an object or a character
    const isStylePrompt = Math.random() < 0.75;
    const isPortraitPrompt = this.currentGenerator === "portrait";
    const selectedPortraitShot = document.querySelector("#portraitShotSelect").value;
    const portraitShotOptions = ["Full-Length Shot", "American Shot", "Medium Shot", "Close-Up Shot", "Extreme Close-Up Shot"];
    const randomizedPortraitShot = portraitShotOptions[Math.floor(Math.random() * portraitShotOptions.length)];
    const isLandscapesPrompt = this.currentGenerator === "landscapes";
    const selectedLandscapesShot = document.querySelector("#landscapesShotSelect").value;
    const landscapesShotOptions = ["Long Shot", "Medium Shot", "Close-Up Shot", "Extreme Close-Up Shot"];
    const randomizedLandscapesShot = landscapesShotOptions[Math.floor(Math.random() * landscapesShotOptions.length)];

    let prompt = "";
    let mainSubject = "";

    if (this.currentArtists[0] !== artists[0] && this.currentStyles[0] !== styles[0]) {
      prompt += `${this.randomElement(this.currentStyles)} in ${this.randomElement(this.currentArtists)} style `;
    } else if (this.currentArtists[0] !== artists[0]) {
      prompt += `${this.randomElement(this.currentArtists)} style `;
    } else if (this.currentStyles[0] !== styles[0] || isStylePrompt) {
      prompt += `${this.randomElement(this.currentStyles)} `;
    } else {
      prompt += `${this.randomElement(this.currentArtists)} style `;
    }

    if (isPortraitPrompt) {
      if (selectedPortraitShot !== "Random Shot") {
        prompt += selectedPortraitShot + " ";
      } else {
        prompt += Math.random() < 0.33 ? " " : `${randomizedPortraitShot} `;
      }
    } else if (isLandscapesPrompt) {
      if (selectedLandscapesShot !== "Random Shot") {
        prompt += selectedLandscapesShot + " ";
      } else {
        prompt += Math.random() < 0.33 ? " " : `${randomizedLandscapesShot} `;
      }
    } else {
      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) {
          prompt += `${randomizedLandscapesShot} `;
        } else {
          prompt += `${randomizedPortraitShot} `;
        }
      }
    }

    prompt += "of";

    // IDEA: ADD PREFIXES LIKE "ZOMBIE" BEFORE CHARACTERS

    if (!isLandscapesPrompt) {
      if (isObjectPrompt) {
        mainSubject = this.randomElement(this.currentObjects);
        prompt += ` ${mainSubject}`;
      } else {
        mainSubject = this.randomElement(this.currentCharacters);
        if (Math.random() < 0.25 || this.currentObjects[0] !== objects[0]) {
          prompt += ` ${mainSubject} with ${this.randomElement(this.currentObjects)}`;
        } else {
          prompt += ` ${mainSubject}`;
        }
      }

      // adds a random element
      if (Math.random() < 0.5) {
        prompt += ` of ${this.randomElement(elements)}`;
      }
    }

    // adds a place
    if (isLandscapesPrompt) {
      prompt += ` ${this.randomElement(this.currentPlaces)}`;
    } else if (Math.random() < 0.66 || this.currentPlaces[0] !== places[0]) {
      prompt += `, ${this.randomElement(this.currentPlaces)}`;
    }

    // adds random adjectives
    prompt += `, ${this.randomElement(adjectives)}, ${this.randomElement(adjectives)}, masterpiece, trending on ArtStation`;

    // adds a random color palette
    if (Math.random() < 0.25 || this.currentColors[0] !== colors[0]) {
      prompt += `, ${this.randomElement(this.currentColors)}`;
    }

    this.currentPrompts.push(prompt);
  }

  generatePrompts(num) {
    this.currentPrompts = [];
    this.promptsDiv.innerHTML = "";

    // replace the arrays with the user inputs, and if user inputs are empty, they are replaced with default arrays
    this.replaceArraysWithUserInputs.bind(this);
    this.replaceArraysWithUserInputs();

    for (let i = 0; i < num; i++) {
      this.generatePrompt();
    }
    // create a temporary document fragment that receives all the new prompts lines
    const tempDocumentFragment = document.createDocumentFragment();
    for (let i = 0; i < this.currentPrompts.length; i++) {
      const newPromptLine = document.createElement("p");
      newPromptLine.classList.add("py-3");
      newPromptLine.textContent = `${this.currentPrompts[i]}`;
      tempDocumentFragment.appendChild(newPromptLine);
    }
    // apprend the temporary document fragment to the promptsDiv element in a single operation -> enhance performance
    this.promptsDiv.appendChild(tempDocumentFragment);
  }

  showChosenGenerator() {
    this.portraitDiv.classList.add("hidden");
    this.landscapesDiv.classList.add("hidden");
    this.randomDiv.classList.add("hidden");
    this.charactersInputDiv.classList.remove("hidden");
    this.objectsInputDiv.classList.remove("hidden");
    if (this.currentGenerator === "portrait") {
      this.portraitDiv.classList.remove("hidden");
    } else if (this.currentGenerator === "landscapes") {
      this.landscapesDiv.classList.remove("hidden");
      this.charactersInputDiv.classList.add("hidden");
      this.objectsInputDiv.classList.add("hidden");
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

  // Check if user has put inputs, and then assign them to their respective arrays
  replaceArraysWithUserInputs() {
    const charactersInput = document.querySelector("#charactersTextArea");
    const objectsInput = document.querySelector("#objectsTextArea");
    const placesInput = document.querySelector("#placesTextArea");
    const artistsInput = document.querySelector("#artistsTextArea");
    const stylesInput = document.querySelector("#stylesTextArea");
    const colorsInput = document.querySelector("#colorsTextArea");

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
  }

  addPreviousUserInputs() {
    const charactersInput = document.querySelector("#charactersTextArea");
    const objectsInput = document.querySelector("#objectsTextArea");
    const placesInput = document.querySelector("#placesTextArea");
    const artistsInput = document.querySelector("#artistsTextArea");
    const stylesInput = document.querySelector("#stylesTextArea");
    const colorsInput = document.querySelector("#colorsTextArea");

    charactersInput.value = localStorage.getItem("characters");
    objectsInput.value = localStorage.getItem("objects", "");
    placesInput.value = localStorage.getItem("places", "");
    artistsInput.value = localStorage.getItem("artists", "");
    stylesInput.value = localStorage.getItem("styles", "");
    colorsInput.value = localStorage.getItem("colors", "");
  }

  resetUserInputs() {
    const charactersInput = document.querySelector("#charactersTextArea");
    const objectsInput = document.querySelector("#objectsTextArea");
    const placesInput = document.querySelector("#placesTextArea");
    const artistsInput = document.querySelector("#artistsTextArea");
    const stylesInput = document.querySelector("#stylesTextArea");
    const colorsInput = document.querySelector("#colorsTextArea");

    localStorage.setItem("characters", "");
    localStorage.setItem("objects", "");
    localStorage.setItem("places", "");
    localStorage.setItem("artists", "");
    localStorage.setItem("styles", "");
    localStorage.setItem("colors", "");

    charactersInput.value = localStorage.getItem("characters");
    objectsInput.value = localStorage.getItem("objects", "");
    placesInput.value = localStorage.getItem("places", "");
    artistsInput.value = localStorage.getItem("artists", "");
    stylesInput.value = localStorage.getItem("styles", "");
    colorsInput.value = localStorage.getItem("colors", "");
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
  "Zodiac Master",
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
  "Tome",
  "Locket",
  "Hourglass",
  "Compass",
  "Telescope",
  "Key",
  "Lock",
  "Lamp",
  "Magnifying Glass",
  "Candelabra",
  "Map",
  "Globe",
  "Binoculars",
  "Pocket Watch",
  "Spear",
  "Dagger",
  "Bow and Arrow",
  "Shield",
  "Mace",
  "Hammer",
  "Axe",
  "Crossbow",
  "Slingshot",
  "Boomerang",
  "Trident",
  "Net",
  "Grappling Hook",
  "Whip",
  "Bolas",
  "Sling",
  "Blowgun",
  "Harpoon",
  "Handcuffs",
  "Perfume",
  "Poison",
  "Dynamite",
  "Chainsaw",
  "Grappling Gun",
  "Katana",
  "Rapier",
  "Nunchucks",
  "Kusarigama",
  "Glaive",
  "Shuriken",
  "Throwing Knives",
  "Brass Knuckles",
  "Monster Egg",
  "Sniper Riffle",
  "Gun",
  "Riffle",
  "Rocket Launcher",
  "Shotgun",
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
];

promptGenerator.addPreviousUserInputs();

// generate 10 random prompts
promptGenerator.generatePrompts(10);
