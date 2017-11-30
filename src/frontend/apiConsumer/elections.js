/**
 * Created by archheretic on 28.11.17.
 */
import baseConsumer from "./baseConsumer";

function postElection(electionName, candidateList, daysUntilExpire, callback) {
    const route = "elections/";
    const data = {
        electionName,
        candidateList,
        daysUntilExpire
    };
    baseConsumer.postJSON(route, data, (err, data) => {
        if (!err) {
            callback(null, data);
        }
        else {
            callback(err);
        }
    });
}

function getElectionCandidates(electionContractAddress, callback) {
    const route = "elections/electionCandidates/";
    baseConsumer.getJSON(route, electionContractAddress, (err, data) => {
        if (!err) {
            callback(null, data);
        }
        else {
            callback(err);
        }
    });
}

function getElectionResult(electionContractAddress, callback) {
    const route = "elections/results/";
    baseConsumer.getJSON(route, electionContractAddress, (err, data) => {
        if (!err) {
            callback(null, data);
        }
        else {
            callback(err);
        }
    });
}

export {
    postElection,
    getElectionCandidates,
    getElectionResult
};