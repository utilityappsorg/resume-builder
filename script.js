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
  const profilePicSrc = document.getElementById("profilePicPreview").src;

  const outputHTML = `
    ${profilePicSrc ? `<img src="${profilePicSrc}" alt="Profile Picture" style="width:120px;height:120px;border-radius:50%;margin-bottom:10px;">` : ""}
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

// Profile picture preview
document.getElementById("profilePic").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("profilePicPreview");
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      preview.src = evt.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
});

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
