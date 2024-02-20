function drawChart(xValues, ydata, mindata, maxdata, avgdata) {
    document.getElementById('avg_v').innerText = avgdata[0] + "mm"
    new Chart("myChart", {
        type: "line",
        data: {
                labels: xValues,
                datasets: [{ 
                    label: "Real time",
                    data: ydata,
                    pointRadius: 1,
                    borderColor: "gray",
                    fill: false
                },
                { 
                    label: "MIN(" + mindata[0] + ")",
                    data: mindata,
                    pointRadius: 1,
                    borderColor: "rgba(200,0,0,0.5)",
                    fill: false
                },
                { 
                    label: "MAX(" + maxdata[0] + ")",
                    data: maxdata,
                    pointRadius: 1,
                    borderColor: "rgba(0,200,0,0.5)",
                    fill: false
                },
                { 
                    label: "AVERAGE(" + avgdata[0] + ")",
                    data: avgdata,
                    pointRadius: 1,
                    borderColor: "rgba(0,0,200,0.5)",
                    fill: false
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Flux Fill Report",
                fontSize: 16
            }
        }
    });
  }

  function uploadFile() {
    const fileInput = document.getElementById('fileInputCSV');
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(result => {
        if (result.xdata && result.ydata && result.min && result.max && result.avg) {
            drawChart(result.xdata, result.ydata, result.min, result.max, result.avg);
        } else {
            alert("CSV file is incorrect!")
        }
      })
      .catch(error => console.error('Error uploading file:', error));
    } else {
      console.error('No file selected');
    }
  }

  function uploadHeaderFile() {
    const fileInput = document.getElementById('fileInputHeader');
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('/uploadHeader', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(result => {
        if (result.data && result.data.length > 0) {
            const header_data = result.data[0]
            document.getElementById('in_batch').value = header_data.Batch
            document.getElementById('in_operator').value = header_data.Operator
            document.getElementById('in_foilweight').value = header_data.Foil_weight
            document.getElementById('in_date').value = header_data.Date
            document.getElementById('in_wireweight').value = header_data.Wire_weight
            document.getElementById('in_product').value = header_data.Product
            document.getElementById('in_foilbatch').value = header_data.Foil_batch
            document.getElementById('in_fluxbatch').value = header_data.Flux_batch
            document.getElementById('in_fluxtype').value = header_data.Flux_type
            document.getElementById('in_fluxweight').value = header_data.Flux_weight
            document.getElementById('in_fluxmeasureing1_before').value = header_data.before1
            document.getElementById('in_fluxmeasureing1_after').value = header_data.after1
            document.getElementById('in_fluxmeasureing1_content').value = header_data.flux_content1
            document.getElementById('in_fluxamount').value = header_data.Flux_amount
            document.getElementById('in_fluxmeasureing2_before').value = header_data.before2
            document.getElementById('in_fluxmeasureing2_after').value = header_data.after2
            document.getElementById('in_fluxmeasureing2_content').value = header_data.flux_content2
            document.getElementById('in_fluxtarget').value = header_data.Flux_target
        } else {
            alert("CSV header file is incorrect!")
        }
      })
      .catch(error => console.error('Error uploading file:', error));
    } else {
      console.error('No file selected');
    }
  }

  function printPage() {
    window.print();
  }

  function changeTemplate() {
    var selectElement = document.getElementById('templateSelect');
    var imageElement = document.getElementById('dynamicImage');

    var dynamicElement = document.getElementById('dynamicElement');

    // Get the selected option value
    var selectedValue = selectElement.value;

    // Set the image source based on the selected option
    switch (selectedValue) {
      case 'template1':
        imageElement.src = './assets/image/logo1.png';
        imageElement.style.width = 'auto';
        dynamicElement.classList.remove('bg-chocolete-2');
        dynamicElement.classList.add('bg-chocolete-1');
        break;
      case 'template2':
        imageElement.src = './assets/image/logo2.jpg';
        imageElement.style.width = '150px';
        dynamicElement.classList.remove('bg-chocolete-1');
        dynamicElement.classList.add('bg-chocolete-2');
        break;
      case 'template3':
        imageElement.src = 'path/to/image3.jpg';
        break;
      default:
        // Handle default case or set a default image source
        imageElement.src = './assets/image/logo1.png';
        dynamicElement.classList.remove('bg-chocolete-2');
        dynamicElement.classList.add('bg-chocolete-1');
    }

    // Apply additional styles if needed
    // imageElement.style.width = '100%';
    // imageElement.style.border = '1px solid #000';
  }