const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
  const data = [];
  const xdata = [];
  const ydata = [];

  if (req.file) {
    const fileContent = req.file.buffer.toString('utf-8');

    const lines = fileContent.split('\n');

    lines.forEach(line => {
      const [exp, time, value] = line.split(',');
      if (time && value && Math.abs(parseFloat(value.trim())) > 0 && Math.abs(parseFloat(value.trim())) < 4) {
        xdata.push(time.trim())
        ydata.push(parseFloat(value.trim()))
      }
    });

    const min_v = Math.min(...ydata.map(entry => entry));
    const max_v = Math.max(...ydata.map(entry => entry));
    const avg_v = Math.floor(((ydata.reduce((sum, entry) => sum + entry, 0) / ydata.length) * 100)) / 100;

    const min = []
    const max = []
    const avg = []

    ydata.forEach(y_v => {
      min.push(min_v)
      max.push(max_v)
      avg.push(avg_v)
    });

    res.json({ xdata, ydata, min, max, avg });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.post('/uploadHeader', upload.single('file'), (req, res) => {
  const data = [];

  if (req.file) {
    const fileContent = req.file.buffer.toString('utf-8');

    const lines = fileContent.split('\n');

    lines.forEach(line => {
      const [Batch, Operator, Date,	Product, Foil_batch, Flux_batch,
        	Flux_type, Foil_weight, Wire_weight, Flux_weight,	Flux_measuring_1,	before1, after1, flux_content1,	Flux_measuring_2,	before2, after2, flux_content2, Flux_amount, Flux_target
      ] = line.split(',');
      if (Batch != 'Batch' && Batch != '') {
        data.push(
          {
            Batch, Operator, Date,	Product, Foil_batch, Flux_batch,
        	  Flux_type, Foil_weight, Wire_weight, Flux_weight,	Flux_measuring_1,	before1, after1, flux_content1,	Flux_measuring_2,	before2, after2, flux_content2, Flux_amount, Flux_target
          }
        )
      }
    });

    res.json({ data });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
