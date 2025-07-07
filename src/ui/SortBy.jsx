import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  function onChange(e) {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select value={sortby} options={options} onCahange={onChange} />;
}
