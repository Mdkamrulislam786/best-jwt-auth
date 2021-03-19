require('dotenv').config({ path: __dirname + '/.env' });
import "reflect-metadata";
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { craeteAccessToken, craeteRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import cors from 'cors'

createConnection().then(async () => {
    const app = express()
    app.use(cors({
        credentials: true,
        origin:'http://localhost:3000'
    }))
    app.use(cookieParser())
    app.get('/', (_req, res) => res.send('hello'))
    app.post('/refresh_token', async (req, res) => {
        console.log(req.cookies.kid)
        //1. grab token from headers
        const token = req.cookies.kid
        if (!token) {
            res.send({ ok: false, accessToken: "" })
        }
        //2.verify if the token is valid and not expired
        let payload: any = null
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)//refresh token
        } catch (err) {
            console.log(err);
            res.send({ ok: false, accessToken: "" })
        }
        //3if token is valid then send back a accesstoken
        const user = await User.findOne({ id: payload.userId })
        if (!user) {
            return res.send({ ok: false, accessToken: "" })
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" })
        }
        //3.1 send refresh token
        sendRefreshToken(res, craeteRefreshToken(user))
        //3.2 then send accesstoken
        return res.send({ ok: true, accessToken: craeteAccessToken(user) })
    })
    
    //APOLLO SERVER
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    })
    apolloServer.applyMiddleware({ app, cors: false })
    app.listen(4000, () => {
        console.log('express server connected');

    })
}).catch(error => console.log(error));

