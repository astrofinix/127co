import mysql from 'mysql2/promise';
import pool from '$lib/server/database'

/*
let mysqlconn = null;

let dbname = "cmsc127";

export function mysqlconnFn() {
    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password:'',
            database: dbname
        })
    }
    return mysqlconn;
}
*/

const conn = pool;

//https://en.wikipedia.org/wiki/Select_(SQL)
export async function get(q) {
    let results = await conn.query(selectQuery(q))
        .then(function([rows, fields]){
            return rows;
        });

    return {
        data: results
    }
};

function selectQuery(q) {
    let query = 'SELECT ';

    query = (q.with)? (q.with + query): query;

    for (const field of q.fields){
        query += field;
        query += (q.fields.indexOf(field) !== q.fields.length - 1)? ', ': '';
    }
    
    query += `${
        q.alias ?" AS " + q.alias : ""
    } FROM ${q.from}${
        q.where ? " WHERE " + q.where : ""
    }${
        q.groupBy ? " GROUP BY " + q.groupBy : ""
    }${
        q.having ? " HAVING " + q.having : ""
    }${
        q.orderBy ? " ORDER BY " + q.orderBy : ""
    }`

    return query;
}

export async function add(q) {
    //q = {table, fields[], values[]}
    let results = await conn.query(insertQuery(q))
        .then(function([rows,fields]) {
            return rows;
        });

    return {
        data: results
    }
};

function insertQuery(q) {
    let query = `INSERT INTO ${q.table} (`;
    for(const field of q.fields) {
        query += field;
        query += (field === q.fields[q.fields.length-1])? ') ': ', ';
    }

    query += 'VALUES (';

    for (let i = 0; i < q.values.length; i++) {
        const value = q.values[i];
        query += (typeof (value) == 'number' || value === 'NULL') ? value : `'${value}'`;
        
        query += i < q.values.length - 1? ', ' : ') ';
    }

    return query += ';';
}

export const del = async (q) => {
    let results = await conn.query(deleteQuery(q))
        .then(function([rows, fields]){
            return rows;
        });
    
    return {
        data: results
    }
}

function deleteQuery(q) {
    let query = `DELETE FROM ${q.from} WHERE ${q.where}`;
    return query + ";";
}

export async function update(q) {
    let results = await conn.query(updateQuery(q))
        .then(function([rows, fields]){
            return rows;
        });
    
    return {
        data: results
    }
}

function updateQuery(q) {
    let query = `UPDATE ${q.from} SET `

    // field1 = value1, field2 = value2, ...
    for (let i = 0; i < q.fields.length; i++) {
        let field = q.fields[i];
        let value = q.values[i];

        query += `${field} = `;
        query += (typeof (value) == 'number' || value === 'NULL') ? value : `"${value}"`;
        
        query += i < q.fields.length - 1 ? ', ' : ' ';
    }

    query += `WHERE ${q.where};`;

    return query;
}