const InputGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
        minHeight: "6em",
      }}
    >
      {children}
    </div>
  );
};

export default InputGroup;
