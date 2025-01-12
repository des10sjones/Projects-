// DOM Elements
const form = document.getElementById('finance-form');
const tableBody = document.querySelector('#entries-table tbody');
const barChartCanvas = document.getElementById('bar-chart');
const pieChartCanvas = document.getElementById('pie-chart');

// Theme Toggle Button
const themeToggle = document.getElementById('theme-toggle');

// Sidebar navigation links
const links = document.querySelectorAll('.nav-links a');
const pages = document.querySelectorAll('.page');


// Entries Array (Persistent via localStorage)
let entries = JSON.parse(localStorage.getItem('entries')) || [];

// Add click event listeners to each link
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');

    // Hide all pages and remove active class from links
    pages.forEach(page => page.classList.remove('active'));
    links.forEach(l => l.classList.remove('active'));

    // Show the selected page and mark link as active
    document.getElementById(targetId).classList.add('active');
    link.classList.add('active');
  });
});

// Event: Form Submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Collect Input Values
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Validate and Save Entry
  if (date && category && type && !isNaN(amount)) {
    const entry = { date, category, type, amount };
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    addEntryToTable(entry);
    form.reset();
  } else {
    alert("Please fill out all fields with valid data.");
  }
});

// Add event listener for theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Save the user's theme preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
});

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
  }
})

// Function: Add Entry to Table
function addEntryToTable(entry) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${entry.date}</td>
    <td>${entry.category}</td>
    <td>${entry.type}</td>
    <td>${entry.amount.toFixed(2)}</td>
  `;
  tableBody.appendChild(row);
}

// Function: Populate Table on Load
function populateTable() {
  tableBody.innerHTML = ''; // Clear existing rows
  entries.forEach(addEntryToTable);
}

// Event: View Summary
document.getElementById('view-summary').addEventListener('click', () => {
  const summary = entries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + entry.amount;
    return acc;
  }, {});
  alert(`Summary:\nIncome: ${summary.Income || 0}\nExpense: ${summary.Expense || 0}`);
});

// Event: Visualize Data
document.getElementById('visualize-data').addEventListener('click', () => {
  // Filter Expense Data
  const expenseData = entries.filter(entry => entry.type === 'Expense');

  // Calculate Totals
  const categories = [...new Set(expenseData.map(entry => entry.category))];
  const categoryTotals = categories.map(category => {
    return expenseData
      .filter(entry => entry.category === category)
      .reduce((acc, entry) => acc + entry.amount, 0);
  });

  // Bar Chart: Income vs Expense
  const incomeTotal = entries
    .filter(entry => entry.type === 'Income')
    .reduce((acc, entry) => acc + entry.amount, 0);
  const expenseTotal = expenseData.reduce((acc, entry) => acc + entry.amount, 0);

  const barCtx = barChartCanvas.getContext('2d');
  barChartCanvas.style.display = 'block';
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        label: 'Amount',
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#4CAF50', '#FF5733'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Income vs Expense' }
      }
    }
  });

  // Pie Chart: Expense Breakdown
  const pieCtx = pieChartCanvas.getContext('2d');
  pieChartCanvas.style.display = 'block';
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: categories.map(() =>
          `#${Math.floor(Math.random() * 16777215).toString(16)}` // Random colors
        )
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Expense Breakdown by Category' }
      }
    }
  });
});

// Initialize App
populateTable();
