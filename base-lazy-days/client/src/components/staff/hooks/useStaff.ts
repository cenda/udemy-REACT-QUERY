import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

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
  const defaultFilterValue: string = "all";

  // for filtering staff by treatment
  const [filter, setFilter] = useState(defaultFilterValue);

  const selectFn = useCallback(
    (allStaff: Staff[]): Staff[] => {
      return filter === defaultFilterValue
        ? allStaff
        : filterByTreatment(allStaff, filter);
    },
    [filter]
  );

  const fallback: Staff[] = [];
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: (data) => selectFn(data),
  });

  return { staff, filter, setFilter };
}
