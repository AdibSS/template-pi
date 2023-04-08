import { EventEmitter } from 'events';
import express from 'express';
import mysql from 'mysql';
import { Server, createServer } from 'http';
import { Config, SELF } from './types';
import * as fs from 'fs'
import { Connection, ConnectionConfig } from 'mysql';
const config_path = "./config.json"

/* Global Events */; globalThis.GLOBAL_EVENTS = new EventEmitter();
/* Global Prototypes */; require('./global');

export class GlobalApp extends EventEmitter implements SELF, Config {
    _express: typeof express = require('express')
    express: express.Express = this._express()
    http: Server = createServer(this.express)

    // defined in constructor
    mysql_connection!: Connection;

    // defined in config.json
    portUse!: number// DON'T FORGET TO CHANGE THIS IN CONFIG.JSON
    portOnline!: number // DON'T FORGET TO CHANGE THIS IN CONFIG.JSON
    portFE!: number
    ipAddress!: string
    mysql_config!: ConnectionConfig;

    constructor(Config: Config) {
        super();
        for (const key in Config) this[key] = Config[key]; // read and apply config.json as properties

        // Create connection to Mysql DB based on config
        this.mysql_connection = mysql.createConnection(this.mysql_config);
        this.mysql_connection.connect()

        this.http.listen(this.portUse, () => {
            this.emit('online')
            GLOBAL_EVENTS.emit('online')
            console.log(`HTTP Running on port: ${this.portUse} | Online at: ${this.portOnline}`);
            this.express.get("/", (req, res) => { res.sendStatus(403) });
        })
    }

};

// Initialize
(async () => {
    globalThis.APP = new GlobalApp(JSON.parse(await fs.readFileSync(config_path) as unknown as string) as Config);

    GLOBAL_EVENTS.once('online', () => { // Requires
    /* Config */; require('./config.ts');
    /* Routes */; requires('./routes');
    })
})()