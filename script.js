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
    const previewDiv = document.getElementById("resume-preview");
    previewDiv.classList.add("pdf-export");
    const originalWidth = previewDiv.style.width;
    const originalTransform = previewDiv.style.transform;
    // A4 page width in pt (595.28pt), minus margins (40pt total)
    const pdfPageWidth = 595.28 - 40;
    // Get the current width of the preview in pixels
    const previewRect = previewDiv.getBoundingClientRect();
    const previewWidth = previewRect.width;
    // Calculate scale to fit A4 width
    const scale = pdfPageWidth / previewWidth;
    previewDiv.style.transformOrigin = 'top left';
    previewDiv.style.transform = `scale(${scale})`;
    // Use jsPDF from the UMD build loaded via CDN
    const jsPDFConstructor = window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : window.jsPDF;
    const pdf = new jsPDFConstructor({ unit: 'pt', format: 'a4', orientation: 'portrait' });
    pdf.html(previewDiv, {
      callback: function (doc) {
        doc.save('resume.pdf');
        previewDiv.classList.remove("pdf-export");
        previewDiv.style.width = originalWidth;
        previewDiv.style.transform = originalTransform;
      },
      margin: [20, 20, 20, 20],
      autoPaging: 'text',
      x: 0,
      y: 0,
      html2canvas: { scale: 1, useCORS: true, backgroundColor: '#fff' }
    });
  }, 100);
});
