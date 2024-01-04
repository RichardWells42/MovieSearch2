//import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
import StatusCode from "../../utils/StatusCode";       //trying something

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    //const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    //const seriesText = "Friends";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&i=${id}&Plot=full`
    );
    return response.data;
  }
);

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    status: StatusCode.IDLE     //trying something
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        // addMovies: (state, { payload }) => {               //comment out addMovies
        //     state.movies = payload;
        // },
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        // removeSelectedMovieOrShow: (state, { payload }) => {      //trying something
        //     state.selectMovieOrShow = payload;
        },
    },
    // extraReducers: {
    //     [fetchAsyncMovies.pending]: () => {
    //         console.log("Pending");
    //     },
    //     [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
    //         console.log("Fetched Successfully!");
    //          return { ...state, movies: payload };
    //          //state.movies = payload;
    //     },
    //     [fetchAsyncMovies.rejected]: () => {
    //         console.log("Rejected");
    //     },
    //     [fetchAsyncShows.fulfilled]: (state, { payload }) => {
    //         console.log("Fetched Successfully!");
    //          return { ...state, shows: payload };
    //          //state.movies = payload;
    //     },
    //     [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
    //         console.log("Fetched Successfully!");
    //          return { ...state, selectMovieOrShow: payload };
    //          //state.movies = payload;
    //     },
    //   },
    extraReducers: (builder) => {
      builder
      .addCase(fetchAsyncMovies.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(fetchAsyncMovies.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        state.shows = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        //state.movies = action.payload;
        state.selectMovieOrShow = action.payload;
        //state.shows = action.payload;
        state.status = StatusCode.IDLE;
      })
   }
}); 

export const { removeSelectedMovieOrShow } = movieSlice.actions;
//export const { addMovies } = movieSlice.actions;                        //comment out addMovies
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;