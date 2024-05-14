const Section = ({ children }: { children: React.ReactNode }) => (
  <section
    style={{ border: "1px solid black", padding: "1em", margin: "0 0 2em" }}
  >
    {children}
  </section>
);

export default Section;
