const textToType = [
    "Welcome to my personal website.\n",
    "What would you Like to know?\n",
    "1) About Me\n",
    "2) Projects\n",
    "3) Education\n",
    "4) Skills and Certifications\n",
    "5) Links"
];

const inputText = [
    "guest:~$ "
];

const outputElement = document.getElementById("output");
const inputElement = document.getElementById("input");

let currentIndex = 0;
let currentLine = '';
let currentChar = 0;

let currInput = "";


function typeText(text, output, callback) {
    if (currentIndex < text.length) {
        if (currentChar < text[currentIndex].length) {
            currentLine += text[currentIndex][currentChar];
            output.textContent = currentLine;
            currentChar++;
        } else {
            currentIndex++;
            currentChar = 0;
        }
        setTimeout(() => typeText(text, output, callback), 35);
    } else {
        if (typeof callback === "function") {
            callback();
        }
    }
}

function startCursorAnimation() {
    const cursorElement = document.getElementById("cursor");
    let cursorVisible = true;

    function toggleCursor() {
        cursorVisible = !cursorVisible;
        cursorElement.style.opacity = cursorVisible ? 0 :  1;
    }

    setInterval(toggleCursor, 500);
}

typeText(textToType, outputElement, () => {
    currentIndex = 0;
    currentLine = '';
    currentChar = 0;
    typeText(inputText, inputElement, () => {
        setTimeout(startCursorAnimation, 0);
        currentIndex = 0;
        currentLine = '';
        currentChar = 0;
    });
});

document.addEventListener("keydown", function (event) {
    currInput += event.key;
    if (event.key === "Enter" && currInput.trim() !== "") {
        currInput = currInput.slice(0,-5)
        inputElement.textContent = "guest:~$ ";
        let inputNumber = parseInt(currInput);
        displayTextForNumber(inputNumber);
        currInput = "";
    } else if (event.key === "Backspace") {
        if (inputElement.textContent.length > 9) {
            inputElement.textContent = inputElement.textContent.slice(0, -1);
        }
        currInput = currInput.slice(0, -10);
    } else {
        currInput = event.key;
        inputElement.textContent += event.key;
    }
});

function displayTextForNumber(number) {
    let textToDisplay = [];
    switch (number) {
        case 1:
            textToDisplay = ["I am an Undergraduate in Computer Science interested in making impactful software." +
                " At 13 I learned my first programming language while at an engineering camp." +
                " I fell in love with the way programming requires you to think." +
                " I've always enjoyed problem solving." +
                " This inspired me to go to Texas Tech in an attempt to turn my passion into my career." +
                " I have loved everything I've learned from Algorithms to Theory of Automata." +
                " As I approach my commencement day on August 3rd, I am looking forward to not only applying these skills on my personal projects," +
                " but using them to make a meaningful impact on the world."];
            break;
        case 2:
            textToDisplay = ["Left-Right-Center:\n A cross platform mobile app made in React that" +
                " calculates points for this classic golf game. By employing agile methodologies and proper documentation I"+
                " was able to deliver a functional version in under 2 months.\n\n"+
                "Peeper:\n A Group project project with the goal of demonstrating Object-Oriented"+
                " programming to create a social network. Developed entirely in Java includes robust error checking"+
                " and a user management system."];
            break;
        case 3:
            textToDisplay = ["Texas Tech University\nAug 3rd 2024\nBachelors of Science in Computer Science\nMinor in Mathematics\n\n"+
                            "Noteable Courses:\nAlgorithms\nData Structures\nOperating Systems\nIntro to Artificial Inteligence"];
            break;
        case 4:
            textToDisplay = ["Certifications:\nPython Assosiate Level Programmer\nCyber Security for Critical Infastructure\n"+
                            "Paycom Summer Engagement Program\n\n"+
                            "Skills:\nC/C++ C# Java Javascript Python Sql Assembly\n" +
                            "Linux Mac Windows\nCSS HTML Http(s)"];
            break;
        case 5:
            textToDisplay = ["LinkedIn\nhttps://www.linkedin.com/in/simon-swopes/\n\nGitHub\nhttps://github.com/SpicyCircuit"];
            break;
        default:
            textToDisplay = [
                "Welcome to my personal website.\n"+
                "What would you Like to know?\n"+
                "1) About Me\n"+
                "2) Projects\n"+
                "3) Education\n"+
                "4) Skills and Certifications\n"+
                "5) Links"];
            break;
    }

    // Display the text in the text box
    typeText(textToDisplay, outputElement, () => {
        currentIndex = 0;
        currentLine = '';
        currentChar = 0;
        if (number === 5) {
            addLinkListeners();
        }
    });
}


function addLinkListeners() {
    const links = outputElement.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const url = this.getAttribute("href");
            window.open(url, "_blank");
        });
    });
}