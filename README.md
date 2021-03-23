# React Native Source Map Lookup
A command line tool that wraps mozilla/source-map.

## Tutorial
[Inspect React Native App Crash with Source Map](https://wadehuang36.medium.com/inspect-react-native-app-crash-with-source-map-91699f5d3a2)

## Install
``` bash
npm install -g https://github.com/weironghuang31/source-map-lookup
```

## Usage
``` bash
# Simple input
source-map-lookup $filepath:$line:$column

# Multiple inputs
source-map-lookup $filepath "$ERROR_MESSAGE"
```

> the error message has multiple @line:column