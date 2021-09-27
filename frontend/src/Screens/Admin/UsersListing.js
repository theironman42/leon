import MaterialTable, {MTableToolbar} from 'material-table'
import React, { useEffect, useRef, useState } from 'react'
import { deleteData, getData, postData, putData } from '../../Utils/backend'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../../actions/userActions';



const useStyles = makeStyles(theme => ({
    dialog:{
        margin: "12px"
    },
    newButton:{
        textAlign: 'right',
        marginRight: '12px'
    }
}));


function UsersListing() {

    const [openDialog, setOpenDialog] = useState(false)

    const classes = useStyles()
    const tableRef = useRef();
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList)
    const { users, loading, error} = userList
    useEffect(() => {
        if(!users){
            dispatch(getUsersList())
        }
        return () => {
            
        }
    }, [])


    console.log(users)

    function refreshTable() {
        if (tableRef && tableRef.current) {
            tableRef.current.onQueryChange();
        }
    }

    const handleClose = () => { setOpenDialog(false) }

    const saveData = (data) => {  }
    const updateData = (data) => {  }

    return (
        <div>
            <Dialog onClose={() => { setOpenDialog(false) }} open={openDialog} maxWidth={'md'} fullWidth>
                <div className={classes.dialog}>
                    FORM SHOULD BE HERE
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
                    { title: "Role", field: "role" }
                ]}
                data={users && users.data}

                options={{
                    pageSize: 20,
                    search: false,
                    actionsColumnIndex: -1,
                }}
                detailPanel={rowData =>
                    <label>tada</label>}
                actions={[{
                    icon: () => <><DeleteIcon /></>,
                    onClick: (event, rowData) => { console.log("delete user")},
                    tooltip: "Delete user"
                }
                ]}

            />
        </div>
    )
}

export default UsersListing
