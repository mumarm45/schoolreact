/**
 * Created by mumarm45 on 22/12/2018.
 */

import {addAndUpdateFamilies, deleteFamilyMember, fetchFamilyInfo} from "../util/API";
export const RECEIVE_FAMILY = 'RECEIVE_FAMILY';
export const ADD_FAMILY = 'ADD_FAMILY';
export const DELETE_FAMILY = 'DELETE_FAMILY';
export const UPDATE_FAMILY = 'UPDATE_FAMILY';
export const receiveFamilyInfo = (families) => {
    return {
        type: RECEIVE_FAMILY,
        families
    }
};
const addFamilyMemberProp = (family) => {
    return {
        type: ADD_FAMILY,
        family
    }
};
const deleteFamilyMemberProp = (ids) => {
    return {
        type: DELETE_FAMILY,
        ids
    }
};

export function handleReceiveFamilyInfo(student) {
    return (dispatch) => {
        return fetchFamilyInfo(student.ID).then((families) => {
            return dispatch(receiveFamilyInfo({[student.ID]: families}));
        });
    }
}

export function addAndUpdate(id, families) {
    return (dispatch) => {
        addAndUpdateFamilies(id, families).then(results => {
            //if there is any error then this will not update the redux. This approach can be improved.
            try {
                const combinedBoth = [...results[0][0], ...results[1][0]].filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.ID === thing.ID
                    ))
                );
                dispatch(addFamilyMemberProp({[id]: combinedBoth}))
            } catch (err) {
                console.error('Error while updating/ adding some families.');
            }

        });

    };

}
export function handleDeleteFamilyMember(stuid, famid) {
    return (dispatch) => {
        return deleteFamilyMember(famid).then((fam) => {
            dispatch(deleteFamilyMemberProp({stuid: stuid, famId: famid}));
        });

    }
}