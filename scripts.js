document.addEventListener("DOMContentLoaded", function () {
  const exerciseForm = document.getElementById("exerciseForm");
  const exerciseList = document.getElementById("exerciseList");

  // Load exercises from local storage on page load
  const savedExercises = JSON.parse(localStorage.getItem("exercises")) || [];
  savedExercises.forEach((exercise) => renderExercise(exercise));

  exerciseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form input values
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    // Create exercise object
    const exercise = { question, answer };

    // Render and save exercise
    renderExercise(exercise);
    saveExercise(exercise);

    // Clear form inputs
    exerciseForm.reset();
  });

  function renderExercise(exercise) {
    // Create exercise element
    const exerciseItem = document.createElement("div");
    exerciseItem.classList.add("exercise-item");
    exerciseItem.innerHTML = `
            <p><strong>Question:</strong> ${exercise.question}</p>
            <p><strong>Answer:</strong> ${exercise.answer}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;

    // Add event listeners for delete and edit buttons
    const deleteBtn = exerciseItem.querySelector(".delete-btn");
    const editBtn = exerciseItem.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", function () {
      deleteExercise(exercise);
      exerciseList.removeChild(exerciseItem);
    });

    editBtn.addEventListener("click", function () {
      editExercise(exercise);
    });

    // Add exercise to the list
    exerciseList.appendChild(exerciseItem);
  }

  function saveExercise(exercise) {
    // Get existing exercises from local storage
    const savedExercises = JSON.parse(localStorage.getItem("exercises")) || [];

    // Add the new exercise
    savedExercises.push(exercise);

    // Save updated exercises to local storage
    localStorage.setItem("exercises", JSON.stringify(savedExercises));
  }

  function deleteExercise(exercise) {
    // Get existing exercises from local storage
    const savedExercises = JSON.parse(localStorage.getItem("exercises")) || [];

    // Remove the exercise from the array
    const updatedExercises = savedExercises.filter(
      (savedExercise) =>
        savedExercise.question !== exercise.question ||
        savedExercise.answer !== exercise.answer
    );

    // Save updated exercises to local storage
    localStorage.setItem("exercises", JSON.stringify(updatedExercises));
  }

  function editExercise(exercise) {
    // You can implement an edit functionality based on your requirements
    // For simplicity, you can clear the form and pre-fill it with the exercise details
    document.getElementById("question").value = exercise.question;
    document.getElementById("answer").value = exercise.answer;

    // Remove the exercise from the list and local storage
    deleteExercise(exercise);
    const exerciseItem = exerciseList.querySelector(
      `.exercise-item:contains('${exercise.question}')`
    );
    exerciseList.removeChild(exerciseItem);
  }

  // Custom :contains() jQuery-like selector function
  // This is a simple implementation and may not cover all cases
  HTMLElement.prototype.containsText = function (text) {
    return this.innerText.includes(text);
  };
});
