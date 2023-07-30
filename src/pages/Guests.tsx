import GuestList from '../features/guests/GuestList';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
      </Row>

      <Row>
        <GuestList/>
        
      </Row>
    </>
  );
}

export default Guests;