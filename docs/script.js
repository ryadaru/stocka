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

document.getElementById('searchInput').addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = window.productData.filter(item =>
    item.description.toLowerCase().includes(keyword)
  );
  displayData(filtered);
});

loadCSV();