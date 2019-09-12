const express = require('express');
const app = express();
const port = 3000;

const teams = [{name: "Team 1", id: 1}, {name: "Team 2", id: 2}];
const team = {"1": {name: "Team 1", info: "more details"}, "2": {name: "Team 2", info: "more details"}};
const members = {"1": [{name: "Tom"}], "2": [{name: "Brian"}]};

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/teams', (req, res) => res.json(teams));
app.get('/teams/:id', (req, res) => res.json(team[req.params.id]));
app.get('/teams/:id/members', (req, res) => res.json(members[req.params.id]));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));