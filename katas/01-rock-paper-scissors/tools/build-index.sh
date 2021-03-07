#!/bin/bash

# This file generates the index.ts file given new files TS files.
# It does not support nested folders... for now.

GAME_INDEX="src/game/index.ts"

ls -1 src/game | 
grep -v index.ts | # ignore index file
grep -v main.ts  | # ignore main file
sed "s/.ts//"    |
awk '{print "export * from \"./" $0 "\";"}' > $GAME_INDEX
