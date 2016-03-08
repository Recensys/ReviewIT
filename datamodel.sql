DROP DATABASE IF EXISTS autosys;
CREATE DATABASE autosys;
USE autosys;

CREATE TABLE study(
    id INT AUTO_INCREMENT,
    title VARCHAR(256) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(id)
) engine='innodb';

CREATE TABLE researcher(
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id)
) engine='innodb';

CREATE TABLE phase(
    id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    description TEXT,
    study_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY fk_study (study_id) REFERENCES study(id) ON DELETE CASCADE
)engine='innodb';

CREATE TABLE role(
    id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
) engine='innodb';

CREATE TABLE researcher_phase_relation(
    researcher_id INT NOT NULL,
    phase_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY(researcher_id, phase_id, role_id),
    FOREIGN KEY fk_researcher (researcher_id) REFERENCES researcher(id) ON DELETE CASCADE,
    FOREIGN KEY fk_phase (phase_id) REFERENCES phase(id) ON DELETE CASCADE,
    FOREIGN KEY fk_role (role_id) REFERENCES role(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE researcher_study_relation(
    researcher_id INT NOT NULL,
    study_id INT NOT NULL,
    admin BOOLEAN NOT NULL,
    PRIMARY KEY(researcher_id, study_id),
    FOREIGN KEY fk_researcher (researcher_id) REFERENCES researcher(id) ON DELETE CASCADE,
    FOREIGN KEY fk_study (study_id) REFERENCES study(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE reference(
    id INT AUTO_INCREMENT,
    study_id INT NOT NULL, 
    PRIMARY KEY(id),
    FOREIGN KEY fk_study (study_id) REFERENCES study(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE datatype(
    id INT AUTO_INCREMENT,
    name VARCHAR(256),
    PRIMARY KEY(id)
) engine='innodb';

CREATE TABLE data(
    id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    value TEXT,
    reference_id INT NOT NULL,
    type_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY fk_reference (reference_id) REFERENCES reference(id) ON DELETE CASCADE,
    FOREIGN KEY fk_type (type_id) REFERENCES datatype(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE task(
    id INT AUTO_INCREMENT,
    phase_id INT NOT NULL,
    reference_id INT NOT NULL,
    researcher_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY fk_phase (phase_id) REFERENCES phase(id) ON DELETE CASCADE,
    FOREIGN KEY fk_reference (reference_id) REFERENCES reference(id) ON DELETE CASCADE,
    FOREIGN KEY fk_researcher (researcher_id) REFERENCES researcher(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE datafield(
    id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    description TEXT, 
    input BOOLEAN,
    study_id INT NOT NULL,
    type_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY fk_study (study_id) REFERENCES study(id) ON DELETE CASCADE,
    FOREIGN KEY fk_type (type_id) REFERENCES datatype(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE taskfield(
    task_id INT NOT NULL,
    datafield_id INT NOT NULL,
    data_id INT NOT NULL,
    PRIMARY KEY(task_id, datafield_id),
    FOREIGN KEY fk_task (task_id) REFERENCES task(id) ON DELETE CASCADE,
    FOREIGN KEY fk_datafield (datafield_id) REFERENCES datafield(id) ON DELETE CASCADE,
    FOREIGN KEY fk_data (data_id) REFERENCES data(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE operator(
    id INT AUTO_INCREMENT,
    name VARCHAR(256),
    type1_id INT NOT NULL,
    type2_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY fk_type1 (type1_id) REFERENCES datatype(id) ON DELETE CASCADE,
    FOREIGN KEY fk_type2 (type2_id) REFERENCES datatype(id) ON DELETE CASCADE
) engine='innodb';

CREATE TABLE criteria(
    id INT AUTO_INCREMENT,
    operator_id INT NOT NULL,
    datafield_id INT NOT NULL,
    name VARCHAR(256),
    PRIMARY KEY(id),
    FOREIGN KEY fk_operator (operator_id) REFERENCES operator(id) ON DELETE CASCADE,
    FOREIGN KEY fk_datafield (datafield_id) REFERENCES datafield(id) ON DELETE CASCADE
) engine='innodb';
SHOW ENGINE INNODB STATUS;
