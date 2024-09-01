import { createContext, useEffect, useState } from "react";


export let auth = createContext('')

export default function AuthContextProvider({children}){

    let[isLogin , setLogin]=useState('')

    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
          setLogin(localStorage.getItem('userToken'))
        }
      },[])

    return<auth.Provider value={{isLogin , setLogin}}>
         {children}
    </auth.Provider>

}