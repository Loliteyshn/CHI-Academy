import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { HeroesType } from '../types/heroesType';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
];

interface HeroesTableProps {
    rows: HeroesType[] | undefined,
    handleRowClick: (params: GridRowParams) => void
}

export const HeroesTable: React.FC<HeroesTableProps> = ({ rows, handleRowClick }) => {    
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