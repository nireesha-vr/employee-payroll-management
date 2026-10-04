/**
 * FleetOps Enterprise Vehicle & Asset Management Portal
 * Vanilla JavaScript Application Logic
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'fleetops_vehicles_records_v1';

  const SEED_VEHICLES = [
    {
      id: 'VEH-01',
      regNumber: 'KA-01-EA-4521',
      model: 'Tata Ultra T.7',
      category: 'Heavy Commercial',
      fuelType: 'Diesel',
      depot: 'Bangalore North Depot',
      driver: 'Ramesh Gowda',
      driverPhone: '+91 98450 12345',
      odometer: 48250,
      status: 'Active',
      lastServiceDate: '2026-08-15',
      nextServiceDate: '2026-11-15',
      monthlyExpense: 24500,
      maintenanceLogs: [
        { date: '2026-08-15', type: 'Quarterly Preventative', vendor: 'Tata Authorized Service Center', cost: 14200, odometer: 45000, notes: 'Oil, brake pad replacement and air filters' }
      ]
    },
    {
      id: 'VEH-02',
      regNumber: 'MH-12-PQ-8891',
      model: 'Mahindra Bolero Maxi Truck',
      category: 'Light Commercial',
      fuelType: 'Diesel',
      depot: 'Mumbai Central Hub',
      driver: 'Suresh Patil',
      driverPhone: '+91 98220 54321',
      odometer: 62100,
      status: 'Active',
      lastServiceDate: '2026-07-20',
      nextServiceDate: '2026-10-20',
      monthlyExpense: 18200,
      maintenanceLogs: [
        { date: '2026-07-20', type: 'Clutch & Suspension Overhaul', vendor: 'Mahindra Commercial Works', cost: 12500, odometer: 58000, notes: 'Suspension bushing and clutch plate renewal' }
      ]
    },
    {
      id: 'VEH-03',
      regNumber: 'DL-04-TX-9821',
      model: 'Toyota Innova Crysta',
      category: 'Executive Passenger',
      fuelType: 'Petrol / Hybrid',
      depot: 'Delhi NCR Terminal',
      driver: 'Vikram Singh',
      driverPhone: '+91 98110 99887',
      odometer: 31400,
      status: 'Active',
      lastServiceDate: '2026-09-01',
      nextServiceDate: '2026-12-01',
      monthlyExpense: 14500,
      maintenanceLogs: [
        { date: '2026-09-01', type: '30,000 km Scheduled Service', vendor: 'Toyota Galaxy Motors', cost: 8900, odometer: 30000, notes: 'Full synthetic oil, wheel alignment and balancing' }
      ]
    },
    {
      id: 'VEH-04',
      regNumber: 'TN-09-BK-3312',
      model: 'Tata Ace EV',
      category: 'Electric Light Van',
      fuelType: 'Electric',
      depot: 'Chennai Port Yard',
      driver: 'K. Murugan',
      driverPhone: '+91 94440 33221',
      odometer: 18900,
      status: 'Inspection Due',
      lastServiceDate: '2026-04-10',
      nextServiceDate: '2026-10-05',
      monthlyExpense: 6200,
      maintenanceLogs: [
        { date: '2026-04-10', type: 'High Voltage Battery Check', vendor: 'Tata EV Service Hub', cost: 4200, odometer: 12000, notes: 'Battery health test passed at 98% state of health' }
      ]
    },
    {
      id: 'VEH-05',
      regNumber: 'KA-04-MJ-7744',
      model: 'BharatBenz 2823R',
      category: 'Heavy Commercial',
      fuelType: 'Diesel',
      depot: 'Bangalore North Depot',
      driver: 'Basavaraj Patil',
      driverPhone: '+91 99001 44556',
      odometer: 94800,
      status: 'In Maintenance',
      lastServiceDate: '2026-05-18',
      nextServiceDate: '2026-10-02',
      monthlyExpense: 36000,
      maintenanceLogs: [
        { date: '2026-10-02', type: 'Differential & Transmission Overhaul', vendor: 'BharatBenz Dealership Workshop', cost: 38500, odometer: 94800, notes: 'Vehicle presently on bay 4 awaiting replacement gear set' }
      ]
    },
    {
      id: 'VEH-06',
      regNumber: 'MH-04-AZ-1122',
      model: 'Maruti Suzuki Super Carry',
      category: 'Light Commercial',
      fuelType: 'CNG',
      depot: 'Mumbai Central Hub',
      driver: 'Nilesh Shinde',
      driverPhone: '+91 98332 11223',
      odometer: 41200,
      status: 'Available',
      lastServiceDate: '2026-08-05',
      nextServiceDate: '2026-11-05',
      monthlyExpense: 11200,
      maintenanceLogs: [
        { date: '2026-08-05', type: 'CNG Kit Hydro-Test & Inspection', vendor: 'Govt Approved CNG Certification Lab', cost: 3500, odometer: 39000, notes: 'Tank safety fitness certificate renewed for 3 years' }
      ]
    },
    {
      id: 'VEH-07',
      regNumber: 'DL-01-CB-6543',
      model: 'Mahindra e-Verito',
      category: 'Electric Passenger',
      fuelType: 'Electric',
      depot: 'Delhi NCR Terminal',
      driver: 'Devendra Rawat',
      driverPhone: '+91 98101 66554',
      odometer: 52300,
      status: 'Active',
      lastServiceDate: '2026-07-12',
      nextServiceDate: '2026-10-25',
      monthlyExpense: 7500,
      maintenanceLogs: [
        { date: '2026-07-12', type: 'Motor Controller Calibration', vendor: 'Mahindra Electric Care', cost: 5100, odometer: 48000, notes: 'Firmware updated, regenerative braking calibrated' }
      ]
    },
    {
      id: 'VEH-08',
      regNumber: 'TN-02-ZZ-9900',
      model: 'Ashok Leyland Boss 1215',
      category: 'Heavy Commercial',
      fuelType: 'Diesel',
      depot: 'Chennai Port Yard',
      driver: 'Unassigned',
      driverPhone: 'N/A',
      odometer: 112400,
      status: 'Out of Service',
      lastServiceDate: '2026-02-14',
      nextServiceDate: '2026-05-14',
      monthlyExpense: 4100,
      maintenanceLogs: [
        { date: '2026-02-14', type: 'Accident Damage Assessment', vendor: 'National Insurance Surveyors', cost: 45000, odometer: 112400, notes: 'Front axle damage awaiting clearance' }
      ]
    }
  ];

  let vehicles = [];
  let sortColumn = 'regNumber';
  let sortDirection = 'asc';
  let currentPage = 1;
  const pageSize = 8;

  const formatCurrency = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  };

  const loadData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        vehicles = JSON.parse(stored);
      } catch (e) {
        vehicles = [...SEED_VEHICLES];
      }
    } else {
      vehicles = [...SEED_VEHICLES];
      saveData();
    }
  };

  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  };

  const showToast = (message, type = 'info') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>●</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  };

  const updateKPIs = () => {
    const totalFleet = vehicles.length;
    let activeCount = 0;
    let maintenanceCount = 0;
    let inspectionCount = 0;
    let availableCount = 0;
    let outOfServiceCount = 0;
    let totalExpense = 0;

    vehicles.forEach(v => {
      totalExpense += Number(v.monthlyExpense || 0);
      if (v.status === 'Active') activeCount++;
      else if (v.status === 'In Maintenance') maintenanceCount++;
      else if (v.status === 'Inspection Due') inspectionCount++;
      else if (v.status === 'Available') availableCount++;
      else if (v.status === 'Out of Service') outOfServiceCount++;
    });

    document.getElementById('kpiTotalFleet').textContent = totalFleet;
    document.getElementById('kpiActiveFleet').textContent = `${activeCount} Units`;
    document.getElementById('kpiMaintenance').textContent = `${maintenanceCount + inspectionCount} Units`;
    document.getElementById('kpiAvailable').textContent = `${availableCount} Units`;
    document.getElementById('kpiMonthlyExpense').textContent = formatCurrency(totalExpense);
  };

  const renderTable = () => {
    const tbody = document.getElementById('vehicleTableBody');
    const searchVal = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    const depotFilter = document.getElementById('filterDepot').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const categoryFilter = document.getElementById('filterCategory').value;

    let filtered = vehicles.filter(v => {
      const matchSearch =
        v.regNumber.toLowerCase().includes(searchVal) ||
        v.model.toLowerCase().includes(searchVal) ||
        v.driver.toLowerCase().includes(searchVal) ||
        v.id.toLowerCase().includes(searchVal);
      const matchDepot = !depotFilter || v.depot === depotFilter;
      const matchStatus = !statusFilter || v.status === statusFilter;
      const matchCat = !categoryFilter || v.category === categoryFilter;
      return matchSearch && matchDepot && matchStatus && matchCat;
    });

    filtered.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (['odometer', 'monthlyExpense'].includes(sortColumn)) {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      } else {
        valA = (valA || '').toString().toLowerCase();
        valB = (valB || '').toString().toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const pagedRecords = filtered.slice(startIdx, startIdx + pageSize);

    tbody.innerHTML = '';

    if (pagedRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 24px; color:#64748b;">No fleet vehicles match the specified criteria.</td></tr>`;
    } else {
      pagedRecords.forEach(v => {
        const tr = document.createElement('tr');

        let badgeClass = 'badge-active';
        if (v.status === 'In Maintenance') badgeClass = 'badge-maintenance';
        if (v.status === 'Inspection Due') badgeClass = 'badge-inspection';
        if (v.status === 'Out of Service') badgeClass = 'badge-out-of-service';
        if (v.status === 'Available') badgeClass = 'badge-available';

        tr.innerHTML = `
          <td class="bold">
            <span style="color:#0369a1;">${v.regNumber}</span>
            <div style="font-size:10px; color:#64748b;">${v.id}</div>
          </td>
          <td>
            <strong>${v.model}</strong>
            <div style="font-size:10.5px; color:#64748b;">${v.category}</div>
          </td>
          <td>
            <span class="tag-fuel">${v.fuelType}</span>
          </td>
          <td>
            <strong>${v.driver}</strong>
            <div style="font-size:10.5px; color:#64748b;">${v.driverPhone}</div>
          </td>
          <td>${v.depot}</td>
          <td class="numeric bold">${Number(v.odometer).toLocaleString()} km</td>
          <td class="numeric">${formatCurrency(v.monthlyExpense)}</td>
          <td><span class="badge ${badgeClass}">${v.status}</span></td>
          <td style="font-size:11px;">
            <div>Next: <strong>${v.nextServiceDate}</strong></div>
            <div style="font-size:10px; color:#64748b;">Last: ${v.lastServiceDate}</div>
          </td>
          <td>
            <div style="display:flex; gap: 4px;">
              <button class="btn btn-secondary btn-xs action-inspect" data-id="${v.id}" title="View Asset Passport & Service History">Passport</button>
              <button class="btn btn-warning btn-xs action-service" data-id="${v.id}" title="Log Maintenance & Service Visit">Service</button>
              <button class="btn btn-secondary btn-xs action-reassign" data-id="${v.id}" title="Reassign Driver or Depot">Assign</button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    document.getElementById('tableInfo').textContent = `Showing ${totalRecords === 0 ? 0 : startIdx + 1} to ${Math.min(startIdx + pageSize, totalRecords)} of ${totalRecords} fleet vehicles`;
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage >= totalPages;
    document.getElementById('pageNumberIndicator').textContent = `Page ${currentPage} of ${totalPages}`;

    document.querySelectorAll('.corporate-table th[data-col]').forEach(th => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (th.getAttribute('data-col') === sortColumn) {
        th.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
      }
    });

    updateKPIs();
  };

  const exportToCSV = () => {
    let csv = 'Vehicle ID,Registration Number,Make & Model,Category,Fuel Type,Depot,Assigned Driver,Driver Contact,Odometer (km),Monthly Expense (INR),Status,Last Service Date,Next Service Date\n';
    vehicles.forEach(v => {
      csv += [
        v.id,
        `"${v.regNumber}"`,
        `"${v.model}"`,
        `"${v.category}"`,
        `"${v.fuelType}"`,
        `"${v.depot}"`,
        `"${v.driver}"`,
        `"${v.driverPhone}"`,
        v.odometer,
        v.monthlyExpense,
        `"${v.status}"`,
        v.lastServiceDate,
        v.nextServiceDate
      ].join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `FleetOps_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Fleet Asset Registry exported successfully as CSV.', 'success');
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // Open Service Log Modal
  const openServiceModal = (vId) => {
    const vehicle = vehicles.find(v => v.id === vId);
    if (!vehicle) return;

    document.getElementById('serviceVehId').value = vehicle.id;
    document.getElementById('serviceRegDisplay').textContent = `${vehicle.regNumber} (${vehicle.model})`;
    document.getElementById('serviceCurrentOdo').value = vehicle.odometer;
    document.getElementById('serviceDate').value = new Date().toISOString().slice(0, 10);
    document.getElementById('serviceType').value = 'Scheduled Maintenance';
    document.getElementById('serviceVendor').value = '';
    document.getElementById('serviceCost').value = 5000;
    document.getElementById('serviceNotes').value = '';
    document.getElementById('serviceNextDate').value = '';
    document.getElementById('serviceNextStatus').value = 'Active';

    document.getElementById('serviceModal').classList.add('active');
  };

  // Open Reassign Modal
  const openReassignModal = (vId) => {
    const vehicle = vehicles.find(v => v.id === vId);
    if (!vehicle) return;

    document.getElementById('reassignVehId').value = vehicle.id;
    document.getElementById('reassignRegDisplay').textContent = `${vehicle.regNumber} (${vehicle.model})`;
    document.getElementById('reassignDriver').value = vehicle.driver;
    document.getElementById('reassignPhone').value = vehicle.driverPhone;
    document.getElementById('reassignDepot').value = vehicle.depot;
    document.getElementById('reassignStatus').value = vehicle.status;

    document.getElementById('reassignModal').classList.add('active');
  };

  // Open Passport / Inspection Modal
  const openInspectModal = (vId) => {
    const vehicle = vehicles.find(v => v.id === vId);
    if (!vehicle) return;

    document.getElementById('inspReg').textContent = vehicle.regNumber;
    document.getElementById('inspModel').textContent = vehicle.model;
    document.getElementById('inspCategory').textContent = vehicle.category;
    document.getElementById('inspFuel').textContent = vehicle.fuelType;
    document.getElementById('inspDepot').textContent = vehicle.depot;
    document.getElementById('inspDriver').textContent = `${vehicle.driver} (${vehicle.driverPhone})`;
    document.getElementById('inspOdo').textContent = `${Number(vehicle.odometer).toLocaleString()} km`;
    document.getElementById('inspStatus').textContent = vehicle.status;
    document.getElementById('inspExpense').textContent = formatCurrency(vehicle.monthlyExpense);
    document.getElementById('inspNextService').textContent = vehicle.nextServiceDate;

    const logsContainer = document.getElementById('inspServiceLogs');
    logsContainer.innerHTML = '';

    const logs = vehicle.maintenanceLogs || [];
    if (logs.length === 0) {
      logsContainer.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#64748b; padding:10px;">No recorded workshop visits on file.</td></tr>';
    } else {
      logs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${log.date}</strong></td>
          <td>${log.type}</td>
          <td>${log.vendor}</td>
          <td class="numeric">${formatCurrency(log.cost)}</td>
          <td>${log.notes || '-'}</td>
        `;
        logsContainer.appendChild(tr);
      });
    }

    document.getElementById('inspectModal').classList.add('active');
  };

  const openAddVehicleModal = () => {
    document.getElementById('addVehicleForm').reset();
    const nextNum = String(vehicles.length + 1).padStart(2, '0');
    document.getElementById('addVehId').value = `VEH-${nextNum}`;
    document.getElementById('addVehicleModal').classList.add('active');
  };

  const initEventListeners = () => {
    document.getElementById('searchInput').addEventListener('input', () => {
      currentPage = 1;
      renderTable();
    });

    ['filterDepot', 'filterStatus', 'filterCategory'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        currentPage = 1;
        renderTable();
      });
    });

    document.getElementById('prevPageBtn').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
      currentPage++;
      renderTable();
    });

    document.querySelectorAll('.corporate-table th[data-col]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-col');
        if (sortColumn === col) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumn = col;
          sortDirection = 'asc';
        }
        renderTable();
      });
    });

    // Table Actions Delegation
    document.getElementById('vehicleTableBody').addEventListener('click', (e) => {
      const target = e.target;
      const vId = target.getAttribute('data-id');

      if (target.classList.contains('action-service')) {
        openServiceModal(vId);
      } else if (target.classList.contains('action-reassign')) {
        openReassignModal(vId);
      } else if (target.classList.contains('action-inspect')) {
        openInspectModal(vId);
      }
    });

    // Add Vehicle Form Submit
    document.getElementById('addVehicleForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('addVehId').value.trim();
      const regNumber = document.getElementById('addRegNumber').value.trim().toUpperCase();
      const model = document.getElementById('addModel').value.trim();
      const category = document.getElementById('addCategory').value;
      const fuelType = document.getElementById('addFuel').value;
      const depot = document.getElementById('addDepot').value;
      const driver = document.getElementById('addDriver').value.trim() || 'Unassigned';
      const driverPhone = document.getElementById('addDriverPhone').value.trim() || 'N/A';
      const odometer = Number(document.getElementById('addOdometer').value) || 0;
      const monthlyExpense = Number(document.getElementById('addExpense').value) || 0;
      const status = document.getElementById('addStatus').value;
      const lastServiceDate = document.getElementById('addLastService').value || new Date().toISOString().slice(0, 10);
      const nextServiceDate = document.getElementById('addNextService').value || '2026-12-31';

      const newVeh = {
        id,
        regNumber,
        model,
        category,
        fuelType,
        depot,
        driver,
        driverPhone,
        odometer,
        monthlyExpense,
        status,
        lastServiceDate,
        nextServiceDate,
        maintenanceLogs: []
      };

      vehicles.unshift(newVeh);
      saveData();
      renderTable();
      closeModal('addVehicleModal');
      showToast(`Vehicle ${regNumber} added to registry.`, 'success');
    });

    // Service Log Form Submit
    document.getElementById('serviceForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const vId = document.getElementById('serviceVehId').value;
      const vehicle = vehicles.find(v => v.id === vId);
      if (!vehicle) return;

      const date = document.getElementById('serviceDate').value;
      const type = document.getElementById('serviceType').value;
      const vendor = document.getElementById('serviceVendor').value.trim();
      const cost = Number(document.getElementById('serviceCost').value) || 0;
      const odo = Number(document.getElementById('serviceCurrentOdo').value) || vehicle.odometer;
      const notes = document.getElementById('serviceNotes').value.trim();
      const nextDate = document.getElementById('serviceNextDate').value;
      const nextStatus = document.getElementById('serviceNextStatus').value;

      if (!vehicle.maintenanceLogs) vehicle.maintenanceLogs = [];
      vehicle.maintenanceLogs.unshift({ date, type, vendor, cost, odometer: odo, notes });

      vehicle.odometer = Math.max(vehicle.odometer, odo);
      vehicle.lastServiceDate = date;
      if (nextDate) vehicle.nextServiceDate = nextDate;
      vehicle.status = nextStatus;
      vehicle.monthlyExpense = (Number(vehicle.monthlyExpense) || 0) + cost;

      saveData();
      renderTable();
      closeModal('serviceModal');
      showToast(`Maintenance log for ${vehicle.regNumber} saved successfully.`, 'success');
    });

    // Reassign Form Submit
    document.getElementById('reassignForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const vId = document.getElementById('reassignVehId').value;
      const vehicle = vehicles.find(v => v.id === vId);
      if (!vehicle) return;

      vehicle.driver = document.getElementById('reassignDriver').value.trim();
      vehicle.driverPhone = document.getElementById('reassignPhone').value.trim();
      vehicle.depot = document.getElementById('reassignDepot').value;
      vehicle.status = document.getElementById('reassignStatus').value;

      saveData();
      renderTable();
      closeModal('reassignModal');
      showToast(`Assignment updated for ${vehicle.regNumber}.`, 'info');
    });

    // Buttons
    document.getElementById('btnAddVehicle').addEventListener('click', openAddVehicleModal);
    document.getElementById('btnExportCSV').addEventListener('click', exportToCSV);
    document.getElementById('btnResetData').addEventListener('click', () => {
      if (confirm('Reset fleet registry to factory seed records?')) {
        vehicles = [...SEED_VEHICLES];
        saveData();
        renderTable();
        showToast('Fleet registry reset to defaults.', 'info');
      }
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });
  };

  window.addEventListener('DOMContentLoaded', () => {
    loadData();
    initEventListeners();
    renderTable();
  });
})();
