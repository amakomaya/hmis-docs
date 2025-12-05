# DHIS2 Upgrade Guide for System Administrators

## Introduction

This guide provides a structured approach to upgrading DHIS2 and its dependencies, facilitating a seamless transition between versions. It outlines actionable steps while emphasizing critical aspects such as comprehensive backups to mitigate the risk of data loss. Upgrading DHIS2 involves more than simply replacing the WAR file; new releases may require updated dependencies, such as Java or Tomcat. Given the potential for unforeseen issues, thorough preparation is essential. By proactively identifying potential risks and developing mitigation strategies, administrators can minimize disruptions and ensure a successful upgrade.

## Target Audience

This guide is intended for **System Administrators** responsible for maintaining DHIS2 deployments. Because DHIS2 supports only the three most recent annual releases, regular upgrades are required. These upgrades, typically handled by system administrators, necessitate Linux expertise and strong server/application management skills. The largely manual process requires careful planning, encompassing not only DHIS2 itself but also dependencies like PostgreSQL, Java, Tomcat, and the base operating system.

## Importance of Upgrading

Only the three latest major releases of DHIS2 are supported with maintenance patches and updates. The same is true of its dependencies, such as PostgreSQL, Tomcat, and Nginx, which follow their own independent release and support cycles. While their timelines may vary, outdated versions eventually reach end-of-life, losing official support, security updates, and compatibility with newer DHIS2 releases. To ensure system stability, security, and compatibility, it is crucial to keep both DHIS2 and its dependencies within their supported versions.

### Key Benefits of Upgrading

- Ensure compliance with DHIS2 support policy, which covers only the latest three major releases.
- Apply the latest security patches to protect against vulnerabilities.
- Benefit from recent bug fixes that enhance system stability.
- Improve performance through optimizations introduced in newer versions.
- Gain access to new features and enhancements.
- Maintain compatibility with updated dependencies required by the latest DHIS2 releases.

### Components for Upgrading

The system administrators must take into account the entire system stack when considering DHIS2 upgrades. This consists of:

- **Operating System (OS)** – Most deployments use Ubuntu LTS, which has a five-year support lifecycle. Running DHIS2 on an unsupported OS can lead to compatibility and security issues. It's best to upgrade the OS first while keeping DHIS2 unchanged, ensuring a stable foundation before updating the application. Supported LTS versions typically include compatible software like PostgreSQL.

- **Database** – PostgreSQL follows a defined support lifecycle, maintaining only the [latest five major releases](https://www.postgresql.org/support/versioning/). Running a supported version is crucial for security and performance. While upgrading via package managers like `apt` is straightforward, changes in newer versions (such as JIT being enabled by default from PostgreSQL 12) can introduce regressions that may impact performance.

- **Dependencies** – DHIS2 relies on various components like **Tomcat**, **Nginx**, and **PostgreSQL**, all of which require periodic updates. Linux package managers (`apt`, `yum`) simplify dependency upgrades, but it’s essential to review DHIS2’s recommended versions and requirements before proceeding; the system requirements may change with a new DHIS2 version.

- **DHIS2 application upgrade** – The DHIS2 upgrade itself may vary in scope, complexity, and risk. Three main types of upgrade for the core application are:

  - **Major Upgrade** – Significant changes and new features, may break compatibility with older versions. Changes in the first version number (e.g., from 2.38 to 2.39 or v41 to v42). Often includes database schema changes.
  - **Minor Upgrade (Patch Update)** – Incremental, non-breaking changes with improvements and bug-fixes.
  - **Hot-fix** – Minimal updates to solve urgent issues, safe to apply on systems already running the proceeding patch update.

> **Note:** The `2.` in the DHIS2 version number has been replaced with `v` in more recent documentation. Remaining numbers follow `<major>.<patch>.<hotfix>` (semantic versioning equivalent).

## Technical Skills and Roles Required

Managing and upgrading DHIS2 requires coordination among multiple teams and stakeholders:

### System Administrator

Responsible for:

- Performing DHIS2 upgrades and managing server-related tasks.
- Ensuring the operating system, database, and dependencies are up to date.
- Monitoring server performance and troubleshooting issues.
- Managing backups and disaster recovery plans.

### DHIS2 Users

Includes:

- **Developers/Implementers** – Configuring, customizing, extending DHIS2 functionality.
- **Data Entry Personnel** – Capturing and validating data within the system.
- **Data Consumers & Analysts** – Generating reports and analyzing data for decision-making.

### Network Team

Responsible for:

- Configuring and maintaining network security, including firewall rules.
- Ensuring secure access to DHIS2 servers and databases.
- Troubleshooting connectivity issues that may affect system access.

### Infrastructure Team

Handles:

- Provisioning and managing virtual machines, storage pools, and cloud resources.
- Setting up a test environment for pre-upgrade validations.
- Ensuring high availability and system redundancy.

### DNS Administrator

Responsible for:

- Managing domain name resolution to ensure DHIS2 services are accessible.
- Updating DNS records for migrations or IP changes.

### Key Stakeholders

Includes:

- **Management & System Owners** – Overseeing operational integrity and compliance.
- **Funders & Donors** – Supporting system sustainability.
- **Project Managers** – Coordinating upgrade timelines and minimizing user disruption.

## Preparations Before Upgrading

### 1. Backup Everything

- **Database Backup:** `pg_dump` full backup, test and store off-site.
- **DHIS2 Files Backup:** DHIS2 home directory, configuration, filestore, custom scripts.
- **Server Snapshot:** For virtual/cloud environments.

### 2. Review Compatibility and System Requirements

- Check [release notes](https://dhis2.org) for version-specific requirements.
- Ensure OS, PostgreSQL, Java, Tomcat, and other dependencies meet requirements.

### 3. Test in a Staging Environment

- Deploy the new version in a test environment before production.
- Verify data integrity and application functionality.

### 4. Review Custom Configurations and Extensions

- Check apps, scripts, or configs for compatibility.
- Verify third-party integrations.

### 5. Inform Stakeholders and Plan Downtime

- Notify users about downtime and changes.
- Schedule upgrades during off-peak hours.

### 6. Document the Current System

- Record DHIS2, PostgreSQL, Tomcat, and OS versions.
- Note `dhis.conf` and `server.xml` configurations.

### 7. Prepare a Rollback Plan

- Have a tested recovery strategy with backups and snapshots accessible.

## Post-Upgrade Steps

1. **Verify the Upgrade** – Confirm version, check logs, verify DB migrations.
2. **Test Core Functionality** – Login, dashboards, data entry, analytics.
3. **Validate Data Integrity** – Run **Data Integrity Check** in Maintenance App.
4. **Monitor Performance** – Check CPU, RAM, disk usage; review DB queries.
5. **Update Configurations** – Optimize `dhis.conf`, `server.xml`, PostgreSQL settings.
6. **Test Integrations** – Validate external systems and scheduled jobs.
7. **Inform Users** – Share changes and provide support.
8. **Perform Final Backup** – Full post-upgrade backup stored securely.

## Detailed Considerations

### Analyze Scope

- Consider OS, PostgreSQL, dependencies separately.
- For OS upgrades, build a new server rather than in-place upgrade.
- Ensure Tomcat, JRE, PostgreSQL versions match DHIS2 requirements.

### Backups

- Full OS snapshot.
- Logical database backup (`pg_dump`).
- Incremental backup for smaller, faster backups.
- Local and off-site storage.
- Cloud backups and encryption recommended.

### Assess Server Resources

- Ensure adequate CPU, RAM, storage.
- Test server should mirror production specs.
- Use SSDs for DB; fast network for backups.

### Assess Software Requirements

- JRE, PostgreSQL, PostGIS, Tomcat versions.
- Prefer recommended versions over minimum requirements.

### Metadata Assessment

- Run metadata assessment scripts: [metadata-assessment](https://github.com/dhis2/metadata-assessment)
- Fix anomalies in test instance.

### Testing

- Use a checklist.
- Involve users.
- Monitor logs.
- Measure performance.

## Upgrading DHIS2 (Short Version)

| Step | Task | Description | Status |
|------|------|-------------|--------|
| 1 | Getting Started | Identify national systems, custom apps, versions, test server, scope | Pending/Ongoing/Completed |
| 2 | Backup Current System | DHIS2 DB, config, apps, integrations; document backup times | Pending/Ongoing/Completed |
| 3 | Review Release Notes | Understand new features, fixes, breaking changes |  |
| 4 | Set Up Staging | Replicate production, restore DB, test |  |
| 5 | Test Upgrade | Implement upgrade in staging, run metadata cleanup, test cases, fix issues |  |
| 6 | Notify Stakeholders | Inform users about planned upgrade |  |
| 7 | Create Rollback Plan | Backup app and DB |  |
| 8 | Upgrade Production | Apply upgrade once staging tests pass |  |
| 9 | Post-Upgrade Testing | Verify functionality in production |  |
| 10 | Monitor System | Continuously check logs and performance |  |
| 11 | Document Process | Record challenges, solutions, lessons learned |  |
| 12 | Gather Feedback | Collect user feedback on new version |  |

## Upgrade Calendar (Example)

| Month | Activity | Resource Implication |
|-------|---------|--------------------|
| April (pre-release) | Metadata assessment and cleanup; start testing; join beta program | Human resources for metadata cleanup; server resources for testing; sysadmin for installation; human resources for testing |
| May (new release) | Test release; plan training, online materials | Server resources for testing; human resources for training prep |
| June | Training | Sysadmin resource for installation; server resource for training; provision training events |
| July | Upgrade production | Sysadmin resource for installation |
