#! /usr/bin/env bash
set -x
set -e

cp ./env/env.prod.ts ./env/env.ts

npm run build:all

firebase use prod
./secrets.sh blockframes

# we deploy everything but functions, they tend to crash
firebase deploy --except functions

# we deploy the functions and retry until it worked
until firebase deploy --only functions || true; do
    echo retry;
    sleep 5;
done
