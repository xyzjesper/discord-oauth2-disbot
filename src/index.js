require("dotenv").config();
const express = require("express")
const axios = require("axios")
const url = require("url");
const { userInfo } = require("os");

const port = process.env.PORT || 1500
const app = express();

app.get('/api/auth/discord/redirect', async (req, res) => {

    const {code} = req.query;

    if (code) {
        const fromData = new url.URLSearchParams({
            client_id: process.env.CLIENTID,
            client_secret: process.env.CLIENTSECRET,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: `http://localhost:1500/api/auth/discord/redirect`
        })



        const output = await axios.post('https://discord.com/api/oauth2/token', 
            fromData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
        });
 

        if (output.data) {

            const access = output.data.access_token;

            const userinfo = await axios.get('https://discord.com/api/v10/users/@me/guilds', {
                headers: {
                    'Authorization': `Bearer ${access}`
                }
            });

            console.log(output.data, userinfo.data);
        }
    

        


    }
})


app.listen(port, () => {console.log(`Running on http://localhost:${port}`);})

