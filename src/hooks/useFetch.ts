import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

type ApiRes = {
  data: Repositories[];
  success: boolean;
  next_page: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function useFetch() {
  const [page, setPage] = useState(1);
  const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const nextPage = () => setPage((prev) => prev + 1);

  const { isLoading, error, data } = useSWR<ApiRes>(
    `${VITE_API_ENDPOINT}/host/github.com/explore?page=${page}`,
    fetcher
  );

  return { isLoading, error, data, nextPage };
}

export default useFetch;
