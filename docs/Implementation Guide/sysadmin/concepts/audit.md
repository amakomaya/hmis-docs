# Audit

## Introduction

DHIS2 supports a new audit service based on _Apache ActiveMQ Artemis_. Artemis is used as an asynchronous messaging system by DHIS2.

After an entity is saved to the database, an audit message will be created and sent to the Artemis message consumer service. The message will then be processed in a different thread.

Audit logs can be retrieved from the DHIS2 database. Currently there is no UI or API endpoint available for retrieving audit entries.

Detailed explanation of the audit system architecture can be found [here](https://github.com/dhis2/wow-backend/blob/master/guides/auditing.md).

## What we log {#what_we_log}

This is the list of operations logged as part of the audit system:

- Operations on user accounts (creation, profile edits, etc.)
- Operations on user roles, groups, and authority groups
- Operations on metadata objects (categories, organization units, reports, etc.)
- Operations on tracked objects (tracked entities, etc.)
- Job configuration changes
- Breaking the glass operations

## Single Audit Table {#audit_table}

All audit entries, except those related to tracked entities, are saved in a single table named `audit`.

| Column | Type | Description |
| ------ | ---- | ----------- |
| auditid | integer | Primary key |
| audittype | text | READ, CREATE, UPDATE, DELETE, SEARCH |
| auditscope | text | METADATA, AGGREGATE, TRACKER |
| klass | text | Audit Entity Java class name |
| attributes | jsonb | JSON string with attributes of the audited object, e.g. `{"valueType":"TEXT", "categoryCombo":"SWQW313FQY", "domainType":"TRACKER"}` |
| data | bytea | Compressed JSON string of the audit entity in byte array format (not human-readable) |
| createdat | timestamp without time zone | Time of creation |
| createdby | text | Username of the user performing the operation |
| uid | text | UID of the audited object |
| code | text | Code of the audited object |

The audit service uses two concepts: _Audit Scope_ and _Audit Type_.

## Audit Scope {#audit_scope}

An audit scope is a logical area of the application that can be audited. Currently, there are three scopes:

| Scope | Key | Audited objects |
| ----- | --- | --------------- |
| Tracker | TRACKER | Tracked Entity, Enrollment, Event |
| Metadata | METADATA | All metadata objects (e.g., Data Element, Organisation Unit) |
| Aggregate | AGGREGATE | Aggregate Data Value |

## Audit Type {#audit_type}

An audit type is an action that triggers an audit operation. Supported types:

| Name | Key | Description |
| ---- | --- | ----------- |
| Read | READ | Object was read |
| Create | CREATE | Object was created |
| Update | UPDATE | Object was updated |
| Delete | DELETE | Object was deleted |
| Disabled | DISABLED | Disable audit |

> **Caution:**  
> The READ audit type may generate a lot of data and impact performance.

## Tracked Entity Audits

Operations on tracked entities are stored in the `trackedentityaudit` table.

### trackedentityaudit

| Column | Type | Description |
| ------ | ---- | ----------- |
| trackedentityauditid | integer | Primary key |
| trackedentity | text | Tracked entity name |
| created | timestamp without time zone | Time of creation |
| accessedby | text | Username of the user performing the operation |
| audittype | text | READ, CREATE, UPDATE, DELETE, SEARCH |
| comment | text | The code of the audited object |

This data can be retrieved via the [API](#webapi_tracked_entity_audits).

## Breaking the Glass

"Breaking the glass" allows a user to access records they don’t normally have access to, providing a reason for such access.

A video explanation is available on our [YouTube channel](https://www.youtube.com/watch?v=rTwg5Ix_E_M).

The events are stored in the `programtempownershipaudit` table:

| Column | Type | Description |
| ------ | ---- | ----------- |
| programtempownershipauditid | integer | Primary key |
| programid | integer | Program ID of the tracked entity |
| trackedentityid | integer | Tracked entity ID |
| created | timestamp without time zone | Time of creation |
| accessedby | text | Username of the user performing the operation |
| reason | text | Reason entered in the dialog |

## Setup {#audit_configuration}

The audit system is enabled by default for the following scopes and types.

### Scopes (case-sensitive)

- `READ`
- `CREATE`
- `UPDATE`
- `DELETE`
- `SEARCH`
- `DISABLED`

### Types

- `METADATA`
- `TRACKER`
- `AGGREGATE`

No action is required to enable the default audit system. The default configuration in `dhis.conf`:

```properties
audit.metadata = CREATE;UPDATE;DELETE
audit.tracker = CREATE;UPDATE;DELETE
audit.aggregate = CREATE;UPDATE;DELETE
