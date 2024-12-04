const readline = require('readline');
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let doneOrNot = ''

//Fonction qui va afficher toutes les tâches du fichier tasks.json
function displayTasks() {
  const jsonData = loadJSON()
  /*for(const tasks of jsonData){
    console.log(tasks.name)
  }*/
  console.log("\nYour tasks:");
  for(const [index, task] of jsonData.entries()){
    if(task.isDone === true){
      doneOrNot = ' ✅'
    }else{
      doneOrNot = ' ❌'
    }
    console.log(index+1 + ': ' + task.name + doneOrNot)
  }
  run()
}

function addTask() {
  const jsonData = loadJSON()
  let newTaskId;

  if(jsonData.length === 0){
    newTaskId = 1
  }else{
    const lastTask = jsonData[jsonData.length - 1]
    newTaskId = lastTask.id + 1
  }

  rl.question('\nWhich task do you want to add ? ', (answer) => {
    const newTask = {
      id: newTaskId,
      name: answer,
      isDone: false
    }

    jsonData.push(newTask)
    saveInJSON(jsonData)
    console.log('Task added')

    run()
  })
}

function deleteTask() {
  const jsonData = loadJSON()
  
  // Afficher les tâches disponibles pour suppression
  console.log("\nYour tasks:");
  for (const [index, task] of jsonData.entries()) {
    console.log(index + 1 + ': ' + task.name);
  }

  const askQuestion = () => {
    rl.question('\nWhich task do you want to delete : ', (answer) => {
      const index = parseInt(answer)
      if(index > 0 && index <= (jsonData.length) + 1){
        jsonData.splice(index - 1, 1)
        console.log('Task deleted ! ')
        saveInJSON(jsonData)
        run()
      }else{
        console.log("This task doesn't exists ! ")
        askQuestion()
      }
    })
  }
  askQuestion()
} 

function markAsDone() {
  const jsonData = loadJSON();

  // Afficher les tâches disponibles pour marquer comme terminé
  console.log("\nYour tasks:");
  for (const [index, task] of jsonData.entries()) {
    if(task.isDone === true){
      doneOrNot = ' ✅'
    }else{
      doneOrNot = ' ❌'
    }
    console.log(index + 1 + ': ' + task.name + doneOrNot);
  }

  rl.question('\nWhich task do you want to mark as Done? ', (answer) => {
    const index = parseInt(answer);  // Convertir la réponse en un entier

    // Vérifier si l'index est valide
    if (index > 0 && index <= jsonData.length) {
      // Marquer la tâche comme terminée
      jsonData[index - 1].isDone = true; // L'index commence à 1, donc on soustrait 1 pour accéder au bon objet
      console.log('Task marked as done!');
      saveInJSON(jsonData); // Sauvegarder les modifications
      run(); // Retourner au menu principal
    } else {
      console.log("This task doesn't exist! Please choose a valid task.");
      run(); // Retourner au menu principal sans boucle infinie
    }
  });
}

function saveInJSON(jsonData) { 
  //WriteFileSync s'attend à ce qu'on envoie un fichier texte pas un Array ni 
  //un objet.
  //Utiliser stringify directement sur le paramètre de la méthode write
  //Pour éviter de faire un stringify dans chaque fonction
  fs.writeFileSync("tasks.json", JSON.stringify(jsonData, null, 2));
}

function loadJSON() {
  const data = fs.readFileSync("tasks.json", "utf8");
  try {
    if(data.trim() === ''){
      console.log('Le fichier JSON est vide')
    }else{
      const jsonData = JSON.parse(data);
      return jsonData
    }
  }catch (err){
    console.log('Le fichier JSON est invalide', err.message)
    return []
  }
}

const menu = () => {
  return "Welcome to your task manager, Press:\n\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\nYour choice: ";
};

function run() {
  rl.question(menu(), (answer) => {
    answer = parseInt(answer)
    switch (answer) { 
      case 1:
        displayTasks()
        break;
    case 2:
        addTask()
        break;
    case 3:
        deleteTask()
        break;
    case 4:
        markAsDone()
        break;
    case 5:
        rl.close();
        break;
    default:
        console.log("Invalid choice");
        console.clear();
        run();
}});
}

run()
