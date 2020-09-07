console.log('Hello World');
<script src="./scrambling-text.js"></script>
import Scrambler from 'scrambling-text';

const TEXTS = [
    'x Behrens',
    'Please give me a job.',
  ];

  const scrambler = new window.Scrambler();
  const handleScramble = (text) => {
    document.getElementById('text').innerHTML = text;
  }

  let i = 0;
  function printText() {
    scrambler.scramble(TEXTS[i % TEXTS.length], handleScramble); 
    setTimeout(printText, 5000);
    i++;
  }
  printText();
