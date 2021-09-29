import React, { useState, useEffect } from "react";
import httpRequest from "../helper/httpRequest";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

export default function App() {
  const [serverData, setServerData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      httpMethod();
    }
  });

  function httpMethod() {
    httpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts",
      {},
      {},
      (res) => {
        setServerData(res.data);
        console.log(serverData);
        setIsLoaded(true);
      },
      (err) => {
        if (err.response) {
          if (err.response.status === 401) console.log("Error");
          //un-authorized ,Logout
          else if (err.response.status === 400) console.log("Error");
        } else console.log("Error");
      }
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: "#03a9f4" }}>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>TITLE</TableCell>
            <TableCell>BODY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serverData.slice(0).map((item) => (
            <TableRow hover key={item.id}>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
