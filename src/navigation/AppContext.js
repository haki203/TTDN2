/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { createContext,useState } from 'react';
    // appContext la noi luu bien su dung chung cho cac man hinh
export const AppContext = createContext();

export const AppContextProvider = (props) =>{
    const {children} = props;
    const [isLogin,setIsLogin] = useState(false);
    const [test,setTest] = useState(false);
    const [isPlayAudio,setIsPlayAudio] = useState(false);
    const [lastIdPlay,setLastIdPlay] = useState(false);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [dataAudio, setDataAudio] = useState([]);
    const [data,setdata] = useState("false");
    const [isHearted, setIsHearted] = useState(false);


    // them in4 user de them thong tin ng dung luc login
    const [infoUser,setinfoUser] = useState({});
    const [passwordNe,setpasswordNe] = useState({});
    return (
        <AppContext.Provider value={{isLogin,setIsLogin,data,setdata,infoUser,setinfoUser,passwordNe,setpasswordNe,
        isTabVisible,setIsTabVisible,test,setTest,isPlayAudio,setIsPlayAudio,lastIdPlay,setLastIdPlay,isHearted,setIsHearted,dataAudio,
         setDataAudio}}>
            {children}
            {/*     // children la man hinh cho kho context
                    // value la du lieu sd chung */}
        </AppContext.Provider>
    )
}