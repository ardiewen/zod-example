import DiscriminatedUnionExample from "./forms/DiscriminatedUnionExample";
import SuperRefineExample from "./forms/SuperRefineExample";

function App() {
  return (
    <>
      <h1>hello world</h1>
      <p>
        This is a contrived form example that shows conditional validation using
        `react-hook-form` and with `zod` validation
      </p>
      <SuperRefineExample />
      <DiscriminatedUnionExample />
    </>
  );
}

export default App;
