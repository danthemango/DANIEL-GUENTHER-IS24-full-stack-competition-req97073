import fakeNetwork from "./fakenetwork";
import localforage from "localforage";
import sortBy from "sort-by";

const users = [
  { name: "Johnny Rogers" },
  { name: "William Masters" },
  { name: "Phil Cranicas" },
  { name: "Eric Dasiborg" },
  { name: "Frank Tematico" },
  { name: "Elvis Presley" },
  { name: "George Constanca" },
  { name: "Franklyn Pilipinos" },
  { name: "Rogers Makeron" },
  { name: "Georgina Franklyn" },
  { name: "Michael Routan" },
  { name: "George Espen" },
  { name: "Roger Baker" },
  { name: "Bono Gunter" },
  { name: "Abu Norris" },
  { name: "Edna Mullins" },
  { name: "Alysha Mckinney" },
  { name: "Nathaniel Reid" },
  { name: "Sahar Winter" },
  { name: "Cora Oneal" },
  { name: "Cara Daugherty" },
  { name: "Kirsten Robertson" },
  { name: "Cassie Macias" },
  { name: "Yusra Tyler" },
  { name: "Lori Garrison" },
  { name: "Rachael Baird" },
  { name: "Stuart Lam" },
  { name: "Marley Sloan" },
  { name: "Maxwell Mason" },
  { name: "Aron Fowler" },
  { name: "Safwan Pruitt" },
  { name: "Rafferty O'Moore" },
  { name: "Issac Stuart" },
  { name: "Eloise Bowman" },
  { name: "Kenneth Huffman" },
  { name: "Dawid Walton" },
  { name: "Oliwier Bryant" },
  { name: "Sophia Moore" },
  { name: "Sonny Rosales" },
  { name: "Dawson Harvey" },
  { name: "Leia Baldwin" },
  { name: "Saira O'Reilly" },
  { name: "Amber Ballard" },
  { name: "Ophelia Moran" },
  { name: "Melvin Shepherd" },
  { name: "Jakub Walsh" },
  { name: "Kajus Morgan" },
  { name: "Imran Orr" },
  { name: "Lottie Bonilla" },
  { name: "Aadam Higgins" },
  { name: "Jan Pearce" },
  { name: "Gladys Lloyd" },
  { name: "Curtis White" },
  { name: "Morgan Castro" },
  { name: "James Nunez" },
  { name: "Caspar Warner" },
  { name: "Aryan Newton" },
  { name: "Caleb Lane" },
  { name: "Faiza Owen" },
  { name: "Asiya Walter" },
  { name: "Kaden Grant" },
  { name: "Jermaine Espinoza" },
  { name: "Lilly-Rose Powell" },
  { name: "Faith Molina" },
  { name: "Aiden Parker" },
  { name: "Kaitlyn Gross" },
  { name: "Gareth Petersen" },
  { name: "Phillip Odonnell" },
  { name: "Amanda Faulkner" },
  { name: "Abdul Bradshaw" },
  { name: "Wendy Rice" },
  { name: "Ben Brock" },
  { name: "Ronnie House" },
  { name: "Gemma Mcintyre" },
  { name: "Fabio Martin" },
  { name: "Inayah Dickerson" },
  { name: "Deanna Sims" },
  { name: "Remi Stokes" },
  { name: "Esmee Sanders" },
  { name: "Rueben Pierce" },
  { name: "Francis Avila" },
  { name: "Aayan Arias" },
  { name: "Melisa Sawyer" },
  { name: "Bertha Skinner" },
  { name: "Iris Wang" },
  { name: "Ted Mccoy" },
  { name: "Rahul Lyons" },
  { name: "Gregory Olson" },
  { name: "Tariq Dorsey" },
  { name: "Livia Steele" },
  { name: "Alina Thornton" },
  { name: "Kayla Lindsay" },
  { name: "Joyce Wolf" },
  { name: "Evie Stevenson" },
  { name: "Jacqueline Archer" },
  { name: "Rico Marks" },
  { name: "Jaya Cooper" },
  { name: "Leonardo Gilbert" },
  { name: "Ivy Powers" },
  { name: "Moshe Gallagher" },
  { name: "Eleni Johnson" },
  { name: "Kareem Hayes" },
  { name: "Josef Holmes" },
  { name: "Austin Todd" },
  { name: "Rehan Dale" },
  { name: "Taya Barber" },
  { name: "Jorja Ford" },
  { name: "Colin Bauer" },
  { name: "Keaton Dejesus" },
  { name: "Fern Cabrera" },
  { name: "Lia Hodge" },
  { name: "Rosie Holder" },
  { name: "Kane O'Gallagher" },
  { name: "Jerry Snow" },
];

users.forEach(user => user.id = Math.random().toString(36).substring(2, 9));

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

function getRandomInt(maxmium) {
  const minimum = 0;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRandomName(arr) {
  return arr[getRandomInt(arr.length)]
}

const defaultProducts = [
    {
        productId: "5",
        productName: "Del Elophanto",
        productOwnerName:,
        developers: ,
        scrumMasterName:,
        startDate: "2016/07/09",
        methodology: "Agile",
    },
    {
        productId: "6",
        productName: "Franky's Nest",
        productOwnerName:,
        developers: ,
        scrumMasterName: "Fin Taber",
        startDate: "2019/08/12",
        methodology: "Waterfall",
    },
    {
        productId: "7",
        productName: "Beanie Barnies",
        productOwnerName:,
        developers: ,
        scrumMasterName:,
        startDate: "2019/08/12",
        methodology: "Waterfall",
    }
]

export async function getProducts(query) {
  await fakeNetwork(`getProducts:${query}`);
  let products = await localforage.getItem("products");
  if (!products) products = defaultProducts;
  if (query) {
    products = matchSorter(products, query, { keys: ["first", "last"] });
  }
  return products.sort(sortBy("last", "createdAt"));
}

export async function createProduct() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let product = { id, createdAt: Date.now() };
  let products = await getProducts();
  products.unshift(products);
  await set(products);
  return product;
}

export async function getProduct(id) {
  await fakeNetwork(`product:${id}`);
  let products = await localforage.getItem("products");
  let product = products.find(product => product.id === id);
  return product ?? null;
}

export async function updateProduct(id, updates) {
  await fakeNetwork();
  let products = await localforage.getItem("products");
  let product = products.find(product => product.id === id);
  if (!product) throw new Error("No product found for", id);
  Object.assign(product, updates);
  await set(products);
  return product;
}

export async function deleteProduct(id) {
  let products = await localforage.getItem("products");
  let index = products.findIndex(product => product.id === id);
  if (index > -1) {
    products.splice(index, 1);
    await set(products);
    return true;
  }
  return false;
}

function set(products) {
  return localforage.setItem("products", products);
}