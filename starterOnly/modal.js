// Fonction pour la navigation (existant)
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground"); // Sélectionne l'arrière-plan de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); // Sélectionne tous les boutons pour ouvrir la modale
const formData = document.querySelectorAll(".formData"); // Sélectionne tous les éléments de formulaire

// Ajouter des écouteurs d'événements à chaque bouton pour ouvrir la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour ouvrir la modale
function launchModal() {
  form.reset(); // Réinitialiser les champs du formulaire
  clearErrors(); // Effacer les erreurs précédentes
  form.style.display = "block"; // Afficher le formulaire
  confirmation.classList.add("invisible"); // Masquer le message de confirmation
  modalbg.style.display = "block"; // Afficher la modale
}

// Sélectionne et stocke les éléments nécessaires pour le formulaire et les autres parties
const form = document.querySelector("form"); // Sélectionne le formulaire
const firstName = document.getElementById("firstNameUser"); // Sélectionne le champ prénom
const lastName = document.getElementById("lastNameUser"); // Sélectionne le champ nom
const email = document.getElementById("emailUser"); // Sélectionne le champ email
const birthdate = document.getElementById("birthdateUser"); // Sélectionne le champ date de naissance
const numContests = document.getElementById("quantityGameparticipated"); // Sélectionne le champ nombre de concours
const termsCheckbox = document.getElementById("checkbox1"); // Sélectionne la case à cocher des conditions
const radios = document.querySelectorAll('[name="location"]'); // Sélectionne les boutons radio pour la localisation
const confirmation = document.querySelector(".confirmation"); // Sélectionne le message de confirmation
const modalcloseBtn = document.querySelector(".close-confirmation"); // Sélectionne le bouton de fermeture de la confirmation

// Fonction pour fermer la modale
function closeModal() {
  modalbg.style.display = "none"; // Masquer la modale
}

// Détection du clic sur l'icône de fermeture de la modale
const modalClose = document.querySelector(".close"); // Sélectionne l'icône de fermeture de la modale
modalClose.addEventListener("click", function () {
  console.log("icône cliquée");
  closeModal(); // Appeler la fonction pour fermer la modale
});

// Détection du clic sur le bouton de fermeture de la confirmation
modalcloseBtn.addEventListener("click", function () {
  console.log("bouton de fermeture cliqué");
  closeModal(); // Appeler la fonction pour fermer la modale
});

// Fonction pour valider le prénom et le nom avec regex
function validateName(input) {
  const namePattern = /^[A-Za-z-]+$/; // Regex pour accepter uniquement les lettres et les tirets
  if (!namePattern.test(input.value) || input.value.trim().length < 2) {
    input.nextElementSibling.classList.remove("invisible"); // Afficher le message d'erreur
    return false;
  } else {
    input.nextElementSibling.classList.add("invisible"); // Masquer le message d'erreur
    return true;
  }
}

// Fonction pour valider l'email avec regex
function validateEmail(input) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regex pour valider le format email
  if (!emailPattern.test(input.value.trim())) {
    input.nextElementSibling.classList.remove("invisible"); // Afficher le message d'erreur
    return false;
  } else {
    input.nextElementSibling.classList.add("invisible"); // Masquer le message d'erreur
    return true;
  }
}

// Fonction pour valider la date de naissance
function validateBirthdate(input) {
  if (input.value.trim() === "") {
    input.nextElementSibling.classList.remove("invisible"); // Afficher le message d'erreur
    return false;
  } else {
    input.nextElementSibling.classList.add("invisible"); // Masquer le message d'erreur
    return true;
  }
}

// Fonction pour valider le nombre de tournois
function validateNumContests(input) {
  const numValue = input.value.trim();
  if (numValue === "" || isNaN(numValue) || numValue < 0 || numValue > 99) {
    input.nextElementSibling.classList.remove("invisible"); // Afficher le message d'erreur
    return false;
  } else {
    input.nextElementSibling.classList.add("invisible"); // Masquer le message d'erreur
    return true;
  }
}

// Fonction pour valider la sélection d'une localisation
function validateLocation() {
  const selectedLocation = document.querySelector('input[name="location"]:checked');
  if (!selectedLocation) {
    radios[0].closest(".formData").querySelector(".error").classList.remove("invisible"); // Afficher le message d'erreur
    return false;
  } else {
    radios[0].closest(".formData").querySelector(".error").classList.add("invisible"); // Masquer le message d'erreur
    return true;
  }
}

// Fonction pour valider l'acceptation des conditions
function validateTerms() {
  if (!termsCheckbox.checked) {
    termsCheckbox.closest(".formData").querySelector(".error").classList.remove("invisible"); // Afficher le message d'erreur
    return false;
  } else {
    termsCheckbox.closest(".formData").querySelector(".error").classList.add("invisible"); // Masquer le message d'erreur
    return true;
  }
}

// Ajout des écouteurs d'événements pour les champs de formulaire pour validation en temps réel
firstName.addEventListener('input', function() {
  validateName(this); // Valider le prénom à chaque entrée
});

lastName.addEventListener('input', function() {
  validateName(this); // Valider le nom à chaque entrée
});

email.addEventListener('input', function() {
  validateEmail(this); // Valider l'email à chaque entrée
});

birthdate.addEventListener('input', function() {
  validateBirthdate(this); // Valider la date de naissance à chaque entrée
});

numContests.addEventListener('input', function() {
  validateNumContests(this); // Valider le nombre de tournois à chaque entrée
});

// Fonction pour effacer les messages d'erreur
function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => {
    error.classList.add("invisible"); // Masquer tous les messages d'erreur
  });
}

// Détection de la validation du formulaire + trim permet de prendre une valeur sans espacements
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêcher l'envoi par défaut du formulaire
  console.log("formulaire envoyé");

  // Effacer les erreurs précédentes
  clearErrors();

  // Valider les champs de texte individuels (prénom, nom, email, etc.)
  let isValid = true;
  isValid = validateName(firstName) && isValid; // Valider le prénom
  isValid = validateName(lastName) && isValid; // Valider le nom
  isValid = validateEmail(email) && isValid; // Valider l'email
  isValid = validateBirthdate(birthdate) && isValid; // Valider la date de naissance
  isValid = validateNumContests(numContests) && isValid; // Valider le nombre de tournois
  isValid = validateLocation() && isValid; // Valider la localisation
  isValid = validateTerms() && isValid; // Valider l'acceptation des conditions

  if (isValid) {
    console.log("succès");
    form.style.display = "none"; // Masquer le formulaire
    confirmation.classList.remove("invisible"); // Afficher le message de confirmation
  }
});
