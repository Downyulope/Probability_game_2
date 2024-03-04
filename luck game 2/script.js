var wins = [];
var losses = [];
var playButton = document.getElementById('play-button');
var stopButton = document.getElementById('stop-button');
var restartButton = document.getElementById('restart-button');
var intervalId;

function playGame() {
    playButton.disabled = true; // Disable the play button when clicked
    var probability = parseInt(document.getElementById("probability-input").value);
    intervalId = setInterval(function() {
        var randomNumber = Math.random() * 100; // Generate a random number between 0 and 100
        var resultElement = document.getElementById("result");

        if (randomNumber <= probability) {
            resultElement.textContent = "You win!";
            wins.push(1);
            losses.push(0);
            updateResultCounts();
            drawChart();
            clearInterval(intervalId); // Stop the game if a win is achieved
            playButton.disabled = false; // Enable the play button
        } else {
            resultElement.textContent = "You lose!";
            wins.push(0);
            losses.push(1);
            updateResultCounts();
            drawChart();
        }
    }, 100); // Adjust the interval here (in milliseconds)
}

function stopGame() {
    clearInterval(intervalId);
    playButton.disabled = false; // Enable the play button
}

function restartGame() {
    clearInterval(intervalId);
    wins = [];
    losses = [];
    updateResultCounts();
    drawChart();
    playButton.disabled = false; // Enable the play button
}

function updateResultCounts() {
    document.getElementById("win-count").textContent = wins.reduce((acc, curr) => acc + curr, 0);
    document.getElementById("lose-count").textContent = losses.reduce((acc, curr) => acc + curr, 0);
}

function drawChart() {
    var canvas = document.getElementById('chart');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw x and y axes
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, height - 50);
    ctx.lineTo(width, height - 50);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw y-axis labels
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (var i = 0; i <= 10; i++) {
        var y = height - 50 - (i * (height - 100) / 10);
        ctx.fillText(i * 10 + '%', 40, y);
    }

    // Draw x-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var i = 0; i <= 10; i++) {
        var x = 50 + (i * (width - 100) / 10);
        ctx.fillText(i, x, height - 40);
    }

    // Plot win line
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    for (var i = 0; i < wins.length; i++) {
        var x = 50 + (i * (width - 100) / (wins.length - 1));
        var y = height - 50 - (wins.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0) * (height - 100) / wins.length);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'green';
    ctx.stroke();

    // Plot loss line
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    for (var i = 0; i < losses.length; i++) {
        var x = 50 + (i * (width - 100) / (losses.length - 1));
        var y = height - 50 - (losses.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0) * (height - 100) / losses.length);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
}
