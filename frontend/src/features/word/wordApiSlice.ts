import apiSlice from '../../app/api/apiSlice';

export const wordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postRepetition: builder.mutation({
      query: ({ content }) => ({
        url: '/repetitions',
        method: 'POST',
        body: { content },
      }),
    }),
  }),
});

export const { usePostRepetitionMutation } = wordApiSlice;
