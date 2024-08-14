// script.js

// Image Data 
const images = [
  // Page 1
  { src: "BVGWTP.avif", alt: "Back view girl waking through Paris" },
  { src: "NTIN.jpg", alt: "Nature in Norway" },
  { src: "SMIUK.jpg", alt: "Summer in UK" },
  { src: "YNP.avif", alt: "Yosemite National park" },
  { src: "MIL.webp", alt: "Music is life" },
  { src: "MA.avif", alt: "Music art" },
  { src: "GCY.jpg", alt: "Grand Canyon" },
  { src: "UZNP.webp", alt: "Utah's Zion National Park" },
  { src: "DVNP.jpg", alt: "Death Valley National Park" },
  // Page 2
  { src: "FFLA.jpg", alt: "The Fuji Five Lakes" },
  { src: "ORT.jpg", alt: "Oyama Rice Terrace" },
  { src: "PLU.webp", alt: "Pura Luhur Uluwatu" },
  { src: "HV.webp", alt: "Hunza Valley" },
  { src: "GBTB.webp", alt: "Gardens By The Bay" },
  { src: "BBF.webp", alt: "Bamboo Forest" },
  { src: "DL.webp", alt: "Danxia Landform" },
  { src: "HLB.webp", alt: "Ha Long Bay" },
  { src: "PQI.webp", alt: "Phu Quok Island" },
];

// Pagination Configuration 
const imagesPerPage = 9;
let currentPage = 1;

// Function to display images for the current page
function displayImages(page) {
  const photoGrid = document.getElementById('photoGrid');
  photoGrid.innerHTML = ''; // Clear existing images

  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  // Loop through images for the current page
  for (let i = startIndex; i < endIndex && i < images.length; i++) {
    const imgData = images[i];

    if (imgData.src) {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'w3-third';
      imgDiv.innerHTML = `
        <img src="${imgData.src}" alt="${imgData.alt}" onclick="onClick(this)" class="portfolio-image">
      `;
      photoGrid.appendChild(imgDiv);
    } else {
      // Placeholder for missing images 
      const placeholderDiv = document.createElement('div');
      placeholderDiv.className = 'w3-third';
      photoGrid.appendChild(placeholderDiv);
    }
  }
}

// Function to generate pagination buttons
function generatePagination() {
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Previous Button 
  const prevButton = createPaginationButton('«', 1, currentPage > 1);
  paginationDiv.appendChild(prevButton);

  // Page Number Buttons
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    const pageButton = createPaginationButton(i, i, true, isActive);
    paginationDiv.appendChild(pageButton);
  }

  // Next Button 
  const nextButton = createPaginationButton('»', totalPages, currentPage < totalPages);
  paginationDiv.appendChild(nextButton);
}

// Function to create individual pagination buttons
function createPaginationButton(text, page, enabled = true, isActive = false) {
  const button = document.createElement('a');
  button.href = '#';
  button.textContent = text;
  button.className = 'w3-bar-item w3-button w3-hover-black' + (isActive ? ' w3-black' : '');

  if (enabled) {
    button.addEventListener('click', () => {
      // Fade-out effect before page change
      document.getElementById('photoGrid').classList.add('w3-animate-opacity');

      setTimeout(() => {
        currentPage = page;
        displayImages(currentPage);
        generatePagination();

        // Remove fade-out for smooth transition
        document.getElementById('photoGrid').classList.remove('w3-animate-opacity');
      }, 300); 
    });
  } else {
    button.classList.add('w3-disabled');
  }

  return button;
}

// Function to open the image modal 
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  document.getElementById("caption").innerHTML = element.alt;
}

// Initialize the page 
displayImages(currentPage);
generatePagination();