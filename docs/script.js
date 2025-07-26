async function loadCSV() {
  const response = await fetch('./data.csv');
  const text = await response.text();
  const rows = text.trim().split('\n');
  const headers = rows[0].split(',');

  const data = rows.slice(1).map(row => {
    const cells = row.split(',');
    return {
      plu: cells[0],
      description: cells[1],
      current_price: cells[2],
      promo: cells[3]
    };
  });

  window.productData = data;
  displayData(data);
}

function displayData(data) {
  const table = document.getElementById('dataTable');
  table.innerHTML = '';

  data.forEach(item => {
    const row = `<tr>
      <td>${item.plu}</td>
      <td>${item.description}</td>
      <td>Rp ${parseInt(item.current_price).toLocaleString()}</td>
      <td>${item.promo === '-' ? '–' : item.promo}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Tidak display semua data, hanya saat user cari
document.getElementById('searchInput').addEventListener('input', async e => {
  const keyword = e.target.value.toLowerCase();
  const response = await fetch('./data.csv');
  const text = await response.text();
  const rows = text.trim().split('\n').slice(1);

  const filtered = rows.filter(row => {
    const cells = row.split(',');
    return cells[1].toLowerCase().includes(keyword); // search by description
  });

  const table = document.getElementById('dataTable');
  table.innerHTML = "";

  filtered.slice(0, 100).forEach(row => { // tampilkan max 100 hasil
    const cells = row.split(',');
    const html = `<tr>
      <td>${cells[0]}</td>
      <td>${cells[1]}</td>
      <td>Rp ${parseInt(cells[2]).toLocaleString()}</td>
      <td>${cells[3]}</td>
    </tr>`;
    table.innerHTML += html;
  });
});

loadCSV();