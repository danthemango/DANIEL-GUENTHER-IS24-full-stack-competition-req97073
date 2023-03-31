// generate a list of 40 products
// pipe to file with `node generateProducts.js > products_static.json`

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

const productNameParts = [
    "Aero", "Alloy", "Antique", "Aquamarine", "Aurora", "Baby", "Barn", "Bear", "Bitter",
    "Blue", "Booger", "Bulls", "Celestial", "Chasers", "Chicago", "Cinestatic", "Cobalt", "Coconut",
    "Code", "Coding", "Coffee", "Cold", "Colossus", "Comic", "Conference", "Coral", "Corn",
    "Corral", "Cream", "Dalmatian", "Dandelion", "Dental", "Diligence", "Discovery", "Elk", "Enter",
    "Era", "Experiment", "Explorer", "Foraging", "Frisky", "Fusion", "Geek", "Geeklords", "Gob",
    "Golden", "Gray", "Grey", "Honeycomb", "Honors", "Huron", "Impact", "Imprinted", "Interface",
    "Jungle", "Kidney", "Laser", "Lemon", "Lilac", "Magic", "Maroon", "Mercury", "Miller",
    "Mirage", "Monte", "Mustangs", "Network", "Newfoundland", "O'Clock", "Olive", "Orchid", "Panthers",
    "Petunia", "Porridge", "Powders", "Premier", "Prime", "Production", "Pure", "Quicksilver", "Rattle",
    "Rex", "Rogers", "RuddyRex", "Salmon", "Seven", "Severe", "Social", "Software", "State",
    "Terrier", "The", "Training", "Tree", "Uranium", "Violet", "White", "WhiteJacks", "Wonders", "Yeast"
]

/** returns a random integer from min to max */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** returns random item in arr */
function getRandomFromArr(arr) {
  return arr[getRandomInt(0, arr.length-1)];
}

function getRandomPersonName() {
    const firstName = getRandomFromArr(firstNames);
    const lastName = getRandomFromArr(lastNames);
    const name = `${firstName} ${lastName}`;
    return name;
}

/** generates a random project name */
function getRandomProductName() {
    const numParts = getRandomInt(1, 3);
    let name = '';
    let version = 1;

    if(Math.random() < .05) {
        name += 'The '
    } else if(Math.random() < .02) {
        name += 'First '
    } else {
        while(Math.random() < 0.1) {
            version++;
        }
    }

    for(let i = 0; i < numParts; i++) {
        name += getRandomFromArr(productNameParts) + ' ';
        if(Math.random() < .01) {
            name += 'of '
        }
    }

    if(Math.random() < .2) {
        name += `${version}`;
    }
    return name.trim();
}

// turns int into 2 digit string
function padNum(val) {
    return val.toString().padStart(2, '0');
}

/** returns a date that is within the start and end date objects */
function getRandomDate(start, end) {
    const thedate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const dateString = `${thedate.getFullYear()}/${padNum(thedate.getMonth()+1)}/${padNum(thedate.getDate())}`;
    return dateString;
}

function getRandomMethodology() {
    return Math.random() > .5 ? "Agile" : "Waterfall";
}

function getRandomID() {
    return Math.random().toString(36).substring(2, 9);
}

function getRandomProduct() {
    // up to 5 Developers
    const numDevelopers = getRandomInt(1,5);
    const Developers = new Array(numDevelopers).fill().map(() => getRandomPersonName())
    const product = {
        productId: getRandomID(),
        productName: getRandomProductName(),
        productOwnerName: getRandomPersonName(),
        Developers: Developers,
        scrumMasterName: getRandomPersonName(),
        startDate: getRandomDate(new Date(2012, 0, 1), new Date()),
        methodology: getRandomMethodology(),
    }
    return product;
}

/** get an array of products of size num */
function getProductArr(num) {
    return new Array(num).fill().map(() => getRandomProduct());
}


console.log(JSON.stringify(getProductArr(40), null, 4));
