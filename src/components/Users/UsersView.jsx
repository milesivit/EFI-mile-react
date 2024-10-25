import { Fragment } from "react"
import { ProgressSpinner } from "primereact/progressspinner"

const UsersView = ({loadingData, data}) => {
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
export default UsersView