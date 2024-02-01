// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// import lazyframe from "lazyframe";
// // Passing a selector
// lazyframe(".lazyframe");

// // Passing a nodelist
// let elements = document.querySelectorAll(".lazyframe");
// lazyframe(elements);


document.addEventListener("DOMContentLoaded", function () {
  var videoItems = document.querySelectorAll('.video__item');

  videoItems.forEach(function (videoItem) {
      var video = videoItem.querySelector('.video__video');
      var progressBar = videoItem.querySelector('.video__progress-bar');

      video.addEventListener('timeupdate', function () {
          var progress = (video.currentTime / video.duration) * 100;
          progressBar.style.width = progress + '%';
      });

      video.addEventListener('ended', function () {
          video.classList.remove('active');
          videoItem.classList.remove('active');
      });

      videoItem.addEventListener('click', function (event) {
          // Pause all other videos
          videoItems.forEach(function (otherVideoItem) {
              var otherVideo = otherVideoItem.querySelector('.video__video');

              if (otherVideo !== video && !otherVideo.paused) {
                  otherVideo.pause();
                  otherVideo.muted = true; // Mute other videos
                  otherVideo.classList.remove('active');
                  otherVideoItem.classList.remove('active');
              }
          });

          // Toggle play/pause for the clicked video
          if (video.paused) {
              video.play();
              video.muted = false; // Unmute the active video
              video.classList.add('active');
              videoItem.classList.add('active');
          } else {
              video.pause();
              video.muted = true; // Mute when paused
              video.classList.remove('active');
              videoItem.classList.remove('active');
          }

          event.stopPropagation(); // Prevents the click event from propagating to the parent elements
      });
  });
});


// document.addEventListener("DOMContentLoaded", function () {
//     var telInputs = document.querySelectorAll('.tel');

//     function mask(event) {
//         var keyCode = event.keyCode;
//         var pos = this.selectionStart;

//         if (pos < 6) {
//             if (event.preventDefault) {
//                 event.preventDefault();
//             } else {
//                 event.returnValue = false;
//             }
//         }

//         var matrix = "+38 (0__) ___ __ __";
//         var i = 0;
//         var val = this.value.replace(/\D/g, "");
//         var new_value = matrix.replace(/[_\d]/g, function(a) {
//             return i < val.length ? (/\d/.test(val.charAt(i)) ? val.charAt(i++) : "_") : a;
//         });

//         this.value = new_value;

//         if (!/\d/.test(String.fromCharCode(keyCode))) {
//             this.setSelectionRange(pos, pos); // Устанавливаем курсор в конец введенных цифр
//         }
//     }

//     function hideMaskAndShowPlaceholder(input) {
//         if (/^\+38 \(0{2}\)\s{3}_\s{2}_\s{2}$/.test(input.value)) {
//             input.value = "";
//             input.placeholder = input.getAttribute("placeholder");
//         }
//     }

//     function showMaskAndHidePlaceholder(input) {
//         input.placeholder = "";
//     }

//     function showMaskImmediately(event) {
//         var input = this;
//         input.placeholder = "";
//         mask.call(input, event);
//     }

//     function makeStaticPartsReadonly(input) {
//         // Находим позиции символов +38 0 в строке
//         var positions = [4, 5, 10, 13, 16, 19];
//         // Делаем эти части инпута readonly
//         positions.forEach(function (position) {
//             input.setSelectionRange(position, position);
//         });
//     }

//     telInputs.forEach(function(telInput) {
//         telInput.addEventListener("input", function(event) { mask.call(telInput, event); }, false);
//         telInput.addEventListener("focus", function() { showMaskAndHidePlaceholder(telInput); makeStaticPartsReadonly(telInput); }, false);
//         telInput.addEventListener("blur", function() { hideMaskAndShowPlaceholder(telInput); }, false);
//         telInput.addEventListener("click", function(event) { showMaskImmediately.call(telInput, event); }, false);
//     });

//     document.addEventListener("click", function(event) {
//         var clickedElement = event.target;
        
//         if (!Array.from(telInputs).some(input => input.contains(clickedElement))) {
//             hideMaskAndShowPlaceholder(telInputs[0]);  // Change this line to set placeholder for a specific input
//         }
//     });
// });




// international tel input ======================================
const inputPhone = document.querySelector("#phone");
const output = document.querySelector("#output");
if (inputPhone) {
    const iti = window.intlTelInput(inputPhone, {
    initialCountry: 'ua',
    showSelectedDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/19.2.3/js/utils.js",
      
      
  });
  const handleChange = () => {
    let text;
    if (inputPhone.value) {
      text = iti.isValidNumber()
        ? "Номер вірний: " + iti.getNumber()
        : "Невірно введений номер - будь ласка, спробуйте ще раз";
    } else {
      text = "Будь ласка, введіть номер телефону";
    }
    const textNode = document.createTextNode(text);
    output.innerHTML = "";
    output.appendChild(textNode);
  };
  
  // listen to "keyup", but also "change" to update when the user selects a country
  inputPhone.addEventListener('change', handleChange);
  inputPhone.addEventListener('keyup', handleChange);
}



const splitTextElements = document.querySelectorAll('.split-text');

if (splitTextElements.length > 0) {
  const splitText = new SplitType('.split-text', { types: 'lines' });

  window.addEventListener("resize", function() {
    splitText.split();
  });
}
