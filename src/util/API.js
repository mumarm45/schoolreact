/**
 * Created by mumarm45 on 20/12/2018.
 */

import axios from "axios";
const host = 'http://localhost:8088/api';

export function fetchStudents() {
    return axios({method: 'get', url: `${host}/Students`}).then((response) => {
            return {students: response.data}
        }
    );
}

export function fetchFamilyInfo(id) {
    return axios({method: 'get', url: `${host}/Students/${id}/FamilyMembers/`}).then((response) => {
            return response.data===''?[]:response.data;
        }
    );
}

export function addFamilyMember(id, family) {
    return axios({method: 'post', url: `${host}/Students/${id}/FamilyMembers/`, data: family}).then((response) => {
            return response.data
        }
    );
}

export function deleteFamilyMember(id) {
    return axios({method: 'delete', url: `${host}/FamilyMembers/${id}`}).then((response) => {
            return response.data
        }
    );
}
export function updateFamilyMember(family) {
    return axios({method: 'put', url: `${host}/FamilyMembers/${family.ID}`, data: family}).then((response) => {
            return response.data
        }
    );
}
export function updateStudentBasicInfo(basicInfo) {
    return axios({method: 'put', url: `${host}/Students/${basicInfo.ID}`, data: basicInfo}).then((response) => {
            return response.data
        }
    );
}
export function addStudentBasicInfo(basicInfo) {
    return axios({method: 'post', url: `${host}/Students`, data: basicInfo}).then((response) => {
            if (basicInfo.nationality) {
                return upadteStudentNationality(response.data.ID, basicInfo.nationality);
            }
        }
    );
}
export function addFamilyMemberNationality(id, nationalityId) {
    return axios({method: 'put', url: `${host}/FamilyMembers/${id}/Nationality/${nationalityId}`}).then((response) => {
            return response.data
        }
    );
}
export function getStudentNationality(id) {
    return axios({method: 'get', url: `${host}/Students/${id}/Nationality/`}).then((response) => {
            return response.data
        }
    );
}
export function upadteStudentNationality(id, nationalityID) {
    return axios({method: 'put', url: `${host}/Students/${id}/Nationality/${nationalityID}`}).then((response) => {
            return response.data
        }
    );
}
export function fetchAllNationalities() {
    return axios({method: 'get', url: `${host}/Nationalities`}).then((response) => {
            return response.data
        }
    );
}

export function updateStudent(basicInfo) {
    return updateStudentBasicInfo(basicInfo).then((student) => {
        if (basicInfo.nationality) {
            return upadteStudentNationality(student.ID, basicInfo.nationality.ID);
        }
    })
}

export function addAndUpdateFamilies(id, families) {
    return Promise.all([resolveAllUpdateFamily(families.filter((fam) => fam.ID))
        , resolveAllFamily(id, families.filter((fam) => !fam.ID))]);

}

export function resolveAllUpdateFamily(families) {
    return axios.all(families.map(fam => updateFamilyMember(fam))).then((familiesWithoutNation) => {
        let updatedNationFamily = families.filter(ids => ids.nationality).map((famli, index) => {
            return {
                id: familiesWithoutNation[index]['ID'],
                nationalityId: famli.nationality.ID ? famli.nationality.ID : famli.nationality
            }
        });
        if (updatedNationFamily.length === 0) {
            updatedNationFamily.push(familiesWithoutNation);
            return updatedNationFamily;
        }
        return resolveUpdateNationalities(updatedNationFamily);
    }).catch((err) => {

        return null;
    });
}


export function resolveAllFamily(id, families) {
    return axios.all(
        families.map(fam => addFamilyMember(id, Object.assign({}, fam, {nationality: undefined}))))
        .then((familiesWithoutNation) => {
        let updatedNationFamily = families.map((famli, index) => {
            return {id: familiesWithoutNation[index]['ID'], nationalityId: famli.nationality}
        }).filter(ids => ids.nationalityId);
        if (updatedNationFamily.length === 0) {
            updatedNationFamily.push(familiesWithoutNation);
            return updatedNationFamily;
        }
        return resolveUpdateNationalities(updatedNationFamily);
    }).catch((err) => {

        return null;
    });
}

export function resolveUpdateNationalities(families) {
    return axios.all(families.map(fam => addFamilyMemberNationality(fam.id, fam.nationalityId))).catch((err) => {
        return null;
    });
}