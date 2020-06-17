const users = document.querySelector(".users");
const btn = document.querySelector(".btn");
const nameInput = document.querySelector(".name");
const ageInput = document.querySelector(".age");
const search = document.querySelector(".search");

//btn onClick
btn.addEventListener("click", function () {
  //get values
  let nameVal = nameInput.value;
  let ageVal = ageInput.value;
  data.collection("users").add({
    name: nameVal,
    age: ageVal,
  });

  nameInput.value = null;
  ageInput.value = null;
});

//delet user
function deletUser(e) {
  let id = e.target.parentElement.getAttribute("data-id");
  data.collection("users").doc(id).delete();
}

function storeData(doc) {
  let data = doc.data();
  let li = document.createElement("li"); // create li
  let del = document.createElement("span"); // create delet span x
  del.textContent = "X";
  li.textContent = `name: ${data.name} ---- age : ${data.age}`;

  li.appendChild(del); // added to the li
  li.setAttribute("data-id", doc.id); // add uniq id to li
  users.appendChild(li); // added to the ul

  // delet
  del.addEventListener("click", deletUser);
}
//not real time

/*
data
  .collection("users")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach(function (doc) {
      storeData(doc);
    });
  })
  .catch(console.log("error"));
*/

// real time
data.collection("users").onSnapshot((res) => {
  let changes = res.docChanges();
  changes.forEach((change) => {
    if (change.type == "added") {
      storeData(change.doc);
    }
  });
});
