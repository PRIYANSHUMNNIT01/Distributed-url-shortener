import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface SubmitUrlBodyProps {
  originalUrl: string;
}

export const urlsApiSlice = createApi({
  reducerPath: 'urlsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,

    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem('token');

      if (token) {
        headers.set(
          'Authorization',
          `Bearer ${token}`
        );
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUrl: builder.query<void, string>({
      query: (
        shortenUrlKey: string
      ) => ({
        url: `/urls/${encodeURIComponent(
          shortenUrlKey
        )}`,
        responseHandler: async (
          response: Response
        ) => {
          if (!response.ok) {
            const errorText =
              await response.text();

            throw new Error(errorText);
          }

          const originalUrl =
            await response.text();

          window.location.replace(
            originalUrl
          );
        },
      }),
    }),

    submitUrl: builder.mutation<
      string,
      SubmitUrlBodyProps
    >({
      query: (
        body: SubmitUrlBodyProps
      ) => ({
        url: '/urls',
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
  }),
});

export const {
  useGetUrlQuery,
  useSubmitUrlMutation,
} = urlsApiSlice;