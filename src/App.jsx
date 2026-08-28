import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'


function App() {
  const [ guitarModel, setGuitarModel] = useState('')
  const [bodytype, setBodytype] = useState('')
  const [brandName, setBrandName] = useState('')
  const [stockQuantity, setStockQuantity ] = useState(1)
  const [errorMes, setErrorMes] = useState('')
 
  return (
    <div>
        <Typography variant='h5'>
            Guitar Store & Inventory Manager
        </Typography>
        <br/>

        <TextField label='Guitar Model' variant='outlined' value={guitarModel}
        onChange={(e) => setGuitarModel(e.target.value)}/>
        <br/><br/>

      
        <FormControl sx={{ width: 224 }}>
          <InputLabel id="demo-simple-select-label">Body Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bodytype}
            label="Body Type" onChange={(e) => setBodytype(e.target.value)}>

            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="acoustic">Acoustic</MenuItem>
            <MenuItem value="bass">Bass</MenuItem>
            <MenuItem value="classical">Classical</MenuItem>
          </Select>
        </FormControl>

        <br/><br/>

        <TextField label='Brand Name' variant='outlined'  value={brandName}
        onChange={(e) => setBrandName(e.target.value)}/>
        <br/><br/>


        <TextField label='Stock Quantity (1-100)'
          type='number'
          inputProps={{ min: 1, max: 100 }}
          sx={{ width: 224 }}
           value={stockQuantity}
           onChange={(e) => setStockQuantity(e.target.value)}
        />

        <br/><br/>

        {errorMes && <label color="error">{errorMes}</label>}
        <br/>

        <Button variant='contained'>
            Submit
        </Button>

    </div>
  )
}

export default App
