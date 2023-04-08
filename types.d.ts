import { EventEmitter } from 'events';
import express from 'express'
import { Server } from 'http'
import { GlobalApp } from './app';
import mysql from 'mysql'

declare global {
    /** Global app object */
    var APP: GlobalApp

    /** Global event emitter */
    var GLOBAL_EVENTS: EventEmitter

    /**
    * Requires all JavaScript in a folder
    * @param {string} path path to folder containing all JavaScript to be required
    * @example requires("path/to/folder");
    */
    var requires: (path: string) => void

    interface AsyncQueryResult {
        result: mysql.Query | any,
        fields: mysql.FieldInfo[] | undefined
    }

    /**
     * Create a query to Mysql DB asynchronously
     * @param {string | mysql.QueryOptions} query Query string
     * @returns {Promise} Mysql Query result
     */
    var query: (query: string | mysql.QueryOptions) => Promise<AsyncQueryResult>
}

export interface SELF extends EventEmitter {
    /** Express Require Resolve */
    _express: typeof express
    /** Express object */
    express: express.Express
    /** Server object */
    http: Server
    /** Mysql DB Connection */
    mysql_connection: mysql.Connection
}

export interface Config {
    /** Online IP Address */
    ipAddress: string
    /** External frontend port use */
    portFE: number
    /** Internal port use */
    portUse: number
    /** External port use */
    portOnline: number
    /** Mysql DB Connection Config */
    mysql_config: mysql.ConnectionConfig
}