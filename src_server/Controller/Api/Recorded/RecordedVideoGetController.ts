"use strict";

import * as http from 'http';
import * as url from 'url';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';

class RecordedVideoGetController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'RecordedVideoGetController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let rec_id = querystring.parse(q).rec_id;
        let ios = querystring.parse(q).ios;
        let android = querystring.parse(q).android;
        let windows = querystring.parse(q).windows;

        let model = this.modelFactory.get("RecordedVideoPathModel");
        model.setOption({
            rec_id: Number(rec_id),
            ios: Number(ios),
            android: Number(android),
            windows: Number(windows)
        });

        let view = new NormalApiView(response, "RecordedVideoPathModel");
        view.setModels({ RecordedVideoPathModel: model });

        model.addViewEvent(view);
        model.execute();
    }
}

export default RecordedVideoGetController;

