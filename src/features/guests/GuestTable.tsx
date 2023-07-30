import { useSearchParams } from 'react-router-dom';

import Empty from "../../ui/Empty"
import Menus from "../../ui/Menus"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import GuestRow, { GuestRowProps } from "./GuestRow"
import { useGuests } from "./useGuests"

function GuestTable() {
  const { guests, isLoading } = useGuests()!;
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!guests?.length) return <Empty resourceName='guests' />;

  // Sort
  const sortBy = searchParams.get('sortBy') || 'fullName-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedGuests = guests?.sort(
    (a, b) => ((a as any)[field] - (b as any)[field]) * modifier
  );

  console.log({sortBy, field, direction})

  return (
    <Menus>
    <Table $columns="1fr 1fr .25fr 1fr">
      <Table.Header>
        <div>Guest</div>

        <div>Nationality</div>
        <div></div>
        <div>National ID#</div>
    
      </Table.Header>
      <Table.Body
        data={sortedGuests}
        render={(guest: GuestRowProps) => (
          <GuestRow {...guest} />
        )}
      />
    </Table>
  </Menus>
  )
}

export default GuestTable