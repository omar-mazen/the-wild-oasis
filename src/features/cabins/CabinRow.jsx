import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import {
  HiMiniDocumentDuplicate,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";
import UpdateCabinForm from "./updateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const {
    id,
    name,
    maxCapacity,
    regularPrice: price,
    discount,
    image,
    description,
  } = cabin;
  function handleDuplicate() {
    createCabin({
      name: `copy of - ${name}`,
      maxCapacity,
      regularPrice: price,
      discount,
      description,
      image,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>
          fits up to {maxCapacity} {`${maxCapacity > 1 ? "guests" : "guest"}`}
        </div>
        <Price>{formatCurrency(price)}</Price>
        <Discount>{discount == 0 ? "__" : formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiMiniDocumentDuplicate />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens={"update"}>
                  <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name={"update"}>
                <UpdateCabinForm cabin={cabin} />
              </Modal.Window>

              <Modal.Window name={"delete"}>
                <ConfirmDelete
                  onConfirm={() => deleteCabin(id)}
                  disabled={isDeleting}
                  resourceName={name}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}
