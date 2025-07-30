#!/bin/bash

echo "Starting"
echo "Starting Monitoring at $(date)" >> /home/dev/Documents/MonitoringBackend/start.log 

cd /home/dev/Documents/MonitoringBackend

MAX_TRY=5
TRY=0

until npm run dev >> /home/dev/Documents/MonitoringBackend/start.log 2>&1; do
  TRY=$((TRY+1))
  if [ "$TRY" -ge "$MAX_TRY" ]; then
    echo "Starting Monitoring after $TRY tries at $(date)" >> start.log
  fi
  echo "Retrying in 3 seconds..." >> start.log
  sleep 3
done

