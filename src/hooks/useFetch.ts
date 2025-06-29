import { useState } from "react";
import useSWR from "swr";
import { fetcher, VITE_API_ENDPOINT } from "../components/constants";

type ApiRes = {
  data: Repositories[];
  success: boolean;
  next_page: number;
};


function useFetch() {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);

  const { isLoading, error, data } = useSWR<ApiRes>(
    `${VITE_API_ENDPOINT}/host/github.com/explore?page=${page}`,
    fetcher
  );

  return { isLoading, error, data, nextPage };
}

export default useFetch;
