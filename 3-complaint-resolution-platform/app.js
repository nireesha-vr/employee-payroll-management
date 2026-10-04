/**
 * ResolvIO Enterprise - Complaint Resolution Platform
 * Vanilla JavaScript Application Logic
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'resolvio_complaints_records_v1';

  const SEED_COMPLAINTS = [
    {
      id: 'TKT-2026-0891',
      subject: 'Discrepancy in HRA tax deduction on October payroll',
      description: 'Employee noticed an additional TDS deduction under Section 192 despite submission of rent receipts on the portal.',
      requester: 'Ramesh Gowda',
      requesterEmail: 'ramesh.g@corp.internal',
      category: 'HR & Payroll',
      priority: 'High',
      slaHours: 12,
      assignedTo: 'Sneha Patel (HR/Payroll)',
      status: 'In Progress',
      createdAt: '2026-10-04 09:30',
      resolvedAt: null,
      history: [
        { timestamp: '2026-10-04 09:30', author: 'System Dispatch', note: 'Grievance ticket registered and assigned to HR/Payroll team.', statusChange: 'New' },
        { timestamp: '2026-10-04 10:15', author: 'Sneha Patel', note: 'Audit started on Form 12BB tax declarations.', statusChange: 'In Progress' }
      ]
    },
    {
      id: 'TKT-2026-0892',
      subject: 'GPS Telematics offline on Commercial Truck KA-01-EA-4521',
      description: 'Vehicle telematics dropped signal during intra-city transit near Electronic City route. Live location feeds stopped reporting.',
      requester: 'Vikramaditya Rao',
      requesterEmail: 'v.rao@corp.internal',
      category: 'Vehicle & Logistics',
      priority: 'Critical',
      slaHours: 4,
      assignedTo: 'Arjun Mehta (Telematics)',
      status: 'Escalated',
      createdAt: '2026-10-04 11:15',
      resolvedAt: null,
      history: [
        { timestamp: '2026-10-04 11:15', author: 'IoT Gateway', note: 'Critical alert: Heartbeat ping loss detected.', statusChange: 'New' },
        { timestamp: '2026-10-04 11:45', author: 'Arjun Mehta', note: 'Driver contacted; manual cellular check initiated. Telematics SIM suspected dead zone.', statusChange: 'Escalated' }
      ]
    },
    {
      id: 'TKT-2026-0893',
      subject: 'Invoice #INV-9921 duplicate payment gateway capture',
      description: 'Vendor enterprise portal processed payment transaction twice due to API timeout retry loop.',
      requester: 'Acme Logistics Partner',
      requesterEmail: 'accounts@acmepartner.com',
      category: 'Billing & Invoicing',
      priority: 'High',
      slaHours: 12,
      assignedTo: 'Ananya Sharma (Finance)',
      status: 'Under Review',
      createdAt: '2026-10-03 16:40',
      resolvedAt: null,
      history: [
        { timestamp: '2026-10-03 16:40', author: 'Vendor Portal Webhook', note: 'Grievance logged by partner finance desk.', statusChange: 'New' },
        { timestamp: '2026-10-04 09:00', author: 'Ananya Sharma', note: 'Bank merchant statement requested for charge reversal reconciliation.', statusChange: 'Under Review' }
      ]
    },
    {
      id: 'TKT-2026-0894',
      subject: 'VPN Gateway connection failure for North Regional Office',
      description: 'Multiple staff members unable to establish IPsec tunnel to corporate intranet servers.',
      requester: 'Devendra Rawat',
      requesterEmail: 'devendra.r@corp.internal',
      category: 'IT Systems & Infrastructure',
      priority: 'Critical',
      slaHours: 4,
      assignedTo: 'Karthik Raman (DevOps)',
      status: 'Resolved',
      createdAt: '2026-10-03 08:20',
      resolvedAt: '2026-10-03 10:45',
      history: [
        { timestamp: '2026-10-03 08:20', author: 'Devendra Rawat', note: 'Reported timeout error 691 during certificate handshake.', statusChange: 'New' },
        { timestamp: '2026-10-03 09:10', author: 'Karthik Raman', note: 'Certificate revocation list refreshed on edge router.', statusChange: 'In Progress' },
        { timestamp: '2026-10-03 10:45', author: 'Karthik Raman', note: 'All tunnels restored. Gateway verified healthy.', statusChange: 'Resolved' }
      ]
    },
    {
      id: 'TKT-2026-0895',
      subject: 'Precision HVAC temperature warning in Server Room Bay 2',
      description: 'Environmental monitoring sensor reading 26.5°C, exceeding safe cold-aisle threshold of 22°C.',
      requester: 'Building Operations',
      requesterEmail: 'facilities@corp.internal',
      category: 'Facilities & Workplace',
      priority: 'High',
      slaHours: 12,
      assignedTo: 'Facilities Lead',
      status: 'In Progress',
      createdAt: '2026-10-04 13:00',
      resolvedAt: null,
      history: [
        { timestamp: '2026-10-04 13:00', author: 'BMS Telemetry', note: 'Sensor threshold tripped in Zone 4B.', statusChange: 'New' },
        { timestamp: '2026-10-04 13:30', author: 'Facilities Lead', note: 'Secondary chiller compressor activated; technician dispatched.', statusChange: 'In Progress' }
      ]
    },
    {
      id: 'TKT-2026-0896',
      subject: 'Access entitlement request for Enterprise Data Warehouse',
      description: 'Need read permissions to Sales & Distribution schemas for quarterly revenue reporting.',
      requester: 'Meera Nambiar',
      requesterEmail: 'meera.n@corp.internal',
      category: 'IT Systems & Infrastructure',
      priority: 'Medium',
      slaHours: 24,
      assignedTo: 'IAM Security Officer',
      status: 'Resolved',
      createdAt: '2026-10-02 10:15',
      resolvedAt: '2026-10-02 14:30',
      history: [
        { timestamp: '2026-10-02 10:15', author: 'Meera Nambiar', note: 'Manager approval attached in ticket request.', statusChange: 'New' },
        { timestamp: '2026-10-02 14:30', author: 'IAM Security Officer', note: 'Role-based access provisioned to BigQuery schema.', statusChange: 'Resolved' }
      ]
    },
    {
      id: 'TKT-2026-0897',
      subject: 'Travel conveyance reimbursement delayed past cutoff date',
      description: 'Fleet driver claims travel food allowance submitted on Sept 25th has not reflected in account.',
      requester: 'Basavaraj Patil',
      requesterEmail: 'basavaraj.p@corp.internal',
      category: 'HR & Payroll',
      priority: 'Low',
      slaHours: 48,
      assignedTo: 'HR Desk',
      status: 'New',
      createdAt: '2026-10-04 15:45',
      resolvedAt: null,
      history: [
        { timestamp: '2026-10-04 15:45', author: 'Basavaraj Patil', note: 'Claim voucher reference #CLM-8841 attached.', statusChange: 'New' }
      ]
    },
    {
      id: 'TKT-2026-0898',
      subject: 'Damaged pallet packaging reported upon arrival at Mumbai Central Hub',
      description: 'Consignment delivery #CN-5519 contained torn shrink-wrap and corner box denting.',
      requester: 'Suresh Patil (Depot Supervisor)',
      requesterEmail: 'suresh.p@corp.internal',
      category: 'Vehicle & Logistics',
      priority: 'Medium',
      slaHours: 24,
      assignedTo: 'Quality Assurance Inspector',
      status: 'Under Review',
      createdAt: '2026-10-03 14:10',
      resolvedAt: null,
      history: [
        { timestamp: '2026-10-03 14:10', author: 'Suresh Patil', note: 'Inspection report and unloading bay photographs filed.', statusChange: 'New' },
        { timestamp: '2026-10-04 09:30', author: 'QA Inspector', note: 'Insurance surveyor notified for pre-dispatch liability audit.', statusChange: 'Under Review' }
      ]
    }
  ];

  let complaints = [];
  let sortColumn = 'createdAt';
  let sortDirection = 'desc';
  let currentPage = 1;
  const pageSize = 8;

  const loadData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        complaints = JSON.parse(stored);
      } catch (e) {
        complaints = [...SEED_COMPLAINTS];
      }
    } else {
      complaints = [...SEED_COMPLAINTS];
      saveData();
    }
  };

  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
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
    const total = complaints.length;
    let criticalCount = 0;
    let inProgressCount = 0;
    let resolvedCount = 0;

    complaints.forEach(c => {
      if (c.priority === 'Critical' || c.status === 'Escalated') criticalCount++;
      if (['In Progress', 'Under Review'].includes(c.status)) inProgressCount++;
      if (['Resolved', 'Closed'].includes(c.status)) resolvedCount++;
    });

    document.getElementById('kpiTotalTickets').textContent = total;
    document.getElementById('kpiCriticalTickets').textContent = `${criticalCount} Urgent`;
    document.getElementById('kpiInProgressTickets').textContent = `${inProgressCount} Active`;
    document.getElementById('kpiResolvedTickets').textContent = `${resolvedCount} Resolved`;
    document.getElementById('kpiAvgResolution').textContent = '3.8 Hours';
  };

  const renderTable = () => {
    const tbody = document.getElementById('complaintTableBody');
    const searchVal = (document.getElementById('searchInput').value || '').toLowerCase().trim();
    const catFilter = document.getElementById('filterCategory').value;
    const priorityFilter = document.getElementById('filterPriority').value;
    const statusFilter = document.getElementById('filterStatus').value;

    let filtered = complaints.filter(c => {
      const matchSearch =
        c.id.toLowerCase().includes(searchVal) ||
        c.subject.toLowerCase().includes(searchVal) ||
        c.requester.toLowerCase().includes(searchVal) ||
        c.assignedTo.toLowerCase().includes(searchVal);
      const matchCat = !catFilter || c.category === catFilter;
      const matchPriority = !priorityFilter || c.priority === priorityFilter;
      const matchStatus = !statusFilter || c.status === statusFilter;
      return matchSearch && matchCat && matchPriority && matchStatus;
    });

    filtered.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

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
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 24px; color:#64748b;">No complaints or grievances match the active filter criteria.</td></tr>`;
    } else {
      pagedRecords.forEach(c => {
        const tr = document.createElement('tr');

        let prioBadge = 'badge-low';
        if (c.priority === 'Critical') prioBadge = 'badge-critical';
        else if (c.priority === 'High') prioBadge = 'badge-high';
        else if (c.priority === 'Medium') prioBadge = 'badge-medium';

        let statusBadge = 'badge-new';
        if (c.status === 'In Progress') statusBadge = 'badge-in-progress';
        else if (c.status === 'Escalated') statusBadge = 'badge-escalated';
        else if (c.status === 'Under Review') statusBadge = 'badge-under-review';
        else if (c.status === 'Resolved') statusBadge = 'badge-resolved';
        else if (c.status === 'Closed') statusBadge = 'badge-closed';

        tr.innerHTML = `
          <td class="bold">
            <span style="color:#4338ca;">${c.id}</span>
            <div style="font-size:10px; color:#64748b;">${c.createdAt}</div>
          </td>
          <td>
            <strong>${c.subject}</strong>
            <div style="font-size:10.5px; color:#64748b; max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${c.description}</div>
          </td>
          <td>
            <span class="category-pill">${c.category}</span>
          </td>
          <td>
            <strong>${c.requester}</strong>
            <div style="font-size:10px; color:#64748b;">${c.requesterEmail}</div>
          </td>
          <td><span class="badge ${prioBadge}">${c.priority} (${c.slaHours}h SLA)</span></td>
          <td>
            <div style="font-weight:600; color:#334155;">${c.assignedTo}</div>
          </td>
          <td><span class="badge ${statusBadge}">${c.status}</span></td>
          <td style="font-size:11px;">
            ${c.resolvedAt ? `<span style="color:#15803d; font-weight:600;">Resolved: ${c.resolvedAt}</span>` : `<span style="color:#b91c1c;">Target: Within ${c.slaHours}h</span>`}
          </td>
          <td>
            <div style="display:flex; gap: 4px;">
              <button class="btn btn-primary btn-xs action-console" data-id="${c.id}" title="Open Resolution & Activity Console">Console</button>
              ${
                c.status !== 'Resolved' && c.status !== 'Closed'
                  ? `<button class="btn btn-success btn-xs action-quick-resolve" data-id="${c.id}" title="Quick Mark as Resolved">Resolve</button>`
                  : `<button class="btn btn-secondary btn-xs action-reopen" data-id="${c.id}" title="Reopen Grievance">Reopen</button>`
              }
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    document.getElementById('tableInfo').textContent = `Showing ${totalRecords === 0 ? 0 : startIdx + 1} to ${Math.min(startIdx + pageSize, totalRecords)} of ${totalRecords} grievances`;
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
    let csv = 'Ticket ID,Subject,Description,Category,Requester Name,Requester Email,Priority,SLA Hours,Assigned Agent,Status,Created At,Resolved At\n';
    complaints.forEach(c => {
      csv += [
        c.id,
        `"${c.subject.replace(/"/g, '""')}"`,
        `"${c.description.replace(/"/g, '""')}"`,
        `"${c.category}"`,
        `"${c.requester}"`,
        c.requesterEmail,
        c.priority,
        c.slaHours,
        `"${c.assignedTo}"`,
        c.status,
        c.createdAt,
        c.resolvedAt || ''
      ].join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ResolvIO_Complaints_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Complaint registry exported successfully as CSV.', 'success');
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  };

  // Open Resolution Console Modal
  const openConsoleModal = (ticketId) => {
    const t = complaints.find(item => item.id === ticketId);
    if (!t) return;

    document.getElementById('consoleTicketId').value = t.id;
    document.getElementById('conTktCode').textContent = t.id;
    document.getElementById('conSubject').textContent = t.subject;
    document.getElementById('conDescription').textContent = t.description;
    document.getElementById('conCategory').textContent = t.category;
    document.getElementById('conPriority').textContent = `${t.priority} (${t.slaHours}h SLA)`;
    document.getElementById('conRequester').textContent = `${t.requester} (${t.requesterEmail})`;
    document.getElementById('conCreatedAt').textContent = t.createdAt;

    document.getElementById('conStatusSelect').value = t.status;
    document.getElementById('conAssigneeSelect').value = t.assignedTo;
    document.getElementById('conActionNote').value = '';

    const historyBox = document.getElementById('conAuditTrail');
    historyBox.innerHTML = '';
    const history = t.history || [];
    if (history.length === 0) {
      historyBox.innerHTML = '<div style="color:#64748b; text-align:center; padding:10px;">No historical audit remarks.</div>';
    } else {
      history.forEach(h => {
        const item = document.createElement('div');
        item.className = 'audit-item';
        item.innerHTML = `
          <div class="audit-meta">
            <span class="audit-author">${h.author}</span>
            <span>${h.timestamp} ${h.statusChange ? `• <strong style="color:#4338ca;">[${h.statusChange}]</strong>` : ''}</span>
          </div>
          <div>${h.note}</div>
        `;
        historyBox.appendChild(item);
      });
    }

    document.getElementById('consoleModal').classList.add('active');
  };

  const openNewComplaintModal = () => {
    document.getElementById('newComplaintForm').reset();
    const nextNum = String(complaints.length + 1).padStart(2, '0');
    document.getElementById('newTicketId').value = `TKT-2026-09${nextNum}`;
    document.getElementById('newComplaintModal').classList.add('active');
  };

  const initEventListeners = () => {
    document.getElementById('searchInput').addEventListener('input', () => {
      currentPage = 1;
      renderTable();
    });

    ['filterCategory', 'filterPriority', 'filterStatus'].forEach(id => {
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

    // Delegation
    document.getElementById('complaintTableBody').addEventListener('click', (e) => {
      const target = e.target;
      const tId = target.getAttribute('data-id');

      if (target.classList.contains('action-console')) {
        openConsoleModal(tId);
      } else if (target.classList.contains('action-quick-resolve')) {
        const t = complaints.find(item => item.id === tId);
        if (t) {
          t.status = 'Resolved';
          t.resolvedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);
          if (!t.history) t.history = [];
          t.history.unshift({
            timestamp: t.resolvedAt,
            author: 'Operations Lead (Quick Action)',
            note: 'Ticket marked resolved directly via high-density table action.',
            statusChange: 'Resolved'
          });
          saveData();
          renderTable();
          showToast(`Grievance ${t.id} resolved.`, 'success');
        }
      } else if (target.classList.contains('action-reopen')) {
        const t = complaints.find(item => item.id === tId);
        if (t) {
          t.status = 'In Progress';
          t.resolvedAt = null;
          if (!t.history) t.history = [];
          t.history.unshift({
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            author: 'Service Supervisor',
            note: 'Ticket reopened for further customer inquiry.',
            statusChange: 'In Progress'
          });
          saveData();
          renderTable();
          showToast(`Grievance ${t.id} reopened.`, 'info');
        }
      }
    });

    // New Complaint Form Submit
    document.getElementById('newComplaintForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('newTicketId').value.trim();
      const subject = document.getElementById('newSubject').value.trim();
      const description = document.getElementById('newDescription').value.trim();
      const requester = document.getElementById('newRequester').value.trim();
      const requesterEmail = document.getElementById('newRequesterEmail').value.trim();
      const category = document.getElementById('newCategory').value;
      const priority = document.getElementById('newPriority').value;
      const assignedTo = document.getElementById('newAssignee').value;

      let slaHours = 24;
      if (priority === 'Critical') slaHours = 4;
      else if (priority === 'High') slaHours = 12;
      else if (priority === 'Medium') slaHours = 24;
      else if (priority === 'Low') slaHours = 48;

      const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

      const newTicket = {
        id,
        subject,
        description,
        requester,
        requesterEmail,
        category,
        priority,
        slaHours,
        assignedTo,
        status: 'New',
        createdAt: nowStr,
        resolvedAt: null,
        history: [
          { timestamp: nowStr, author: requester, note: 'New grievance logged via platform intake.', statusChange: 'New' }
        ]
      };

      complaints.unshift(newTicket);
      saveData();
      renderTable();
      closeModal('newComplaintModal');
      showToast(`Grievance ${id} submitted into resolution pipeline.`, 'success');
    });

    // Console Action Form Submit
    document.getElementById('consoleForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const tId = document.getElementById('consoleTicketId').value;
      const t = complaints.find(item => item.id === tId);
      if (!t) return;

      const newStatus = document.getElementById('conStatusSelect').value;
      const newAssignee = document.getElementById('conAssigneeSelect').value;
      const actionNote = document.getElementById('conActionNote').value.trim();

      const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
      t.status = newStatus;
      t.assignedTo = newAssignee;

      if (['Resolved', 'Closed'].includes(newStatus)) {
        if (!t.resolvedAt) t.resolvedAt = nowStr;
      } else {
        t.resolvedAt = null;
      }

      if (!t.history) t.history = [];
      t.history.unshift({
        timestamp: nowStr,
        author: 'Resolution Specialist (Console)',
        note: actionNote || `Status updated to ${newStatus}, assigned to ${newAssignee}`,
        statusChange: newStatus
      });

      saveData();
      renderTable();
      closeModal('consoleModal');
      showToast(`Audit log and status updated for ${t.id}.`, 'success');
    });

    // Action buttons
    document.getElementById('btnNewComplaint').addEventListener('click', openNewComplaintModal);
    document.getElementById('btnExportCSV').addEventListener('click', exportToCSV);
    document.getElementById('btnResetData').addEventListener('click', () => {
      if (confirm('Reset complaint platform to factory seed grievances?')) {
        complaints = [...SEED_COMPLAINTS];
        saveData();
        renderTable();
        showToast('Complaint platform reset to factory defaults.', 'info');
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
