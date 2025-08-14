let foodDatabase = {};
let allFoodNames = [];
let currentFocus = -1;
let categoryState = {}; // remembers collapse state

fetch("foods.json")
  .then(response => response.json())
  .then(data => {
    foodDatabase = data;
    allFoodNames = Object.keys(data);
  })
  .catch(error => console.error("Error loading database:", error));

const foodInput = document.getElementById("foodName");
const suggestionsBox = document.getElementById("suggestions");

// Build suggestions when typing
foodInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  currentFocus = -1;
  if (!query) return;

  const groupedMatches = {};
  allFoodNames.forEach(name => {
    if (name.startsWith(query)) {
      const category = foodDatabase[name].category || "Other";
      if (!groupedMatches[category]) groupedMatches[category] = [];
      groupedMatches[category].push(name);
    }
  });

  if (Object.keys(groupedMatches).length > 0) {
    const list = document.createElement("div");
    list.className = "suggestion-list";

    for (let category in groupedMatches) {
      if (categoryState[category] === undefined) categoryState[category] = true;

      // Category header
      const header = document.createElement("div");
      header.className = "category-header";
      header.textContent = category + (categoryState[category] ? " ▼" : " ▶");

      // Food items container
      const itemContainer = document.createElement("div");
      itemContainer.className = "category-items";
      itemContainer.style.display = categoryState[category] ? "block" : "none";

      groupedMatches[category].forEach(name => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        const nameSpan = document.createElement("span");
        nameSpan.textContent = capitalize(name);
        const calSpan = document.createElement("small");
        calSpan.textContent = `${foodDatabase[name].calories} kcal`;
        item.appendChild(nameSpan);
        item.appendChild(calSpan);

        item.addEventListener("click", function () {
          foodInput.value = name;
          suggestionsBox.innerHTML = "";
        });

        itemContainer.appendChild(item);
      });

      // Collapse toggle
      header.addEventListener("click", function () {
        categoryState[category] = !categoryState[category];
        itemContainer.style.display = categoryState[category] ? "block" : "none";
        header.textContent = category + (categoryState[category] ? " ▼" : " ▶");
      });

      list.appendChild(header);
      list.appendChild(itemContainer);
    }

    suggestionsBox.appendChild(list);
  }
});

// Keyboard navigation
foodInput.addEventListener("keydown", function (e) {
  const items = suggestionsBox.querySelectorAll(".suggestion-item");
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    currentFocus++;
    highlight(items);
  } else if (e.key === "ArrowUp") {
    currentFocus--;
    highlight(items);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (currentFocus > -1) items[currentFocus].click();
  }
});

function highlight(items) {
  removeActive(items);
  if (currentFocus >= items.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = items.length - 1;
  items[currentFocus].classList.add("active");
}
function removeActive(items) {
  items.forEach(i => i.classList.remove("active"));
}

document.addEventListener("click", e => {
  if (e.target !== foodInput) suggestionsBox.innerHTML = "";
});

document.getElementById("foodInputForm").onsubmit = function (e) {
  e.preventDefault();
  const foodName = foodInput.value.trim().toLowerCase();
  const allergiesInput = document.getElementById("allergy").value
    .split(",").map(a => a.trim().toLowerCase()).filter(a => a);

  if (!foodName) { alert("Please enter a food name."); return; }

  if (foodDatabase[foodName]) {
    const food = foodDatabase[foodName];
    let output = `<h2>${capitalize(foodName)} (${food.category})</h2>`;
    output += `<p>Calories: ${food.calories}</p>`;
    output += `<p>Proteins: ${food.protein} g</p>`;
    output += `<p>Fibers: ${food.fiber} g</p>`;

    const matches = allergiesInput.filter(a => food.allergens.includes(a));
    if (matches.length > 0) {
      output += `<p style="color:red;"><b>⚠ Allergy Warning:</b> Contains ${matches.join(", ")}</p>`;
    } else {
      output += `<p style="color:green;">No allergens detected based on your input.</p>`;
    }

    document.getElementById("nutritionOutput").innerHTML = output;
  } else {
    document.getElementById("nutritionOutput").innerHTML =
      `<p style="color:red;">Food not found in the local JSON database.</p>`;
  }
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
