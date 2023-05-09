 // Definir la variable questions fuera del onload
 let questions;
        
 // Obtener las preguntas del archivo JSON
 const request = new XMLHttpRequest();
 request.open("GET", "questions.json");
 request.onload = function() {
     if (request.status === 200) {
         questions = JSON.parse(request.responseText);
         showQuestion(questions[0], 0, questions.length);
     }
 };
 request.send();

 // Función para mostrar la pregunta actual
 function showQuestion(question, index, total) {
     const questionDiv = document.querySelector('.question');
     let questionTitle = "";
     if (question.tipo === "riesgo") {
         questionTitle = "Factores de riesgo";
     } else if (question.tipo === "proteccion") {
         questionTitle = "Factores de proteccion";
     }
     let questionNumber = index % 8 + 1; // Obtiene el número de la pregunta actual
     questionDiv.innerHTML = `<h2>${questionTitle} </h2><p>${question.pregunta}</p><p style="font-weight: bold; margin-top:15%">Pregunta ${questionNumber} de 8</p>`;
     const continueBtn = document.getElementById('continue-btn');
     const backBtn = document.getElementById('back-btn');
     continueBtn.onclick = function() {
         backBtn.style.display = "block"; // Mostrar el botón de regresar
         if (index < total-1) {
             showQuestion(questions[index+1], index+1, total);
         } else {
             showResults();
         }
     };
     backBtn.onclick = function() {
         if (index > 0) {
             showQuestion(questions[index-1], index-1, total);
         }
     };
 }

 // Función para mostrar los resultados finales
 function showResults() {
     const questionDiv = document.querySelector('.question');
     questionDiv.innerHTML = `<p>¡Felicidades! Has terminado la prueba.</p><p>${scoreMessage}</p>`;
 }
