# WebSync
A simple URL download tool that takes a configuration ndJSON and downloads the value into the relative/absolute location of the key.

- Example command using a bash version of websync

`./websync.sh run <path to config or default .websync>`

- Example configuration using ndJSON
```
{ path: "./current/timezone/America/Chicago"  url: "https://worldtimeapi.org/api/timezone/America/Chicago" }
{ path: "./current/timezone/America/Denver" url: "https://worldtimeapi.org/api/timezone/America/Denver" }
```
