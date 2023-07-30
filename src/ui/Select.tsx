import styled from 'styled-components';

interface StyleSelectProps {
  type?: string;
}

export const StyledSelect = styled.select<StyleSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props: StyleSelectProps) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  id?: string;
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
}

function Select({ options, value, onChange, type, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props} type={type}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
