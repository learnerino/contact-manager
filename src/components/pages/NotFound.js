import React from 'react';

function NotFound(props) {
    return (
        <div><h1 className={"display-4"}>
            <span className={"text-danger"}> 404 </span> Not Found
        </h1>
            <p className={"lead"}> This page does not exists</p></div>
    );
}

export default NotFound;