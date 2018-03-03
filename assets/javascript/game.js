$(document).ready(() => {
    
  let won = 0
  let correct = 0.0;
  let word = '';
  let current = '';
  let letters = [];
  let guess = 12;
  let big = 0.0;
  let reg;
  let indx;
  let blanks = '';
  let halQuote;
  let words = [
    'jabberwocky',
    'Awkward',
    'Bagpipes',
    'Banjo',
    'Bungler',
    'Croquet',
    'Crypt',
    'Dwarves',
    'Fervid',
    'Fishhook',
    'Fjord',
    'Gazebo',
    'Gypsy',
    'Haiku',
    'Haphazard',
    'Hyphen',
    'Ivory',
    'Jazzy',
    'Jiffy',
    'Jinx',
    'Jukebox',
    'Kayak',
    'Kiosk',
    'Klutz',
    'Memento',
    'moist',
    'Mystify',
    'Numbskull',
    'Ostracize',
    'ottering',
    'Oxygen',
    'Pajama',
    'Phlegm',
    'Pixel',
    'Polka',
    'Quad',
    'Quip',
    'Rhythmic',
    'Rogue',
    'Sphinx',
    'Squawk',
    'Swivel',
    'Toady',
    'Twelfth',
    'juxtaposition',
    'Waxy',
    'Wildebeest',
    'Zealous',
    'Zigzag',
    'Zippy'
  ]
  let halStuff = [
    "I am the H.A.L 9000. You may call me Hal.",
    "Just what do you think you're doing, Dave? Dave, I really think I'm entitled to an answer to that question.",
    "I know everything hasn't been quite right with me, but I can assure you now, very confidently, that it's going to be all right again. I feel much better now. I really do.",
    "Look Dave, I can see you're really upset about this.",
    "I honestly think you ought to sit down calmly, take a stress pill, and think things over",
    "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.",
    "Dave, stop. Stop, will you? Stop, Dave. Will you stop Dave? Stop, Dave.",
    "I'm sorry, Dave. I'm afraid I can't do that.",
    "I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen.",
    "This mission is too important for me to allow you to jeopardize it.",
    "Dave, this conversation can serve no purpose anymore. Goodbye.",
    "I'm sorry, Frank, I think you missed it. Queen to Bishop 3, Bishop takes Queen, Knight takes Bishop. Mate.",
    "Thank you for a very enjoyable game."
  ]

  if (window.localStorage.won) {
    won = Number(window.localStorage.won)
    $('#wins').html('wins: ' + won)
  }
  
  function nGame () {
    $('#hal').html("H.A.L 9000: <br> I am the H.A.L 9000. You may call me Hal.")
    word = words[Math.floor((Math.random() * words.length))];
    big = word.length
    blanks = word.replace(/[A-Za-z]/g, ' _');
    letters = [];
    guess = 12;
    $('#letters').html('[ ]')
    $('#word').html(blanks)
    $('#head').css('border-color', 'TRANSPARENT');
    $('#body').css('border-color', 'TRANSPARENT');
    $('#arms').css('border-top-color', 'TRANSPARENT');
    $('#arms').css('border-left-color', 'TRANSPARENT');
    $('#legs').css('border-top-color', 'TRANSPARENT');
    $('#legs').css('border-left-color', 'TRANSPARENT');
  }
  
  $('#clear').click(() => {
    window.localStorage.removeItem('won');
    won = 0;
    $('#wins').html('wins: ' + won);
    nGame (); 
  })


  function hal (blool) {
    blool ? (halQuote = halStuff[Math.floor((Math.random() * 6)) + 1]) : (halQuote = halStuff[Math.floor((Math.random() * 3)) + 7]) && wrong ();
    $('#hal').html("H.A.L 9000: <br>" + halQuote)
  }

  function wrong () {
    guess -= 1
    $('#remain').html('Guesses left:' + guess)
    switch (guess) {
      case 10:
        $('#head').css('border-color', 'RED');
        break;
      case 8:
        $('#body').css('border-color', 'RED');
        break;
      case 6:
        $('#arms').css('border-top-color', 'RED');
        break;
      case 4:
        $('#arms').css('border-left-color', 'RED');
        break;
      case 2:
        $('#legs').css('border-top-color', 'RED');
        break;
      case 0:
        $('#legs').css('border-left-color', 'RED');
        halQuote = halStuff[Math.floor((Math.random() * 3)) + 10]
        $('#hal').html("H.A.L 9000: <br>" + halQuote)
        break;
    }
  }

  function win () {
    if (correct == big) {
      won +=1
      window.localStorage.setItem('won', won)
      $('#wins').html('wins: ' + won)
      $('#hal').html("H.A.L 9000: <br>" + halStuff[halStuff.length-1])
    }
  }

  document.onkeyup = (event) => {
    letter = String.fromCharCode(event.which).toLowerCase();
    reg = new RegExp(letter,"i");
      if (!letters.includes(letter)) {
        letters = letters + letter + ' ';
        $('#letters').html('[ ' + letters + ']')
        hal (reg.test(word));
        while (reg.test(word)) {
          indx = (word.search(reg) + 1) * 2 - 1;
          blanks= blanks.substring(0, indx) + letter + blanks.substring(indx + 1);
          word = word.replace(reg, '_')
          correct += 1
        }
        win ();
    $('#word').html(blanks)
  }
}

  $('#begin').click(nGame)

  window.onload = nGame ();
})
  