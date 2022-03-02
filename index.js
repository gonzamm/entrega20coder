const express = require("express");
const {graphqlHTTP} = require("express-graphql")
const {buildSchema} = require ("graphql")

const app = express()
const time = new Date


//Recordatorios

const schema = buildSchema(`
    type Recordatorio {
        id: Int
        titulo: String
        descripcion: String
        timestamp: String
    }

    type Query {
        recordatorios: [Recordatorio]
    }

    type Mutation{
        addRecordatorio(titulo: String, descripcion: String): Recordatorio
    }

`)

let recordatorios = [];
let counter = 1;

const root = {
    recordatorios: ()=>{
        return recordatorios
    },
    addRecordatorio: (data)=>{
        let rec = {id: counter, titulo:data.titulo, descripcion: data.descripcion, timestamp: time}
        recordatorios.push(rec)
        counter++
        return rec
    }

}

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql:true
    })
  );
  

app.listen(8080,()=>{
    console.log("Server OK")
})