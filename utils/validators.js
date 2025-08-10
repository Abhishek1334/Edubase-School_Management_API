// Basic validation functions

function validateString(value) {
    if (!value) {
        return false;
    }
    return true;
}

function validateNumber(value) {
    if (value === null || value === undefined) {
        return false;
    }
    const num = Number(value);
    if (isNaN(num)) {
        return false;
    }
    return true;
}

function validateLatitude(value) {
    if (!validateNumber(value)) {
        return false;
    }
    const lat = Number(value);
    if (lat < -90 || lat > 90) {
        return false;
    }
    return true;
}

function validateLongitude(value) {
    if (!validateNumber(value)) {
        return false;
    }
    const lon = Number(value);
    if (lon < -180 || lon > 180) {
        return false;
    }
    return true;
}

function validateAddSchoolData(data) {
    // Check if data exists
    if (!data) {
        return { error: 'Data is required' };
    }

    // Basic validation
    if (!validateString(data.name)) {
        return { error: 'Name is required' };
    }

    if (!validateString(data.address)) {
        return { error: 'Address is required' };
    }

    if (!validateLatitude(data.latitude)) {
        return { error: 'Invalid latitude' };
    }

    if (!validateLongitude(data.longitude)) {
        return { error: 'Invalid longitude' };
    }

    return {
        success: true,
        data: {
            name: data.name,
            address: data.address,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
        },
    };
}

function validateCoordinates(data) {
    if (!validateLatitude(data.latitude)) {
        return { error: 'Invalid latitude' };
    }

    if (!validateLongitude(data.longitude)) {
        return { error: 'Invalid longitude' };
    }

    return {
        success: true,
        data: {
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
        },
    };
}

export { validateAddSchoolData, validateCoordinates };
