import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'


function App() {

  const [bodytype, setBodytype] = useState('')
 
  return (
    <div>
        <Typography variant='h5'>
            Guitar Store & Inventory Manager
        </Typography>

        <TextField label='Guitar Model' variant='outlined'/>
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

        <TextField label='Brand Name' variant='outlined'/>
        <br/><br/>


        <TextField label='Stock Quantity (1-100)'
          type='number'
          inputProps={{ min: 1, max: 100 }}
          sx={{ width: 224 }}
        />

        <br/><br/>

        <Button variant='contained'>
            Submit
        </Button>

    </div>
  )
}

export default App
