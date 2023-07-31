import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
import { BookingAfterDate, GuestStay } from '../../services/apiBookings';

interface StatsProps {
  bookings: Array<BookingAfterDate>;
  confirmedStays: Array<GuestStay>;
  numDays: number;
  cabinCount: number;
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings.length || 0;
  const sales =
    bookings.reduce((acc: number, cur: BookingAfterDate) => acc + Number(cur?.totalPrice), 0) || 0;
  const checkins = confirmedStays?.length || 0;
  const occupancy =
    confirmedStays.reduce((acc: number, cur:GuestStay) => acc + Number(cur.numNights), 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={`${numBookings}`}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(Number(sales))}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={`${checkins}`}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancy * 100)}%`}
      />
    </>
  );
}

export default Stats;
