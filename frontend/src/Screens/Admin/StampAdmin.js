import MaterialTable from 'material-table'
import React, { useRef } from 'react'
import StampForm from '../../Components/StampForm'
import { deleteData, getData, postData, putData } from '../../Utils/backend'
import DeleteIcon from '@material-ui/icons/Delete';

function StampsAdmin() {

    const tableRef = useRef();

    function refreshTable() {
        if (tableRef && tableRef.current) {
            tableRef.current.onQueryChange();
        }
    }

    return (
        <div>
            <MaterialTable
                title="Stamps"
                tableRef={tableRef}
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Image", field: "image" },
                    { title: "Country", field: "country" },
                    { title: "Price", field: "price" }
                ]}
                data={query => new Promise((resolve, reject) => {
                    getData("/api/stamps")
                        .then(({ data }) => {
                            const result = data
                            console.log(query, result)
                            resolve({
                                data: result.data,
                                totalCount: result.total,
                                page: 0
                            })
                        })
                })}

                options={{
                    pageSize: 50,
                    search: false,
                    actionsColumnIndex: -1,
                }}
                detailPanel={rowData =>
                    <StampForm
                        data={rowData}
                        isNew={false}
                        onUpdate={(data) => { putData(`/api/stamps/${rowData._id}`, data, refreshTable) }}
                    />}
                actions={[{
                    icon: () => <><DeleteIcon /></>,
                    onClick: (event, rowData) => { deleteData(`/api/stamps/${rowData._id}`, refreshTable) },
                    tooltip: "Delete stamp"
                }
                ]}

            />
        </div>
    )
}

export default StampsAdmin
