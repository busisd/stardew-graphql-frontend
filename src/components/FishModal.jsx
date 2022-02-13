import { gql, useLazyQuery } from "@apollo/client";
import { Button, Modal, Textarea } from "@awsui/components-react";
import { useCallback, useMemo, useState } from "react";

const SPECIFIC_FISH_QUERY = gql`
  query GetSpecificFish($id: ID) {
    fish(id: $id) {
      price
      availableSeasons
    }
  }
`;

export const FishModal = ({ name, id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [getFish, { loading, error, data }] = useLazyQuery(
    SPECIFIC_FISH_QUERY,
    { variables: { id } }
  );
  const openModal = useCallback(() => {
    getFish();
    setModalOpen(true);
  }, [getFish]);

  return (
    <>
      <Button onClick={openModal}>More details</Button>
      <Modal
        visible={modalOpen}
        onDismiss={() => setModalOpen(false)}
        header={name}
      >
        <Textarea readOnly value={JSON.stringify(data, null, 2)} rows={15}/>
      </Modal>
    </>
  );
};
