const items = [
  { item: "Read a book", status: 0 },
  { item: "Study dev", status: 1 },
  { item: "Boxing training", status: 0 },
];

const itemsStr = JSON.stringify(items);

console.log(itemsStr);
console.log(items);

saveItems(items);

function fetchItems() {
  const itemsList = document.querySelector(".todo-items");
  itemsList.innerHTML = "";
  var newItemHTML = "";

  try {
    var items = localStorage.getItem("todo-items");
    const itemsArr = JSON.parse(items);

    for (var i = 0; i < itemsArr.length; i++) {
      var status = "";

      if (itemsArr[i].status == 1) {
        status = 'class="done"';
      }

      newItemHTML += `<li index="${i}" ${status}> <span class="text-task">${itemsArr[i].item}</span> <div class="emoji-div"> <span class='completeTask'>✔️</span> <span class='deleteTask'>🗑️</span> </div> </li>`;

      itemsList.innerHTML = newItemHTML;
    }

    var itemListUl = document.querySelectorAll("ul li");
    for (var j = 0; j < itemListUl.length; j++) {
      itemListUl[j]
        .querySelector(".completedTask")
        .addEventListener("click", function () {
          var index = this.parentNode.parentNode.dataset.itemindex;
          itemComplete(index);
        });
      itemListUl[j]
        .querySelector(".deletedTask")
        .addEventListener("click", function () {
          var index = this.parentNode.parentNode.dataset.itemindex;
          itemDelete(index);
        });
    }
  } catch (error) {
    console.log(error);
  }
}

function itemComplete(index) {
  var items = localStorage.getItem("todo-items");
  const itemsArr = JSON.parse(items);

  itemsArr[index].status = 1;
  saveItems(itemsArr);
}

function itemDelete(index) {
  var items = localStorage.getItem("todo-items");
  const itemsArr = JSON.parse(items);

  itemsArr.splice(index, 1);
  saveItems(itemsArr);

  document.querySelector(`.todo-items li[index='${index}']`).classList.remove;
}

function saveItems(items) {
  var string = JSON.stringify(items);

  localStorage.setItem("todo-items", string);
}

// BUTTON DISPLAY

document.getElementById("btnCreator").addEventListener("click", function () {
  document.getElementById("btnCreator").style.display = "none";
  document.getElementById("newItem").style.display = "block";
});

document.getElementById("btnAddTask").addEventListener("click", function () {
  document.getElementById("newItem").style.display = "none";
  document.getElementById("btnCreator").style.display = "block";
});

document.getElementById("btCancelTask").addEventListener("click", function () {
  document.getElementById("newItem").style.display = "none";
  document.getElementById("btnCreator").style.display = "block";
});

fetchItems();
