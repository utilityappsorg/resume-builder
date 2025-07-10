function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value.split(",");

  const output = `
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <h4>Summary</h4>
    <p>${summary}</p>
    <h4>Experience</h4>
    <p>${experience}</p>
    <h4>Education</h4>
    <p>${education}</p>
    <h4>Skills</h4>
    <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join("")}</ul>
  `;

  document.getElementById("output").innerHTML = output;
}

// Add this script at the end of your HTML file or in a JS file
const inputs = document.querySelectorAll('input, textarea');
const progressBar = document.getElementById('progressBar');

function updateProgress() {
  let filled = 0;
  inputs.forEach(input => {
    if (input.value.trim() !== '') filled++;
  });
  const percent = Math.round((filled / inputs.length) * 100);
  progressBar.style.width = percent + '%';
}

inputs.forEach(input => {
  input.addEventListener('input', updateProgress);
});

// Initialize on page load
updateProgress();

document.getElementById("downloadPdfBtn").addEventListener("click", function () {
  const element = document.getElementById("output"); // The resume preview section
  html2pdf().from(element).save("resume.pdf");
});