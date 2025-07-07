import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import AddCabin from "./AddCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  if (cabins?.length == 0) <Empty resource="cabins" />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>cabin</div>
            <div>capacity</div>
            <div>price</div>
            <div>discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={cabins}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </Menus>
      <div>
        <AddCabin />
      </div>
    </>
  );
}
