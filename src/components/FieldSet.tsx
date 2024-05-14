interface FieldSetProps {
  children: React.ReactNode;
  legend: string;
}

const FieldSet = ({ children, legend }: FieldSetProps) => (
  <fieldset
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5em",
      minHeight: "6em",
    }}
  >
    <legend>{legend}</legend>
    {children}
  </fieldset>
);

export default FieldSet;
