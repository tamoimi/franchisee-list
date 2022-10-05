import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddModal from "../components/AddModal";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const FranchiseeList = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <h2>등록 가맹점 리스트</h2>
        <AddModal />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>가맹점ID</TableCell>
              <TableCell>가맹점명</TableCell>
              <TableCell>업종</TableCell>
              <TableCell>등록일자</TableCell>
              <TableCell>사업규모</TableCell>
              <TableCell>수수료율</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>
                <TableCell>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <style>{`
      	.MuiPaper-root {
          width: 1000px;
          height: auto;
          margin: 100px auto;
        }
        .MuiTableHead-root {
          background: #BAD7DF;
        }
        h2 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default FranchiseeList;
