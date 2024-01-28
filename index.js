require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors({}));

app.use(express.json());

app.use(express.static('public'));

const userRotes = require('./routes/UserRoutes');
const skillRotes = require('./routes/SkillRoutes');
const projetcRotes = require('./routes/ProjectRoutes');
const feedBackRotes = require('./routes/FeedBackRoute');
const postRoutes = require('./routes/PostRoutes');
const levelRoutes = require('./routes/LevelRoutes');
const questionRoutes = require('./routes/QuestionRoutes');
const responseRoutes = require('./routes/ResponseRoutes');

app.use('/users', userRotes);
app.use('/skills', skillRotes);
app.use('/projects', projetcRotes);
app.use('/feedbacks', feedBackRotes);
app.use('/posts', postRoutes);
app.use('/levels', levelRoutes);
app.use('/questions', questionRoutes);
app.use('/responses', responseRoutes);


app.listen(5555);
