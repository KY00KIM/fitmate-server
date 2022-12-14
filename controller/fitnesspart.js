const {FitnessPart} = require('../model/FitnessPart');
const ResponseManager = require('../config/response');
const STATUS_CODE = require('../config/http_status_code');

const fitnesspartController = {
    /**
    * @path {GET} http://fitmate.co.kr/v1/fitnesspart
    * @description 모든 약속을 조회하는 GET Method
    */
    getAllFitnessPart : async (req, res) =>{
        try {
            const fitnesspart = await FitnessPart.find({}).lean();
            ResponseManager.getDefaultResponseHandler(res)['onSuccess'](fitnesspart, 'SUCCESS_OK', STATUS_CODE.SUCCESS_OK);
          } catch (error) {
            console.log(error);
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
          }
    },
    writeFitnessPart: async (req, res) => {
        console.log(req.body);
        try {
            const {
                body: { fitness_name },
              } = req;
            const fitnesspart = await FitnessPart.create({
                'fitness_name':fitness_name
            });
            ResponseManager.getDefaultResponseHandler(res)['onSuccess'](fitnesspart, 'SUCCESS_OK', STATUS_CODE.SUCCESS_OK);
          } catch (error) {
            console.log(error);
            ResponseManager.getDefaultResponseHandler(res)['onError'](error, 'ClientErrorBadRequest', STATUS_CODE.ClientErrorBadRequest);
          }
    },
};

module.exports = fitnesspartController;