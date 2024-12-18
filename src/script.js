const imprintModal = document.getElementById('imprintModal');
const link = document.getElementById('imprint');

link.onclick = function () {
    imprintModal.style.display = "flex";
}

window.onclick = function (event) {
    if (event.target == imprintModal) {
        imprintModal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDates()
        .then(data => {
            const filteredData = filterDates(data);
            populateTable(filteredData);
        });
});

function fetchDates() {
    return fetch('dates.json')
        .then(response => response.json());
}

function filterDates(data) {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    return data.filter(show => {
        const [day, month, year] = show.date.split('.').map(Number);
        const showDate = new Date(year, month - 1, day);
        return showDate >= startOfYear;
    });
}

function populateTable(data) {
    const table = document.getElementById('dates-table');
    const today = new Date();

    data.forEach(show => {
        const [day, month, year] = show.date.split('.').map(Number);
        const showDate = new Date(year, month - 1, day);

        const row = document.createElement('tr');
        if (showDate < today) {
            row.classList.add('history');
        }

        const cellContent = show.link ? `<a href="${show.link}" target="_blank">${show.date} ${show.location}</a>` : `${show.date} ${show.location}`;
        row.innerHTML = `<td>+++++</td><td>${cellContent}</td><td>+++++</td>`;

        if (show.link) {
            row.classList.add('link');
            row.addEventListener('click', () => {
                window.open(show.link, '_blank');
            });
        }

        table.appendChild(row);
    });
}
