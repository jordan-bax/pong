#! /usr/bin/env bash

if [[ ! -d venv ]]; then
    python3 -m venv venv
    venv/bin/pip3 install requests
fi

venv/bin/python3 main.py
