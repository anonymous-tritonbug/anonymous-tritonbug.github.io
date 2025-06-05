let originalData = [];
let headers = [];

// Add this at the very top of your excel-loader.js file:
function waitForXLSX() {
	if (typeof XLSX !== "undefined") {
		// XLSX is loaded, start our code
		window.addEventListener("load", function () {
			loadExcelFile("static/triton_bugs_dataset.xlsx");
		});
	} else {
		// Wait a bit more
		setTimeout(waitForXLSX, 100);
	}
}

// Start waiting
waitForXLSX();

async function loadExcelFile(filePath) {
	try {
		// Show loading message - just update the table body
		const tbody = document.getElementById("tableBody");
		if (tbody) {
			tbody.innerHTML =
				'<tr><td colspan="100%" class="has-text-centered">Loading Excel data...</td></tr>';
		}

		// Update row count if it exists
		const rowCount = document.getElementById("rowCount");
		if (rowCount) {
			rowCount.textContent = "Loading...";
		}

		const response = await fetch(filePath);
		if (!response.ok) {
			throw new Error(`File not found: ${filePath}`);
		}

		const arrayBuffer = await response.arrayBuffer();
		const data = new Uint8Array(arrayBuffer);
		const workbook = XLSX.read(data, { type: "array" });
		const firstSheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[firstSheetName];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		originalData = jsonData;
		headers = jsonData[0] || [];

		// Use existing HTML structure - don't recreate it
		setupTable();
		displayData(jsonData);
	} catch (error) {
		console.error("Error loading Excel file:", error);
		// Show error in the table body instead of replacing everything
		const tbody = document.getElementById("tableBody");
		if (tbody) {
			tbody.innerHTML = `
				<tr><td colspan="100%" class="has-text-centered has-text-danger">
					<strong>Error loading Excel file:</strong> ${error.message}<br>
					Please make sure your Excel file is located at: <code>${filePath}</code>
				</td></tr>
			`;
		}

		const rowCount = document.getElementById("rowCount");
		if (rowCount) {
			rowCount.textContent = "Error";
		}
	}
}

function setupTable() {
	const headerRow = document.getElementById("headerRow");
	const filterRow = document.getElementById("filterRow");

	// Clear existing content
	headerRow.innerHTML = "";
	filterRow.innerHTML = "";

	// Create headers and filter inputs
	headers.forEach((header, index) => {
		// Header cell
		const th = document.createElement("th");
		th.textContent = header || `Column ${index + 1}`;
		headerRow.appendChild(th);

		// Filter cell
		const filterTh = document.createElement("th");
		const filterInput = document.createElement("input");
		filterInput.className = "filter-input";
		filterInput.placeholder = `Filter ${header || "column"}...`;
		filterInput.setAttribute("data-column", index);
		filterInput.addEventListener("input", filterData);
		filterTh.appendChild(filterInput);
		filterRow.appendChild(filterTh);
	});
}

function displayData(data) {
	const tbody = document.getElementById("tableBody");
	if (!tbody) return;

	tbody.innerHTML = "";

	// Skip header row (index 0) and display data rows
	const dataRows = data.slice(1);

	dataRows.forEach((row) => {
		const tr = document.createElement("tr");

		headers.forEach((_, colIndex) => {
			const td = document.createElement("td");
			td.textContent = row[colIndex] || "";
			tr.appendChild(td);
		});

		tbody.appendChild(tr);
	});

	// Update row count if element exists
	const rowCount = document.getElementById("rowCount");
	if (rowCount) {
		rowCount.textContent = `${dataRows.length} rows`;
	}
}

function filterData() {
	const filterInputs = document.querySelectorAll(".filter-input");
	const filters = {};

	// Collect filter values
	filterInputs.forEach((input) => {
		const column = parseInt(input.getAttribute("data-column"));
		const value = input.value.toLowerCase().trim();
		if (value) {
			filters[column] = value;
		}
	});

	// Filter the data
	let filteredData = [originalData[0]]; // Keep header

	if (Object.keys(filters).length === 0) {
		// No filters applied, show all data
		filteredData = originalData;
	} else {
		// Apply filters
		const dataRows = originalData.slice(1);
		const filtered = dataRows.filter((row) => {
			return Object.keys(filters).every((colIndex) => {
				const cellValue = (row[colIndex] || "").toString().toLowerCase();
				return cellValue.includes(filters[colIndex]);
			});
		});
		filteredData = [originalData[0], ...filtered];
	}

	displayData(filteredData);
}

function resetAllFilters() {
	const filterInputs = document.querySelectorAll(".filter-input");
	filterInputs.forEach((input) => {
		input.value = "";
	});
	displayData(originalData);
}
