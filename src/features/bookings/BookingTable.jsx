import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { Pagenation } from "../../ui/Pagination";
function BookingTable() {
  const { isLoading, isError, bookings, count } = useBookings();
  if (count == 0) <Empty resource="bookings" />;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagenation count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
