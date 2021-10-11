import MaterialTable from 'material-table'
import React, { useEffect, useRef } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, updateUser } from '../../actions/userActions';
import UserForm from '../../Components/Admin/UserForm';
// import { makeStylesGlobal } from '../../theme/GlobalTheme';



// const useStyles = makeStylesGlobal({})



function UsersListing(props) {


    //const classes = useStyles()
    const tableRef = useRef();
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList)
    const { users } = userList
    useEffect(() => {
        if(!users){
            dispatch(getUsersList())
        }
        return () => {
            
        }
    }, [dispatch, users])


    // function refreshTable() {
    //     if (tableRef && tableRef.current) {
    //         tableRef.current.onQueryChange();
    //     }
    // }


    const updateData = (data) => { dispatch(updateUser(data)) }

    return (
        <div>

            <MaterialTable
                title="Stamps"
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
                    <UserForm data={rowData} onSubmit={updateData} onCancel={()=>props.history.push('/')} isAdmin /> }
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
