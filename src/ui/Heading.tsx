interface HeadingProps {
  children: React.ReactNode;
  as?: string;
}

function Heading({ children }: HeadingProps) {
  return <div>{children}</div>;
}

export default Heading;
