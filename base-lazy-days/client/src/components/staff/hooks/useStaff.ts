import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  const defaultFilterValue = "all";
  // for filtering staff by treatment
  const [filter, setFilter] = useState(defaultFilterValue);

  // TODO: get data from server via useQuery
  const fallback: Staff[] = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
  });

  const staff: Staff[] =
    filter !== defaultFilterValue ? filterByTreatment(data, filter) : data;

  return { staff, filter, setFilter };
}
