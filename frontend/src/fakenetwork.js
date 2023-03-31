
// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

export default async function fakeNetwork(key) {
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
