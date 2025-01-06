document.addEventListener("DOMContentLoaded", function () {
  const noteContainer = document.getElementById("note-container");
  const newNoteButton = document.getElementById("new-note-button");
  const colorForm = document.getElementById("color-form");
  const colorInput = document.getElementById("color-input");

  let noteColor = localStorage.getItem("noteColor") || "#ffffff"; // Stores the selected note color from the form. Default is white.
  let noteIdCounter = parseInt(localStorage.getItem("noteIdCounter")) || 0; // Counter for assigning unique IDs to new notes.

  // Helper function to read notes from local storage
  function readNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    return notes;
  }

  // Helper function to save notes to local storage
  function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Function to load notes from local storage and display them.
  function loadNotes() {
    const notes = readNotes();

    // Iterate over each note in the array.
    for (const note of notes) {
      const id = note.id; // Get the note's unique ID.
      const content = note.content; // Get the note's content.
      const color = note.color; // Get the note's background color.

      // Create a new textarea element for the note.
      const noteElement = document.createElement("textarea");
      noteElement.setAttribute("data-note-id", id.toString()); // Set the note's ID as a data attribute.
      noteElement.value = content; // Set the note's content.
      noteElement.className = "note"; // Assign the "note" class to the textarea.
      noteElement.style.backgroundColor = color; // Set the note's background color.

      // Append the note element to the note container.
      noteContainer.appendChild(noteElement);
    }
  }

  // Function to add a new note.
  function addNewNote() {
    const id = noteIdCounter;
    const content = `Note ${id}`;

    const note = document.createElement("textarea");
    note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
    note.value = content; // Sets the note ID as value.
    note.className = "note"; // Sets a CSS class.
    note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
    noteContainer.appendChild(note); // Appends it to the note container element as its child.

    noteIdCounter++; // Increments the counter since the ID is used for this note.

    // Retrieve the existing notes from local storage and parse them into an array.
    const notes = readNotes();
    // Create a new note object with the current ID, content, and color.
    const newNote = {
      id: id,
      content: content,
      color: noteColor,
    };
    // Add the new note to the array of notes.
    notes.push(newNote);
    // Save the updated array of notes back to local storage.
    saveNotes(notes);
    // Update the note ID counter in local storage.
    localStorage.setItem("noteIdCounter", noteIdCounter);
  }

  // Event listener for the color form submission.
  colorForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default event.

    const newColor = colorInput.value.trim(); // Removes whitespaces.

    const notes = document.querySelectorAll(".note");
    for (const note of notes) {
      note.style.backgroundColor = newColor;
    }

    // Update the color of each note in the array from local storage.
    const notesArray = readNotes();
    for (const note of notesArray) {
      note.color = newColor;
    }

    // Save the updated array of notes back to local storage.
    saveNotes(notesArray);

    colorInput.value = ""; // Clears the color input field after from submission.

    noteColor = newColor; // Updates the stored note color with the new selection.

    // Update the note color in the local storage.
    localStorage.setItem("noteColor", noteColor);
  });

  // Event listener for the new note button.
  newNoteButton.addEventListener("click", function () {
    addNewNote();
  });

  // Event listener for double-clicking on a note to remove it.
  document.addEventListener("dblclick", function (event) {
    if (event.target.classList.contains("note")) {
      const noteId = event.target.getAttribute("data-note-id"); // Get the note's ID.
      event.target.remove(); // Removes the clicked note.

      // Retrieve the existing notes from local storage and parse them into an array.
      const notes = readNotes();
      // Filter out the note with the matching ID.
      const updatedNotes = [];
      for (const note of notes) {
        if (note.id.toString() !== noteId) {
          updatedNotes.push(note);
        }
      }
      // Save the updated array of notes back to local storage.
      saveNotes(updatedNotes);
    }
  });

  noteContainer.addEventListener(
    "blur",
    function (event) {
      if (event.target.classList.contains("note")) {
        const noteId = event.target.getAttribute("data-note-id");
        const updatedContent = event.target.value; // Get the updated content.
        const notes = readNotes();
        // Find the note with the matching ID and update its content.
        for (const note of notes) {
          if (note.id.toString() === noteId) {
            note.content = updatedContent;
            break;
          }
        }
        saveNotes(notes);
      }
    },
    true
  );

  window.addEventListener("keydown", function (event) {
    /* Ignores key presses made for color and note content inputs. */
    if (event.target.id === "color-input" || event.target.type === "textarea") {
      return;
    }

    /* Adds a new note when the "n" key is pressed. */
    if (event.key === "n" || event.key === "N") {
      addNewNote(); // Adds a new note.
    }
  });
  // Load notes when the page is loaded.
  loadNotes();
});
