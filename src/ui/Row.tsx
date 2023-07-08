interface RowProps {
  children: React.ReactNode;
  type?: string;
}
function Row({ children }: RowProps) {
  return <div>{children}</div>;
}

export default Row;
