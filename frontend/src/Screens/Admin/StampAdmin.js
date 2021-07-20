import MaterialTable, {MTableToolbar} from 'material-table'
import React, { useRef, useState } from 'react'
import StampForm from '../../Components/StampForm'
import { deleteData, getData, postData, putData } from '../../Utils/backend'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    dialog:{
        margin: "12px"
    },
    newButton:{
        textAlign: 'right',
        marginRight: '12px'
    }
}));


function StampsAdmin() {

    const [openDialog, setOpenDialog] = useState()

    const classes = useStyles()
    const tableRef = useRef();

    function refreshTable() {
        if (tableRef && tableRef.current) {
            tableRef.current.onQueryChange();
        }
    }

    const handleClose = () => { setOpenDialog(false) }

    const saveData = (data) => { postData('/api/stamps', data) }

    return (
        <div>
            <Dialog onClose={handleClose} open={openDialog} maxWidth={'md'} fullWidth>
                <div className={classes.dialog}>
                    <StampForm onClose={handleClose} onUpdate={saveData} />
                </div>
            </Dialog>

            <MaterialTable
                title="Stamps"
                components={{
                    Toolbar: props => (
                        <div>
                            <div>
                            <MTableToolbar {...props} />
                            </div>
                            <div className={classes.newButton}>
                                <Button variant={'outlined'} onClick={() => setOpenDialog(true)}>New</Button>
                            </div>
                        </div>
                        
                    )
                }}
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
                        onClose={()=>{}}
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
