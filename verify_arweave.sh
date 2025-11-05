#!/bin/bash
for tx in \
  AJdZ9nGew1Z2vVUNNG54I1ksfm8IQ8XVdrIEYWMDMW4 \
  nvI_kA3wGad6JXQkak1RuYeqY50pOrdG9yp4GDeQyn4 \
  uTJdOmuVvACK1uLAK31vI-ATsQZLd8-GYlXYQmRxk9E
do
  echo "Checking $tx"
  curl -sI https://arweave.net/raw/$tx | grep content-type
done
