import * as React from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import Link from 'next/link';

import { FullSizeCenteredFlexBox } from '@/components/styled';
import { PropertyGeneralCodeCategory, PropertyGeneralCodeCategoryList } from '@/types/general_code';

const isClient = () => typeof window !== 'undefined';

function CSR(props: PropertyGeneralCodeCategoryList) {
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);
  const [data, setData] = React.useState<PropertyGeneralCodeCategoryList>(props);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const param: string = formData.get(`category`) as string;
    console.log(param);
    setIsLoading(true);
    fetchData(param)
      .then((d) => {
        setData(d);
      })
      .finally(() => setIsLoading(false));
  }
  if (isLoading) {
    return <Typography variant="h4">Now is Loading....</Typography>;
  }
  return (
    <>
      <FullSizeCenteredFlexBox>
        <Stack spacing={2}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h4">Here is CSR page.</Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <TextField
                    id="standard-basic"
                    label="category"
                    variant="outlined"
                    name="category"
                  />
                  <Button type="submit" variant="contained">
                    再取得
                  </Button>
                </Stack>
              </form>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  console.log(`click to ssr`);
                }}
              >
                <Link href="/ssr">to ssr</Link>
              </Button>
            </Grid>
          </Grid>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">category_id</TableCell>
                    <TableCell align="left">category</TableCell>
                    <TableCell align="right">displayName</TableCell>
                    <TableCell align="center">general_code_id</TableCell>
                    <TableCell align="right">code</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">displayOrder</TableCell>
                    <TableCell align="right">version</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.propertyGeneralCodeCategoryList.map(
                    (row: PropertyGeneralCodeCategory, i: number) =>
                      row.propertyGeneralCodeList.map((inRow, j: number) => (
                        <TableRow
                          key={`${inRow.id}`}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell scope="row">{i + j}</TableCell>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.category}</TableCell>
                          <TableCell align="center">{row.displayName}</TableCell>
                          <TableCell align="right">{inRow.id}</TableCell>
                          <TableCell align="right">{inRow.code}</TableCell>
                          <TableCell align="right">{inRow.name}</TableCell>
                          <TableCell align="right">{inRow.displayOrder}</TableCell>
                          <TableCell align="right">{inRow.version}</TableCell>
                        </TableRow>
                      )),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      </FullSizeCenteredFlexBox>
    </>
  );
}

async function fetchData(category?: string): Promise<PropertyGeneralCodeCategoryList> {
  const res = await axios.get<PropertyGeneralCodeCategoryList>(
    `http://localhost:8080/api/common/list-property-general-code-categories${
      category ? `?category=${category}` : ''
    }`,
  );
  return res.data;
}

export async function getServerSideProps() {
  console.log(`CSR:fetch at server.`);
  const data = fetchData();
  return { props: data };
}

export default CSR;
