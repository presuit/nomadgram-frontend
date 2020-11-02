import { useQuery } from "@apollo/client";
import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { SEARCH } from "./SearchQueries";

const Search = withRouter((props) => {
    const {
        location: { search },
    } = props;
    let term = search.split("=")[1];
    term = decodeURI(term);
    const { data, loading } = useQuery(SEARCH, {
        skip: term === undefined,
        variables: {
            term,
        },
    });
    return <SearchPresenter term={term} data={data} loading={loading}></SearchPresenter>;
});

export default Search;
