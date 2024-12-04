const readline = require('readline');
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function displayTasks() {
  
}

function AddTask() {
  rl.question('Your choice: ', (answer) => {
   console.log(answer)
  });
}

function DeleteTask() {
  
}

function MarkAsDone() {
  
}

// function SaveInJSON() {
  //fs.writeFileSync("tasks.json", tasksJSON);
// }

// function LoadJSON() {
    //fs.readFileSync("tasks.json", "utf8"
// }

const menu = () => {
  return "Welcome to your task manager, Press:\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Exit the task manager\nYour choice: ";
};

function run() {
  rl.question(menu(), (answer) => {
    switch (answer) { 
      case 1:

        break;
    case 2:

        break;
    case 3:

        break;
    case 4:

        break;
    case 5:
        
        rl.close();
        break;
    default:
        console.log("Invalid choice");
        console.clear();
        run();
  });
}

run()
