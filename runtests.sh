#!/bin/sh
cargo run
cd test
ts-node dynamo-init.ts
npm test