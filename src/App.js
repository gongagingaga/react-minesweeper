import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './StartScreen';
import Game from './Game';
import './App.css';
import {Fragment} from 'react';

function App() {
  	return (
	  	<Fragment>
	 		<Router>
	  			<Routes>
        			<Route exact path="/" element={<StartScreen />} />
        			<Route path="/next" element={<Game />} />
      			</Routes>
			</Router>
		</Fragment>
	);
}

export default App;

