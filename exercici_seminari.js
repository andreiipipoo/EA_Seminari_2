
// Funció per obtenir les dades d'un usuari
async function fetchUser(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error('Error al obtenir l\'usuari');
    return await response.json();
}

// Funció per obtenir els posts d'un usuari
async function fetchPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) throw new Error('Error al obtenir els posts');
    return await response.json();
}

// Funció principal per executar el procés
async function fetchUserAndPosts(userId) {
    try {
        const userData = await fetchUser(userId);
        const userPosts = await fetchPosts(userId);

        // Filtrar els posts que tenen més de 200 caràcters en el contingut
        const filteredPosts = userPosts.filter(post => post.body.length > 200);

        // Obtenir els continguts dels posts filtrats en minúscules
        const lowerCaseContents = filteredPosts.map(post => post.body.toLowerCase());

        // Calcular el nombre total de caràcters dels continguts filtrats
        const totalCharacters = lowerCaseContents.reduce((sum, content) => sum + content.length, 0);

        console.log('Dades de l\'usuari:', userData);
        console.log('Posts filtrats (més de 200 caràcters):', filteredPosts);
        console.log('Continguts en minúscules:', lowerCaseContents);
        console.log('Nombre total de caràcters dels continguts filtrats:', totalCharacters);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Executem la funció amb un ID d'usuari específic
fetchUserAndPosts(1);
