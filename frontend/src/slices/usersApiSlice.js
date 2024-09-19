import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/update`,
        method: "PUT",
        body: data,
      }),
    }),
    userPublicProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/author/${data.userId}`,
        method: "GET",
      }),
    }),
  }),
});

// If We're fetching data then it would be
// called useLoginQuery
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateProfileMutation,
  useUserPublicProfileMutation
} = usersApiSlice;
