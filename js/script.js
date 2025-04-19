// Optional: Add JavaScript for interactivity
console.log("Max Conine's Portfolio loaded!");

// Example: Add a simple event listener (just for demonstration)
document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('#projects a');

    projectLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            console.log(`Link to project clicked: ${link.textContent}`);
            // Add your project viewing logic here (e.g., open a modal)
        });
    });
});