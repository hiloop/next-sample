import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
});

const FullSizeFlexBox = styled(FlexBox)({
  alignItems: 'center',
  width: '100%',
  height: '100%',
  marginTop: '5em',
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, FullSizeFlexBox };
