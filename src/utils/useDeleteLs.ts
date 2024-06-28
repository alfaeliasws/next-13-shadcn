import * as ls from 'local-storage'
import { useEffect } from "react";

export default function useDeleteLs() : void{
    useEffect(() => {
        ls.remove("userData")
    },[])
}