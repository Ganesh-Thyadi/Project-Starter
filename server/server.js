const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Ensure form data is parsed
app.use(cors());

const libraryFolderPath = 'library';
const libraryFilePath = path.join(libraryFolderPath, 'library.json');

const requestsFolderPath = 'requests';
const requestsFilePath = path.join(requestsFolderPath, 'requests.json');

// Ensure necessary folders exist
if (!fs.existsSync(libraryFolderPath)) fs.mkdirSync(libraryFolderPath, { recursive: true });
if (!fs.existsSync(requestsFolderPath)) fs.mkdirSync(requestsFolderPath, { recursive: true });

// Load JSON files or initialize empty data
const loadJSON = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return [];
  }
};

// Save data to JSON file
const saveJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// 📌 Convert absolute to relative paths
const getRelativePath = (absolutePath, basePath) => {
  return path.relative(basePath, absolutePath).replace(/\\/g, '/');
};

// 📌 Configure multer for card file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category, subcategory, name } = req.body;
    if (!category || !subcategory || !name) {
      return cb(new Error('Category, Subcategory, and Name are required'), null);
    }

    const cardFolderPath = path.join(libraryFolderPath, category, subcategory, name);
    fs.mkdirSync(cardFolderPath, { recursive: true });
    cb(null, cardFolderPath);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// 📌 Configure multer for request documentation uploads
const requestStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category, subcategory, name } = req.body;
    if (!category || !subcategory || !name) {
      return cb(new Error('Category, Subcategory, and Name are required'), null);
    }

    const requestFolderPath = path.join(requestsFolderPath, category, subcategory, name);
    fs.mkdirSync(requestFolderPath, { recursive: true });
    cb(null, requestFolderPath);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});

const requestUpload = multer({ storage: requestStorage });

// 📌 Serve static files from /library and /requests folders
app.use('/files', express.static(libraryFolderPath));
app.use('/requests/files', express.static(requestsFolderPath));

// Ensure the correct full URL is generated
const getDownloadUrl = (filePath, basePath) => {
  const relativePath = getRelativePath(filePath, basePath);
  return `/${basePath === libraryFolderPath ? 'files' : 'requests/files'}/${relativePath}`;
};

// 📌 Add a new card
app.post('/add-card', upload.fields([{ name: 'file' }, { name: 'documentation' }]), (req, res) => {
  const { category, subcategory, name, description, tags } = req.body;
  if (!req.files || !req.files.file) {
    return res.status(400).json({ success: false, message: 'File is required' });
  }

  const file = req.files.file[0];
  const docFile = req.files.documentation ? req.files.documentation[0] : null;

  const filePath = file ? getRelativePath(file.path, libraryFolderPath) : '';
  const docPath = docFile ? getRelativePath(docFile.path, libraryFolderPath) : '';

  let libraryData = loadJSON(libraryFilePath);

  let categoryEntry = libraryData.find((cat) => cat.Category === category);
  if (!categoryEntry) {
    categoryEntry = { Category: category, Subcategories: [] };
    libraryData.push(categoryEntry);
  }

  let subcategoryEntry = categoryEntry.Subcategories.find((sub) => sub.Subcategory === subcategory);
  if (!subcategoryEntry) {
    subcategoryEntry = { Subcategory: subcategory, contents: [] };
    categoryEntry.Subcategories.push(subcategoryEntry);
  }

  if (subcategoryEntry.contents.some((card) => card.name === name)) {
    return res.status(400).json({ success: false, message: 'Project already exists in this subcategory' });
  }

  subcategoryEntry.contents.push({
    name,
    description,
    documentation: docPath,
    tags: tags ? tags.split(',').map((t) => t.trim()) : [],
    path: filePath,
  });

  saveJSON(libraryFilePath, libraryData);

  res.json({ success: true });
});


app.get('/library.json', (req, res) => {
  const libraryData = loadJSON(libraryFilePath);

  const formattedData = libraryData.map(category => ({
    ...category,
    Subcategories: category.Subcategories.map(subcategory => ({
      ...subcategory,
      contents: subcategory.contents.map(card => ({
        ...card,
        documentationUrl: card.documentation ? getDownloadUrl(path.join(libraryFolderPath, card.documentation), libraryFolderPath) : null,
        downloadUrl: card.path ? getDownloadUrl(path.join(libraryFolderPath, card.path), libraryFolderPath) : null,
      })),
    })),
  }));

  res.json(formattedData);
});



app.post('/add-request', requestUpload.single('documentation'), (req, res) => {
  console.log("Received Request Body:", req.body);
  console.log("Received File:", req.file);

  const { category, subcategory, name, description, tags } = req.body;
  if (!category || !subcategory || !name) {
    return res.status(400).json({ success: false, message: "Category, Subcategory, and Name are required" });
  }

  const docFile = req.file;
  const docPath = docFile ? getRelativePath(docFile.path, requestsFolderPath) : '';

  let requestsData = loadJSON(requestsFilePath);

  let categoryEntry = requestsData.find((cat) => cat.Category === category);
  if (!categoryEntry) {
    categoryEntry = { Category: category, Subcategories: [] };
    requestsData.push(categoryEntry);
  }

  let subcategoryEntry = categoryEntry.Subcategories.find((sub) => sub.Subcategory === subcategory);
  if (!subcategoryEntry) {
    subcategoryEntry = { Subcategory: subcategory, contents: [] };
    categoryEntry.Subcategories.push(subcategoryEntry);
  }

  if (subcategoryEntry.contents.some((request) => request.name === name)) {
    return res.status(400).json({ success: false, message: 'Request already exists in this subcategory' });
  }

  subcategoryEntry.contents.push({
    name,
    description,
    documentation: docPath,
    tags: tags ? tags.split(',').map((t) => t.trim()) : [],
    requested: true,
  });

  saveJSON(requestsFilePath, requestsData);

  res.json({ success: true });
});




// 📌 Serve updated requests.json
app.get('/requests.json', (req, res) => {
  const requestsData = loadJSON(requestsFilePath);

  const formattedData = requestsData.map(category => ({
      ...category,
      Subcategories: category.Subcategories.map(subcategory => ({
          ...subcategory,
          contents: subcategory.contents.map(request => ({
              ...request,
              documentationUrl: request.documentation ? 
                `http://localhost:${port}/requests/files/${request.documentation}` : null, // Ensure correct URL
          })),
      })),
  }));

  res.json(formattedData);
});

app.post('/submit-request', upload.fields([{ name: 'file' }, { name: 'documentation' }]), (req, res) => {
  const { category, subcategory, name, description, tags, submittedBy } = req.body;

  // Load data
  let requestsData = loadJSON(requestsFilePath);
  let libraryData = loadJSON(libraryFilePath);

  // Ensure the category exists in library.json
  let categoryEntry = libraryData.find(cat => cat.Category === category);
  if (!categoryEntry) {
    categoryEntry = { Category: category, Subcategories: [] };
    libraryData.push(categoryEntry);
  }

  // Ensure the subcategory exists
  let subcategoryEntry = categoryEntry.Subcategories.find(sub => sub.Subcategory === subcategory);
  if (!subcategoryEntry) {
    subcategoryEntry = { Subcategory: subcategory, contents: [] };
    categoryEntry.Subcategories.push(subcategoryEntry);
  }

  // Process files
  const file = req.files.file ? req.files.file[0] : null;
  const docFile = req.files.documentation ? req.files.documentation[0] : null;

  const filePath = file ? getRelativePath(file.path, libraryFolderPath) : '';
  const docPath = docFile ? getRelativePath(docFile.path, libraryFolderPath) : '';

  // Add new card to library.json
  subcategoryEntry.contents.push({
    name,
    description,
    documentation: docPath,
    tags: tags ? tags.split(',').map(t => t.trim()) : [],
    submittedBy,
    requested: true,
    path: filePath,
  });

  saveJSON(libraryFilePath, libraryData);

  // Remove the request from requests.json
  requestsData = requestsData
    .map(cat => {
      if (cat.Category === category) {
        cat.Subcategories = cat.Subcategories
          .map(sub => {
            if (sub.Subcategory === subcategory) {
              sub.contents = sub.contents.filter(req => req.name !== name);
            }
            return sub;
          })
          .filter(sub => sub.contents.length > 0);
      }
      return cat;
    })
    .filter(cat => cat.Subcategories.length > 0);

  saveJSON(requestsFilePath, requestsData);

  // Remove the associated request folder
  const requestFolderPath = path.join(requestsFolderPath, category, subcategory, name);
  if (fs.existsSync(requestFolderPath)) {
    fs.rmSync(requestFolderPath, { recursive: true, force: true });
  }

  res.json({ success: true });
});



// Start server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
