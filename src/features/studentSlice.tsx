import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Student } from "../models/student.model";

export const studentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65a6d82674cf4207b4f0ed5a.mockapi.io",
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "/Student",
      providesTags: ["Student"],
      //   transformResponse: (response: Student[], meta, args) => {
      //     return response.slice(0, 4);
      //   },
      transformResponse: (response: Student[], meta, args: any) => {
        if (args === 2) {
          return response.slice(0, 4);
        }
        return response.sort((a, b) =>
          a.studentName.localeCompare(b.studentName)
        );
      },
    }),
    getStudent: builder.query<Student[], void>({
      query: (id) => `/Student/${id}`,
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation<void, Student>({
      query: (student) => ({
        url: "/Student",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation<void, Student>({
      query: ({ id, ...rest }) => ({
        url: `/Student/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
} = studentApi;
