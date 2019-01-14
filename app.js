const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.use(express.static('build'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Pragma, Cache-Control');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, HEAD, DELETE');
    next();
});

const nationalities = [{
    ID: 1,
    Title: 'India'
}, {
    ID: 2,
    Title: 'UAE'
}, {
    ID: 3,
    Title: 'USA'
}];

let students = [{
        ID: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date().toISOString(),
        nationality: nationalities[0],
        familyMembers: [{
                ID: 1,
                firstName: 'James',
                lastName: 'Doe',
                dateOfBirth: new Date().toISOString(),
                relationship: 'Parent',
                nationality: nationalities[0]
            },
            {
                ID: 1,
                firstName: 'James',
                lastName: 'Lol',
                dateOfBirth: new Date().toISOString(),
                relationship: 'Brother',
                nationality: nationalities[1]
            }
        ]
    },
    {
        ID: 2,
        firstName: 'Muhammad Omar',
        lastName: 'Muneer',
        dateOfBirth: new Date().toISOString(),
        nationality: nationalities[0],
        familyMembers: [{
            ID: 1,
            firstName: 'Muhammad',
            lastName: 'Muneer',
            dateOfBirth: new Date().toISOString(),
            relationship: 'Parent',
            nationality: nationalities[0]
        }]
    }
];

app.get('/api/Students', (req, res) => {
    const studentsToSend =
        students.map(({ ID, firstName, lastName, dateOfBirth }) => ({ ID, firstName, lastName, dateOfBirth }));
    res.send(studentsToSend);
});

app.post('/api/Students', (req, res) => {
    const { body: { firstName, lastName, dateOfBirth } } = req;
    const ID = Math.floor(Math.random() * 100000);
    students = students.concat([{ ID, firstName, lastName, dateOfBirth }]);
    res.send({ ID, firstName, lastName, dateOfBirth });
});

app.get('/api/Students/:id', ({ params: { id } }, res) => res.send(
    students
    .filter(s => s.ID === parseInt(id, 10))
    .map(({ ID, firstName, lastName, dateOfBirth }) =>
        ({ ID, firstName, lastName, dateOfBirth }))[0]));

app.put('/api/Students/:id', ({ params: { id }, body: { firstName, lastName, dateOfBirth } },
    res) => {
    const studentIndex = students.findIndex(({ ID }) => ID === parseInt(id, 10));
    const studentToUpdate = students[studentIndex];
    studentToUpdate.firstName = firstName;
    studentToUpdate.lastName = lastName;
    studentToUpdate.dateOfBirth = dateOfBirth;

    res.send(students[studentIndex]);
});

app.get('/api/Students/:studentID/Nationality/',
    ({ params: { studentID } }, res) => {
        const studentToUpdate = students.find(({ ID }) => ID === parseInt(studentID, 10));

        const { nationality } = studentToUpdate;
        res.send({ nationality });
    });

app.put('/api/Students/:studentID/Nationality/:nationalityID',
    ({ params: { studentID, nationalityID } }, res) => {
        const studentIndexToUpdate = students.findIndex(({ ID }) => ID === parseInt(studentID, 10));
        const nationalityToUpdate = nationalities.find(({ ID }) =>
            ID === parseInt(nationalityID, 10));
        const studentToUpdate = students[studentIndexToUpdate];

        studentToUpdate.nationality = nationalityToUpdate;
        const { ID, firstName, lastName, nationality } = studentToUpdate;
        res.send({ ID, firstName, lastName, nationality });
    });


app.get('/api/Nationalities', (_, res) => res.send(nationalities));

app.get('/api/Students/:studentID/FamilyMembers/', ({ params: { studentID } }, res) => {
    const familyMembersForStudent = students.find(s => s.ID === parseInt(studentID, 10)).familyMembers;
    res.send(familyMembersForStudent);
});

app.post('/api/Students/:studentID/FamilyMembers/', (req, res) => {
    const { body: { firstName, lastName, dateOfBirth, relationship }, params: { studentID } } = req;
    const studentToUpdate = students.find(s => s.ID === parseInt(studentID, 10));

    const newFamilyMember = {
        ID: Math.floor(Math.random() * 100000),
        firstName,
        lastName,
        dateOfBirth,
        relationship
    };
    studentToUpdate.familyMembers = (studentToUpdate.familyMembers || []).concat([newFamilyMember]);
    res.send(newFamilyMember);
})

app.put('/api/FamilyMembers/:id',
    (req, res) => {
        const { body: { firstName, lastName, dateOfBirth, relationship }, params: { id: ID } } = req;

        const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(ID, 10)));
        const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(ID, 10));
        const studentIndex = students.indexOf(studentToUpdate);
        const familyMemberIndex = studentToUpdate.familyMembers.indexOf(familyMemberToUpdate);

        familyMemberToUpdate.firstName = firstName;
        familyMemberToUpdate.lastName = lastName;
        familyMemberToUpdate.dateOfBirth = dateOfBirth;
        familyMemberToUpdate.relationship = relationship;

        students[studentIndex].familyMembers[familyMemberIndex] = familyMemberToUpdate;

        res.send({ firstName, lastName, dateOfBirth, relationship, ID });
    });

app.delete('/api/FamilyMembers/:id',
    (req, res) => {
        const { params: { id: ID } } = req;

        const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(ID, 10)));
        const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(ID, 10));
        const studentIndex = students.indexOf(studentToUpdate);
        const familyMemberIndex = studentToUpdate.familyMembers.indexOf(familyMemberToUpdate);

        students[studentIndex].familyMembers.splice(familyMemberIndex, 1);

        res.send('');
    });


app.get('/api/FamilyMembers/:familyMemberID/Nationality/',
    ({ params: { familyMemberID } }, res) => {
        const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(familyMemberID, 10)));
        const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(familyMemberID, 10));

        res.send(familyMemberToUpdate.nationality);
    });

app.put('/api/FamilyMembers/:familyMemberID/Nationality/:nationalityID',
    ({ params: { familyMemberID, nationalityID } }, res) => {
        const studentToUpdate = students.find(s => s.familyMembers.some(k => k.ID === parseInt(familyMemberID, 10)));
        const familyMemberToUpdate = studentToUpdate.familyMembers.find(s => s.ID === parseInt(familyMemberID, 10));
        const studentIndex = students.indexOf(studentToUpdate);
        const familyMemberIndex = studentToUpdate.familyMembers.indexOf(familyMemberToUpdate);
        const nationality = nationalities.find(s => s.ID === +nationalityID);

        students[studentIndex].familyMembers[familyMemberIndex].nationality = nationality;
        res.send(students[studentIndex].familyMembers);
    });

app.listen('8088', () => console.log('Started Listening'));