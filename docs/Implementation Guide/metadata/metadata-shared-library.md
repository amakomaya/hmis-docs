# IHIMS → DHIS2 Metadata Migration (Step-by-Step) Common Tracker Metadata Library

This document explains **how to extract metadata from IHIMS and manually import it into a DHIS2 project**, **one metadata type at a time**, using the **correct format and order**.

---

## 1. Export Format (Mandatory)

**✔ Supported format:** `JSON (DHIS2 Metadata Export)`

DHIS2 only accepts **JSON** for metadata import.

---

## 2. Overall Workflow

```text
IHIMS DHIS2
   ↓
Metadata Export (JSON)
   ↓
Validate / Split JSON
   ↓
Import into Target DHIS2 (Correct Order)
```

---

## 3. Prerequisites

* Same or compatible DHIS2 versions (recommended 2.40+)
* Metadata import permission
* Access to Maintenance App
* Test first on staging DHIS2

---

## 4. Metadata Import Order (Critical)

> **Always follow this order to avoid dependency errors**

---

## 5. OPTION

### Metadata Types

* Option
* Option Set
* Option Group
* Option Group Set

### Notes

* Used by Data Elements, Program Rules, Attributes
* Must be imported before Data Elements

---

## 6. DATA ELEMENT

### Metadata Types

* Data Element
* Data Element Group
* Data Element Group Set

### Dependencies

* Option Set

---

## 7. ORGANISATION UNIT

### Metadata Types

* Organisation Unit
* Organisation Unit Level
* Organisation Unit Group
* Organisation Unit Group Set

### Important

* Preserve `parent`, `path`, and `level`
* Do not modify hierarchy

---

## 8. PROGRAM (eRecord / Capture / Tracker / Event)

### Metadata Types

* Tracked Entity Type
* Tracked Entity Attribute
* Program
* Program Section
* Program Stage
* Program Stage Section
* Program Indicator
* Program Indicator Group

### Best Practice

* Export and import **one Program at a time**

---

## 9. PROGRAM RULE

### Metadata Types

* Program Rule Variable
* Program Rule Action
* Program Rule

### Dependencies

* Program
* Data Elements
* Tracked Entity Attributes

---


## 10. INDICATOR

### Metadata Types

* Indicator Type
* Indicator
* Indicator Group
* Indicator Group Set

### Dependencies

* Data Elements
* Expression Dimension Items

---


## 11. VISUALIZATION & DASHBOARD

### Metadata Types

* Visualization
* Event Visualization
* Map
* Map View
* External Map Layer
* Legend Set
* Dashboard

### Notes

* Visual-only metadata
* Safe to import last

---

## 12. USER (Optional – Not Recommended)

### Metadata Types

* User Role
* User Group
* User

⚠ **Recommendation:** Do not migrate users between systems. Create manually.

---

## 14. Final Notes

* Always import metadata in small, logical batches
* Keep backups before every import
* Prefer API-based export/import for large systems
