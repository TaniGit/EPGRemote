"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import LiveHttpWatchView from '../../../View/Api/Live/LiveHttpWatchView';

class LivehttpWatchController extends Controller {
    public execute(parsedUrl: url.Url, request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'LivehttpWatchController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let model = this.modelFactory.get("LiveHttpWatchModel");
        model.setOption({
            channel: querystring.parse(q).channel,
            sid: querystring.parse(q).sid,
            tunerId: Number(querystring.parse(q).tuner),
            videoId: Number(querystring.parse(q).video),
            pc: Number(querystring.parse(q).pc)
        });

        let view = new LiveHttpWatchView(response, request);
        view.setModels({ LiveHttpWatchModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default LivehttpWatchController;

