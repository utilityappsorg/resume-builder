function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill);

  const outputHTML = `
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
    <ul>${skills.map(skill => `<li>${skill}</li>`).join("")}</ul>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}

document.getElementById("generateDownloadBtn").addEventListener("click", function () {
  generateResume();

  setTimeout(() => {
    const outputDiv = document.getElementById("output");
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(outputDiv).save();
  }, 100);
});
