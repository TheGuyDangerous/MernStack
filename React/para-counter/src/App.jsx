import { useState } from 'react';
import './App.scss';

function App() {

  const [wordCount, setwordCount] = useState(0);

  const handleChange = (e) => {
    const para = e.target.value;
    const words = para.split(" ");

    let wordCount =  0;
    words.forEach((word) => {
      if (word.trim() !== '')
        wordCount++;
    })
    setwordCount(wordCount);
  }

  return (
    <div className="App">
        <div className="container">
          <h1>Responsive Paragraph Word Counter</h1>
          <textarea placeholder='What is in your mind?' onChange={handleChange} name="para" id="para" spellCheck='false' rows="10"></textarea>
          <p>Word Count: {wordCount}</p>
        </div>
        
    </div>
  );
}

export default App;
