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

// function to choose a random element from an array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// function to generate a random prompt
function generatePrompt() {
  const isObjectPrompt = Math.random() < 0.2; // determine if the prompt will be for an object or a character
  const isStylePrompt = Math.random() < 0.75;

  let prompt = "";
  let mainSubject = "";

  if (isStylePrompt) {
    prompt += `${randomElement(styles)} of`;
  } else {
    prompt += `${randomElement(artists)} art of`;
  }

  // IDEA: ADD PREFIXES LIKE "ZOMBIE" BEFORE CHARACTERS

  // For portraits
  // if (isStylePrompt) {
  //   prompt += `${randomElement(styles)} portrait of`;
  // } else {
  //   prompt += `${randomElement(artists)} art portrait of`;
  // }

  if (isObjectPrompt) {
    mainSubject = randomElement(objects);
    prompt += ` ${mainSubject} in ${randomElement(locations)}`;
  } else {
    mainSubject = randomElement(characters);
    prompt += ` ${mainSubject} in ${randomElement(locations)}`;
  }

  // adds a random element
  if (Math.random() < 0.5) {
    prompt += ` of ${randomElement(elements)}`;
  }

  // adds random adjectives
  prompt += `, ${randomElement(adjectives)}, ${randomElement(adjectives)}, masterpiece, trending on ArtStation`;

  // adds a random color palette
  if (Math.random() < 0.25) {
    prompt += `, ${randomElement(colours)}`;
  }

  return prompt;
}

let currentPrompts = [];

// function to generate multiple random prompts
function generatePrompts(num) {
  currentPrompts = [];
  document.querySelector("#prompts").innerHTML = "";
  for (let i = 0; i < num; i++) {
    currentPrompts.push(generatePrompt());
  }
  for (let prompt of currentPrompts) {
    const newPromptLine = document.createElement("p");
    newPromptLine.classList.add("py-3");
    newPromptLine.textContent = `${prompt}`;
    document.querySelector("#prompts").appendChild(newPromptLine);
  }
}

generatePrompts(10); // generate 10 random prompts

// function to copy to clipboard and keep multiple lines
function copyPromptsToClipboard(promptsArray) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = promptsArray.join("\n");
  navigator.clipboard.writeText(textArea.innerHTML);
}

document.querySelector("#promptsCopyButton").addEventListener("click", (event) => {
  copyPromptsToClipboard(currentPrompts);
});

// Event listener to generate prompts when pressing generate
document.querySelector("#generatePromptsButton").addEventListener("click", (event) => {
  const promptsNumber = document.querySelector("#promptsNumberInput").value;
  if (!isNaN(promptsNumber) && promptsNumber > 0 && promptsNumber <= 10000) {
    generatePrompts(promptsNumber);
  } else {
    alert("Please enter a number of prompts to generate between 1 and 10000.");
  }
});

// retrieve the hamburger button and the mobile menu
const hamburgerButton = document.getElementById("hamburgerButton");
const bgMobileMenu = document.getElementById("bgMobileMenu");
const menuList = document.getElementById("menuList");

// flag to track whether the menu is open or closed
let isMenuOpen = false;

// add an event listener for the click on the hamburger button
hamburgerButton.addEventListener("click", () => {
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
});

// add an event listener for the click anywhere except on the button
document.addEventListener("click", (event) => {
  const isClickOnButton = hamburgerButton.contains(event.target); // check if the clicked element is on the hamburger button

  if (!isClickOnButton) {
    menuList.classList.add("hidden"); // add the "hidden" class to hide the menu
    bgMobileMenu.classList.add("hidden"); // hide the background filter
    isMenuOpen = false; // set the flag to false
    document.body.style.overflowY = "visible";
  }
});

// add an event listener for the focusin event
document.addEventListener("focusin", (event) => {
  // if the menu is open and the focused element is not a child of the menuList, focus back to the hamburgerButton
  if (isMenuOpen && !menuList.contains(event.target)) {
    event.stopImmediatePropagation();
    hamburgerButton.focus();
  }
});
