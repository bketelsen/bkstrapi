---
title: Krustlet
slug: krustlet
github: 'https://github.com/deislabs/krustlet'
description: Web Assembly on Kubernetes

---

Execute Web Assembly in your Kubernetes cluster.  Powered by Wasmtime, Wascc, and Rust.

Krustlet acts as a Kubelet by listening on the event stream for new pods that the scheduler assigns to it based on specific Kubernetes tolerations.

