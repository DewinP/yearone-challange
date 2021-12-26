import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoin } from "../../interfaces";
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),
  tagTypes: ["Coin"],
  endpoints: (build) => {
    return {
      getAllCoinPrices: build.query<ICoin[], void>({
        query: () => ({
          url: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: "Coin" as const,
                  id: id,
                })),
                { type: "Coin" as const, id: "LIST" },
              ]
            : [{ type: "Coin" as const, id: "LIST" }],
      }),
    };
  },
});

export const { useGetAllCoinPricesQuery } = cryptoApi;