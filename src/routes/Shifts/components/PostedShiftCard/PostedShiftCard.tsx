import React from 'react';
import { Shift } from '../../../../shared/gql/shift/types';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  TypographyProps, Chip
} from '@mui/material';
import { formatTimeRangeFromDateTimeStamps, getDateFromDateTimeStamp } from '../../../../shared/utils';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useAppSelector } from '../../../../shared/hooks';
import { selectFacilityTimezone } from '../../../../shared/redux/facility/slice';
import formatToDollarAmount from '../../../../shared/utils/formatToDollarAmount';
import PostedShiftCardOverlay from './PostedShiftCardOverlay';
import uuid from 'react-uuid';

interface PostedShiftCardProps {
  shift: Shift;
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

const PostedShiftCard: React.FC<PostedShiftCardProps> = ({ shift }) => {
  const isCancelled = shift.status === 'cancelled'
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
    {
      label: 'Rate',
      data: formatToDollarAmount(shift.rate)
    }
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
          title={shift.role}
          subheader={
          <Box display='flex' alignItems='center'>
            {
              isCancelled ? <Chip label={shift.status.toUpperCase()} color={'error'} />
                : <Typography>{getDateFromDateTimeStamp(shift.start_time)}</Typography>
            }
          </Box>
          }
        />
        <CardContent>
          {shiftDisplayData.map((data) => dataElement(data.label, data.data.toString(), uuid()))}
        </CardContent>
      </Card>
      <PostedShiftCardOverlay shiftId={shift.id} status={shift.status} />
    </Box>
  );
};

export default PostedShiftCard;