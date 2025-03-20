document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data
    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            // Insert Home Page Text
            if (document.getElementById("introText")) {
                document.getElementById("introText").innerText = data.home.introText;
            }

            // Insert Gallery Images
            if (document.getElementById("galleryContainer")) {
                let galleryHTML = "";
                data.gallery.forEach(image => {
                    galleryHTML += `
                        <div>
                            <img src="${image.src}" alt="${image.title}" width="200">
                            <p>${image.description}</p>
                        </div>
                    `;
                });
                document.getElementById("galleryContainer").innerHTML = galleryHTML;
            }
        });

    // Form Validation
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Form submitted successfully!");
        });
    }
});