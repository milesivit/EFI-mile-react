import { useState, useEffect, Fragment } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
        

const UserContainer = () => {
    const [data, setData] = useState([]),
    [loadingData, setLoadingData] = useState (true);

    const getDataUsers= async () => {
        try{ 

            const response = await fetch("https://jsonplaceholder.typicode.com/users")
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
    <Fragment>
        {loadingData ? 
        <ProgressSpinner/> 
        :
            data.map((user) =>(
                <h2 key={user.id}>{user.name}</h2>
            ))
        }
    </Fragment>
)     
}

export default UserContainer