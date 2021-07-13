import MaterialTable from 'material-table'
import React from 'react'
import StampForm from '../../Components/StampForm'
import { getData } from '../../Utils/backend'

function StampsAdmin() {
    return (
        <div>
            <MaterialTable 
            columns={[
                {title: "Name", field:"name"},
                {title: "Image", field:"image"},
                {title: "Country", field:"country"},
                {title: "Price", field:"price"}
            ]}
            data={query => new Promise((resolve, reject)=> { getData("/api/stamps")
            .then(({data}) => {
                const result = data
                console.log(query, result)
              resolve({
                data: result.data,
                totalCount: result.total,
                page: 0
              })
            })})}
            />
        </div>
    )
}

export default StampsAdmin
