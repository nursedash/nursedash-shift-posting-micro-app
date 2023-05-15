import React from 'react';
import { Shift, ShiftSessionStatus, ShiftStatus } from '../../../../shared/gql/shift/types';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  TypographyProps
} from '@mui/material';
import { formatTimeRangeFromDateTimeStamps, getDateFromDateTimeStamp } from '../../../../shared/utils';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useAppSelector } from '../../../../shared/hooks';
import { selectFacilityTimezone } from '../../../../shared/redux/facility/slice';
// import formatToDollarAmount from '../../../../shared/utils/formatToDollarAmount';
import PostedShiftCardOverlay from './PostedShiftCardOverlay';
import uuid from 'react-uuid';
import CustomMUIChip from '../../../../shared/components/CustomMUIChip/CustomMUIChip';

interface PostedShiftCardProps {
  shift: Shift;
  sessionStatus: ShiftSessionStatus;
}

const typographyProps: TypographyProps = {
  variant: 'subtitle2'
}

const dataElement = (label: string, data: string, key: string): ReactJSXElement => {
  return (
    <Box key={key} display='flex' alignItems='center'>
      <Typography {...typographyProps} mr={1}>{`${label}:`}</Typography>
      <Typography {...typographyProps} fontWeight='regular'>{data}</Typography>
    </Box>
  )
}

const PostedShiftCard: React.FC<PostedShiftCardProps> = ({ shift, sessionStatus }) => {
  const isCancelled = shift.status === ShiftStatus.CANCELLED;
  const tz = useAppSelector(selectFacilityTimezone)
  const shiftDisplayData = [
    {
      label: 'Shift Duration',
      data: formatTimeRangeFromDateTimeStamps(shift.start_time, shift.end_time, tz)
    },
    {
      label: 'Break Time',
      data: `${shift.breakTime} minutes`
    },
    {
      label: 'Qualifications',
      data: shift.qualifications
    },
    // {
    //   label: 'Rate',
    //   data: formatToDollarAmount(shift.rate)
    // }
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .overlay': {
          opacity: 1,
        },
      }}
      mb={2}
    >
      <Card>
        <CardHeader
          title={
            <Box display='flex' alignItems='start' justifyContent='space-between'>
              <Typography variant='h6'>{shift.role}</Typography>
                <CustomMUIChip
                  label={isCancelled ? ShiftStatus.CANCELLED.toUpperCase() : sessionStatus}
                  color={isCancelled ? 'error' : sessionStatus === ShiftSessionStatus.NEW ? 'success' : 'info'}
                />
            </Box>
          }
          sx={{ pb: 0 }}
          subheader={<Typography>{getDateFromDateTimeStamp(shift.start_time)}</Typography>}
        />
        <CardContent>
          {shiftDisplayData.map((data) => dataElement(data.label, data.data?.toString(), uuid()))}
        </CardContent>
      </Card>
      <PostedShiftCardOverlay shiftId={shift.id} status={shift.status} />
    </Box>
  );
};

export default PostedShiftCard;