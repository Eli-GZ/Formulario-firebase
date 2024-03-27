const firebaseConfig = { 
    apiKey: "AIzaSyAcqu1Ld6R3Qh4bzMsPOkV3nuWJOgNWrBs",
    authDomain: "datos-de-formulario-3d19f.firebaseapp.com",
    projectId: "datos-de-formulario-3d19f",
    storageBucket: "datos-de-formulario-3d19f.appspot.com",
    messagingSenderId: "171595869450",
    appId: "1:171595869450:web:0d20f51dbc1f6ae7b49ef3",
    measurementId: "G-832D0W88TD"  
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit', (event) => {
  event.preventDefault()

  //validar campo nombre
  let nombreEntrada = document.getElementById('name');
  let nombreError = document.getElementById('nameError');

  if (nombreEntrada.value.trim() === '') {
    nombreError.textContent = 'Por favor, ingresa tu nombre';
    nombreError.classList.add('error-message');
  } else {
    nombreError.textContent = '';
    nombreError.classList.remove('error-message');
  }

  //validar correo electronico
  let entradaMail = document.getElementById('email');
  let errorMail = document.getElementById('emailError');
  let patternMail = /^[^\s@]+@[^\s@]+\.[^[\s@]+$/;  //Patron

  if (!patternMail.test(entradaMail.value)) {
    errorMail.textContent = 'Por favor, ingresa tu email';
    errorMail.classList.add('error-message');
  } else {
    errorMail.textContent = '';
    errorMail.classList.remove('error-message');
  }


  //validar la contraseña
  let contrasenaEntrada = document.getElementById('password');
  let contrasenaError = document.getElementById('passwordError');
  let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; //patron

  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas, minúsculas y caracteres especiales';
    contrasenaError.classList.add('error-message');
  } else {
    contrasenaError.textContent = '';
    contrasenaError.classList.remove('error-message');
  }

  //si todos los campos son validos enviar formulario

  if(!nombreError.textContent && !errorMail.textContent && !contrasenaError.textContent){

    //BACK-END

    db.collection("users").add({
      nombre: nombreEntrada.value,
      email: entradaMail.value,
      password: contrasenaEntrada.value
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });


    alert('Formulario enviado')
    document.getElementById('formulario').reset();
  }

})