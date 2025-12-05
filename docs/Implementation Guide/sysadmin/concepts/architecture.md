# Deployment Architectures

## Introduction

DHIS2 application can be deployed using different architectures, including single-server, distributed, hybrid, Docker, and Docker with Kubernetes. The choice of architecture depends on various factors such as simplicity, management complexity, scalability, maintainability, and performance.

## The Architectures

### Single-server

Uses LXD containers. You'll set the `ansible_connection` variable to `lxd`.

### Distributed

DHIS2 application stack runs on separate servers or virtual machines. For example, the database server runs on its own VM.

### Hybrid

A good example is when PostgreSQL runs on a dedicated machine, while the proxy and DHIS2 Tomcat instances run from the same server.

## Single-server Architecture

In this setup, all components run on the same server. LXD containers are used to separate application components. The containers are segregated for PostgreSQL, monitoring, instances, and proxy, which improves security and resource allocation.  

This is the default choice with Ansible tools with `ansible_connection=lxd` set in the inventory file.

### Features

- Simplicity
- Easy to manage
- Performance

### Drawbacks

- Scalability – scaling individual components is challenging in this setup
- Maintainability
- Flexibility – less flexible than distributed setups

## Distributed Architecture

Here, each component runs on its own dedicated server. To support this architecture, you need a deployment server to execute your Ansible scripts.  

The deployment server must have an SSH connection to the other hosts. Test the SSH connection using:

```bash
ansible all -m ping -u <ssh_user> -k
