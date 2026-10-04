# Enterprise Operations Management Suite

A suite of three production-ready, standalone corporate web applications built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with a classic corporate portal layout, high-density data tables, real-time KPI metrics, interactive modals, CSV ledger exports, and client-side persistence (`localStorage`).

---

## 📁 Project Structure

```text
enterprise-management-suite/
│
├── index.html                           # Master Suite Hub / Launchpad
├── README.md                            # Comprehensive Suite Documentation
│
├── 1-payroll-management-system/         # Portal 1: CorpPay Enterprise
│   ├── index.html                       # High-density payroll dashboard & payslip voucher
│   ├── styles.css                       # Classic corporate styling & print media rules
│   ├── app.js                           # Payroll logic, live math, CSV export, seed data
│   └── README.md                        # Documentation for Payroll System
│
├── 2-vehicle-management-portal/         # Portal 2: FleetOps Enterprise
│   ├── index.html                       # Fleet telematics & asset ledger
│   ├── styles.css                       # High-density fleet management stylesheet
│   ├── app.js                           # Vehicle registry, maintenance logs, work orders
│   └── README.md                        # Documentation for Fleet Portal
│
└── 3-complaint-resolution-platform/     # Portal 3: ResolvIO Enterprise
    ├── index.html                       # Grievance redressal & service desk
    ├── styles.css                       # Enterprise resolution platform stylesheet
    ├── app.js                           # Ticket intake, SLA countdown, audit logs
    └── README.md                        # Documentation for Complaint Platform
```

---

## 🏢 The 3 Standalone Applications

### 1. CorpPay Enterprise (Payroll Management System)
* **Directory**: [`1-payroll-management-system/`](file:///C:/Users/Rajendran/.gemini/antigravity/scratch/enterprise-management-suite/1-payroll-management-system/index.html)
* **Key Features**:
  * **Dynamic Compensation Calculations**: Automatically calculates Gross Pay = Basic + HRA + Special Allowance, Total Deductions = EPF + TDS + Mediclaim, and Net Take-Home Pay.
  * **Official Printable Payslip Voucher**: Standardized corporate voucher formatted for instant browser printing (`Ctrl+P` / `window.print()`) or saving as PDF with signature blocks.
  * **Batch Payroll Processing**: Approve all pending drafts and disburse verified payroll with a single click.
  * **Interactive Employee Modal**: Add or update salary structures with real-time gross/deduction/net preview.
  * **Departmental Filters & Sorting**: Real-time filtering by Engineering, HR, Finance, Operations, Sales and column-level sorting.
  * **CSV Ledger Export**: Download complete monthly register for accounting archives.

### 2. FleetOps Enterprise (Vehicle Management Portal)
* **Directory**: [`2-vehicle-management-portal/`](file:///C:/Users/Rajendran/.gemini/antigravity/scratch/enterprise-management-suite/2-vehicle-management-portal/index.html)
* **Key Features**:
  * **Commercial Fleet Registry**: Heavy commercial trucks, delivery vans, electric light vehicles, and executive passenger transport.
  * **Maintenance & Workshop Work Orders**: Log servicing events with authorized vendors, itemized parts, costs, and odometer readings.
  * **Service Due & Inspection Alerts**: Flags vehicles due for preventative maintenance.
  * **Crew & Depot Reassignment**: Real-time driver reassignments, phone updates, and operational depot transfers.
  * **Technical Asset Passport**: Inspect complete chronological repair and inspection history for any vehicle.
  * **CSV Registry Export**: Download fleet telematics and asset data.

### 3. ResolvIO Enterprise (Complaint Resolution Platform)
* **Directory**: [`3-complaint-resolution-platform/`](file:///C:/Users/Rajendran/.gemini/antigravity/scratch/enterprise-management-suite/3-complaint-resolution-platform/index.html)
* **Key Features**:
  * **Grievance Redressal Registry**: Multi-category ticketing across HR & Payroll, Fleet Logistics, Billing, IT Infrastructure, and Workplace Facilities.
  * **Automated SLA Countdown Engine**:
    * `Critical`: 4-hour strict resolution target
    * `High`: 12-hour resolution target
    * `Medium`: 24-hour resolution target
    * `Low`: 48-hour resolution target
  * **Interactive Resolution Console**: Dedicated investigation console featuring complete chronological audit trail logs, internal notes, reassignment controls, and state transitions.
  * **One-Click Quick Actions**: Mark tickets as resolved or reopen them instantly with automated audit timestamps.
  * **CSV Audit Export**: Export grievance logs for regulatory compliance and operational auditing.

---

## 🚀 How to Run

1. **Launch the Master Hub**:
   Simply double-click or open `index.html` in the root folder (`enterprise-management-suite/`) in any browser (Google Chrome, Microsoft Edge, Firefox, Safari).
2. **Launch Standalone Applications**:
   You can also directly open any of the subfolders' `index.html` files to use each portal independently.
3. **No Setup Required**:
   * **Zero build tools**, no node_modules, no Webpack/Vite required.
   * **Zero external CDN dependencies**: works 100% offline.
   * **State is preserved** across reloads using standard browser `localStorage`.
   * **Factory Reset Button** available in every app to restore default enterprise seed datasets at any time.
