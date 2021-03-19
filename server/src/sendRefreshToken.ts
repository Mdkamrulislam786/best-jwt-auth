import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("kid", token, {
        httpOnly: true,
        path: "/refresh_token"
    });
};