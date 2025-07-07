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

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>
          {" "}
          fits up to {maxCapacity} {`${maxCapacity > 1 ? "guests" : "guest"}`}
        </div>
        <Price>{formatCurrency(price)}</Price>
        <Discount>{discount == 0 ? "__" : formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Modal.Open opens={"delete-cabin"}>
              <button disabled={isDeleting}>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name={"delete-cabin"}>
              {
                <ConfirmDelete
                  onConfirm={() => deleteCabin(id)}
                  disabled={isDeleting}
                  resourceName={name}
                />
              }
            </Modal.Window>

            <Modal.Open opens={"update-form"}>
              <button>
                <HiPencilSquare />
              </button>
            </Modal.Open>
            <Modal.Window name={"update-form"}>
              {<UpdateCabinForm cabin={cabin} />}
            </Modal.Window>

            <button
              disabled={isCreating}
              onClick={() => {
                createCabin({
                  name: `copy of - ${name}`,
                  maxCapacity,
                  regularPrice: price,
                  discount,
                  description,
                  image,
                });
              }}
            >
              <HiMiniDocumentDuplicate />
            </button>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}
