import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
];

export const HeroesTable = ({ rows, handleRowClick }) => {
    return <Box sx={{
        width: '80%',
        display: 'flex',
        minHeight: 0,
        overflow: 'auto',
    }}>
        <DataGrid
            onRowClick={handleRowClick}
            rows={rows}
            columns={columns}
            hideFooter
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'surfaceAlt',
                },

            }}
        />
    </Box>
}