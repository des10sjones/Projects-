document.querySelector('.button1').addEventListener('click',playGameRock)
document.querySelector('.button2').addEventListener('click',playGamePaper)
document.querySelector('.button3').addEventListener('click',playGameScissors)


function playGameRock() {
    const user = "rock"

    
        const computer = getComputerPick();

      
     
        const result = determineWinner(user, computer);
        
        var userElement = document.getElementById("userPick");
        userElement.textContent = "User Pick: " + user;
        var computerElement = document.getElementById("computerPick");
        computerElement.textContent = "Computer Pick: " + computer;
        var resultElement = document.getElementById("resultText");
        resultElement.textContent = "Result: " + result;


    
        
    
}
function playGamePaper() {
    const user = "paper"

    
        const computer = getComputerPick();

        
        

     
        const result = determineWinner(user, computer);
      
        var userElement = document.getElementById("userPick");
        userElement.textContent = "User Pick: " + user;
        var computerElement = document.getElementById("computerPick");
        computerElement.textContent = "Computer Pick: " + computer;
        var resultElement = document.getElementById("resultText");
        resultElement.textContent = "Result: " + result;

    
        
    
}
function playGameScissors() {
    const user = "scissors"

    
        const computer = getComputerPick();

     
        

     
        const result = determineWinner(user, computer);
        
        var userElement = document.getElementById("userPick");
        userElement.textContent = "User Pick: " + user;
        var computerElement = document.getElementById("computerPick");
        computerElement.textContent = "Computer Pick: " + computer;
        var resultElement = document.getElementById("resultText");
        resultElement.textContent = "Result: " + result;

    
        
    
}



function getComputerPick() {
    const choices = ['rock', 'paper', 'scissors'];
    const random = Math.floor(Math.random() * choices.length);
    return choices[random];
}

function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a tie!";
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')
    ) {
        return 'User wins!';
    } else {
        return 'Computer wins!';
    }
}

