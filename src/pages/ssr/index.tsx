import * as React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import Link from 'next/link';

import { FullSizeCenteredFlexBox } from '@/components/styled';

import { UserInfo } from '../../types/user';

const isClient = () => typeof window !== 'undefined';

function SSR(props: UserInfo) {
  // const { isLoading, error, data } = useQuery(['repoData'], () => axios.get('https://api.github.com/repos/tannerlinsley/react-query'))
  return (
    <>
      <FullSizeCenteredFlexBox>
        <Stack spacing={2}>
          <Typography variant="h4">Here is SSR page.</Typography>
          <div>
            <p>user_id: {props.user.id}</p>
            <p>user_name: {`${props.user.lastName} ${props.user.firstName}`}</p>
            <p>IPAddress: {props.ipAddress}</p>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                console.log(`click to csr`);
              }}
            >
              <Link href="/csr">to csr</Link>
            </Button>
          </div>
        </Stack>
      </FullSizeCenteredFlexBox>
    </>
  );
}

async function fetchData(): Promise<UserInfo> {
  const res = await axios.get<UserInfo>(`http://localhost:8080/api/common/get-user-info`);
  return res.data;
}

export async function getServerSideProps() {
  console.log(`SSR:fetch at server.`);
  const data = fetchData();
  return { props: data };
}

export default SSR;
