const readline = require('readline');
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction qui va afficher toutes les tâches du fichier tasks.json
function displayTasks() {
  const jsonData = loadJSON();
  console.log("\nYour tasks:");
  for (const [index, task] of jsonData.entries()) {
    console.log(index + 1 + ': ' + task.name);
  }

  // Après l'affichage des tâches, on retourne au menu sans redemander "Press ok"
  run(); // Appel à run() pour revenir au menu principal
}

function addTask() {
    rl.question('Your choice: ', (answer) => {
      console.log(answer)
    });
  }

function deleteTask() {
  const jsonData = loadJSON(); // Charger les tâches

  // Afficher les tâches disponibles pour suppression
  console.log("\nYour tasks:");
  for (const [index, task] of jsonData.entries()) {
    console.log(index + 1 + ': ' + task.name);
  }

  // Demander à l'utilisateur de choisir la tâche à supprimer
  rl.question('Which task do you want to delete (enter number): ', (answer) => {
    const index = parseInt(answer);
    if (index > 0 && index <= jsonData.length) {
      jsonData.splice(index - 1, 1); // Supprimer la tâche
      console.log('Task deleted!');
      saveInJSON(jsonData); // Sauvegarder les tâches mises à jour
      run(); // Retourner au menu après suppression
    } else {
      console.log("This task doesn't exist!");
      deleteTask(); // Demander à nouveau si la tâche n'existe pas
    }
  });
}

function MarkAsDone() {
  // À compléter si nécessaire
  function markAsDone() {
    const jsonData = loadJSON();
  
    // Afficher les tâches disponibles pour markAsDone
    console.log("\nYour tasks:");
    for (const [index, task] of jsonData.entries()) {
      console.log(index + 1 + ': ' + task.name);
    }
  
    rl.question('\nWhich task do you want to mark as Done: ', (answer) => {
      const index = parseInt(answer);
  
      // Vérification que l'index est valide
      if (index > 0 && index <= jsonData.length) {
        // Marquer la tâche comme faite
        jsonData[index - 1].isDone = true; // Ajuster l'index pour correspondre à 0-based
        console.log('Task marked as done!');
        saveInJSON(jsonData); // Sauvegarder les modifications
        run(); // Revenir au menu principal
      } else {
        console.log("This task doesn't exist! Please choose a valid task.");
        run(); // Retourner au menu principal au lieu de rappeler askQuestion
      }
    });
  }
}

function saveInJSON(jsonData) {
  fs.writeFileSync("tasks.json", JSON.stringify(jsonData, null, 2));
}

function loadJSON() {
  const data = fs.readFileSync("tasks.json", "utf8");
  try {
    if (data.trim() === '') {
      console.log('Le fichier JSON est vide');
      return []; // Retourner un tableau vide si le fichier est vide
    } else {
      return JSON.parse(data); // Retourner les données du fichier
    }
  } catch (err) {
    console.log('Le fichier JSON est invalide', err.message);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

const menu = () => {
  return "Welcome to your task manager, Press:\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\nYour choice: ";
};

function run() {
  rl.question(menu(), (answer) => {
    answer = parseInt(answer);
    switch (answer) { 
      case 1:
        displayTasks(); // Afficher les tâches
        break;
      case 2:
        addTask(); // Ajouter une tâche
        break;
      case 3:
        deleteTask(); // Supprimer une tâche
        break;
      case 4:
        MarkAsDone(); // Marquer une tâche comme faite (à compléter)
        break;
      case 5:
        rl.close(); // Fermer l'application
        break;
      default:
        console.log("Invalid choice");
        run(); // Redemander le choix si l'entrée est invalide
    }
  });
}

run(); // Lancer le programme