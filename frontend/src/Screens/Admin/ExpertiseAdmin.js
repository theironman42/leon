import MaterialTable, { MTableToolbar, MTableBodyRow } from 'material-table'
import React, { useEffect, useRef, useState } from 'react'
import { deleteData, getData, postData, putData } from '../../Utils/backend'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { makeStylesGlobal } from '../../theme/GlobalTheme';
import ExpertiseForm from '../../Components/Admin/ExpertiseForm';



const useStyles = makeStylesGlobal(() => { })



function ExpertsAdmin() {

    const [openDialog, setOpenDialog] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const token = userLogin && userLogin.userInfo && userLogin.userInfo.token
    const classes = useStyles()
    const tableRef = useRef();
    const dispatch = useDispatch();
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

    const saveData = (data) => { postData('/api/expertise', data, token).then(() => refreshTable()) }
    const updateData = (data) => { putData(`/api/expertise/${data._id}`, data, token).then(() => refreshTable()) }

    return (
        <div>
            <Dialog onClose={() => { setOpenDialog(false) }} open={openDialog} maxWidth={'md'} fullWidth>
                <div className={classes.dialog}>
                    <ExpertiseForm onClose={handleClose} onUpdate={saveData} isNew />
                </div>
            </Dialog>

            <MaterialTable
                title="Expertises"
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
                    { title: "Reference", field: "reference" },
                ]}
                data={query => new Promise((resolve, reject) => {
                    let url = "/api/expertise?";
                    url += "pageSize=" + query.pageSize;
                    url += "&pageNumber=" + (query.page + 1);
                    getData(url, token)
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
                    <ExpertiseForm
                        data={rowData}
                        isNew={false}
                        onUpdate={updateData}
                        onClose={refreshTable}
                        onlyOne
                    />}
                actions={[{
                    icon: () => <><DeleteIcon /></>,
                    onClick: (event, rowData) => { refreshTable() },
                    tooltip: "Delete expertise"
                }
                ]}

            />
        </div>
    )
}

export default ExpertsAdmin
