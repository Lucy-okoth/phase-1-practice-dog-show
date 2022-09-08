document.addEventListener('DOMContentLoaded', () => {
    createDogTable();
})

function createDogTable() {
    let dogForm = document.querySelector("#dog-form");
    let nameInput = dogForm.querySelector('input[name="name"]');
    let breedInput = dogForm.querySelector('input[name="breed"]');
    let sexInput = dogForm.querySelector('input[name="sex"]');
    let submitButton = dogForm.querySelector('input[value="Submit"]');
    let dogId;
    let tBody = document.querySelector("#table-body");
  
    // Clear 'tbody' so that we can add the revised rows later on during the next function call
    tBody.innerHTML = '';
  
    // console.log("nameInput: ", nameInput);
    // console.log("breedInput: ", breedInput);
    // console.log("sexInput: ", sexInput);
  
    fetch("http://localhost:3000/dogs", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((obj) => {
        // console.log("obj: ", obj);
        obj.forEach((dog) => {
          let newTableRow = document.createElement("tr");
  
          let dogNameTd = document.createElement("td");
          let dogBreedTd = document.createElement("td");
          let dogSexTd = document.createElement("td");
          let dogEditButtonTd = document.createElement("td");
          let dogEditButton = document.createElement("button");
  
          let dogName = dog["name"];
          let dogBreed = dog["breed"];
          let dogSex = dog["sex"];
          let dogId = dog["id"];
  
          dogNameTd.textContent = dogName;
          dogBreedTd.textContent = dogBreed;
          dogSexTd.textContent = dogSex;
  
          dogEditButton.textContent = "Edit";
          dogEditButtonTd.append(dogEditButton);
  
          // Add event listener for 'dogEditButton':
          dogEditButton.addEventListener("click", (e) => {
            e.preventDefault();
            nameInput.value = dogName;
            breedInput.value = dogBreed;
            sexInput.value = dogSex;
            // Force the 'name' based input HTML element to have the same 'id' so that we can use it later accordingly:
            // console.log("dogId");
            nameInput.id = dogId;
          });
          newTableRow.append(dogNameTd, dogBreedTd, dogSexTd, dogEditButtonTd);
          // console.log("newTableRow: ", newTableRow);
          tBody.append(newTableRow);
          submitButton.addEventListener("click", dogEditSubmit);
        });
      })
      .catch((error) => {
        // console.log("error: ", error.message);
      });
  }
  
  function dogEditSubmit(e) {
    e.preventDefault();
    // console.log("dogEditSubmit() function called");
    // console.log("e: ", e);
  
    let dogName = e.target.parentNode[0].value;
    let dogBreed = e.target.parentNode[1].value;
    let dogSex = e.target.parentNode[2].value;
  
    // console.log("dogName:, ", dogName);
    // console.log("dogBreed:, ", dogBreed);
    // console.log("dogSex:, ", dogSex);
  
    // Obtain the 'name' HTML element's 'id' property so we can use it for another fetch() call:
    let dogForm = document.querySelector("#dog-form");
    let nameInput = dogForm.querySelector('input[name="name"]');
    let nameInputId = nameInput.id;
  
    // console.log("fetch() within dogEditSubmit() function called using this URL: ", `http://localhost:3000/dogs/${nameInputId}`);
  
    fetch(`http://localhost:3000/dogs/${nameInputId}`, {
      method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex
          }),
    })
      .then(() => {
        createDogTable();
      })
      .catch((error) => {
        // console.log("error: ", error.message);
      });
  }