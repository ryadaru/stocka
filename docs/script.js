async function loadCSV() {
  const response = await fetch('data.csv');
  const text = await response.text();
  const rows = text.trim().split('\n').slice(1); // Skip header

  const data = rows.map(row => {
    const [nama, stok, harga] = row.split(',');
    return { nama, stok, harga };
  });

  window.productData = data;
  displayData(data);
}

function displayData(data) {
  const table = document.getElementById('dataTable');
  table.innerHTML = "";

  data.forEach(item => {
    const row = `<tr>
      <td>${item.nama}</td>
      <td>${item.stok}</td>
      <td>Rp ${parseInt(item.harga).toLocaleString()}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

document.getElementById('searchInput').addEventListener('input', e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = window.productData.filter(item =>
    item.nama.toLowerCase().includes(keyword)
  );
  displayData(filtered);
});

loadCSV();