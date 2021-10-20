import MaterialTable from 'material-table'
import React, { useRef } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateUser } from '../../actions/userActions';
import UserForm from '../../Components/Admin/UserForm';
import { getData } from '../../Utils/backend';
// import { makeStylesGlobal } from '../../theme/GlobalTheme';



// const useStyles = makeStylesGlobal({})



function UsersListing(props) {


    //const classes = useStyles()
    
    const tableRef = useRef();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin.userInfo)
    

    function refreshTable() {
        if (tableRef && tableRef.current) {
            tableRef.current.onQueryChange();
        }
    }


    const updateData = (data) => { dispatch(adminUpdateUser(data)).then(refreshTable) }

    return (
        <div>

            <MaterialTable
                title="Stamps"
                tableRef={tableRef}
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Role", field: "role" }
                ]}
                data={query => new Promise((resolve, reject) => {
                    let url =  "/api/admin/users?";
                    url += "pageSize=" + query.pageSize;
                    url += "&pageNumber=" + (query.page + 1);
                    getData(url, userInfo.token)
                        .then(({ data }) => {
                            const result = data
                            resolve({
                                data: result.data,
                                totalCount: result.total,
                                page: result.page
                            })
                        })
                })}

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
