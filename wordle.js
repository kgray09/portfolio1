let words =["Abuse","Adult","Agent","Anger","Apple","Award","Basis","Beach","Birth","Drama","Dregs","Drink","Drive","Earth","Enemy","Entry","Error","Admit","Adopt","Agree","Allow","Alter","Apply","Argue","Arise","Avoid","Ought","Thame","Above","Acute","Alive","Alone","Angry","Aware","There","Awful","Thine","Basic","Thine","Block","Block","Blood","Event","Foith","Begin","Blame","Wherg","Blind","Which","Brave","Board","Foult","Whose","Brief","Brain","Field","Bring","Whoso","Broad","Bread","Fight","Build","Brown","Break","Final","Burst","Yours","Cheap","Brown","Floor","Carry","Chief","Buyer","focus","Civil","Cause","Force","Couso","Clean","Chain","Frame","Check","Abaft","Clear","Chair","Fronk","Claim","Aboon","Close","Chest","Front","Clean","About","Crazy","Chief","Fruit","Clear","Above","Daily","Child","Grant","Climb","Adown","Dirty","China","Grass","Close","Afore","Early","Claim","Green","Count","After","Empty","Class","Group","Cover","Along","Equal","Clock","Guide","Cross","Aloof","Exact","Extra","Cooch","Heart","Dance","Among","Coost","Henry","Doubt","Below","Faint","Court","Uncle","Drink","Circa","False","Fifth","Cover","Union","Drive","Cross","Cream","Unitu","Enjoy","Final","Furth","First","Enter","Crime","Value","Minus","Cross","Visit","Exist","Fresh","Front","Crowd","Voice","Fight","Round","Crown","Waste","Focus","Since","Funnu","Giant","Cycle","Watch","Force","Spite","Grand","Guess","Under","Dance","Water","Great","Imply","Until","Death","While","Green","Depth","Woman","Issue","Gross","Doubt","world","Judge","Hoppy","Laugh","Draft","Youth","Aback","Abaft","Aboon","About","Above","Accel","Adown","Afoot","Afore","Afoul","After","Again","Agape","Agogo","Agone","Ahead","Alife","Alike","Aline","Aloft","Alone","Along","Aloof","Aloud","Amiss","Amply","Amuck","Apace","Apart","Aptly","Arear","Aside","Askew","Awful","Badly","Bally","Below","Canny","Cheap","Clean","Afore","After","Bothe","Other","Since","Slash","Until","Where","While","Avast","Basta","Begad","Bless","Blige","Brava","Bravo","Bring","Chook","Dildo","Ditto","Frick","Fudge","Golly","Gratz","Hallo","Hosta","Havoc","Hella","Hello","Howay","Howdy","Hullo"];

document.addEventListener("DOMContentLoaded", () => {

    createSquare();

    let guessedWords = [[]];
    let availableSpace = 1;
    let guessedWordCount = 0;
    let word = (words[Math.floor(Math.random()*words.length)]).toLowerCase();
    // let word = [...normalWord].reverse().join("");
    // let word = "penis"
    const keys = document.querySelectorAll('.keyboard-row button');

// This function gets the current guessed word into an array
    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

// This function updates 
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        };
    }

    function getTileColor(letter, index){
        console.log(letter, index, word)
        const isCorrectLetter = word.includes(letter)

        if(!isCorrectLetter) {
            return "rgb(58, 58, 60)"
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)"
        }
        return "rgb(181, 159, 59)"
    }


    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        if(currentWordArr.length !== 5) {
            window.alert("Hey, YO, ya need to enter FIVE letters!");
        }
        const currentWord = currentWordArr.join("");

        if (words.includes("currentWord")) {
            console.log("currentWord")
            const firstLetterId = guessedWordCount * 5 + 1;
            const interval = 200;
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                const tileColor = getTileColor(letter, index);
    
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId)
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor};`;
                }, interval * index)
            });
    
            guessedWordCount+=1;
    
            if (currentWord === word){
            alert("You WON!")
            }
    
            if(guessedWords.length === 6) {
                window.alert(`Sorry, you're a loser... The word is ${word}`)
            }
    
            guessedWords.push([]);
        } else if (!words.includes("currentWord")){
            console.log(word, currentWord,currentWordArr)
            window.alert("That word does not exist!")
        }

    }


// This funtion creates the squares on the game board!
    function createSquare() {
        const gameBoard = document.getElementById("board")

    for (let index = 0; index < 30; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index+1);
        gameBoard.appendChild(square);
        
        }
    }

    function handleDeleteLetter(){
        console.log(getCurrentWordArr())
        const currentWordArr = getCurrentWordArr();
        console.log(currentWordArr);
        const removedLetter = currentWordArr.pop();
        console.log(removedLetter)

        guessedWords[guessedWords.length -1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace-1));

        lastLetterEl.textContent = '';
        availableSpace = availableSpace -1;
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if(letter === 'enter') {
                console.log(word)
                handleSubmitWord()
                return
            }

            if (letter === 'del') {
                handleDeleteLetter()
                return
            }

            updateGuessedWords(letter);
        };     
    }



})


