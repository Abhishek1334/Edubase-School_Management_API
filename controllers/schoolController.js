import { pool } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { validateAddSchoolData, validateCoordinates } from '../utils/validators.js';
import { calculateDistance } from '../utils/distance.js';

export const addSchool = async (req, res) => {
    try {
        const schoolData = req.body;

        const validation = validateAddSchoolData(schoolData);
        if (validation.error) {
            return sendError(res, validation.error, 400);
        }

        const { name, address, latitude, longitude } = validation.data;

        const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const values = [name, address, latitude, longitude];

        console.log('Executing SQL:', sql);
        console.log('Values:', values);

        const [result] = await pool.execute(sql, values);

        const newSchool = {
            id: result.insertId,
            name: name,
            address: address,
            latitude: latitude,
            longitude: longitude,
        };

        return sendSuccess(res, newSchool, 201);
    } catch (error) {
        console.error('Error adding school:', error.message);
        console.error('Error details:', error);
        return sendError(res, 'Error adding school', 500);
    }
};

export const listSchools = async (req, res) => {
    try {
        const query = req.query;

        const validation = validateCoordinates(query);
        if (validation.error) {
            return sendError(res, validation.error, 400);
        }

        const userLat = validation.data.latitude;
        const userLon = validation.data.longitude;

        const [schools] = await pool.query('SELECT * FROM schools');

        const schoolsWithDistance = [];

        for (let i = 0; i < schools.length; i++) {
            const school = schools[i];
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);

            schoolsWithDistance.push({
                id: school.id,
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                distance: parseFloat(distance.toFixed(4)),
            });
        }

        schoolsWithDistance.sort(function (a, b) {
            return a.distance - b.distance;
        });

        return res.status(200).json(schoolsWithDistance);
    } catch (error) {
        console.error('Error:', error);
        return sendError(res, 'Error getting schools', 500);
    }
};
