import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel' 
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { useReactTable } from '@tanstack/react-table'
import { getCoreRowModel } from '@tanstack/react-table'
import { getPaginationRowModel } from '@tanstack/react-table'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

function App() {
  const [ guitarModel, setGuitarModel] = useState('')
  const [bodytype, setBodytype] = useState('')
  const [brandName, setBrandName] = useState('')
  const [stockQuantity, setStockQuantity ] = useState(1)
  const [errorMes, setErrorMes] = useState('')
  const [manufacturerName, setManufacturerName] = useState('')
  const [userRole, setUserRole] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState('')
  const [activeItem, setActiveItem] = useState('')

  const columns = [
    { accessorKey: 'guitarModel', header: 'Guitar Model'},
    { accessorKey: 'bodytype', header: 'Body Type'},
    { accessorKey: 'brandName', header: 'Brand Name'},
    { accessorKey: 'stockQuantity', header: 'Stock Quantity'},
    { accessorKey: 'userRole', header: 'User Role'},
    { accessorKey: 'manufacturerName', header: 'Manufacturer Name'},
  ]

  const table = useReactTable({
    data:items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } }
  })

  useEffect(() =>{
      setActiveItem(selected)
  }, [selected])


  const submit = () => {

    if(guitarModel =="" || bodytype =="" || brandName =="" || stockQuantity=="" || manufacturerName =="" || userRole ==""){
      setErrorMes("Please Fill Up All Fields")
      return
    }

    if(guitarModel.length < 3){
      setErrorMes("Guitar Model must be atleast 3 characters")
      return
    }

    if(brandName.length < 3){
      setErrorMes("Brand Name must be atleast 3 characters")
      return
    }

    if(manufacturerName.length < 3){
      setErrorMes("Manufacturer Name must be atleast 3 characters")
      return
    }

    if(stockQuantity < 1 || stockQuantity > 100){
      setErrorMes("Stock Quantity Should be 1-100")
      return
    }

    else{
      setItems([...items, { guitarModel, bodytype, brandName, stockQuantity, userRole, manufacturerName }])
      setSubmitted(true)
    }

  }

if (submitted == true){
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:'#2a57aa', minHeight:'100hv' }}>
        <div style={{  backgroundColor:'#ffffff', width:'100%', minHeight:'400px'}}>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px',}}>
          <Typography variant='h5'>Registry Table</Typography>

          <select value={filter} onChange={(e)=> setFilter(e.target.value)}>
            <option value='all'>All</option>
            <option value='merchant'>Merchant</option>
            <option value='consumer'>Consumerr</option>
          </select>
        </div>

            <TableContainer component={Paper} style={{width:'100%'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight:'bold'}}>Guitar Model</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Body Type</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Brand Name</TableCell>
                    <TableCell style={{fontWeight:'bold'}}>Stock Quantity</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {table.getRowModel().rows.map((row) => {
                    const item = row.original

                    if(filter === 'all'){

                    }

                    else if (item.userRole !== filter){
                      return null
                    }

                    return (
                      <TableRow key={row.id} onClick={() => setSelected(item)} hover>
                        <TableCell>{item.guitarModel}</TableCell>
                        <TableCell>{item.bodytype}</TableCell>
                        <TableCell>{item.brandName}</TableCell>
                        <TableCell>{item.stockQuantity}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

          <br/>
        </div>

        <div style={{backgroundColor:'#ffffff', width:'100%', display:'flex', justifyContent: 'center', padding:'5px'}}>
          <Button variant='outlined' onClick={() => table.previousPage()}>
            Previous
          </Button>

          <Button variant='outlined' onClick={() => table.nextPage()} >
            Next
          </Button>
        </div>

        <br/>

        {activeItem && (
            <div>
                <div style={{border:'1px solid gray', padding:'20px', borderRadius:'8px', backgroundColor:'#ffffff', width:'360px'}}> 
                    <Typography variant='h5' style={{textAlign:'center'}}>Active Item Profile</Typography>
                    <br/>
                    <Typography style={{display:'flex', justifyContent:'space-between'}}><strong>Model:</strong> {activeItem.guitarModel}</Typography>
                    <Typography style={{display:'flex', justifyContent:'space-between'}}><strong>Body Type:</strong> {activeItem.bodytype}</Typography>
                    <Typography style={{display:'flex', justifyContent:'space-between'}}><strong>Brand Name:</strong> {activeItem.brandName}</Typography>
                    <Typography style={{display:'flex', justifyContent:'space-between'}}><strong>Stock Quantity:</strong> {activeItem.stockQuantity}</Typography>
                    <Typography style={{display:'flex', justifyContent:'space-between'}}><strong>Manfacturer:</strong> {activeItem.manufacturerName}</Typography>
                    <Typography style={{display:'flex', justifyContent:'space-between'}}><strong>Role:</strong> {activeItem.userRole}</Typography>

                </div>
            </div>
          )}

          <br/><br/>

          <Button variant='contained' size='large' color='warning' onClick={()=>setSubmitted(false)}>
                Back to Form
          </Button>

    </div>
  )
}

 
return (
<div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', minHeight: '100vh', backgroundColor:'#2a57aa'}}>
    <div style={{ padding:30, boxShadow:'0 0 10px black', width:330, borderRadius:8, textAlign:'center',  backgroundColor:'#ffffff' }}>
        <Typography variant='h5'>
            Guitar Store & Inventory Manager
        </Typography>
        <br/>

        <TextField label='Guitar Model' variant='outlined' value={guitarModel} fullWidth
        onChange={(e) => setGuitarModel(e.target.value)} />
        <br/><br/>

      
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Body Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bodytype}
            style={{textAlign:'start'}}
            label="Body Type" onChange={(e) => setBodytype(e.target.value)}>

            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="acoustic">Acoustic</MenuItem>
            <MenuItem value="bass">Bass</MenuItem>
            <MenuItem value="classical">Classical</MenuItem>
          </Select>
        </FormControl>

        <br/><br/>

        <TextField label='Brand Name' variant='outlined'  value={brandName} fullWidth
        onChange={(e) => setBrandName(e.target.value)}/>
        <br/><br/>


        <TextField label='Stock Quantity (1-100)'
          type='number'
          inputProps={{ min: 1, max: 100 }}
          fullWidth
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />

        <br/><br/>

        <TextField label='Manufacturer Name' variant='outlined'  value={manufacturerName} fullWidth
        onChange={(e) => setManufacturerName(e.target.value)}/>
        <br/><br/>

        <FormControl style={{textAlign:'start'}} fullWidth>
          <FormLabel>User Role</FormLabel>
          <RadioGroup row onChange={(e) => setUserRole(e.target.value)} value={userRole}>
            <FormControlLabel value="merchant" control={<Radio />} label="Merchant" />
            <FormControlLabel value="consumer" control={<Radio />} label="Consumer" />
          </RadioGroup>
        </FormControl>
        <br/>

        {errorMes && <Typography color="error">{errorMes}</Typography>}
        <br/>

        <Button variant='contained' size='medium' fullWidth onClick={submit}>
            Submit
        </Button>
    </div>
</div>
)

}
export default App
