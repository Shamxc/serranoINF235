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

  const columns = [
    { accessorKey: 'guitarModel', header: 'Guitar Model'},
    { accessorKey: 'bodytype', header: 'Body Type'},
    { accessorKey: 'brandName', header: 'Brand Name'},
    { accessorKey: 'stockQuantity', header: 'Stock Quantity'},
  ]

  const table = useReactTable({
    data:items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } }
  })


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
      setItems([...items, { guitarModel, bodytype, brandName, stockQuantity }])
      setSubmitted(true)
    }

  }



if (submitted == true){
  return(
    <div>
        <div border = '1'>

          <table border='1' cellPadding='6'>

            <thead>
              <tr>
                <th>Guitar Model</th>
                <th>Body Type</th>
                <th>Brand Name</th>
                <th>Stock Quantity</th>
              </tr>
            </thead>

            <tbody>
                {table.getRowModel().rows.map((row)=>{
                  const item = row.original
                  return(
                    <tr key={row.id}>
                      <td>{item.guitarModel}</td>
                      <td>{item.bodytype}</td>
                      <td>{item.brandName}</td>
                      <td>{item.stockQuantity}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>

            <br/>

        <Button variant='outlined' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
        </Button>

        <Button variant='outlined' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
        </Button>

        </div>

          
          <br/><br/>

          <Button variant='contained' onClick={()=>setSubmitted(false)}>
                Back to Form
          </Button>


    </div>
  )
}

 
return (
<div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', minHeight: '100vh'}}>
    <div style={{ padding:30, boxShadow:'0 0 10px gray', width:330, borderRadius:8, textAlign:'center' }}>
        <Typography variant='h5'>
            Guitar Store & Inventory Manager
        </Typography>
        <br/>

        <TextField label='Guitar Model' variant='outlined' value={guitarModel} fullWidth
        onChange={(e) => setGuitarModel(e.target.value)}/>
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
