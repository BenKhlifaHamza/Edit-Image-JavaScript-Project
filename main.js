let upload      = document.getElementById('upload');
let saturate    = document.getElementById('saturate');
let contrast    = document.getElementById('contrast');
let brightness  = document.getElementById('brightness');
let sepia       = document.getElementById('sepia');
let grayscale   = document.getElementById('grayscale');
let blur        = document.getElementById('blur');
let huerotate   = document.getElementById('huerotate');
let download    = document.getElementById('download');
let photo       = document.getElementById('photo');

let btnReset    = document.querySelector('.btnReset');
let imgBox      = document.querySelector('.imgBox');

//====================On Load Page====================//
window.onload   = function() {
    download.style.display = "none";
    btnReset.style.display = "none";
    imgBox.style.display = "none";
}

//====================Functio Reset====================//
function reset(){
    photo.style.filter = '';
    saturate  .value = 100;
    contrast  .value = 100;
    brightness.value = 100;
    sepia     .value = 100;
    grayscale .value = 0;
    blur      .value = 0;
    huerotate .value = 0;
}

//====================Reset Button====================//
btnReset.addEventListener('click', reset);

//====================Upload Button====================//
upload.onchange = function() {
    reset();
    download.style.display = "block";
    btnReset.style.display = "block";
    imgBox.style.display   = "block";

    let fileReader     = new FileReader();  
    fileReader.readAsDataURL(upload.files[0]);
    fileReader.onload  = function() {  
        photo.src      = fileReader.result;
    }
}

//====================Functio For Add Filtres To Image====================//
let filtres = document.querySelectorAll("ul li input");

filtres.forEach( fltr =>{
    fltr.addEventListener('input',function(){
        photo.style.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${huerotate.value}deg)`
    });
});

//====================Download Button====================//
download.addEventListener('click', function() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = new Image();

    img.src = photo.src; // Load the image source into the img element

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply the same filters to the canvas
        ctx.filter = photo.style.filter;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Convert canvas content to a Blob and trigger download
        canvas.toBlob(function(blob) {
            let url = URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.href = url;
            let randomString = Math.random().toString(36).substring(7);
            link.download = `HBK_filtered_image_${randomString}.png`; // Change the filename as needed
            link.click();

            // Clean up
            URL.revokeObjectURL(url);
        }, 'image/png');
    };
});


/* =====================CHAT GPT CODE================== */

// let upload           = document.getElementById('upload');
// let saturateInput    = document.getElementById('saturate');
// let contrastInput    = document.getElementById('contrast');
// let brightnessInput  = document.getElementById('brightness');
// let sepiaInput       = document.getElementById('sepia');
// let grayscaleInput   = document.getElementById('grayscale');
// let blurInput        = document.getElementById('blur');
// let hueInput         = document.getElementById('huerotate');
// let download         = document.getElementById('download');
// let photo            = document.getElementById('photo');

// let btnReset         = document.querySelector('.btnReset');
// let imgBox           = document.querySelector('.imgBox');

// let originalImageSrc = "";  // Store the original image source

// window.onload = function() {
//     download.style.display = "none";
//     btnReset.style.display = "none";
//     imgBox.style.display    = "none";
// };

// upload.onchange = function() {
//     download.style.display = "block";
//     btnReset.style.display = "block";
//     imgBox.style.display   = "block";

//     let fileReader       = new FileReader();
//     fileReader.readAsDataURL(upload.files[0]);

//     fileReader.onload    = function() {
//         photo.src        = fileReader.result;
//         originalImageSrc = fileReader.result;
//     };
// };

// function applyFilters() {
//     let filters = "";
//     filters += `saturate(${saturateInput.value}%) `;
//     filters += `contrast(${contrastInput.value}%) `;
//     filters += `brightness(${brightnessInput.value}%) `;
//     filters += `sepia(${sepiaInput.value}%) `;
//     filters += `grayscale(${grayscaleInput.value}) `;
//     filters += `blur(${blurInput.value}px) `;
//     filters += `hue-rotate(${hueInput.value}deg)`;

//     photo.style.filter = filters;
// }

// saturateInput.addEventListener('input', applyFilters);
// contrastInput.addEventListener('input', applyFilters);
// brightnessInput.addEventListener('input', applyFilters);
// sepiaInput.addEventListener('input', applyFilters);
// grayscaleInput.addEventListener('input', applyFilters);
// blurInput.addEventListener('input', applyFilters);
// hueInput.addEventListener('input', applyFilters);

// btnReset.addEventListener('click', function() {
//     photo.src = originalImageSrc;
//     photo.style.filter = "";
// });

