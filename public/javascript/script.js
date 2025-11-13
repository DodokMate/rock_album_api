const baseUrl = "http://localhost:4000/api/albums";

async function loadData() {
  try {
    const res = await fetch(baseUrl);
    const json = await res.json();
    const albums = json.results;

    renderCards(albums);
    renderTable(albums);
  } catch (err) {
    console.error("Hiba az adatok betöltésekor:", err);
  }
}

function renderCards(albums) {
  const container = document.getElementById('cardContainer');
  container.innerHTML = "";
  albums.forEach(a => {
    const card = document.createElement('div');
    card.classList.add('col-md-4');
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${a.nev}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${a.eloado}</h6>
          <p class="card-text">
            <strong>ID:</strong> ${a.id}<br>
            <strong>Megjelenés éve:</strong> ${a.megjelenes_eve}<br>
            <strong>Eladott példányszám:</strong> ${a.eladott_peldanyszam.toLocaleString()}<br>
            <strong>Összbevétel:</strong> $${a.osszbevetel.toLocaleString()}
          </p>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function renderTable(albums) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = "";
  albums.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${a.id}</td>
      <td>${a.eloado}</td>
      <td>${a.nev}</td>
      <td>${a.megjelenes_eve}</td>
      <td>${a.eladott_peldanyszam.toLocaleString()}</td>
      <td>$${a.osszbevetel.toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}

loadData();