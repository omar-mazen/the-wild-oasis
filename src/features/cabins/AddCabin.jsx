import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

export default function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens={"cabin-form"}>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name={"cabin-form"}>{<CreateCabinForm />}</Modal.Window>
      </Modal>
    </>
  );
}
