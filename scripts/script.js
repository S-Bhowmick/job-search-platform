// Event listener for the job search form
document.getElementById('job-search-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Get the input values from the search form
    const keywords = document.getElementById('search-keywords').value;
    const location = document.getElementById('location').value;

    // Sample job data (this would typically come from a database or API)
    const jobs = [
        { title: 'Web Developer', location: 'London', company: 'Tech Ltd', description: 'Develop amazing web applications.' },
        { title: 'Software Engineer', location: 'Manchester', company: 'DevWorks', description: 'Build scalable software systems.' },
        { title: 'UI/UX Designer', location: 'London', company: 'DesignCo', description: 'Create beautiful and functional interfaces.' },
        { title: 'Data Scientist', location: 'Manchester', company: 'DataInc', description: 'Analyze and interpret complex data.' }
    ];

    // Filter jobs based on search keywords and location
    const filteredJobs = jobs.filter(job => 
        (job.title.toLowerCase().includes(keywords.toLowerCase()) || 
        job.description.toLowerCase().includes(keywords.toLowerCase())) &&
        (location === 'any' || job.location === location)
    );

    // Get the job listings container
    const listingsContainer = document.querySelector('.job-listings');
    listingsContainer.innerHTML = ''; // Clear previous listings

    // Display filtered jobs or a no results message
    if (filteredJobs.length === 0) {
        listingsContainer.innerHTML = '<p>No jobs found.</p>';
    } else {
        filteredJobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Company:</strong> ${job.company}</p>
                <p>${job.description}</p>
            `;
            listingsContainer.appendChild(jobElement);
        });
    }
});