
import pkg from 'pg';
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";

const { Pool } = pkg;
const args = hideBin(process.argv);

const conexion = {
    user: "postgres",
    password: "123456",
    database: "ejercicios",
    host: "localhost",
    max: 20, 
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 2000
};

const pool = new Pool(conexion);

yargs(hideBin(process.argv))
    .command(["Docs", "$0"], "Gestionar Estudiantes", () => {
        console.log("select => 'rut'");
        console.log("insert => 'rut', 'nombres', 'curso', nivel");
        console.log("update => 'rut', 'nombres', 'curso', nivel");
        console.log("delete => 'rut'");

        const sqlQuery = {
            name: "",
            text: "SELECT * FROM estudiante",
            value: []
        }

        pgGet(sqlQuery);
    })
.argv

console.log(args)

async function pgGet(sqlQuery) {
    try {
        const res = await pool.query(sqlQuery);
        console.table(res.rows)
    } catch (err) {
        console.log(err);
    };
};
