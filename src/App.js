import { SpecificFishDisplay } from "components/DataDisplay";
import { AppLayout, Header } from "@awsui/components-react";

function App() {
  return (
    <AppLayout
      // contentHeader={<Header>Data fetched from a GraphQL API</Header>}
      content={<SpecificFishDisplay />}
      navigationHide={true}
      toolsHide={true}
      contentType={"cards"}
    />
  );
}

export default App;
