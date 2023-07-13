#!/bin/bash

set -e

if [[ -z "$1" ]]; then
  echo "No arguments supplied"
  echo "Please supply one of the following arguments: users, payments, orders or all"
  exit 1
elif [[ "$1" == "all" ]]; then
  echo "Running all services"
  command="npm run users"
elif [[ "$1" != "users" ]] && [[ "$1" != "payments" ]] && [[ "$1" != "orders" ]]; then
  echo "Not implemented"
  exit 1
else
    echo "Running $1 service"
    command="npm run $1"
fi

echo "Running command: $command"
exec $command
