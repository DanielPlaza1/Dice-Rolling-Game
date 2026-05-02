// Sources:
//ytmp3free.cc_rolling-dice-sound-effect-hd-youtubemp3free.org.mp3 (for the dice rolling sound effect)
//https://www.svgrepo.com/svg/351946/dice (For the icon in screen 1)
//PLEASE READ: It lags in certain areas of the code, I recommend playing with the workspace showing the top, where the sources and variables are.
//Creates variables when the app starts
var isRolling = false;
var diceSFX = 0;
var diceSFX2 = 0;
var diceSFX3 = 0;
var diceSounds = ["assets/category_board_games/dice_throw.mp3", "assets/category_board_games/dice_roll.mp3", "assets/ytmp3free.cc_rolling-dice-sound-effect-hd-youtubemp3free.org.mp3"];
var multiSFX = 0;
var multiSounds = ["assets/category_digital/laser_fade_4.mp3", "assets/category_digital/laser_fade_2.mp3", "assets/category_digital/laser_fade_1.mp3"];
var assigner;
var assigner2;
var diceRoll = 0;
var diceRoll2 = 0;
var diceRoll3 = 0;
var diceIndex = 0;
var diceBits = [1, 2, 3, 4, 5, 6];
var diceAmount = 1;
var diceMulti = 0;
var multiRoll = 0;
var diceMultiList = [1, 2];
var totalDiceRolls = 0;
var gainedMoney = 0;
var gainMoney1 = 0;
var gainMoney2 = 0;
var gainMoney3 = 0;
var currentMoney = 0;
var totalMoney = 0;
var costWin = 2500;
var costLow = 20;
var costHigh = 20;
var costDice = 65;
var costMulti = 130;
var costMultiHigh = 150;
var costMultiLow = 150;
var totalUpgrades = 0;
var i;
var i2;
var i3;
var T;
updateNumbers();
//All code inside screen 1
//The mouseover and mouseout on event functions are used for all buttons in the program.
onEvent("button", "mouseover", function( ) {
  //Whenever the mouse hovers over the button, it increases the border width.
  setProperty("button", "border-width", 3);
});
onEvent("button", "mouseout", function( ) {
  //Whenever the mouse hovers out of the button, it defaults the border width.
  setProperty("button", "border-width", 1);
});
onEvent("button", "click", function( ) {
  playSound("assets/category_app/app_tab_sound.mp3", false);
  setScreen("2diceroller");
});
//All code inside screen 2
onEvent("upgradesButton", "mouseover", function( ) {
  setProperty("upgradesButton", "border-width", 3);
});
onEvent("upgradesButton", "mouseout", function( ) {
  setProperty("upgradesButton", "border-width", 1);
});
onEvent("upgradesButton", "click", function( ) {
  playSound("assets/category_app/app_button_1.mp3", false);
  setScreen("3upgrades");
  //Everytime the user makes a input in any screen other than 1, it calls the updateNumbers function
  updateNumbers();
});
//Code for the "rollDiceButton"
onEvent("rollDiceButton", "mouseover", function( ) {
  setProperty("rollDiceButton", "border-width", 3);
});
onEvent("rollDiceButton", "mouseout", function( ) {
  setProperty("rollDiceButton", "border-width", 1);
});
//First, when the "rollDiceButton" on event is called, it adds 1 to the total amount of dice rolls and resets all variables used in the on event to 0
//Then, the if/else statements checks if the user has 1 - 3 dices and 0 - 1 multiplier dices and then runs the code within the statement that was best fit.
// The code within the if statement works as follows:
//1. Adds a 1 to the value of the lettered variable each time a timed loop runs (there could be multiple running at once).
//2. Takes a random number from the "diceRoll" list and applies that number to the corresponding text area that has been selected (depending on the if statement that was chosen multiple text areas would have been changed)
//3. Once the lettered variable has reached a certain value it then stops that specific timedLoop and randomly chooses and plays a sound thats in the corresponding SFX list
//4. Once the timedLoop with the longest lettered value requirement has been reached (also depends on the chosen if statement) it gets the number that was chosen to display on the text areas, then adds it all up, starting from dice1 and ending in dice3 then multiplies the amount by the multi text area (this also depends on the if statemement chosen) (I used a different variable for counting all of numbers gotten so that no unnecessary numbers would be added.
//5. After the sum has been calculated, it shows how it was calculated on the moneyCounter text and how much money the user has earned from the dice roll, adding the sum into the currentMoney and totalMoney value. Then calls the updateNumbers function
//6. If the user clicked on the roll button while it was already running the timedloop, it stops the timedLoop and tells the user to not roll while it is already rolling (this is done to avoid the timedLoop from infinitely running, which softlocks the game)
//I chose to use the "setTimeout" code instead of the "for loop" because the timedloop enables the dice rolling button to play a "animation" of the dices rolling, rather than just be static.
onEvent("rollDiceButton", "click", function() {
  // 1. Prevent overlapping rolls right away using the flag
  if (isRolling) {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("moneyCounter", "Please don't roll while it is already rolling!");
    return; // Stops the rest of the code in this function from running
  }

  // 2. Lock the button and set up the roll
  isRolling = true; 
  totalDiceRolls = totalDiceRolls + 1;
  setText("moneyCounter", "....");
  gainedMoney = 0;
  var ticks = 0; // Our single counter for the loop

  // 3. Determine how long the loop should run based on upgrades
  var maxTicks = 20; 
  if (diceAmount == 2 && diceMulti == 0) maxTicks = 35;
  if (diceAmount == 3 && diceMulti == 0) maxTicks = 50;
  if (diceAmount == 1 && diceMulti == 1) (maxTicks = 35)
  if (diceAmount == 2 && diceMulti == 1) (maxTicks = 50)
  if (diceAmount == 3 && diceMulti == 1) maxTicks = 65;

  // 4. The SINGLE timed loop!
  var rollLoop = timedLoop(30, function() {
    ticks++;

    // --- ROLL DICE 1 ---
    var dice1Stop = (diceAmount == 1 && diceMulti == 0) ? 20 : 20;
    if (ticks <= dice1Stop) {
      var roll1 = randomNumber(0, diceBits.length - 1);
      setNumber("dice1", diceBits[roll1]);
      if (ticks == dice1Stop) {
        diceSFX = randomNumber(0, diceSounds.length - 1);
        playSound(diceSounds[diceSFX], false);
      }
    }

    // --- ROLL DICE 2 ---
    if (diceAmount >= 2) {
      var dice2Stop = (diceAmount == 2 && diceMulti == 0) ? 35 : 35;
      if (ticks <= dice2Stop) {
        var roll2 = randomNumber(0, diceBits.length - 1);
        setNumber("dice2", diceBits[roll2]);
        if (ticks == dice2Stop) {
          diceSFX2 = randomNumber(0, diceSounds.length - 1);
          playSound(diceSounds[diceSFX2], false);
        }
      }
    }

    // --- ROLL DICE 3 ---
    if (diceAmount == 3) {
      if (ticks <= 50) {
        var roll3 = randomNumber(0, diceBits.length - 1);
        setNumber("dice3", diceBits[roll3]);
        if (ticks == 50) {
          diceSFX3 = randomNumber(0, diceSounds.length - 1);
          playSound(diceSounds[diceSFX3], false);
        }
      }
    }

    // --- ROLL MULTIPLIER ---
    if (diceMulti == 1) {
      if (ticks <= maxTicks) {
        var rollM = randomNumber(0, diceMultiList.length - 1);
        setNumber("multi", diceMultiList[rollM]);
        if (ticks == maxTicks) {
          multiSFX = randomNumber(0, multiSounds.length - 1);
          playSound(multiSounds[multiSFX], false);
        }
      }
    }

    // --- END OF ROLL: MATH & UI ---
    if (ticks == maxTicks) {
      stopTimedLoop(rollLoop);
      
      // Grab exactly what is on the screen right now
      var gain1 = getNumber("dice1");
      var gain2 = 0;
      var gain3 = 0;
      var multiVal = 1;
      var sum = gain1;
      var equationText = gain1;

      // Dynamically build the math based on active dice
      if (diceAmount >= 2) {
        gain2 = getNumber("dice2");
        sum = sum + gain2;
        equationText = equationText + " + " + gain2;
      }
      if (diceAmount == 3) {
        gain3 = getNumber("dice3");
        sum = sum + gain3;
        equationText = equationText + " + " + gain3;
      }

      // Apply multiplier if active
      if (diceMulti == 1) {
        multiVal = getNumber("multi");
        gainedMoney = sum * multiVal;
        equationText = "(" + equationText + ") x " + multiVal;
      } else {
        gainedMoney = sum;
      }

      // Update the UI and numbers
      setProperty("moneyCounter", "text", equationText + " = $" + gainedMoney + " earned");
      currentMoney = currentMoney + gainedMoney;
      totalMoney = totalMoney + gainedMoney;
      updateNumbers();

      // Unlock the button for the next roll
      isRolling = false; 
    }
  });
});
//For all of the code for screen 3
//For the win Button 
onEvent("winButton", "mouseover", function( ) {
  setProperty("winButton", "border-width", 3);
  //Screen 3 has a text area called "description" which explains the purpose of the button that the user is hovering their mouse over.
  //For this button, it shows on the description that it ends the game and shows the cost required to win by showing the variable corresponding to the upgrade.
  setText("description", "Ends the game and shows the total score." + ("\n costs $" + costWin));
});
onEvent("winButton", "mouseout", function( ) {
  setProperty("winButton", "border-width", 1);
  //When the user hovers its mouse out of the button it then changes the descriptions text back to the default. This is done to avoid buttons overlapping the description which causes confusion.
  setText("description", "Hover the mouse over the upgrades for their description.");
});
onEvent("winButton", "click", function( ) {
  //The if statement checks if the user has enough currentMoney to purchase the upgrade, if yes then, for this one, it takes the user to screen 4 and wins the game. If not, it plays a cancel noise and tells the user in the description that they dont have enough.
  //When the user successfully purchases the upgrade it plays the win sound and displays the users total money, dices rolled, and upgrades bought.
  if (currentMoney >= costWin) {
    currentMoney = currentMoney - costWin;
    setScreen("4youwin");
    stopSound();
    playSound("assets/category_background/stride.mp3", true);
    setProperty("moneyEarned", "text", "Throughout The Game You Earned: $" + (totalMoney + "..."));
    setProperty("dicesRolled", "text", "...By Rolling " + (totalDiceRolls + " Times..."));
    setProperty("upgradesBought", "text", "...And Buying " + (totalUpgrades + " Upgrades!"));
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
// For the lowest number upgrade
onEvent("upgradeLow", "mouseover", function( ) {
  setProperty("upgradeLow", "border-width", 3);
  setText("description", "Removes the lowest number from being rolled" + ("\n Costs $" + costLow));
});
onEvent("upgradeLow", "mouseout", function( ) {
  setProperty("upgradeLow", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//When the onEvent runs, it first checks if the diceBits list is longer than 3, if not then it tells the player to add more numbers to the list
//Then, it checks if the user has enough money to purchase the upgrade, if yes, it deducts the currentMoney value by the costLow variable, increases the costLow value by 1.3 and rounds the number, then it takes the lowest index value from the diceBits list (usually the lowest number on the list)
//After that it plays the updateNumbers function and adds 1 to the totalUpgrades value
//If the user does not have enough, the description tells the user to get more money.
onEvent("upgradeLow", "click", function( ) {
  if ((diceBits.length) <= 3) {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "Add more numbers before removing one!");
  } else if ((currentMoney >= costLow)) {
    playSound("assets/category_app/app_menu_button.mp3", false);
    currentMoney = currentMoney - costLow;
  
    costLow = Math.round(costLow * 1.3);
    removeItem(diceBits, 0);
    setText("description", "Removes the lowest number from being rolled" + ("\n Costs $" + costLow));
    updateNumbers();
    totalUpgrades = totalUpgrades + 1;
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
//For the highest number upgrade
onEvent("upgradeHigh", "mouseover", function( ) {
  setProperty("upgradeHigh", "border-width", 3);
  setText("description", "Adds the highest number +1 into the list" + ("\n Costs $" + costHigh));
});
onEvent("upgradeHigh", "mouseout", function( ) {
  setProperty("upgradeHigh", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//If the user has enough, it deducts the currentMoney by the costHigh value, increases the value by * 1.2 and rounds it up.
//The assigner variable is then assigned a value based on the highest number in the diceBits list.
//It then Appends a number +1 higher than the highest number in the list.
onEvent("upgradeHigh", "click", function( ) {
  if (currentMoney >= costHigh) {
    playSound("assets/category_app/app_interface_click.mp3", false);
    currentMoney = currentMoney - costHigh;
    costHigh = Math.round(costHigh * 1.2);
    var assigner = diceBits.length - 1;
    appendItem(diceBits, diceBits[assigner] + 1);
    setText("description", "Adds the highest number +1 into the list" + ("\n Costs $" + costHigh));
    totalUpgrades = totalUpgrades + 1;
    updateNumbers();
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
//For the add dice button
//The if statement is for when the user has the max amount of dices the game uses, stating it is sold out when they bought the required amount.
onEvent("upgradeDice", "mouseover", function( ) {
  if (diceAmount >= 3) {
    setProperty("description", "text", "Sold Out!");
  } else {
    setProperty("upgradeDice", "border-width", 3);
    setText("description", "Add an extra dice to roll" + ("\n Costs $" + costDice));
  }
});
onEvent("upgradeDice", "mouseout", function( ) {
  setProperty("upgradeDice", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//When the onEven runs, it first checks if the user has more than 3 diceAmount, if yes, it states that it is sold out
//If not, it then checks if the user has enough to purchase the upgrade, if yes, it deducts the money equal to costDices value, multiplies it by 2 and rounds it up, and increases the diceAmount value by 1.
onEvent("upgradeDice", "click", function( ) {
  if (diceAmount >= 3) {
    playSound("assets/category_digital/error_1.mp3", false);
    setProperty("description", "text", "Sold Out!");
  } else if ((currentMoney >= costDice)) {
    playSound("assets/category_movement/dice_shake_1.mp3", false);
    currentMoney = currentMoney - costDice;
    costDice = costDice * 2;
    diceAmount = diceAmount + 1;
    setText("description", "Add an extra dice to roll" + ("\n Costs $" + costDice));
    totalUpgrades = totalUpgrades + 1;
    updateNumbers();
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
//For the Multiplier Button
//The if statement is for when the user has the max amount of multiplier dices the game uses, stating it is sold out when they bought the required amount.
onEvent("upgradeMulti", "mouseover", function( ) {
  if (diceMulti >= 1) {
    setProperty("description", "text", "Sold Out!");
  } else {
    setProperty("upgradeMulti", "border-width", 3);
    setText("description", "Add a multiplier at the end of your roll" + ("\n Costs $" + costMulti));
  }
});
onEvent("upgradeMulti", "mouseout", function( ) {
  setProperty("upgradeMulti", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//When the onEven runs, it first checks if the user has more than 1 diceMulti, if yes, it states that it is sold out
//If not, it then checks if the user has enough to purchase the upgrade, if yes, it deducts the money equal to costMulti value and increases the diceMulti value by 1.
onEvent("upgradeMulti", "click", function( ) {
  if (diceMulti >= 1) {
    playSound("assets/category_digital/error_1.mp3", false);
    setProperty("description", "text", "Sold Out!");
  } else if ((currentMoney >= costMulti)) {
    playSound("assets/category_board_games/dice_shuffle.mp3", false);
    currentMoney = currentMoney - costMulti;
    diceMulti = 1;
    totalUpgrades = totalUpgrades + 1;
    updateNumbers();
    setProperty("description", "text", "Sold Out!");
    stopSound();
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
//For the multiHigh Button
onEvent("upgradeMulti1", "mouseover", function( ) {
  setProperty("upgradeMulti1", "border-width", 3);
  setText("description", "Adds the highest mutiplier number +1 into the list" + ("\n Costs $" + costMultiHigh));
});
onEvent("upgradeMulti1", "mouseout", function( ) {
  setProperty("upgradeMulti1", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//If the user has enough, it deducts the currentMoney by the costMultiHigh value, increases the value by * 1.2 and rounds it up.
//The assigner2 variable is then assigned a value based on the highest number in the diceMultiList list.
//It then Appends a number +1 higher than the highest number in the list.
onEvent("upgradeMulti1", "click", function( ) {
  if (currentMoney >= costMultiHigh) {
    playSound("assets/category_app/app_interface_click.mp3", false);
    currentMoney = currentMoney - costMultiHigh;
    costMultiHigh = Math.round(costMultiHigh * 1.2);
    var assigner2 = diceMultiList.length - 1;
    appendItem(diceMultiList, diceMultiList[assigner2] + 1);
    setText("description", "Adds the highest multiplier number +1 into the list" + ("\n Costs $" + costMultiHigh));
    totalUpgrades = totalUpgrades + 1;
    updateNumbers();
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
//For the MultiLow Button
onEvent("upgradeMulti2", "mouseover", function( ) {
  setProperty("upgradeMulti2", "border-width", 3);
  setText("description", "Removes the lowest multiplier number from being rolled" + ("\n Costs $" + costMultiLow));
});
onEvent("upgradeMulti2", "mouseout", function( ) {
  setProperty("upgradeMulti2", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//When the onEvent runs, it first checks if the diceMultiList list is longer than 1, if not then it tells the player to add more numbers to the list
//Then, it checks if the user has enough money to purchase the upgrade, if yes, it deducts the currentMoney value by the costMultiLow variable, increases the costLow value by 1.3 and rounds the number, then it takes the lowest index value from the diceMultiList list (usually the lowest number on the list)
onEvent("upgradeMulti2", "click", function( ) {
  if ((diceMultiList.length) <= 1) {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "Add more multiplying numbers before removing one!");
  } else if ((currentMoney >= costMultiLow)) {
    playSound("assets/category_app/app_menu_button.mp3", false);
    currentMoney = currentMoney - costMultiLow;
  
    costMultiLow = Math.round(costMultiLow * 1.3);
    removeItem(diceMultiList, 0);
    setText("description", "Removes the lowest multiplier number from being rolled" + ("\n Costs $" + costMultiLow));
    totalUpgrades = totalUpgrades + 1;
    updateNumbers();
  } else {
    playSound("assets/category_digital/error_1.mp3", false);
    setText("description", "You don't have enough money!");
  }
});
//For the back Button
onEvent("backButton", "mouseover", function( ) {
  setProperty("backButton", "border-width", 3);
});
onEvent("backButton", "mouseout", function( ) {
  setProperty("backButton", "border-width", 1);
  setText("description", "Hover the mouse over the upgrades for their description.");
});
//When clicked it takes the user to screen 2 and runs the updateNumber function
onEvent("backButton", "click", function( ) {
  playSound("assets/category_app/app_button_1.mp3", false);
  setScreen("2diceroller");
  updateNumbers();
});
//All code for screen 4
//When clicked the user is taken back to the 2nd screen and gets to keep playing
onEvent("restart", "click", function( ) {
  setScreen("2diceroller");
  stopSound();
});
//Whenever this function is called it runs the following code: 
//It updates the assigner to be up to date with the current highest number in the diceBits list
//Checks if the diceMulti and diceAmount value has made it to the max, then replaces the text to be "sold out"
//Checks if the diceMulti and diceAmount value has been changed, then reveals the hidden text area corresponding to the values
//Checks if the diceMulti and diceAmount value has been changed, then dynamically sets the position of all text areas in screen 2 to account for the new dices 
//Updates the display text in screen 2 and display2 text in screen 3 to show the currentMoney and dices rolled.
function updateNumbers() {
  var assigner = diceBits.length - 1;
  if (diceMulti == 1) {
    setProperty("upgradeMulti", "text", "Sold Out");
    setProperty("upgradeMulti1", "hidden", false);
    setProperty("upgradeMulti2", "hidden", false);
  }
  if (diceAmount >= 3) {
    setText("upgradeDice", "Sold Out");
    setProperty("dice2", "hidden", false);
    setProperty("dice3", "hidden", false);
  }
  if (diceAmount == 2) {
    setProperty("dice2", "hidden", false);
  }
  if (diceAmount == 3 && diceMulti == 1) {
    setPosition("dice2", 120, 65, 75, 75);
    setPosition("dice1", 5, 65, 75, 75);
    setPosition("dice3", 240, 65, 75, 75);
  } else if ((diceAmount == 2 && diceMulti == 1)) {
    setPosition("dice2", 185, 65, 75, 75);
    setPosition("dice1", 60, 65, 75, 75);
  } else if (diceAmount == 1 && diceMulti == 1) {
    setPosition("dice1", 120, 65, 75, 75);
  } else if ((diceAmount == 3 && diceMulti == 0)) {
    setPosition("dice2", 120, 125, 75, 75);
    setPosition("dice1", 5, 125, 75, 75);
    setPosition("dice3", 240, 125, 75, 75);
    
  } else if ((diceAmount == 2 && diceMulti == 0)) {
    setPosition("dice1", 60, 125, 75, 75);
    setPosition("dice2", 185, 125, 75, 75);
  } else {
    setPosition("dice1", 120, 125, 75, 75);
  }
  if (diceMulti >= 1) {
    setProperty("X", "hidden", false);
    setProperty("multi", "hidden", false);
  }
  if (diceBits[assigner] >= 10) {
    setProperty("dice1", "font-size", 38);
    setProperty("dice2", "font-size", 38);
    setProperty("dice3", "font-size", 38);
  }
  if (diceMultiList[assigner2] >= 10) {
    setProperty("multi", "font-size", 38);
  }
  setProperty("display", "text", "You have $" + (currentMoney + (("\n and rolled " + (totalDiceRolls + " times")) + "")));
  setProperty("display2", "text", "You have $" + (currentMoney + (("\n and rolled " + (totalDiceRolls + " times")) + "")));
}
