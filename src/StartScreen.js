import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from './minesweeperSprites/menu-flower-icon-MS.png';

function StartScreen() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionClick = (size) => {
    setSelectedOption(size);
    navigate(`/next?size=${size}`); // automatically go to the next page
  };

  return (
	<div style={styles.container}>
	  <img src={icon} alt='pretty flower' width={60} height={60}/>
      <h1> please select the difficulty option :</h1>
      <button className="button" onClick={() => handleOptionClick('small')}>Small</button>
      <button className="button" onClick={() => handleOptionClick('large')}>Large</button>
    </div>
  );
};

const styles = {
	container: {
  		display: 'flex',
  		flexDirection: 'column',
  		alignItems: 'center',
  		justifyContent: 'center',
  		height: '100vh', //center vertical
	}
};

export default StartScreen;

