let data = [];
let filter = "all";

function toggleForm() {
  const form = document.getElementById("form");
  form.style.display = form.style.display === "block" ? "none" : "block";
}

document.getElementById("form").onsubmit = function(e) {
  e.preventDefault();

  data.push({
    name: name.value,
    img: img.value,
    cat: cat.value,
    status: status.value
  });

  render();
  this.reset();
};

function setFilter(cat) {
  filter = cat;
  render();
}

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  let filtered = filter === "all"
    ? data
    : data.filter(d => d.cat === filter);

  filtered.forEach(d => {
    grid.innerHTML += `
      <div class="card">
        <img src="${d.img}">
        <h4>${d.name}</h4>
        <p>${d.cat}</p>
        <p class="status-${d.status.toLowerCase()}">${d.status}</p>
      </div>
    `;
  });
}
