const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../../../controller/review');


reviewRouter.get('/candidates', reviewController.getReviewCandidates);

reviewRouter.post('/candidates', reviewController.writeReviewCandidate);

reviewRouter.post('/', reviewController.writeReview);

reviewRouter.get('/:review_recv_id', reviewController.getOneReview);

reviewRouter.delete('/:review_id', reviewController.deleteOneReview);

module.exports = reviewRouter;