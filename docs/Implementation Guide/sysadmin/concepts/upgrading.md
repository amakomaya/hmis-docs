# Upgrading

## Upgrading vs. Updating 

When we talk about upgrading DHIS2, we generally mean *moving to a newer version*. However, there is an important distinction between **upgrading** and **updating**.

**Upgrading**  
: Moving to a newer base version of DHIS2 (e.g., from 2.34 to 2.36). Upgrading typically requires planning, testing, and training (for new features or interfaces), which may take significant time and effort.

**Updating**  
: Moving to a newer patch of the current DHIS2 version (e.g., from 2.35.1 to 2.35.4). Updating mainly provides bug fixes without changing functionality. It is lower risk, and it is recommended to keep your version up to date.

## Before you begin 

> **Caution**  
> Once you upgrade, you cannot use the upgraded database with an older version of DHIS2. **Downgrading is not possible**.  
> If you need to revert, you must use a copy of the database created from the older version. It is strongly recommended to make a copy of your database before upgrading.

## Performing the upgrade 

Regardless of whether you are upgrading or updating, the technical process is largely identical. For simplicity, we will refer to it as **upgrading**.

### 1. Safeguard your data 

Depending on your DHIS2 instance and usage, the first step is ensuring you can recover important data if anything goes wrong.

Standard system admin tasks include:

1. Backing up your database  
2. Testing in a development or staging environment  
3. Scheduling downtime to avoid data entry during the upgrade  
4. Other precautionary measures as appropriate

### 2. Upgrade the software 

#### From v2.29 or below 

If you are starting from v2.29 or below:

- You must first upgrade to v2.30 version-by-version, manually, following the upgrade notes under each version on [DHIS2 Releases](https://github.com/dhis2/dhis2-releases).  
- Once you reach v2.30, you can continue to the next section.

#### From v2.30 or above 

If you are starting from at least v2.30:

1. **Read all upgrade notes** from your current version up to the target version on [DHIS2 Releases](https://github.com/dhis2/dhis2-releases). Ensure your environment meets all requirements.  
2. Stop the DHIS2 server.  
3. Make a final copy of your database (and verify it is not corrupted).  
4. Drop any materialized SQL views from your database.  
5. Replace the WAR file with the target version (no need to upgrade through intermediate versions; it is not recommended).  
6. Start the server.  

You should now be ready to enjoy the new fixes and features.
