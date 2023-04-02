
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
            name: "Obtiene todos lso Estudiantes",
            text: "SELECT * FROM estudiante",
            value: []
        };

        pgQuery(sqlQuery);
    })
    .command("select", "Obtiene estudiente por rut", () => {
        console.log(args)

        const sqlQuery = {
            name: "Obtiene todos lso Estudiantes",
            text: "SELECT * FROM estudiante WHERE rut = $1",
            value: [args[1]]
        };

        pgQuery(sqlQuery);
    })
    .command("insert", "Crea nuevo estudiante", () => {
        const sqlQuery = {
            name: "",
            text: "INSERT INTO estudiante (rut, nombres, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *",
            value: [args[1], args[2], args[3], args[4]]
        };

        pgQuery(sqlQuery);
    })
    .command("update", "Modifica un estudiante por rut", () => {
        const sqlQuery = {
            name: "",
            text: "UPDATE estudiante SET nombres = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *",
            value: [args[1], args[2], args[3], args[4]]
        };

        pgQuery(sqlQuery);
    })
    .command("delete", "Elimina un estudiante por rut", () => {
        const sqlQuery = {
            name: "",
            text: "DELETE FROM estudiante WHERE rut = $1 RETURNING *",
            value: [args[1]]
        };

        pgQuery(sqlQuery);
    })
.argv

async function pgQuery(sqlQuery) {
    try {
        const res = await pool.query(sqlQuery.text, sqlQuery.value);
        console.table(res.rows)
    } catch (err) {
        console.log(err);
    };
};
