import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivities() {
  const { data, isLoading } = useQuery({
    queryKey: ["today-activities"],
    queryFn: getStaysTodayActivity,
  });
  return { data, isLoading };
}
