import React { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks} from "../../actions/index.js";


export default function Favorites() {
    const allBooks = useSelector((state) => state.allBooks);
    const dispatch = useDispatch();
    useEffec(() => {
       
     dispatch(getAllBooks());
    }, []);

console.log("Todos mis Libros",allBooks)

    // const allIds = allBooks ?.map((i) => (

    //   <div>{i.id}</div>  

    // ))
    // console.log(allIds)
return(

""
  
)

}

Favorites()