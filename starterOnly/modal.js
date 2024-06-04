function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Issue 1
//Je sélectionne et je stocke la DIV span close
const modalClose = document.querySelector(".close");
//J'ajoute un écouteur d'évènement afin de répérer quand le bouton a été cliqué.
modalClose.addEventListener("click", function () {
  console.log("icone cliquée");
  //Je fais disparaitre la fenetre modale au clic sur l'icone
  modalbg.style.display = "none";
});

// 1 - Je sélectionne et stocke tous les éléments nécessaires
const form = document.querySelector("form");
const firstName = document.getElementById("firstNameUser");
const lastName = document.getElementById("lastNameUser");
const email = document.getElementById("emailUser");
const birthdate = document.getElementById("birthdateUser");
const numContests = document.getElementById("quantityGameparticipated");
const termsCheckbox = document.getElementById("checkbox1");
const radios = document.querySelectorAll('[name="location"]');
const titre = document.querySelector(".modal-body");
const confirmation = document.querySelector(".confirmation");
const modalcloseBtn = document.querySelector(".close-confirmation");


// Fonction pour fermer la modale
function closeModal() {
  modalbg.style.display = "none";
}

// Détection du clic du bouton 'fermer' 
modalcloseBtn.addEventListener("click", function () {
  console.log("icone cliquée");
  closeModal();
});



// Je détecte la validation du formulaire + trim permet de prendre une valeur sans espacements
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("formulaire envoyé");

  //Je récupère les valeurs de chacun des inputs
  const firstNameValue = firstName.value.trim();
  console.log("Prénom:", firstNameValue);
  const lastNameValue = lastName.value.trim();
  console.log("Nom:", lastNameValue);
  const emailValue = email.value.trim();
  const birthdateValue = birthdate.value.trim();
  console.log("Date de naissance:", birthdateValue);
  console.log("Email:", emailValue);
  const numContestsValue = numContests.value.trim();
  console.log("Nombre de concours:", numContestsValue);
  // La propriété 'checked' retourne 'true' si la case est cochée, et 'false' sinon.
  const termsChecked = termsCheckbox.checked;
  console.log("Conditions générales acceptées:", termsChecked);
  // Récupère la valeur du bouton radio sélectionné pour le champ 'location'. Si aucun bouton n'est sélectionné, 'Aucune sélection' est enregistré.
  const selectedLocation = document.querySelector(
    'input[name="location"]:checked'
  );
  console.log(
    "Location choisie:",
    selectedLocation ? selectedLocation.value : "Aucune sélection"
  );

  // Fonction qui permet de vérifier si le mail contient @ et un .
  function validEmail(email) {
    return email.includes("@") && email.includes(".");
  }

  // Parcours toutes les classes comprenant .error + Masque tous les messages d'erreur avant de valider le formulaire
  function clearErrors() {
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
      error.classList.add("invisible");
    });
  }
  // Appel de clearErrors pour masquer les erreurs précédentes
  clearErrors();

  // Vérification des champs de texte individuels (prénom, nom, email)
  // Ces champs ont une structure simple où le message d'erreur est directement
  // après l'élément d'entrée. Utilisation de nextElementSibling pour accéder au message d'erreur.
  // Je vérifie les informations de l'utilisateur
  if (firstNameValue.length < 2) {
    firstName.nextElementSibling.classList.remove("invisible");
  } else if (lastNameValue.length < 2) {
    lastName.nextElementSibling.classList.remove("invisible");
  } else if (!validEmail(emailValue)) {
    console.log("erreur email");
    email.nextElementSibling.classList.remove("invisible");
  } else if (birthdateValue === "") {
    birthdate.nextElementSibling.classList.remove("invisible");
  } else if (
    numContestsValue === "" ||
    isNaN(numContestsValue) ||
    numContestsValue < 0 ||
    numContestsValue > 99
  ) {
    console.log("erreur nombre de concours");
    numContests.nextElementSibling.classList.remove("invisible");
  } else if (!selectedLocation) {
    // Vérification de la localisation sélectionnée
    // Les boutons radio et les cases à cocher partagent un message d'erreur commun.
    // Utilisation de closest pour trouver le parent formData et querySelector pour trouver
    // le message d'erreur à l'intérieur de ce parent.
    console.log("erreur location");
    radios[0]
      .closest(".formData")
      .querySelector(".error")
      .classList.remove("invisible");
  } else if (!termsChecked) {
    console.log("erreur conditions");
    termsCheckbox
      .closest(".formData")
      .querySelector(".error")
      .classList.remove("invisible");
  } else {
    console.log("succès");
    form.style.display = "none"; // Masquer le formulaire
    confirmation.classList.remove("invisible"); // Afficher le message de confirmation
  }
});
