/**
 * Created by archheretic on 28.11.17.
 */
import React from "react";
import { postBallot } from "../apiConsumer/ballots";
const uuidv4 = require("uuid/v4");

class RegisterBallot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ballotName : "",
            daysUntilExpire: 0,
            candidateElementList: []
        };
        this.candidates = new Map();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeBallotName = this.changeBallotName.bind(this);
        this.changeCandidateList = this.changeCandidateList.bind(this);
        this.changeDaysUntilExpire = this.changeDaysUntilExpire.bind(this);
        this.addCandidateButton = this.addCandidateButton.bind(this);
    }

    componentWillMount() {
        this.addCandidate();
    }

    render() {
        return (
            <div className="register">
                <h1>Register new election</h1>
                <form role="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ballotName">Election name</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Stortingsvalg 2017"
                                onChange={this.changeBallotName}
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="candidateList">Candidate list</label>
                    </div>
                    <div>
                        {this.state.candidateElementList}
                    </div>
                    <div>
                        <button onClick={this.addCandidateButton}>Add candidate</button>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="daysUntilExpire">How many days should the election last?</label>
                        <div>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="10"
                                step="1"
                                onChange={this.changeDaysUntilExpire}
                            />
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    addCandidate = () => {
        const candidateElementList = this.state.candidateElementList;
        const key = uuidv4();
        candidateElementList.push(
            <div className="form-group" key={key}>
                <input
                    name={key}
                    type="text"
                    className="form-control"
                    placeholder="Candidate name"
                    onChange={this.changeCandidateList}
                />
            </div>
        );
        this.setState({candidateElementList});
    };

    changeBallotName = (event) => {
        this.setState({ballotName: event.target.value});
    };

    changeCandidateList = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.candidates.set(name, value);
    };

    changeDaysUntilExpire = (event) => {
        this.setState({daysUntilExpire: event.target.value});
    };

    addCandidateButton = (event) => {
        event.preventDefault();
        this.addCandidate();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const candidateList = Array.from(this.candidates.values());
        if (!this.state.ballotName || candidateList.length >= 2  || !this.state.daysUntilExpire) {
            alert("Fill out all fields");
        }
        else {
            postBallot(this.state.ballotName, candidateList, this.state.daysUntilExpire, (err, result) => {
                if (!err) {
                    alert("Your contract is being deployed in transaction at: " + result.message);
                }
                else {
                    console.log(err);
                }
            });
        }
    }
}

export default RegisterBallot;