import { useState, useEffect } from "react";
import UsersView from "./UsersView";

const UserContainer = () => {
    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState (true);

    const token = JSON.parse(localStorage.getItem('token'))
    
    const getDataUsers= async () => {
        try{ 

            const response = await fetch("http://localhost:5000/users",{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            if(!response.ok){
                console.log("error en la consulta")
            }
            const data= await response.json()
            setData(data)

        }catch{
            console.log("error en la API")
        }finally{
            setLoadingData(false)
        }
    }

    useEffect(() =>{
        getDataUsers()
    }, [])

return(
    <UsersView loadingData={loadingData} data={data} />
)     
}

export default UserContainer