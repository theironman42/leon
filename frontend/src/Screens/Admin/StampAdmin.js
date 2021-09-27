import MaterialTable, {MTableToolbar} from 'material-table'
import React, { useEffect, useRef, useState } from 'react'
import StampForm from '../../Components/StampForm'
import { deleteData, getData, postData, putData } from '../../Utils/backend'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { uploadProduct, deleteProduct, editProduct } from '../../actions/productActions';



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

    const [openDialog, setOpenDialog] = useState(false)

    const classes = useStyles()
    const tableRef = useRef();
    const dispatch = useDispatch();
    const productDelete = useSelector(state => state.productDelete)
    useEffect(() => {
        
        return () => {
            
        }
    }, [])

    function refreshTable() {
        if (tableRef && tableRef.current) {
            tableRef.current.onQueryChange();
        }
    }

    const handleClose = () => { setOpenDialog(false) }

    const saveData = (data) => { dispatch(uploadProduct(data)).then(()=>refreshTable()) }
    const updateData = (data) => { dispatch(editProduct(data)).then(()=>refreshTable()) }

    return (
        <div>
            <Dialog onClose={() => { setOpenDialog(false) }} open={openDialog} maxWidth={'md'} fullWidth>
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
                            resolve({
                                data: result.data,
                                totalCount: result.total,
                                page: 0
                            })
                        })
                })}

                options={{
                    pageSize: 20,
                    search: false,
                    actionsColumnIndex: -1,
                }}
                detailPanel={rowData =>
                    <StampForm
                        data={rowData}
                        isNew={false}
                        onUpdate={updateData}
                        onClose={()=>{}}
                    />}
                actions={[{
                    icon: () => <><DeleteIcon /></>,
                    onClick: (event, rowData) => { dispatch(deleteProduct(rowData._id)).then(refreshTable) },
                    tooltip: "Delete stamp"
                }
                ]}

            />
        </div>
    )
}

export default StampsAdmin
