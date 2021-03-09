import axios from "axios";
import simpleForms from "simpleforms.js";

// Window on scroll logic
window.addEventListener("scroll", function() {
    animateHeader();
}, false);

function animateHeader() {
    var scrollPos = window.scrollY;
    let headerElement = document.getElementById("headerCon");
    let mobileNavScrolled = document.getElementById("mobileNavCon");

    if(scrollPos > 30) {
        headerElement.classList.add("scrolled");
        mobileNavScrolled.classList.add("scrolled");
    } else {
        headerElement.classList.remove("scrolled");
        mobileNavScrolled.classList.remove("scrolled");
    }
}

let mobileNavCon = document.getElementById("mobileNavCon");
let toggleNavBtn = document.getElementById("toggleNavBtn");
toggleNavBtn.addEventListener("click", function() {
    mobileNavCon.classList.toggle("active");
});


// Newsletter form
let myForm = document.getElementById("newsletterForm");

const newsletterForm = new simpleForms(myForm, {});
myForm.addEventListener("submit", function(event) {
  event.preventDefault();

  //reset msg
  const responseMsgP = document.getElementById("responseMsgP");
  responseMsgP.innerText = "";
  
  newsletterForm.submit()
  .then((response) => {
    if(!response.failed) {

        // Send to our bg
        axios.post("http://localhost:4000/v1/newsletter", {
            name: response.inputs[0].nameInp,
            email: response.inputs[1].emailInp
        })
        .then(() => {
            responseMsgP.innerText = "Welcome to the GRIT newsletter!";
        })
        .catch((err) => {
            console.log(err);
        });

    }
  })
  .catch((error) => {
    if(error.failed) {
        responseMsgP.innerText = "Make sure to enter a valid name and email!";
    }
  });
});