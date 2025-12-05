# Using the User Impersonation Feature in DHIS2

## Overview

User impersonation, also known as user switching, is a powerful feature in DHIS2 that allows administrative users to log in as another user. This is particularly useful for troubleshooting or resolving user-related issues, as it allows an administrator to experience DHIS2 exactly as the user does.

The feature is built on the `SwitchUserFilter` from Spring Security, with additional DHIS2-specific configuration options.

> **Note**  
> The feature is **disabled** by default. To enable it, set the `switch_user_feature.enabled` property to `true` in your `dhis.conf` file.  
> It is considered **experimental** and can only be called from configured IP addresses. You must configure the `switch_user_allow_listed_ips` property in `dhis.conf` with the IPs from which you will use the feature.

## How It Works

1. An administrative user makes a request to a specific URL (e.g., `/impersonate?username=USERNAME`) with the `username` parameter indicating the user to impersonate.
2. The feature intercepts the request, switches the `SecurityContext` to the new user, and redirects to the home page.
3. While impersonating, the administrative user can make requests as the impersonated user.
4. To return to the original user, the administrative user navigates to another URL (e.g., `/impersonateExit`). The `SecurityContext` is switched back, and the user is redirected to the home page.

## How to Use

1. Log in as an administrative user with either the `ALL` or `F_IMPERSONATE_USER` authority.  
2. Navigate to the impersonation URL (e.g., `/impersonate?username=USERNAME`).  
3. Provide the `username` of the user to impersonate.  
4. The session will switch to the impersonated user, and you will be redirected to the home page.  
5. Perform any necessary actions for troubleshooting or user support.  
6. End impersonation by navigating to the URL (e.g., `/impersonateExit`) to return to your original session.

## Configuration

| Property | Description | Default |
|----------|-------------|---------|
| `switch_user_feature.enabled` | Enable or disable the feature | `disabled` |
| `switch_user_allow_listed_ips` | List of allowed IPs for impersonation | `localhost,127.0.0.1,[0:0:0:0:0:0:0:1]` |

## Security Restrictions

- The feature must be enabled in `dhis.conf` (default: `disabled`).  
- Requests must originate from an allowed IP.  
- Users without `ALL` authority cannot impersonate users with `ALL` authority.  
- Users cannot impersonate themselves.

## Security Implications

This feature has inherent security risks. Only trusted administrators should be granted access. Pay attention to logs related to impersonation, which follow this format:

