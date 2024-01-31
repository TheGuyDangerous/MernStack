// QRCodeGenerator.js
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [finalText, setFinalText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalText(text);
  }

  return (
    <div className="text-center">
      <h1>QR Code Generator</h1>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="text"
            placeholder="Enter any text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Generate
        </button>
      </form>
      <div id = "QRCode" className='m-3'>
      {finalText && <QRCode value={finalText} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
