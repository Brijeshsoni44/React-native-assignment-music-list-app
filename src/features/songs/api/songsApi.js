import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://itunes.apple.com/' }),
  endpoints: (builder) => ({
    getMichaelJacksonSongs: builder.query({
      query: () => 'search?term=Michael+jackson',
      transformResponse: (response) => response.results,
    }),
  }),
});

export const { useGetMichaelJacksonSongsQuery } = songsApi;