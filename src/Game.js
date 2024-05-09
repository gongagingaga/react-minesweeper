import React, { Fragment, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Box }from "@mui/material"
import { Grid } from "@mui/material";

import Buttons from "./pages/Buttons";
import TopBanner from "./pages/TopBanner";
import Timer from "./pages/Timer";
import MessageCenter from "./pages/MessageCenter";
import History from "./pages/History";

//Imported sprites, I know this is horrible, I'm sorry
import flaggedTile from "./minesweeperSprites/flaggedMine-MS.png"
import unrevealedTile from "./minesweeperSprites/unrevealedTile-MS.png";
import emptyTile from "./minesweeperSprites/emptyTile-MS.png";
import revealedMine from "./minesweeperSprites/revealedMine-MS.png";
import steppedMine from "./minesweeperSprites/steppedMine-MS.png";
import mine1 from "./minesweeperSprites/1mine-MS.png";
import mine2 from "./minesweeperSprites/2mine-MS.png";
import mine3 from "./minesweeperSprites/3mine-MS.png";
import mine4 from "./minesweeperSprites/4mine-MS.png";
import mine5 from "./minesweeperSprites/5mine-MS.png";
import mine6 from "./minesweeperSprites/6mine-MS.png";
import mine7 from "./minesweeperSprites/7mine-MS.png";
import mine8 from "./minesweeperSprites/8mine-MS.png";


const Game = () => {
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);
    const size = searchParam.get('size');

    let numRow;
    let numCol;
    if (size === 'small') {
        numRow = 9;
        numCol = 9;
    } else if (size === 'large') {
        numRow = 16;
        numCol = 16;
    } else {
        numRow = 150;
        numCol = 150; // default(shouldn't happen);
    }

	const initBoard = () => {
		const board = [];
		for (let i = 0; i < numRow; i += 1) {
			const row = [];
			for (let j = 0; j < numCol; j += 1) {
				row.push({
					backgroundColor: "grey",
					revealed: false,
					isMine: false,
					number: 0,
					flagged: false,
					steppedMine: false,
				});
			}
			board.push(row);
		}
		return board;
	};

    const [board, setBoard] = useState(initBoard);
	const [mines, setMines] = useState([]);
	const [numbers, setNumbers] = useState([])
	const [firstClick, setFirstClick] = useState(false);
	const [flagClick, setFlagClick] = useState(false);
	const [flagCount, setFlagCount] = useState(0);
	const [win, setWin] = useState(false);
	const [lose, setLose] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [timer, setTimer] = useState(0);
	const [message, setMessage] = useState('');
	const [flagClickStatus, setFlagClickStatus] = useState("FLAG");
	const [spin, setSpin] = useState(false);
  	const [tableItems, setTableItems] = useState([]);

	const updateMessage = (msg) => {
		setMessage(msg);
	}


  	const addItemsToTable = (win, size, timer) => {
		let outcome = win ? "win" : "loss";
		let difficulty = size === "small" ? "easy" : "hard";
		const newItem = [outcome, difficulty, timer];
		const newTableItems = [...tableItems, newItem]
		setTableItems(newTableItems);
  	};

	const resetHistory = () => {
		setTableItems([]);
	}

    const updateTimer = (newTimerValue) => {
        setTimer(newTimerValue);
    };

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
		setSpin(true);
        setIsActive(false);
    };

	const generateMines = (numRow, numCol, size, excep) => {
		var vertices = [];
		var numVertices = (size === 'small') ? 10 : 40;
		var generatedVertices = {};

		while (vertices.length < numVertices) {
			var x = Math.floor(Math.random() * numRow);
			var y = Math.floor(Math.random() * numCol);
			var vertexKey = x + '-' + y;

			// make sure the generated cell is not the exception cell or a duplicate.
			if (vertexKey !== excep && !generatedVertices[vertexKey]) {
				vertices.push([x, y]);
				generatedVertices[vertexKey] = true;
			}
		}

		return vertices;
	}


	//get surrounding vertices:
	const getSurroundingVertices = (coordinate) => {
		const [x, y] = coordinate;
		const surroundingVertices = [];

		for (let dx = -1; dx <= 1; dx += 1) {
			for (let dy = -1; dy <= 1; dy += 1) {
				if (dx !== 0 || dy !== 0) { // Exclude the center tile 
					surroundingVertices.push([x + dx, y + dy]);
				}
			}
		}
		return surroundingVertices;
	};

	const generateNumbers = (mines) => {
		let gridNumbers = new Array(numRow).fill(0).map(() => new Array(numCol).fill(0));

		for (let mine of mines) {
			let surroundTiles = getSurroundingVertices(mine);
			for (let [x, y] of surroundTiles) {
				if (x >= 0 && 
					x < numRow &&
					y >= 0 &&
					y < numCol &&
					!mines.some(([mx, my]) => mx === x && my === y)) {
					gridNumbers[x][y] += 1;
				}
			}
		}

		setNumbers(gridNumbers);
		return gridNumbers;
	};

    const Cell = props => {
        const {cellContent, onClickCallback} = props;
		let backgroundImageUrl;
		// determine the background image based on cell content
		if (cellContent.revealed) {
			if(cellContent.steppedMine){
				backgroundImageUrl = steppedMine;
			}else if (cellContent.isMine) {
				// use the revealed mine sprite
				backgroundImageUrl = revealedMine; 
			} else {
				//use the number sprite based on the number of surrounding mines
				switch (cellContent.number) {
					case 1:
						backgroundImageUrl = mine1;
						break;
					case 2:
						backgroundImageUrl = mine2;
						break;
					case 3:
						backgroundImageUrl = mine3;
						break;
					case 4:
						backgroundImageUrl = mine4;
						break;
					case 5:
						backgroundImageUrl = mine5;
						break;
					case 6:
						backgroundImageUrl = mine6;
						break;
					case 7:
						backgroundImageUrl = mine7;
						break;
					case 8:
						backgroundImageUrl = mine8;
						break;
					default:
						backgroundImageUrl = emptyTile;
						break;
				}
			}
		} else if (cellContent.flagged){
			backgroundImageUrl = flaggedTile;

		}else{
			// Use the unrevealed tile sprite
			backgroundImageUrl = unrevealedTile; 
		}

		return (
			<Box
				onClick={() => onClickCallback()}
				sx={{
					width: 50,
					height: 50,
					border: 1,
					backgroundImage: `url(${backgroundImageUrl})`,
					backgroundSize: 'cover',
				}}
			></Box>
		);
	}

    const Row = props => {
        const {row, onClickCallback} = props;

        return (
            <Fragment>
                <Grid container columns={numCol}>
				{
					row.map((cellContent, colIdx) => {
						return( 
							<Grid item xs={1} key={colIdx}>
								<Cell 
									cellContent={cellContent} 
									onClickCallback={() => 
										onClickCallback(colIdx)}
								/>
							</Grid>
						)
					})
				}
                </Grid>
            </Fragment>
        )
    }

	const updateBoard = (numbers, mines) => {
		let newBoard = [...board]; 
		for (let row = 0; row < newBoard.length; row += 1) {
			for (let col = 0; col < newBoard[row].length; col += 1) {
				let currentCell = newBoard[row][col];
				// check if [row, col] exists in mines
				let isMine = false;
				for (let mine of mines) {
					if (mine[0] === row && mine[1] === col) {
						isMine = true;
						break;
					}
				}

				//update the cell properties based on whether it's a mine or not
				newBoard[row][col] = {
					...currentCell,
					isMine: isMine,
					number: isMine ? 0 : numbers[row][col]
				};
			}
		}

		setBoard(newBoard);	
		return newBoard; 	
	};

	//used to reveal large amounts of tiles at once, usually for empty tile
	//clicks, but also occasionally used for showing board
	const largeReveal = (board, row, col, setting) => {
		let currTile = board[row][col];
		if ((!currTile.revealed || setting === 'all') && !currTile.flagged) {
			//update the current tile to be revealed
			let newBoard = [...board];
			newBoard[row][col] = {
				...currTile,
				revealed: true,
			};

			//recursively reveal its neighbors, not super efficient i'm sorry
			if ((currTile.number === 0 || setting === 'all') && !currTile.isMine ) {
				let neighbors = getSurroundingVertices([row, col]);
				neighbors.forEach(neighbor => {
					const [neighborRow, neighborCol] = neighbor;
					if (neighborRow >= 0 &&
						neighborRow < numRow &&
						neighborCol >= 0 &&
						neighborCol < numCol
					) {
						if (!newBoard[neighborRow][neighborCol].revealed) {
							largeReveal(newBoard, neighborRow, neighborCol, setting);
						}
					}
				});
			}

			setBoard(newBoard);
		}
	};

	const checkWin = (flagCount, board) => {
		if (flagCount === mines.length-1) {
			for (let i = 0; i < mines.length; i += 1) {
				const [mineRow, mineCol] = mines[i];
				const cell = board[mineRow][mineCol];
				if (!cell.flagged) {
					return false;
				}
			}
			stopTimer();
			addItemsToTable(true, size, timer);
			updateMessage("you've won!");
			return true;
		}
		return false;
	};

	const checkLoss = (row, col) => {
		for(let i = 0; i < mines.length; i += 1){
			let [mineRow, mineCol] = mines[i];
			if(mineRow === row && mineCol === col){
				stopTimer();
				addItemsToTable(false, size, timer);
				updateMessage(tableItems.length === 0 ? "you've lost, click on the flower to restart" : "you've lost");
				return true;
			}
		}
		return false;
	}


    const onClickCallback = (rowIdx, colIdx) => {
		//set the mines after the first click
		let newBoard = [...board]

		//dont let game continue if already won/lost
		if(win || lose){
			return;
		}
		if(!firstClick){
			startTimer();
			// cant let the first click be a mine
			let excep = rowIdx + '-' + colIdx; 
			let newMines = generateMines(numRow, numCol, size, excep);
			let newNumbers = generateNumbers(newMines);
			newBoard = updateBoard(newNumbers, newMines);
			setMines(newMines);
			setFirstClick(true);
		}

		//need to call function to uncover all neighboring tiles of a tile that
		//is not a number that also is in some way connected to the initally
		//clicked tile
		if(!flagClick){
			largeReveal(newBoard, rowIdx, colIdx, 'empty');
		}
		
        const newBoard1 = [...newBoard];
        const affectedRow = [...newBoard[rowIdx]];

		//if not placing flags
		if(!flagClick){
			//can reveal as long as current tile is not flagged
			if(!affectedRow[colIdx].flagged){
				let newLoss = checkLoss(rowIdx, colIdx);
				if(newLoss){
					affectedRow[colIdx] = {
						...affectedRow[colIdx],
						steppedMine: true,
						revealed: true,
						flagged: false,
					}
					setLose(newLoss);
					handleRevealMinesClick();
				}else {
					affectedRow[colIdx] = {
						...affectedRow[colIdx],
						revealed: true,
						flagged: false,
					}
				}
			}
        }else{
			//can flag as long as not revealed tile and not flagged tile
			if(!affectedRow[colIdx].revealed && !affectedRow[colIdx].flagged){
    	    	affectedRow[colIdx] = {
        	    	...affectedRow[colIdx],
					revealed: false,
					flagged: true,
				}
				let newFlagCount = flagCount;
				newFlagCount += 1;
				setFlagCount(newFlagCount);
			}else if(affectedRow[colIdx].flagged){
				//if flagging a flagged tile then unflag it and set it to unrevealed
    	    	affectedRow[colIdx] = {
        	    	...affectedRow[colIdx],
					revealed: false,
					flagged: false,
				}
				let newFlagCount = flagCount;
				newFlagCount -= 1;
				setFlagCount(newFlagCount);
			}
		}

        newBoard1[rowIdx] = affectedRow;
        setBoard(newBoard1);	
		//check if have won:
		let newWin = checkWin(flagCount, newBoard1);
		setWin(newWin);

    }

	

	// buttons logic
	const handleFlagClick = () => {
		//we want to set a use state flagClick to the opposite of what it is,
		//the rest of the code will deal with what that entails
		setFlagClick(flagClick ? false : true);
		setFlagClickStatus(flagClick ? "FLAG" : "***FLAG");
	}

	const handleRevealMinesClick = () => {
		//big reveal is too sketch when i try to use it the way i do, so
		//were just going to go though the entire mines list manually(which
		//will be more efficient), and reveal them one by one.
		let newBoard = [...board];
		//if the first click hasnt been handled yet then we need to actually 
		//build the board first.
		let newMines = [...mines];
		if(!firstClick){
			// cant let the first click be a mine
			let excep = 0 + '-' + 0; 
			newMines = generateMines(numRow, numCol, size, excep);
			let newNumbers = generateNumbers(newMines);
			newBoard = updateBoard(newNumbers, newMines);
			setMines(newMines);
			setFirstClick(true);
		}

		for(let i = 0; i < newMines.length; i += 1){
			let currMine = newMines[i];
			newBoard[currMine[0]][currMine[1]] = {
				...newBoard[currMine[0]][currMine[1]],
				revealed: true,
				backgroundImage: `url(${revealedMine})`,
				backgroundSize: 'cover',
			}
		}
		setBoard(newBoard);
		stopTimer();
	}

	const handleRevealBoardClick = () => {
		//same situation as reveal mines, except now we reveal all

		// for some odd reason i can't just give board to large reveal, so
		// were doing this instead
		let newBoard = [...board]
		//if the first click hasnt been handled yet then we need to actually 
		//build the board first.
		if(!firstClick){
			// cant let the first click be a mine
			let excep = 0 + '-' + 0; 
			let newMines = generateMines(numRow, numCol, size, excep);
			let newNumbers = generateNumbers(newMines);
			newBoard = updateBoard(newNumbers, newMines);
			setMines(newMines);
			setFirstClick(true);
			largeReveal(newBoard, 0, 0, 'all');
			return;
		}

		//the recursive solution is only consistent with the 
		//untouched or certain touched boards, otherwise we need to do this 
		//iteratively
		for(let i = 0; i < newBoard.length; i += 1){
			for(let j = 0; j < newBoard[i].length; j += 1){
				if(!newBoard[i][j].flagged){
					newBoard[i][j] = {
						...newBoard[i][j],
						revealed: true,
					}
				}
			}
		}
		setBoard(newBoard);
		stopTimer();
	}

	const handleRestartClick = () => {
		//resetting defaults
		let newBoard = initBoard();
		setFirstClick(false);
		setWin(false)
		setLose(false)
		setFlagCount(0)
		setFlagClick(false)
		updateTimer(0);
		setIsActive(false);
		setMessage("");
		setFlagClickStatus("FLAG");
		setSpin(false);
		
		for(let i = 0; i < newBoard.length; i += 1){
			for(let j = 0; j < newBoard[i].length; j += 1){
				if(!newBoard[i][j].flagged){
					newBoard[i][j] = {
						...newBoard[i][j],
						revealed: false,
					}
				}
			}
		}

        setBoard(newBoard);	
	}



	// the 50 is the cell width/height
    const width = () => numCol * 50 + (numCol - 1) * 2; 
    const height = () => numRow * 50 + (numRow - 1) * 2;

    return (
        <Fragment>
			<TopBanner spin={spin} onClick={handleRestartClick} title='Flower Field!' />
			<Box px={20}>
			<Grid container justifyContent="space-between" alignItems="center">
			<Grid item xs={6}>
			<Timer timer={timer} isActive={isActive} setIsActive={setIsActive} updateTimer={updateTimer} />
			<MessageCenter msg={message} />
            <Box margin="auto"
                  sx={{
                      width: width() + 100,
                      height: height() + 1,
                      mt: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                  }}
				  >
                <Grid container columns={1}
                      sx={{
                          width: width(),
                          height: height()
                      }}
                >
                    {
                        board.map((row, rowIdx) =>
                            <Grid item key={rowIdx} xs={1}>
                                <Row row={row} onClickCallback={(colIdx) =>
									onClickCallback(rowIdx, colIdx)} />
                            </Grid>
                        )
                    }
                </Grid>
		
            </Box>
			<Buttons 
				onFlagClick={handleFlagClick}
				onRevealMinesClick={handleRevealMinesClick}
				onRevealBoardClick={handleRevealBoardClick}
				flagClicked={flagClickStatus}
			/>
			</Grid>
			<Grid item xs={4}>
				<Box sx={{ width: '100%' }}>
				<TopBanner onClick={resetHistory} title="History" />
				<History history={tableItems} />
				</Box>
			</Grid>
		</Grid>
		</Box>
        </Fragment>
    );
};

export default Game;

