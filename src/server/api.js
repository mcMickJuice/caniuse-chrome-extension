//@flow
import express from 'express'
import bodyParser from 'body-parser'
import { queryFeatures, querySupport } from './service'

const app = express()

app.use(bodyParser.json())

app.get('/feature', (req, res) => {
    const query: string = req.query.query
    queryFeatures(query)
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            res.status(500)
             .send(`an error occurred ${err}`)
        })
})

app.get('/support', (req, res) => {
    const feature: string = req.query.feature;

    querySupport(feature)
        .then(results => {
            res.send(results)
        })
        .catch(err => {
            res.status(500)
                .send(`An error has occurred ${err}`)
        })
})

export const runApp = (port: number) => {

    return new Promise((resolve, reject) => {
        app.listen(port, err => {
            if (err) {
                console.log('error starting app')
                return reject()
            }

            console.log(`Api started at localhost:${port}`)
            resolve()
        })

    })
}