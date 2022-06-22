import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteProduct, getPharmacyProducts, getPharmacyProductsbySearch, getProductbyName, getProducts, getProductsbySearch } from '../../../api';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = Array.prototype.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'code',
    numeric: true,
    disablePadding: true,
    label: 'Code',
  },
  {
    id: 'productName',
    numeric: true,
    disablePadding: true,
    label: 'Product Name',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },

  {
    id: 'stock',
    numeric: true,
    disablePadding: false,
    label: 'Stock',
  },
  {
    id: 'laboratory',
    numeric: false,
    disablePadding: false,
    label: 'Laboratory',
  },
  {
    id: 'agent',
    numeric: false,
    disablePadding: false,
    label: 'Agent',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        null
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function PharmacyProducts() {
  const [productsList, setProductsList] = useState([]);
  const [generalProdInfo, setgeneralProdInfo] = useState([]);
  const [state, setState] = useState('');
  const loggedUser = JSON.parse(localStorage.getItem('profile'));
  const handleSearch = (value) => {
    setState(value);
  }

  console.log("searchhhh", state);

  useEffect(async () => {
    const products = state !== '' ? await getPharmacyProductsbySearch(loggedUser._id, state) : await getPharmacyProducts(loggedUser._id);

    setProductsList(products.data);

    // const generalProdInformation = await getProductbyName(products.data.data.productName);
    // setgeneralProdInfo(generalProdInformation.data);

  }, [state]);

  console.log("procuts", productsList);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = productsList.data.map((n) => n.productName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, productName) => {
    const selectedIndex = selected.indexOf(productName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, productName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (productName) => selected.indexOf(productName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsList?.data?.length) : 0;


  const deleteProd = async (id) => {
    console.log("id", id)
    const res = await deleteProduct(id);

    if (res.data.success === true) {
      window.location.reload()
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        id="outlined-required"
        label="Search by product name"
        defaultValue=''
        sx={{ width: '40%' }}
        onChange={(e) => handleSearch(e.target.value)}
      >
        <SearchIcon />
      </TextField>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <EnhancedTableToolbar numSelected={selected?.length} searchPoduct={state} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={productsList?.data?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {productsList?.data?.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // console.log("rowwwwwwwwwww", row)
                  const isItemSelected = isSelected(row.productName);
                  // const labelId = `enhanced-table-checkbox-${index}`;


                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.productName)}
                      // role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        // component="th"
                        // id={labelId}
                        align="right"
                        sx={{ width: '60px', height: '60px' }}
                      >
                        <img src={row.image} style={{ width: '100% !important', height: '60px', marginTop: 0 }}></img>
                      </TableCell>
                      <TableCell align="right">{row.code}</TableCell>
                      <TableCell align="right">{row.productName}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">{row.laboratory}</TableCell>
                      <TableCell align="right">{row.agent}</TableCell>
                      <TableCell align="right">
                        <EditIcon sx={{ marginRight: '20px', color: '#00B8B0', cursor: 'pointer' }} />
                        <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteProd(row._id)} />
                      </TableCell>
                      {/* {
                        productsList?.generalInfo?.filter((item) => item.productName === row.productName).map((item) => {
                          return (
                            <>
                              <TableCell align="right">{item.laboratory}</TableCell>
                              <TableCell align="right">{item.agent}</TableCell>
                            </>
                          )
                        })
                      } */}

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, 600]}
          component="div"
          count={productsList?.data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
