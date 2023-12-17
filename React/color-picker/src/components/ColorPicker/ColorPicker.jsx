import React, { useState } from 'react'
import './ColorPicker.scss'

const ColorPicker = ({colors}) => {
  const [pickedColor, setPickedColor] = useState('#1a1a1a')
  const [enabled, setEnabled] = useState(0);


  return (
    <div className='color-picker'>
        <div className="input">
          <button onClick={() => setEnabled(1)} >Pick a color</button>
          <div style={{opacity:`${enabled}`}} className='color-list'>
              {
                colors.map((color) => (
                  <div key={color} onClick={() => {setPickedColor(color); setEnabled(0)}} className="color" style={{background:`${color}`}}></div> 
                ))
              }
          </div>
        </div>
        <button id='output' style={{background:`${pickedColor}`}}></button>
    </div>
  )
}

export default ColorPicker