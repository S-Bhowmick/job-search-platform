document.addEventListener("DOMContentLoaded", () => {
    // Fetch job listings from the backend API
    fetch("http://localhost:3000/api/jobs")  // Update with your API route
        .then(response => response.json())
        .then(data => {
            // Get the job list container
            const jobListContainer = document.getElementById('job-list');

            // Iterate through the job listings and display each job
            data.forEach(job => {
                const jobItem = document.createElement('li');
                jobItem.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>Location: ${job.location}</p>
                    <p>Company: ${job.company}</p>
                    <p>Description: ${job.description}</p>
                `;
                jobListContainer.appendChild(jobItem);
            });
        })
        .catch(err => console.log('Error fetching job listings:', err));
});