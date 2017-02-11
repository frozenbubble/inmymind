import  { Utils } from './utils';

declare var zkit_sdk: any;

export class ZkitService {
    constructor () {
        zkit_sdk.setup("https://i00227bj31.api.tresorit.io");
    }

    register(frame, alias) {
        var userIdResp;

        // Step 1: reserve a unique user ID for the registration
        return Utils.callServer('init-user-reg', {alias: alias}).then(function(resp){
            userIdResp = resp;

            // Step 2: register user
            return frame.register(userIdResp.userId, userIdResp.regSessionId);
        }).then(function(succRegResp){

            // Step 3: finish registration transaction
            //   (and auto-approve user for demo purposes)
            Utils.callServer("finished-registration", {
                userId: userIdResp.userId,
                regValidationVerifier: succRegResp.RegValidationVerifier
            });


            console.log('REGISTERED')
            // TODO
            // showPanel('nextStep');

        });
    }
}