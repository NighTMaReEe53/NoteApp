// Selector

const theAdd = document.querySelector(".add"),
  theLightBox = document.querySelector(".light-box"),
  theClosed = theLightBox.querySelector(" i"),
  theHeading = theLightBox.querySelector(".head h2"),
  InpTitle = document.getElementById("title"),
  InpDesc = document.querySelector("textarea"),
  theBtn = document.querySelector(".theBtn");

// Months Array

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Set Option

let idEdit,
  isEdit = false;

let theArray = [];

let theLocal = localStorage.getItem("dataArray");

// Check
if (theLocal != null) {
  theArray = JSON.parse(theLocal);
}

theAdd.addEventListener("click", () => {
  theLightBox.classList.add("show");
  theHeading.innerHTML = "أضف ملحوظة جديدة";
  theBtn.innerHTML = "اضف";
});

theClosed.addEventListener("click", () => {
  theLightBox.classList.remove("show");
  isEdit = false;
});

theBtn.addEventListener("click", getData);

function getData() {
  let theTitle = InpTitle.value.trim();
  let theDesc = InpDesc.value.trim();
  if (theTitle && theDesc) {
    let theDate = new Date();
    let month = months[theDate.getMonth()];
    let day = theDate.getDate();
    let year = theDate.getFullYear();
    let theObj = {
      objTitle: theTitle,
      objDesc: theDesc,
      objDate: `${month}, ${day}, ${year}`,
    };
    if (isEdit) {
      theArray[idEdit] = theObj;
    } else {
      theArray.push(theObj);
    }
    // Save To LocalStorage
    localStorage.setItem("dataArray", JSON.stringify(theArray));
    // ShowData
    showData();
    // Close LightBox
    theClosed.click();
  }
}

function showData() {
  document.querySelectorAll(".card").forEach((card) => card.remove());
  theArray.forEach((array, indx) => {
    let card = `
          <div class="card card-style">
        <div class="card-head">
          <h2>${array.objTitle}</h2>
          <p>${array.objDesc}</p>
        </div>
        <div class="card-details">
          <span class="date">${array.objDate}</span>
          <div class="items">
              <i class="fa-solid fa-ellipsis"></i>
            <ul class="list">
              <li onclick="editItem(${indx}, '${array.objTitle}', '${array.objDesc}')">
                <i class="fa-regular fa-pen-to-square"></i>
                تعديل
              </li>
              <li onclick="removeItem(${indx})">
                <i class="fa-solid fa-trash"></i>
                حذف
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
    theAdd.insertAdjacentHTML("afterend", card);
  });
}

// Trigger Function
showData();

function removeItem(theId) {
  let theConfirm = confirm("هل انتا متاكد من الحذف ؟؟");
  if (!theConfirm) {
    return;
  } else {
    theArray.splice(theId, 1);
    // UpDateLocalStorage
    localStorage.setItem("dataArray", JSON.stringify(theArray));
    // ShowData
    showData();
  }
}

function editItem(theId, title, desc) {
  idEdit = theId;
  isEdit = true;
  theAdd.click();
  InpTitle.value = title;
  InpDesc.value = desc;
  theBtn.innerHTML = "تحديث";
  theHeading.innerHTML = "تحديث الملاحظه";
}
