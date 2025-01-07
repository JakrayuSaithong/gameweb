let selectedBottonDrop = null;
let selectedList = null;

// เลือก div botton-drop และ div list เมื่อคลิก
const bottonDrops = document.querySelectorAll('.botton-drop');
bottonDrops.forEach(bottonDrop => {
  bottonDrop.addEventListener('click', () => {
    if (selectedBottonDrop !== null) {
      selectedBottonDrop.classList.remove('selected');
    }
    selectedBottonDrop = bottonDrop;
    selectedBottonDrop.classList.add('selected');
    selectedList = selectedBottonDrop.querySelector('.list');
  });
});

const boxdraggable = document.querySelector('.box-draggable');
const lists = boxdraggable.querySelectorAll('.list');
lists.forEach(list => {
  list.addEventListener('click', () => {
    if (selectedBottonDrop !== null && boxdraggable.contains(list)) {
      if (selectedList !== null) {
        boxdraggable.appendChild(selectedList);
      }
      if (selectedList !== list) {
        selectedList = list;
        selectedBottonDrop.appendChild(selectedList);
      }
    }
  });
});

// ตรวจสอบว่าคลิก bx-x1
const xIcons = document.querySelectorAll('.bx-x1');
xIcons.forEach(xIcon => {
  xIcon.addEventListener('click', () => {
    const parentBottonDrop = xIcon.parentElement;
    const list = parentBottonDrop.querySelector('.list');

    if (list) {
      document.getElementById('box-draggable').appendChild(list);
    }
  });
});

function buttonsubmit() {
  var dropBoxes = document.querySelectorAll(".botton-drop");
  var score = 0;

  for (var i = 0; i < dropBoxes.length; i++) {
    var dropBox = dropBoxes[i];
    var dropBoxId = dropBox.getAttribute("id");

    var lists = dropBox.querySelectorAll(".list");

    for (var j = 0; j < lists.length; j++) {
      var list = lists[j];
      var listId = list.getAttribute("id");

      if (dropBoxId === listId) {
        score++;
      }
    }
  }
}

function openpopup(number) {
  var textPopups = document.getElementsByClassName("text-popup");
  for (var i = 0; i < textPopups.length; i++) {
    textPopups[i].style.display = "none";
  }

  var selectedPopup = document.getElementsByClassName("text-popup")[number];
  selectedPopup.style.display = "flex";

  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "block";
  
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
}

window.addEventListener('DOMContentLoaded', (event) => {
  const boxDraggable = document.querySelector('#box-draggable');
  const lists = Array.from(boxDraggable.getElementsByClassName('list'));
  
  for (let i = lists.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lists[i], lists[j]] = [lists[j], lists[i]];
  }
  
  lists.forEach((list) => {
    boxDraggable.appendChild(list);
  });
});