var postgres = require('../config/postgres'),
    programModel = exports,
	ps = new postgres(global.dbvars);

programModel.getDegreeList = function(callback) {
    var sql = 'SELECT * FROM degrees';
    var command = {"sql" : sql, "params" : {}}
  	ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    }); 
};

programModel.getDegreeProgramList = function(degreeid, callback) {
    var sql = 'SELECT dpa.program_area_id, pa.program_area FROM program_areas  pa JOIN degree_program_area as dpa ON (pa.program_area_id = dpa.program_area_id AND dpa.degree_id = $1) ORDER BY dpa.program_area_id DESC ';
    data = [degreeid];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    }); 
};


programModel.getDegreeProgramListArea = function(programid, degreeid, callback) {
    var sql = 'SELECT program, p.program_code FROM programs p LEFT JOIN degree_program_area USING (degree_program_area_id) WHERE degree_id = $2 AND program_area_id = $1';
    data = [programid,degreeid];
    var command = {"sql" : sql, "params" : data}
    ps.query(command, function (err, result) {
        if (err) {
            console.error(err);
            return callback(err, this);
        }
        if (result.length > 0) {
        }
        else {
            return callback(false, null);
        }
        var data =  result;
        return callback(false, data);
    }); 
};
