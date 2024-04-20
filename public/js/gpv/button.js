function toggleSection(section) {
    const reposButton = document.getElementById('reposButton');
    const statsButton = document.getElementById('statsButton');
    const gistsButton = document.getElementById('gistsButton');

    reposButton.classList.remove('active');
    statsButton.classList.remove('active');
    gistsButton.classList.remove('active');

    document.getElementById('repos').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('gists').style.display = 'none';
 if (section === 'repos') {
       
    } else if (section === 'stats') {
        statsButton.classList.add('active');
        statsButton.style.backgroundColor = '#22222280';
        statsButton.style.color = '#eeeeee6e';
    } else if (section === 'gists') {
        gistsButton.classList.add('active');
        gistsButton.style.backgroundColor = '#22222280';
        gistsButton.style.color = '#eeeeee6e';
    }
    if (section === 'repos') {
        reposButton.classList.add('active');
        document.getElementById('repos').style.display = 'block';
        reposButton.classList.add('active');
        reposButton.style.backgroundColor = '#22222280';
        reposButton.style.color = '#eeeeee6e';
        statsButton.style.backgroundColor = 'transparent';
        statsButton.style.color = '#eeeeee6e';
        gistsButton.style.backgroundColor = 'transparent';
        gistsButton.style.color = '#eeeeee6e';
    } else if (section === 'stats') {
        statsButton.classList.add('active');
        document.getElementById('stats').style.display = 'block';
        reposButton.classList.add('active');
        reposButton.style.backgroundColor = 'transparent';
        reposButton.style.color = '#eeeeee6e';
        statsButton.style.backgroundColor = '#22222280';
        statsButton.style.color = '#eeeeee6e';
        gistsButton.style.backgroundColor = 'transparent';
        gistsButton.style.color = '#eeeeee6e';
    } else if (section === 'gists') {
        gistsButton.classList.add('active');
        document.getElementById('gists').style.display = 'block';
        reposButton.classList.add('active');
        reposButton.style.backgroundColor = 'transparent';
        reposButton.style.color = '#eeeeee6e';
        statsButton.style.backgroundColor = 'transparent';
        statsButton.style.color = '#eeeeee6e';
        gistsButton.style.backgroundColor = '#22222280';
        gistsButton.style.color = '#eeeeee6e';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleSection('stats');
});

