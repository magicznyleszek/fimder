// -----------------------------------------------------------------------------
// votesHumanizer is a service that turns OMDb RatingVotes strings into even
// more human friendly ones (especially if you're into gaming)
// -----------------------------------------------------------------------------

class VotesHumanizerService {
    static initClass() {
        VotesHumanizerService.$inject = ['assert'];
    }

    constructor(assert) {
        this._assert = assert;
    }

    getHumanized(votes) {
        // check if received a non-empty string
        this._assert.isString(votes);
        this._assert.isTrue(votes.length !== 0);

        // check if after removing all commas it is a valid integer
        let votesNumber = parseInt(votes.split(',').join(''), 10);
        this._assert.isInteger(votesNumber);

        // check how many thousands are there and slim down the marginal data
        let kCount = 0;
        while (votesNumber >= 1000) {
            votesNumber /= 1000;
            kCount++;
        }

        // create and return a final string
        let votesString = parseFloat(votesNumber.toFixed(1)).toString();
        votesString += 'k'.repeat(kCount);
        return votesString;
    }
}

VotesHumanizerService.initClass();

angular.module('movieDetailsModule').service(
    'votesHumanizer',
    VotesHumanizerService
);
