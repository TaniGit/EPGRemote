"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class LiveWatchDeleteController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'LiveWatchDeleteController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let model = this.modelFactory.get("LiveWatchStopStreamModel");
        model.setOption({ streamId: Number(querystring.parse(q).stream) });
        let view = new NormalApiView(response, "LiveWatchStopStreamModel");
        view.setModels({ LiveWatchStopStreamModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default LiveWatchDeleteController;

