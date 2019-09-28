const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Api Running...'));

// Define routes
app.use('/users', require('./routes/api/users'));
app.use('/auth', require('./routes/api/auth'));
app.use('/profile', require('./routes/api/profile'));
app.use('/recipes', require('./routes/api/recipes'));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
