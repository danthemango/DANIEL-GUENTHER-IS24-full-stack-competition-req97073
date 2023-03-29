import { localStorageManager } from "@chakra-ui/react";

const firstNames = [
    "Adam", "Aayan", "Abdul", "Abu", "Aiden", "Alina", "Alysha", "Amanda", "Amber", "Aron",
    "Aryan", "Asiya", "Austin", "Ben", "Bertha", "Bono", "Caleb", "Cara", "Caspar", "Cassie",
    "Colin", "Cora", "Curtis", "Dawid", "Dawson", "Deanna", "Edna", "Eleni", "Eloise", "Elvis",
    "Eric", "Esmee", "Evie", "Fabio", "Faith", "Faiza", "Fern", "Francis", "Frank", "Franklyn",
    "Gareth", "Gemma", "George", "Georgina", "Gladys", "Gregory", "Imran", "Inayah", "Iris", "Issac",
    "Ivy", "Jacqueline", "Jakub", "James", "Jan", "Jaya", "Jermaine", "Jerry", "Johnny", "Jorja",
    "Josef", "Joyce", "Kaden", "Kaitlyn", "Kajus", "Kane'Gallagher", "Kareem", "Kayla", "Keaton", "Kenneth",
    "Kirsten", "Leia", "Leonardo", "Lia", "LillRose Powell", "Livia", "Lori", "Lottie", "Marley", "Maxwell",
    "Melisa", "Melvin", "Michael", "Morgan", "Moshe", "Nathaniel", "Oliwier", "Ophelia", "Phil", "Phillip",
    "Rachael", "Rafferty'Moore", "Rahul", "Rehan", "Remi", "Rico", "Roger", "Rogers", "Ronnie", "Rosie",
    "Rueben", "Safwan", "Sahar", "Saira'Reilly", "Sonny", "Sophia", "Stuart", "Tariq", "Taya", "Ted",
    "Wendy", "William", "Yusra"
]

const lastNames = [
        "Archer", "Arias", "Avila", "Baird", "Baker", "Baldwin", "Ballard", "Barber",
        "Bauer", "Bonilla", "Bowman", "Bradshaw", "Brock", "Bryant", "Cabrera", "Castro",
        "Constanca", "Cooper", "Cranicas", "Dale", "Dasiborg", "Daugherty", "Dejesus", "Dickerson",
        "Dorsey", "Espen", "Espinoza", "Faulkner", "Ford", "Fowler", "Franklyn", "Gallagher",
        "Garrison", "Gilbert", "Grant", "Gross", "Gunter", "Harvey", "Hayes", "Higgins",
        "Hodge", "Holder", "Holmes", "House", "Huffman", "Johnson", "Lam", "Lane",
        "Lindsay", "Lloyd", "Lyons", "Macias", "Makeron", "Marks", "Martin", "Mason",
        "Masters", "Mccoy", "Mcintyre", "Mckinney", "Molina", "Moore", "Moran", "Morgan",
        "Mullins", "Newton", "Norris", "Nunez", "Odonnell", "Olson", "Oneal",
        "Orr", "Owen", "Parker", "Pearce", "Petersen", "Pierce", "Pilipinos", "Powers",
        "Presley", "Pruitt", "Reid", "Rice", "Robertson", "Rogers", "Rosales", "Routan",
        "Sanders", "Sawyer", "Shepherd", "Sims", "Skinner", "Sloan", "Snow", "Steele",
        "Stevenson", "Stokes", "Stuart", "Tematico", "Thornton", "Todd", "Tyler", "Walsh",
        "Walter", "Walton", "Wang", "Warner", "White", "Winter", "Wolf"
]


const productNames = [
  "Aurora",
  "Bitter Laser",
  "Celestial Interface",
  "Code Honors",
  "Cold Fusion",
  "Colossus",
  "Comic Maroon",
  "Discovery Of Era",
  "Enter Coding",
  "Gob Geeklords",
  "Golden Bulls",
  "Gray Panthers",
  "Honeycomb",
  "Impact Training",
  "Monte Mirage",
  "Mustangs",
  "Prime Seven",
  "Pure Uranium",
  "Quicksilver",
  "RuddyRex",
  "Severe",
  "Social Experiment",
  "Software Chasers",
  "The Network",
  "WhiteJacks",
  "Wonders Of Geek",
  "Maroon Mercury",
  "Olive Dalmatian",
  "Rattle Rex",
  "Corral Huron",
  "Petunia Chicago",
  "Magic Powders",
  "Frisky Explorer",
  "Rogers Diligence",
  "Imprinted Yeast",
  "Coffee Porridge",
  "Kidney O'Clock",
  "Dental Foraging Production",
  "The Cinestatic State",
  "Premier Conference",
]

function getRandomInt(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRandomName(arr) {
  return arr[getRandomInt(0, arr.length)]
}

function getRandomUserName() {
    const firstName = getRandomName(firstNames);
    const lastName = getRandomName(lastNames);
    return `${firstName} ${lastName}`;
}

// turns int into 2 digit string
function padNum(val) {
    return val.toString().padStart(2, '0');
}

function getRandomDate(start, end) {
    console.log(start)
    const thedate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const dateString = `${thedate.getFullYear()}/${padNum(thedate.getMonth()+1)}/${padNum(thedate.getDate())}`;
    return dateString;
}

function getRandomMethodology() {
    return Math.random() > .5 ? "Agile" : "Waterfall";
}

function getRandomProduct() {
    const product = {
        productId: "5",
        productName: "Del Elophanto",
        productOwnerName: getRandomUserName(),
        developers: [],
        scrumMasterName: getRandomUserName(),
        startDate: getRandomDate(new Date(2012, 0, 1), new Date()),
        methodology: getRandomMethodology(),
    }
    return product;
}

console.log(getRandomProduct())

// users.forEach(user => user.id = Math.random().toString(36).substring(2, 9));