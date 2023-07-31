import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
import { BookingAfterDate } from '../../services/apiBookings';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoadingBookings } = useRecentBookings()!;
  const { confirmedStays, isLoadingStays, numDays } = useRecentStays()!;
  const { cabins, isLoading: isLoadingCabins } = useCabins()!;

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as Array<BookingAfterDate>}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings as Array<BookingAfterDate>} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
