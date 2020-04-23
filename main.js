let kittens = [];

let currentPlayer;

function login() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
}
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */

function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  let sameName = false;

  kittens.forEach((kitten) => {
    if (kitten.name == form.newKittenName.value) sameName = true;
  });

  if (!sameName) {
    let kitten = {
      id: generateId(),
      name: form.newKittenName.value,
      mood: "tolerant",
      affection: 3,
    };
    kittens.push(kitten);
    saveKittens();
    sameName = false;
    form.reset();
  } else {
    console.log("cant name two kittens the same");
    alert("you can only have one cat named " + form.newKittenName);
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"));
  if (!kittensData) {
    kittens = [];
    console.log("no kittens to load");
  } else {
    kittens = kittensData;
    console.log("kittens loaded");
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = "";

  kittens.forEach((kitten) => {
    template += `<div class="kitten ${kitten.mood} img card bg-dark m-2 w-10 ">
  <img class="" src="https://robohash.org/${kitten.name}/?set=set4" alt="cat">

  <div class="  mt-1">
    <label for="name">Name: ${kitten.name}</label>
  </div>
  <div>
    <label for="name">mood: ${kitten.mood}</label>
  </div>
  <div>
    <label for="name">affection: ${kitten.affection}</label>
  </div>
  <div class="d-flex justify-content-center">
    <button onclick="pet(${kitten.id})" class=" btn-red m-2">Pet</button>
    <button onclick="catnip(${kitten.id})" class=" m-2">Cat nip</button>
  </div>
</div>`;
  });
  document.getElementById("kitten-container").innerHTML = template;
}

function findKittenById(id) {
  return kittens.find((k) => k.id == id);
}

function pet(id) {
  let index = kittens.findIndex((kitten) => kitten.id == id);
  console.log("kitten id is " + index);
  if (index <= -1) {
    throw new Error(
      "invalid contact id...... id is actually    " + index.toString()
    );
  }

  kittens[index].affection += generatePetResult();

  setKittenMood(index);

  saveKittens();
}

function generatePetResult() {
  if (Math.random() * 4 > 2) {
    return 1;
  } else {
    return -1;
  }
}

function catnip(id) {
  let index = kittens.findIndex((kitten) => kitten.id == id);
  console.log("kitten id is " + index);
  if (index <= -1) {
    throw new Error(
      "invalid contact id...... id is actually    " + index.toString()
    );
  }
  kittens[index].affection = 5;
  setKittenMood(index);

  saveKittens();
}

function setKittenMood(index) {
  let kittenMood = kittens[index].affection;

  if (kittenMood >= 6) {
    kittens[index].mood = "happy";
  }
  if (kittenMood <= 5) {
    kittens[index].mood = "tolerant";
  }
  if (kittenMood > 0 && kittenMood <= 3) {
    kittens[index].mood = "angry";
  }
  if (kittenMood <= 0) {
    kittens[index].mood = "gone";
  }
  saveKittens();
}

function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 10000000)
  ).toString();
}

function clearKittens() {
  kittens = [];
  saveKittens();
}
loadKittens();
drawKittens();
