/**
 * CorpPay Enterprise Payroll Management System
 * Vanilla JavaScript Application Logic
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'corppay_payroll_records_v1';

  // Default seed dataset for instant demonstration
  const SEED_EMPLOYEES = [
    {
      id: 'EMP-1001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@corp.internal',
      department: 'Engineering',
      designation: 'Staff Software Architect',
      basicPay: 125000,
      hra: 50000,
      allowance: 35000,
      pf: 15000,
      tax: 28000,
      insurance: 3000,
      status: 'Paid',
      payPeriod: 'October 2026',
      paymentDate: '2026-10-01'
    },
    {
      id: 'EMP-1002',
      name: 'Ananya Sharma',
      email: 'ananya.s@corp.internal',
      department: 'Finance',
      designation: 'Senior Financial Analyst',
      basicPay: 92000,
      hra: 36800,
      allowance: 22000,
      pf: 11040,
      tax: 18500,
      insurance: 2500,
      status: 'Paid',
      payPeriod: 'October 2026',
      paymentDate: '2026-10-01'
    },
    {
      id: 'EMP-1003',
      name: 'Vikramaditya Rao',
      email: 'v.rao@corp.internal',
      department: 'Operations',
      designation: 'Logistics Operations Lead',
      basicPay: 85000,
      hra: 34000,
      allowance: 18000,
      pf: 10200,
      tax: 15000,
      insurance: 2500,
      status: 'Approved',
      payPeriod: 'October 2026',
      paymentDate: null
    },
    {
      id: 'EMP-1004',
      name: 'Sneha Patel',
      email: 'sneha.p@corp.internal',
      department: 'Human Resources',
      designation: 'HR Business Partner',
      basicPay: 78000,
      hra: 31200,
      allowance: 16000,
      pf: 9360,
      tax: 12400,
      insurance: 2000,
      status: 'Approved',
      payPeriod: 'October 2026',
      paymentDate: null
    },
    {
      id: 'EMP-1005',
      name: 'Karthik Raman',
      email: 'karthik.r@corp.internal',
      department: 'Engineering',
      designation: 'DevOps & Cloud Engineer',
      basicPay: 98000,
      hra: 39200,
      allowance: 24000,
      pf: 11760,
      tax: 21000,
      insurance: 2500,
      status: 'Draft',
      payPeriod: 'October 2026',
      paymentDate: null
    },
    {
      id: 'EMP-1006',
      name: 'Pooja Deshmukh',
      email: 'pooja.d@corp.internal',
      department: 'Sales',
      designation: 'Enterprise Sales Manager',
      basicPay: 105000,
      hra: 42000,
      allowance: 45000,
      pf: 12600,
      tax: 26000,
      insurance: 2500,
      status: 'Paid',
      payPeriod: 'October 2026',
      paymentDate: '2026-10-01'
    },
    {
      id: 'EMP-1007',
      name: 'Arjun Mehta',
      email: 'arjun.m@corp.internal',
      department: 'Engineering',
      designation: 'Frontend Engineer II',
      basicPay: 72000,
      hra: 28800,
      allowance: 14000,
      pf: 8640,
      tax: 11000,
      insurance: 2000,
      status: 'Draft',
      payPeriod: 'October 2026',
      paymentDate: null
    },
    {
      id: 'EMP-1008',
      name: 'Meera Nambiar',
      email: 'meera.n@corp.internal',
      department: 'Sales',
      designation: 'Account Executive',
      basicPay: 64000,
      hra: 25600,
      allowance: 20000,
      pf: 7680,
      tax: 9500,
      insurance: 2000,
      status: 'Approved',
      payPeriod: 'October 2026',
      paymentDate: null
    }
  ];

  let employees = [];
  let sortColumn = 'id';
  let sortDirection = 'asc';
  let currentPage = 1;
  const pageSize = 8;

  // Formatting helpers
  const formatCurrency = (val) => {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  };

  const calculateSalary = (emp) => {
    const gross = (Number(emp.basicPay) || 0) + (Number(emp.hra) || 0) + (Number(emp.allowance) || 0);
    const deductions = (Number(emp.pf) || 0) + (Number(emp.tax) || 0) + (Number(emp.insurance) || 0);
    const net = gross - deductions;
    return { gross, deductions, net };
  };

  // Local storage management
  const loadData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        employees = JSON.parse(stored);
      } catch (e) {
        employees = [...SEED_EMPLOYEES];
      }
    } else {
      employees = [...SEED_EMPLOYEES];
      saveData();
    }
  };

  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  };

  // Toast notification
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

  // Update KPI Cards
  const updateKPIs = () => {
    const totalCount = employees.length;
    let totalPayrollGross = 0;
    let totalNetDisbursed = 0;
    let paidCount = 0;
    let approvedCount = 0;
    let draftCount = 0;

    employees.forEach(emp => {
      const { gross, net } = calculateSalary(emp);
      totalPayrollGross += gross;
      if (emp.status === 'Paid') {
        paidCount++;
        totalNetDisbursed += net;
      } else if (emp.status === 'Approved') {
        approvedCount++;
      } else {
        draftCount++;
      }
    });

    const avgNet = totalCount ? Math.round(totalPayrollGross / totalCount) : 0;

    document.getElementById('kpiTotalGross').textContent = formatCurrency(totalPayrollGross);
    document.getElementById('kpiTotalCount').textContent = totalCount;
    document.getElementById('kpiPaidDisbursed').textContent = `${paidCount} (${formatCurrency(totalNetDisbursed)})`;
    document.getElementById('kpiPendingAction').textContent = `${approvedCount + draftCount} (${draftCount} Drafts)`;
    document.getElementById('kpiAverageSalary').textContent = formatCurrency(avgNet);
  };

  // Render Table
  const renderTable = () => {
    const tbody = document.getElementById('payrollTableBody');
    const searchVal = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    const deptFilter = document.getElementById('filterDept').value;
    const statusFilter = document.getElementById('filterStatus').value;

    let filtered = employees.filter(emp => {
      const matchSearch =
        emp.name.toLowerCase().includes(searchVal) ||
        emp.id.toLowerCase().includes(searchVal) ||
        emp.designation.toLowerCase().includes(searchVal);
      const matchDept = !deptFilter || emp.department === deptFilter;
      const matchStatus = !statusFilter || emp.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let valA, valB;
      if (['basicPay', 'hra', 'allowance', 'pf', 'tax', 'insurance'].includes(sortColumn)) {
        valA = Number(a[sortColumn]) || 0;
        valB = Number(b[sortColumn]) || 0;
      } else if (sortColumn === 'net') {
        valA = calculateSalary(a).net;
        valB = calculateSalary(b).net;
      } else {
        valA = (a[sortColumn] || '').toString().toLowerCase();
        valB = (b[sortColumn] || '').toString().toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const pagedRecords = filtered.slice(startIdx, startIdx + pageSize);

    tbody.innerHTML = '';

    if (pagedRecords.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding: 24px; color:#64748b;">No employee records match the selected search and filter criteria.</td></tr>`;
    } else {
      pagedRecords.forEach(emp => {
        const { gross, deductions, net } = calculateSalary(emp);
        const tr = document.createElement('tr');

        let badgeClass = 'badge-draft';
        if (emp.status === 'Paid') badgeClass = 'badge-paid';
        if (emp.status === 'Approved') badgeClass = 'badge-approved';

        tr.innerHTML = `
          <td class="bold">${emp.id}</td>
          <td>
            <strong>${emp.name}</strong>
            <div style="font-size:10px; color:#64748b;">${emp.designation}</div>
          </td>
          <td>${emp.department}</td>
          <td class="numeric">${formatCurrency(emp.basicPay)}</td>
          <td class="numeric">${formatCurrency(Number(emp.hra) + Number(emp.allowance))}</td>
          <td class="numeric bold">${formatCurrency(gross)}</td>
          <td class="numeric" style="color: #b91c1c;">-${formatCurrency(deductions)}</td>
          <td class="numeric bold" style="color: #15803d; font-size:12.5px;">${formatCurrency(net)}</td>
          <td><span class="badge ${badgeClass}">${emp.status}</span></td>
          <td style="font-size:11px; color:#475569;">${emp.payPeriod}</td>
          <td>
            <div style="display:flex; gap: 4px;">
              <button class="btn btn-secondary btn-xs action-payslip" data-id="${emp.id}" title="View & Print Payslip">Voucher</button>
              <button class="btn btn-secondary btn-xs action-edit" data-id="${emp.id}" title="Edit Payroll Record">Edit</button>
              ${
                emp.status === 'Draft'
                  ? `<button class="btn btn-primary btn-xs action-status" data-id="${emp.id}" data-new-status="Approved">Approve</button>`
                  : emp.status === 'Approved'
                  ? `<button class="btn btn-success btn-xs action-status" data-id="${emp.id}" data-new-status="Paid">Disburse</button>`
                  : `<button class="btn btn-secondary btn-xs action-status" data-id="${emp.id}" data-new-status="Draft">Revert</button>`
              }
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Update pagination display
    document.getElementById('tableInfo').textContent = `Showing ${totalRecords === 0 ? 0 : startIdx + 1} to ${Math.min(startIdx + pageSize, totalRecords)} of ${totalRecords} employee records`;
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage >= totalPages;
    document.getElementById('pageNumberIndicator').textContent = `Page ${currentPage} of ${totalPages}`;

    // Update sort headers UI
    document.querySelectorAll('.corporate-table th[data-col]').forEach(th => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (th.getAttribute('data-col') === sortColumn) {
        th.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
      }
    });

    updateKPIs();
  };

  // Export to CSV
  const exportToCSV = () => {
    let csv = 'Employee ID,Employee Name,Email,Department,Designation,Basic Pay,HRA,Allowances,Gross Salary,PF,Tax,Insurance,Total Deductions,Net Salary,Status,Pay Period\n';
    employees.forEach(emp => {
      const { gross, deductions, net } = calculateSalary(emp);
      csv += [
        emp.id,
        `"${emp.name}"`,
        emp.email,
        `"${emp.department}"`,
        `"${emp.designation}"`,
        emp.basicPay,
        emp.hra,
        emp.allowance,
        gross,
        emp.pf,
        emp.tax,
        emp.insurance,
        deductions,
        net,
        emp.status,
        `"${emp.payPeriod}"`
      ].join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `CorpPay_Register_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Payroll register exported successfully as CSV.', 'success');
  };

  // Interactive Live Calculation in Employee Modal
  const updateModalCalculations = () => {
    const basic = Number(document.getElementById('modalBasicPay').value) || 0;
    const hra = Number(document.getElementById('modalHra').value) || 0;
    const allowance = Number(document.getElementById('modalAllowance').value) || 0;
    const pf = Number(document.getElementById('modalPf').value) || 0;
    const tax = Number(document.getElementById('modalTax').value) || 0;
    const insurance = Number(document.getElementById('modalInsurance').value) || 0;

    const gross = basic + hra + allowance;
    const deductions = pf + tax + insurance;
    const net = gross - deductions;

    document.getElementById('modalCalcGross').textContent = formatCurrency(gross);
    document.getElementById('modalCalcDeductions').textContent = formatCurrency(deductions);
    document.getElementById('modalCalcNet').textContent = formatCurrency(net);
  };

  // Open Edit / Create Modal
  const openEmployeeModal = (emp = null) => {
    const modal = document.getElementById('employeeModal');
    const form = document.getElementById('employeeForm');
    form.reset();

    if (emp) {
      document.getElementById('modalTitle').textContent = `Edit Payroll Profile - ${emp.id}`;
      document.getElementById('modalEmpId').value = emp.id;
      document.getElementById('modalEmpId').readOnly = true;
      document.getElementById('modalName').value = emp.name;
      document.getElementById('modalEmail').value = emp.email || '';
      document.getElementById('modalDepartment').value = emp.department;
      document.getElementById('modalDesignation').value = emp.designation;
      document.getElementById('modalBasicPay').value = emp.basicPay;
      document.getElementById('modalHra').value = emp.hra;
      document.getElementById('modalAllowance').value = emp.allowance;
      document.getElementById('modalPf').value = emp.pf;
      document.getElementById('modalTax').value = emp.tax;
      document.getElementById('modalInsurance').value = emp.insurance;
      document.getElementById('modalStatus').value = emp.status;
      document.getElementById('modalPeriod').value = emp.payPeriod || 'October 2026';
    } else {
      document.getElementById('modalTitle').textContent = 'New Employee Payroll Record';
      const nextNum = 1000 + employees.length + 1;
      document.getElementById('modalEmpId').value = `EMP-${nextNum}`;
      document.getElementById('modalEmpId').readOnly = false;
      document.getElementById('modalBasicPay').value = 60000;
      document.getElementById('modalHra').value = 24000;
      document.getElementById('modalAllowance').value = 10000;
      document.getElementById('modalPf').value = 7200;
      document.getElementById('modalTax').value = 8500;
      document.getElementById('modalInsurance').value = 2000;
      document.getElementById('modalStatus').value = 'Draft';
      document.getElementById('modalPeriod').value = 'October 2026';
    }

    updateModalCalculations();
    modal.classList.add('active');
  };

  // Close Modals
  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // Open Payslip Voucher
  const openPayslipModal = (empId) => {
    const emp = employees.find(e => e.id === empId);
    if (!emp) return;

    const { gross, deductions, net } = calculateSalary(emp);

    document.getElementById('pvEmpName').textContent = emp.name;
    document.getElementById('pvEmpId').textContent = emp.id;
    document.getElementById('pvDept').textContent = emp.department;
    document.getElementById('pvDesignation').textContent = emp.designation;
    document.getElementById('pvPeriod').textContent = emp.payPeriod;
    document.getElementById('pvStatus').textContent = emp.status.toUpperCase();
    document.getElementById('pvStatus').className = `badge ${emp.status === 'Paid' ? 'badge-paid' : 'badge-draft'}`;

    document.getElementById('pvBasic').textContent = formatCurrency(emp.basicPay);
    document.getElementById('pvHra').textContent = formatCurrency(emp.hra);
    document.getElementById('pvAllowance').textContent = formatCurrency(emp.allowance);
    document.getElementById('pvGross').textContent = formatCurrency(gross);

    document.getElementById('pvPf').textContent = formatCurrency(emp.pf);
    document.getElementById('pvTax').textContent = formatCurrency(emp.tax);
    document.getElementById('pvInsurance').textContent = formatCurrency(emp.insurance);
    document.getElementById('pvDeductions').textContent = formatCurrency(deductions);

    document.getElementById('pvNetSalary').textContent = formatCurrency(net);
    document.getElementById('pvDisbursedDate').textContent = emp.paymentDate ? emp.paymentDate : 'Pending Approval Cycle';

    document.getElementById('payslipModal').classList.add('active');
  };

  // Process All Pending
  const processAllPending = () => {
    let count = 0;
    employees.forEach(emp => {
      if (emp.status === 'Approved') {
        emp.status = 'Paid';
        emp.paymentDate = new Date().toISOString().slice(0, 10);
        count++;
      } else if (emp.status === 'Draft') {
        emp.status = 'Approved';
        count++;
      }
    });

    saveData();
    renderTable();
    showToast(`Batch processing complete: ${count} employee records progressed.`, 'success');
  };

  // Event Listeners setup
  const initEventListeners = () => {
    // Search & Filter
    document.getElementById('searchInput').addEventListener('input', () => {
      currentPage = 1;
      renderTable();
    });

    document.getElementById('filterDept').addEventListener('change', () => {
      currentPage = 1;
      renderTable();
    });

    document.getElementById('filterStatus').addEventListener('change', () => {
      currentPage = 1;
      renderTable();
    });

    // Pagination
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

    // Sorting
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

    // Table Actions (Delegation)
    document.getElementById('payrollTableBody').addEventListener('click', (e) => {
      const target = e.target;
      const empId = target.getAttribute('data-id');

      if (target.classList.contains('action-edit')) {
        const emp = employees.find(item => item.id === empId);
        openEmployeeModal(emp);
      } else if (target.classList.contains('action-payslip')) {
        openPayslipModal(empId);
      } else if (target.classList.contains('action-status')) {
        const newStatus = target.getAttribute('data-new-status');
        const emp = employees.find(item => item.id === empId);
        if (emp) {
          emp.status = newStatus;
          if (newStatus === 'Paid') {
            emp.paymentDate = new Date().toISOString().slice(0, 10);
          }
          saveData();
          renderTable();
          showToast(`Record ${emp.id} status updated to ${newStatus}.`, 'info');
        }
      }
    });

    // Modal Calculation dynamic inputs
    ['modalBasicPay', 'modalHra', 'modalAllowance', 'modalPf', 'modalTax', 'modalInsurance'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateModalCalculations);
    });

    // Form Submission
    document.getElementById('employeeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('modalEmpId').value.trim();
      const name = document.getElementById('modalName').value.trim();
      const email = document.getElementById('modalEmail').value.trim();
      const department = document.getElementById('modalDepartment').value;
      const designation = document.getElementById('modalDesignation').value.trim();
      const basicPay = Number(document.getElementById('modalBasicPay').value) || 0;
      const hra = Number(document.getElementById('modalHra').value) || 0;
      const allowance = Number(document.getElementById('modalAllowance').value) || 0;
      const pf = Number(document.getElementById('modalPf').value) || 0;
      const tax = Number(document.getElementById('modalTax').value) || 0;
      const insurance = Number(document.getElementById('modalInsurance').value) || 0;
      const status = document.getElementById('modalStatus').value;
      const payPeriod = document.getElementById('modalPeriod').value;

      const existingIndex = employees.findIndex(item => item.id === id);
      const record = {
        id,
        name,
        email,
        department,
        designation,
        basicPay,
        hra,
        allowance,
        pf,
        tax,
        insurance,
        status,
        payPeriod,
        paymentDate: status === 'Paid' ? new Date().toISOString().slice(0, 10) : null
      };

      if (existingIndex > -1) {
        employees[existingIndex] = record;
        showToast(`Employee ${id} updated successfully.`, 'success');
      } else {
        employees.unshift(record);
        showToast(`Employee ${id} added to payroll.`, 'success');
      }

      saveData();
      renderTable();
      closeModal('employeeModal');
    });

    // Action toolbar buttons
    document.getElementById('btnAddEmployee').addEventListener('click', () => openEmployeeModal(null));
    document.getElementById('btnExportCSV').addEventListener('click', exportToCSV);
    document.getElementById('btnBatchProcess').addEventListener('click', processAllPending);
    document.getElementById('btnResetData').addEventListener('click', () => {
      if (confirm('Reset payroll records to default enterprise seed data?')) {
        employees = [...SEED_EMPLOYEES];
        saveData();
        renderTable();
        showToast('Payroll data reset to enterprise factory defaults.', 'info');
      }
    });

    // Print payslip
    document.getElementById('btnPrintPayslip').addEventListener('click', () => {
      window.print();
    });

    // Close modal buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });
  };

  // Init
  window.addEventListener('DOMContentLoaded', () => {
    loadData();
    initEventListeners();
    renderTable();
  });
})();
