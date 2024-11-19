import express from  "express"
import fs  from "fs"
import path  from "path"

const app = express()
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Path to db.json file
// const DB_FILE = path.join(__dirname, './db/db.json');
// console.log(DB_FILE);
// Function to read data from db.json
const readData = () => {
  try {
    const data = fs.readFileSync("./db/db.json", 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

// Function to write data to db.json
const writeData = (data) => {
  try {
    fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// Function to update data to db.json
const updateData = (data) => {
    try {
      fs.updateData("./db/db.json", JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing data:', error);
    }
  };

// Function to delete data to db.json
const deleteData = (data) => {
    try {
      fs.unlink("./db/db.json", 'utf8');
    } catch (error) {
      console.error('Error writing data:', error);
    }
  };


// GET API: Retrieve all items
app.get('/api/items', (req, res) => {
  const data = readData();
  res.json(data);
});

// POST API: Add a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;

  if (!newItem || Object.keys(newItem).length === 0) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const data = readData();
  data.push(newItem);

  writeData(data);

  res.status(201).json({ message: 'Item added successfully', newItem });
});


// PUT API: UPDATE a new item - work in testing only
app.put('/api/items/:id', (req, res) => {
    const params = req.params;
    const newItem = req.body;
  
    if (!params || Object.keys(newItem).length === 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }
  
    const data = readData();
    data.push(newItem);
  if(params === newItem.id)
  {
    updateData(data);
  }
  
    res.status(201).json({ message: 'Item update successfully', newItem });
  });


// delete API: Add a new item - work in testing only
app.delete('/api/items/:id', (req, res) => {
    const params = req.params;
    deleteData(params);
    
  
    res.status(201).json({ message: 'Item deleted successfully', params });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
