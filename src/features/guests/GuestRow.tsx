import { styled } from "styled-components";
import Table from "../../ui/Table"

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 2rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;


export interface GuestRowProps {
  fullName: string;
  email: string;
  nationality?: string;
  countryFlag?: string;
  nationalID?: string;
}

function GuestRow({ fullName, email, nationality, countryFlag, nationalID }: GuestRowProps) {
  return (
    <Table.Row>
            <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>
    
 
      {nationality && <div>{nationality}</div>}
      {countryFlag ? <Img src={countryFlag as string} alt={nationality} /> : <span>&mdash;</span>}
      {nationalID ? <div>{nationalID}</div> : <span>&mdash;</span>}
    </Table.Row>
  )
}

export default GuestRow