import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GameHistoryTable = ({ history }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Outcome</TableCell>
                        <TableCell>Timer</TableCell>
                        <TableCell>Difficulty</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {history.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <TableCell>{row[0]}</TableCell>
                            <TableCell>{row[1]}</TableCell>
                            <TableCell>{row[2]}</TableCell>
                        </TableRow>
                    ))}
				</TableBody>
            </Table>
        </TableContainer>
    );
};

export default GameHistoryTable;

