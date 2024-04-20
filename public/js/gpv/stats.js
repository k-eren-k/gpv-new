   const repoData = [
    <% repos.forEach(repo => { %>
        { name: "<%- repo.name %>", stars: <%= repo.stargazers_count %> },
    <% }); %>
];

const ctx = document.getElementById('repoChart').getContext('2d');
const repoChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: repoData.map(repo => repo.name),
        datasets: [{
            label: 'Stars',
            data: repoData.map(repo => repo.stars),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
    }
});