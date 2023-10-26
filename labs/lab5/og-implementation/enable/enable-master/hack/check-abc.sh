#!/usr/bin/env bash

sort enable1.txt -o enable1.txt

if [[ -n "$(git status --porcelain)" ]]; then
    echo "Please make sure that the dictionary is in alphabetical order."
    git diff enable1.txt
    exit 1
fi
