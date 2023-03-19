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
    this.subjectsInputDiv = document.querySelector("#subjectsInputDiv");
    this.shownOptions = 0;
    this.currentGenerator = "random";
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

    if (isStylePrompt) {
      prompt += `${this.randomElement(styles)} `;
    } else {
      prompt += `${this.randomElement(artists)} style `;
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

    // if (isStylePrompt) {
    //   prompt += `${this.randomElement(styles)} portrait of`;
    // } else {
    //   prompt += `${this.randomElement(artists)} art portrait of`;
    // }

    if (!isLandscapesPrompt) {
    if (isObjectPrompt) {
      mainSubject = this.randomElement(objects);
        prompt += ` ${mainSubject},`;
    } else {
      mainSubject = this.randomElement(characters);
      if (Math.random() < 0.25) {
          prompt += ` ${mainSubject} with ${this.randomElement(objects)},`;
      } else {
          prompt += ` ${mainSubject},`;
      }
    }

    // adds a random element
    if (Math.random() < 0.5) {
        prompt += ` of ${this.randomElement(elements)},`;
      }
    }

    // adds a place
    if (isLandscapesPrompt) {
      prompt += ` ${this.randomElement(locations)},`;
    } else if (Math.random() < 0.66) {
      prompt += ` ${this.randomElement(locations)},`;
    }

    // adds random adjectives
    prompt += ` ${this.randomElement(adjectives)}, ${this.randomElement(adjectives)}, masterpiece, trending on ArtStation`;

    // adds a random color palette
    if (Math.random() < 0.25) {
      prompt += `, ${this.randomElement(colours)}`;
    }

    this.currentPrompts.push(prompt);
  }

  generatePrompts(num) {
    this.currentPrompts = [];
    this.promptsDiv.innerHTML = "";
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
    this.subjectsInputDiv.classList.remove("hidden");
    if (this.currentGenerator === "portrait") {
      this.portraitDiv.classList.remove("hidden");
    } else if (this.currentGenerator === "landscapes") {
      this.landscapesDiv.classList.remove("hidden");
      this.subjectsInputDiv.classList.add("hidden");
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
  "Phoenix",
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
  "Troll",
  "Yeti",
  "Changeling",
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
  "Zealot",
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
  "Gorgon",
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
  "Valkyrie",
  "Witch",
  "Yeti",
  "Yuan-Ti",
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
  "Guitar",
  "Microphone",
  "Camera",
  "Typewriter",
  "Key",
  "Lock",
  "Lamp",
  "Magnifying Glass",
  "Candelabra",
  "Map",
  "Globe",
  "Binoculars",
  "Pocket Watch",
  "Flute",
  "Trumpet",
  "Violin",
  "Tambourine",
  "Harmonica",
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
  "Grenade",
  "Smoke Bomb",
  "Flashbang",
  "Bolas",
  "Sling",
  "Blowgun",
  "Harpoon",
  "Handcuffs",
  "Binoculars",
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
  "Pistol",
  "Shotgun",
  "Rifle",
  "Machine Gun",
  "Rocket Launcher",
  "Gatling Gun",
  "Flamethrower",
  "Grenade Launcher",
  "Sniper Rifle",
  "Revolver",
  "Uzi",
  "Laser Gun",
  "Plasma Rifle",
  "Monster Egg",
];

const locations = [
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
  "Thundering Waterfall",
  "Ancient Catacombs",
  "Holographic Theme Park",
  "Crystal Lake",
  "Floating Market",
  "Underground Volcano",
  "Abandoned Space Station",
  "Lost Wilderness",
  "Surreal Landscape",
  "Crystal Tower",
  "Mystical Island",
  "Mysterious Labyrinth",
  "Jungle Canopy",
  "Enchanted Marketplace",
  "Sunken Cityscape",
  "Haunted Forest",
  "Space Elevator",
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
  "Pokémon",
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
  "Golden Hour Shot",
  "Wildlife Photography",
  "Portrait",
  "Microscopic",
  "Ultra-Wide Angle",
  "Depth of Field",
  "Closeup",
  "Blur Effect",
  "Lens Flare",
];

const colours = [
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

// generate 10 random prompts
promptGenerator.generatePrompts(10);
